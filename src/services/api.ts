import { Classroom } from '@/model/Classroom';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://spring-api-backend.herokuapp.com/api'
});

export const getData = () => instance({
    'method':'GET',
    'url':'/classroom',
    // 'params': {
    //     'search':'parameter',
    // },
    transformResponse: [(data) => JSON.parse(data)]
})

export const createClassroom = (classroom: Classroom) => instance({
    'method':'POST',
    'url':'/create',
    'data': classroom,
    transformResponse: [(data) => JSON.parse(data)]
})