import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const loginUser = async (data) => {
    return await axios.post(`${BASE_URL}/auth/login`, data);
};

export const registerUser = async (data) => {
    return await axios.post(`${BASE_URL}/auth/register`, data);
};