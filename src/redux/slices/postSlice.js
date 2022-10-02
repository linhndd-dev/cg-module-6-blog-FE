import { createSlice } from "@reduxjs/toolkit"
import { searchMyPosts,createMyPost, deletePost, editPost, getAllMyPost, getDetailPost, getPostsByGuest } from "../apis"

const initialState ={ 
    posts: [
    ],
    post: {},
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
        .addCase(getAllMyPost.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getAllMyPost.fulfilled, (state, action) => {
            state.status = "successful";
            state.posts = action.payload.posts;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        })
        .addCase(getAllMyPost.rejected, (state, action) => {
            state.status = "failed";
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
        .addCase(deletePost.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter((item) =>
                item._id !== action.payload
            )
            state.status = "successful"
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.status = "failed"
        })
        .addCase(searchMyPosts.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(searchMyPosts.fulfilled, (state, action) => {
            state.status = "successful";
            state.posts = action.payload.posts;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        })
        .addCase(searchMyPosts.rejected, (state, action) => {
            state.status = "failed";
        })
        .addCase(getDetailPost.fulfilled, (state, action) => {
            state.post = action.payload;
        })
    }
})

export default postSlice.reducer;

export const { setCurrentPage } = postSlice.actions