// app/api/feedback/route.ts
import  connect  from '@/db_config/connectDB';
import Feedback from '@/models/feedback';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const { rating, message } = await request.json();

    if (!rating || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const feedback = new Feedback({ rating, message });
    await feedback.save();

    return NextResponse.json({ success: true, message: "Feedback submitted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, feedbacks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
