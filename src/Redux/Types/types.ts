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
    dateOfStart: string,
    dateOfEnd: string,
    id: number,
    isFixed: "true" | "false"
}