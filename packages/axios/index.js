const axios = require('axios');

const AUTH_TOKEN = 'sdfsdfdfsdfdsfdsfdsfsdf';

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.timeout = 10000
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

module.exports = axios;