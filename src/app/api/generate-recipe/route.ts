import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import connectDB from '@/lib/dbConnect';
import Recipe from '@/models/recipe';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { ingredients } = await req.json();

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json({ error: 'Invalid ingredients' }, { status: 400 });
    }

    const prompt = `Generate a complete recipe using ONLY the following ingredients: ${ingredients.join(', ')}.

Return the result in this format:

Title: <Recipe Title>

Ingredients:
- Ingredient 1
- Ingredient 2

Instructions:
1. Step one
2. Step two`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const recipeText = completion.choices[0].message.content || '';

    const titleMatch = recipeText.match(/Title:\s*(.+)/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled Recipe';

    const savedRecipe = await Recipe.create({
      title,
      recipe: recipeText,
      ingredients,
      createdAt: new Date(),
    });

    return NextResponse.json({
      title,
      recipe: recipeText,
      savedRecipeId: savedRecipe._id,
    });
  } catch (error) {
    console.error('Error in /api/generate-recipe:', error);
    return NextResponse.json({ error: 'Failed to generate recipe' }, { status: 500 });
  }
}
