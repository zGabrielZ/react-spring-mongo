import React from 'react'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import NacionalidadeService from '../services/nacionalidade-service'
import JogadorService from '../services/jogador-service'
import LocalStorageService from '../services/local-storage-service'
import { msgErro, msgSucesso, msgErroForm } from '../componentes/toastr'

class Jogador extends React.Component {

    constructor() {
        super()
        this.nacionalidadeService = new NacionalidadeService()
        this.jogadorService = new JogadorService()
    }

    state = {
        id: '',
        nome: '',
        numero: '',
        nacionalidade: '',
        nacionalidades: [],
        errorCampos: [],
        atualizando: false
    }

    componentDidMount() {
        this.nacionalidadeService.lista()
            .then(response => {
                this.setState({ nacionalidades: response.data })
            }).catch(error => {
                msgErro('Erro ao encontrar a lista de nacionalidades')
            })

        const params = this.props.match.params
        if (params.id) {
            this.jogadorService.obterId(params.id)
                .then(response => {
                    this.setState({ id: response.data.id, nome: response.data.nome, numero: response.data.numeroDaCamisa, atualizando: true })
                }).catch(error => {
                    msgErro(error.response.data)
                })
        }
    }

    renderizarOption() {
        return this.state.nacionalidades.map(nacionalidade => {
            return <option key={nacionalidade.id} value={nacionalidade.id}>{nacionalidade.nome}</option>
        })
    }

    cadastrar = () => {

        const timeStorage = LocalStorageService.obterItem('_time_jogador')

        const jogador = {
            nome: this.state.nome,
            numeroDaCamisa: this.state.numero,
            nacionalidade: this.state.nacionalidade
        }

        this.jogadorService.cadastrar(jogador, timeStorage.id)
            .then(response => {
                msgSucesso('Cadastrado com sucesso !')
                this.props.history.push(`/consulta-jogador/${timeStorage.id}`)
            }).catch(error => {
                console.log(error.response)
                msgErro(error.response.data.titulo)
                const camposErro = []
                const falha = error.response.data.campos
                if (falha) {
                    falha.map((itemError) => {
                        msgErroForm(itemError.nome, itemError.mensagem)
                        camposErro.push(itemError)
                        return itemError
                    })
                    this.setState({ errorCampos: camposErro })
                }
            })
    }

    atualizar = () => {

        const timeStorage = LocalStorageService.obterItem('_time_jogador')

        const jogador = {
            id: this.state.id,
            nome: this.state.nome,
            numeroDaCamisa: this.state.numero
        }

        this.jogadorService.atualizar(jogador)
            .then(response => {
                msgSucesso('Atualizado com sucesso !')
                this.props.history.push(`/consulta-jogador/${timeStorage.id}`)
            }).catch(error => {
                msgErro(error.response.data.titulo)
                const camposErro = []
                const falha = error.response.data.campos
                if (falha) {
                    falha.map((itemError) => {
                        msgErroForm(itemError.nome, itemError.mensagem)
                        camposErro.push(itemError)
                        return itemError
                    })
                    this.setState({ errorCampos: camposErro })
                }
            })
    }

    voltar = () => {
        LocalStorageService.removerItem('_time_jogador')
        this.props.history.push('/')
    }

    render() {
        return (
            <Card title={this.state.atualizando ? 'Atualização de jogador' : 'Cadastro de jogador'}>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="nome" label="Nome : ">
                            <input type="text"
                                className="form-control" value={this.state.nome}
                                onChange={e => this.setState({ nome: e.target.value })}
                                id="nome" name="nome"
                                aria-describedby="nomeHelp"></input>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="numero" label="Número da camisa : " htmlFor="numero">
                            <input type="number"
                                className="form-control" value={this.state.numero}
                                onChange={e => this.setState({ numero: e.target.value })}
                                id="numero" name="numero"
                                aria-describedby="numeroHelp"></input>
                        </FormGroup>
                    </div>
                    <div className="col-md-12">
                        {
                            this.state.atualizando ? (
                                <div></div>
                            ) :
                                <FormGroup id="nacionalidade" label="Nacionalidade : ">
                                    <select className="form-control" id="nacionalidade" name="nacionalidade"
                                        value={this.state.nacionalidade}
                                        onChange={e => this.setState({ nacionalidade: e.target.value })}>
                                        <option value="">Selecione</option>
                                        {this.renderizarOption()}
                                    </select>
                                </FormGroup>
                        }
                    </div>
                    <div className="col-md-6">
                        {
                            this.state.atualizando ? (
                                <button className="btn btn-success" onClick={this.atualizar}>
                                    Atualizar
                                </button>
                            ) :
                                <button className="btn btn-success" onClick={this.cadastrar}>
                                    Cadastrar
                                </button>
                        }
                        <button style={{ marginLeft: '20px' }} onClick={this.voltar} className="btn btn-danger">
                            Voltar para home
                            </button>
                    </div>
                </div>
            </Card>
        )
    }

}

export default Jogador