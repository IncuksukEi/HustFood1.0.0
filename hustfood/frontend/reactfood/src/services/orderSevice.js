import axios from "axios";

export const getAllOrders = async (token) => {
    try {
        const response = await axios.get("https://order", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}