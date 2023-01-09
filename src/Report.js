import { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material"
import { CommentPopOver } from "./CommentPopOver";
import $ from 'jquery'

export function Report() {
    const [selectionCounter, setSelectionCounter] = useState(0)
    const [selectedText, setSelectedText] = useState("")
    const [popoverX, setPopoverX] = useState(0)
    const [popoverY, setPopoverY] = useState(0)
    const [showPopover, setShowPopover] = useState(false)

    function getSelectionText(e) {
        // TODO: See > [note 1]. If text is selected across multiple divs, the divs themselves
        // are destroyed and replaced by a new node. This might or might not be what we
        // want. Say, a user selects and entire page: (paragraphs, headers, captions) and then
        // adds a comment. It would probably mess up the styling and layout.
        //
        // See > [note 2] To avoid the above, simply return is the anchor (start)
        // node is not equal to the focus (end) node.
        let text = "";
        if (window.getSelection) {
            let selection = window.getSelection();

            let anchor = selection.anchorNode;
            let focus = selection.focusNode;
            
            if (!$(anchor).is(focus)) {
                // User selected a range spanning mulitple divs
                // For now, let's not allow that.
                alert('Multiple divs selected! Bypassing popup')
                return // 

                let objs = [];

                let obj = selection.anchorNode.parentElement;
                while (!$(selection.focusNode.parentElement).is(obj)){
                    obj.style.backgroundColor = 'red'
                    let obj = obj.nextElementSibling
                    objs.push(obj)
            }
            }
                
            
                

            text = selection.toString()
            if (selection.rangeCount) {
                let range = selection.getRangeAt(0);
                range.deleteContents(); // See > [note 1]
                let highlightedNode = document.createElement('b')
                highlightedNode.setAttribute('id', selectionCounter.toString())
                highlightedNode.appendChild(document.createTextNode(text))
                range.insertNode(highlightedNode);
            }


            if (text) {
                
                setSelectedText(text)
                setShowPopover(true)
                setPopoverX(e.pageY)
                setPopoverY(e.pageX)
                addMarker(selection)
            }


        } else if (document.selection && document.selection.type !== "Control") {
            // not tested yet
            // let range = document.selection.createRange();
            // text = range.text
            // range.html = `<u>${text}</u>`
        }

            
        }

    function addMarker(selection){
        // Add a 'marker' span element with a specific id such that we can use it the location of
        // a certain comment.
        let range = selection.getRangeAt(0).cloneRange();
        range.collapse(false);
        
        let markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substring(2);
        alert('added a marker with id: '+ markerId)
        // Create the marker element containing a single invisible character using DOM methods and insert it
        var markerTextChar = "\ufeff";
        // var markerTextCharEntity = "&#xfeff;";
    
        let markerEl = document.createElement("span");
        markerEl.id = markerId;
        markerEl.appendChild( document.createTextNode(markerTextChar) );
        // range.insertNode(markerEl);
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
                    </Grid>
                    <Grid item xs={4} id="comments">
                        <Typography variant="h5">
                            Comments
                        </Typography>
                    </Grid>
                </Grid>
                <CommentPopOver 
                    open={showPopover} 
                    x={popoverX} 
                    y={popoverY} 
                    handleSave={handleSave} 
                    handleCancel={handleCancel}/>
            </CardContent>
        </Card>
    );
}