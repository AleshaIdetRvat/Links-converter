const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (request, response, next) => {
    if (request.method === "OPTIONS") {
        return next();
    }
    try {
        const token = request.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

        if (!token) {
            return response.status(401).json({ message: "No authorized !token" });
        }

        const decodedData = jwt.verify(token, config.get("jwtSecret")); // = { token, userId}

        request.user = decodedData;
        next();
    } catch (error) {
        return response
            .status(401)
            .json({ message: "No authorized catch, error: " + error.message });
    }
};
