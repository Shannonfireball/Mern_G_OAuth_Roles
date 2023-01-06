const User = require('../model/User');
const axios = require('axios')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const handleGoogleAuth = async (request,response) => {
    try{
      // const {code,redirect_uri} = request.query;
      const {code,redirect_uri} = request.body;
      const client_id = process.env.GOOGLE_CLIENT_ID;
      const client_secret = process.env.clientSecret;
      const grant_type = 'authorization_code';
      const url = 'https://oauth2.googleapis.com/token'; 
      const {data}= await axios({
        url,
        method: 'POST',
        params: {
          client_id,
          client_secret,
          redirect_uri,
          code,
          grant_type,
        },
      });
      console.log("here is the data",data)
      const tokenFromGoogle = data.access_token;
      const googleUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenFromGoogle}`,
      {
        headers: {
          Authorization: `Bearer ${data.id_token}`,
        },
      })
      console.log(googleUser.data);
      if(!googleUser.data.verified_email) return response.status(400).json({msg: "Email verification failed."})
      const password = googleUser.data.email + process.env.clientSecret;
      const passwordHash = await bcrypt.hash(password, 10)
      
      const user = await User.findOne({username:googleUser.data.name,email:googleUser.data.email})
      if(user){
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return response.status(400).json({msg: "Password is incorrect."})
        const roles = Object.values(user.roles)

        
        const accessToken = jwt.sign(
          { "UserInfo":{
              "username": user.username,
              "roles":roles
          }
           },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn:'30s' }

        );
        const refreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn:'1d' }

        );  
        // saving refresh token with current user
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);

        response.cookie( 'jwt', refreshToken, { httpOnly:true, sameSite:'none', secure:true, maxAge:24*60*60*1000 } );
        response.json({ accessToken,"user":googleUser.data.name ,"roles":Object.values(result.roles) });
      }else{  
        const newUser = await User.create({
          "username": googleUser.data.name,
          "password": passwordHash,
          "email":googleUser.data.email
        })
        const roles = Object.values(newUser.roles)


        const accessToken = jwt.sign(
          { "UserInfo":{
              "username": newUser.username,
              "roles":roles
          }
           },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn:'30s' }

        );
        const refreshToken = jwt.sign(
            { "username": newUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn:'1d' }

        );  
        // saving refresh token with current user
        newUser.refreshToken = refreshToken;
        const result = await newUser.save();
        console.log(result);

        response.cookie( 'jwt', refreshToken, { httpOnly:true, sameSite:'none', secure:true, maxAge:24*60*60*1000 } );
        response.status(201).json({ accessToken,"user":googleUser.data.name,"roles":Object.values(result.roles) });
      }


    }catch(error){
      console.log(error);
    }
      

};



module.exports = { handleGoogleAuth };