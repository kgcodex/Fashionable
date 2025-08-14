import axios from 'axios';

const choreoApiUrl = window.configs?.apiUrl;
const api= axios.create({
    baseURL: `${choreoApiUrl}/api`
});

export default api;