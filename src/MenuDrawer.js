import { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Fab } from "@mui/material";
import { Save, Menu, ArrowBack, DriveFolderUpload } from '@mui/icons-material'
import { Converter } from 'showdown'
import { delay } from "./utils";


export function MenuDrawer({ setDocumentContent }) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const saveToFile = () => {
        setDrawerOpen(false)
        delay(2000).then(() => {
            const pageSource = document.documentElement.outerHTML;
            const downloadLink = document.createElement('a');
            downloadLink.href = "data:text/html," + unescape(encodeURI( escape(pageSource) ));
            downloadLink.target = '_blank';
            downloadLink.download = 'page.html';
            downloadLink.click();
        })
    }

    const loadMDFile = (event) =>{
        let file = event.target.files[0];
        setDocumentTitle(file.name)
        const reader = new FileReader()
        reader.onload = loadMDContent
        reader.readAsText(file)
    }

    const loadMDContent = async (e) => { 
        const text = (e.target.result)
        const converter = new Converter()
        setDocumentContent(converter.makeHtml(text))
    };

    const setDocumentTitle = (fileName) => {
        const stringParts = fileName.split(".").slice(0, -1)
        document.title = ''.concat(...stringParts)
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
                open={drawerOpen}
                >
                <List>
                    <ListItem key={1} disablePadding>
                        <label htmlFor="load-md-file">
                            <ListItemButton>
                                <DriveFolderUpload />
                                <ListItemText sx={{paddingLeft: '5px'}} primary="Load .md file" >
                                </ListItemText>
                            </ListItemButton>
                            <input
                                accept="text/markdown"
                                style={{ display: 'none' }}
                                id="load-md-file"
                                type="file"
                                onChange={loadMDFile}
                            />
                        </label>
                    </ListItem>
                    <ListItem key={2} disablePadding>
                        <ListItemButton onClick={saveToFile}>
                            <Save />
                            <ListItemText sx={{paddingLeft: '5px'}} primary="Save document" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Fab sx={fabStyle} color="secondary" aria-label="add" onClick={() => setDrawerOpen(!drawerOpen)}>
                {
                    drawerOpen ? <ArrowBack /> : <Menu />
                }
            </Fab>
        </>
    )
}