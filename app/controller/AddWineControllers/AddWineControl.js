/**
 * Created with JetBrains PhpStorm.
 * Date: 5/22/13
 * Time: 10:05 PM
 */
Ext.define('SipSip.controller.AddWineControllers.AddWineControl',{
    extend: 'Ext.app.Controller',
    //requires: ['Ext.Window'],
    config:{
        refs:{
            main: '#mainPage-id',
            addWine: '#addWineCarousel_id',
            infoForm: '#wineInfoForm_id',
            messageBox: '#messageBox_listOptions_id'

        },
        control: {
            "button[action=addWine-backButton]": {
                tap: 'backToMenu'
            },
            "button[action=addWineCarousel_addButton]": {
                tap: 'showCustomWinePopUp'
            },
            "button[action=addWineCarousel_resetButton]": {
                tap: 'resetInfoForm'
            },
            "searchfield[action=addWineCarousel_search]": {
                action: 'onSearchQueryChanged'
            }
        }
    },
    resetInfoForm: function(){
      this.getInfoForm().reset();
    },
    /**
     * Add Custom wine to wines table. And to WineJournal.
     * iwineid = -1
     */
    showCustomWinePopUp: function(){
        var me = this;
        var form = me.getInfoForm();
        var data = form.getValues();

        //Validating Form:
        if(data.wineName === ""){
            Ext.Msg.alert('Wine Name is Required!');
            return;
        }


        var msg = me.getMessageBox();
        if(msg){}
        else{
            msg = Ext.create('SipSip.view.util.popups.MessageBoxPopup');
            Ext.Viewport.add(msg);
        }
        msg.show();
    },

    /**
     * @param field - user's input - wine name
     */
    onSearchQueryChanged: function(field){
        this.getApplication().getController('MenuControllers.MenuPageControl').onSearchQueryChanged(field);
    },

    backToMenu: function(){
        usingAddWinePage = 0;
        var me = this;
        var main = me.getMain();
        var addWine = me.getAddWine();
        //var menuPage = me.getMenuPage();

        main.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });

        addWine.setHideAnimation({
            type :'slide',direction : 'right', duration: 260, out: true
        });


        addWine.hide();
        //menuPage.show();
        main.show();
    }
})
