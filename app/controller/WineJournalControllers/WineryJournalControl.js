/**
 * Created with JetBrains PhpStorm.
 * Date: 5/30/13
 * Time: 3:36 AM
 */
Ext.define('SipSip.controller.WineJournalControllers.WineryJournalControl',{
    extend: 'Ext.app.Controller',
    //requires: ['Ext.data.TreeStore'],
    config:{
        //stores: ['UserProfileStore'],

        refs:{
            wineJournal: '#wineJournal-id',
            wineryList: '#journal_wineryList_id',


            wineryInfo: '#wineryInfo_id',
            infoTemplate: '#winery_template_id'
        },
        control:
        {
            "button[action=journal_wineryList_backButton]": {
                tap: 'backToJournal'
            },
            "list[id=journal_wineryList_id]": {
                itemtap: 'showWineryInfo'
            }
        }
    },
    showWineryInfo: function(item, index, target, record, e, eOpts){
        var me = this;
        var list = me.getWineryList();
        var infoPage = me.getWineryInfo();
        //update WineryInfoStore to be used later in submitReview.
        Ext.getStore('WineryInfoStore').setData(record.data);
        if(infoPage){}
        else{
            infoPage = Ext.create('SipSip.view.WineryPages.WineryInfo');
            Ext.Viewport.add(infoPage);
        }
        var picture = Ext.getCmp('winery_picture_id');


        infoPage.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });
        list.setHideAnimation({
            type :'slide',direction : 'left', out: true, duration: 260
        });


        me.getInfoTemplate().setData(record.data);   //update info template

        if(record.data.picture){ //when there is an image
            picture.setSrc(record.data.picture.replace(/\\/g,""));
            picture.setHidden(false);
        }
        else{
            picture.setHidden(true);
        }
        me.getApplication().getController('MenuControllers.quickSearchResultControl').setUpReviews(record.data.iwineId, flag);
        me.getApplication().getController('MenuControllers.quickSearchResultControl').setUpFavorite(record.data.iwineId);


        var addWineryButton = Ext.getCmp('winery_addJournal_id');
        addWineryButton.setIconCls('settings');
        addWineryButton.setText('List');


        list.hide();
        infoPage.show();
    },
    backToJournal: function(){
        var me = this;
        var journal = me.getWineJournal();
        var list = me.getWineryList();
        //me.getMenuPage().show();
        journal.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });
        list.setHideAnimation({
            type :'slide',direction : 'right', out: true, duration: 260
        });

        list.hide();
        journal.show();
    }
})
