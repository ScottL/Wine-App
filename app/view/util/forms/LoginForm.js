/**
 * Created with JetBrains PhpStorm.
 * Date: 4/15/13
 * Time: 12:50 AM
 */


Ext.define("SipSip.view.util.forms.LoginForm",{

    extend: 'Ext.form.FieldSet',
    xtype:  'loginForm',
    requires: ['Ext.form.FieldSet','Ext.field.Password' ],

    config:{
        id:  'loginForm-id',
        title: 'Login',
        items: [
            {
                xtype: 'textfield',
                name:  'username',
                placeHolder: 'Username',
                value: 'huy'
            },
            {
                xtype: 'passwordfield',
                name:  'password',
                placeHolder: 'Password',
                value: '1234567'
            }

        ]
    }

})
