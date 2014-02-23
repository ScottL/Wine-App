/**
 * Created with JetBrains PhpStorm.
 * Date: 4/20/13
 * Time: 2:20 AM
 */
Ext.define('SipSip.view.quickSearchResult', { //display quick search results.
    extend: 'Ext.NestedList',
    requires: ['Ext.carousel.Carousel'],
    alias : 'widget.quickSearchNestedList',  //TO have control of this list in the controller
    id: 'quickSearchResult-id',
    config: {
        scrollable: true,
        fullscreen: true,
        title: 'Quick Search',
        displayField: 'text',
        styleHtmlContent: true,
        useTitleAsBackText: false,
        updateTitleText: false,
        hideAnimation:{
            type :'slide',direction : 'right', out: true,duration: 260
        },
        backButton:{
            cls: 'backBt',
            text: 'Search'
        },
        toolbar:
        {
            docked: 'top',
            //cls: 'toolbarCls',
            //title: 'Wine Info',
            ui: 'dark',
            items:[
                { //back to main menu page

                    xtype: 'button',
                    text: 'Menu',
                    action: 'quickSearchResult-backButton',
                    id: 'quickSearchResult-backButton-id',
                    cls: 'backBt',
                    ui: 'back'
                },
                {
                    align: 'right',
                    xtype: 'button',
                    iconCls: 'arrow_up',
                    action: 'sortButton',
                    id: 'sortButton-id'
                }
            ]
        },
        detailCard:{ //when the leaf item is click ---> show wineInfo.
            xtype: 'carousel',
            id: 'carouselCard-id',
            //margin: '15% 0 0 0',
            defaults:{
                styleHtmlContent: true,
                scrollable: true,
                xtype: 'panel',
                fullscreen: true
            },
            items:[
                {

                    layout: 'vbox',
                    items:[

                        {
                            xtype: 'image',
                            id: 'wineInfo-picture-id',
                            hidden: true,
                            flex: 1,
                            margin: '0 0 5 0',
                            tap: 'winePicture_action'
                        },
                        {
                            //template for wineInfo: will get updated by quickSearchResultControl.js
                            id: 'wineInfo-template-id',
                            cls:'wineInfo-template-cls',
                            flex: 2,
                            margin: '0 0 5 0'
                        }

                    ]
                },

                {
                    xtype: 'panel',
                    items:[
                        { //textfield to post reviews
                            xtype: 'textareafield',
                            margin: '5 0 5 0',
                            id: 'wineInfo-reviews-textfield-id',
                            minHeight: 200,
                            hidden: true,
                            styleHtmlContent: true
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            hidden: true,
                            margin: ' 0 0 5 0',
                            id: 'wineInfo-reviews-hbox-id',
                            defaults:{
                                margin: '2 2 5 2',
                                docked: 'right'
                            },
                            items:[
                                {
                                    xtype: 'button',
                                    ui:'round',
                                    text: 'Preview',
                                    id: 'wineInfo-reviews-sumbitButton-id',
                                    action: 'wineInfo-reviews-sumbitButton-action'

                                }
                            ]
                        },
                        {
                            //template for reviews
                            id: 'wineInfo-reviews-id',
                            cls:'wineInfo-reviews-cls'
                        }

                    ]

                }
            ]
        },
        items:[
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
                        hidden: true,
                        id: 'quickSearch_container_id',
                        margin: '2 5 5 5',
                        defaults: {
                            cls:'wineInfo-btCls',
                            ui: 'round',
                            margin: '2 2 5 2'
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
                                        id: 'quickSearch_ReviewButton',
                                        action: 'quickSearch_ReviewButton_tap'
                                        //margin: '0 5 0 0'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'star',
                                        flex: 1,
                                        text: 'Favorite',
                                        id: 'quickSearch_FavoriteButton',
                                        action: 'quickSearch_FavoriteButton_action'
                                        //iconMask: true

                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'add',
                                        flex: 1,
                                        text: 'Add to Journal',
                                        id: 'quickSearch_SaveButton',
                                        action: 'quickSearch_SaveButton_action'
                                        //iconMask: true

                                    }
                                ]

                            }

                        ]
                    }
                ]

            }

        ]
    }
});
