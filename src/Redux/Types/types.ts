export type CompanyType = {
    name: string,
    Enterprise: Array<EnterpriseType>
}

export type EnterpriseType = {
    name: string,
    profit: number,
    dateOfCreation: string
}

export type FinancialReportType = {
    name: string,
    profit: number,
    startDate: string,
    endDate: string
}