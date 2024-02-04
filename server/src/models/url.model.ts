import mongoose, { Schema } from "mongoose";

interface URLDocument extends Document {
    longURL: string;
    shortKey: string;
}

const URLSchema = new Schema({
    longURL: { type: String, required: true },
    shortKey: { type: String, required: true, unique: true },
});

export const URLModel = mongoose.model<URLDocument>('URL', URLSchema);
