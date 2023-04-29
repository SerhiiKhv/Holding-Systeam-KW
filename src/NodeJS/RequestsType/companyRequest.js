const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const companyFilePath = './DateJSON/Company.json';

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(companyFilePath);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newCompany = req.body;
        const data = await fs.readFile(companyFilePath);
        const companys = JSON.parse(data);

        if (newCompany && Object.keys(newCompany).length > 0) {
            newCompany.id = Date.now();
            companys.push(newCompany);
        }

        await fs.writeFile(companyFilePath, JSON.stringify(companys));
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

        let data = await fs.readFile(companyFilePath);
        let companys = JSON.parse(data);
        const companyIndex = companys.findIndex((e) => e.id === id);

        if (companyIndex === -1) {
            res.status(404).send('Company not found');
            return;
        }

        companys[companyIndex] = {...companys[companyIndex], ...newCompany};
        await fs.writeFile(companyFilePath, JSON.stringify(companys));
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let data = await fs.readFile(companyFilePath);
        let companys = JSON.parse(data);
        const companyIndex = companys.findIndex((e) => e.id === id);

        if (companyIndex === -1) {
            res.status(404).send('Company not found');
            return;
        }

        companys.splice(companyIndex, 1);
        await fs.writeFile(companyFilePath, JSON.stringify(companys));
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

module.exports = router;