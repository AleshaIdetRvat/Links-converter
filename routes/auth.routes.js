const { Router } = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("config")
const User = require("../models/User")
const { check, validationResult } = require("express-validator")

const router = Router()

router.post(
    // /api/auth/register
    "/register",
    [
        check("email", "Invalid email").isEmail(),
        check("password", "Minimal lenght of password 6 symbols").isLength({ min: 6 }),
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response
                    .status(400)
                    .json({ errors: errors.array(), message: "Invalid register data" })
            }

            const { email, password } = request.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return response
                    .status(400)
                    .json({ message: "E-mail is busy by another user" })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({ email, password: hashedPassword })

            await user.save()

            response.status(201).json({ message: "New user created" })
        } catch (error) {
            response.status(500).json({ message: "Something wrong" })
        }
    }
)
// /api/auth/login
router.post(
    "/login",
    [
        check("email", "Invalid email").normalizeEmail().isEmail(),
        check("password", "Field required").exists(),
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response
                    .status(400)
                    .json({ errors: errors.array(), message: "Invalid login data" })
            }
            const { email, password } = request.body

            const user = await User.findOne({ email })

            if (!user) {
                return response.status(400).json({ message: "User not found" })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return response.status(400).json({ message: "Wrong password" })
            }

            const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
                expiresIn: "1h",
            })
            response.json({ token, userId: user.id })
        } catch (error) {
            response.status(500).json({ message: "Something wrong" })
        }
    }
)

module.exports = router
