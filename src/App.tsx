import React from 'react';
import './App.css';
import {Nav} from "./Component/Nav/Nav";
import {LanguageProvider} from "./Component/Language/components/LanguageContext";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from "./Redux/redux-store";
import {Companys} from "./Component/Content/Company/Companys";
import {Currency} from "./Component/Content/Currency/Currency";
import {Enterprises} from "./Component/Content/Enterprise/Enterprises";
import {FinancialReports} from "./Component/Content/FinancialReport/FinancialReports";

const AppStart = () => {
    return (
        <div className='app-wrapper'>
            <Nav/>

            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/company' element={<Companys/>}/>
                    <Route path='/currency' element={<Currency/>}/>
                    <Route path='/enterprise' element={<Enterprises/>}/>
                    <Route path='/financialReport' element={<FinancialReports/>}/>
                </Routes>
            </div>
        </div>
    );
}


let App = () => {
    return <BrowserRouter>
        <LanguageProvider>
            <Provider store={store}>
                <AppStart/>
            </Provider>
        </LanguageProvider>
    </BrowserRouter>
}

export default App;