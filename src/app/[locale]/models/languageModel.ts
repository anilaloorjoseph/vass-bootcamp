import mongoose from "mongoose";
import { type LanguageData } from "../types/typescript";

const languageSchema = new mongoose.Schema<LanguageData>({
  language: {
    type: String,
    required: true,
  },
  translations: {
    type: Object,
    required: false,
  },
});

const Language =
  mongoose.models.Language ?? mongoose.model("Language", languageSchema);

export default Language;
