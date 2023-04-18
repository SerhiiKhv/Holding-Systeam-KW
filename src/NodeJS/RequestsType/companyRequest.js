const express = require('express');
const fs = require('fs');

const router = express.Router();

const companyFilePath = './DateJSON/Company.json';

router.get('/', (req, res) => {
    fs.readFile(companyFilePath, (err, data) => {
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
        const newCompany = req.body;

        fs.readFile(companyFilePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }

            const companys = JSON.parse(data);

            if (newCompany && Object.keys(newCompany).length > 0) {
                newCompany.id = Date.now();
                companys.push(newCompany);
            }

            fs.writeFile(companyFilePath, JSON.stringify(companys), (err) => {
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

        fs.readFile(companyFilePath, (err, data) => {
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

            fs.writeFile(companyFilePath, JSON.stringify(companys), (err) => {
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

        fs.readFile(companyFilePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }

            let companys = JSON.parse(data);

            const companyIndex = companys.findIndex((e) => e.id === id); // Знаходимо індекс підприємства за його id

            if (companyIndex === -1) {
                res.status(404).send('Company not found');
                return;
            }

            companys.splice(companyIndex, 1); // Видаляємо підприємство з масиву

            fs.writeFile(companyFilePath, JSON.stringify(companys), (err) => {
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