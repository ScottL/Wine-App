/**
 * Created with JetBrains PhpStorm.
 * Date: 4/15/13
 * Time: 12:53 AM
 */
Ext.define("SipSip.view.util.tabs.UserProfile", {
    extend: 'Ext.form.Panel',
    requires: ['Ext.dataview.*', 'Ext.form.FieldSet'],
    id: 'user-profile-id',
    xtype: 'userPage',
    config: {

        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'My Info'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                id: 'user-hbox-id',
                items: [
                    {
                        xtype: 'image',
                        docked: 'left',
                        width: '35%',
                        //flex: 1,
                        margin: '10 20 0 5',
                        id:    'imgurl-id',
                        src: 'resources/icons/myIcons/user64x64.jpg'
                    },
                    {
                        //width: '60%',
                        id: 'userProfile-info-id'

                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '20% 1% 5 1%',
                items:[
                    {
                        xtype: 'button',
                        text: 'Manage Reviews',
                        action: 'managePostButton_button',
                        ui: 'confirm',
                        margin: '0 2 0 0',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        text: 'Edit Profile',
                        action: 'editUserButton-id',
                        ui: 'confirm',
                        flex: 1
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Log Out',
                margin: '0 1% 0 1%',
                action: 'logoutButton',
                ui:'action'
            }
        ]
    }
});
