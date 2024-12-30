// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../../styles/css/sidebar/sidebar.scss";
// import { image } from "../../assets/image.js";
// import { sidebarItems } from "../../libs/sidebar/generateMenuItems.jsx";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { BiCircle } from "react-icons/bi";

// const Sidebar = () => {
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [activeItem, setActiveItem] = useState("Admin Posting");
//   const [hasInteracted, setHasInteracted] = useState(false);
//   const navigate = useNavigate();

//   // Function to handle dropdown toggle
//   const handleDropdownToggle = () => {
//     if (!openDropdown) {
//       setHasInteracted(true); // Set to true only when opening the dropdown
//     } else {
//       setHasInteracted(false); // Set to false when closing the dropdown
//     }
//     setOpenDropdown(!openDropdown);
//     if (activeItem === "Admin Posting") {
//       navigate("/admin");
//     }
//     if (activeItem === "Admin Shop") {
//       navigate("/AdminShop");
//     }
//   };

//   // Function to handle item click in the dropdown
//   const handleItemClick = (selectedItem) => {
//     setActiveItem(selectedItem);
//     navigate(selectedItem === "Sell an Item" ? "Adminshop" : "/admin");
//     setOpenDropdown(false); // Close the dropdown
//     setHasInteracted(false);
//   };

//   // Function to handle Logout
//   const handleLogout = () => {
//     localStorage.setItem("adminId", ""); // Clear admin ID
//     navigate("/"); // Redirect to login or home page
//   };

//   // Determine dropdown items based on active item
//   const dropdownItems = [
//     activeItem === "Admin Posting" && {
//       name: "Admin Shop",
//       action: () => handleItemClick("Admin Shop"),
//     },
//     activeItem === "Admin Shop" && {
//       name: "Admin Posting",
//       action: () => handleItemClick("Admin Posting"),
//     },
//   ].filter(Boolean); // Remove any undefined values

//   return (
//     <div id="sidebar" className="d-flex flex-column">
//       <div className="sidebar-header">
//         <img className="logo" src={image.Logo} alt="Logo" />
//       </div>

//       <div className="mynav">
//         {/* Iterate over sidebar items */}
//         {sidebarItems.map((item) => (
//           <div className="nav-item" key={item.name}>
//             {item.name === "Admin Posting" ? (
//               <div>
//                 {/* Main item with dropdown functionality */}
//                 <div
//                   onClick={handleDropdownToggle}
//                   className={`admin-nav-item ${hasInteracted === true ? "admin-nav-active" : ""}`}
//                 >
//                   <span
//                     className={`nav-icon ${hasInteracted === true && " active-icon"}`}
//                   >
//                     {React.cloneElement(item.icon, {
//                       className: "custom-icon",
//                     })}
//                   </span>
//                   {activeItem === "Admin Shop" ? "Admin Shop" : "Admin Posting"}
//                   {openDropdown ? (
//                     <FaChevronUp className="arrow-icon" />
//                   ) : (
//                     <FaChevronDown className="arrow-icon" />
//                   )}
//                 </div>

//                 {/* Dropdown Items if the dropdown is open */}
//                 {openDropdown && (
//                   <div className="dropdown-items">
//                     {dropdownItems.map((dropdownItem) => (
//                       <div
//                         key={dropdownItem.name}
//                         onClick={dropdownItem.action}
//                         className="dropdown-item"
//                       >
//                         <BiCircle className="custom-icon inactive-icon" />
//                         {dropdownItem.name}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : item.name === "Logout" ? (
//               <NavLink
//                 to="/"
//                 onClick={handleLogout} // Handle logout here
//                 className={`nav-item-link ${activeItem === item.name ? "active-link" : ""}`}
//               >
//                 <span className="nav-icon">
//                   {React.cloneElement(item.icon, {
//                     className: "custom-icon",
//                   })}
//                 </span>
//                 {item.name}
//               </NavLink>
//             ) : (
//               <NavLink
//                 to={item.path}
//                 className={`nav-item-link ${activeItem === item.name ? "active-link" : ""}`}
//               >
//                 <span className="nav-icon">
//                   {React.cloneElement(item.icon, {
//                     className: "custom-icon",
//                   })}
//                 </span>
//                 {item.name}
//               </NavLink>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

//////////  2nd correct code...................................................

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/Sidebar/Sidebar.scss";
import { image } from "../../assets/images.js";
import { sidebarItems } from "../../libs/GenrateSidebarItems.jsx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BiCircle } from "react-icons/bi";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();

  // Function to handle dropdown toggle
  const handleDropdownToggle = () => {
    setOpenDropdown((prevState) => !prevState); // Toggle dropdown
    //setActiveItem("Admin");
  };

  // Generic function to handle item click
  const handleItemClick = (selectedItem, path) => {
    setActiveItem(selectedItem); // Update active item
    navigate(path); // Navigate to the selected item's path
    setOpenDropdown(false); // Close dropdown
  };

  // Function to handle Logout
  const handleLogout = () => {
    localStorage.setItem("adminId", ""); // Clear admin ID
    navigate("/"); // Redirect to login or home page
    setActiveItem("Logout");
  };

  // Dropdown items
  const dropdownItems = [
    { name: "Admin Posting", path: "/admin" },
    { name: "Admin Shop", path: "/AdminShop" }
  ];

  return (
    <div
      id="sidebar"
      className="sideBarScroll d-flex flex-column !w-inherit overflow-y-auto p-4 !scrollbar-none"
      // className="sideBarScroll d-flex flex-column !w-inherit overflow-y-auto p-4 !scrollbar-none"
    >
      <div className="px-6 py-8 flex justify-center items-center">
        <img src={image.Logo} alt="Logo" className="h-[102px] w-[150px]" />
      </div>

      <div className="mynav">
        {/* Iterate over sidebar items */}
        {sidebarItems.map((item) => (
          <div className="nav-item" key={item.name}>
            {item.name === "Admin Posting" ? (
              <div>
                {/* Main item with dropdown functionality */}
                <div
                  onClick={handleDropdownToggle}
                  // className={`admin-nav-item ${
                  //   activeItem === "Admin Posting" ||
                  //   activeItem === "Admin Shop"
                  //     ? "admin-nav-active"
                  //     : ""
                  // }`}
                  className={`admin-nav-item ${
                    activeItem === "Admin Posting" ||
                    activeItem === "Admin Shop" ||
                    openDropdown
                      ? "admin-nav-active"
                      : ""
                  }`}
                >
                  <span
                    className={`nav-icon ${
                      activeItem === "Admin Posting" ||
                      activeItem === "Admin Shop"
                        ? "active-icon"
                        : ""
                    }`}
                  >
                    {React.cloneElement(item.icon, {
                      className: "custom-icon"
                    })}
                  </span>
                  {activeItem === "Admin Shop"
                    ? "Admin Shop"
                    : activeItem === "Admin Posting"
                    ? "Admin Posting"
                    : "Admin"}
                  {/* {activeItem === "Admin Shop" ? "Admin Shop" : "Admin Posting"} */}
                  {openDropdown ? (
                    <FaChevronUp className="arrow-icon" />
                  ) : (
                    <FaChevronDown className="arrow-icon" />
                  )}
                </div>

                {/* Dropdown Items */}
                {openDropdown && (
                  <div className="dropdown-items">
                    {dropdownItems.map((dropdownItem) => (
                      <div
                        key={dropdownItem.name}
                        onClick={() =>
                          handleItemClick(dropdownItem.name, dropdownItem.path)
                        }
                        className={`dropdown-item ${
                          activeItem === dropdownItem.name
                            ? "dropdown-active"
                            : ""
                        }`}
                      >
                        <BiCircle className="custom-icon inactive-icon" />
                        {dropdownItem.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : item.name === "Logout" ? (
              <NavLink
                to="/"
                onClick={handleLogout}
                className={`nav-item-link ${
                  !openDropdown && activeItem === item.name ? "active-link" : ""
                }`}
                //  className={`nav-item-link ${activeItem === item.name ? "active-link" : ""}`}
              >
                <span className="nav-icon">
                  {React.cloneElement(item.icon, {
                    className: "custom-icon"
                  })}
                </span>
                {item.name}
              </NavLink>
            ) : (
              <NavLink
                to={item.path}
                onClick={() => handleItemClick(item.name, item.path)}
                className={`nav-item-link ${
                  !openDropdown && activeItem === item.name ? "active-link" : ""
                }`}
                // className={`nav-item-link ${activeItem === item.name ? "active-link" : ""}`}
              >
                <span className="nav-icon">
                  {React.cloneElement(item.icon, {
                    className: "custom-icon"
                  })}
                </span>
                {item.name}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
