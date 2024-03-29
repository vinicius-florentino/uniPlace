import React from "react";
import NoImage from "../Assets/noImage.jpg";

export const Image = ({src, ...props}) => {
    return <img src={src ?? NoImage} {...props} ></img>
}

export default Image;