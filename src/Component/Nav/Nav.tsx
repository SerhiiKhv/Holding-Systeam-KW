import style from "./Nav.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
export const Nav = () => {
    return <nav className={style.nav}>
        <div className={style.margin}>
            <NavLink to='/company' className={({isActive} ) =>
                isActive  ? style.activeLink : style.noActiveLink} >Company</NavLink>
        </div>
        <div className={style.margin}>
            <NavLink to='/currency' className={({isActive} ) =>
                isActive  ? style.activeLink : style.noActiveLink} >Currency</NavLink>
        </div>
        <div className={style.margin}>
            <NavLink to='/enterprise' className={({isActive} ) =>
                isActive  ? style.activeLink : style.noActiveLink} >Enterprise</NavLink>
        </div>
        <div className={style.margin}>
        <NavLink to='/financialReport' className={({isActive} ) =>
            isActive  ? style.activeLink : style.noActiveLink} >FinancialReport</NavLink>
    </div>
    </nav>
}