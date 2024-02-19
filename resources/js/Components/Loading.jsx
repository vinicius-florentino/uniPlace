import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <div style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "16px"}}>
            <CircularProgress size={20} disableShrink />
        </div>
        
    );
};

export default Loading;
