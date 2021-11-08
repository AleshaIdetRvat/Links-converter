const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const app = express()

const cors = require("cors")
require("dotenv").config()

const PORT = process.env.PORT || 5000

app.use(cors()) // CORS

app.use(express.json({ extended: true }))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/link", require("./routes/link.routes"))
app.use("/t", require("./routes/redirect.routes"))

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(`server error ${error}`)
        process.exit
    }
}

start()
