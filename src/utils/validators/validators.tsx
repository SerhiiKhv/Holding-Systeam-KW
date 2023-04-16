export const MaxLength = (maxLength: number) => (value: string) => {
    if (value.length > maxLength) {
        return `Max lenght is ${maxLength} symbols`
    }
    return undefined;
}

export const required = (value: string) => {
    console.log(value)
    if (value) {
        return undefined;
    }
    return "Field is required";
}

export const dateValidator = (value: string) => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;

    if (!regex.test(value)) {
        return "Невірний формат дати. Введіть дату у форматі 'дд.мм.рррр'";
    }
    return undefined;
};