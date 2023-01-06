
import { apiSlice } from "../../app/api/apiSlice";
import authSlice from "./authSlice";

export const authApiSlice= apiSlice.injectEndpoints({
    endpoints:builder=>({
        login:builder.mutation({
            query:credentials=>({
                url:'/auth',
                method:'POST',
                body:{...credentials}
            })
        }),
        GAuthLogin:builder.mutation({
            query:credentials=>({
                url:`/auth/google`,
                method:'POST',
                body:{...credentials}
                })
        }),
        register:builder.mutation({
            query:credentials=>({
                url:'/register',
                method:'POST',
                body:{...credentials}
            })
        }),
        logOut:builder.query({
            query:() => ('/logout'),
        }),        
    })
})

export const { useLoginMutation,useGAuthLoginMutation,useRegisterMutation,useLogOutQuery} = authApiSlice;