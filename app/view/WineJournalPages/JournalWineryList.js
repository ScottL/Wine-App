/**
 * Created with JetBrains PhpStorm.
 * Date: 5/30/13
 * Time: 3:26 AM
 */
Ext.define("SipSip.view.WineJournalPages.JournalWineryList",{
    extend: 'Ext.dataview.List',
    id: 'journal_wineryList_id',
    config: {
        store : 'WineryJournalStore',
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
                title: 'Winery',
                id: 'journal_wineryList_titleBar_id',
                items:[
                    { //back to main menu page
                        ui: 'back',
                        xtype: 'button',
                        text: 'Search',
                        action: 'journal_wineryList_backButton',
                        id: 'journal_wineryList_backButton_id',
                        cls: 'backBt'
                    }
                ]
            }
        ]
    }


})
