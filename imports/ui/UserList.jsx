import React, { useRef, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/users";

export const UserList = () => {
  const users = useTracker(() => {
    return UsersCollection.find({}).fetch();
  }, []);
  return (
    <div>
      {!users?.length ? ( //cuserLoading
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
