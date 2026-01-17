import { extract } from "../etl/extract.js";
import { transform } from "../etl/transform.js";
import { load } from "../etl/load.js";

export async function runEtl(req, res) {
    try {
        const raw = await extract()
        const clean = await transform(raw)
        await load(clean)

        res.status(200).json({ message: "ETL completed" })
    } catch (error) {
        console.error("ETL error:", error.message)

        res.status(500).json({
            message: "ETL failed",
            error: error.message
        })
    }
}
