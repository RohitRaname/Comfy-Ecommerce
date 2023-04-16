import React from "react";
const Error = ({ error }) => {
  return (
    <div className="section section-center text-center">
      <h3>{error}</h3>
    </div>
  );
};

export default Error;
