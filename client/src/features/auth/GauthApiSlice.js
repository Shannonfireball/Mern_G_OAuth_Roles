
// import { apiSlice } from "../../app/api/apiSlice";



// export const gAuthApiSlice= apiSlice.injectEndpoints({
//     endpoints:builder=>({
//         GLogin:builder.mutation({
//             query:credentials=>({
//                 url:`/auth/google?code=${credentials.codeFromGoogle}&redirect_uri=http://localhost:3000/auth`,
//                 method:'GET',
//                 body:{...credentials}
//             })
//         }), 
//     })
// })

// export const { useGLoginMutation} = gAuthApiSlice;