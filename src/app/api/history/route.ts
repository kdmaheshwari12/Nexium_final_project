// app/api/history/route.ts
import  connect  from '@/db_config/connectDB';
import Recipe from '@/models/recipe';
import { NextResponse } from 'next/server';

connect();

export async function GET() {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return NextResponse.json(recipes, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
