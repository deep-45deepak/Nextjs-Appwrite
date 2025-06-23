import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// connect to the database
connectDB();

// Handle POST request for user login
export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Generate JWT token (ensure JWT_SECRET is defined and is a string)
        const jwtSecret = process.env.TOKEN_SECRET;
        if (!jwtSecret) {
            return NextResponse.json({ error: 'JWT secret not configured' }, { status: 500 });
        }
        const token = jwt.sign(tokenData, jwtSecret, { expiresIn: '48h' });

        // Prepare user data to return (exclude sensitive fields)
        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.__v;

        const response = NextResponse.json({
            message: 'User logged in successfully',
            success: true,
            user: userObj
        });
        response.cookies.set('token', token, {
            httpOnly: true,
            // sameSite: 'lax',
            // secure: process.env.NODE_ENV === 'production',
            // path: '/',
            // maxAge: 60 * 60 * 48 // 48 hours
        });
        return response;
    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}