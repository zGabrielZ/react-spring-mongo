import React from 'react'

function NavBarItem(props){

    return(
        <li className="nav-item active">
            <a className="nav-link"
             onClick={props.onClick} 
             href={props.href}>{props.label}
             <span className="sr-only">(current)</span></a>
        </li>
    )

}

export default NavBarItem