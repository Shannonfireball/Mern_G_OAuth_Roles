import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers: builder.query({
            query:()=>'/users',
            keepUnusedDataFor:5,
        }),
        setAndUnsetEditor:builder.mutation({
            query:credentials=>({
                url:'/users',
                method:'POST',
                body:{...credentials}
            })
        }),
    })
})


export const { useGetUsersQuery,useSetAndUnsetEditorMutation} = usersApiSlice