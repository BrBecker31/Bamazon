DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(75) NOT NULL,
department_name VARCHAR(75) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
primary key(item_id)
);
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(75) NOT NULL,
department_name VARCHAR(75) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(20) NOT NULL,
primary key(item_id)
);

SELECT*FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("XBOX ONE", "Electronics", 299.99, 25), ("iPhone 6", "Electronics", 399.99, 30),
	("Halo 5", "Video Games", 39.99, 20),("Woodie Wooden Watch", "Jewelry", 59.99, 10),
    ("55' Flat Screen", "Electronics", 250.49, 15),("Bamazon Echo", "Electronics", 69.99, 40),
    ("Ninja Star", "Outdoors", 29.99, 30),("Top Gun", "Movies", 9.99, 5),
    ("Fire Pit", "Outdoors", 199.99, 10),("LED Headlamp", "Outdoors", 19.99, 15);


