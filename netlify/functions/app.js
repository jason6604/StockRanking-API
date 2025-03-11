import express from 'express'
import serverless from 'serverless-http';
import fs from 'fs'

const api = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
api.use(express.json());

api.listen(PORT, () => {
    console.log(`Demo API Server is running on port ${PORT}`)
});

const rankingStockData = JSON.parse(fs.readFileSync("./StockRanking.json", 'utf8'));

router.get("/", (req, res) => {
    res.header().json({message: "Stock Ranking API V1.0"});
})

router.get("/getstocks", (req, res) => {    
    res.json(rankingStockData.data);
})

router.get("/getstocksbyrank/:rank", (req, res) => {
    const rank = parseInt(req.params.rank);
    const outputData = rankingStockData.data.filter(stock => stock.ranking === rank);
    res.json(outputData);
})

api.use("/stockapi/", router);

export const handler = serverless(api);