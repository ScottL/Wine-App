/**
 * Created with JetBrains PhpStorm.
 * Date: 4/24/13
 * Time: 1:31 AM
 */
var wineName;
Ext.define('SipSip.controller.MenuControllers.quickSearchResultControl',{ //control the quick search result page
    extend: 'Ext.app.Controller',
    requires: ['Ext.data.TreeStore', 'Ext.Img','Ext.XTemplateCompiler'],
    config:{
        stores: ['UserProfileStore' , 'quickSearchResultStore', 'WineInfoStore'],

        refs:{
            menuPage:    '#menu-id',
            quickSearch:    '#quickSearchResult-id',
            main:   '#mainPage-id',
            picturePopup: {  //the image popup panel
                selector:   '#picturePopup-id',
                xtype:      'picturePopup'
                //autoCreate: true  //will create if formpanel does not exist!!!
            },
            imagePopup: '#popup-picture-id',  //the image inside the picturePopup panel
            winePicture: {
                selector: '#wineInfo-picture-id'
            },
            sortButton: '#sortButton-id',

            reviews: '#wineInfo-reviews-id',
            newReview: '#wineInfo-reviews-textfield-id',
            reviewSubmit: '#wineInfo-reviews-sumbitButton-id',

            buttonBox: '#wineInfo-reviews-hbox-id',
            wineInfoCarousel:  '#carouselCard-id',

            //preview:
            previewPopup: '#preview-id',
            previewReview: '#preview-review-id',
            previewSubmit: '#preview-sumbitButton-id',
            previewEdit: '#preview-EditButton-id',
            facebook: '#preview-facebookButton-id',
            //user tab
            userInfo:     '#userProfile-info-id',
            //wine info buttons:
            favButton: '#quickSearch_FavoriteButton',
            saveButton: '#quickSearch_SaveButton',
            reviewButton: '#quickSearch_ReviewButton',
            //wine option popup
            wineOptionPopup: '#wineJournalOption-id',
            removeWine: '#option-remove-id',
            toTryButton: '#option-wineToTried-id',
            triedButton: '#option-wineTried-id'

        },
        control:
        {

            "searchfield[action=quickSearchResultPage_SearchFiled]": {
                action: 'onSearchQueryChanged',
                clearicontap: 'onSearchReset'
            },
            "button[action=quickSearchResult-backButton]": {
                tap: 'showMenu'
            },
            "button[action=quickSearch_ReviewButton_tap]": {
                tap: 'showReviewField'
            },
            "button[action=quickSearch_FavoriteButton_action]": {
                tap: 'favoriteWine'
            },
            "button[action=quickSearch_SaveButton_action]": {
                tap: 'showOptionPopup'
            },
            "button[action=wineInfo-reviews-sumbitButton-action]": {
                tap: 'showPreview'
            },
            "button[action=preview_submit]": {
                tap: 'submitReview'
            },
            "button[action=previewFaceBook]": {
                tap: 'faceBookPosting'
            },
            "button[action=preview_edit]": {
                tap: 'closePopup'
            },
            "button[action=sortButton]": {
                tap: 'sortingQuickSearch'
            },
            "image[tap=winePicture_action]": {
                tap: 'showPopupPicture'
            },
            "quickSearchNestedList":{  //when user click back on the info page
                itemtap: 'showWineInfo',
                back:'showQuickSearchResult'
            }
        }
    },

    faceBookPosting: function(){
        Ext.Msg.alert('Under Development');
    },


    /**
     * Show popup choices: Wine to Try and Wine Tried.
     */
    showOptionPopup: function(){
        var me = this;
        var optionPopUp = me.getWineOptionPopup();

        if(optionPopUp){  //in case if the winery is already created
        }
        else{
            optionPopUp = Ext.create('SipSip.view.util.popups.WineJournalOptions');
            Ext.Viewport.add(optionPopUp);
        }

        if(flag == 1 && choice != 0){ // only allow remove from list when wine is in the journal and not on the favorite list.
            me.getRemoveWine().show();
        }
        else{
            me.getRemoveWine().hide();
        }


        if(flag == 2 || flag == 3){
            me.getTriedButton().setText('Visited');
            me.getToTryButton().setText('ToVisit');
        }
        else{
            me.getTriedButton().setText('Tried');
            me.getToTryButton().setText('ToTry');
        }

        if(flag == 3){ //allow user to remove winery from journal
            me.getRemoveWine().show();
        }



        optionPopUp.show();

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
        var wineStore = Ext.getStore('WineInfoStore').getData();
        var wineData = wineStore.items[0].data;
        var iwineId = wineData.iwineId;

        var param = {
                'iwineId':iwineId, 'username': username, 'checking': 0,
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
            favButton = Ext.getCmp('journal_FavoriteButton_id');
            param['wineid'] = wineData.wineId;
            param['boldness'] = wineData.boldness;
            param['sweetness'] = wineData.sweetness;

        }

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
                me.updateUserInfo(username);     //update favorites in user info page.

                Ext.Msg.alert(res);

            },
            failure : function(response) {
                Ext.Msg.alert('Favorite Wine Failed');
            }
        });

    },


    closePopup: function(){
        var me = this;
        me.getPreviewPopup().hide();
    },
    /*
     * Upload review to database. Update review button, and review page.
     * Hide the review box and button after uploaded.
     */
    showPreview: function(){
        var me = this;
        var reviewField = me.getNewReview();

        if(flag == 2 || flag ==3){ // Add Winery
            reviewField = Ext.getCmp('winery_reviews_textfield_id');
        }

        var review = reviewField._value;
        var previewPopup = me.getPreviewPopup();
        if(previewPopup){}  //already created
        else{
            previewPopup = Ext.create('SipSip.view.util.popups.Preview');
            Ext.Viewport.add(previewPopup);
        }
        var previewReview = me.getPreviewReview();
        if(review != ''){
            //show Preview first:
            previewReview.updateHtml(review);
            previewPopup.show();
        }
        else{
            Ext.Msg.alert("Review is empty");
        }

    },
    /**
     * flag : 1 - wine Journal;
     */
    submitReview: function(){
        var me = this;
        var reviewField = me.getNewReview();

        if(flag == 1){  // Wine Journal: Wines
            reviewField = Ext.getCmp('journal-reviews-textfield-id');
        }

        if(flag == 2 || flag == 3){ // Add Winery
            reviewField = Ext.getCmp('winery_reviews_textfield_id');
        }


        var review = reviewField._value;
        var param = {};
        //getting username and iwineId:
        var userStore = Ext.getStore('UserProfileStore').getData();
        var username = userStore.items[0].data.username;
        var iwineId = 0;
        if(flag != 2 && flag !=3){
            var wineStore = Ext.getStore('WineInfoStore').getData();
            iwineId = wineStore.items[0].data.iwineId;
            var wineId = wineStore.items[0].data.wineId;
            if(!wineId){
                wineId = -1;
            }
            param = {'iwineId': iwineId, 'username': username, 'review': review, 'wineId': wineId};
        }else{  // Add Winery
            var store = Ext.getStore('WineryInfoStore');
            var data = store.getData();
            iwineId = data.items[0].data.iwineId
            param = {'username': username, 'review': review, 'iwineId': data.items[0].data.iwineId, 'winery_mode': 1};
            //data.items[0].data.
        }
        //uploading:
        Ext.Ajax.request({
            //url: 'server/wine/uploadReview.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/wine/uploadReview.php',
            url: 'http://localhost/~huypham612/SipSip/server/wine/uploadReview.php',
            params: param,

            success: function(response){
                //Update badgeText for the reviews button:
                if(response.responseText === 'Insertion Success'){
                    me.setUpReviews(iwineId, flag);
                    me.showReviewField(flag);
                    me.closePopup();
                    me.updateUserInfo(username);
                    Ext.Msg.alert("Upload Success");

                }
                else{
                    Ext.Msg.alert("Upload Failed");
                }
            },

            failure : function(response) {
                Ext.Msg.alert("Upload Failed");
            }
        });

    },

    /**
     * Set up reviews post on and review button's badge.
     * @param iwineId
     * @param flag - 1: wine Journal
     */
    setUpReviews: function(iwineId, flag){
        var me = this;
        var reviewButton = me.getReviewButton();


        var reviews = me.getReviews();
        var param = {'iwineId':iwineId};


        if(flag == 1){  //wine journal
            reviewButton = Ext.getCmp('journal_ReviewButton-id');
            reviews = Ext.getCmp('journal-reviews-id');
            var wineStore = Ext.getStore('WineInfoStore').getData();
            var wineId = wineStore.items[0].data.wineId;
            param['wineId'] =  wineId;
        }

        if(flag == 2 || flag == 3){ // Add Winery
            reviewButton = Ext.getCmp('winery_ReviewButton_id');
            reviews = Ext.getCmp('winery_reviews_id');
            param['winery_mode'] = 1;
        }
//        if(flag ==1){
//
//
//        }

        var tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<p><b><i>{username}  {created}</i><b><br>    {review}</p>',
            '</tpl>'
        );


        Ext.Ajax.request({
            //url: 'server/wine/getReview.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/wine/getReview.php',
            url: 'http://localhost/~huypham612/SipSip/server/wine/getReview.php',
            params: param,

            success: function(response){
                var res= Ext.decode(response.responseText);
                if(res != null){
                    //Setting badgeText for the reviews button:
                    reviewButton.setBadgeText(res.length);
                    //set up reviews:
                    var info = Ext.apply(res);
                        if(flag == 0){
                        reviews.updateHtml(tpl.applyTemplate(info));
                    }
                    else{
                        reviews.setData(info);
                    }
                }
                else{ //set to 0 and reset review page:
                    reviewButton.setBadgeText('0');
                    reviews.updateHtml('Click on the Review button to write the 1st review.');
                }
            },

            failure : function(response) {
                //console.log(response.responseText);
            }
        });
    },

    /**
     * Show or hide review text area and button box.
     * Set the review card active.
     * @param flag - 1: wine Journal
     */
    showReviewField: function(flag){
        var me = this;
        var reviewBox = me.getNewReview();
        var buttonBox = me.getButtonBox();
        var carousel = me.getWineInfoCarousel();
        if(flag == 1){ //wine journal
            reviewBox = Ext.getCmp('journal-reviews-textfield-id');
            buttonBox = Ext.getCmp('journal-reviews-hbox-id');
            carousel = Ext.getCmp('journalWineInfo_Carousel-id');
        }

        if(flag == 2 || flag == 3){ //Add Winery
            reviewBox = Ext.getCmp('winery_reviews_textfield_id');
            buttonBox = Ext.getCmp('winery_reviews_hbox_id');
            carousel = Ext.getCmp('WineryInfo_Carousel_id');
        }

        if(!reviewBox.isHidden() || !buttonBox.isHidden()){
            reviewBox.hide();
            buttonBox.hide();
        }
        else{
            reviewBox.show();
            buttonBox.show();
        }
        carousel.doResetActiveItem(0);
    },

    sortingQuickSearch: function(button, e, eOpts){ //sort the result page from quick search.
        var me = this;
        var quickSearch = me.getQuickSearch();
        var store = quickSearch.getStore();
        if(button.getIconCls() === 'arrow_up'){  //sort by most current years.
            button.setIconCls('arrow_down');
            store.sort('year', 'ASC');
        }
        else{  //sort by older years.
            button.setIconCls('arrow_up');
            store.sort('year', 'DESC');
        }
    },
    showPopupPicture: function(pic, e, eOpts ){
        var me = this;
        var src = pic.getSrc();

        var popup = me.getPicturePopup();

        if(popup){}  //already created
        else{
            popup = Ext.create('SipSip.view.util.popups.picturePopup');
            Ext.Viewport.add(popup);
        }
        var image = me.getImagePopup();
        image.setSrc(src);
        popup.show();
    },
    showQuickSearchResult: function(view, node, lastActiveList, detailCardActive, eOpts ){
        var me = this;
        var quickSearch = me.getQuickSearch();
        quickSearch.setToolbar({ title:'Quick Search'});
        me.getSortButton().show();
        Ext.getCmp('quickSearchResult-backButton-id').show();
        if(usingAddWinePage != 1){
            Ext.getCmp('quickSearchResultPage_SearchFiled_id').show();
        }
        else{
            quickSearch.setToolbar({ title:'Wine Search'});
        }

        Ext.getCmp('quickSearch_container_id').hide();

    },
    /**
     * Update WineInfo page.
     */
    showWineInfo: function(view,list,index,target,record,e,eOpts){
        var me = this;
        //console.log( record);
        me.getSortButton().hide();


        wineName = record.data.text;
        var quickSearch = me.getQuickSearch();

        quickSearch.setToolbar({ title:'Wine Info'});
        quickSearch.setBackButton({text: 'Search'});
        quickSearch.setScrollable(false);
        Ext.getCmp('quickSearchResult-backButton-id').hide();
        if(usingAddWinePage != 1){
            Ext.getCmp('quickSearchResultPage_SearchFiled_id').hide();
        }

        Ext.getCmp('quickSearch_container_id').show();


        var picture = Ext.ComponentQuery.query('#wineInfo-picture-id')[0];
        var infoTemp = Ext.getCmp('wineInfo-template-id');

        var tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<table class=\"wineInfoTable\">',
            '<caption><b>{wineName}</b></caption>',
            '<tr><td class=\"leftSideofTable\">Winery:          </td> <td class=\"rightSideofTable\">{winery}             </td>  </tr>',
            '<tr><td class=\"leftSideofTable\">Varietal:        </td> <td class=\"rightSideofTable\">{varietal}           </td>  </tr>',
            '<tr><td class=\"leftSideofTable\">Type:            </td> <td class=\"rightSideofTable\">{varietalType}       </td>  </tr>',
            '<tr><td class=\"leftSideofTable\">Vintage:         </td> <td class=\"rightSideofTable\">{vintage}            </td>  </tr>',
            '<tr><td class=\"leftSideofTable\">Release Price:   </td> <td class=\"rightSideofTable\">{releasePrice}       </td>  </tr>',
            '<tr><td class=\"leftSideofTable\">Cases Made:      </td> <td class=\"rightSideofTable\">{casesMade}          </td>  </tr>',
            '<tr><td class=\"leftSideofTable\">Enthusiast Score:</td> <td class=\"rightSideofTable\">{wineEnthusiastScore}</td>  </tr>',
            '<tr><td class=\"leftSideofTable\">Spectator Score: </td><td class=\"rightSideofTable\">{wineSpectatorScore}  </td>  </tr>',
            '<tr><td class=\"leftSideofTable\">Advocate Score:  </td> <td class=\"rightSideofTable\">{wineAdvocateScore}  </td>  </tr>',
            '</table>',
            '</tpl>',
            '<i>Data collected from iwinedb.com</i>'
        );

        Ext.getStore('WineInfoStore').getProxy().setExtraParams({wineId:record.data.id});

        var store = Ext.getStore('WineInfoStore');
        store.load({
            callback: function(records, operation, successful) {
                if(records){
                    var info = Ext.apply({wineName: wineName}, records[0].data);
                    infoTemp.updateHtml(tpl.applyTemplate(info));

                    if(records[0].data.picture != ''){ //when there is an image
                        picture.setSrc(records[0].data.picture.replace(/\\/g,""));
                        picture.setHidden(false);
                    }
                    else{
                        picture.setHidden(true);
                    }
                }
            }
        });//end loading

        // set up reviews post on and review button's badge.
        var store = Ext.getStore('UserProfileStore');
        var data = store.getData();
        var newreview = me.getNewReview();
        newreview.setPlaceHolder(data.items[0].data.username + ' says: ');
        me.setUpReviews(record.data.id, flag);
        me.setUpFavorite(record.data.id);

    },
    /**
     * If favorited, set icon to yellow star. Otherwise, black star.
     * @param iwineId
     */
    setUpFavorite: function(iwineId){
        var me = this;
        var store = Ext.getStore('UserProfileStore');
        var data = store.getData();
        var username = data.items[0].data.username;
        var param = {'iwineId':iwineId, 'username': username , 'checking': 1};
        if(flag == 2 || flag == 3){  //Add Winery
            param = {'iwineId':iwineId, 'username': username , 'checking': 1, 'winery_mode': 1};
        }

        Ext.Ajax.request({
            //url: 'server/wine/favoriteWine.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/wine/favoriteWine.php',
            url: 'http://localhost/~huypham612/SipSip/server/wine/favoriteWine.php',
            params: param,
            success: function(response){
                var res= response.responseText;
                var favButton = me.getFavButton();

                if(flag == 1){  //wine journal
                    favButton = Ext.getCmp('journal_FavoriteButton_id');
                }

                if(flag == 2 ||flag == 3){  //Add Winery
                    favButton = Ext.getCmp('winery_FavoriteButton_id');
                }

                if(res === 'Favorited'){//set icon to yellow star:
                    favButton.setIconCls('yellowStar');
                    if(flag == 1 || flag == 2 || flag == 3){ //need bigger star for wine journal
                        favButton.setIconCls('yellowStar_bigger');
                    }
                }
                else{
                    favButton.setIconCls('star');
                }
            },
            failure : function(response) {
                Ext.Msg.alert('Setting Up Favorite Failed');
            }
        });
    },
    /**
     * Update user info table in the user tab.
     * @param username
     */
    updateUserInfo: function(username){
        var me = this;
        var infoTemp = me.getUserInfo();
        var tpl = new Ext.XTemplate(     //template to be updated
            '<tpl for=".">',
            '<table class=\"userInfoTable\">',
            '<caption><b>{wineName}</b></caption>',
            '<tr><td class=\"leftSideofUserTable\">Favorite Wines     </td> <td class=\"rightSideofUserTable\">{favWines}     </td>  </tr>',
            '<tr><td class=\"leftSideofUserTable\">Wines Tried        </td> <td class=\"rightSideofUserTable\">{wineTried}         </td>  </tr>',
            '<tr><td class=\"leftSideofUserTable\">Favorite Wineries  </td> <td class=\"rightSideofUserTable\">{favWineries}  </td>  </tr>',
            '<tr><td class=\"leftSideofUserTable\">Wineries Visited   </td> <td class=\"rightSideofUserTable\">{visited}       </td>  </tr>',
            '<tr><td class=\"leftSideofUserTable\">Reviews            </td> <td class=\"rightSideofUserTable\">{reviews}           </td>  </tr>',
            '</table>',
            '</tpl>'
        );
        Ext.getStore('UserProfileStore').getProxy().setExtraParams({username: username});
        var store = Ext.getStore('UserProfileStore');
        //console.log("name = ", username);
        store.load({
            callback: function(records, operation, successful) {
                if(successful){
                    //console.log("rec ", records);
                    var info = Ext.apply(records[0].data);
                    infoTemp.updateHtml(tpl.applyTemplate(info));

//                    if(records[0].data.picture != ''){ //when there is an image
//                        picture.setSrc(records[0].data.picture.replace(/\\/g,""));
//                        picture.setHidden(false);
//                    }
//                    else{
//                        picture.setHidden(true);
//                    }
                }
                else{ //failed to connect: set all to 0
                    infoTemp.updateHtml(tpl.applyTemplate({'favWines': 0, 'wineTried': 0, 'favWineries': 0, 'visited': 0, 'reviews': 0 }));
                }

            }
        });//end loading
    },
    showMenu: function(){
        var me = this;

        var quickSearch = me.getQuickSearch();

        Ext.getCmp('carouselCard-id').destroy();
        if(usingAddWinePage != 1){ //Show Main Menu:
            var menuPage = me.getMenuPage();
            var main = me.getMain();

            main.setShowAnimation({
                type :'slide',direction : 'right', duration: 250
            });
            quickSearch.hide();
            menuPage.show();
            main.show();
        }
        else{ //show Add Wine Page:

            var addWinePage = Ext.getCmp('addWineCarousel_id');
            addWinePage.setShowAnimation({
                type :'slide',direction : 'right', duration: 250
            });
            quickSearch.hide();
            addWinePage.show();
        }

    },
    onSearchQueryChanged: function(field){
        var me = this;
        var searchKey = field._value;
        var quickSearch = me.getQuickSearch();
        if(searchKey){  //only search if input is valid
            var mask = {masked: {
                xtype: 'loadmask',
                message: 'Searching for Wine'
            }};
            quickSearch.setConfig(mask);
            quickSearch.setMasked(true);
            var nestedListData = [];
            Ext.getStore('quickSearchResultStore').getProxy().setExtraParams({wineName:searchKey});
            var store = Ext.getStore('quickSearchResultStore');

            store.load({
                callback: function(records, operation) {
                    if(operation._records.length > 0){

                        for(var i = 0; i < records.length; i++){
                            nestedListData.push({text : records[i].data.text + " " + records[i].data.year, id:records[i].data.id, year:records[i].data.year, leaf: true });
                        }

                        var resultStore = Ext.create('Ext.data.TreeStore', {
                            model: 'SipSip.model.quickSearchResultModel',
                            defaultRootProperty: 'text',
                            root: {text : nestedListData}
                        });

                        quickSearch.setStore(resultStore);
                        quickSearch.setMasked(false);

                    }
                    else{
                        quickSearch.setMasked(false);
                        Ext.Msg.alert('No Result');
                    }
                }
            });//end loading
        }
    },
    onSearchReset: function(field){  //empty the searchfield
        field.reset();
    }
})
