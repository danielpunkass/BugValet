function respondToMessage(messageEvent) {
    if (messageEvent.name == "saveToLocalStorage")
    {
        var storageKey = messageEvent.message[0];
        var storageValue = messageEvent.message[1];
       localStorage.setItem(storageKey, JSON.stringify(storageValue)); 
    }
    else if (messageEvent.name == "readFromLocalStorage")
    {
         var value = localStorage.getItem(messageEvent.message);
         var returnedValue = [messageEvent.message, JSON.parse(value)];
         safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("didReadFromLocalStorage", returnedValue);         
    }
}

safari.application.addEventListener("message", respondToMessage,false);
