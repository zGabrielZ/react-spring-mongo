import React from 'react'
import JogadorService from '../services/jogador-service'
import Card from '../componentes/card'
import { msgErro, msgSucesso } from '../componentes/toastr'
import LocalStorageService from '../services/local-storage-service'

class ConsultaJogador extends React.Component {

    constructor() {
        super()
        this.jogadorService = new JogadorService()
    }

    state = {
        idTime: '',
        id: '',
        nome: '',
        numero: null,
        nacionalidade: '',
        jogadores: [],
        jogadorPorPagina: 5,
        atualPagina: 1,
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            this.jogadorService.lista(params.id)
                .then(response => {
                    this.setState({ jogadores: response.data })
                }).catch(error => {
                    msgErro('Erro ao encontrar a lista de jogadores')
                })
        }
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
        if (this.state.atualPagina < Math.ceil(this.state.jogadores.length / this.state.jogadorPorPagina)) {
            this.setState({
                atualPagina: this.state.atualPagina + 1
            })
        }
    }

    ultimaPagina = () => {
        if (this.state.atualPagina < Math.ceil(this.state.jogadores.length / this.state.jogadorPorPagina)) {
            this.setState({
                atualPagina: Math.ceil(this.state.jogadores.length / this.state.jogadorPorPagina)
            })
        }
    }

    voltar = () => {
        LocalStorageService.removerItem('_time_jogador')
        this.props.history.push(`/consulta-time`)
    }

    cadastrar = () => {
        this.props.history.push(`/jogador`)
    }

    deletar = (id) => {
        this.jogadorService.deletar(id)
            .then(response => {
                if (response.data != null) {
                    msgSucesso('Jogador removido com sucesso !!')
                    this.setState({
                        jogadores: this.state.jogadores
                            .filter(jogador => jogador.id !== id)
                    })
                }
            }).catch(erro => {
                msgErro(erro.response.data.titulo)
                console.log(erro.response)
            })
    }

    edicao = (id) => {
        this.props.history.push(`/jogador/${id}`)
    }

    render() {

        const { jogadores, atualPagina, jogadorPorPagina } = this.state

        const ultimaIndex = atualPagina * jogadorPorPagina
        const primeiraIndex = ultimaIndex - jogadorPorPagina
        const atualJogador = jogadores.slice(primeiraIndex, ultimaIndex)
        const total = Math.ceil(jogadores.length / jogadorPorPagina)

        return (
            <Card title="Lista de jogadores">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <button className="btn btn-success" onClick={this.cadastrar}
                            >
                                Cadastrar jogador
                                </button>
                            <button style={{ marginLeft: '20px' }} onClick={this.voltar} className="btn btn-danger">
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>

                <br />

                <div className="jumbotron">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">Código</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Número da camisa</th>
                                            <th scope="col">Nacionalidade</th>
                                            <th scope="col">Editar</th>
                                            <th scope="col">Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            jogadores.length ?
                                                atualJogador.map(jogador => {
                                                    return (
                                                        <tr key={jogador.id}>
                                                            <td>{jogador.id}</td>
                                                            <td>{jogador.nome}</td>
                                                            <td>{jogador.numeroDaCamisa}</td>
                                                            <td>{jogador.nacionalidade.nome}</td>
                                                            <td><button title="Editar"
                                                                className="btn btn-warning"
                                                                onClick={this.edicao.bind(this, jogador.id)}>
                                                                <i className="pi pi-pencil"></i>
                                                            </button></td>
                                                            <td><button title="Deletar"
                                                                className="btn btn-danger"
                                                                onClick={() =>
                                                                    window.confirm(`Deseja excluir este jogador : ${jogador.nome} ?`) &&
                                                                    this.deletar(jogador.id)
                                                                }
                                                            >
                                                                <i className="pi pi-trash"></i>
                                                            </button></td>
                                                        </tr>
                                                    )
                                                }) : null
                                        }
                                    </tbody>
                                </table>
                                <footer className="paginacao">
                                    <div style={{ float: 'left', color: 'black' }}>
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
                </div>

            </Card>
        )
    }

}

export default ConsultaJogador