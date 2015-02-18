
// We only augment pages from bugreport.apple.com and OpenRadar.
if (document.URL.indexOf("bugreport.apple.com") != -1)
{
    augmentAppleBugReporter();
}
else if ((document.URL.indexOf("openradar.me") !=  -1) ||
        (document.URL.indexOf("openradar.appspot.com") !=  -1))
{
    augmentOpenRadar();
}
