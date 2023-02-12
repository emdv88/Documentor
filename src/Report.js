import { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material"
import { CommentPopOver } from "./CommentPopOver";

// https://stackoverflow.com/questions/23479533/how-can-i-save-a-range-object-from-getselection-so-that-i-can-reproduce-it-on

export const getComments = () => {
    // https://dev.to/stevealila/3-typical-ways-to-store-data-using-javascript-1m1f
    let comment_storage;
    if(localStorage.getItem('comment_storage') === null){
        comment_storage = [];
    }else {
        comment_storage = JSON.parse(localStorage.getItem('comment_storage'));
    }
    return comment_storage;
}

export function buildRange(startOffset, endOffset, nodeData, nodeHTML, nodeTagName){
    var cDoc = document.getElementById('content-frame').contentDocument;
    var tagList = cDoc.getElementsByTagName(nodeTagName);
    
    
    const foundEle = tagList.find(x => x.innerHTML === nodeHTML);
    var nodeList = foundEle.childNodes;
    const foundNode = nodeList.find(x => x.data === nodeData);
    
    let startNode = foundNode
    let endNode = foundNode
    // create the range
    var range = cDoc.createRange();

    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    return range;
}

export function highlightRange(range, text) {
    // #TODO: test should not be an argument
    range.deleteContents();
    let highlightedNode = document.createElement('b')
    // highlightedNode.setAttribute('id', selectionCounter.toString())
    highlightedNode.appendChild(document.createTextNode(text))
    range.insertNode(highlightedNode);
}

export function Report({ documentContent }) {
    const [selectionCounter, setSelectionCounter] = useState(0)
    const [selectedText, setSelectedText] = useState("")
    const [popoverX, setPopoverX] = useState(0)
    const [popoverY, setPopoverY] = useState(0)
    const [showPopover, setShowPopover] = useState(false)
    const [comments, setComments] = useState([])



    const saveComment = inputData => {
        const comment_storage = getComments();
        comment_storage.push(inputData);
        localStorage.setItem('comment_storage', JSON.stringify(comment_storage));
    }



    function getSelectionText(e) {
        let text = "";
        if (window.getSelection) {
            let selection = window.getSelection();
            text = selection.toString()
            
            if (selection.rangeCount) {
                let range = selection.getRangeAt(0);
                highlightRange(range, text)
                
                var saveNode = range.startContainer;

                var startOffset = range.startOffset;  // where the range starts
                var endOffset = range.endOffset;      // where the range ends

                var nodeData = saveNode.data;                       // the actual selected text 
                // #FIXME: this appear not to be true, instead it's something like the leading text..
                
                var nodeHTML = saveNode.parentElement.innerHTML;    // parent element innerHTML
                var nodeTagName = saveNode.parentElement.tagName;   // parent element tag name
                let dat;
                dat = [startOffset, endOffset, nodeData, nodeHTML, nodeTagName];
                saveComment(dat);
                console.log(getComments());

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
        const newComment = (
            <Typography>
                <Typography variant="body2" sx={{fontStyle: 'italic', display: "inline"}}>
                    {`${selectedText}: `}
                </Typography>
                <Typography variant="body2" sx={{display: "inline"}}>
                    {comment}
                </Typography>
            </Typography>
        )
        
        setComments([...comments, newComment])
        setShowPopover(false)
        setSelectionCounter(selectionCounter + 1)
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
                        {<div dangerouslySetInnerHTML={{ __html: documentContent }} />}
                    </Grid>
                    <Grid item xs={4} id="comments">
                        <Typography variant="h5">
                            Comments
                        </Typography>
                        {comments}
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