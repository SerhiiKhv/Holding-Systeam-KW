import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrency} from "../../../Redux/Reducers/currency-reducer";
import {getCurrencySelector} from "../../../Redux/selector/currency-selector";

export const Currency = () => {

    const currency = useSelector(getCurrencySelector)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrency())
    }, [])

    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [rateFromCurrency, setRateFromCurrency] = useState(1)
    const [rateToCurrency, setRateToCurrency] = useState(1)

    const convertCurrency = (): number => {
        if(fromCurrency !== toCurrency){
            return amount * rateFromCurrency / rateToCurrency
        }else{
            return amount
        }
    }

    const convertedAmount = convertCurrency();

    const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromCurrency(event.target.value);

        const selectedCurrency = currency.find(d => d.name == event.target.value);
        if (selectedCurrency) {
            setRateFromCurrency(selectedCurrency.priceToDollar);
        }
    }

    const handleToCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setToCurrency(event.target.value);

        const selectedCurrency = currency.find(d => d.name == event.target.value);
        if (selectedCurrency) {
            setRateToCurrency(selectedCurrency.priceToDollar);
        }
    }

    const handleToAmountChange = (event: any) => {
        setAmount(+event.target.value);
    }

    let optionElement = currency.map(d => <option key={d.id} value={d.name}>{d.name}</option>);

    return (
        <div>
            <h1>Currency Converter</h1>
            <input value={amount} onChange={handleToAmountChange}/>
            <div>
                <label>From:</label>
                <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                    <option key="default" value="">Виберіть валюту:</option>
                    {optionElement}
                </select>
            </div>
            <div>
                <label>To:</label>
                <select value={toCurrency} onChange={handleToCurrencyChange}>
                    <option key="default" value="">Виберіть валюту:</option>
                    {optionElement}
                </select>
            </div>
            <div>{amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}</div>
        </div>
    );
}