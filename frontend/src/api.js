import axios from 'axios';

const api= axios.create({
    baseURL: "/choreo-apis/fashionable/backend/v1/api"
});

export default api;