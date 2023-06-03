import style from "./Nav.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
import logo from '../../Assets/img/logo.png'

export const Nav = () => {
    return <nav className={style.nav}>
        <div>
            <NavLink to='/' className={({isActive}) =>
                isActive ? style.activeLink : style.noActiveLink}>
                <img className={style.logo} src={logo} alt={'logo'}/></NavLink>
        </div>
        <div>
            <NavLink to='/company' className={({isActive}) =>
                isActive ? style.activeLink : style.noActiveLink}>Company</NavLink>
        </div>
        <div>
            <NavLink to='/currency' className={({isActive}) =>
                isActive ? style.activeLink : style.noActiveLink}>Currency</NavLink>
        </div>
        <div>
            <NavLink to='/enterprise' className={({isActive}) =>
                isActive ? style.activeLink : style.noActiveLink}>Enterprise</NavLink>
        </div>
        <div>
            <NavLink to='/financialReport' className={({isActive}) =>
                isActive ? style.activeLink : style.noActiveLink}>FinancialReport</NavLink>
        </div>
    </nav>
}