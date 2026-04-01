import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getDashboard = async (token) => {
    return await axios.get(`${BASE_URL}/dashboard/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const assignTicket = async (ticketId, engineerId, token) => {
    return await axios.put(
        `${BASE_URL}/assignments/${ticketId}`,
        { engineer_id: engineerId },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
};

export const getMyAssignments = async (token) => {
    return await axios.get(`${BASE_URL}/assignments/my`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
