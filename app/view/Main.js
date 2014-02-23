Ext.define('SipSip.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: ['Ext.TitleBar', 'Ext.layout.*', 'Ext.field.Search'],
    id:  'mainPage-id',
    config: {
        tabBarPosition: 'bottom',
        defaults:{
            styleHtmlContent: true,
            tabBarPosition: 'bottom'
        },
        items: [
            {
                xtype: 'menu',
                title: 'Menu',
                iconCls: 'home'
                //ui: 'light'
            },
            {
                title: 'User',
                iconCls: 'user',
                //html: 'Home Screen'
                xtype: 'userPage'
            }

        ]
    }
});
