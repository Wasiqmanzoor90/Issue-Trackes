import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    //check if token is present
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const token = authHeader.split(' ')[1];
    try {
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode; // { userId, role }
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid or expired' });
    }
}

export default authMiddleware;