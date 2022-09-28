import React from "react";
import { Circles } from "react-loader-spinner";

function Loading() {
  return (
    <div className="my-0 mx-auto w-full text-center">
      <Circles
        height="50"
        width="50"
        color="#00BFFF"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loading;
