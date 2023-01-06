//
const User = require('../model/User');


const jwt = require('jsonwebtoken');
require('dotenv').config();



const handleRefreshToken = async (request,response) => {
    const cookies = request.cookies;
    if(!cookies?.jwt){         
        return response.sendStatus(401)
    };
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;
    response.clearCookie('jwt',{ httpOnly:true, sameSite:'none', secure:true, maxAge:24*60*60*1000});
                      // 
    const foundUser = await User.findOne({ refreshToken:refreshToken }).exec();
    if(!foundUser){   
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err,decoded)=>{
                if(err) return response.sendStatus(403);
                const hackedUser = await User.findOne({ username: decoded.username }).exec();
                hackedUser.refreshToken = '';
                const result = await hackedUser.save();
            }
        )        
        return response.status(403);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (error,decoded)=>{
            if (error) {          
                foundUser.refreshToken = '';
                const result = await foundUser.save();
            }
            if(error || foundUser.username !== decoded.username){
                return response.sendStatus(403);
            }
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                { 
                    "UserInfo":{
                        "username":decoded.username,
                        "roles":roles
                    } 
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn:'30s'}
            );

            const newRefreshToken = jwt.sign(
                {"username":foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn:'1d' }
            )
            foundUser.refreshToken = newRefreshToken;
            const result = await foundUser.save();
            response.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            response.json({ accessToken,roles });
        }
    );
};



module.exports = { handleRefreshToken };