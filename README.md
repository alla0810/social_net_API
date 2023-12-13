# social_net_API

## Description

AS A social media startup, I WANT an API for my social network that uses a NoSQL database 
SO THAT my website can handle large amounts of unstructured data.


## Features

GIVEN a social network API.

* WHEN you enter the command to invoke the application, THEN your server is started and the Mongoose models are synced to the MongoDB database 

* WHEN you open API GET routes in Insomnia for users and thoughts, THEN the data for each of these routes is displayed in a formatted JSON

* WHEN you test API POST, PUT, and DELETE routes in Insomnia, THEN you are able to successfully create, update, and delete users and thoughts in your database

* WHEN you you test API POST and DELETE routes in Insomnia, THEN you are able to successfully create and delete reactions to thoughts and add and remove friends to a user's friend list.





## Direct Access from Heroku
https://cool-tech-blog-c417147650ea.herokuapp.com/

## Installation on your local machine
* After downloading from GitHub, you can run this program on your local machine by following the procedure below:
1. Get into your mysql account by running `mysql -u <username> -p`, and insert your mysql password after prompting.
2. On another terminal, run `source <source code path>\db\schema.sql` to initialize database.
3. Inside the same terminal, run `npm run seed` for seeding the database table.
4. At the same terminal, run `nodemon server.js` to run the backend server for tech-blog.
5. On an internet browser, type in the URL `localhost:3001`.
6. You're ready to go!


## Source Code References
  This project has used some reference codes from the following sites

   * https://git.bootcampcontent.com/University-of-Texas-at-Austin/UTA-VIRT-FSF-PT-07-2023-U-LOLC.git   


## Contact
  * Author: Kyosook Shin
  * Author's Email: kyosook.shin@gmail.com  
  * GitHub: https://github.com/alla0810/tech-blog
  * Heroku: https://cool-tech-blog-c417147650ea.herokuapp.com/


## Screenshot  

<img src='./images/screen1.png' width="800">  
<img src='./images/screen2.png' width="800">
<img src='./images/screen3.png' width="800">  
<img src='./images/screen4.png' width="800">  
<img src='./images/screen5.png' width="800">  
