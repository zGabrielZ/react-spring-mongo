class LocalStorageService {


    static addItem(chave,valor){
        localStorage.setItem(chave,valor)
    }

    static obterItem(chave){
       const item =  localStorage.getItem(chave)
       return JSON.parse(item)
    }

    static removerItem(chave){
        localStorage.removeItem(chave)
    }

}

export default LocalStorageService