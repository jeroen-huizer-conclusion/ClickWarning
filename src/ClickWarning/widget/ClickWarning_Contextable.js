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
    return declare("ClickWarning.widget.ClickWarning_Contextable", [_WidgetBase], {

        //Widget variables
        buttonName: null,    // string
        alertMessageAttribute: null, // attribute name
        okCaptionAttribute: null, // attribute name
        cancelCaptionAttribute: null, // attribute name

        //Internal variables
        _alertMessage: null,  // string
        _okCaption: null,     // string
        _cancelCaption: null, // string
        _contextObj: null, 
        _origButton: null,
        _fakeButton: null,

        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            // Get the original button and hide it.
            this._origButton = $('.mx-name-'+this.buttonName).not(".cloned");;
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

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            if (obj) {
                this._contextObj = obj;

                // Set the content on update
                this._setupAlert();

                // Reset subscriptions
                this._resetSubscriptions();
    
            } else {
                logger.warn(this.id + ".update - Did not receive a context object.");
            }

            callback && callback();
        },

        _setupAlert: function(){
            logger.debug(this.id + "._setupAlert");
            this._alertMessage = this._contextObj ? this._contextObj.get(this.alertMessageAttribute) : "";
            this._okCaption = this._contextObj ? this._contextObj.get(this.okCaptionAttribute) : "Ok";
            this._cancelCaption = this._contextObj ? this._contextObj.get(this.cancelCaptionAttribute) : "Cancel";
        },


        // Shows a confirmation message
        _showAlert: function(){
            logger.debug(this.id + "._showAlert");
            mx.ui.confirmation({
                content: this._alertMessage,
                proceed: this._okCaption,
                cancel: this._cancelCaption,
                handler: lang.hitch(this, this._clickButton)
            });
        },

        _clickButton: function(){
            logger.debug(this.id + "._clickButton");
            this._origButton.click();
        },


        // Subscriptions
        _resetSubscriptions: function () {
            logger.debug(this.id + "._resetSubscriptions");

            this.unsubscribeAll();

            if (this._contextObj) {
                this.subscribe({
                    guid: this._contextObj,
                    callback: lang.hitch(this, this._setupAlert)
                });
            }
        },

    })
});

require(["ClickWarning/widget/ClickWarning_Contextable"]); 
