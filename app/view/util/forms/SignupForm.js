/**
 * Created with JetBrains PhpStorm.
 * Date: 9/22/12
 * Time: 1:04 AM
 */
Ext.define("SipSip.view.util.forms.SignupForm",{
    extend: 'Ext.Panel',
    xtype: 'signupForm',
    requires: [ 'Ext.form.FieldSet',
                'Ext.field.Password'
              ],
    config:{

        items: [
            {
                xtype: 'fieldset',
                id:    'signupForm-id',
                title: 'Sign Up',
                items:[
                    {
                        xtype: 'textfield',
                        name:  'username',
                        placeHolder: 'Username: Minimum of 3 chars'
                    },
                    {
                        xtype: 'passwordfield',
                        name:  'password',
                        placeHolder: 'Password: Minimum of 6 chars'
                    },
                    {
                        xtype: 'passwordfield',
                        name:  'verify',
                        placeHolder: 'Verify Password'
                    }
                ]
            }


        ]
    }
});
