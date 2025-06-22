import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {
    const token = request.cookies.get('token')?.value || '';
    if (!token) {
        return null;
    }

    try {
        // Ensure JWT_SECRET is defined and is a string
        const jwtSecret = process.env.TOKEN_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT secret not configured');
        }

        const decodedToken:any = jwt.verify(token, jwtSecret);
        return decodedToken.id;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}