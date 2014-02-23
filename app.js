/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'SipSip': 'app'
});
//</debug>

Ext.application({
    name: 'SipSip',

    requires: [
        'Ext.MessageBox'
    ],

    models: [
        'UserProfile', 'WineInfoModel', 'quickSearchResultModel', 'WineryInfoModel'
    ],

    stores: [
        'UserProfileStore', 'WineInfoStore', 'quickSearchResultStore', 'WineJournalStore', 'WineryInfoStore',
        'WinerySearchStore', 'WineryJournalStore'
    ],


    views: [
        'Main',
        'util.tabs.Menu', 'util.popups.picturePopup', 'util.popups.About', 'util.tabs.UserProfile',
        'util.popups.Preview', 'util.popups.WineJournalOptions', 'util.popups.BACResult',
        'util.carousels.InfoCarousel', 'util.carousels.AddWineCarousel',
        'util.forms.WineInfoForm',
        'WineJournalPages.WineJournal', 'WineJournalPages.WineList', 'WineJournalPages.JournalWineInfo',
        'BACPage',
        'LoginPage' , 'util.forms.LoginForm',
        'SignupView', 'util.forms.SignupForm',
        'quickSearchResult',
        'WineryPages.WinerySearchPage', 'WineryPages.WineryList', 'WineryPages.WineryInfo',
        'UserPages.EditUser',
        'AddWinePages.AddWine',
        'util.popups.MessageBoxPopup','util.popups.EditWineInfoPopup','util.forms.EditWineInfoForm',
        'util.carousels.WineryInfoCarousel',
        'WineJournalPages.JournalWineryList'

    ],

    controllers: [
        'LoginControl',
        'MenuControllers.MenuPageControl', 'MenuControllers.quickSearchResultControl', 'MenuControllers.BACControl',
        'AddWineryControllers.WinerySearchControl', 'AddWineryControllers.WineryListControl',
        'UserControllers.UserPageControl',
        'PopupControllers.WineJournalOptionsController',
        'WineJournalControllers.WineJournalControl',
        'WineJournalControllers.FavoriteWineControl',
        'AddWineControllers.AddWineControl',
        'UserControllers.EditUserControl',
        'PopupControllers.AddCustomWineOptions',
        'PopupControllers.EditWineController',
        'WineJournalControllers.WineryJournalControl'

    ],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('SipSip.view.LoginPage'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
