/**
 * Created with JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 10:37 PM
 */
Ext.define('SipSip.controller.AddWineryControllers.WineryListControl',{
    extend: 'Ext.app.Controller',

    config:{
        refs:{
            wineryList: '#wineryList_id',
            WinerySearchPage: '#WinerySearch-id',
            wineryInfo: '#wineryInfo_id',
            infoTemplate: '#winery_template_id',
            favButton: '#winery_FavoriteButton_id',
            reviewButton: '#winery_ReviewButton_id'


        },

        control: {
            "button[action=wineryList_backButton]": {
                tap: 'backToSearch'
            },
            "button[action=wineryInfo_backButton]": {
                tap: 'backToList'
            },
            "button[action=winery_FavoriteButton]": {
                tap: 'favoriteWine'
            },
            "button[action=winery_addJournal]": {
                tap: 'showListOptionPopup'
            },
            "button[action=winery_ReviewButton]": {
                tap: 'showReviewBox'
            },
            "button[action=wineryPreview]": {
                tap: 'showPreview'
            },
            "list[id=wineryList_id]": {
                itemtap: 'showWineryInfo'
            }

        }
    },
    showPreview: function(){
        this.getApplication().getController('MenuControllers.quickSearchResultControl').showPreview();
    },
    showReviewBox: function(){
        this.getApplication().getController('MenuControllers.quickSearchResultControl').showReviewField(flag);
    },
    showListOptionPopup: function(){
        choice = 0;
        this.getApplication().getController('MenuControllers.quickSearchResultControl').showOptionPopup();
    },
    /**
     * Change favorite button icon. Add/update wine to favorite list. Update user info page.
     */

    favoriteWine: function(){
        var me = this;
        var favButton = me.getFavButton();

        //getting username and iwineId:
        var userStore = Ext.getStore('UserProfileStore').getData();
        var username = userStore.items[0].data.username;

        var wineryStore = Ext.getStore('WineryInfoStore').getData();
        if(flag == 3){
            wineryStore = Ext.getStore('WineryJournalStore').getData();
        }
        var wineryData = wineryStore.items[0].data;
        var iwineId = wineryData.iwineId;
        //console.log('data',wineryData);

        var param = {
            'iwineId':iwineId, 'username': username, 'checking': 0 , 'winery_mode': 1,
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

        if(favButton.getIconCls() === 'star'){ //add to favorite list:
            favButton.setIconCls('yellowStar');
            if(flag == 1){ //need bigger star for wine journal
                favButton.setIconCls('yellowStar_bigger');
            }
        }
        else{
            favButton.setIconCls('star');
        }
        Ext.Ajax.request({
            //url: 'server/wine/favoriteWine.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/wine/favoriteWine.php',
            url: 'http://localhost/~huypham612/SipSip/server/wine/favoriteWine.php',
            params: param,
            success: function(response){
                var res= response.responseText;
                me.getApplication().getController('MenuControllers.quickSearchResultControl').updateUserInfo(username);     //update favorites in user info page.
                Ext.getStore('WineryJournalStore').load();   //update wine list!
                Ext.Msg.alert(res);

            },
            failure : function(response) {
                Ext.Msg.alert('Favorite Winery Failed');
            }
        });

    },
    showWineryInfo: function(item, index, target, record, e, eOpts){
        var me = this;
        var list = me.getWineryList();
        var infoPage = me.getWineryInfo();
        var wineryAddress = record.data;
        if(infoPage){}
        else{
            infoPage = Ext.create('SipSip.view.WineryPages.WineryInfo');
            Ext.Viewport.add(infoPage);
        }
        var mask = {masked: {
            xtype: 'loadmask',
            message: 'Loading Winery Info'
        }};


        infoPage.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });
        list.setHideAnimation({
            type :'slide',direction : 'left', out: true, duration: 260
        });

        var picture = Ext.getCmp('winery_picture_id');

        var store = Ext.getStore('WineryInfoStore');

        store.getProxy().setExtraParams({wineryId:record.data.iwineId});

        list.setConfig(mask);
        list.setMasked(true);
        store.load({
            callback: function(records, operation, successful) {
                if(records){
                    var info = Ext.apply(records[0].data);
                    //console.log('info = ', info);
                    info['city'] = wineryAddress.city;
                    info['address'] = wineryAddress.address;
                    info['country'] = wineryAddress.country;
                    info['iwineId'] = wineryAddress.iwineId;
                    info['name'] = wineryAddress.name;
                    info['state'] = wineryAddress.state;
                    info['zipCode'] = wineryAddress.zipCode;
                    me.getInfoTemplate().setData(info);   //update info template

                    if(records[0].data.picture){ //when there is an image
                        picture.setSrc(records[0].data.picture.replace(/\\/g,""));
                        picture.setHidden(false);
                    }
                    else{
                        picture.setHidden(true);
                    }


                    list.setMasked(false);
                    list.hide();
                    infoPage.show();
                }
                else{
                    list.setMasked(false);
                    Ext.Msg.alert('Couldn\'t Gather Winery Info!');
                    return;
                }
            }
        });//end loading

        // set up reviews post on and review button's badge.
//        var store = Ext.getStore('UserProfileStore');
//        var data = store.getData();
//        var newreview = me.getNewReview();
//        newreview.setPlaceHolder(data.items[0].data.username + ' says: ');
        me.getApplication().getController('MenuControllers.quickSearchResultControl').setUpReviews(record.data.iwineId, flag);
        me.getApplication().getController('MenuControllers.quickSearchResultControl').setUpFavorite(record.data.iwineId);


    },
    backToList: function(){
        var me = this;
        var  list = me.getWineryList();
        var info = me.getWineryInfo();

        if(flag == 3){ //Winery Journal
            list = Ext.getCmp('journal_wineryList_id');
        }

        //me.getMenuPage().show();
        list.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });
        info.setHideAnimation({
            type :'slide',direction : 'right', out: true, duration: 260
        });

        info.hide();
        list.show();
    },
    backToSearch: function(){
        var me = this;
        var  list = me.getWineryList();
        var search = me.getWinerySearchPage();

        //me.getMenuPage().show();
        search.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });
        list.setHideAnimation({
            type :'slide',direction : 'right', out: true, duration: 260
        });
        search.show();
        list.hide();
    }
})
