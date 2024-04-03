import { apiSlice } from "./apiSlice";

export const taskApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAllTasks: builder.query({
            query: () => ({
                url: `/tasks/`,
                method: 'GET'
            }),
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
        updateTask: builder.mutation({
            query: (note) => ({
                url: `/tasks/`,
                method: 'PUT',
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
    useUpdateTaskMutation,
} = taskApi;