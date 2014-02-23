/**
 * Date: 4/18/13
 * Time: 11:42 PM
 */

Ext.define('SipSip.controller.UserControllers.UserPageControl',{ //control the user page
    extend: 'Ext.app.Controller',
    //requires: ['Ext.data.TreeStore'],
    config:{
        stores: ['UserProfileStore'],

        refs:{
            userProfile:   '#user-profile-id',
            userEditPage: '#editUser-id',
            managePostsPage: '#managePosts-id',
            main: '#mainPage-id',
            loginPage: '#login-view-id'
        },
        control:
        {
//            "button[action=managePostButton-id]": {
//                tap: 'showManagePostsPage'
//            },
            "button[action=editUserButton-id]": {
                tap: 'showUserEdit'
            },
            "button[action=userBackButton]": {
                tap: 'backToUserPage'
            },
            "button[action=managePostButton_button]": {
                tap: 'manageReview'
            },
            "button[action=logoutButton]": {
                tap: 'logout'
            }

        }
    },

    logout: function(){
        var me = this;
        var login = me.getLoginPage();
        var main = me.getMain();

        if(login){}  //in case if the page is already created
        else{
            login = Ext.create('SipSip.view.LoginPage');
            Ext.Viewport.add(login);
        }

        login.setShowAnimation({
            type :'flip' , duration: 250
        });
        main.setHideAnimation({
            type :'pop', duration: 260
        });
        main.destroy();
        login.show();
    },

    manageReview: function(){
        Ext.Msg.alert('Under Development');
    },

    backToUserPage: function(){
        var me = this;
        var userPage = me.getUserProfile();
        var main = me.getMain();
        me.getUserEditPage().hide();

        //Update picture here. Don't worry about this for now.

        userPage.show();
        main.setShowAnimation({
            type :'slide',direction : 'right', duration: 250
        });
        main.show();
    },
//    showManagePostsPage: function() {
//        var postsPage = this.getManagePostsPage();
//        if (postsPage){}
//        else{
//            postsPage = Ext.create('SipSip.view.ManagePosts');
//            Ext.Viewport.add(postsPage);
//        }
//        Ext.Viewport.setActiveItem(postsPage);
//    },

    showUserEdit: function(){
        var me = this;
        var editInfo = me.getUserEditPage();
        var main = me.getMain();

        if(editInfo){}  //in case if the page is already created
        else{
            editInfo = Ext.create('SipSip.view.UserPages.EditUser');
            Ext.Viewport.add(editInfo);
        }

        editInfo.setShowAnimation({
            type :'slide',direction : 'left', duration: 250
        });
        main.setHideAnimation({
            type :'slide',direction : 'left', out: true, duration: 260
        });
        main.hide();
        editInfo.show();

    }
})
