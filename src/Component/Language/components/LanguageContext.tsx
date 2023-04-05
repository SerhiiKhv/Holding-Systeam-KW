import React, { createContext, useState } from "react";

interface MyComponentProps {
    children: JSX.Element[] | JSX.Element;
}

export const LanguageContext = createContext<{
    lang: string;
    setLang: (lang: string) => void;
}>({ lang: "en", setLang: () => {} });

export const LanguageProvider: React.FC<MyComponentProps> = (props) => {
    const [lang, setLang] = useState<string>("en");
    const { children, ...rest } = props;
    const childrenArray = Array.isArray(children) ? children : [children]; // Перетворюємо вхідні дані в масив, якщо потрібно

    const handleSetLang = (lang: string) => {
        setLang(lang);
    };

    const value = { lang, setLang: handleSetLang };

    return (
        <LanguageContext.Provider value={value} {...rest}>
            {childrenArray}
        </LanguageContext.Provider>
    );
};