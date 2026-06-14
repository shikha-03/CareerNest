import { Server } from "socket.io";
import ChatMessage from "../models/ChatMessage.js";

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    socket.on("join:user", (userId) => {
      if (userId) socket.join(`user:${userId}`);
    });

    socket.on("join:application", (applicationId) => {
      if (applicationId) socket.join(`application:${applicationId}`);
    });

    socket.on("chat:join", ({ conversationId }) => {
      if (conversationId) socket.join(`chat:${conversationId}`);
    });

    socket.on("chat:message", async (payload) => {
      if (payload?.conversationId) {
        const saved = await ChatMessage.create({
          conversationId: payload.conversationId,
          sender: payload.sender,
          recipient: payload.recipient,
          message: payload.message
        });
        io.to(`chat:${payload.conversationId}`).emit("chat:message", saved);
      }
    });
  });

  return io;
}

export function emitToUser(userId, event, payload) {
  if (io && userId) io.to(`user:${userId}`).emit(event, payload);
}

export function emitApplicationUpdate(applicationId, payload) {
  if (io && applicationId) io.to(`application:${applicationId}`).emit("application:status", payload);
}
