const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const path = require("path")
const app = express()

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"])
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    res.append(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    next()
}) // CORS

app.use(express.json({ extended: true }))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/link", require("./routes/link.routes"))
app.use("/t", require("./routes/redirect.routes"))

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = 5000 //config.get("port") || 5001

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
