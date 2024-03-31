import { apiSlice } from "./apiSlice";

export const noteApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAllNotes: builder.query({
            query: () => ({
                url: `/notes/`,
                method: 'GET'
            }),
            providesTags: ["notes"],
        }),
        getNoteById: builder.query({
            query: (id) => ({
                url: `/notes/${id}`,
                method: 'GET'
            }),
            providesTags: ["notes"],
        }),
        deleteNoteById: builder.mutation({
            query: (id) => ({
                url: `/notes/${id}`,
                method: 'DELETE'
            }),
            providesTags: ["notes"],
        }),



    })


});

export const {
    useGetAllNotesQuery,
    useGetNoteByIdQuery,
    useDeleteNoteByIdMutation,
    // useAddNewNoteMutation,
    // useUpdateNoteMutation,

} = noteApi