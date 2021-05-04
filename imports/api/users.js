import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

class User {
  constructor(doc) {
    _.extend(this, doc);
  }
}

User.schema = new SimpleSchema({
  name: { type: String },
  ip: { type: String },
});

export const UsersCollection = new Mongo.Collection("chat-users");
