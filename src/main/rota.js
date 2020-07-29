import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Nacionalidade from '../views/nacionalidade'
import Home from '../views/home'
import Clube from '../views/clube'
import ConsultaJogador from '../views/consulta-jogador'
import ConsultaTime from '../views/consulta-time'
import Jogador from '../views/jogador'

function Rota() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/consulta-time" component={ConsultaTime}></Route>
                <Route path="/clube/:id?" component={Clube}></Route>
                <Route path="/nacionalidade" component={Nacionalidade}></Route>
                <Route path="/consulta-jogador/:id?" component={ConsultaJogador}></Route>
                <Route path="/jogador/:id?" component={Jogador}></Route>
                <Route path="/" component={Home}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Rota