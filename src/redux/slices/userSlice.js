import {createSlice} from "@reduxjs/toolkit";
import {
    getUsersFromAdmin,
    changeUserStatusFromAdmin,
    searchUsersByUsername,
} from "../adminApi";
import {profileUser, updateProfile} from "../apis";

const initialState = {
    users: [],
    user: {
        status: "",
    },
    status: "idle",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersFromAdmin.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getUsersFromAdmin.fulfilled, (state, action) => {
                state.status = "successful";
                state.users = action.payload.users;
            })
            .addCase(getUsersFromAdmin.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(changeUserStatusFromAdmin.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(changeUserStatusFromAdmin.fulfilled, (state, action) => {
                state.status = "successful";
                state.users = action.payload.users;
            })
            .addCase(changeUserStatusFromAdmin.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(searchUsersByUsername.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(searchUsersByUsername.fulfilled, (state, action) => {
                state.status = "successful";
                state.users = action.payload.users;
            })
            .addCase(searchUsersByUsername.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(profileUser.fulfilled, (state, action) => {
                const user = action.payload.data;
                state.user = action.payload.data;
                console.log(user)
                localStorage.removeItem("login");
                localStorage.setItem("login", JSON.stringify(user))
            })
            // .addCase()
    },
});

export default userSlice.reducer;
