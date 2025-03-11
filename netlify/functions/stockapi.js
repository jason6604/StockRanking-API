import express from 'express'
import serverless from 'serverless-http';
import cors from 'cors'
import fs from 'fs'

const api = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: ['*'],
    methods: 'GET',
    allowedHeaders: ['Content-Type', 'Authorization'],
}
api.use(express.json());
api.use(cors(corsOptions));

api.listen(PORT, () => {
    console.log(`Demo API Server is running on port ${PORT}`)
});

const rankingStockData = JSON.parse(fs.readFileSync(__dirname + "/StockRanking.json", 'utf8'));
const companyData = JSON.parse(fs.readFileSync(__dirname + "/CompanyInfo.json", 'utf8'));
const stockIndecatorsData = JSON.parse(fs.readFileSync(__dirname + "/StockIndecators.json", 'utf8'));
const stockPriceInfoData = JSON.parse(fs.readFileSync(__dirname + "/StockPriceInfo.json", 'utf8'));

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

router.get(["/getstockpricing", "/getstockpricing/:id"], (req, res) => {    
    const stockId = parseInt(req.params.id);
    if (!stockId) {
        res.json(stockPriceInfoData);
        return;
    }

    const outputData = stockPriceInfoData.filter(stock => stock.stock_id == stockId);
    res.json(outputData);
})

router.get(["/getstocksbyrank", "/getstocksbyrank/:rank"], (req, res) => {
    const rank = parseInt(req.params.rank);
    if (!rank) {
        res.json(rankingStockData.data);
        return;
    }

    const outputData = rankingStockData.data.filter(stock => stock.ranking == rank);
    res.json(outputData);
})

router.get(["/getcompanyinfo", "/getcompanyinfo/:id"], (req, res) => {    
    const stockId = parseInt(req.params.id);
    if (!stockId) {
        res.json(companyData.data);
        return;
    }

    const outputData = companyData.data.filter(company => company.stock_id == stockId);
    res.json(outputData);
})

router.get(["/getstockindecators", "/getstockindecators/:id"], (req, res) => {  
    const stockId = parseInt(req.params.id);
    if (!stockId) {
        res.json(stockIndecatorsData);
        return;
    }
    const outputData = stockIndecatorsData.filter(stock => stock.stock_id == stockId);
    res.json(outputData);
})

api.use("/stockapi/", router);

export const handler = serverless(api);