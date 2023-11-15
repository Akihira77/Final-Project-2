# How To Use

first run  
`npm install`

for create a database run
`npm run db:create`

for initialize model, make sure to passing `model_name` as an argument.  
`npm run migration:generate -- <model_name>`  
ex: `npm run migration:generate -- User`  
Change file extension to `.cjs` and create the `model.ts` inside `src/db/models`

for apply the migrations  
`npm run db:migrate`

run project  
`npm run start:dev`

go to [Here](https://crimson-star-882099.postman.co/workspace/MBKM-Final-Project-2~68237437-130b-4c66-9a06-152945108d50/collection/24368336-ee01b197-c89a-4b38-8d61-164256d65e0c?action=share&creator=24368336&active-environment=24368336-3e9cc8f6-a004-4a19-84db-da566d933901) to see the request collection and the environment in Postman to help you interact with our API
