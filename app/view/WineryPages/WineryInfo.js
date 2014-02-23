/**
 * Created with JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 11:04 PM
 */
Ext.define("SipSip.view.WineryPages.WineryInfo",{
    extend: 'Ext.form.Panel',
    //xtype:  'loginForm',
    //requires: ['Ext.form.FieldSet', 'Ext.field.Select' ],
    id:'wineryInfo_id',
    config:{
        fullscreen: true,
        layout: 'vbox',
//        showAnimation:{
//            type :'slide',direction : 'left', duration: 250
//        },
//        hideAnimation:{
//            type :'slide',direction : 'right', out: true,duration: 260
//        },
        items:[
            {
                xtype: 'titlebar',
                flex: 1,
                docked: 'top',
                title: 'Winery Info',
                items:[
                    { //back to main menu page
                        ui: 'back',
                        xtype: 'button',
                        text: 'List',
                        action: 'wineryInfo_backButton',
                        cls: 'backBt'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                flex: 1,
                //ui: 'neutral',
                docked: 'bottom',
                defaults:{
                    width: '100%'
                },
                items:[
                    {
                        xtype: 'container',
                        //flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'center'
                        },
                        defaults: {
                            //ui: 'round',
                            iconAlign: 'top',
                            iconMask: true,
                            align: 'center',
                            style: 'border: none'
                        },

                        items:[
                            {
                                xtype: 'button',
                                iconCls: 'compose',
                                flex: 1,
                                text: 'Reviews',
                                action: 'winery_ReviewButton',
                                id: 'winery_ReviewButton_id'
                                //margin: '0 5 0 0'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'star',
                                flex: 1,
                                text: 'Favorite',
                                action: 'winery_FavoriteButton',
                                id: 'winery_FavoriteButton_id'

                            },
                            {
                                xtype: 'button',
                                iconCls: 'add',
                                flex: 1,
                                text: 'Journal',
                                action: 'winery_addJournal',
                                id: 'winery_addJournal_id'
                                //margin: '0 5 0 0'
                            }
                        ]
                    }
                ]
            },
            {

                xtype: 'WineryInfo_Carousel',
                flex: 1
            }
        ]
    }
})
