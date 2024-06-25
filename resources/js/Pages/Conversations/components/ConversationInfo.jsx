import React from "react";
import {
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Avatar,
} from "@mui/material";

import { router } from "@inertiajs/react";
import stringAvatar from "@/Utils/stringAvatar";
import formatDateTime from "@/Utils/formatDateTime";
import formatTime from "@/Utils/formatTime";
import dayjs from "dayjs";

const ConversationInfo = ({ selected, name, id, lastConversationEvent }) => {

    const isDateToday = (dateToCheck) => {
        const today = dayjs().startOf("day");
        const date = dayjs(dateToCheck).startOf("day");

        return today.isSame(date);
    };

    const truncateMessage = (message) => {
        if (message && message.length > 30) {
            return message.slice(0, 20) + "...";
        }
        return message;
    };

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
            <ListItemText
                primary={name}
                secondary={truncateMessage(lastConversationEvent?.message)}
                primaryTypographyProps={{
                    style: {
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    },
                }}
                secondaryTypographyProps={{
                    style: {
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    },
                }}
            />
            <Typography
                sx={{
                    fontWeight: 300,
                    fontSize: 12,
                    whiteSpace: "pre-line",
                    textAlign: "right",
                }}
            >
                {isDateToday(lastConversationEvent?.created_at) &&
                    formatTime(lastConversationEvent?.created_at)}
                {!isDateToday(lastConversationEvent?.created_at) &&
                    formatDateTime(lastConversationEvent?.created_at)}
            </Typography>
        </MenuItem>
    );
};

export default ConversationInfo;
