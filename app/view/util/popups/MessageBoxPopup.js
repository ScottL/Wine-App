/**
 * Created with JetBrains PhpStorm.
 * Date: 5/26/13
 * Time: 3:56 AM
 */

Ext.define('SipSip.view.util.popups.MessageBoxPopup', {
    extend: 'Ext.MessageBox',
    id:  'messageBox_listOptions_id',
    config:{
        title: "List Options",
        bodyStyle: "padding:10px",
        hideOnMaskTap: true,
        buttons: [
            {text: "Favorite", action: 'FavoriteList' },
            {text: "Tried", action: 'TriedList' },
            {text: "ToTry",action: 'ToTryList'}
        ]
    }

})
