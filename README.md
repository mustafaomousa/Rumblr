<p align="center">
<h3 align="center"><a href="https://rumblr-solo-project.herokuapp.com/">Rumblr »</a></h3>
</p>

<details open="open">
 <summary>Table Of Contents</summary>
 <ol>
  <li>
   <a href="#test">About The Project</a>
   <ul>
    <li><a href="#description">Description</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
   </ul>
  </li>
  <li><a href="#visuals">Visuals</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contact">Contact</a></li>
 </ol>
</details>
     
## Description

<p align="center">Rumblr is a "Tumblr" clone where users can post vehicle related images along with a message</p>

## Visuals

[![Product Name Screen Shot][login-screenshot]](https://rumblr-solo-project.herokuapp.com/)

## Technologies Used

<p>
 <h3>Back-end:</h3>
 <ul>
 <li>Sequelize</li>
 <li>Express</li>
 </ul>
 <br/>
 <h3>Front-end:</h3>
 <ul>
 <li>Item</li>
 </ul>
</p>

## Usage
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


## Contact






[login-screenshot]: images/login-screenshot.png
