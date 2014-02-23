/**
 * Created with JetBrains PhpStorm.
 * Date: 5/26/13
 * Time: 4:13 AM
 */
Ext.define('SipSip.controller.PopupControllers.AddCustomWineOptions',{
    extend: 'Ext.app.Controller',

    config:{
        refs:{
            infoForm: '#wineInfoForm_id',
            messageBox: '#messageBox_listOptions_id'
        },
        control: {
            "button[action=FavoriteList]": {
                tap: 'favoriteWine'
            },
            "button[action=TriedList]": {
                tap: 'triedWine'
            },
            "button[action=ToTryList]": {
                tap: 'toTryWine'
            }
        }
    },

    favoriteWine: function(){
        this.addCustomWine(0);
    },
    triedWine: function(){
        this.addCustomWine(1);
    },
    toTryWine: function(){
        this.addCustomWine(2);
    },

    /**
     * Add wine to wines and winejournal table.
     * @param listOption - 0: favorite, 1: tried, 2:  toTry
     */
    addCustomWine: function(listOption){
        var me = this;
        var form = me.getInfoForm();
        var data = form.getValues();
        //getting username and iwineId:
        var userStore = Ext.getStore('UserProfileStore').getData();
        var username = userStore.items[0].data.username;
        var param = data;
        //param['listOption'] = listOption;

        switch (listOption){
            case 0:
                param['favorited'] = 1;
                break;
            case 1:
                param['tried'] = 1;
                param['totry'] = 0;
                break;
            default :
                param['tried'] = 0;
                param['totry'] = 1;
                break;
        }

        param['username'] = username;
        param['iwineid'] = -1;

        //uploading:
        Ext.Ajax.request({
            //url: 'server/customize/addCustomWine.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/customize/addCustomWine.php',
            url: 'http://localhost/~huypham612/SipSip/server/customize/addCustomWine.php',
            params: param,

            success: function(response){
                me.getApplication().getController('MenuControllers.quickSearchResultControl').updateUserInfo(username);
                me.getApplication().getController('AddWineControllers.AddWineControl').resetInfoForm();
                Ext.Msg.alert(response.responseText);

            },

            failure : function(response) {
                Ext.Msg.alert("Upload Failed");
            }
        });
        me.getMessageBox().hide();

    }


})
