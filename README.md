<p align="center">
  <h1 align="center">Rumblr</h1>
  <h3 align="center">Rumblr is a single page web application "Tumblr" clone where users can post vehicle related images along with a message.</h3>
</p>

<br/>

# Table of Contents

- [Live Site](https://rumblr-app.herokuapp.com/)
- [Usage](#usage)
- [Technologies Used](#technologiesused)
- [MVP Feature List](#mvpfeaturelist)
- [Frontend Routes](#frontendroutes)
- [Database Schema](#databaseschema)
- [API Routes](#apiroutes)
- [Tests](#tests)
- [Contact](#contact)

<br/>

---

<a name="usage"></a>

# Usage

## To launch Rumblr in a development environment:

1.  `cd backend` and create a .env based off .env.example. Fill in the newly created .env file with your PSQL user and database credentials.

<br/>

2.  Install dependencies in both backend and front-end directories

    - `cd backend && npm install`
    - `cd frontend && npm install`

<br/>

3.  In the backend/ folder run the following command to create,migrate, and seed the database.

    - `npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all`

<br/>

4.  Run the following two commands from the root folder each on seperate terminal windows:

    - `cd backend && npm start`
    - `cd frontend && npm start`

<br/>

5.  Navigate to http://localhost:3000/ to interact with the Rumblr app!

<br/>

---

<a name="technologiesused"></a>

# Technologies and Libraries Used

### Server (backend)

- Sequelize ORM
- PostgreSQL
- Express

<br/>

### Client (Javascript)

- React
- Redux
- AWS S3
- Material UI
- Cypress.io

<br/>

---

<a name="mvpfeaturelist" ></a>

# MVP Feature List

## 1. Sign up, log in, log out, and demo-user login.

- Users can sign up, log in, and log out.
- Users can login as demo-user to interact with the application.
- Authenticated users can navigate to their Profile which displays their profile picture, bio, and posts.
- Authenticated users can navigate to Settings which allows them to update their profile picture, bio, username, email, and/or password.

<br/>

## 2. User posts.

- Authenticated users can create posts with a image and message.
- Authenticated users can like, edit, and delete their own posts.
- Authenticated users can view the newest posts, and a random post on the Discover page.

<br/>

## 3. User likes.

- Authenticated users can like other users posts as well as their own.
- Authenticated users can remove their like from other users posts as well as their own.

<br/>

---

<a name="frontendroutes"></a>

# Client (backend) Routes

<br/>

---

<a name="apiroutes"></a>

# Server (frontend) Routes

<br/>

---

<a name="databaseschema"></a>

# Database Schema

## Users

| column name    | data type     |               details |
| :------------- | :------------ | --------------------: |
| id             | integer       | not null, primary key |
| username       | string        |      not null, unique |
| email          | string        |      not null, unique |
| bio            | string        |              nullable |
| profilePicture | string        |              nullable |
| hashedPassword | binary string |              not null |
| createdAt      | datetime      |              not null |
| updatedAt      | datetime      |              not null |

<br />

## Posts

| column name | data type |               details |
| :---------- | :-------- | --------------------: |
| id          | integer   | not null, primary key |
| content     | string    |              not null |
| body        | string    |              not null |
| userId      | integer   | not null, foreign key |
| createdAt   | datetime  |              not null |
| updatedAt   | datetime  |              not null |

<br />

## Likes

| column name | data type |               details |
| :---------- | :-------- | --------------------: |
| id          | integer   | not null, primary key |
| postId      | integer   | not null, foreign key |
| userId      | integer   | not null, foreign key |
| createdAt   | datetime  |              not null |
| updatedAt   | datetime  |              not null |

<br />

---

<a name="tests"></a>

# Tests

## Cypress.io

1. `cd backend && npx dotenv sequelize db:seed:all`
2. `cd frontend && npx cypress open`
3. Run individual or all integration specs.

<br/>

---

<a name="contact"></a>

# Contact

<br/>

<p>name: Mustafa Mousa</p>
<p>email: contact@mustafamousa.com</p>
<ul>
 <a href="http://mustafaomousa.github.io/">Portfolio</a>
 <a href="https://www.linkedin.com/in/mustafa-mousa-8b8053157/">LinkedIn</a>
</ul>

[login-screenshot]: images/login-screenshot.png
[home-page-screenshot]: images/home-page-screenshot.png
