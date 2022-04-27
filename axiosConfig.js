import axios from 'axios';

const instance = axios.create({
    baseURL:'https://designprosusa.com/hidden_10/api'
});

export default instance;