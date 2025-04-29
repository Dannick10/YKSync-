require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8081

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({credentials: true, origin: '*'}))

require('../config/db').connectDB()

const router = require("./routes/router");
app.use(router)

app.listen(port, () => {
    console.log("servidor rodando " + port)
})
