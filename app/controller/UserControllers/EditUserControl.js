/**
 */

Ext.define('SipSip.controller.UserControllers.EditUserControl', { //control the menu page
    extend: 'Ext.app.Controller',
    requires: ['Ext.data.TreeStore'],
    config: {
        stores: ['UserProfileStore'],

        refs: {
            userPage: '#user-profile-id',
            userEditPage: '#editUser-id',
            nameField: '#editUser-username-id',
            pwField: '#editUser-password-id',
            verifyField: '#editUser-password2-id'
        },
        control: {
            "button[action=save-user-profile-edit-id]": {
                tap: 'saveData'
            },
            "button[action=reset-user-profile-edit]": {
                tap: 'resetFields'
            },
            "button[action=changeUserPicture_button]": {
                tap: 'changeUserPicture'
            }
        }
    },
    changeUserPicture: function(){
        Ext.Msg.alert('Under Development');
    },
    saveData: function () {
        var me = this;
        var username = me.getNameField().getValue();
        var pass = me.getPwField().getValue();
        var verify = me.getVerifyField().getValue();

        var store = Ext.getStore('UserProfileStore');
        var data = store.getData();
        var old_username = data.items[0].data.username;


        var flag = 0;         // 0 = no input; 1 = some input
        var params = {};

        if (pass) {
            if (!verify  ||  pass != verify) {
                Ext.Msg.alert('Passwords do not match');
                this.resetFields();
                return;
            }
            if (!this.editUserPassValidate(pass)) {
                Ext.Msg.alert('Invalid Password');
                this.resetFields();
                return;
            }
            params['password']= pass;
            flag =1;
        }
        if (username){
            if(!this.editUserNameValidate(username)) {
                Ext.Msg.alert('Invalid Username');
                this.resetFields();
                return;
            }
            if(username === old_username){
                Ext.Msg.alert('Same UserName');
                this.resetFields();
                return;
            }
            params['new_username']= username;
            flag =1;
        }

        if(flag){this.updateUserProfile(params);}
        else{
            Ext.Msg.alert("All Fields are Empty");
        }
    },

    updateUserProfile: function (param) {            //To avoid calling database twice.
        //Getting old username inorder to update new username in the users table:
        var me = this;
        var store = Ext.getStore('UserProfileStore');
        var data = store.getData();
        param['old_username'] = data.items[0].data.username;

        //console.log('store ', store);

        Ext.Ajax.request({
            //url: 'server/user/updateUserInfo.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/user/updateUserInfo.php',
            url: 'http://localhost/~huypham612/SipSip/server/user/updateUserInfo.php',
            params: param,
            success: function (response) {
                var text = response.responseText;
                if (text === 'Changes are Saved') {
                    me.resetFields();

                    if(param.new_username){ //update new username to store
                        var index = store.findExact('username', data.items[0].data.username);
                        var record = store.getAt(index);
                        record.set('username', param.new_username);
                    }

                }
                Ext.Msg.alert(text);
            },
            failure: function (response) {
                var text = response.responseText;
                Ext.Msg.alert(text);
            }
        });
    },

    editUserNameValidate: function (username) {
        var name_re = new RegExp("^[a-zA-Z0-9_-]{3,20}$");
        if (username) {
            return name_re.test(username);
        }
        return false;
    },

    editUserPassValidate: function (password) {
        var pass_re = new RegExp("^.{6,20}$");
        if (password) {
            return pass_re.test(password);
        }
        return false;
    },
    resetFields: function () {
        Ext.getCmp('editUser-id').reset();
    }
})
