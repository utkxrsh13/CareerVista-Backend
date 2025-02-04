import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // Ensure cookie-parser is imported

const isAuthenticated = async (req, res, next) => {
    try {
        // Log cookies to check if they are being received
        console.log("Cookies: ", req.cookies);

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Decode and verify token
        try {
            const decode = await jwt.verify(token, process.env.SECRET_KEY);
            req.id = decode.userId;  // Add userId to request object
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token has expired",
                    success: false,
                });
            }
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }
    } catch (error) {
        console.log("Error in authentication middleware:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export default isAuthenticated;