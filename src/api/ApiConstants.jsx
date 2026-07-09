
const BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:8999";


const API = {

    LOGIN: `${BASE_URL}/healthcare-api/auth/login`,

    REGISTER: `${BASE_URL}/healthcare-api/auth/signup`,


};

export { BASE_URL, API };