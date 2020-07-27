import React from 'react';
import 'bootswatch/dist/lux/bootstrap.css'
import Rota from './rota'
import NavBar from '../componentes/navbar';
import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {
    
  render(){
    return(
      <>
      <NavBar/>
      <div className="container">
          <Rota/>
          </div>
      </>
    )
  }

}

export default App;
