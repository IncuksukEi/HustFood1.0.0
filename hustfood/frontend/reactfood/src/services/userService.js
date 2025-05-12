import axios from 'axios';

export const getUser = async (token) => {
    try {
        const response = await axios.get('http://localhost:8080/api/user/profile',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (token, data) => {
    try {
        const response = await axios.post('http://localhost:8080/api/user/update',{
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: data
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateUserPassword = async (token, password, newPassword) => {
    try {
        const response = await axios.post('http://localhost:8080/api/user/reset-password',{
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: { 
                password: password,
                newPassword: newPassword
             }
        });
            localStorage.setItem('token', response);
        return response;
    } catch (error) {
        throw error;
    }
}