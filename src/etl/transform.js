export function transform(rows) {
    return rows.map(r => ({
        date: new Date(r.transaction_date),

        product_id: r.product_id,
        customer_id: r.customer_id,

        quantity_sold: r.quantity,

        // dummy total (karena tidak ada price di source)
        total_amount: r.quantity * 10000
    }))
}
