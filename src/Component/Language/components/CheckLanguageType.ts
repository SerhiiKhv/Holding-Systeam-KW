import {useContext} from "react";
import {LanguageContext} from "./LanguageContext";
import {UkraineLanguage} from "../LanguageType/ua";
import {EnglishLanguage} from "../LanguageType/en";
import {JapanLanguage} from "../LanguageType/jp";

export const CheckLanguageType = () => {
    const { lang } = useContext(LanguageContext);
    if(lang === "en"){
        return EnglishLanguage
    }else if(lang === "jp"){
        return JapanLanguage
    }
    else{
        return UkraineLanguage
    }
}
