const { Router } = require("express")
const bcrypt = require("bcryptjs")
const config = require("config")
const shortId = require("shortid")
const Link = require("../models/Link")
const { check, validationResult } = require("express-validator")
const authMiddleWare = require("../middleware/auth.middleware")

const router = Router()

router.post("/generate", authMiddleWare, async (request, response) => {
    try {
        const baseUrl = config.get("baseUrl")
        const { from, name, color } = request.body

        const existing = await Link.findOne({ from })

        if (existing) {
            return response.json({ link: existing })
        }

        const code = shortId.generate()

        const to = baseUrl + "/t/" + code

        const link = new Link({ color, code, to, from, owner: request.user.userId, name })

        await link.save()

        response.status(201).json({ link })
    } catch (error) {
        response.status(500).json({ message: "Something wrong" })
    }
})

router.get("/", authMiddleWare, async (request, response) => {
    try {
        const links = await Link.find({ owner: request.user.userId })
        response.json(links)
    } catch (error) {
        response.status(500).json({ message: "Something wrong" })
    }
})

router.get("/:id", authMiddleWare, async (request, response) => {
    try {
        const link = await Link.findById(request.params.id)
        response.json(link)
    } catch (error) {
        response.status(500).json({ message: "Something wrong" })
    }
})

module.exports = router
