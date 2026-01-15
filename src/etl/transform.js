export function transform(rows) {
    return rows.map(r => ({
        date: r.transaction_date,
        product_id: r.product_id,
        quantity: r.quantity,
        total: r.total * r.price
    }))
}