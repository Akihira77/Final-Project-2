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

