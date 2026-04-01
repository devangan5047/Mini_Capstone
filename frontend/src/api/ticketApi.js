import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const createTicket = async (data, token) => {
    return await axios.post(`${BASE_URL}/tickets/`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getMyTickets = async (token) => {
    return await axios.get(`${BASE_URL}/tickets/my`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getAllTickets = async (token) => {
    return await axios.get(`${BASE_URL}/tickets/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const resolveTicket = async (ticketId, note, token) => {
    return await axios.put(
        `${BASE_URL}/tickets/resolve/${ticketId}`,
        { note },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
};
