import React, { useState } from 'react'
import './styles/navbar.css'
import logo from '../../assets/images/logo.png'
import { useLocation } from 'react-router-dom'
import { SCREENS } from '../../common/Constant';
function NavBarComponent() {
    let location = useLocation();

    const [activemenu, setActivemenu] = useState("Home")

    function selectedMenu() {
        setActivemenu('')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark header">
            {console.log('location', location.pathname)}
            <img src={logo} className="brand" href={SCREENS.HOME} />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className=" justify-content-end collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ">
                    <li className="nav-item  " >
                        <a className={`nav-link ${location.pathname === SCREENS.HOME ? 'active' : ''}`} href={SCREENS.HOME}>Home </a>
                    </li>
                    <li className="nav-item ">
                        <a className={`nav-link ${location.pathname === SCREENS.BUSINESS ? 'active' : ''}`} href={SCREENS.BUSINESS}>Business</a>
                    </li>
                    <li className="nav-item ">
                        <a className={`nav-link ${location.pathname === SCREENS.TECH ? 'active' : ''}`} href={SCREENS.TECH}>Tech Crunch</a>
                    </li>
                    <li className="nav-item ">
                        <a className={`nav-link ${location.pathname === SCREENS.WALLSTREET ? 'active' : ''}`} href={SCREENS.WALLSTREET}>WallStreet Journals</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBarComponent
