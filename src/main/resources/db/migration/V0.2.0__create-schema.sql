create table if not exists customers (
       id INT PRIMARY KEY AUTO_INCREMENT,
       first_name VARCHAR(100) NOT NULL,
       last_name VARCHAR(100) NOT NULL
);