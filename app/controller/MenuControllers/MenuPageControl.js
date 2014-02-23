/**
 * Created with JetBrains PhpStorm.
 * Date: 4/18/13
 * Time: 11:42 PM
 */
var flag;  // To keep track of quick search and wine journal: 0 = Quick Search; 1 = Wine Journal
var usingAddWinePage;  //To keep track of Add Wine being used: 0 = not using; 1 = using

Ext.define('SipSip.controller.MenuControllers.MenuPageControl',{ //control the menu page
    extend: 'Ext.app.Controller',
    requires: ['Ext.data.TreeStore'],
    config:{
        stores: ['UserProfileStore'],

        refs:{
            menuPage:    '#menu-id',
            aboutPage:   '#about-id',
            quickSearch:    '#quickSearchResult-id',
            bacPage: '#bacPage-id',
            main: '#mainPage-id',
            winerySearch: '#WinerySearch-id',
            wineJournalButton: '#Main-wineJournalButton-id',
            wineJournal: '#wineJournal-id',
            addWine: '#addWineCarousel_id',
            wineryList: '#wineryList_id',
            wineryListBackButton: '#wineryList_backButton',
            wineryListToolbar: '#wineryList_titleBar_id'
        },
        control:
        {
            "searchfield[action=menuPageSearchFiled]": {
                action: 'onSearchQueryChanged',
                clearicontap: 'onSearchReset'
            },

            //Sam's About Page
            "button[action=Main-aboutUsButton-id]": {
                tap: 'launchAboutUsPage'
            },
            "button[action=About-close-id]": {
                tap: 'closeAboutUsPopup'
            },
            //end Sam's
            "button[action=Main-bacCalculatorButton-id]": {
                tap: 'showBAC'
            },
            "button[action=Main-winerySearchButton-id]": {
                tap: 'showWinerySearch'
            },
            "button[action=Menu-addWineButton-id]": {
                tap: 'showAddWine'
            },
            "button[action=Main_wineJournalButton]": {
                tap: 'showWineJournal'
            },
            "button[action=Main_WinePictureButton]": {
                tap: 'winePicture'
            }
        }
    },

    winePicture: function(){
        Ext.Msg.alert('Under Development');
    },
    showAddWine: function(){//Show Add Wine Page:
        usingAddWinePage = 1;
        var me = this;
        var main = me.getMain();
        var addWine = me.getAddWine();
        if(addWine){  //in case if the winery is already created
        }
        else{
            addWine = Ext.create('SipSip.view.AddWinePages.AddWine');
            Ext.Viewport.add(addWine);
        }
        addWine.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });
        main.setHideAnimation({
            type :'slide',direction : 'left', out: true, duration: 260
        });
        main.hide();
        addWine.show();
    },

    /**
     * Show WineJournal Page
     */
    showWineJournal: function(){
        var me = this;
        flag = 1;
        var wineJournal = me.getWineJournal();
        var main = me.getMain();

        main.setHideAnimation({
            type :'slide',direction : 'left', out: true,duration: 260
        });


        //me.getMenuPage().hide;


        if(wineJournal){}  //in case if the journal is already created
        else{
            wineJournal = Ext.create('SipSip.view.WineJournalPages.WineJournal');
            Ext.Viewport.add(wineJournal);

        }
        wineJournal.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });




        main.hide();
        wineJournal.show();
    },

    //Allen and Mandeep:
    showWinerySearch: function(){
        flag = 2;
        var me = this;
        var winery = me.getWinerySearch();
        //me.getMenuPage().hide;
        var main = me.getMain();

        if(winery){  //in case if the winery is already created
        }
        else{
            winery = Ext.create('SipSip.view.WineryPages.WinerySearchPage');
            Ext.Viewport.add(winery);

        }
        winery.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });
        main.setHideAnimation({
            type :'slide',direction : 'left', out: true, duration: 260
        });
        main.hide();
        winery.show();
    },

    //Alex and Khoa:
    showBAC: function(){
        var me = this;
        me.getMain().hide();
        var bacPage = me.getBacPage();

        if(bacPage){  //in case if the about is already created
            bacPage.show();
        }
        else{
            bacPage = Ext.create('SipSip.view.BACPage');
            Ext.Viewport.add(bacPage);
            bacPage.show();
        }
    },



    //Sam's About Page
    closeAboutUsPopup: function(){
        var me = this;
        me.getAboutPage().hide();
    },

    launchAboutUsPage: function(){
        var me = this;
        var aboutPopup = me.getAboutPage();
        if(aboutPopup){  //in case if the about is already created
            aboutPopup.show();
        }
        else{
            aboutPopup = Ext.create('SipSip.view.util.popups.About');
            Ext.Viewport.add(aboutPopup);
            aboutPopup.show();
        }
    },
    //end Sam's

    onSearchQueryChanged: function(field){
        var me = this;
        flag = 0;
        var menuPage = me.getMenuPage();
        var quickSearchResult = me.getQuickSearch();
        if(quickSearchResult){
            quickSearchResult.destroy();
        }
        if(usingAddWinePage == 1){ //hide Add Wine Page instead of Menu Page.
            menuPage = Ext.getCmp('addWineCarousel_id');
        }


        var searchKey = field._value;
        if(searchKey){  //only search if input is valid
            var mask = {masked: {
                xtype: 'loadmask',
                message: 'Searching for Wine'
            }};
            menuPage.setConfig(mask);
            menuPage.setMasked(true);
            var nestedListData = [];
            Ext.getStore('quickSearchResultStore').getProxy().setExtraParams({wineName:searchKey});
            var store = Ext.getStore('quickSearchResultStore');

            store.load({
                callback: function(records, operation) {
                    if(records.length > 0){
                        for(var i = 0; i < records.length; i++){
                            nestedListData.push({text : records[i].data.text + " " + records[i].data.year, id:records[i].data.id, year:records[i].data.year, leaf: true });
                        }
                        var resultStore = Ext.create('Ext.data.TreeStore', {
                            model: 'SipSip.model.quickSearchResultModel',
                            defaultRootProperty: 'text',
                            root: {text : nestedListData}
                        });

                        quickSearchResult = Ext.create('SipSip.view.quickSearchResult');
                        //if(quickSearchResult){}
                        //else{
                            if(usingAddWinePage != 1){ // no need for search bar if in Add Wine Page.

                                quickSearchResult.add({

                                    docked: 'top',
                                    xtype: 'fieldset',
                                    margin: '5 3 5 3',
                                    id: 'quickSearchResultPage_SearchFiled_id',
                                    items:[{
                                        xtype: 'searchfield',
                                        autoComplete: true,
                                        autoDestroy: true,
                                        placeHolder: 'Enter Wine Name',
                                        action: 'quickSearchResultPage_SearchFiled'
                                    }]
                                });
                            }
                        //}
                        Ext.Viewport.add(quickSearchResult);
                        quickSearchResult.setStore(resultStore);

                        menuPage.setMasked(false);
                        var main = me.getMain();
                        main.setHideAnimation({
                            type :'pop'
                        });
                        quickSearchResult.setShowAnimation({
                            type :'flip'
                        });

                        if(usingAddWinePage == 1){ //Change Quick Search to Wine Search + change back button title to AddWine
                            quickSearchResult.getToolbar().setTitle('Wine Search');
                            Ext.getCmp('quickSearchResult-backButton-id').setText('Add Wine');
                        }
                        else{
                            quickSearchResult.getToolbar().setTitle('Quick Search');
                        }

                        quickSearchResult.show();
                        main.hide();
                    }
                    else{
                        menuPage.setMasked(false);
                        Ext.Msg.alert('No Result');
                        return;
                    }


                }
            });//end loading
        }

    },
    onSearchReset: function(field){  //empty the searchfield
        field.reset();
    }
})
