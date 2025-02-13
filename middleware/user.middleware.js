const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const protectRoute = async (req, res, next) => {
    try {
        // when the user tries to acces a private routes (e.g. /profile, /dashboard)
        // the browser automatically includes the jwt cookie in the request headers
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: 'Unauthorized access'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: 'Unauthorized-Invalid token'});
        }
        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({message: 'Unauthorized-User not found'});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log('Protect route error',error);
        res.status(500).json({message: 'Server error', error});
    }
}

module.exports = {protectRoute};