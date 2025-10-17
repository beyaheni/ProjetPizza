-- Create the database
CREATE DATABASE IF NOT EXISTS PizzaDB;

-- Use the database
USE PizzaDB;

-- Drop existing tables to avoid conflicts
DROP TABLE IF EXISTS contain;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS pizza;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS serves;

-- Create INGREDIENTS table
CREATE TABLE INGREDIENTS (
    IngredientID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Type VARCHAR(100),
    Origin VARCHAR(100),
    Price DECIMAL(10, 2) NOT NULL CHECK (Price > 0),
    Season ENUM('Winter', 'Spring','Summer','Autumn','All Seasons') DEFAULT 'All Seasons'
);

-- Create PIZZA table
CREATE TABLE PIZZA (
    PizzaID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Category ENUM('Vegan','Vegetarian','Normal'),
    PreparationTime INT NOT NULL,
    Difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
	Size ENUM('Small', 'Medium', 'Large') DEFAULT 'Medium'
);

-- Create Contain table
CREATE TABLE CONTAIN (
    ConnectionID INT AUTO_INCREMENT PRIMARY KEY,
    PizzaID INT NOT NULL,
    IngredientID INT NOT NULL,
    Quantity DECIMAL(10, 2) NOT NULL,
    PreparationNote varchar(100),
    FOREIGN KEY (PizzaID) REFERENCES PIZZA(PizzaID) ON DELETE CASCADE,
    FOREIGN KEY (IngredientID) REFERENCES INGREDIENTS(IngredientID) ON DELETE CASCADE
);


-- Create RESTAURANTS table
CREATE TABLE RESTAURANTS (
    RestaurantID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Category VARCHAR(50),
    Location VARCHAR(255),
    Rating DECIMAL(3, 2),
    Average_price DECIMAL(10, 2)
);

-- Create USER table
CREATE TABLE IF NOT EXISTS USERS (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_name VARCHAR(100) UNIQUE NOT NULL,
    User_email VARCHAR(100) UNIQUE NOT NULL,
    User_pass VARCHAR(40) NOT NULL,
    User_Birthdate DATE NOT NULL,
    User_Phone varchar(20) NOT NULL
);


-- Create SERVES table
CREATE TABLE SERVES (
    RestaurantID INT NOT NULL,
    PizzaID INT NOT NULL,
    PRIMARY KEY (RestaurantID, PizzaID),
    FOREIGN KEY (RestaurantID) REFERENCES RESTAURANTS(RestaurantID) ON DELETE CASCADE,
    FOREIGN KEY (PizzaID) REFERENCES PIZZA(PizzaID) ON DELETE CASCADE
);

-- Create Creates table
CREATE TABLE CREATES (
    User_ID INT NOT NULL,
    PizzaID INT NOT NULL,
    PRIMARY KEY (User_ID, PizzaID),
    Price DECIMAL(10,2) NOT NULL CHECK (Price > 0),
    FOREIGN KEY (User_ID) REFERENCES USERS(User_ID) ON DELETE CASCADE,
    FOREIGN KEY (PizzaID) REFERENCES PIZZA(PizzaID) ON DELETE CASCADE
);

-- Sample data insertion
-- Insert data for Employees
INSERT INTO USERS (User_Name, User_Email, User_Pass, User_Birthdate, User_Phone) VALUES
    ('MaxGodin', 'max.gofin@gmail.com', SHA2('maxou123', 40), '1998-05-21', '+33611223344'),
    ('EugenieTitouche', 'eugenie.titouche@hotmail.com', SHA2('eug_2024', 40), '1999-11-03', '+33655667788'),
    ('MathieuGasnier', 'mathieu.gasnier@gmail.com', SHA2('matmat00', 40), '2000-02-14', '+33677889900'),
    ('AssilaSaid', 'assila.said@yahoo.fr', SHA2('said_44', 40), '1997-07-09', '+33699887766'),
    ('RyanCrohas', 'ryan.crohas@gmail.com', SHA2('gamer399', 40), '2001-04-30', '+33622334455'),
    ('ArthurLainault', 'arthur.lainault@hotmail.com', SHA2('arthur_boss1', 40), '1998-10-17', '+33633445566'),
    ('ClaireDupont', 'claire.dupont@gmail.com', SHA2('claire2025', 40), '1999-03-22', '+33644556677'),
    ('LouisMartin', 'louis.martin@hotmail.com', SHA2('louism98', 40), '1998-12-05', '+33655667799'),
    ('SophieRenard', 'sophie.renard@yahoo.fr', SHA2('sophie_777', 40), '2002-06-11', '+33666778899'),
    ('NicolasTissier', 'nicolas.tissier@gmail.com', SHA2('nico1234', 40), '1996-09-30', '+33677889911');



-- Insert data for RESTAURANTS
INSERT INTO RESTAURANTS (Name, Category, Location, Rating, Average_price) VALUES
    ('Pizza Hut', 'Pizzeria', '14ème', 4.0, 15.00),
    ('Five Pizza', 'Fast Food', '8ème', 4.9, 14.00),
    ('Dominos Pizza', 'Street Pizza', '15ème', 4.5, 22.00),
    ('CalZone', 'Classic Pizzeria', '5ème', 4.2, 28.00),
    ('Delarte', 'Fast Food', '19ème', 4.1, 17.00),
    ('Mama Roma', 'Authentic Italian', '7ème', 4.8, 25.00),
    ('Napoli Mia', 'Napolitan', '3ème', 4.6, 21.00),
    ('Oven & Co', 'Modern Pizza', '16ème', 4.3, 19.50),
    ('PizzaBella', 'Pizzeria', '10ème', 4.0, 16.00),
    ('Tutti Pizza', 'Family Restaurant', '20ème', 3.9, 13.50);

    

-- Insert data for INGREDIENTS
INSERT INTO INGREDIENTS (Name, Type, Origin, Price, Season) VALUES
    ('Tomate', 'Fruit', 'Spain', 0.70, 'Summer'),
    ('Mozzarella', 'Cheese', 'Italie', 1.90, 'All Seasons'),
    ('Sour Cream', 'Cream', 'France', 3.00, 'All Seasons'),
    ('Chicken', 'Animal', 'Portugal', 0.90, 'All Seasons'),
    ('Pork', 'Animal', 'Vietnam', 1.00, 'All Seasons'),
    ('Beef', 'Animal', 'Belgium', 2.50, 'All Seasons'),
    ('Basilic', 'Plant', 'Suisse', 0.50, 'Summer'),
    ('Vegetables', 'Vegetables', 'France', 3.00, 'Spring'),
    ('Onion', 'Vegetable', 'France', 0.40, 'All Seasons'),
    ('Olive Oil', 'Oil', 'Greece', 1.20, 'All Seasons');

    
-- Insert data for PIZZA
INSERT INTO PIZZA (Name, Category, PreparationTime, Difficulty, Size) VALUES
    ('Margarita', 'Vegetarian', 10, 'Easy', 'Medium'),
    ('Parma', 'Normal', 12, 'Medium', 'Large'),
    ('Regina', 'Vegetarian', 11, 'Easy', 'Small'),
    ('Hawaïenne', 'Normal', 14, 'Hard', 'Large'),
    ('Bolognaise', 'Normal', 10, 'Medium', 'Medium'),
    ('Vegana', 'Vegan', 13, 'Medium', 'Large'),
    ('Diavola', 'Spicy', 12, 'Medium', 'Large'),
    ('Capricciosa', 'Normal', 15, 'Hard', 'Large'),
    ('Truffe Blanche', 'Gourmet', 18, 'Hard', 'Large'),
    ('Quattro Formaggi', 'Vegetarian', 12, 'Easy', 'Medium');


-- Insert data for PIZZA_INGREDIENTS
INSERT INTO CONTAIN (PizzaID, IngredientID, Quantity? PreparationNote) VALUES
    (1, 1, 1.5, 'Bake until the crust is golden but not burnt.'),
    (1, 2, 1.5, 'Roll the dough thin, Italian-style.'),
    (2, 2, 1.2, ' With the edges slightly thicker.'),
    (3, 3, 2.5, 'Sprinkle some parmesan after baking.'),
    (4, 4, 1.0, 'Add fresh basil after baking.'),
    (4, 5, 3.5, 'Finish with a pinch of oregano before serving.'),
    (5, 6, 2.0, 'Sprinkle some parmesan after baking.'),
    (6, 7, 1.5, 'Need the pizza dough a little raw.'),
    (7, 8, 0.5, 'Add hot sauce after cooking.'),
    (8, 9, 1.0, 'Bake until the crust is golden a little bit.');


INSERT INTO CREATES (User_ID, PizzaID, Price) VALUES
    (1, 1, 13.90),  -- MaxGodin → Margarita
    (2, 2, 15.50),  -- EugénieTitouche → Parma
    (3, 3, 14.20),  -- MathieuGasnier → Regina
    (4, 4, 16.00),  -- AssilaSaid → Hawaïenne
    (5, 5, 15.30),  -- RyanCrohas → Bolognaise
    (6, 6, 17.80),  -- ArthurLainault → Vegana
    (7, 7, 16.50),  -- ClaireDupont → Diavola
    (8, 8, 18.90),  -- LouisMartin → Capricciosa
    (9, 9, 22.50),  -- SophieRenard → Truffe Blanche
    (10, 10, 15.70); -- NicolasTissier → Quattro Formaggi

    
    INSERT INTO SERVES (RestaurantID, PizzaID) VALUES
    (1, 1), 
    (1, 4), 
    (2, 2), 
    (2, 6), 
    (3, 3), 
    (3, 5), 
    (4, 1), 
    (4, 2), 
    (5, 3), 
    (5, 6); 





