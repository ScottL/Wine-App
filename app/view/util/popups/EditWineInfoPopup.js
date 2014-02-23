/**
 * Created with JetBrains PhpStorm.
 * Date: 5/27/13
 * Time: 11:47 PM
 */
Ext.define('SipSip.view.util.popups.EditWineInfoPopup', {
    extend: 'Ext.Panel',
    id:  'wineInfoPopup_id',
    config:{
        floating: true,
        centered: true,
        modal:    true,
        hideOnMaskTap: true,
        height:   '80%',
        width:    '100%',
        showAnimation: {type: 'pop'},
        scrollable: true,
        layout: 'fit',
        items:[
            {
                    xtype: 'editWineInfoForm'
            }
        ]
    }
})
