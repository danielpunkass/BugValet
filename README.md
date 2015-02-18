Bug Valet
=========

Bug Valet: because copying a bug from Apple's Bug Reporter to Open Radar should be easy.

Installation
------------

Download and install the <a href="https://github.com/danielpunkass/BugValet/releases/download/1.0/BugValet1.0.safariextz">latest version</a> of this Safari Extension. Future updates can be automatically installed by Safari's update infrastructure.

Use
---

With the plugin installed, you will find an additional button in the user interface when examining your own (already filed) bugs in Apple's Bug Reporter. Select a bug from your list by clicking on it, then find the button labeled "Send to Open Radar". Click the button to open a new tab to Open Radar, where you will find the "New Radar" form pre-populated with some of the most important information from your bug report.

Caveats
-------

Currently only the following items are scraped from the existing bug report's content:

- Bug number
- Title
- Product
- Status
- Description

Other values such as the classification, product version, reproducible status, etc., are harder to glean easily from the submitted bug display in Apple's Bug Reporter.

It might be possible to get them out somehow, and such breakthroughs will be welcomed as pull requests, but in practice I find it's helpful enough to get a big head start on copying over the pertinent information.

Rationale
---------

I have had the idea for a long time to put together something like this, and I know I'm not the first. There are other solutions that facilitate "cross posting" to both Apple's Bug Reporter and Open Radar at the same time, but most of these involve a custom UI that doesn't support all the features of Apple's canonical web-based system. Usually I found that I just ended up going to the Bug Reporter site and going through the normal web interface, so it was compelling to me to come up with something that lets me copy any existing bug report's essential information into Open Radar for easy sharing.

While putting this together, I leaned on Guillaume Campagna's <a href="https://github.com/gcamp/OpenRadarHelper">Open Radar Helper</a>, which is also a Safari extension, but which appears to have become non-functional after the last round of Bug Reporter redesigns. I started this project as a fork initially of Guillaume's project, but decided ultimately that I am only interested in the subset of behavior that allows easy transfer of content from the Bug Reporter to Open Radar. Other features such as updating existing bug content, and duping bugs from Open Radar to Bug Reporter, are not as important to me. So I decided to make my own streamlined extension that does what I need. Hopefully it does something you need, as well.