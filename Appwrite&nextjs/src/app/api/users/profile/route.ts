import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model";
import { connectDB } from '@/dbConfig/dbConfig';

connectDB();

export async function GET(request: NextRequest) {
    const userId = getDataFromToken(request);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized User' }, { status: 401 });
    }

    try {
        const user = await User.findOne({_id:userId}).select('-password -__v');
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({
            message: 'User profile fetched successfully',
            status: 200,
            data: user,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}