// "use server";

// import mongoDBClient from "@/app/db/index";
// import { ObjectId } from "mongodb";

// // ✅ Manual type definition (best for native MongoDB use)
// export type Recipe = {
//   _id: ObjectId;
//   recipe_title: string;
//   recipe_content: string;
//   recipe_image: string;
//   ingredients: string[];
//   createdAt: Date;
// };

// export async function getRecipeById(id: string): Promise<Recipe | null> {
//   try {
//     const db = (await mongoDBClient).db("recipe_generator");

//     if (!ObjectId.isValid(id)) {
//       console.error("Invalid ObjectId:", id);
//       return null;
//     }

//     const recipe = await db
//       .collection<Recipe>("recipes")
//       .findOne({ _id: new ObjectId(id) });

//     if (!recipe) {
//       console.warn(`Recipe not found with id: ${id}`);
//       return null;
//     }

//     return recipe;
//   } catch (error) {
//     console.error("Error fetching recipe:", error);
//     return null;
//   }
// }
