const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const financialReportFilePath = './DateJSON/FinancialReport.json';

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(financialReportFilePath);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newFinancialReport = req.body;
        const data = await fs.readFile(financialReportFilePath)
        const financialReport = JSON.parse(data);

        if (newFinancialReport && Object.keys(newFinancialReport).length > 0) {
            newFinancialReport.id = Date.now();
            financialReport.push(newFinancialReport);
        }

        await fs.writeFile(financialReportFilePath, JSON.stringify(financialReport))
        res.sendStatus(200);

    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const newCompany = req.body;
        const data = await fs.readFile(financialReportFilePath)
        let companys = JSON.parse(data);

        const companyIndex = companys.findIndex((e) => e.id === id);

        if (companyIndex === -1) {
            res.status(404).send('Company not found');
            return;
        }

        companys[companyIndex] = {...companys[companyIndex], ...newCompany}; // Замінюємо дані підприємства

        await fs.writeFile(financialReportFilePath, JSON.stringify(companys))
        res.sendStatus(200);

    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await fs.readFile(financialReportFilePath)
        let financialReports = JSON.parse(data);

        const companyIndex = financialReports.findIndex((e) => e.id === id); // Знаходимо індекс підприємства за його id

        if (companyIndex === -1) {
            res.status(404).send('Company not found');
            return;
        }

        financialReports.splice(companyIndex, 1); // Видаляємо підприємство з масиву

        await fs.writeFile(financialReportFilePath, JSON.stringify(financialReports),)
        res.sendStatus(200);

    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

module.exports = router;