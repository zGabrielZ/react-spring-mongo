import React from 'react'
import '../css/consulta-time-estilo.css'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import TimeService from '../services/time-service'
import { msgErro, msgSucesso, msgAlerta } from '../componentes/toastr'
import LocalStorageService from '../services/local-storage-service'

class ConsultaTime extends React.Component {

    constructor() {
        super()
        this.timeService = new TimeService()
    }

    state = {
        data: '',
        nome: '',
        timePorPagina: 5,
        atualPagina: 1,
        times: []
    }

    componentDidMount() {
        this.timeService.lista()
            .then(response => {
                this.setState({ times: response.data })
            }).catch(error => {
                msgErro('Erro ao encontrar a lista de times')
            })
    }

    voltar = () => {
        this.props.history.push('/')
    }

    cadastrar = () => {
        this.props.history.push('/clube')
    }

    buscar = () => {
        if (!this.state.nome) {
            msgAlerta('O campo nome não pode ser vazio')
            this.componentDidMount()
            return false
        }

        this.timeService.consultar({
            nome: this.state.nome
        }).then(response => {
            if (response.data.length < 1) {
                msgAlerta('Nenhum resultado encontrado')
            }
            this.setState({ times: response.data })
        }).catch(erro => {
            msgErro(erro.response.data)
        })

    }

    primeiraPagina = () => {
        if (this.state.atualPagina > 1) {
            this.setState({
                atualPagina: 1
            })
        }
    }

    anteriorPagina = () => {
        if (this.state.atualPagina > 1) {
            this.setState({
                atualPagina: this.state.atualPagina - 1
            })
        }
    }

    proximaPagina = () => {
        if (this.state.atualPagina < Math.ceil(this.state.times.length / this.state.timePorPagina)) {
            this.setState({
                atualPagina: this.state.atualPagina + 1
            })
        }
    }

    ultimaPagina = () => {
        if (this.state.atualPagina < Math.ceil(this.state.times.length / this.state.timePorPagina)) {
            this.setState({
                atualPagina: Math.ceil(this.state.times.length / this.state.timePorPagina)
            })
        }
    }

    deletar = (id) => {
        this.timeService.deletar(id)
            .then(response => {
                if (response.data != null) {
                    msgSucesso('Time removido com sucesso !!')
                    this.setState({
                        times: this.state.times
                            .filter(time => time.id !== id)
                    })
                }
            }).catch(erro => {
                msgErro(erro.response.data.titulo)
                console.log(erro.response)
            })
    }

    paginaJogador = (id) => {
        this.timeService.obterId(id)
            .then(response => {
                LocalStorageService.addItem('_time_jogador',JSON.stringify(response.data))
                this.props.history.push(`/consulta-jogador/${id}`)
            }).catch(error => {
                msgErro(error.response.data)
            })
            
    }

    edicao = (id) => {
        this.props.history.push(`/clube/${id}`)
    }


    render() {

        const { times, atualPagina, timePorPagina } = this.state

        const ultimaIndex = atualPagina * timePorPagina
        const primeiraIndex = ultimaIndex - timePorPagina
        const atualTime = times.slice(primeiraIndex, ultimaIndex)
        const total = Math.ceil(times.length / timePorPagina)

        return (
            <Card title="Buscar times">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup id="buscar" label="Buscar nome : " htmlFor="buscar">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.nome}
                                    onChange={(e) => this.setState({ nome: e.target.value })}
                                    id="buscar" name="buscar"
                                    aria-describedby="buscarHelp" placeholder="Digite sua busca"></input>
                            </FormGroup>
                            <div>
                                <button
                                    className="btn btn-success um-bt" onClick={this.buscar}>
                                    Procurar
                                </button>
                                <button className="btn btn-primary dois-bt" onClick={this.cadastrar}>
                                    Cadastrar
                                </button>
                                <button onClick={this.voltar} className="btn btn-danger tres-bt">
                                    Voltar para home
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <table className="table table-primary">
                                <thead>
                                    <tr className="table-secondary">
                                        <th scope="col">Código</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Fundação</th>
                                        <th scope="col">Nacionalidade</th>
                                        <th scope="col">Jogadores</th>
                                        <th scope="col">Excluir</th>
                                        <th scope="col">Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        times.length ?
                                            atualTime.map(time => {
                                                return (
                                                    <tr key={time.id}>
                                                        <td>{time.id}</td>
                                                        <td>{time.nome}</td>
                                                        <td>{time.dataFundacao}</td>
                                                        <td>{time.nacionalidade.nome}</td>
                                                        <td><button title="Visualizar jogadores"
                                                            className="btn btn-primary"
                                                            onClick={this.paginaJogador.bind(this, time.id)}>
                                                            <i className="pi pi-check"></i>
                                                        </button></td>
                                                        <td><button title="Deletar"
                                                            className="btn btn-danger"
                                                            onClick={() =>
                                                                window.confirm(`Deseja excluir este time : ${time.nome} ?`) &&
                                                                this.deletar(time.id)
                                                            }
                                                        >
                                                            <i className="pi pi-trash"></i>
                                                        </button></td>
                                                        <td><button title="Editar"
                                                            className="btn btn-warning"
                                                            onClick={this.edicao.bind(this, time.id)}>
                                                            <i className="pi pi-pencil"></i>
                                                        </button></td>
                                                    </tr>
                                                )
                                            }) : null
                                    }
                                </tbody>
                            </table>
                            <footer className="paginacao">
                                <div style={{ float: 'left', color: 'white' }}>
                                    Página {atualPagina} de {total}
                                </div>
                                <div className="indices">
                                    <ul className="pagination pagination-lg pages">
                                        <li className="page-item active">
                                            <button type="button" className="page-link"
                                                disabled={atualPagina === 1 ? true : false} onClick={this.primeiraPagina}
                                            >Primeira</button>
                                        </li>
                                        <li className="page-item">
                                            <button type="button" className="page-link"
                                                disabled={atualPagina === 1 ? true : false} onClick={this.anteriorPagina}
                                            >Anterior</button>
                                        </li>
                                        <li className="page-item">
                                            <button type="button" className="page-link"
                                                disabled={atualPagina === total ? true : false} onClick={this.proximaPagina}
                                            >Próxima</button>
                                        </li>
                                        <li className="page-item">
                                            <button type="button" className="page-link"
                                                disabled={atualPagina === total ? true : false} onClick={this.ultimaPagina}
                                            >Última</button>
                                        </li>
                                    </ul>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default ConsultaTime