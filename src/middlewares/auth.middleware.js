import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'KFJJWJEI83283UFH@@KFJU84]';

export function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token inválido.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
    }
}
