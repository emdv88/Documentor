import { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material"
import { CommentPopOver } from "./CommentPopOver";

export function Report() {
    const [selectionCounter, setSelectionCounter] = useState(0)
    const [selectedText, setSelectedText] = useState("")
    const [popoverX, setPopoverX] = useState(0)
    const [popoverY, setPopoverY] = useState(0)
    const [showPopover, setShowPopover] = useState(false)

    function getSelectionText(e) {
        let text = "";
        if (window.getSelection) {
            let selection = window.getSelection();
            text = selection.toString()
            if (selection.rangeCount) {
                let range = selection.getRangeAt(0);
                range.deleteContents();
                let highlightedNode = document.createElement('b')
                highlightedNode.setAttribute('id', selectionCounter.toString())
                highlightedNode.appendChild(document.createTextNode(text))
                range.insertNode(highlightedNode);
            }
        } else if (document.selection && document.selection.type !== "Control") {
            // not tested yet
            // let range = document.selection.createRange();
            // text = range.text
            // range.html = `<u>${text}</u>`
        }

        if (text) {
            setSelectedText(text)
            setShowPopover(true)
            setPopoverX(e.pageY)
            setPopoverY(e.pageX)
        }
    }

    function handleSave(comment) {

        let commentNode = document.createElement("p")
        let textNode = document.createElement("i")
        textNode.appendChild(document.createTextNode(`${selectedText}: `))
        commentNode.appendChild(textNode)
        commentNode.appendChild(document.createTextNode(comment))
        document.getElementById("comments").appendChild(commentNode)

        setShowPopover(false)
        setSelectionCounter(selectionCounter + 1)
        setSelectedText("")
    }

    function handleCancel() {
        setShowPopover(false)
        let highlightElement = document.getElementById(selectionCounter.toString())
        highlightElement.replaceWith(document.createTextNode(selectedText))
        setSelectedText("")
    }

    return (
        <Card sx={{margin: "10px", width: "1000px"}} className="report">
            <CardContent onTouchEnd={getSelectionText} onMouseUp={getSelectionText}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant="h4">
                            This is a text highlighter demo
                        </Typography>
                        <Typography variant="body2">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
                            galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                            but also the leap into electronic typesetting, remaining essentially unchanged. 
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Typography>
                        <Typography variant="body2">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
                            galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                            but also the leap into electronic typesetting, remaining essentially unchanged. 
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Typography>
                    </Grid>
                    <Grid item xs={4} id="comments">
                        <Typography variant="h5">
                            Comments
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CommentPopOver 
                open={showPopover} 
                x={popoverX} 
                y={popoverY} 
                handleSave={handleSave} 
                handleCancel={handleCancel}/>
        </Card>
    );
}