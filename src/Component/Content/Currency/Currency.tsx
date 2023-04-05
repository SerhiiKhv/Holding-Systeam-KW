import React, {useState} from 'react';

interface CurrencyInputProps {
    label: string;
    currency: string;
    value: number;
    onValueChange: (newValue: number) => void;
}
interface ExchangeRate {
    fromCurrency: string;
    toCurrency: string;
    rate: number;
}
const CurrencyInput = (props: CurrencyInputProps) => {
    const {label, currency, value, onValueChange} = props;

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        onValueChange(newValue);
    }

    return (
        <div>
            <label>{label}</label>
            <input type="number" value={value} onChange={handleValueChange}/>
            <span>{currency}</span>
        </div>
    );
}
const convertCurrency = (amount: number, fromCurrency: string,
                         toCurrency: string, exchangeRates: ExchangeRate[]): number => {
    if (fromCurrency !== toCurrency) {
        const exchangeRate = exchangeRates.find(rate => rate.fromCurrency === fromCurrency
            && rate.toCurrency === toCurrency);

        if (!exchangeRate) {
            throw new Error(`Cannot find exchange rate from ${fromCurrency} to ${toCurrency}`);
        }

        return amount * exchangeRate.rate;

    } else {
        return amount
    }


}


export const Currency = () => {

    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');

    const exchangeRates: ExchangeRate[] = [
        {fromCurrency: 'USD', toCurrency: 'EUR', rate: 0.84},
        {fromCurrency: 'USD', toCurrency: 'UAH', rate: 36.95},
        {fromCurrency: 'EUR', toCurrency: 'UAH', rate: 40.33},
        {fromCurrency: 'EUR', toCurrency: 'USD', rate: 1.09},
        {fromCurrency: 'UAH', toCurrency: 'USD', rate: 0.027},
        {fromCurrency: 'UAH', toCurrency: 'EUR', rate: 0.025},
    ];

    const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency, exchangeRates);

    const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromCurrency(event.target.value);
    }

    const handleToCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setToCurrency(event.target.value);
    }

    return (
        <div>
            <h1>Currency Converter</h1>
            <CurrencyInput label="Amount" currency={fromCurrency} value={amount} onValueChange={setAmount}/>
            <div>
                <label>From:</label>
                <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UAH">UAH</option>
                </select>
            </div>
            <div>
                <label>To:</label>
                <select value={toCurrency} onChange={handleToCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UAH">UAH</option>
                </select>
            </div>
            <div>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</div>
        </div>
    );
}