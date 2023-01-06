import {createSlice} from '@reduxjs/toolkit'


const usersSlice = createSlice({
    name:'users',
    initialState:{users:null,setUsers:true},
    reducers:{
        setUsers:(state,action)=>{
            const {users}= action.payload;
            state.users = users;
        },
        addAndRemoveUser:(state,action)=>{
            const {user}= action.payload;
            state.users = state.users.filter((userfiler)=>userfiler._id!==user._id)
            state.users.push(user)
            state.setUsers = false
        },
        
    },
})

export const {setUsers,addAndRemoveUser} = usersSlice.actions;
export default usersSlice.reducer;

export const selectAllUsers = (state)=>state.users.users
export const selectSetUsers = (state)=>state.users.setUsers
