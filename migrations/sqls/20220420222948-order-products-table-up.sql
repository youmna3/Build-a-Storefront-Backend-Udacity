/* Replace with your SQL commands */

CREATE Table order_products (
    id SERIAL PRIMARY KEY,
    quantity INT,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
);