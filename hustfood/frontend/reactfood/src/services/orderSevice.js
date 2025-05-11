import axios from "axios";

export const getAllOrders = async (token) => {
    try {
        const response = await axios.get("http://localhost:8080/api/order", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const addOrder = async (token, data) => {
    try {
        const response = await axios.post("http://localhost:8080/api/order/add", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        });
        return response;
    } catch (error) {
        throw error;
    }
}