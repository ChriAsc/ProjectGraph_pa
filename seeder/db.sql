CREATE DATABASE IF NOT EXISTS optimization;
/*
DROP TABLE IF EXISTS users,graphmodels,executions;
*/
CREATE TABLE IF NOT EXISTS users (
username VARCHAR(255) NOT NULL PRIMARY KEY,
main_role INT NOT NULL,
mail  VARCHAR(255) NOT NULL UNIQUE,
budget DECIMAL(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS graphmodels (
model_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
creator VARCHAR(50) NOT NULL,
graph_struct JSON NOT NULL,
model_version INT NOT NULL,
CONSTRAINT graphmodels_ibfk_1 FOREIGN KEY (creator) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS executions (
exec_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
start_time TIMESTAMP NOT NULL,
stop_time TIMESTAMP NOT NULL,
model INT NOT NULL,
start_node VARCHAR(10) NOT NULL,
goal_node VARCHAR(10) NOT NULL,
cost_path DECIMAL(5,2) NOT NULL,
opt_path VARCHAR(10000) NOT NULL,
CONSTRAINT executions_ibfk_1 FOREIGN KEY (model) REFERENCES graphmodels(model_id)
);

USE optimization;

INSERT INTO users(username,main_role,mail,budget) VALUES 
('mario_rossi',1,'mario@rossi.com',10.00),
('giuseppe_verdi',1,'giuseppe@verdi.com',10.00),
('admin',2,'admin@admin.com',0);
  
INSERT INTO graphmodels(creator,graph_struct,model_version) VALUES
('mario_rossi','{"A": {"B": 1},"B": {"A": 1,"C": 2,"D": 4},"C": {"B": 2,"D": 1},"D": {"B": 4,"C": 1}}',1),
('giuseppe_verdi','{"A": {"B": 3,"D": 7},"B": {"A": 3,"C": 1},"C": {"B": 1,"D": 2},"D": {"A": 7,"C": 2,"E": 4},"E": {"D": 4}}',1);

INSERT INTO executions(start_time,stop_time,model,start_node,goal_node,cost_path,opt_path) VALUES
('2022-09-03T10:24:32+00:00','2022-09-03T10:24:45+00:00',1,"A","D",4,'["A","B","C","D"]'),
('2022-09-03T10:31:31+00:00','2022-09-03T10:31:33+00:00',2,"B","D",3,'["B","C","D"]');