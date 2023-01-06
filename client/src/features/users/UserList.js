import { useGetUsersQuery } from "./usersApiSlice"
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setUsers } from "./UsersSlice";
import { selectAllUsers,addAndRemoveUser,selectSetUsers } from "./UsersSlice";
import { useSetAndUnsetEditorMutation } from "./usersApiSlice";

const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [setAndUnsetEditor]=useSetAndUnsetEditorMutation()
    const {data: users,isLoading,isSuccess,isError,error} = useGetUsersQuery()
    const [prevent,setPrevent] = useState();
    const setUpdate = useSelector(selectSetUsers)
    if(isSuccess && setUpdate){
        dispatch(setUsers({users}))
    }
    const allUsers = useSelector(selectAllUsers)
    // const sortedAllUsers = [...allUsers]?.sort((a,b)=> a._id > b._id ? -1 : a._id < b._id ? 1 : 0)
    console.log("this is ",allUsers)
    const onChecked = async (event,user)=>{
        // const checkBox = document.getElementById('editorCheckBx');
        if(event.target.checked){
            console.log(`ticked ${user.username}`)
            const userData = await setAndUnsetEditor({"id":user._id,"setEditor":true}).unwrap()
            console.log("user sent",userData,userData._id)
            dispatch(addAndRemoveUser({...userData}))
            
            
        }else{
            console.log(`unticked ${user.username}`)
            const userData = await setAndUnsetEditor({"id":user._id,"setEditor":false}).unwrap()
            console.log("user sent",userData,userData._id)
            dispatch(addAndRemoveUser({...userData}))
            
            
        }
    };
    
    const checkEditor = (user)=> user.roles.Editor?true:false
    const goBack = ()=>navigate(-1)
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = (
            <section className="users">
                <h1>Users List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>User name</th>
                        <th>Editor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allUsers.map((user, i) => {
                        return (
                            <tr key={i}>
                            <td>{user.username}</td>
                            <td>
                                <label className="switch">
                                    <input type={"checkbox"} id="editorCheckBx" defaultChecked={checkEditor(user)} onChange={(event)=>onChecked(event,user)}/>
                                    <span className="slider"></span>
                                </label>
                            </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {/* <Link to="/welcome">Back to Welcome</Link> */}
                <button onClick={goBack}>go back</button>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
export default UsersList