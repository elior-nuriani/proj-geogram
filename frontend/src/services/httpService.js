const Axios = require('axios');
const BASE_URL = (process.env.NODE_ENV === 'production') ? '/' : 'http://localhost:5000/';

var axios = Axios.create({
    withCredentials: true
})

export default {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data);
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data);
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data);
    },
    remove(endpinst, data) {
        return ajax(endpinst, 'DELETE', data);
    }
}

async function ajax(endpoint, method = 'GET', data) {
    try {
        const res = await axios({
            url:`${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    }
    catch (err) {
        //Modify Errors messages....
        if(err.response.status === 401){
            console.log('Error Status!')
        }
    }
}