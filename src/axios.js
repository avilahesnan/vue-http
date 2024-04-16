import axios from "axios";
import config from "./config/config";

const instance = axios.create({})

instance.defaults.baseURL = config.apiURL

instance.interceptors.request.use(config => {
    console.log('Interceptando requisição', config)
    config.data = {
        ...config.data,
        curso: 'Vue JS'
    }
    return new Promise(resolve => {
        console.log('Fazendo requisição aguardar...')
        setTimeout(() => {
            console.log('Enviando requisição...')
            resolve(config)
        }, 2000)
    })
})

export default instance