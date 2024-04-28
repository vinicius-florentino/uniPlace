import React, {useEffect, useState} from "react";
import NoImage from "../Assets/noImage.jpg";

const Image = ({ src, xs, lg, ...props }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (!src) {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    const imageUrl = windowWidth >= 900 && !src ? lg : xs;

    return (
        <img
            src={src || imageUrl || NoImage}
            {...props}
        />
    );
};

export default Image;
