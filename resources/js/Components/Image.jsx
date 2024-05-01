import React from "react";
import NoImage from "../Assets/noImage.jpg";

const Image = ({ src, ...props }) => {
    return <img src={src || NoImage} {...props} />;
};

export default Image;
