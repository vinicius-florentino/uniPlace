import React, { useState, useEffect } from "react";
import ConversationsLayout from "@/Layouts/ConversationsLayout";
import { Box, Grid, TextField, IconButton, Container } from "@mui/material";

import { Head, router } from "@inertiajs/react";
import RemixIcon from "@/Components/RemixIcon";

import ConversationsSideList from "./components/ConversationsSideList";
import ConversationHeaderInfo from "./components/ConversationHeaderInfo";
import ConversationMessages from "./components/ConversationMessages";

export default function Conversations({
    conversationsWithUsers,
    conversationsWithSellers,
    conversationEvents,
    conversation,
    auth,
}) {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(conversationEvents);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (conversation) {
            const channel = window.Echo.private(`chat.${conversation.id}`);

            const handleMessage = (e) => {
                setMessages((prevEvents) => [
                    ...prevEvents,
                    e.conversationEvent,
                ]);
            };

            channel.listen(".chat-message", handleMessage);

            return () => {
                channel.stopListening(".chat-message", handleMessage);
            };
        }
    }, []);

    const handleChange = (e) => {
        const { value } = e.target;
        setMessage(value);
    };

    const sendMessage = async () => {
        setLoading(true);

        router.post(
            "/conversations",
            { message: message, conversation_id: conversation?.id },
            {
                onSuccess: () => {
                    setLoading(false);
                    setMessage("");
                },
            }
        );
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey && message) {
            event.preventDefault();
            sendMessage();
            setMessage("");
        }
    };

    return (
        <ConversationsLayout user={auth.user} disableContainer disablePadding>
            <Head title="Conversas" />

            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <ConversationsSideList
                    auth={auth}
                    conversation={conversation}
                    conversationsWithUsers={conversationsWithUsers}
                    conversationsWithSellers={conversationsWithSellers}
                />

                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {conversation && (
                        <>
                            <ConversationHeaderInfo
                                conversation={conversation}
                                auth={auth}
                            />
                            <ConversationMessages
                                messages={messages}
                                auth={auth}
                            />
                            <Box
                                sx={{
                                    backgroundColor: "var(--white-color)",
                                    width: "100%",
                                }}
                            >
                                <Container maxWidth="lg" disableGutters>
                                    <Grid container spacing={0}>
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{ py: 2 }}
                                            display={"flex"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                            gap={"8px"}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                multiline
                                                name="message"
                                                value={message}
                                                maxRows={4}
                                                onChange={handleChange}
                                                placeholder="Digite sua mensagem"
                                                onKeyDown={handleKeyDown}
                                                disabled={!conversation}
                                            />
                                            <IconButton
                                                onClick={() => sendMessage()}
                                                disabled={
                                                    loading ||
                                                    !conversation ||
                                                    !message
                                                }
                                            >
                                                <RemixIcon
                                                    className="ri-send-plane-2-line"
                                                    color="var(--primary-color)"
                                                />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </ConversationsLayout>
    );
}
