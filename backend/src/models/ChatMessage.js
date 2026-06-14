import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    conversationId: { type: String, required: true, index: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    readAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("ChatMessage", chatMessageSchema);
