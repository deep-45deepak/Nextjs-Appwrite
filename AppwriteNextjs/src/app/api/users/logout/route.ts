import { connectDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

// connect to the database
connectDB();
// Handle GET request for user logout
export async function GET() {
    try {
        const response = NextResponse.json({
            message: 'User logged out successfully',
            success: true,
        });
        // Clear the token cookie
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch (error) {
        console.log('Error logging out user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500});
    }
}