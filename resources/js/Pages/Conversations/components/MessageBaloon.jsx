import React from "react";
import { Box, Typography } from "@mui/material";

import formatDateTime from "@/Utils/formatDateTime";

const MessageBaloon = ({ message, isSender, createdAt }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="8px"
            sx={{ maxWidth: "570px", px: 2 }}
        >
            <Box
                sx={{
                    borderRadius: "16px",
                    px: 2,
                    py: 1,
                    mr: !isSender ? 2 : 0,
                    ml: !isSender ? 0 : 2,
                    backgroundColor: !isSender
                        ? "var(--primary-color)"
                        : "var(--white-color)",
                    color: !isSender ? "var(--white-color)" : "inherit",
                    // textAlign: !isSender ? "start" : "end",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere",
                    }}
                >
                    {message}
                </Typography>
            </Box>
            <Box>
                <Typography
                    sx={{
                        fontWeight: 300,
                        fontSize: 12,
                        textAlign: isSender ? "end" : "start",
                    }}
                >
                    {formatDateTime(createdAt) || "Data inválida"}
                </Typography>
            </Box>
        </Box>
    );
};

export default MessageBaloon;
