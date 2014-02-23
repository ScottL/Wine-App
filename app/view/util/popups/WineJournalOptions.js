/**
 * Created with JetBrains PhpStorm.
 * Date: 5/19/13
 * Time: 12:55 AM
 */

Ext.define('SipSip.view.util.popups.WineJournalOptions', {
    extend: 'Ext.MessageBox',
    id:  'wineJournalOption-id',

    config: {
        title: 'List Options',
        floating: true,
        //centered: true,
        bodyStyle: "padding:10px",
        hideOnMaskTap: true,
        buttons: [
            {text: "ToTry", action: 'option_toTry' ,id: 'option-wineToTried-id' },
            {text: "Tried", action: 'option_tried' , id: 'option-wineTried-id'},
            {text: "Remove", action: 'option_remove', hidden: true, id: 'option-remove-id'}
        ]
    }//end config

});
