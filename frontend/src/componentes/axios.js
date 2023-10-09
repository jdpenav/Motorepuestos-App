import axios from "axios"; //Importar axios

const Axios = axios.create({
    baseURL: 'http://192.168.0.13:4005/api',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

export default Axios;
