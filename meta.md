# Help

##What is GCal Vacate?
An application that helps you quickly delete all (or some) repeating events between dates you select.

I have a lot of repeating events in my Google Calendar.  When I went on vacation and changed my timezone, they all showed up at inconvenient times.  I didn't want to look at them while I was on vacation, but since I also wanted them to be there when I got back, I couldn't just delete them all.  So, instead of deleting every individual event by hand, I wrote this application to do it for me (and you).  

##How do you use it?
Follow the instructions to give GCal Vacate access to your Google account (GCal Vacate doesn't store your login information in any way).  Then, select the calendar to search and set boundary dates.

Click on the name of a repeating event to show all its instances between your boundary dates.  By default, all of these instances are selected for deletion.  Click on them to toggle selection, or use the quick select all/none links.

You can't undo event deletions with this application.  Measure twice, cut once.

# Credits

This is the first application I've written that really works as intended and is even remotely shippable.  I used a lot of external libraries and relied on a lot of helpful sources.  In no order:

* [jQuery](http://jquery.com/) & [jQuery UI](http://jqueryui.com/)
* [rrule.js](https://github.com/jkbrzt/rrule)
* [Datejs](http://www.datejs.com/)
* [@benolson716](https://twitter.com/benolson716) for [a very helpful post on custom jQuery UI widgets](http://www.benknowscode.com/2014/03/customize-jquery-ui-autocomplete-menu.html)
* [meyerweb reset.css](http://meyerweb.com/eric/tools/css/reset/) (it's public domain, but still, thanks.)
* The one million answers I got from [Stack Overflow](http://stackoverflow.com/).