import React, { useState, useEffect } from "react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import {
    Box,
    Paper,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    Typography,
    Grid,
    Menu,
    Avatar,
    TextField,
    IconButton,
    Button,
    Tab,
    Tabs,
} from "@mui/material";

import { Head, useForm, router } from "@inertiajs/react";
import stringAvatar from "@/Utils/stringAvatar";
import RemixIcon from "@/Components/RemixIcon";

const MessageBaloon = ({ message, isSender }) => {
    return (
        <Box
            sx={{
                maxWidth: "560px",
                borderRadius: "16px",
                p: 2,
                backgroundColor: !isSender
                    ? "var(--primary-color)"
                    : "var(--white-color)",
                color: !isSender ? "var(--white-color)" : "inherit",
                // textAlign: !isSender ? "start" : "end",
            }}
        >
            <Typography sx={{ fontWeight: 500 }}>{message}</Typography>
        </Box>
    );
};

const ConversationInfo = ({ selected, name, id }) => {
    return (
        <MenuItem
            component="a"
            sx={{
                backgroundColor: "var(--white-color)",
                p: 2,
                gap: "8px",
            }}
            href={`/conversations/${id}`}
            selected={selected}
        >
            <ListItemIcon>
                <Avatar {...stringAvatar(name)} alt={name.toUpperCase()} />
            </ListItemIcon>
            <ListItemText>{name}</ListItemText>
            <Typography>10/04</Typography>
        </MenuItem>
    );
};

const ConversationsSideList = ({
    auth,
    conversation,
    conversationsWithUsers,
    conversationsWithSellers,
}) => {
    const defaultTabContent = auth.user.seller ? "users" : "sellers";
    const [tabContent, setTabContent] = useState(defaultTabContent);

    const handleChangeTab = (e, value) => {
        setTabContent(value);
    };

    return (
        <Box
            component="aside"
            sx={{
                width: "100%",
                backgroundColor: "var(--white-color)",
                height: "100%",
                border: "var(--borders)",
            }}
        >
            <Tabs
                value={tabContent}
                onChange={handleChangeTab}
                textColor="primary"
                indicatorColor="primary"
                variant="fullWidth"
            >
                <Tab value="sellers" label="Vendedores" />
                <Tab
                    value="users"
                    label="Usuários"
                    disabled={!auth.user.seller}
                />
            </Tabs>

            {tabContent === "sellers" && (
                <MenuList id="basic-menu" sx={{ py: 0 }}>
                    {conversationsWithSellers?.map((item, index) => (
                        <ConversationInfo
                            key={index}
                            id={item.id}
                            name={item.seller.name}
                            selected={conversation?.id === item.id}
                        />
                    ))}
                </MenuList>
            )}

            {tabContent === "users" && (
                <MenuList id="basic-menu" sx={{ py: 0 }}>
                    {conversationsWithUsers?.map((item, index) => (
                        <ConversationInfo
                            key={index}
                            id={item.id}
                            name={item.user.name}
                            selected={conversation?.id === item.id}
                        />
                    ))}
                </MenuList>
            )}
        </Box>
    );
};

export default function Conversations({
    conversationsWithUsers,
    conversationsWithSellers,
    conversationEvents,
    conversation,
    auth,
}) {
    const [message, setMessage] = useState("");
    const [events, setEvents] = useState(conversationEvents);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (conversation) {
            const channel = window.Echo.private(`chat.${conversation.id}`);

            const handleMessage = (e) => {
                setEvents((prevEvents) => [...prevEvents, e.conversationEvent]);
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
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
            setMessage("");
        }
    };

    return (
        <NavigationLayout user={auth.user} disableContainer disablePadding>
            <Head title="Conversas" />

            <Box sx={{ width: "100%", height: "100%" }}>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <ConversationsSideList
                            auth={auth}
                            conversation={conversation}
                            conversationsWithUsers={conversationsWithUsers}
                            conversationsWithSellers={conversationsWithSellers}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column-reverse",
                                    p: 4,
                                    minHeight: "76vh",
                                    maxHeight: "660px",
                                    overflowY: "auto",
                                }}
                            >
                                <Grid container spacing={2}>
                                    {events?.map((event, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            key={index}
                                            display={"flex"}
                                            justifyContent={
                                                auth.user.id === event.sender_id
                                                    ? "end"
                                                    : "start"
                                            }
                                        >
                                            <MessageBaloon
                                                message={event.message}
                                                isSender={
                                                    auth.user.id ===
                                                    event.sender_id
                                                }
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <Box
                                sx={{
                                    backgroundColor: "var(--white-color)",
                                }}
                            >
                                <Grid container spacing={0}>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{ p: 2 }}
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
                                            disabled={loading || !conversation}
                                            disableElevation
                                        >
                                            <RemixIcon
                                                className="ri-send-plane-2-line"
                                                color="var(--primary-color)"
                                            />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
