create table if not exists tasks (
       id INT PRIMARY KEY AUTO_INCREMENT,
       title VARCHAR(50) NOT NULL,
       memo VARCHAR(255) NOT NULL
);