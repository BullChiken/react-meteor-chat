import React, { useRef, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/users";

export const UserList = () => {
  const [users, usersLoading] = useTracker(() => {
    const sub = Meteor.subscribe("users", {});
    const users = UsersCollection.find().fetch();
    return [users, !sub.ready()];
  }, []);
  return (
    <div>
      {usersLoading ? (
        <div>loading...</div>
      ) : (
        users.map((u) => (
          <div key={u._id}>
            <b>{u.name}: </b>
            <span>{u.ip}</span>
          </div>
        ))
      )}
    </div>
  );
};
