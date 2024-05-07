import { apiSlice } from "./apiSlice";

export const priorityApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPriorities: builder.query({
            query: () => ({
                url: `/priorities/`,
                method: 'GET'
            }),
            providesTags: ["notes"],
        }),    
    })

});

export const {
    useGetAllPrioritiesQuery,
} = priorityApi;