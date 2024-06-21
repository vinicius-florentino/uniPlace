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

export default ConversationInfo;