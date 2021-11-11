import { Account, AuthRequestInfo, Classroom } from '@/@types/model';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://classroom-spring.herokuapp.com/api',
    // baseURL:'http://localhost:8080/api',
    withCredentials: true
});

const getData = () => instance({
    'method':'GET',
    'url':'/classroom/all',
    // 'params': {
    //     'search':'parameter',
    // },
    transformResponse: [(data) => JSON.parse(data)]
})

const createClassroom = (classroom: Classroom) => instance({
    'method':'POST',
    'url':'/classroom/create',
    'data': classroom,
    transformResponse: [(data) => JSON.parse(data)]
})

const login = (auth: AuthRequestInfo) => instance({
    'method':'POST',
    'url':'/auth/login',
    'data': auth,
    transformResponse: [(data) => JSON.parse(data)]
})

const logout = () => instance({
    'method':'POST',
    'url':'/auth/logout'
})

const signup = (account: Account)=>instance({
    'method':'POST',
    'url':'/account/create',
    'data': account,
    transformResponse: [(data) => JSON.parse(data)]
})

const socialLogin = (tokenId: string)=>instance({
    'method':'POST',
    'url':'/auth/socialLogin',
    'data': tokenId,
    transformResponse: [(data) => JSON.parse(data)]
})

export const api = {
    getData,
    createClassroom,
    login,
    logout,
    signup,
    socialLogin
}