import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { UsersCollection } from "/imports/api/users";
import { Chat as ChatMessages } from "/imports/api/chat";

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

Meteor.methods({
  "user.register"({ name }) {
    const ip = this.connection.clientAddress;
    const existing = UsersCollection.findOne({
      ip,
    });
    if (!existing) return UsersCollection.insert({ ip, name });
    UsersCollection.update(existing._id, { $set: { name } });
  },
  "chat.message"({ message }) {
    const ip = this.connection.clientAddress;
    const existing = UsersCollection.findOne({
      ip,
    });
    if (!existing) return null; //register first
    ChatMessages.insert({ userId: existing._id, message });
  },
});

Meteor.publish("chats", () => {
  const date = new Date();
  date.setHours(date.getHours() - 1);
  return ChatMessages.find({ createdAt: { $gt: date } });
});

Meteor.publish("users", () => {
  return UsersCollection.find({}, { fields: { name: 1 } });
});

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app",
    });

    insertLink({
      title: "Follow the Guide",
      url: "http://guide.meteor.com",
    });

    insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
    });

    insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com",
    });
  }
});
