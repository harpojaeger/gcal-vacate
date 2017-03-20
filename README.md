# Help

##What is gcal vacate?
An application that quickly deletes all repeating events on your Google Calendar within a specific date range only.

I have a lot of weekly and daily repeating events in my Google Calendar.  When I went on vacation and changed my timezone, they all showed up at inconvenient times.  I couldn't simply bulk delete them going forward, because I wanted them to be there when I got home.  So, instead of deleting every single one by hand, I wrote this application to do it for me (and you).  

##How do you use it?
Follow the instructions to give gcal vacate access to your Google account (gcal vacate doesn't store your login information in any way).  Then, select the calendar to search and set boundary dates.

Click on the name of a repeating event to show all its instances between your boundary dates.  By default, all of these instances are selected for deletion.  Click on them to toggle selection, or use the quick select all/none links.  gcal vacate won't delete any events **outside** the boundary dates.  It also ignores regular, non-repeating events.

You can't undo event deletions with this application.  Measure twice, cut once.

# Credits

In no order:

* [jQuery](http://jquery.com/) & [jQuery UI](http://jqueryui.com/)
* [rrule.js](https://github.com/jkbrzt/rrule)
* [Datejs](http://www.datejs.com/)
* [@benolson716](https://twitter.com/benolson716) for [a very helpful post on custom jQuery UI widgets](http://www.benknowscode.com/2014/03/customize-jquery-ui-autocomplete-menu.html)
* [meyerweb reset.css](http://meyerweb.com/eric/tools/css/reset/) (it's public domain, but still, thanks.)
* A bunch of sites with [useful information](http://madebymike.com.au/writing/precise-control-responsive-typography/) [about](https://css-tricks.com/viewport-sized-typography/) [responsive](https://css-tricks.com/molten-leading-css/) CSS font sizing.
* The one million answers I got from [Stack Overflow](http://stackoverflow.com/).