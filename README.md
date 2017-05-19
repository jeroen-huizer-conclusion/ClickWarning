Click warning
=============


##Description

Show a notification popup on any mendix button!

Some default Mendix buttons (e.g. Excel export) do not allow developers to add a confirmation dialog.
But with the ClickWarning widget you can!

It allows for a custom message and button captions.
There is also a contextable version, through which you can make your warning message run-time configurable.


##Features and limitations
Features:

Works on any button
Contextable and non-Contextable version
Limitations:

Requires the mx-name of the button to replace.
Through client api, user can still trigger the microflow without the confirmation message.

##Dependencies

* Developed for 6.5.1

##Configuration
* Add the widget to your page (in a dataview for the contextable version)
* Configure widget:
** Set the name of the button to replace
** Set the message and button captions

##Properties

