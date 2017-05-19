define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/_base/lang",

    "ClickWarning/lib/jquery"
    
], function (declare, _WidgetBase,
    dom, lang,
    _jQuery,
    widgetTemplate
) { 
    "use strict";

    var $ = _jQuery.noConflict(true);

    // Declare widget"s prototype.
    return declare("ClickWarning.widget.ClickWarning", [_WidgetBase], {

        //Widget variables
        buttonName: null,    // string
        alertMessage: null,  // string
        okCaption: null,     // string
        cancelCaption: null, // string


        //Internal variables
        _origButton: null,
        _fakeButton: null,

        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            // Get the original button and hide it.
            this._origButton = $('.mx-name-'+this.buttonName).not(".cloned");
            if (this._origButton.length){
                this._origButton.hide();
                this._origButton.addClass('cloned'); 

                // Clone the button (does not copy events) and attach our own click listener
                this._fakeButton = this._origButton.clone();
                this._fakeButton.removeClass('mx-name-'+this.buttonName);   // Just to be sure
                this._fakeButton.removeAttr('id');                              // Just to be sure
                this._fakeButton.on("click", lang.hitch(this, this._showAlert));

                // Put it in the toolbar, next to the original button
                this._fakeButton.insertAfter(this._origButton);
                this._fakeButton.show();
            }
            else{
                logger.debug(this.id + ".postCreate: could not find button.");
            }
        },

        // Shows a confirmation message
        _showAlert: function(){
            logger.debug(this.id + "._showAlert");
            mx.ui.confirmation({
                content: this.alertMessage,
                proceed: this.okCaption,
                cancel: this.cancelCaption,
                handler: lang.hitch(this, this._clickButton)
            });
        },

        _clickButton: function(){
            logger.debug(this.id + "._clickButton");
            this._origButton.click();
        }

    })
});

require(["ClickWarning/widget/ClickWarning"]);
