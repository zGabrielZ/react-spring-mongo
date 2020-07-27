import React from 'react'
import '../css/cadastro-time-estilo.css'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import NacionalidadeService from '../services/nacionalidade-service'
import TimeService from '../services/time-service'
import { msgErro, msgSucesso, msgErroForm } from '../componentes/toastr'

class Clube extends React.Component {

    constructor() {
        super()
        this.nacionalidadeService = new NacionalidadeService()
        this.timeService = new TimeService()
    }

    state = {
        id:'',
        data: '',
        nome: '',
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
            this.timeService.obterId(params.id)
                .then(response => {
                    this.setState({id:response.data.id,nome:response.data.nome,data:response.data.dataFundacao, atualizando: true })
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
        const time = {
            nome: this.state.nome,
            dataFundacao: this.state.data,
            nacionalidade: this.state.nacionalidade
        }

        this.timeService.cadastrar(time)
            .then(response => {
                this.componentDidMount()
                this.setState({ nome: '', nacionalidade: '', data: '' })
                msgSucesso('Cadastrado com sucesso !')
                this.props.history.push('/consulta-time')
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
        const time = {
            id:this.state.id,
            nome: this.state.nome,
            dataFundacao: this.state.data
        }

        this.timeService.atualizar(time)
            .then(response => {
                msgSucesso('Atualizado com sucesso !')
                this.props.history.push('/consulta-time')
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

    voltar = () => {
        this.props.history.push('/')
    }


    consulta = () => {
        this.props.history.push('/consulta-time')
    }

    render() {
        return (
            <Card title={this.state.atualizando ? 'Atualização de time':'Cadastro de time'}>
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
                        <FormGroup id="data" label="Fundação : " htmlFor="data">
                            <input type="date"
                                className="form-control" value={this.state.data}
                                onChange={e => this.setState({ data: e.target.value })}
                                id="data" name="data"
                                aria-describedby="dataHelp"></input>
                        </FormGroup>
                    </div>
                    <div className="col-md-12">
                        {
                            this.state.atualizando?(
                                <div></div>
                            ):
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
                    <div className="col-md-6 botao">
                        {
                            this.state.atualizando?(
                                <button className="btn btn-success" onClick={this.atualizar}>
                                Atualizar
                                </button>
                            ):
                            <button className="btn btn-success" onClick={this.cadastrar}>
                            Cadastrar
                                </button>
                        }
                        <button onClick={this.voltar} className="btn btn-danger dois-btn">
                            Voltar para home
                            </button>
                            <button  onClick={this.consulta} className="btn btn-primary tres-btn">
                            Consulta de time
                            </button>
                    </div>
                </div>
            </Card>
        )
    }

}

export default Clube