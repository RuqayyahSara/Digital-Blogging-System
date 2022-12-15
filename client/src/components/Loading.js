import React from "react";
import loading from "../Utils/loading.gif";

function Loading() {
  return (
    <>
      <center>
        <img src={loading} alt="Loading.." style={{ marginTop: "50px", marginBottom:'50px' }} />
      </center>
    </>
  );
}

export default Loading;