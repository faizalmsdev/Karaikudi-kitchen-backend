    // const jwt = require('jsonwebtoken');

    // exports.verifyToken = (req, res, next) => {
    // const token = req.headers.authorization;

    // if (!token) {
    //     return res.status(401).json({ message: 'No token provided' });
    // }

    // jwt.verify(token, 'your_secret_key', (err, decoded) => {
    //     if (err) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    //     }

    //     req.userId = decoded.userId; // Store user ID in request object
    //     next();
    // });
    // };
