** DEV LAUNCHING Rumblr APPLICATION**

In order to launch Encephascape please utilize the following:

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
