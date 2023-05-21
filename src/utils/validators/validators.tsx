export const MaxLength = (maxLength: number) => (value: string) => {
    if (value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    }
    return undefined;
}

export const required = (value: string) => {
    if (value) {
        return undefined;
    }
    return "Field is required";
}