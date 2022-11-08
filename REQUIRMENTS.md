# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users

- create route: ('api/users/') [Post]
- index route: ('api/users') [get]
- show route: ('api/users/:id) [get]

### products

- create route: ('api/products/') [Post]
- index route: ('api/products') [get]
- show route: ('api/products/:id) [get]

### orders

- create route: ('api/orders/') [Post]
- index route: ('api/orders') [get]
- show route: ('api/orders/:id) [get]

### order-products

- create route: ('api/orders/:id/products') [Post]

#### Products

- Index
- Show
- Create [token required]

#### Users

- Index [token required] done
- Show [token required]
- Create

#### Orders

- Current Order by user (args: user id)[token required]

## Data Shapes

### User

type User = {
id?: number;
email: string;
first_name: string;
last_name: string;
password: string;
};

### Products

type Product = {
id?: number;
name: string;
price: number;
};

### Orders

type Order = {
id?: number;
status: string;
user_id: string;
};

### Order Products

type OrderProduct = {
id: number;
quantity: number;
order_id: string;
product_id: string;
};

## Database Schema

### User

CREATE Table users (
id SERIAL PRIMARY KEY,
email VARCHAR(100) NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
password VARCHAR(100) NOT NULL
);

## Product

CREATE Table products (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
price INT NOT NULL
);

## Order

CREATE Table orders (
id SERIAL PRIMARY KEY,
status VARCHAR(50) NOT NULL,
user_id BIGINT REFERENCES users(id)
);

## Order Products

CREATE Table order_products (
id SERIAL PRIMARY KEY,
quantity INT,
order_id BIGINT REFERENCES orders(id),
product_id BIGINT REFERENCES products(id)
);

#### Product

- id
- name
- price

#### User

- id
- first_name
- last_name
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order
