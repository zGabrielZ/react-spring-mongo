import ApiService from './api-service'

class TimeService extends ApiService{

    constructor(){
        super('/times')
    }

    cadastrar(credenciais){
        return this.post('/',credenciais)
    }

    consultar(time){
        return this.post(`/nome?nome=${time.nome}`)
    }

    lista(){
        return this.get('/')
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    obterId(id){
        return this.get(`/${id}`)
    }

    atualizar(credenciais){
        return this.put(`/${credenciais.id}`,credenciais)
    }


}

export default TimeService