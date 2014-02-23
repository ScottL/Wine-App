/**
 * Created with JetBrains PhpStorm.
 * Date: 5/1/13
 * Time: 4:34 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('SipSip.controller.AddWineryControllers.WinerySearchControl',{
    extend: 'Ext.app.Controller',

    config:{
        refs:{
            wineryList: '#wineryList_id',
            WinerySearchPage: '#WinerySearch-id',
            mainPage: '#mainPage-id',
            menuPage:    '#menu-id',
            wineryListToolbar: '#wineryList_titleBar_id',
            wineryListBackButton: '#wineryList_backButton'
        },

        control: {
            "button[action=WinerySearch-backButton-id]": {
                tap: 'backToMain'
            },
//            "button[action=WinerySearch-showResultsButton-id]": {
//                tap: 'showResults'
//                //tap: 'onMapRender'
//            },
//            "button[action=WineryResults-backButton-id]": {
//                tap: 'backToSearchPage'
//            },
            "searchfield[action=winery_search]": {
                action: 'onSearchQueryChanged'
            }
        }
    },

    /**
     * Show Search results after user enter winery name
     * @param field -- contains user's inputs.
     * Look at example from quickSearchResultControl.js
     */
    onSearchQueryChanged: function(field){
        var me = this;
        var searchKey = field._value;
        var winery = me.getWinerySearchPage();
        var wineryList = me.getWineryList();

        if(wineryList){

        }  //in case if the winery is already created
        else{
            wineryList = Ext.create('SipSip.view.WineryPages.WineryList');
            Ext.Viewport.add(wineryList);
        }

        var addWineryButton = Ext.getCmp('winery_addJournal_id');
        if(addWineryButton){
        	addWineryButton.setIconCls('add');
        	addWineryButton.setText('Journal');
        }
        

        if(searchKey){  //only search if input is valid
            var mask = {masked: {
                xtype: 'loadmask',
                message: 'Searching for Winery'
            }};
            winery.setConfig(mask);
            winery.setMasked(true);

            Ext.getStore('WinerySearchStore').getProxy().setExtraParams({wineryName:searchKey});
            var store = Ext.getStore('WinerySearchStore');

            store.load({
                callback: function(records, operation) {
                    //console.log('record ', records );
                    if(records.length > 0 && records[0].data.name){
                        winery.setMasked(false);
                        winery.setHideAnimation({
                            type :'slide',direction : 'left', duration: 260, out: true
                        });
                        wineryList.setShowAnimation({
                            type :'slide',direction : 'left', duration: 250
                        });
                        winery.setMasked(false);
                        winery.hide();
                        wineryList.show();
                    }
                    else{
                        winery.setMasked(false);
                        Ext.Msg.alert('No Result');
                        return;
                    }
                }
            });//end loading




        }
    },

    backToMain: function(){
        var me = this;
        var main = me.getMainPage();
        var winery = me.getWinerySearchPage();
        //me.getMenuPage().show();
        main.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });
        winery.setHideAnimation({
            type :'slide',direction : 'right', out: true, duration: 260
        });

        winery.hide();
        main.show();

//        //setting Winery List:
//        var wineryList = me.getWineryList();
//
//        if(wineryList){
//            wineryList.destroy();
//        }  //in case if the winery is already created

    }



    //Use this to get direction from Google (don't delete):

//        var directionsDisplay = new google.maps.DirectionsRenderer();
//        var directionsService = new google.maps.DirectionsService();
//        directionsDisplay.setMap(gmap.getMap());
//        //var tcmadd = "1600 Pennsylvania Ave, Washington, DC";
//        //var originadd = this.getAddfield().getValue();
//
//        var request = {
//            origin: "1600 Pennsylvania Ave, Washington, DC",
//            destination: "34567 Rancho California Rd, Temecula, CA",
//            travelMode: google.maps.TravelMode.DRIVING
//        };
//
//        directionsService.route(request, function(result, status){
//            console.log(status);
//            if(status = google.maps.DirectionsStatus.OK){
//                console.log(result);
//                directionsDisplay.setDirections(result);
//            }
//        });




})
