// models/recipe.ts
import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    default: '', // Optional if you're not using image generation
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
