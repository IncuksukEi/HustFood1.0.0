import axios from 'axios';

export const getUser = async () => {
    try {
        const response = await axios.get('https://user');
        return response.data; // Return the user data
    } catch (error) {
        throw error;
    }
}