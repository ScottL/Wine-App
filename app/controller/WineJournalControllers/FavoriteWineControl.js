/**
 * Created with JetBrains PhpStorm.
 * Date: 5/21/13
 * Time: 3:27 AM
 */

Ext.define('SipSip.controller.WineJournalControllers.FavoriteWineControl',{
    extend: 'Ext.app.Controller',
    //requires: ['Ext.data.TreeStore'],
    config:{
        //stores: ['UserProfileStore'],

        refs:{
            wineJournal: '#wineJournal-id',
            wineList:  '#wineList-id',
            wineInfo: '#journalWineInfo-id',
            infoTemplate: '#journal-template-id',
            reviews: '#journal-reviews-id',
            infoCarousel: '#journalWineInfo_Carousel-id',

            //to show picture when taped.
            infoPicture: {selector:'#journal-picture-id'},
            picturePopup: '#picturePopup-id',
            imagePopup: '#popup-picture-id',  //the image inside the picturePopup panel

            //Review:
            reviewButton: '#journal_ReviewButton-id',
            newReview: '#journal-reviews-textfield-id',
            buttonBox: '#journal-reviews-hbox-id',
            preview: '#journal-reviews-sumbitButton-id',
            previewReview: '#preview-review-id',
            reviewSubmit: '#preview-sumbitButton-id',
            previewEdit: '#preview-EditButton-id',
            previewPopup: '#preview-id',

            //Buttons
            editButton: '#journal_EditInfo_id',
            wineInfoPopup: '#wineInfoPopup_id',
            infoForm: '#editWineInfoForm_id'

        },
        control:
        {
            "button[action=favWine-backButton]": {
                tap: 'backToJournal'
            },
            "button[action=journalWineInfo-backButton]": {
                tap: 'backToList'
            },
            "button[action=journal_FavoriteButton]": {
                tap: 'favoriteWine'
            },
            "button[action=journal_ChangeList]": {
                tap: 'showListOption'
            },
            "button[action=journal_ReviewButton]": {
                tap: 'showReviewField'
            },
            "button[action=journalCarousel_preview]": {
                tap: 'showPreview'
            },
            "button[action=preview_edit]": {
                tap: 'closePopup'
            },
            "button[action=journal_EditInfo]": {
                tap: 'showEditInfoForm'
            },
            "list[id=wineList-id]": {
                itemtap: 'showWineInfo'
            },
            "image[tap=journal-picture-tap]": {
                tap: 'showPopupPicture'
            }
        }
    },
    /**
     * Show Edit Wine Info Form.
     */
    showEditInfoForm: function(){
        var me = this;
        var popup = me.getWineInfoPopup();
        if(popup){}  //already created
        else{
            popup = Ext.create('SipSip.view.util.popups.EditWineInfoPopup');
            Ext.Viewport.add(popup);
        }

        //setting up the form with current wine info:
        var infoForm = me.getInfoForm();
        if(infoForm){}  //already created
        else{
            infoForm = Ext.create('SipSip.view.util.forms.WineInfoForm');
            Ext.Viewport.add(infoForm);
        }



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

        popup.show();
    },
    /**
     * Show popup up options:  add to toTry or Tried list.
     */
    showListOption: function(){
        this.getApplication().getController('MenuControllers.quickSearchResultControl').showOptionPopup();
    },

    favoriteWine: function(){
        var me = this;
        var wineList = me.getWineList();
        this.getApplication().getController('MenuControllers.quickSearchResultControl').favoriteWine();

        me.updateWineList(choice);


    },

    /*
     * Hide the review box and button after uploaded.
     */
    showPreview: function(){
        var me = this;
        var reviewField = me.getNewReview();
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
     * Show or hide review text area and button box.
     * Set the review card active.
     */
    showReviewField: function(){
        var me = this;
        var reviewBox = me.getNewReview();
        var buttonBox = me.getButtonBox();
        if(!reviewBox.isHidden() || !buttonBox.isHidden()){
            reviewBox.hide();
            buttonBox.hide();
        }
        else{
            reviewBox.show();
            buttonBox.show();
        }
        me.getInfoCarousel().doResetActiveItem(0);
    },

    /**
     * Show pop up window with wine picture when picture is tapped.
     */
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
    /**
     * Display wine info, picture, and reviews.
     * @param record - wine info.
     */
    showWineInfo: function(item, index, target, record, e, eOpts){
        //very important: need this to update store's data, and get wineId for reviews ...
        Ext.getStore('WineInfoStore').setData(record.data);

        //console.log('rec = ', record);
        var me = this;
        var list = me.getWineList();
        var wineInfo = me.getWineInfo();
        if(wineInfo){}
        else{
            wineInfo = Ext.create('SipSip.view.WineJournalPages.JournalWineInfo');
            Ext.Viewport.add(wineInfo);
        }
        list.setHideAnimation({
            type :'slide',direction : 'left', out: true,duration: 260
        });
        wineInfo.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });
        var src = record.data.picture;
        var picture = me.getInfoPicture();
        if(src){ //update picture
            picture.setSrc(src);
            picture.show();
        }else{
            picture.setSrc('');
            picture.hide();
        }
        me.getInfoTemplate().setData(record.data);   //update info template

        //set up reviews:
        me.getApplication().getController('MenuControllers.quickSearchResultControl').setUpReviews(record.data.iwineId,1);
        //set up favorite button icon:
        me.getApplication().getController('MenuControllers.quickSearchResultControl').setUpFavorite(record.data.iwineId);
        //only show Edit Info button if wine is added by the user:
        if(record.data.iwineId == -1){
            me.getEditButton().show();
        }
        else{
            me.getEditButton().hide();
        }

        list.hide();
        wineInfo.show();
    },
    backToList: function(){
        var me = this;
        var wineInfo = me.getWineInfo();
        var wineList = me.getWineList();

        wineList.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });
        wineInfo.setHideAnimation({
            type :'slide',direction : 'right', out: true,duration: 260
        });
        wineInfo.hide();
        wineList.show();
    },

    backToJournal: function(){
        var me = this;
        var journal = me.getWineJournal();
        var wineList = me.getWineList();

        journal.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });
        wineList.setHideAnimation({
                type :'slide',direction : 'right', out: true,duration: 260
        });
        wineList.hide();
        journal.show();
    },
    closePopup: function(){  //call function from another controller
        this.getApplication().getController('MenuControllers.quickSearchResultControl').closePopup();
    },
    /**
     * Update Wine List whenever user changed favorite wine or switch wine list.
     */
     updateWineList: function(choice) {
        //getting username:
        var userStore = Ext.getStore('UserProfileStore');
        var userData = userStore.getData();
        var userName = userData.items[0].data.username;
        //update favorite list:
        Ext.getStore('WineJournalStore').getProxy().setExtraParams({username:userName, choice: choice});
        var store = Ext.getStore('WineJournalStore');
        store.load({
            callback:function (records, operation, successful) {
                if (records) {  //result = 0 ---> no result

                }
                else {
                    console.log('store load failed');
                }
            }
        });//end loading
    }

})
