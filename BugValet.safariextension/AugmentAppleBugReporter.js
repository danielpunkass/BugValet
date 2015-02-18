
function titleFromCurrentBug()
{
    var theText = "";
    var theElement = fragileElementLookupById("probTitleUpdateBox");
    if (theElement != undefined)
    {
        // It's an "input" node with title as value
        theText = theElement.value;
    }
    
    return theText;
}

function descriptionFromCurrentBug()
{
    var theText = "";
    
    // Updates to the bug's running description are all in individual 
    // class="preContent" elements. Typically this will just be one item, 
    // the first item just generated for the bug. But on existing bugs where
    // some number of updates exist there could be e.g. updates from Apple
    // or whatever, and those shouldn't be propagated out of Radar. Longer term
    // it makes sense to try to deduce which are which, but in the shorter term,
    // we only copy out the description for the FIRST entry, the original bug
    // report, which should correlate to the LAST item in the list.
    var allPreContentElements = fragileElementsByClassName("preContent");
    var elementCount = allPreContentElements.length;
    if (elementCount > 0)
    {
        var lastElement = allPreContentElements[elementCount - 1];
        theText = lastElement.innerText;
    }
    
    return theText;
}

function creationDateFromCurrentBug()
{
    var theText = "";
    
    // Similarly to description above, each update to the bug shows with a 
    // corresponding date. We'll just assume the last item (being the first entry
    // chronologically) contains the span that has the date we want.
    document.getElementsByClassName("fromID")[0].lastChild
    var allFromIDElements = fragileElementsByClassName("fromID");
    var elementCount = allFromIDElements.length;
    if (elementCount > 0)
    {
        var lastElement = allFromIDElements[elementCount - 1];
        
        // The element is a <h3> element with text and a span child which contains the date
        theText = lastElement.lastChild.innerText;
    }
    
    return theText;    
}

function dictionaryOfBugDetailsFromNode(detailsViewNode)
{
    // Could use the detailsViewNode to do more limited search e.g. with Xpath, 
    // but for now we're basically hard-coding everything based on full-document 
    // scraping given the understanding that we are currently focused on a specific bug
    return {number: fragileElementTextById("displayFullDetailsProblemID"), 
            title: titleFromCurrentBug(),
            description: descriptionFromCurrentBug(),
            state: fragileElementTextById("problemState"),
            product: fragileElementTextById("productFieldTab"),
            date: creationDateFromCurrentBug() 
            };   
}

// Save the active bug's details to the extension's global page local storage, and 
// open a new tab for OpenRadar where the injected scripts will read the details 
// and populate the UI.
function sendToOpenRadar()
{
    var activeBugDetails = dictionaryOfBugDetailsFromNode(fragileElementLookupById("detailsView"));

   	safari.self.tab.dispatchMessage("saveToLocalStorage", ["pendingRadarDetails", activeBugDetails]);
    
    window.open('http://openradar.me/myradars/add', "new tab");		
}

// Add the "Send to OpenRadar" button
function augmentHeaderSection(headerNode)
{
    // We just stick the button next to the "priorityContainer" node for now 
    var buttonSibling = fragileElementLookupById("priorityContainer");

	var sendToOpenRadarButton = document.createElement('input');
	sendToOpenRadarButton.setAttribute('type','button');
	sendToOpenRadarButton.setAttribute("value", "Send to Open Radar");
	sendToOpenRadarButton.setAttribute("style", "margin-left:24; margin-top:6; position:relative; top:2;")
	sendToOpenRadarButton.onclick = sendToOpenRadar;
	buttonSibling.parentElement.appendChild(sendToOpenRadarButton);
}

function augmentAppleBugReporter()
{
    // Anywhere else in Apple Bug Reporter, let's see if we have the cue to 
    // create a new problem, and always add UI pertinent to cloning to OpenRadar
    // safari.self.tab.dispatchMessage("getOpenRadarValue", "wantsDuplicateRadar");
 
    // We inject our UI enhancements by monitoring changes to the DOM for the page
    var observer = new MutationObserver(function(mutationRecords) {
        var recordCount = mutationRecords.length;
        for (thisRecordIndex = 0; thisRecordIndex < recordCount; thisRecordIndex++) {
            var thisRecord = mutationRecords[thisRecordIndex];
            if (thisRecord.target.id == "detailsView") {            
                var theseAddedNodes = thisRecord.addedNodes;
                if ((theseAddedNodes != undefined) && (theseAddedNodes.length > 0)) {
                    var nodeCount = theseAddedNodes.length;
                    for (thisNodeIndex = 0; thisNodeIndex < nodeCount; thisNodeIndex++) {
                        var thisNode = theseAddedNodes[thisNodeIndex];
                        
                        // We are inserting a node into the details view. We're interested specifically
                        // in the node that is the "header" for a bug containing e.g. bug ID Number, state,
                        // etc. And the node that is the content 
                        var isHeaderNode = (thisNode.id.indexOf("wrapper-header") == 0);
                        if (isHeaderNode) {
                            augmentHeaderSection(thisNode);
                        }
                        var isContentNode = (thisNode.id == "detailsViewContent");
                        if (isContentNode) {
                            console.log("Adding content node:", + thisNode);
                        }
                    }
                }
            }
        }
    });

    observer.observe(document.body,
     {  // options:
         subtree: true,  // observe the subtree rooted at myNode
         childList: true,  // include information childNode insertion/removals
         attribute: false  // include information about changes to attributes within the subtree
    });
}