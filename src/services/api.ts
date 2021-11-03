import { Classroom } from '@/model/model';
import axios from 'axios';
import { truncate } from 'fs/promises';

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

export const login = () => instance({
    'method':'POST',
    'url':'/auth/login',
    'data':{
        username:"Hai Dang",
        password:"123"
    },
    transformResponse: [(data) => JSON.parse(data)]
})