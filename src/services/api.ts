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
    transformResponse: [(data) => {
        const json = JSON.parse(data)

        console.log(json)
        // const dates = Object.keys(json['nested object'])
        // data = {
        //     dates
        // }
        return json;
    }]
})