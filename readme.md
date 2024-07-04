## HOTEL - NODE-JS APP BACKEND PROJECT

This Application is a Node-JS Based system developed using the Following tech stack :

1.  Express-JS Framework

1.  MongoDB for DataBase

---

- The Application manages imformation related to person(staff) and menu items.

- It has some endpoints to handle CRUD(Create,Read,Update,Delete) for both persons and menu items.

[LIVE LINK](https://hotelapp-27dh.onrender.com/)

---

## Endpoints :

---

### PERSONS :

- `Get all Persons`

- Endpoint: `GET/person` [LINK](https://hotelapp-27dh.onrender.com/person)

- Endpoint on Local Host : `GET/person`

- Description: Retrieves a list of all persons in the system.

---

- `Add a Person`

- Endpoint on Local Host : `POST/person`

- Description : Adds a person to record such as name,age,work,mobile email,address,salary,username,password.

---

- `Get Persons by work type : manager,chef,waiter`

- Endpoint on Local Host: `GET/person/work-type`

- Example : `GET/person/manager`

- Endpoint: `GET/person/manager` [LINK](https://hotelapp-27dh.onrender.com/person/manager)

---

- `Update a person `

- Endpoint : `PUT/person/:id`

- Description : Updates the details of a specific person identified by their ID.

---

- `Delete a person`

- Endpoint : `DELETE/person/:id`

- Description : Deletes a person from the system based on their ID.

---

### MENU ITEMS :

- `Get all Menu Items`

- Endpoint: `GET /menu` [LINK](https://hotelapp-27dh.onrender.com/menu)

- Endpoint on Local Host : `GET/menu`

- Description: Retrieves a list of all menu items in the system.

---

- `Add a menu Item`

- Endpoint : `POST/menu`

- Description : Adds a menu item to the record with details such as name, price, taste, etc.

---

- `Get menu item by taste`

- Endpoint on Local Host: `GET/menu/:taste`

- Example : `GET/menu/sweet`

- Endpoint : `GET/menu/sweet` [LINK](https://hotelapp-27dh.onrender.com/menu/sweet)

- Description : Retrieves a list of menu items based on their taste (e.g., sweet, spicy, sour).

---

- `Update all Menu Items`

- Endpoint : `PUT/menu:id`

- Description : Updates the details of a specific menu item identified by its ID.

---

- `Delete a menu item`

- Endpoint : `DELETE/menu/:id`

- Description : Deletes a menu item from the records based on its ID.

---

## Data Models :

---

### Person

The Person data model represents information about staff members in the hotel.

- Fields :

- `name :` String (Person's name)

- `age :` Number (Person's age)

- `work :` Enum (Role in the hotel, such as chef, waiter, manager)

- `mobile :` String (Person's mobile number)

- `email :` String (Person's email address, unique)

- `address :` String (Person's address)

- `salary :` Number (Person's salary)

- `username :` String (Person's username)

- `password :` String (Persons Password)

---

- Example :

```json 
{
"name": "Akshay",
"age": 50,
"work": "manager",
"mobile": "123-456-7890",
"email": "akshaytoken23@gmail.com",
"address": "Mumbai",
"salary": 70000,
"username": "iamakshaytoken",
"password": "$2b$10$BUIhhNIx9niPxgo/T0dDMOlzCcQR7aZIK4lBmgL0x1/Fx9X2dVKva",
} 

---

### Menu Items :

The MenuItem data model represents information about menu items available in the hotel.

- fields :

- `name `: String (Item's name)

- `price`: Number (Item's price)

- `taste`: Enum (Item's taste, such as sweet, spicy, sour)

- `is_drink`: Boolean (Indicates if the item is a drink, default is false)

- `ingredients`: Array of Strings (List of ingredients, default is an empty array)

- `num_sales `: Number (Number of sales for the item, default is 0)

- Example :

``` json
{
"name": "Matar Panner",
"price": 59.99,
"taste": "spicy",
"is_drink": true,
"ingredients": [
"[ 'matar', 'potato', 'paneer' ]"
],
"num_sales": 5,
}`

---

### Usage :

Install Dependencies :

`npm install`
