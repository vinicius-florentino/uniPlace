import React from "react";
import {
    Box,
    Typography,
    Avatar,
    Container,
} from "@mui/material";

import stringAvatar from "@/Utils/stringAvatar";

const ConversationHeaderInfo = ({conversation, auth}) => {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                py: 2,
                backgroundColor: "var(--white-color)",
                border: "var(--borders)",
                borderTop: "none",
                borderLeft: "none",
            }}
        >
            <Container maxWidth="lg" disableGutters>
                {auth.user.id === conversation?.user_id && (
                    <Box sx={{ width: "100%" }} display="flex">
                        <Avatar
                            {...stringAvatar(conversation?.seller?.name)}
                            alt={conversation?.seller?.name.toUpperCase()}
                        />
                        <Typography>{conversation?.seller?.name}</Typography>
                    </Box>
                )}
                {auth.user.id !== conversation?.user_id && (
                    <Box
                        sx={{ width: "100%" }}
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        <Avatar
                            {...stringAvatar(conversation?.user?.name)}
                            alt={conversation?.user?.name.toUpperCase()}
                        />
                        <Typography>{conversation?.user?.name}</Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default ConversationHeaderInfo;
