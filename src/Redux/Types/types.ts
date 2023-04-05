export type Currency = {
    name: string,
    price: number
}

export type Company = {
    name: string,
    Enterprise: Array<Enterprise>
}

export type Enterprise = {
    name: string,
    profit: number,
    dateOfCreation: string
}

export type FinancialReport = {
    name: string,
    profit: number,
    startDate: string,
    endDate: string
}