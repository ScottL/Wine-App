/**
 * Created with JetBrains PhpStorm.
 * Date: 5/19/13
 * Time: 8:32 PM
 */

Ext.define("SipSip.view.WineJournalPages.WineJournal",{

    extend: 'Ext.form.Panel',
    //xtype:  'loginForm',
    //requires: ['Ext.form.FieldSet', 'Ext.field.Select' ],
    id:'wineJournal-id',
    config:{
        fullscreen: true,
        showAnimation:{
            type :'slide',direction : 'left', duration: 250
        },
        hideAnimation:{
            type :'slide',direction : 'right', out: true,duration: 260
        },
        items:[
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Wine Journal',
                items:[
                    { //back to main menu page
                        ui: 'back',
                        xtype: 'button',
                        text: 'Menu',
                        action: 'winejournal-backButton',
                        cls: 'backBt'
                    }
                ]
            },
            {
                xtype: 'container',
                //margin: '10% 0 0 0',
                defaults:{
                    //cls: 'journal'
//                    baseCls: 'journalFieldSet'
                },
                items: [
                    {
                        xtype: 'container',
                        //title: 'Wine',
                        margin: '10% 4% 0 4%',
                        defaults:{
                            //margin: '0 4% 4 4%',
                            iconMask: true,
                            iconAlign: 'right',
                            icon: 'resources/icons/myIcons/arrow-7-right.png'
                        },
                        items:[
                            {
                                html: '<b>Wine</b>',
                                margin: '0 0 5 0'
                            },
                            {
                                xtype: 'button',
                                text:  'Favorites',

                                action:'journal-favWineButton'
                            },
                            {
                                xtype: 'button',
                                text:  'To Try',
                                action:'journal-toTryButton'
                            },
                            {
                                xtype: 'button',
                                text:  'Tried',
                                margin: '0 0 0 0',
                                action:'journal-triedButton'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        margin: '10% 4% 0 4%',
                        //title: 'Winery',
                        defaults:{
                            //margin: '0 4% 4 4%',
                            iconMask: true,
                            iconAlign: 'right',
                            //margin: '0 0 4 0',
                            icon: 'resources/icons/myIcons/arrow-7-right.png'
                        },
                        items:[
                            {
                                html: '<b>Winery</b>',
                                margin: '0 0 5 0'
                            },
                            {
                                xtype: 'button',
                                text:  'Favorites',
                                action:'journal_favWineryButton_id'
                            },
                            {
                                xtype: 'button',
                                text:  'To Visit',
                                action:'journal_toVisitButton_id'
                            },
                            {
                                xtype: 'button',
                                text:  'Visited',
                                margin: '0 0 0 0',
                                action:'journal_visitedButton_id'
                            }
                        ]
                    }

                ]
            }

        ]
    }

 })
