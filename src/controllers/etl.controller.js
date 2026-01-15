import { extract } from "../etl/extract.js";
import { transform } from "../etl/transform.js";
import { load } from "../etl/load.js";

export async function runEtl(req, res) {
    const raw = await extract()
    const clean = await transform(raw)
    await load(clean)

    res.status(200).json({ messege: 'ETL completed' })
}