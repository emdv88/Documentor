import { Drawer, List, ListItem, ListItemButton, ListItemText, Fab } from "@mui/material";
import { Save, Menu, ArrowBack } from '@mui/icons-material'
import { useState } from "react";

export function MenuDrawer() {
    const [open, setOpen] = useState(false)

    function saveToFile() {
        var pageSource = document.documentElement.outerHTML;
        var downloadLink = document.createElement('a');
        downloadLink.href = "data:text/html," + unescape(encodeURI( escape(pageSource) ));
        downloadLink.target = '_blank';
        downloadLink.download = 'page.html';
        downloadLink.click();
    }

    const fabStyle = {
        margin: 0,
        top: 'auto',
        left: 20,
        bottom: 20,
        right: 'auto',
        position: 'fixed',
        zIndex: 10000
    };

    return (
        <>
            <Drawer
                anchor={'left'}
                open={open}
                >
                <List>
                    <ListItem key={1} disablePadding>
                        <ListItemButton onClick={saveToFile}>
                            <Save />
                            <ListItemText sx={{paddingLeft: '5px'}} primary="Save document" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Fab sx={fabStyle} color="secondary" aria-label="add" onClick={() => setOpen(!open)}>
                {
                    open ? <ArrowBack /> : <Menu />
                }
            </Fab>
        </>
    )
}