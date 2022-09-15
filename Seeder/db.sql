CREATE DATABASE IF NOT EXISTS optimization;
/*
DROP TABLE IF EXISTS users,graphmodels,executions;
*/
CREATE TABLE IF NOT EXISTS users (
username VARCHAR(255) NOT NULL PRIMARY KEY,
main_role INT NOT NULL,
mail  VARCHAR(255) NOT NULL UNIQUE,
budget DECIMAL(4,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS graphmodels (
model_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
creator VARCHAR(50) NOT NULL,
graph_struct VARCHAR(10000) NOT NULL,
model_version INT NOT NULL
);

CREATE TABLE IF NOT EXISTS executions (
exec_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
exec_time INT NOT NULL,
model INT NOT NULL,
start_node VARCHAR(10) NOT NULL,
goal_node VARCHAR(10) NOT NULL,
cost_path DECIMAL(5,2) NOT NULL,
opt_path VARCHAR(10000) NOT NULL,
exec_cost DECIMAL(4,2) NOT NULL
);

USE optimization;

INSERT INTO users(username,main_role,mail,budget) VALUES 
('roger_waters',1,'roger@waters.com',10.00),
('robert_plant',1,'robert@plant.com',0.05),
('admin',2,'admin@admin.com',0);
  
INSERT INTO graphmodels(creator,graph_struct,model_version) VALUES
('roger_waters','{"A":{"B":3,"C":2,"D":6,"F":10},"B":{"A":3,"C":1,"D":5,"E":4},"C":{"B":1,"D":2,"H":1},"D":{"B":5,"C":2,"E":3,"G":7},"E":{"B":4,"D":3,"F":1},"F":{"A":10,"E":1,"G":4,"H":9},"G":{"D":7,"F":4,"H":6},"H":{"F":9,"G":6}}',1),
('robert_plant','{"A":{"B":2},"B":{"C":2,"D":3,"G":9},"C":{"A":5,"F":1},"D":{"B":3,"E":1},"E":{"F":5,"I":1},"F":{"D":4,"H":1},"G":{"B":9,"E":6,"J":7},"H":{"D":6,"J":4},"I":{"H":5},"J":{"G":7,"I":3}}',1),
('roger_waters','{"A":{"B":6.5,"C":2,"D":6,"F":10},"B":{"A":3,"C":1,"D":5,"E":4},"C":{"B":1,"D":2,"H":1},"D":{"B":5,"C":2,"E":3,"G":7},"E":{"B":4,"D":3,"F":1},"F":{"A":10,"E":1,"G":4,"H":9},"G":{"D":7,"F":4,"H":6},"H":{"F":9,"G":6}}',2),
('robert_plant','{"A":{"B":6},"B":{"C":2,"D":3,"G":9},"C":{"A":5,"F":1},"D":{"B":3,"E":1},"E":{"F":5,"I":1},"F":{"D":4,"H":1},"G":{"B":9,"E":6,"J":7},"H":{"D":6,"J":4},"I":{"H":5},"J":{"G":7,"I":3}}',2);

INSERT INTO executions(exec_time,model,start_node,goal_node,cost_path,opt_path,exec_cost) VALUES
(1,1,"A","F",8,'["A","B","E","F"]',2.27),
(1,2,"A","J",10,'["A","B","C","F","H","J"]',2.7);