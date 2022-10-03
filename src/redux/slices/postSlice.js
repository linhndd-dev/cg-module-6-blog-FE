import { createSlice } from "@reduxjs/toolkit"
import { createMyPost, deletePost, editPost, getAllMyPost, getDetailPost, getPostsByGuest } from "../apis"

const initialState ={ 
    posts: [
    ],
    post: {
        author: {
            username: ''
        }
    },
    status: 'idle',
    currentPage: 1,
    numberOfPages: null,
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: { 
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPostsByGuest.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getPostsByGuest.fulfilled, (state, action) => {
            state.status = "successful";
            state.posts = action.payload.posts;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        })
        .addCase(getPostsByGuest.rejected, (state, action) => {
            state.status = "failed";
        })
        .addCase(getAllMyPost.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
        .addCase(createMyPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        })
        .addCase(editPost.fulfilled, (state, action) => {
            state.posts.map((item) => {
                if(item._id == action.payload.id){
                    item = action.payload.values;
                    item._id = action.payload.id;
                }
            })
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter((item) =>
                item._id !== action.payload
            )
        })
        .addCase(getDetailPost.fulfilled, (state, action) => {
            state.post = action.payload;
        })
    }
})

export default postSlice.reducer;

export const { setCurrentPage } = postSlice.actions