import React, { useRef, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Chat as ChatMessages } from "../api/chat";
import { UsersCollection } from "../api/users";

export const Chat = () => {
  const [chats, chatLoading] = useTracker(() => {
    const dateToLoad = new Date();
    dateToLoad.setHours(dateToLoad.getHours() - 1);
    const sub = Meteor.subscribe("chat", {}); //sub not found????
    console.log(sub);
    const chat = ChatMessages.find({ createdAt: { $gt: dateToLoad } }).fetch();
    return [chat, !sub.ready()];
  }, []);
  const nameInput = useRef();
  const register = () => {
    const name = nameInput.current?.value;
    if (name) {
      Meteor.call("user.register", { name }, (err, res) => {
        if (err) return alert(err);
        alert("success!");
      });
    }
  };
  const chatInput = useRef();
  const sendMsg = () => {
    const message = chatInput.current?.value;
    if (message) {
      Meteor.call("chat.message", { message }, (err, res) => {
        if (err) return alert(err);
        if (chatInput.current) chatInput.current.value = "";
      });
    }
  };
  const handleChatInput = (e) => {
    if (e.key === "Enter") sendMsg();
  };
  return (
    <div>
      <input type="text" ref={nameInput} placeholder="please enter your name" />
      <button onClick={register}>Register</button>
      {!chats?.length ? ( //chatLoading
        <div>loading...</div>
      ) : (
        chats.map((msg) => (
          <div key={msg._id}>
            <span>[{msg.createdAt.toLocaleTimeString()}] </span>
            <b>{UsersCollection?.findOne(msg.userId)?.name}: </b>
            <span>{msg.message}</span>
          </div>
        ))
      )}
      <input
        type="text"
        ref={chatInput}
        placeholder="a new message"
        onKeyPress={handleChatInput}
      />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
};
