// Fixed isAuthorized Function
import axios from "axios";

export async function isAuthorized() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return false;
    }
    
    try {
        const res = await axios.get('http://localhost:4000/api/auth/check', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        // Check the actual response data structure from your backend
        return res.data.success === true;
        
    } catch (error) {
        console.error("Token validation failed:", error.response?.data || error.message);
        
        // If token is expired or invalid, remove it
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        
        return false;
    }
}