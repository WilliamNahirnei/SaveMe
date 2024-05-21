require('dotenv').config()

const express = require('express')
const consign = require('consign')
const app = express()
const port = process.env.API_PORT

consign()
    .then('/config/middlewares.js')
    .then('/api/routes.js')
    .into(app)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})