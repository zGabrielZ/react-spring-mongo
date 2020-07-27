import React from 'react'
import '../css/home-estilo.css'


class Home extends React.Component{

    cadastrarNacionalidade = () =>{
        this.props.history.push('/nacionalidade')
    }

    cadastrarTime = () =>{
        this.props.history.push('/consulta-time')
    }

    render(){
        return(
            <div style={{marginTop:'40px'}} className="jumbotron">
                <h1 className="display-3">Bem vindo</h1>
                <p className="lead">Esse é o seu sistema de cadastro, pode usar a qualquer momento!!</p>
                <p>A página Home é a sua aréa adminstrativa, utilize os botões abaixo para navegar ou até mesmo 
                    usar a ferramenta de cima.
                </p>
                <p className="lead bt">
                    <button className="btn btn-primary btn-lg um-btn" onClick={this.cadastrarNacionalidade}>
                        Cadastrar nacionalidade
                    </button>
                    <button  className="btn btn-danger btn-lg dois-btn"
                    onClick={this.cadastrarTime}>
                        Cadastrar time
                    </button>
                </p>
            </div>
        )
    }

}

export default Home