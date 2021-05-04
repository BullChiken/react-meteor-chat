import { Class } from "meteor/jagi:astronomy";
import { timestamp } from "meteor/jagi:astronomy-timestamp-behavior";

export const Chat = Class.create({
  name: "chat",
  collection: new Mongo.Collection("chats"),
  fields: {
    userId: { type: String },
    message: { type: String },
  },
  helpers: {},
  behaviors: {
    timestamp: {},
  },
});
