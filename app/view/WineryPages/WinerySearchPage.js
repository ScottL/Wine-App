/**
 * Created with JetBrains PhpStorm.
 * Date: 4/30/13
 * Time: 1:42 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('SipSip.view.WineryPages.WinerySearchPage',{

    id: 'WinerySearch-id',
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Panel' , 'Ext.TitleBar'],

    config:{
        fullscreen: true,
        scrollable: true,
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'Winery Search',
                items: [
                    {
                        xtype: 'button',
                        align: 'left',
                        text: 'Menu',
                        action:'WinerySearch-backButton-id',
                        cls: 'backBt',
                        ui: 'back'
                    }
                ]
            },
            {
                xtype: 'container',
                //margin: '5% 2% 0 2%',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Add Winery from Search Results',
                        items: [
                            {
                                xtype: 'searchfield',
                                label: 'Winery',
                                autoComplete: true,
                                autoDestroy: true,
                                placeHolder: 'Enter Winery Name',
                                id: 'winery_search_id',
                                //margin: '1% 5% 0 0',
                                action: 'winery_search'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})
