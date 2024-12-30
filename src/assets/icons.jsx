import React from "react";
import users from "../assets/icons/users.svg?react";
import request from "../assets/icons/request.svg?react";
import calculator from "../assets/icons/calulator.svg?react";
import notification from "../assets/icons/notification.svg?react";

import logout from "../assets/icons/logout.svg?react";

const Icons = ({
  type,
  size = 24,
  className = "",
  color = "currentColor",
  fill = "currentColor"
}) => {
  let IconComponent;

  // Select the appropriate icon component based on the 'type' prop
  switch (type) {
    case "users":
      IconComponent = users;
      break;
    case "request":
      IconComponent = request;
      break;
    case "calculator":
      IconComponent = calculator;
      break;
    case "notification":
      IconComponent = notification;
      break;

    case "logout":
      IconComponent = logout;
      break;
    default:
      return null;
  }

  return (
    <IconComponent
      className={className}
      style={{
        fontSize: size,
        width: size,
        height: size,
        color: color,
        fill: fill
      }}
    />
  );
};

export default Icons;
