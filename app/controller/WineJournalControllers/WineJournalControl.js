/**
 * Created with JetBrains PhpStorm.
 * Date: 5/20/13
 * Time: 1:11 AM
 */
var choice;  //0 - fav; 1 - tried; 2 - toTry
var wineryOption; //0 - fav; 1 - visited; 2 - toVisit
Ext.define('SipSip.controller.WineJournalControllers.WineJournalControl',{
    extend: 'Ext.app.Controller',
    //requires: ['Ext.data.TreeStore'],
    config:{
        //stores: ['UserProfileStore'],

        refs:{
            main: '#mainPage-id',
            wineJournal: '#wineJournal-id',
            menuPage:    '#menu-id',
            wineList:  '#wineList-id',
            listTitle: '#wineListTitle_id',
            wineryList: '#journal_wineryList_id',
            wineryListTitle: '#journal_wineryList_titleBar_id'
        },
        control:
        {
            "button[action=winejournal-backButton]": {
                tap: 'backToMain'
            },
            "button[action=journal-favWineButton]": {
                tap: 'showFavWines'
            },
            "button[action=journal-toTryButton]": {
                tap: 'showToTryWines'
            },
            "button[action=journal-triedButton]": {
                tap: 'showTriedWines'
            },
            "button[action=journal_favWineryButton_id]": {
                tap: 'showFavWinery'
            },
            "button[action=journal_toVisitButton_id]": {
                tap: 'showToVisit'
            },
            "button[action=journal_visitedButton_id]": {
                tap: 'showVisited'
            }
        }
    },
    showFavWinery: function(){
        flag = 3;
        wineryOption = 0;
        var me = this;
        //getting username:
        var userStore = Ext.getStore('UserProfileStore');
        var userData = userStore.getData();
        var userName = userData.items[0].data.username;


        var journal = me.getWineJournal();
        var wineryList = me.getWineryList();
        if(wineryList){}
        else{
            wineryList = Ext.create('SipSip.view.WineJournalPages.JournalWineryList');
            Ext.Viewport.add(wineryList);
        }


        journal.setHideAnimation({
            type :'slide',direction : 'left', duration: 260, out: true
        });
        wineryList.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });

        me.getWineryListTitle().setTitle('Favorite Wineries');

        Ext.getStore('WineryJournalStore').getProxy().setExtraParams({username:userName, option: wineryOption});
        var store = Ext.getStore('WineryJournalStore');
        store.load({
            callback: function(records, operation, successful) {
                if(records){  //result = 0 ---> no result
                    if(records.length > 0){
                        journal.hide();
                        wineryList.show();
                    }
                    else{
                        Ext.Msg.alert('Your List is Empty');
                        return;
                    }
                }
                else{
                    Ext.Msg.alert('store load failed');
                }
            }
        });//end loading



    },
    showVisited: function(){
        var me = this;
        wineryOption = 1;
        flag = 3;

        //getting username:
        var userStore = Ext.getStore('UserProfileStore');
        var userData = userStore.getData();
        var userName = userData.items[0].data.username;


        var journal = me.getWineJournal();
        var wineryList = me.getWineryList();
        if(wineryList){}
        else{
            wineryList = Ext.create('SipSip.view.WineJournalPages.JournalWineryList');
            Ext.Viewport.add(wineryList);
        }


        journal.setHideAnimation({
            type :'slide',direction : 'left', duration: 260, out: true
        });
        wineryList.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });

        me.getWineryListTitle().setTitle('Visited Wineries');

        Ext.getStore('WineryJournalStore').getProxy().setExtraParams({username:userName, option: wineryOption});
        var store = Ext.getStore('WineryJournalStore');
        store.load({
            callback: function(records, operation, successful) {
                if(records){  //result = 0 ---> no result
                    if(records.length > 0){
                        journal.hide();
                        wineryList.show();
                    }
                    else{
                        Ext.Msg.alert('Your List is Empty');
                        return;
                    }
                }
                else{
                    Ext.Msg.alert('store load failed');
                }
            }
        });//end loading
    },
    showToVisit: function(){
        var me = this;
        wineryOption = 2;
        flag = 3;
        //getting username:
        var userStore = Ext.getStore('UserProfileStore');
        var userData = userStore.getData();
        var userName = userData.items[0].data.username;


        var journal = me.getWineJournal();
        var wineryList = me.getWineryList();
        if(wineryList){}
        else{
            wineryList = Ext.create('SipSip.view.WineJournalPages.JournalWineryList');
            Ext.Viewport.add(wineryList);
        }


        journal.setHideAnimation({
            type :'slide',direction : 'left', duration: 260, out: true
        });
        wineryList.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });

        me.getWineryListTitle().setTitle('ToVisit Wineries');

        Ext.getStore('WineryJournalStore').getProxy().setExtraParams({username:userName, option: wineryOption});
        var store = Ext.getStore('WineryJournalStore');
        store.load({
            callback: function(records, operation, successful) {
                if(records){  //result = 0 ---> no result
                    if(records.length > 0){
                        journal.hide();
                        wineryList.show();
                    }
                    else{
                        Ext.Msg.alert('Your List is Empty');
                        return;
                    }
                }
                else{
                    Ext.Msg.alert('store load failed');
                }
            }
        });//end loading
    },




    /**
     * Show List of Tried Wines:
     * choice: 0 - fav; 1 - tried; 2 - toTry
     */
    showTriedWines: function(){
        flag = 1;
        choice = 1;
        var me = this;
        //getting username:
        var userStore = Ext.getStore('UserProfileStore');
        var userData = userStore.getData();
        var userName = userData.items[0].data.username;
        var wineList = me.getWineList();
        var journal = me.getWineJournal();

        if(wineList){}  //in case if the winery is already created
        else{
            wineList = Ext.create('SipSip.view.WineJournalPages.WineList');
            Ext.Viewport.add(wineList);
        }

        //setting list title:
        me.getListTitle().setTitle('Tried Wines');

        journal.setHideAnimation({
            type :'slide',direction : 'left', duration: 260, out: true
        });
        wineList.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });
        Ext.getStore('WineJournalStore').getProxy().setExtraParams({username:userName, choice: 1});
        var store = Ext.getStore('WineJournalStore');
        store.load({
            callback: function(records, operation, successful) {
                if(records){  //result = 0 ---> no result
                    if(records.length > 0){

                        journal.hide();
                        wineList.show();
                    }
                    else{
                        Ext.Msg.alert('Your List is Empty');
                        return;
                    }
                }
                else{
                    console.log('store load failed');
                }
            }
        });//end loading



    },

    /**
     * Show List of ToTry Wines:
     * choice: 0 - fav; 1 - tried; 2 - toTry
     */
    showToTryWines: function(){
        flag = 1;
        choice = 2;
        var me = this;
        //getting username:
        var userStore = Ext.getStore('UserProfileStore');
        var userData = userStore.getData();
        var userName = userData.items[0].data.username;

        var wineList = me.getWineList();
        var journal = me.getWineJournal();

        if(wineList){}  //in case if the winery is already created
        else{
            wineList = Ext.create('SipSip.view.WineJournalPages.WineList');
            Ext.Viewport.add(wineList);
        }

        //setting list title:
        me.getListTitle().setTitle('Wines to Try');

        journal.setHideAnimation({
            type :'slide',direction : 'left', duration: 260, out: true
        });
        wineList.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });
        Ext.getStore('WineJournalStore').getProxy().setExtraParams({username:userName, choice: 2});
        var store = Ext.getStore('WineJournalStore');
        store.load({
            callback: function(records, operation, successful) {
                if(records){  //result = 0 ---> no result
                    if(records.length > 0){
                        journal.hide();
                        wineList.show();
                    }
                    else{
                        Ext.Msg.alert('Your List is Empty');
                        return;
                    }
                }
                else{
                    console.log('store load failed');
                }
            }
        });//end loading


    },
    /**
     * Show List of Favorite Wines:
     * choice: 0 - fav; 1 - tried; 2 - toTry
     */
    showFavWines: function(){
        flag = 1;
        choice = 0;
        var me = this;
        //getting username:
        var userStore = Ext.getStore('UserProfileStore');
        var userData = userStore.getData();
        var userName = userData.items[0].data.username;
        var wineList = me.getWineList();
        var journal = me.getWineJournal();

        if(wineList){}  //in case if the winery is already created
        else{
            wineList = Ext.create('SipSip.view.WineJournalPages.WineList');
            Ext.Viewport.add(wineList);
        }

        //setting list title:
        me.getListTitle().setTitle('Favorite Wines');

        journal.setHideAnimation({
            type :'slide',direction : 'left', duration: 260, out: true
        });
        wineList.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });
        Ext.getStore('WineJournalStore').getProxy().setExtraParams({username:userName, choice: 0});
        var store = Ext.getStore('WineJournalStore');
        store.load({
            callback: function(records, operation, successful) {
                if(records){  //result = 0 ---> no result
                    if(records.length > 0){
                        journal.hide();
                        wineList.show();
                    }
                    else{
                        Ext.Msg.alert('Your List is Empty');
                        return;
                    }
                }
                else{
                    console.log('store load failed');
                }
            }
        });//end loading



    },

    backToMain: function(){
        var me = this;
        var main = me.getMain();
        var journal = me.getWineJournal();
        var menuPage = me.getMenuPage();

        main.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });

        journal.setHideAnimation({
            type :'slide',direction : 'right', duration: 260, out: true
        });


        journal.hide();
        menuPage.show();
        main.show();
    }
})
