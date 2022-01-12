import { TEST_SERVER_BASE_URL, LOCAL_REFRESH_TOKEN, SERVER_BASE_URL } from "@/constants/common";
import axios from "axios";

const instance = axios.create({
    // baseURL: SERVER_BASE_URL,
    baseURL: TEST_SERVER_BASE_URL,
    withCredentials: true,
});


instance.interceptors.response.use(
    response=>response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 ) {
            try {
                const refreshToken = JSON.parse(localStorage.getItem(LOCAL_REFRESH_TOKEN));
                var rt = await instance.get(`/auth/refreshToken/${refreshToken}`)
                localStorage.setItem(LOCAL_REFRESH_TOKEN, JSON.stringify(rt.data))
                return instance(originalRequest)
            } catch (e){
            }    
        }
        // specific error handling done elsewhere
        return Promise.reject(error);
    }
)

export const transformFunc = data => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
}

export default instance;