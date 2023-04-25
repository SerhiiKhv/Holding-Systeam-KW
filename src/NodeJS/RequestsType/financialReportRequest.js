const express = require('express');
const fs = require('fs');

const router = express.Router();

const financialReportFilePath = './DateJSON/FinancialReport.json';

router.get('/', (req, res) => {
    fs.readFile(financialReportFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.send(data);
    });
});

router.post('/', (req, res) => {
    try {
        const newFinancialReport = req.body;

        fs.readFile(financialReportFilePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }

            const financialReport = JSON.parse(data);

            if (newFinancialReport && Object.keys(newFinancialReport).length > 0) {
                newFinancialReport.id = Date.now();
                financialReport.push(newFinancialReport);
            }

            fs.writeFile(financialReportFilePath, JSON.stringify(financialReport), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                    return;
                }

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.sendStatus(200);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const newCompany = req.body;

        fs.readFile(financialReportFilePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }

            let companys = JSON.parse(data);

            const companyIndex = companys.findIndex((e) => e.id === id);

            if (companyIndex === -1) {
                res.status(404).send('Company not found');
                return;
            }

            companys[companyIndex] = { ...companys[companyIndex], ...newCompany }; // Замінюємо дані підприємства

            fs.writeFile(financialReportFilePath, JSON.stringify(companys), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                    return;
                }

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.sendStatus(200);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        fs.readFile(financialReportFilePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }

            let financialReports = JSON.parse(data);

            const companyIndex = financialReports.findIndex((e) => e.id === id); // Знаходимо індекс підприємства за його id

            if (companyIndex === -1) {
                res.status(404).send('Company not found');
                return;
            }

            financialReports.splice(companyIndex, 1); // Видаляємо підприємство з масиву

            fs.writeFile(financialReportFilePath, JSON.stringify(financialReports), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                    return;
                }

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.sendStatus(200);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

module.exports = router;