/**
 * Created with JetBrains PhpStorm.
 * Date: 9/22/12
 * Time: 2:16 AM
 */
Ext.define("SipSip.view.SignupView",{
    extend: 'Ext.tab.Panel',
    requires: ['Ext.form.Panel', 'Ext.TitleBar'],
    id: 'signup-view-id',
    xtype: 'signup-page',
    config :{

        showAnimation: {
            type:     'pop',
            duration: 250
        },
        fullscreen: true,
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Signup',
                xtype: 'formpanel',
                iconCls: 'user',
                scrollable: true,

                items:[
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'New User Account'
                    },
                    //{html: ['<br><br>'].join("")},   //To put space between title bar and the form
                    {
                        margin: '0 0% 7% 0',
                        xtype: 'signupForm'

                    },
                    {
                        xtype: 'button',
                        text:  'Submit',
                        cls:   'submitButton-cls',
                        ui:    'confirm',
                        action:'submitButton-id',
                        margin: '0 4% 2 4%'
                    },
                    {
                        xtype: 'button',
                        text:  'Cancel',
                        ui:    'action',
                        margin: '0 4% 0 4%',
                        action:'SignupForm-cancelButton-id'
                    }

                ]
            }
        ]
    }
});
