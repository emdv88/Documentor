import { Popover, Typography, TextField, Button, Box } from "@mui/material";
import { useState } from "react";


export function CommentPopOver({x, y, open, handleSave, handleCancel}) {
    const [comment, setComment] = useState("")

    return (
        <Popover
            id="comment"
            open={open}
            anchorReference="anchorPosition"
            anchorPosition={{ top: x, left: y }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Box>
                <Typography>
                    Add a Comment
                </Typography>
                <TextField id="comment-input" label="comment" variant="outlined" onChange={(e) => setComment(e.target.value)}/>
                <Button onClick={() => handleSave(comment)} variant={"contained"}>
                    Save
                </Button>
                <Button onClick={() => handleCancel()} variant={"contained"}>
                    Cancel
                </Button>
            </Box>
        </Popover>
    )
}