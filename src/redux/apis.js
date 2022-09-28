import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://localhost:5000/post";

export const getAllPost = createAsyncThunk(
    'case6/getAll',
    async () => {
        const response = await axios.get(baseURL);
        return response.data;
    }
)
