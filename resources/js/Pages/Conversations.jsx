import React, { useState, useEffect } from "react";
import ConversationsLayout from "@/Layouts/ConversationsLayout";
import {
    Box,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Grid,
    Avatar,
    TextField,
    IconButton,
    Tab,
    Tabs,
    Container,
} from "@mui/material";

import { Head, router } from "@inertiajs/react";
import stringAvatar from "@/Utils/stringAvatar";
import RemixIcon from "@/Components/RemixIcon";

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

const ConversationInfo = ({ selected, name, id }) => {
    return (
        <MenuItem
            component="a"
            sx={{
                backgroundColor: "var(--white-color)",
                p: 2,
                gap: "8px",
            }}
            selected={selected}
            onClick={() => router.visit(`/conversations/${id}`)}
        >
            <ListItemIcon>
                <Avatar {...stringAvatar(name)} alt={name.toUpperCase()} />
            </ListItemIcon>
            <ListItemText primary={name} secondary="teste" />
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

    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleChangeTab = (e, value) => {
        setTabContent(value);
    };

    const handleCollapseToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Box
            component="aside"
            sx={{
                backgroundColor: "var(--white-color)",
                height: "100%",
                minWidth: !isCollapsed ? { xs: "50vw", md: "30vw" } : "auto",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    p: 2,
                }}
            >
                <IconButton onClick={() => handleCollapseToggle()}>
                    <RemixIcon
                        className={
                            !isCollapsed
                                ? "ri-expand-left-line"
                                : "ri-expand-right-line"
                        }
                    />
                </IconButton>
            </Box>
            {!isCollapsed && (
                <>
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
                </>
            )}
            {isCollapsed && (
                <>
                    {tabContent === "sellers" && (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {conversationsWithSellers?.map((item, index) => (
                                <Avatar
                                    key={index}
                                    {...stringAvatar(item.seller.name)}
                                    alt={item.seller.name.toUpperCase()}
                                />
                            ))}
                        </Box>
                    )}
                    {tabContent === "users" && (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {conversationsWithUsers?.map((item, index) => (
                                <IconButton
                                    onClick={() =>
                                        router.visit(
                                            `/conversations/${item.id}`
                                        )
                                    }
                                >
                                    <Avatar
                                        key={index}
                                        {...stringAvatar(item.user.name)}
                                        alt={item.user.name.toUpperCase()}
                                    />
                                </IconButton>
                            ))}
                        </Box>
                    )}
                </>
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
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                py: 2,
                                backgroundColor: "var(--white-color)",
                            }}
                        >
                            <Container maxWidth="lg" disableGutters>
                                {auth.user.id === conversation?.user_id && (
                                    <>
                                        <Avatar
                                            {...stringAvatar(
                                                conversation?.seller?.name
                                            )}
                                            alt={conversation?.seller?.name.toUpperCase()}
                                        />
                                        <Typography>
                                            {conversation?.seller?.name}
                                        </Typography>
                                    </>
                                )}
                                {auth.user.id !== conversation?.user_id && (
                                    <>
                                        <Avatar
                                            {...stringAvatar(
                                                conversation?.user?.name
                                            )}
                                            alt={conversation?.user?.name.toUpperCase()}
                                        />
                                        <Typography>
                                            {conversation?.user?.name}
                                        </Typography>
                                    </>
                                )}
                            </Container>
                        </Box>
                    )}

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
                        <Container maxWidth="lg" disableGutters>
                            <Grid container spacing={2} sx={{ width: "100%" }}>
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
                                                auth.user.id === event.sender_id
                                            }
                                            createdAt={event.created_at}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Box>

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
                                        disabled={
                                            loading || !conversation || !message
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
                </Box>
            </Box>
        </ConversationsLayout>
    );
}
