/**
 * Created with JetBrains PhpStorm.
 * Date: 5/22/13
 * Time: 4:36 PM
 */
Ext.define("SipSip.view.AddWinePages.AddWine",{
    extend: 'Ext.form.Panel',
    id: 'addWineCarousel_id',
    config: {
        fullscreen: true,
        layout: {
            type: 'vbox'

        },
        items:[
            {
                flex:1,
                xtype: 'titlebar',
                docked: 'top',
                title: 'Add Wine',
                items:[
                    { //back to main menu page
                        ui: 'back',
                        xtype: 'button',
                        text: 'Menu',
                        action: 'addWine-backButton',
                        cls: 'backBt'
                    }
                ]
            },
            {
                flex:1,
                xtype: 'addWine_Carousel'
            }
        ]
    }
})
