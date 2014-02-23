/**
 * Created with JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 10:49 PM
 */
Ext.define("SipSip.view.util.carousels.WineryInfoCarousel",{
    extend: 'Ext.carousel.Carousel',
    xtype: 'WineryInfo_Carousel',
    id: 'WineryInfo_Carousel_id',

    config:{
        defaults:{
            styleHtmlContent: true,
            xtype: 'panel',
            fullscreen: true
        },
        items:[
            {
                xtype: 'panel',
                layout: 'vbox',
                scrollable: true,
                items:[
                    {
                        xtype: 'image',
                        id: 'winery_picture_id',
                        tap: 'winery_picture_tap',
                        hidden: true,
                        flex: 1,
                        margin: '0 0 5 0'
                    },
                    {
                        //template for wineInfo: will get updated by quickSearchResultControl.js
                        xtype: 'panel',

                        id: 'winery_template_id',
                        //cls:'wineInfo_template_cls',
                        flex: 2,
                        cls:'journalWineInfoTable_cls',
                        margin: '0 0 5 0',
                        tpl:
                            '<table class=\"wineInfoTable\">'+
                                '<caption><b>{wineName}</b></caption>'+
                                '<tr><td class=\"leftSideofTable\">Winery Name   </td> <td class=\"rightSideofTable\">{name}  </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Address           </td> <td class=\"rightSideofTable\">{address}, {city}, {state} {zipCode}             </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Phone         </td> <td class=\"rightSideofTable\">{phone}           </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Fax             </td> <td class=\"rightSideofTable\">{fax}       </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Website          </td> <td class=\"rightSideofTable\">{website}            </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Email    </td> <td class=\"rightSideofTable\">{email}       </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Owners       </td> <td class=\"rightSideofTable\">{owners}          </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Wine Makers        </td> <td class=\"rightSideofTable\">{wineMakers}</td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Business Hours      </td><td class=\"rightSideofTable\" >{businessHours} </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Varietals Grown </td> <td class=\"rightSideofTable\">{varietalsGrown}</td>  </tr>'+
                            '</table>'+
                            '<i>Data collected from iwinedb.com</i>'
                    }

                ]
            },
            {
                xtype: 'panel',
                scrollable: true,
                items:[
                    { //textfield to post reviews
                        xtype: 'textareafield',
                        margin: '5 0 5 0',
                        id: 'winery_reviews_textfield_id',
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
                        id: 'winery_reviews_hbox_id',
                        defaults:{
                            margin: '2 2 5 2',
                            docked: 'right'
                        },
                        items:[
                            {
                                xtype: 'button',
                                ui:'round',
                                text: 'Preview',
                                id: 'winery_reviews_preview_id',
                                action: 'wineryPreview'

                            }
                        ]
                    },
                    {
                        //template for reviews
                        id: 'winery_reviews_id',
                        xtype: 'panel',
                        cls: 'winery_reviews_cls',
                        //cls:'wineInfo_reviews_cls'
                        tpl: '<tpl for=".">' +
                            '<p><b><i>{username}  {created}</i><b><br>    {review}</p>'+
                            '</tpl>'
                    }

                ]

            }
        ]
    }
})
