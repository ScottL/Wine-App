/**
 * Created with JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 3:58 AM
 */
Ext.define('SipSip.controller.PopupControllers.EditWineController',{
    extend: 'Ext.app.Controller',

    config:{
        refs:{
            infoForm: '#editWineInfoForm_id',
            wineInfoPopup: '#wineInfoPopup_id',
            infoTemplate: '#journal-template-id'
        },
        control: {
            "button[action=editWineInfo_addButton]": {
                tap: 'updateWineInfo'
            },
            "button[action=editWineInfo_resetButton]": {
                tap: 'resetForm'
            }
        }
    },

    /**
     * Change back to the original values
     */
    resetForm: function(){
        var me = this;
        var infoForm = me.getInfoForm();
        var store = Ext.getStore('WineInfoStore');
        var data = store.getData();

        infoForm.setValues({
            wineName: data.items[0].data.name,
            picture: data.items[0].data.picture,
            winery: data.items[0].data.winery,
            varietal: data.items[0].data.varietal,
            vintage:  data.items[0].data.vintage,
            releasePrice:  data.items[0].data.releasePrice,
            casesMade:  data.items[0].data.casesMade,
            type:   data.items[0].data.varietalType,
            enthusiast:   data.items[0].data.wineEnthusiastScore,
            spectator:  data.items[0].data.wineSpectatorScore,
            advocate:  data.items[0].data.wineAdvocateScore,
            sweetness:  data.items[0].data.sweetness,
            boldness:  data.items[0].data.boldness
        });
    },

    updateWineInfo: function(){
        var me = this;
        var form = me.getInfoForm();
        var data = form.getValues();
        //console.log('data = ', data);
        var store = Ext.getStore('WineInfoStore');
        var wineData = store.getData();
        var wineId = wineData.items[0].data.wineId;
        data['wineid'] = wineId;
        //updating:
        Ext.Ajax.request({
            //url: 'server/customize/updateCustomWineInfo.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/customize/updateCustomWineInfo.php',
            url: 'http://localhost/~huypham612/SipSip/server/customize/updateCustomWineInfo.php',
            params: data,

            success: function(response){
                Ext.Msg.alert(response.responseText);


                //Update picture:
//                var src = record.data.picture;
//                var picture = me.getInfoPicture();
//                if(src){ //update picture
//                    picture.setSrc(src);
//                    picture.show();
//                }else{
//                    picture.setSrc('');
//                    picture.hide();
//                }

                data['varietalType'] = data.type;
                data['wineEnthusiastScore'] = data.enthusiast;
                data['wineSpectatorScore'] = data.spectator;
                data['wineAdvocateScore'] = data.advocate;
                data['name'] = data.wineName;

                me.getInfoTemplate().setData(data);   //update info template
                me.getApplication().getController('WineJournalControllers.FavoriteWineControl').updateWineList(choice);
            },

            failure : function(response) {
                Ext.Msg.alert("Info Update Failed");
            }
        });
        me.getWineInfoPopup().hide();
    }
})
