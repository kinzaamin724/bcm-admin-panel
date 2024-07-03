import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <>
      <div
        className="globalAlignItemsCenter globalJustifyContentCenter globalDisplay globalFullPageHeight globalFullWidth"
        style={{
          margin: "auto",
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading
          type={"spokes"}
          color={"blue"}
          height={"5%"}
          width={"5%"}
        />
      </div>
    </>
  );
}
