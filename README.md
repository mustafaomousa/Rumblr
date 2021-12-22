<div align="center">
  <h2>Rumblr</h2>

[Live Site](https://rumblr-app.herokuapp.com/)

</div>

---

## Table of Contents

- [Feature List](#feature_list)
- [Component List (React)](#component_list)
- [Database Schema](#database_schema)
- [Frontend Routes](#front_end_routes)
- [API Routes](#api_routes)
- [Redux Store Tree](#redux_store_tree)

## About

<p>Rumblr is a single page web application "Tumblr" clone where users can post vehicle related images along with a message.</p>

<br />
<!-- 
[![Product Name Screen Shot][login-screenshot]](https://rumblr-solo-project.herokuapp.com/)

[![Product Name Screen Shot][home-page-screenshot]](https://rumblr-solo-project.herokuapp.com/) -->

### Technologies Used

<p>
 <h3>Back-end:</h3>
 <ul>
 <li>Sequelize</li>
 <li>Express</li>
 </ul>
 <br/>
 <h3>Front-end:</h3>
 <ul>
 <li>React</li>
 <li>Redux</li>
 <li>AWS S3</li>
 </ul>
</p>

### Usage

In order to launch Rumblr please utilize the following:

1.  cd backend/ and create a .env based off .env.example. Fill in the newly created .env file with your PSQL user and database credentials.

2.  In the backend/ folder run the following command to create,migrate, and seed the database.

    > 1. npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all

3.  Run the following two commands from the root folder each on seperate terminal windows:

    > 1. cd backend && npm start
    > 2. cd frontend && npm start

4.  Navigate to http://localhost:3000/ to interact with the Rumblr app!

---

## Feature List

---

## Component List

---

## Database Schema

---

## Frontend Routes

---

## API Routes

---

## Redux Store Tree

---

## Contact

<p>name: Mustafa Mousa</p>
<p>email: contact@mustafamousa.com</p>
<ul>
 <a href="http://mustafaomousa.github.io/">Portfolio</a>
 <a href="https://www.linkedin.com/in/mustafa-mousa-8b8053157/">LinkedIn</a>
</ul>

[login-screenshot]: images/login-screenshot.png
[home-page-screenshot]: images/home-page-screenshot.png
