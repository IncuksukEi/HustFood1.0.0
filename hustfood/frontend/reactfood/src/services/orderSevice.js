import axios from "axios";

export const getAllOrders = async (token) => {
    try {
        const response = await axios.get("http://localhost:8080/api/orders", {
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
        const response = await axios.post("http://localhost:8080/api/order/add", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}