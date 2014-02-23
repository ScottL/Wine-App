Ext.define("SipSip.view.UserPages.EditUser", {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.FieldSet', 'Ext.field.Select' ],
    id: 'editUser-id',
    config: {
        showAnimation:{
            type :'slide',direction : 'left', duration: 250
        },
        hideAnimation:{
            type :'slide',direction : 'right', out: true,duration: 260
        },
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Edit Info',
                items:[
                    {
                        xtype: 'button',
                        text: 'User',
                        action: 'userBackButton',
                        cls: 'backBt',
                        ui: 'back'
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                id: 'editUser-hbox-id',
                items: [
                    {
                        xtype: 'image',
                        docked: 'left',
                        width: '30%',
                        //height: '40%',
                        margin: '30 0 0 0',
                        id:    'editUser-image-id',
                        src: 'resources/icons/myIcons/user64x64.jpg'
                        //flex: 1
                    },
                    {
                        xtype: 'button',
                        text: 'Change Picture',
                        margin: '50 5 5 5',
                        action: 'changeUserPicture_button'

                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Personal Information',
                //instructions: 'Tap to edit your information',
                style: {
                    'margin-top': '5px'
                },
                items: [
                    {
                        xtype: 'textfield',
                        id: 'editUser-username-id',
                        placeHolder: 'New Username'
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'New Password',
                        id: 'editUser-password-id'
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Confirm New Password',
                        id: 'editUser-password2-id',
                        required: true
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Save',
                margin: '0 10 0 10',
                action: 'save-user-profile-edit-id',
                ui: 'confirm'

            },
            {
                xtype: 'button',
                text: 'Reset',
                margin: '2 10 5 10',
                action: 'reset-user-profile-edit',
                ui:'action'
            }
        ]
    }
});