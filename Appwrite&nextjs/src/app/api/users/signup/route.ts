import {connectDB} from '@/dbConfig/dbConfig';
import User  from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

// connect to the database
connectDB();

//  Handle POST request for user signup
export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // send verification email

        await sendEmail({email, emailType: 'VERIFY',
            userId: savedUser._id
        })

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser
        },{
            status: 201
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    }
