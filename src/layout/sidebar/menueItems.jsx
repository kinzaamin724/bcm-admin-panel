import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";

export const MenueItems = [
  {
    key: 1,
    label: "Subscription",
    icon: <FaUsers className="icon" />,
    path: "/Subscription",
  },
  {
    key: 2,
    label: "Notifications",
    icon: <MdNotificationsActive className="icon" />,
    path: "/Notifications",
  },
  {
    key: 3,
    label: "retailer",
    icon: <FaUserShield className="icon" />,
    path: "/retailer",
  },
  {
    key: 4,
    label: "vendor",
    icon: <FaUserShield className="icon" />,
    path: "/vendor",
  },
  {
    key: 5,
    label: "subAdmin",
    icon: <MdAdminPanelSettings className="icon" />,
    path: "/subAdmin",
  },
  {
    key: 6,
    label: "Deleted_Users",
    icon: <FaUsers className="icon" />,
    path: "/deletedUsers",
  },
];
