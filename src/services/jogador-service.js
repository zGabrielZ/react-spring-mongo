import ApiService from './api-service'

class JogadorService extends ApiService{

    constructor(){
        super('')
    }

    cadastrar(credenciais,idTime){
        return this.post(`/times/${idTime}/jogadores`,credenciais)
    }

    lista(idTime){
        return this.get(`/times/${idTime}/jogadores`)
    }

    deletar(id){
        return this.delete(`/jogadores/${id}`)
    }

    obterId(id){
        return this.get(`/jogadores/${id}`)
    }

    atualizar(credenciais){
        return this.put(`/jogadores/${credenciais.id}`,credenciais)
    }


}

export default JogadorService