/**
 * Created with JetBrains PhpStorm.
 * Date: 5/21/13
 * Time: 11:29 PM
 */
Ext.define("SipSip.view.WineJournalPages.JournalWineInfo",{
    extend: 'Ext.form.Panel',
    //xtype:  'loginForm',
    //requires: ['Ext.form.FieldSet', 'Ext.field.Select' ],
    id:'journalWineInfo-id',
    config:{
        fullscreen: true,
        layout: 'vbox',
        showAnimation:{
            type :'slide',direction : 'left', duration: 250
        },
        hideAnimation:{
            type :'slide',direction : 'right', out: true,duration: 260
        },
        items:[
            {
                xtype: 'titlebar',
                flex: 1,
                docked: 'top',
                title: 'Wine Info',
                items:[
                    { //back to main menu page
                        ui: 'back',
                        xtype: 'button',
                        text: 'List',
                        action: 'journalWineInfo-backButton',
                        cls: 'backBt'
                    }
                ]
            },
            {

                xtype: 'journalWineInfo_Carousel',
                flex: 1

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
                                action: 'journal_ReviewButton',
                                id: 'journal_ReviewButton-id'
                                //margin: '0 5 0 0'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'star',
                                flex: 1,
                                text: 'Favorite',
                                action: 'journal_FavoriteButton',
                                id: 'journal_FavoriteButton_id'

                            },
                            { //only show when wine is a custom added wine.
                                xtype: 'button',
                                iconCls: 'info',
                                flex: 1,
                                text: 'Edit Info',
                                action: 'journal_EditInfo',
                                id: 'journal_EditInfo_id',
                                hidden: true
                            },
                            {
                                xtype: 'button',
                                iconCls: 'settings',
                                flex: 1,
                                text: 'List',
                                action: 'journal_ChangeList'
                                //margin: '0 5 0 0'
                            }
                        ]
                    }
                ]
            }
        ]
    }

})

