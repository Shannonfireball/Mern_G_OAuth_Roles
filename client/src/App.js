import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/RequireAuth'
import UsersList from './features/users/UserList'


import './App.css';

import queryString from 'query-string';
import Missing from './components/Missing'
import Unauthorized from './components/Unauthorized'
import RequireAuthRoles from './features/auth/RequireAuthRoles'
import Editor from './features/auth/Editor'
import Admin from './features/auth/Admin'
import Lounge from './features/auth/Lounge'
import Register from './features/auth/Register'
import LogOut from './features/auth/LogOut'

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index  element={<Public/>}/>
        <Route path="login"  element={<Login/>}/>
        <Route path="auth/google" element={<Login/>} />
        <Route path='register' element={<Register/>}/>
        <Route path='unauthorized' element={<Unauthorized/>}/>
        <Route path='logout' element={<LogOut/>}/>

        <Route element={<RequireAuth/>}>
          <Route path='welcome' element={<Welcome/>}/>
          
          
          {/* Roles  */}
          <Route element={<RequireAuthRoles allowedRoles={[ROLES.Editor]}/>}>
            <Route path='editor' element={<Editor/>}/>
          </Route>
          <Route element={<RequireAuthRoles allowedRoles={[ROLES.Admin]}/>}>
          <Route path='userslist' element={<UsersList/>}/>
          </Route>
          <Route element={<RequireAuthRoles allowedRoles={[ROLES.Admin]}/>}>
            <Route path='admin' element={<Admin/>}/>
          </Route>
          <Route element={<RequireAuthRoles allowedRoles={[ROLES.Admin,ROLES.Editor]}/>}>
            <Route path='lounge' element={<Lounge/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Missing/>}/>
      </Route>
    </Routes>
  );
}

export default App;













// function App() {
//   const queryParams = queryString.stringify({
//       client_id: '',
//       scope:  [
//         "https://www.googleapis.com/auth/userinfo.profile",
//         "https://www.googleapis.com/auth/userinfo.email",
//       ].join(" "),
//       redirect_uri: 'http://localhost:3000/auth/google', 
//       auth_type: "rerequest",
//       display: "popup", 
//       response_type: "code"
//   }); 
//   const url = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`;
//   return (
//     <div className="App">
//       <header className="App-header">

//         <a href={url}>Continue with Google</a>
//       </header>
//     </div>
//   );
// }
