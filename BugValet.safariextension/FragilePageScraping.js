// Centralize access to DOM elements by name and ID, so we can raise a big fuss if we're not able to find something
function fragileElementLookupById(theId)
{
    var foundElement = document.getElementById(theId);
    if (foundElement == undefined)
    {
        var failureReason = "the element with id \"" + theId + "\" could not be found."
        displayFailureAlert(failureReason);
    }
    
    return foundElement;
}

function fragileElementTextById(theId)
{
    var theText = "";
    var theElement = fragileElementLookupById(theId);
    if (theElement != undefined)
    {
        theText = theElement.innerText.trim();
    }
    
    return theText;
}

function fragileElementsByClassName(theClassName)
{
    var theElements = document.getElementsByClassName(theClassName);
    if (theElements.length == 0)
    {
        var failureReason = "no elements with class name \"" + theClassName + "\" could be found."
        displayFailureAlert(failureReason);        
    }
    
    return theElements;
}

function displayFailureAlert(specificFailure)
{
    window.alert("Ouch! The OpenRadar Helper extension has lost its mind because Apple's Bug Reporter is no longer designed the way it was when the extension was developed. Please disable the extension and/or update to a newer version.\n\nSpecifically: " + specificFailure);
}