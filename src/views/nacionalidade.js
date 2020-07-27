import React from 'react'
import '../css/nacionalidade-estilo.css'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import NacionalidadeService from '../services/nacionalidade-service'
import { msgErro, msgSucesso, msgErroForm } from '../componentes/toastr'
import { withRouter } from 'react-router-dom'

class Nacionalidade extends React.Component {


    state = {
        nome: '',
        nacionalidades: [],
        nacionalidadePorPagina: 5,
        atualPagina: 1,
        errorCampos: []
    }

    constructor() {
        super()
        this.nacionalidadeService = new NacionalidadeService()
    }

    cadastrar = () => {
        const nacionalidade = {
            nome: this.state.nome
        }

        this.nacionalidadeService.cadastrar(nacionalidade)
            .then(response => {
                this.componentDidMount()
                this.setState({ nome: '' })
                msgSucesso('Cadastrado com sucesso !')
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
        this.props.history.push('/')
    }

    componentDidMount() {
        this.nacionalidadeService.lista()
            .then(response => {
                this.setState({ nacionalidades: response.data })
            }).catch(error => {
                msgErro('Erro ao encontrar a lista de nacionalidades')
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
        if (this.state.atualPagina < Math.ceil(this.state.nacionalidades.length / this.state.nacionalidadePorPagina)) {
            this.setState({
                atualPagina: this.state.atualPagina + 1
            })
        }
    }

    ultimaPagina = () => {
        if (this.state.atualPagina < Math.ceil(this.state.nacionalidades.length / this.state.nacionalidadePorPagina)) {
            this.setState({
                atualPagina: Math.ceil(this.state.nacionalidades.length / this.state.nacionalidadePorPagina)
            })
        }
    }

    deletar = (id) => {
        this.nacionalidadeService.deletar(id)
            .then(response => {
                if (response.data != null) {
                    msgSucesso('Nacionalidade removido com sucesso !!')
                    this.setState({
                        nacionalidades: this.state.nacionalidades
                            .filter(nacionalidade => nacionalidade.id !== id)
                    })
                }
            }).catch(erro => {
                msgErro(erro.response.data.titulo)
                console.log(erro.response)
            })
    }

    render() {

        const { nacionalidades, atualPagina, nacionalidadePorPagina } = this.state

        const ultimaIndex = atualPagina * nacionalidadePorPagina
        const primeiraIndex = ultimaIndex - nacionalidadePorPagina
        const atualNacionalidade = nacionalidades.slice(primeiraIndex, ultimaIndex)
        const total = Math.ceil(nacionalidades.length / nacionalidadePorPagina)


        return (
            <Card title="Cadastro de nacionalidade">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup id="nome" label="Nacionalidade : " htmlFor="nome">
                                <input type="text" value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    className="form-control"
                                    id="nome" name="nome"
                                    aria-describedby="nomeHelp" placeholder="Digite a nacionalidade"></input>
                            </FormGroup>
                            <button className="btn btn-success" onClick={this.cadastrar}>
                                Cadastrar
                                </button>
                            <button style={{ marginLeft: '20px' }} onClick={this.voltar} className="btn btn-danger">
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>

                <br />

                <Card title="Lista de nacionalidades">
                    <div className="jumbotron">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <table className="table table-hover">
                                        <thead className="th">
                                            <tr className="table-primary">
                                                <th scope="col">Código</th>
                                                <th scope="col">Nacionalidade</th>
                                                <th scope="col">Excluir</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                nacionalidades.length ?
                                                    atualNacionalidade.map(nacionalidade => {
                                                        return (
                                                            <tr key={nacionalidade.id}>
                                                                <td>{nacionalidade.id}</td>
                                                                <td>{nacionalidade.nome}</td>
                                                                <td><button title="Deletar"
                                                                    className="btn btn-danger"
                                                                    onClick={() =>
                                                                        window.confirm(`Deseja excluir esta nacionalidade : ${nacionalidade.nome} ?`) &&
                                                                        this.deletar(nacionalidade.id)
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

            </Card>
        )
    }

}

export default withRouter(Nacionalidade)