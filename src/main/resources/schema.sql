create table if not exists customers (
	id INT PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL
);

create sequence if not exists seq_customers increment by 1 start with 1 minvalue 1 maxvalue 999999 nocycle;