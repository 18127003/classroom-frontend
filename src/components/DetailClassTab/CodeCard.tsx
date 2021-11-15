import { CodeCardProps } from "@/@types/props";
import { MoreVertOutlined, LinkOutlined, ContentCopyOutlined, RefreshOutlined } from "@mui/icons-material";
import { Card, CardHeader, IconButton, CardContent, Typography } from "@mui/material";
import React from "react";
import PopupMenu from "../PopupMenu";
import PopupMenuItem from "../PopupMenu/PopupMenuItem";

const CodeCard: React.FC<CodeCardProps> = ({code})=>{
    return (
        <Card>
            <CardHeader
            action={
                <PopupMenu 
                id="profile-menu"
                button={<IconButton><MoreVertOutlined/></IconButton>}
                >
                <PopupMenuItem title="Copy invited link" button={<IconButton><LinkOutlined/></IconButton>}>
                </PopupMenuItem>
                <PopupMenuItem title="Copy Code" button={<IconButton><ContentCopyOutlined/></IconButton>}>
                </PopupMenuItem>
                <PopupMenuItem title="Change Code" button={<IconButton><RefreshOutlined/></IconButton>}>
                </PopupMenuItem>
                </PopupMenu>
            }
            title="Code"
            />
            <CardContent>
            <Typography sx={{ mb: 1.5 }} variant="body2" noWrap>
                {code}
            </Typography>
            </CardContent>
        </Card>
    )
}

export default CodeCard;