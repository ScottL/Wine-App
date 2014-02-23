/**
 * Created with JetBrains PhpStorm.
 * Date: 5/11/13
 * Time: 4:37 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define("SipSip.view.WineryPages.WineryList",{
    extend: 'Ext.dataview.List',
    id: 'wineryList_id',
    config: {
        store : 'WinerySearchStore',
        //grouped: true,
        //indexBar: true,
        itemCls: 'wineListItem-cls',
        itemTpl: '<div class="myContent">'+
            '<div>{name}</div>' +
            '</div>',
        items:[
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Winery',
                id: 'wineryList_titleBar_id',
                items:[
                    { //back to main menu page
                        ui: 'back',
                        xtype: 'button',
                        text: 'Search',
                        action: 'wineryList_backButton',
                        id: 'wineryList_backButton',
                        cls: 'backBt'
                    }
                ]
            }
        ]
    }


})
