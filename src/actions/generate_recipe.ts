"use server";

import OpenAI from "openai";
import Recipe from "@/models/recipe";
import connect  from "@/db_config/connectDB";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function generateRecipe(ingredients: string[]) {
  try {
    await connect(); // ✅ Connect to MongoDB

    console.log("🔧 Starting recipe generation for ingredients:", ingredients);

    const prompt = `Using only the following ingredients: ${ingredients.join(", ")}, generate a recipe in this exact JSON format:
{
  "recipe": "<h2>Dish Name</h2><p>Description and steps in paragraph form.</p><ul><li>Step 1</li><li>Step 2</li></ul>"
}
Return only the JSON object. Do not include any extra text or explanation.`;

    const recipeCompletion = await openai.chat.completions.create({
      model: "gpt-3-turbo", // ✅ Reliable model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const completionText = recipeCompletion.choices[0]?.message?.content ?? "";
    console.log("🧠 OpenAI completion received:", completionText);

    let recipeData;
    try {
      recipeData = JSON.parse(completionText);
    } catch (error) {
      console.error("❌ Failed to parse OpenAI JSON response:", completionText);
      throw new Error("Invalid response format from OpenAI.");
    }

    const recipeHTML = recipeData.recipe;
    if (!recipeHTML) {
      console.error("❌ Recipe content missing in parsed response");
      throw new Error("Recipe content missing in parsed response");
    }

    // Extract title from the HTML (e.g., from <h2>...</h2>)
    const titleMatch = recipeHTML.match(/<h2>(.*?)<\/h2>/i);
    const title = titleMatch ? titleMatch[1] : "Untitled Dish";

    // ✅ Image Generation
    let imageURL = "";
    try {
      const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Photorealistic image of a dish made with: ${ingredients.join(", ")}`,
        n: 1,
        size: "1024x1024",
      });
      imageURL = imageResponse.data?.[0]?.url || "/default-recipe.jpg";
      console.log("🖼️ Image generated:", imageURL);
    } catch (error) {
      console.error("❌ Image generation failed:", error);
      imageURL = "/default-recipe.jpg";
    }

    // ✅ Save to MongoDB
    const savedRecipe = await Recipe.create({
      title, // ✅ this line saves the title
      recipe: recipeHTML,
      ingredients,
      createdAt: new Date(),
    });

    console.log("✅ Recipe saved to DB:", savedRecipe._id);

    return {
      title,
      recipe: recipeHTML,
      image: imageURL,
      savedRecipeId: savedRecipe._id,
    };

  } catch (error: any) {
    console.error("❌ Recipe generation failed:", error.message || error);
    throw new Error("Failed to generate recipe. Try again.");
  }
}