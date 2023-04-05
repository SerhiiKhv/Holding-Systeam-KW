import React, {useContext} from "react";
import {LanguageContext} from "./LanguageContext";
import UKFlag from "../img/UAFlag.jpg";
import ENFlag from "../img/ENFlag.png";
import JPFlag from "../img/JapanFlag.gif";
import style from "./LanguageSwitcher.module.scss"

const LanguageSwitcher: React.FC = () => {
    const {lang, setLang} = useContext(LanguageContext);
    const handleChangeLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLang(event.target.value);
    };

    const CheckFlag = () => {
        if( lang == "jp"){
            return <img src={JPFlag} className={style.imgFlag} alt={"Loading..."}/>
        }else if ( lang == "en"){
            return <img src={ENFlag} className={style.imgFlag} alt={"Loading..."}/>
        }else {
            return <img src={UKFlag} className={style.imgFlag} alt={"Loading..."}/>
        }
    }

    return (
        <div>
            {CheckFlag()}
            <select value={lang} onChange={handleChangeLang} className={style.select}>
                    <option value="uk" className={style.option}> Українська</option>
                    <option value="en" className={style.option}> English</option>
                    <option value="jp" className={style.option}> Japan</option>
            </select>
        </div>
    );
};
export default LanguageSwitcher;