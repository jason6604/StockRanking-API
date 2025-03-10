import express from 'express'
import fs from 'fs'

const api = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
api.use(express.json());

api.listen(PORT, () => {
    console.log(`Demo API Server is running on port ${PORT}`)
});

const rankingStockData = JSON.parse(fs.readFileSync( "./StockRanking.json", 'utf8'));

router.get("/topstocks", (req, res) => {
    res.json(rankingStockData.data);
})

router.get("/topstocksbyrank/:rank", (req, res) => {
    const rank = parseInt(req.params.rank);
    const outputData = rankingStockData.data.filter(stock => stock.ranking === rank);
    res.json(outputData);
})

api.use("/stockapi/", router);

