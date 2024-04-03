import { apiSlice } from "./apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

// const finishedTasksAdapter = createEntityAdapter({
//     sortComparer: (a, b) => b.completionDate.localeCompare(a.completionDate)
// })


// const finishedTasksAdapter = createEntityAdapter({
//     sortComparer: (a, b) => {
//         if (!a.completionDate && !b.completionDate) {
//             return 0;
//         } else if (!a.completionDate) {
//             return 1;
//         } else if (!b.completionDate) {
//             return -1; 
//         } else {
//             return b.completionDate.localeCompare(a.completionDate);
//         }
//     }
// });

// const initialState = finishedTasksAdapter.getInitialState();

export const taskApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAllTasks: builder.query({
            query: () => ({
                url: `/tasks/`,
                method: 'GET'
            }),
            // transformResponse: responseData => {
            //     return finishedTasksAdapter.setAll(responseData);
            // },
            providesTags: ["tasks"],
        }),
        getTaskById: builder.query({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'GET'
            }),
            providesTags: ["tasks"],
        }),
        deleteTaskById: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }),
            providesTags: ["tasks"],
        }),
        addNewTask: builder.mutation({
            query: (note) => ({
                url: `/tasks/`,
                method: 'POST',
                body: note
            }),
            providesTags: ["tasks"],
        }),
    })


});

export const {
    useGetAllTasksQuery,
    useGetTaskByIdQuery,
    useDeleteTaskByIdMutation,
    useAddNewTaskMutation,
    // useUpdateNoteMutation,

} = taskApi