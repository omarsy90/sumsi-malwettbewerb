
# Smusimalewettbewerb

read the attached documentaion (Sumsi_Coding School_2021) to understand the the functionalities applied in this web application

the applications consists of two parts backend and frontend  that work together to achieve  detected purpose.


# Backend Reqirements

.Install Node.js
(https://nodejs.org/en/download/prebuilt-installer/current)

.Install SQL Server Management Studio in your device where you want to run the backend (Server) in .
(https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)

.install backend file from Repository (sumsi-malwettbewerb-backend)

.in .env File modify ConnectionString : add the connectionString to your database you have created 

.in .env file modify the Port  that application works on.  the default port is 3000 .

.in .env File modify TOKEN_SECRET  you can add your customized public key for authentication purpose.

.open cmd with adminstative previliges -> go to the directory where all project's files exist -> run (npm i) -> run (node server.js) .
.you will see the message (server is running) 


#Frontend Reqirements

.install Node.js from the preceding url mentioned up.

.install http-server :open cmd with adminstative previliges -> run command (npm install --global http-server )

.install frontend files from Repository  (sumsi-malwettbewerb-frontend )

.open global.js file modify the BasicUrl (add url & port to connect with your backend-server) EX:  BasicUrl= 'http://122.21.80.1:3000' 

.open cmd with adminstative previliges  -> go to the directory where all project's files exist -> run commmand http-server "[your directory]"

.copy the last url displayed on the command line then put in the browser .

.login page :

Email :admin@gmail.com

password : 1123 
 
 