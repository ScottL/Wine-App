/**
 * Created with JetBrains PhpStorm.
 * Date: 5/22/13
 * Time: 12:51 AM
 */
Ext.define("SipSip.view.util.carousels.InfoCarousel",{
    extend: 'Ext.carousel.Carousel',
    xtype: 'journalWineInfo_Carousel',
    id: 'journalWineInfo_Carousel-id',

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
                        id: 'journal-picture-id',
                        tap: 'journal-picture-tap',
                        hidden: true,
                        flex: 1,
                        margin: '0 0 5 0'
                    },
                    {
                        //template for wineInfo: will get updated by quickSearchResultControl.js
                        xtype: 'panel',

                        id: 'journal-template-id',
                        //cls:'wineInfo-template-cls',
                        flex: 2,
                        cls:'journalWineInfoTable_cls',
                        margin: '0 0 5 0',
                        tpl:
                            '<table class=\"wineInfoTable\">'+
                                '<caption><b>{wineName}</b></caption>'+
                                '<tr><td class=\"leftSideofTable\">Wine Name   </td> <td class=\"rightSideofTable\">{name}  </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Winery           </td> <td class=\"rightSideofTable\">{winery}             </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Varietal         </td> <td class=\"rightSideofTable\">{varietal}           </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Type             </td> <td class=\"rightSideofTable\">{varietalType}       </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Vintage          </td> <td class=\"rightSideofTable\">{vintage}            </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Release Price    </td> <td class=\"rightSideofTable\">{releasePrice}       </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Cases Made       </td> <td class=\"rightSideofTable\">{casesMade}          </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Sweetness        </td> <td class=\"rightSideofTable\">{sweetness}</td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Boldness         </td><td class=\"rightSideofTable\" >{boldness} </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Enthusiast Score </td> <td class=\"rightSideofTable\">{wineEnthusiastScore}</td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Spectator Score  </td><td class=\"rightSideofTable\" >{wineSpectatorScore} </td>  </tr>'+
                                '<tr><td class=\"leftSideofTable\">Advocate Score   </td> <td class=\"rightSideofTable\">{wineAdvocateScore}  </td>  </tr>'+
                                '</table>'
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
                        id: 'journal-reviews-textfield-id',
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
                        id: 'journal-reviews-hbox-id',
                        defaults:{
                            margin: '2 2 5 2',
                            docked: 'right'
                        },
                        items:[
                            {
                                xtype: 'button',
                                ui:'round',
                                text: 'Preview',
                                id: 'journal-reviews-sumbitButton-id',
                                action: 'journalCarousel_preview'

                            }
                        ]
                    },
                    {
                        //template for reviews
                        id: 'journal-reviews-id',
                        xtype: 'panel',
                        cls: 'journal-reviews-cls',
                        //cls:'wineInfo-reviews-cls'
                        tpl: '<tpl for=".">' +
                            '<p><b><i>{username}  {created}</i><b><br>    {review}</p>'+
                            '</tpl>'
                    }

                ]

            }
        ]
    }
})
