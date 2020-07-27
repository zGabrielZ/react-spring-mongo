import axios from 'axios'

const httpCliente = axios.create({
    baseURL:'http://localhost:8080'
})

class ApiService {

    constructor(apiUrl){
        this.apiUrl = apiUrl
    }

    post(url,obj){
        const requestUrl = `${this.apiUrl}${url}`
        return httpCliente.post(requestUrl,obj)
    }

    put(url,obj){
        const requestUrl = `${this.apiUrl}${url}`
        return httpCliente.put(requestUrl,obj)
    }

    delete(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpCliente.delete(requestUrl)
    }

    get(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpCliente.get(requestUrl)
    }
}

export default ApiService