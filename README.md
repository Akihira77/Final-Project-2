# How To Use

first run  
`npm install`

for create a database, make sure to passing database connection string as an argument.  
this works for any environment (Dev, Test, or Production)  
`npm run db:create -- <conection_string>`  
ex: `npm run db:create -- postgres://dbuser:secretpassword@database.host:3211/mydb`

for initialize model, make sure to passing `model_name` as an argument.  
`npm run migration:generate -- <model_name>`  
ex: `npm run migration:generate -- User`  
Change file extension to `.cjs` and create the `model.ts` inside `src/db/models`  
migration code and .model.ts is must be same so after the project run it won't override one to another 

for apply the migrations, passing database connection string as an argument (use connection string for db:create or use an another existing database connection string).  
this works for any environment (Dev, Test, or Production)  
`npm run db:migrate -- <connection_string>`

run project  
`npm run start:dev`

run test  
`npm run test`

go to [Here](https://crimson-star-882099.postman.co/workspace/MBKM-Final-Project-2~68237437-130b-4c66-9a06-152945108d50/collection/24368336-ee01b197-c89a-4b38-8d61-164256d65e0c?action=share&creator=24368336&active-environment=24368336-3e9cc8f6-a004-4a19-84db-da566d933901) to see the request collection and the environment in Postman to help you interact with our API
