import { jwtDecode } from "jwt-decode";



const authenticateToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) return res.sendStatus(401); // If there's no token, respond with 401

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, respond with 403 Forbidden
        req.user = user; // Attach the user information to the request object
        // next(); // Call the next middleware or route handler
    });
};

exports.authenticateToken = authenticateToken;