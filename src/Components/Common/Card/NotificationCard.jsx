// import React from "react";
// import { Card } from "antd";
// import { useNavigate } from "react-router-dom";

// const NotificationCard = ({ title, image, description }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col gap-3">
//       {/* Title above card */}
//       <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

//       {/* Card */}
//       <Card
//         hoverable
//         className="overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
//         bodyStyle={{ padding: 0 }}
//       >
//         {/* Image Section */}
//         <div className="aspect-video w-full overflow-hidden">
//           <img
//             src={image}
//             alt={title}
//             className="h-full w-full object-cover font-semibold text-[16px]  leading-[24px] "
//           />
//         </div>

//         {/* Content Section */}
//         <div className="p-4">
//           <p className="font-poppins text-[14px] font-normal leading-[21px] text-left text-gray-600">
//             {description}
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default NotificationCard;

import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ title, image, description }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      {/* Title above card with truncation */}
      <h2 className="text-xl font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </h2>

      {/* Alternative with line clamp for multiline truncation */}
      {/* <h2 className="text-xl font-semibold text-gray-900 line-clamp-2"> */}
      {/*   {title} */}
      {/* </h2> */}

      {/* Card */}
      <Card
        hoverable
        className="overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
        bodyStyle={{ padding: 0 }}
      >
        {/* Image Section */}
        <div className="aspect-video w-full overflow-hidden">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>

        {/* Content Section */}
        <div className="p-4">
          <p className="font-poppins text-[14px] font-normal leading-[21px] text-left text-gray-600">
            {description}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default NotificationCard;
