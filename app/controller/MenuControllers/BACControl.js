/**
 * Created with JetBrains PhpStorm.
 * Date: 5/10/13
 * Time: 4:43 AM
 */
Ext.define('SipSip.controller.MenuControllers.BACControl',{
    extend: 'Ext.app.Controller',

    config:{
        refs:{
            bacPage: '#bacPage-id',
            main: '#mainPage-id',    //To use with the back Button
            menuPage:    '#menu-id',
            bacResult: '#BACResult-id',
            iconPopup: '#bacPopup-image-id',
            message: '#bacPopup-result-id',

            weightField: '#bac-weight-id',
            durationField: '#bac-time-id',
            consumedField: '#bac-amount-id'

        },
        control: {
            "button[action=bac-calculate-id]": {
                tap: 'calculateBAC'
            },
            "button[action=bac-reset-id]": {
                tap: 'resetFields'
            },
            "button[action=bac-backButton]": {  //back to the menu page
                tap: 'backToMenu'
            }
        }
    },
    /*
     * Get all the inputs from all fields and calculate the BAC.
     * Then display the result using a popup window.
     */
    calculateBAC: function(){
        var me = this;
        var bacPage = me.getBacPage();
        //console.log('bacPage  ', bacPage);
        var sex = bacPage.items.items[1]._value.data.value;
        var weight = parseInt(bacPage.items.items[2]._value);
        var duration = parseInt(bacPage.items.items[3]._value);
        var type = bacPage.items.items[4]._value.data.value;
        var consumed = bacPage.items.items[5]._value.data.value;
        //console.log('type  ', type);

        if(!weight || weight > 500 || weight < 50){  //bad weight, display error
            Ext.Msg.alert('50lbs < Weight < 500lbs');
            return;
        }
        if(!duration || duration > 100 || duration < 1){  //bad weight, display error
            Ext.Msg.alert('0.0 < Duration < 100.0');
            return;
        }

        //Perform the calculation here:
        var bacResult = 0;
        if (sex === "male"){
           bacResult = (consumed * 0.06* 100 * 1.055/weight * .68) - (0.015 * duration);
            
        }
        // If Female
        else {
           bacResult = (consumed * 0.06 * 100* 1.055/weight * .55) - (0.015 * duration);
        }

        //Popup the result window:
        bacResult = Math.round(bacResult*1000)/1000;  //round up to .000
        me.launchBACPopup(sex,weight,bacResult);

    },
    /**
     * Show the Result Popup Window.
     * @param bacResult: the BAC result.
     */
    launchBACPopup: function(sex,weight,bacResult){
        var me = this;
        var bacPopup = me.getBacResult();
        var message ='';
        var src = '';

        //get Message
        if(sex === 'male'){
            if(weight < 120){
                if(bacResult <.04){
                    message = 'Safe to Drive';
                }
                else if( bacResult <.08 && bacResult >= .04){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult <.30 && bacResult >=.08 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 120 && weight < 140){
                if(bacResult < 0.06){
                    message = 'Safe to Drive';
                }
                else if( bacResult < .09 && bacResult >= .06){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult < 0.31 && bacResult >= 0.09){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 140 && weight < 160){
                if(bacResult <.05){
                    message = 'Safe to Drive.';
                }
                else if( bacResult < .08 && bacResult >= 0.05){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult < 0.27 && bacResult >= 0.08){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 160 && weight < 180){
                if(bacResult < 0.05){
                    message = 'Safe to Drive.';
                }
                else if( bacResult < .09 && bacResult >=0.05){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult >= 0.09 && bacResult <= 0.23){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 180 && weight < 200){
                if(bacResult < 0.04){
                    message = 'Safe to Drive.';
                }
                else if( bacResult < .08 && bacResult >= 0.04){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult >= 0.08 && bacResult <= 0.21){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 200 && weight < 220){
                if(bacResult < 0.04){
                    message = 'Safe to Drive.';
                }
                else if( bacResult < 0.08 && bacResult >= 0.04){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult >= 0.08 && bacResult <= 0.19){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 220 && weight < 240){
                if(bacResult < 0.03){
                    message = 'Safe to Drive.';
                }
                else if( bacResult < 0.09 && bacResult >= 0.03){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult >= 0.09 && bacResult <= 0.17){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 240){
                if(bacResult < 0.03){
                    message = 'Safe to Drive.';
                }
                else if( bacResult < 0.08  && bacResult >=0.03){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult >= 0.08 && bacResult <= 0.16){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }

        }
        else{
            if(weight < 100){
                if(bacResult <.05){
                    message = 'Safe to Drive.';
                }
                else if( bacResult <.10 && bacResult >= .05){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult < .30 && bacResult >=.10 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 100 && weight < 120){
                if(bacResult <.05){
                    message = 'Safe to Drive.';
                }
                else if( bacResult <.09 && bacResult >= .05){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult < .32 && bacResult >= 0.09 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 120 && weight < 140){
                if(bacResult <.04){
                    message = 'Safe to Drive.';
                }
                else if( bacResult <.08 && bacResult >= .04){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult < .30 && bacResult >= .08 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 140 && weight < 160){
                if(bacResult <.07){
                    message = 'Safe to Drive.';
                }
                else if( bacResult <.10 && bacResult >= .07){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult < .32 && bacResult >=.10 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 160 && weight < 180){
                if(bacResult <.06){
                    message = 'Safe to Drive.';
                }
                else if( bacResult <.09 && bacResult >= .06){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult <= .28 && bacResult >= .09 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 180 && weight < 200){
                if(bacResult <.05){
                    message = 'Safe to Drive.';
                }
                else if( bacResult < .08 && bacResult >= .05){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult <= .25 && bacResult >= .08 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 200 && weight < 220){
                if(bacResult <.05){
                    message = 'Safe to Drive.';
                }
                else if( bacResult <.09 && bacResult >= .05){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult <= .23 && bacResult >= .09 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 220 && weight < 240){
                if(bacResult <.04){
                    message = 'Safe to Drive.';
                }
                else if( bacResult <.08 && bacResult >= .04){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult <= .21 && bacResult >= .08 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
            if(weight >= 240){
                if(bacResult <.04){
                    message = 'Safe to Drive.';
                }
                else if( bacResult <.08 && bacResult >= .04){
                    message = 'Driving Skills Affected. Possible Criminal Penalties.';
                }
                else if(bacResult <= .19 && bacResult >= .08 ){
                    message = 'Legally Intoxicated. Criminal Penalties.';
                }
                else{
                    message = 'Death Possible.';
                }
            }
        }

        //pick icons:
        switch (message){
            case 'Safe to Drive.':
                src = 'resources/icons/myIcons/ok-icon-72.png';
                break;
            case 'Driving Skills Affected. Possible Criminal Penalties.':
                src = 'resources/icons/myIcons/Warning-icon-yellow-72.png';
                break;
            case 'Legally Intoxicated. Criminal Penalties.':
                src = 'resources/icons/myIcons/Status-dialog-warning-orange-72.png';
                break;
            default:
                src = 'resources/icons/myIcons/Dialog-warning-red-72.png';
        }


        //Update BAC result and message to BAC Result popup:
        if(bacPopup){  //in case if the about is already created
        }
        else{
            bacPopup = Ext.create('SipSip.view.util.popups.BACResult');
            Ext.Viewport.add(bacPopup);

        }
        var image = me.getIconPopup();

        image.setSrc(src);   //update source for the icon.
        var messagePopup = me.getMessage();
        var tpl = new Ext.XTemplate(
            '<tpl>',
            '<p>',
            '<b>BAC % = {bacResult}</b><br>',
            '{message}',
            '</p>',
            '</tpl>'

        );
        var jsonObject = {
            'bacResult': bacResult,
            'message': message
        };
        messagePopup.updateHtml(tpl.applyTemplate(jsonObject));
        bacPopup.show();

    },
    backToMenu: function(){ //back to the menu page
        var me = this;
        var main = me.getMain();
        var bacPage = me.getBacPage();
        var menuPage = me.getMenuPage();

        main.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });


        bacPage.hide();
        menuPage.show();
        main.show();
    },
    /**
     * Reset weight and duration to empty fields.
     * Reset type of alcohol to beer.
     * Reset consumed to 1.
     */
    resetFields: function(){
        var me = this;

        //reset weightField:
        var weightField = me.getWeightField();
        weightField.setValue('');

        //reset duration:
        var durationField = me.getDurationField();
        durationField.setValue('');

        //reset consumed field:
        var consumedField = me.getConsumedField();
        consumedField.setValue(1);
    }


})
