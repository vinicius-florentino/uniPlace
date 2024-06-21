import React, { useState } from "react";
import {
    Box,
    MenuList,
    Avatar,
    IconButton,
    Tab,
    Tabs,
} from "@mui/material";

import { router } from "@inertiajs/react";
import stringAvatar from "@/Utils/stringAvatar";
import RemixIcon from "@/Components/RemixIcon";
import ConversationInfo from "./ConversationInfo";

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
                border: "var(--borders)",
                borderTop: "none",
                borderLeft: "none",
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

export default ConversationsSideList;
