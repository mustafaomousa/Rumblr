<p align="center">
 <a href="" alt="">
  <h1>Rumblr<h1>
 </a>
   <h3 align="center">Rumblr</h3>
   <p align="center">Rumblr is a "Tumblr" clone where users can post vehicle related images along with a message</p>
</p>

<details open="open">
 <summary><h3 style="display: inline-block">Table of Contents</h2></summary>
 <ol>
  <li>
   <a href="#test">About The Project</a>
   <ul>
    <li><a href="#about">Description</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
   </ul>
  </li>
 </ol>
</details>
     
## About

about the project

## Technologies Used

technologies used

**HEROKU LAUNCH**

https://rumblr-solo-project.herokuapp.com/

**DEV LAUNCHING Rumblr APPLICATION**

In order to launch Rumblr please utilize the following:

 1. 
     cd backend/ and create a .env based off .env.example. Fill in the newly created .env file with your PSQL user and database credentials.

 2. 
    In the backend/ folder run the following command to create,migrate, and seed the database.
    > 1. npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all

 3. 
    Run the following two commands from the root folder each on seperate terminal windows:
    > 1. cd backend && npm start
    > 2. cd frontend && npm start

 4. Navigate to http://localhost:3000/ to interact with the Rumblr app!


## Test
test test
