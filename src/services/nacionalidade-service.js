import ApiService from './api-service'

class NacionalidadeService extends ApiService{

    constructor(){
        super('/nacionalidades')
    }

    cadastrar(credenciais){
        return this.post('/',credenciais)
    }

    lista(){
        return this.get('/')
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

}

export default NacionalidadeService