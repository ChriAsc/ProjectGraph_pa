CREATE DATABASE IF NOT EXISTS optimization;

CREATE TABLE IF NOT EXISTS users (
username VARCHAR(255) NOT NULL PRIMARY KEY,
main_role VARCHAR(255) NOT NULL,
mail  VARCHAR(255) NOT NULL UNIQUE,
pword VARCHAR(255) NOT NULL,
credit DECIMAL(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS graphmodels (
model_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
creator VARCHAR(50) NOT NULL,
graph_struct JSON NOT NULL,
nr_nodes INT NOT NULL,
nr_edges INT NOT NULL,
token_cost DECIMAL(5,2) NOT NULL,
CONSTRAINT graphmodels_ibfk_1 FOREIGN KEY (creator) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS executions (
exec_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
start_time TIMESTAMP NOT NULL,
stop_time TIMESTAMP NOT NULL,
model INT NOT NULL,
start_node VARCHAR(10) NOT NULL,
goal_node VARCHAR(10) NOT NULL,
weight_path DECIMAL(5,2) NOT NULL,
opt_path VARCHAR(8000) NOT NULL,
CONSTRAINT executions_ibfk_1 FOREIGN KEY (model) REFERENCES graphmodels(model_id)
);

USE optimization;

INSERT INTO users(username, main_role,mail,pword,credit) VALUES 
('mario_rossi','user','mario@rossi.com','abcd',10.00),
('giuseppe_verdi','user','giuseppe@verdi.com','1234',10.00),
('admin','admin','admin@admin.com','admin',0);
  
INSERT INTO graphmodels(creator,graph_struct,nr_nodes,nr_edges,token_cost) VALUES
('mario_rossi','{"A": {"B": 1},"B": {"A": 1,"C": 2,"D": 4},"C": {"B": 2,"D": 1},"D": {"B": 4,"C": 1}}',4,4,1.04),
('giuseppe_verdi','{"A": {"B": 3,"D": 7},"B": {"A": 3,"C": 1},"C": {"B": 1,"D": 2},"D": {"A": 7,"C": 2,"E": 4},"E": {"D": 4}}',5,5,1.3);

INSERT INTO executions(start_time,stop_time,model,start_node,goal_node,weight_path,opt_path) VALUES
('2022-09-03T10:24:32+00:00','2022-09-03T10:24:45+00:00',1,"A","D",4,'["A","B","C","D"]'),
('2022-09-03T10:31:31+00:00','2022-09-03T10:31:33+00:00',2,"B","E",3,'["B","C","D"]');