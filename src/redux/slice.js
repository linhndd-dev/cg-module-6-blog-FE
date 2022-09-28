import { createSlice } from "@reduxjs/toolkit"
import { getAllPost, getAllVideo, getDetailVideo } from "./apis"

const initialState ={ 
    // user: {
    //     isLoading: false,
    //     errorMessage: '',
    //     currentUser: null,
    // },
    posts: [
    ],
}

const postSlice = createSlice({
    name: "case6",
    initialState,
    reducers: {
        // LoginGG: (state, data) => {
        //     state.user.currentUser = data.payload;
        // },

        // logout: (state,data) => {
        //     state.currentUser = null;
        //     state.errorMessage = '';
        //     return data.payload
        // },  
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPost.fulfilled, (state, action) => {
            state.posts = action.payload
        })
    }
})

export default postSlice.reducer;

export const { LoginGG, logout } = postSlice.actions