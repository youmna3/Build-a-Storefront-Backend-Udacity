/* Replace with your SQL commands */

CREATE Table orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    user_id BIGINT REFERENCES users(id)
);