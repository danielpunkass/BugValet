function augmentOpenRadar()
{
    // If we're looking at the Open Radar "add" page, then populate it with 
    // details we stashed in local storage, if we have them.
    if (document.URL.indexOf("/myradars/add") != -1)
    {
       	safari.self.tab.dispatchMessage("readFromLocalStorage", "pendingRadarDetails");
    }   	
}

function safeString(stringOrBogus)
{
    var returnedString = "";
    
    if (stringOrBogus != undefined)
    {
        returnedString = stringOrBogus;
    }
    
    return returnedString;
}

function openRadarFormFieldByName(fieldName)
{
    return document.getElementsByName(fieldName)[0];
}

function populateNewRadarFormWithData(radarData)
{
    openRadarFormFieldByName("number").value = safeString(radarData.number);
    openRadarFormFieldByName("title").value = safeString(radarData.title);
    openRadarFormFieldByName("description").value = safeString(radarData.description);
    openRadarFormFieldByName("status").value = safeString(radarData.state);
    openRadarFormFieldByName("originated").value = safeString(radarData.date);
    openRadarFormFieldByName("product").value = safeString(radarData.product);
}

function getMessage(messageEvent)
{
    if (messageEvent.name == "didReadFromLocalStorage")
    {
        var retrievedDataKey = messageEvent.message[0];
        var retrievedData = messageEvent.message[1];
        
        populateNewRadarFormWithData(retrievedData);
    }    
}

safari.self.addEventListener("message", getMessage, false);
