import { createApi } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            
        createGenre: builder.mutation({
            query: (newGenre) => ({
                url: `${GENRE_URL}`,
                mehtod: 'POST',
                body: newGenre
            })
        }),

        updateGenre: builder.mutation({
            query: ({id, updateGenre}) => ({
                url: `${GENRE_URL}/${id}`,
                method: 'PUT',
                body: updateGenre
            })
        }),

        deleteGenre: builder.mutation({
            query: (id) => ({
                url: `${GENRE_URL}/${id}`,
                method: 'DELETE'
            })
        }),
        
        fetchGenres: builder.query({
            query: () => `${GENRE_URL}/genres`
        }),

    
    })
})

export const { useCreateGenreMutation, useUpdateGenreMutation, useDeleteGenreMutation, useFetchGenresQuery} = genreApiSlice