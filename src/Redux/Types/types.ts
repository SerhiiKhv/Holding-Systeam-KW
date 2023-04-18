export type CompanyType = {
    name: string,
    enterprises: Array<string>,
    id: number
}

export type EnterpriseType = {
    name: string,
    profit: number,
    dateOfCreation: string,
    id: number
}

export type FinancialReportType = {
    name: string,
    profit: number,
    startDate: string,
    endDate: string,
    id: number
}