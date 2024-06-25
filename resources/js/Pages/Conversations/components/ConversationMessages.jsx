import React from "react";

import { Box, Grid, Container } from "@mui/material";

import MessageBaloon from "./MessageBaloon";

const ConversationMessages = ({auth, messages}) => {
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column-reverse",
                overflowY: "auto",
                py: 2,
                flexGrow: 1,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2} sx={{ width: "100%" }}>
                    {messages?.map((message, index) => (
                        <Grid
                            item
                            xs={12}
                            key={index}
                            display={"flex"}
                            justifyContent={
                                auth.user.id === message.sender_id
                                    ? "end"
                                    : "start"
                            }
                        >
                            <MessageBaloon
                                message={message.message}
                                isSender={auth.user.id === message.sender_id}
                                createdAt={message.created_at}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ConversationMessages;
