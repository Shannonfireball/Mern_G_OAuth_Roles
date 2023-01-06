const User = require('../model/User');
const ROLES_LIST = require("../config/roles_list");

const getAllUsers = async (request, response) => {
    const users = await User.find();
    if (!users) {
        return response.status(204).json({ 'message': 'No users found' });
    }
    response.json(users);
}

const deleteUser = async (request, response) => {
    if (!request?.body?.id) {
        return response.status(400).json({ "message": 'User ID requestuired' });
    }
    const user = await User.findOne({ _id: request.body.id }).exec();
    if (!user) {
        return response.status(204).json({ 'message': `user id ${request.body.id} not found` });
    }
    const responResult = await user.deleteOne({ _id: request.body.id });
    response.json(responResult);
}

const getUser = async (request, response) => {
    if (!request?.params?.id) {
        return response.status(400).json({ "message": 'user id needed' });
    }
    const user = await User.findOne({ _id: request.params.id }).exec();
    if (!user) {
        return response.status(204).json({ 'message': `user id ${request.params.id} not found` });
    }
    response.json(user);
}

const setAndUnsetEditor = async (request, response) => {
    const {setEditor}= request.body;
    if (!request?.body?.id) {
        return response.status(400).json({ "message": 'user id needed' });
    }
    const user = await User.findOne({ _id: request.body.id }).exec();
    if (!user) {
        return response.status(204).json({ 'message': `user id ${request.body.id} not found` });
    }
    if(setEditor=== true){
        user.roles = {
            'User': ROLES_LIST.User,
            'Editor': ROLES_LIST.Admin
        }
    }else{
        user.roles = {
            'User': ROLES_LIST.User
        }
    }
    const result = await user.save();
    console.log(result)
    response.json({"user":result});
}


module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    setAndUnsetEditor
}