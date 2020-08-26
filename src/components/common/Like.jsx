import React from "react";

//input: like: boolean
//output: onClick (what ar the events i want to raise)

const Like = ({ liked, onClick }) => {
  // return liked === true ? (
  //   <i className="fa fa-heart" aria-hidden="true" />
  // ) : (
  //   <i className="fa fa-heart-o" aria-hidden="true" />
  // );
  let classes = "fa fa-heart";
  // console.log(liked.liked, "<<<liked");
  if (!liked) classes += "-o";
  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
