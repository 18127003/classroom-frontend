import { AuthRequest, Classroom } from '@/model/model';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://spring-api-backend.herokuapp.com/api',
    // baseURL:'http://localhost:8080/api',
    withCredentials: true
});

export const getData = () => instance({
    'method':'GET',
    'url':'/classroom/all',
    // 'params': {
    //     'search':'parameter',
    // },
    transformResponse: [(data) => JSON.parse(data)]
})

export const createClassroom = (classroom: Classroom) => instance({
    'method':'POST',
    'url':'/classroom/create',
    'data': classroom,
    transformResponse: [(data) => JSON.parse(data)]
})

export const login = (auth: AuthRequest) => instance({
    'method':'POST',
    'url':'/auth/login',
    'data': auth,
    transformResponse: [(data) => JSON.parse(data)]
})