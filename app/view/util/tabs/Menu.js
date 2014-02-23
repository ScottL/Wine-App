/**
 * Created with JetBrains PhpStorm.
 * Date: 4/23/13
 * Time: 9:00 PM
 */
Ext.define('SipSip.view.util.tabs.Menu', {   //the Menu Page
    extend: 'Ext.form.Panel',
    requires: ['Ext.TitleBar', 'Ext.layout.*', 'Ext.field.Search'],
    id:  'menu-id',
    xtype: 'menu',
    config: {
        items:[
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'SipSip'
            },
            {
                xtype: 'fieldset',
                title: 'Quick Search',
                items: [
                    {
                        xtype: 'searchfield',
                        label: 'Wine',
                        autoComplete: true,
                        autoDestroy: true,
                        name: 'quicksearch',
                        placeHolder: 'Enter Wine Name',
                        id: 'quicksearch',
                        action: 'menuPageSearchFiled'
                    }
                ]
            },
            {html:['<br>'].join("")},
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                items:[
                    {html:[' '].join(""), flex:.07},
                    {
                        xtype: 'button',
                        text:  'Wine Journal',
                        icon: 'resources/icons/myIcons/star26x26.png',
                        iconMask: true,
                        iconAlign: 'top',
                        height: '40%',
                        width: '30%',
                        flex: 3.2,
                        id:'Main-wineJournalButton-id',
                        action: 'Main_wineJournalButton'
                    },
                    {html:[''].join(""), flex:.5},
                    {
                        xtype: 'button',
                        text:  'Wine Picture',
                        icon: 'resources/icons/myIcons/Camera-icon-24.png',
                        iconMask: true,
                        flex: 3.2,
                        iconAlign: 'top',
                        action:'Main_WinePictureButton',
                        height: '40%',
                        width: '30%'
                    },
                    {html:[' '].join(""), flex:.07}
                ]
            },

            {html:['<br>'].join("")},
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                items:[
                    {html:[' '].join(""), flex:.07},
                    {
                        xtype: 'button',
                        text:  'Add Wine',
                        iconAlign: 'top',
                        height: '40%',
                        width: '30%',
                        flex: 3.2,
                        icon: 'resources/icons/myIcons/Coctail.png',
                        action:'Menu-addWineButton-id'
                    },
                    {html:[''].join(""), flex:.5},
                    {
                        xtype: 'button',
                        text:  'BAC Calculator',
                        height: '40%',
                        width: '30%',
                        flex: 3.2,
                        iconAlign: 'top',
                        action:'Main-bacCalculatorButton-id',
                        icon: 'resources/icons/myIcons/Runner.png'
                    },
                    {html:[' '].join(""), flex:.07}
                ]
            },
            {html:['<br>'].join("")},
            {
                xtype: 'container',
                layout: 'hbox',
                align: 'middle',
                items:[
                    {html:[' '].join(""), flex:.07},
                    {
                        xtype: 'button',
                        text:  'Add Winery',
                        iconCls: 'locate',
                        iconAlign: 'top',
                        flex: 3.2,
                        height: '40%',
                        width: '30%',
                        action:'Main-winerySearchButton-id'
                    },
                    {html:[''].join(""), flex:.5},
                    {
                        xtype: 'button',
                        text:  'About SipSip',
                        iconAlign: 'top',
                        flex: 3.2,
                        icon: 'resources/icons/myIcons/users-alt.png',
                        action:'Main-aboutUsButton-id',
                        height: '40%',
                        width: '30%'
                    },
                    {html:[' '].join(""), flex:.07}
                ]
            }

        ]
    }

})
