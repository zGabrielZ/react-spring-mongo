import React from 'react'
import NavBarItem from '../componentes/navbaritem'

function NavBar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">Spring futebol</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <NavBarItem label="Home" href="#/"></NavBarItem>
                    <NavBarItem label="Cadastro de nacionalidade" href="#/nacionalidade"></NavBarItem>
                    <NavBarItem label="Cadastro de time" href="#/consulta-time"></NavBarItem>
                </ul>
            </div>
        </nav>
    )

}

export default NavBar