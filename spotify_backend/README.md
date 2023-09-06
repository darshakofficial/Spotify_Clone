1. add /.env file in root directory

     in which add 
        
        MONGO_PASSWORD="<Your MongoDB Password>"

2. add Your MongoDB connection URL in /app.js file

3. replace <jwt key> with your secret key
    into    /utils/helpers.js 
    and 
    into the   /app.js file