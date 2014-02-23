/**
 * Created with JetBrains PhpStorm.
 * Date: 5/22/13
 * Time: 4:45 PM
 */
Ext.define("SipSip.view.util.carousels.AddWineCarousel",{
    extend: 'Ext.carousel.Carousel',
    xtype: 'addWine_Carousel',
    id: 'addWine_Carousel_id',

    config:{
        defaults:{
            styleHtmlContent: true,
//            xtype: 'panel',
            fullscreen: true,
            scrollable: true
        },
        items:[
            {
                xtype: 'panel',
                items: [
                    {
                        xtype: 'container',
                        //margin: '5% 2% 0 2%',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Add Wine from Search Results',
                                items: [
                                    {
                                        xtype: 'searchfield',
                                        label: 'Wine',
                                        autoComplete: true,
                                        autoDestroy: true,
                                        placeHolder: 'Enter Wine Name',
                                        id: 'addWineCarousel_search_id',
                                        //margin: '1% 5% 0 0',
                                        action: 'addWineCarousel_search'
                                    }
                                ]
                            }
                        ]
                    }

                ]

            },
            {
                xtype: 'wineInfoForm'
            }
        ]
    }
})
