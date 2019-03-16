/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Create the database wishes_db and specified it for use.
DROP DATABASE IF EXISTS wishes_db;
CREATE DATABASE wishes_db;
USE wishes_db;

-- Create the table wishes.
CREATE TABLE wishes
(
id int NOT NULL AUTO_INCREMENT,
wish varchar(255) NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO wishes (wish) VALUES ('Hooman wants to read minds.');
INSERT INTO wishes (wish) VALUES ('Emily wants to win the lottery.');
INSERT INTO wishes (wish) VALUES ('Julie wishes for a room full of kittens.');
INSERT INTO wishes (wish) VALUES ('Tim wishes for a fridge full of Le Frou Frou beer.');
