/**
 * Created with JetBrains PhpStorm.
 * Date: 4/15/13
 * Time: 12:53 AM
 */

Ext.define("SipSip.view.LoginPage",{

    extend: 'Ext.tab.Panel',
    requires: ['Ext.form.Panel' , 'Ext.TitleBar'],
    id: 'login-view-id',

    config :{

        fullscreen: true,
        tabBarPosition: 'bottom',
        items: [
            {
                title: 'Login',
                xtype: 'formpanel',
                iconCls: 'user',
                scrollable: true,

                items:[
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'SipSip'
                    },
                    {
                        margin: '4% 4% 10% 4%',
                        xtype: 'loginForm'
                    },
                    {
                        margin: '0 4% 2 4%',
                        xtype:  'button',
                        text:   'Login',
                        ui:     'confirm',
                        action: 'loginForm-loginButton-id'
                    },
                    {
                        margin: '0 4% 0 4%',
                        xtype: 'button',
                        text:  'Signup',
                        ui:    'action',
                        action:'loginForm-signupButton-id'
                    }
                ]
            }
        ]
    }
})
