/**
 * Created with JetBrains PhpStorm.
 * Date: 5/19/13
 * Time: 1:46 AM
 */
Ext.define('SipSip.controller.PopupControllers.WineJournalOptionsController',{
    extend: 'Ext.app.Controller',

    config:{
        refs:{
            wineToTried: '#option-wineToTried-id',
            wineTried: '#option-wineTried-id',
            wineOptionPopup: '#wineJournalOption-id',
            userInfo:     '#userProfile-info-id',
            removeWine: '#option-remove-id'
        },
        control: {
            "button[action=option_toTry]": {
                tap: 'wineToTried'
            },
            "button[action=option_tried]": {
                tap: 'wineTried'
            },
            "button[action=option_remove]": {
                tap: 'confirm'
            }
        }
    },

    /**
     * Show confirmation message. Call removeWine() if answered YES.
     */
    confirm: function(){
        var me = this;
        me.getWineOptionPopup().hide();
        Ext.Msg.confirm("Confirmation", "Remove Item From Journal?", function ( answer ) {
            if ( answer == 'yes') {
                me.removeWine();
            }
            else {
            }
        });
    },

    /**
     * Remove wine from winejournal.
     */
    removeWine: function(){
        var me = this;
        var userStore = Ext.getStore('UserProfileStore').getData();
        var username = userStore.items[0].data.username;
        var param = {};
        if(flag != 3){
            var wineStore = Ext.getStore('WineInfoStore').getData();
            var wineData = wineStore.items[0].data;
            var wineid = wineData.wineId;
            param = {'username': username, 'wineid': wineid};
        }else{ //Winery Journal
            var wineryStore = Ext.getStore('WineryInfoStore').getData();
            var wineryData = wineryStore.items[0].data;
            param = {'username': username, 'iwineid': wineryData.iwineId, 'winery_mode':1};
        }



        Ext.Ajax.request({
            //url: 'server/journal/resetTriedAndToTryList.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/journal/resetTriedAndToTryList.php',
            url: 'http://localhost/~huypham612/SipSip/server/journal/resetTriedAndToTryList.php',
            params: param,

            success: function(response){
                var res= response.responseText;
                me.getApplication().getController('MenuControllers.quickSearchResultControl').updateUserInfo(username);
                me.getWineOptionPopup().hide();
                Ext.Msg.alert(res);
            },
            failure : function(response) {
                me.getWineOptionPopup().hide();
                Ext.Msg.alert('Favorite Wine Failed');
            }
        });
        if(flag != 3){
            me.getApplication().getController('WineJournalControllers.FavoriteWineControl').updateWineList(choice);
        }
        else{
            Ext.getStore('WineryJournalStore').load();   //update wine list!
        }
    },

    /**
     * Add wine to wineToTried list and add wine info to wines database.
     * Update User Info.
     */
    wineToTried: function(){

        var me = this;
        var userStore = Ext.getStore('UserProfileStore').getData();
        var username = userStore.items[0].data.username;
        var param = {};
        if(flag != 2 && flag !=3){
            var wineStore = Ext.getStore('WineInfoStore').getData();
            var wineData = wineStore.items[0].data;
            var iwineId = wineData.iwineId;

             param = {'iwineId':iwineId, 'username': username, 'tried':0,
                'winery' :      wineData.winery,
                'varietal' :    wineData.varietal,
                'varietalType': wineData.varietalType,
                'vintage' :           wineData.vintage,
                'releasePrice' :     wineData.releasePrice.replace("$",''),
                'casesMade'  :        wineData.casesMade,
                'wineEnthusiastScore':wineData.wineEnthusiastScore,
                'wineSpectatorScore' :wineData.wineSpectatorScore,
                'wineAdvocateScore' : wineData.wineAdvocateScore,
                'picture'  :          wineData.picture,
                'wineName' : wineName
            };
            if(flag == 1){  //wine journal
                param['wineid'] = wineData.wineId;
                param['boldness'] = wineData.boldness;
                param['sweetness'] = wineData.sweetness;
            }
        }
        if(flag == 2 || flag == 3){ //Add Winery
            var wineryStore = Ext.getStore('WineryInfoStore').getData();
            var wineryData = wineryStore.items[0].data;
            var iwineId = wineryData.iwineId;

            param = {
                'iwineId':iwineId, 'username': username, 'tried':0 , 'winery_mode': 1,
                'address' :      wineryData.address,
                'city' :    wineryData.city,
                'state': wineryData.state,
                'zipCode' :           wineryData.zipCode,
                'country' :     wineryData.country,
                'phone'  :        wineryData.phone,
                'fax':wineryData.fax,
                'website' :wineryData.website,
                'email' : wineryData.email,
                'owners'  :          wineryData.owners,
                'wineMakers' : wineryData.wineMakers,
                'varietalsGrown' : wineryData.varietalsGrown,
                'picture' : wineryData.picture,
                'name': wineryData.name,
                'businessHours': wineryData.businessHours
            };
        }


        Ext.Ajax.request({
            //url: 'server/wine/wineJournal.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/wine/wineJournal.php',
            url: 'http://localhost/~huypham612/SipSip/server/wine/wineJournal.php',
            params: param,

            success: function(response){
                var res= response.responseText;
                //me.updateUserInfo(username);     //update favorites in user info page.
                me.getApplication().getController('MenuControllers.quickSearchResultControl').updateUserInfo(username);
                Ext.Msg.alert(res);
            },
            failure : function(response) {
                Ext.Msg.alert('Favorite Wine Failed');
            }
        });
        me.getWineOptionPopup().hide();

        if(flag != 2 && flag !=3){  // Update Wine List in Wine Journal
            me.getApplication().getController('WineJournalControllers.FavoriteWineControl').updateWineList(choice);
        }
        if(flag == 3){
            Ext.getStore('WineryJournalStore').load();   //update wine list!
        }
    },

    /**
     * Add to WineTried list.
     * Update User Info.
     */
    wineTried: function(){
        var me = this;
        var userStore = Ext.getStore('UserProfileStore').getData();
        var username = userStore.items[0].data.username;

        var param = {};
        if(flag != 2 && flag !=3){
            var wineStore = Ext.getStore('WineInfoStore').getData();
            var wineData = wineStore.items[0].data;
            var iwineId = wineData.iwineId;

            param = {'iwineId':iwineId, 'username': username, 'tried':1,
                'winery' :      wineData.winery,
                'varietal' :    wineData.varietal,
                'varietalType': wineData.varietalType,
                'vintage' :           wineData.vintage,
                'releasePrice' :     wineData.releasePrice.replace("$",''),
                'casesMade'  :        wineData.casesMade,
                'wineEnthusiastScore':wineData.wineEnthusiastScore,
                'wineSpectatorScore' :wineData.wineSpectatorScore,
                'wineAdvocateScore' : wineData.wineAdvocateScore,
                'picture'  :          wineData.picture,
                'wineName' : wineName
            };
            if(flag == 1){  //wine journal
                param['wineid'] = wineData.wineId;
                param['boldness'] = wineData.boldness;
                param['sweetness'] = wineData.sweetness;
            }
        }
        if(flag == 2 || flag ==3){ //Add Winery
            var wineryStore = Ext.getStore('WineryInfoStore').getData();
            var wineryData = wineryStore.items[0].data;
            var iwineId = wineryData.iwineId;

            param = {
                'iwineId':iwineId, 'username': username, 'tried':1 , 'winery_mode': 1,
                'address' :      wineryData.address,
                'city' :    wineryData.city,
                'state': wineryData.state,
                'zipCode' :           wineryData.zipCode,
                'country' :     wineryData.country,
                'phone'  :        wineryData.phone,
                'fax':wineryData.fax,
                'website' :wineryData.website,
                'email' : wineryData.email,
                'owners'  :          wineryData.owners,
                'wineMakers' : wineryData.wineMakers,
                'varietalsGrown' : wineryData.varietalsGrown,
                'picture' : wineryData.picture,
                'name': wineryData.name,
                'businessHours': wineryData.businessHours
            };
        }
        Ext.Ajax.request({
            //url: 'server/wine/wineJournal.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/wine/wineJournal.php',
            url: 'http://localhost/~huypham612/SipSip/server/wine/wineJournal.php',
            params: param,

            success: function(response){
                var res= response.responseText;
                //me.updateUserInfo(username);     //update favorites in user info page.
                me.getApplication().getController('MenuControllers.quickSearchResultControl').updateUserInfo(username);
                Ext.Msg.alert(res);
            },
            failure : function(response) {
                Ext.Msg.alert('Favorite Wine Failed');
            }
        });
        me.getWineOptionPopup().hide();
        if(flag != 2 && flag !=3){  // Update Wine List in Wine Journal
            me.getApplication().getController('WineJournalControllers.FavoriteWineControl').updateWineList(choice);
        }
        if(flag == 3){
            Ext.getStore('WineryJournalStore').load();   //update wine list!
        }
    }

})
