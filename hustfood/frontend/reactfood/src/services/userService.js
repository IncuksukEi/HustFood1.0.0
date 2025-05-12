import axios from 'axios';

export const getUser = async (token) => {
    console.log('Sending request with token:', token);
    try {
        const response = await axios.get('http://localhost:8080/api/user/profile',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export const updateUser = async (token, data) => {
    try {
        const response = await axios.post('http://localhost:8080/api/user/update', data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateUserPassword = async (token, password, newpassword) => {
    try {
        const response = await axios.post('http://localhost:8080/api/user/reset-password', {
            password,
            newpassword
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
            localStorage.setItem('token', response);
        return response;
    } catch (error) {
        throw error;
    }
}