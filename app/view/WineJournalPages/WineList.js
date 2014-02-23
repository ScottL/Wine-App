/**
 * Created with JetBrains PhpStorm.
 * Date: 5/21/13
 * Time: 12:08 AM
 */

Ext.define("SipSip.view.WineJournalPages.WineList",{
    extend: 'Ext.dataview.List',
    id: 'wineList-id',
    config: {
        store : 'WineJournalStore',
        grouped: true,
        indexBar: true,
        itemCls: 'wineListItem-cls',
        itemTpl: '<div class="myContent">'+
            '<div>{name}</div>' +
            '</div>',
        items:[
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Favorite Wines',
                id: 'wineListTitle_id',
                items:[
                    { //back to main menu page
                        ui: 'back',
                        xtype: 'button',
                        text: 'Journal',
                        action: 'favWine-backButton',
                        cls: 'backBt'
                    }
                ]
            }
        ]
    }


})
