import React, { useState, useEffect } from "react";

const Notification = (props) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  
  const cable = props.cable;

  useEffect(() => {
    cable.subscriptions.create
      (
        {
          channel: "NotificationsChannel"
        },
        {
          received: (data) => {
            setName(data.name);
            setTitle(data.title);
          }
        }
      )
  }, [name, cable.subscriptions, title, setName, setTitle]);

  return (
    name && title && (
      <div className="alert alert-success text-center" role="alert">
        { name } just shared { title }
      </div>
    )
  );
};

export default Notification;
