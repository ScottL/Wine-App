/**
 * Created with JetBrains PhpStorm.
 * Date: 4/16/13
 * Time: 10:30 PM
 */

Ext.define('SipSip.controller.LoginControl',{
    extend: 'Ext.app.Controller',

    config:{
        stores: ['UserProfileStore'],
        refs:{
            loginView:    '#login-view-id',
            signupView:   '#signup-view-id',
            signupForm:   '#signupForm-id',
            loginForm:    '#loginForm-id',
            userInfo:     '#userProfile-info-id'
        },
        control: {
            "button[action=loginForm-loginButton-id]": {
                tap: 'login'
            },
            "button[action=loginForm-signupButton-id]": {
                tap: 'showSignupForm'
            },
            "button[action=submitButton-id]": {
                tap: 'createNewUser'
            },
            "button[action=SignupForm-cancelButton-id]": {  //cancel button in SignupView.js
                tap: 'showLoginForm'
            }
        }
    },

    /**
     * Go to Main Page after user has successfully logged in
     * @param username
     */
    toMainPage: function(username){
        var me = this;

        me.getLoginView().destroy();
        var mainPage = Ext.create('SipSip.view.Main');
        Ext.Viewport.add(mainPage);

        //Update user info in UserProfile:
        var infoTemp = me.getUserInfo();
        var tpl = new Ext.XTemplate(     //template to be updated
            '<tpl for=".">',
            '<table class=\"userInfoTable\">',
            '<caption><b>{wineName}</b></caption>',
            '<tr><td class=\"leftSideofUserTable\">Favorite Wines     </td> <td class=\"rightSideofUserTable\">{favWines}     </td>  </tr>',
            '<tr><td class=\"leftSideofUserTable\">Wines Tried        </td> <td class=\"rightSideofUserTable\">{wineTried}         </td>  </tr>',
            '<tr><td class=\"leftSideofUserTable\">Favorite Wineries  </td> <td class=\"rightSideofUserTable\">{favWineries}  </td>  </tr>',
            '<tr><td class=\"leftSideofUserTable\">Wineries Visited   </td> <td class=\"rightSideofUserTable\">{visited}       </td>  </tr>',
            '<tr><td class=\"leftSideofUserTable\">Reviews            </td> <td class=\"rightSideofUserTable\">{reviews}           </td>  </tr>',
            '</table>',
            '</tpl>'
        );
        Ext.getStore('UserProfileStore').getProxy().setExtraParams({username: username});
        var store = Ext.getStore('UserProfileStore');
        //console.log("name = ", username);
        store.load({
            callback: function(records, operation, successful) {
                if(successful){
                    //console.log("rec ", records);
                    var info = Ext.apply(records[0].data);
                    infoTemp.updateHtml(tpl.applyTemplate(info));

//                    if(records[0].data.picture != ''){ //when there is an image
//                        picture.setSrc(records[0].data.picture.replace(/\\/g,""));
//                        picture.setHidden(false);
//                    }
//                    else{
//                        picture.setHidden(true);
//                    }
                }
                else{ //failed to connect: set all to 0
                    infoTemp.updateHtml(tpl.applyTemplate({'favWines': 0, 'wineTried': 0, 'favWineries': 0, 'visited': 0, 'reviews': 0 }));
                }

            }
        });//end loading
        Ext.Viewport.setActiveItem(mainPage);
    },


    /**
     * Called by createNewUser after user signed up
     * Called by the cancel button in SignupView.js
     */
    showLoginForm: function(){
        var me = this;
        me.getSignupView().destroy();
        var loginView = me.getLoginView();
        loginView.setShowAnimation({
            type:      'slide',
            direction: 'right',
            duration:  250
        });
        Ext.Viewport.setActiveItem(loginView);  //better than show()

    },
    createNewUser: function(){
        var me = this;
        var signupForm = me.getSignupForm();
        var username = signupForm.items.items[0]._value;
        var pass = signupForm.items.items[1]._value;
        var verify = signupForm.items.items[2]._value;
        if(this.myValidate(username,pass,verify)){
            var params = {
                username: username,
                password: pass
            };
            Ext.Ajax.request({
                //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/signup.php',
                //url: 'server/signup.php',
                url :'http://localhost/~huypham612/SipSip/server/signup.php',
                params: params,
                success: function(response){
                    var text = response.responseText;
                    if(text === 'Signup Succeeded'){
                        me.showLoginForm();

                    }
                    Ext.Msg.alert(text);

                },
                failure : function(response) {
                    var text = response.responseText;
                    Ext.Msg.alert(text);
                }
            });
        }
        else{
            Ext.Msg.alert('Invalid Signup Information')
        }
    },
    showSignupForm: function(){

        var me = this;
        me.getLoginView().hide();
        var signupView = Ext.create('SipSip.view.SignupView');
        Ext.Viewport.add(signupView);
        Ext.Viewport.setActiveItem(signupView);

    },
    login: function(){
        var me = this;
        var loginForm = me.getLoginForm();
        var username = loginForm.items.items[0]._value;
        var pass = loginForm.items.items[1]._value;
        var name_re = new RegExp("^[a-zA-Z0-9_-]{3,20}$");
        var pass_re = new RegExp("^.{6,20}$");
        if(!name_re.test(username)){
            Ext.Msg.alert('Invalid Username');
        }
        else if(!pass_re.test(pass)){
            Ext.Msg.alert('Invalid Password');
        }
        else{
            var params = {
                username: username,
                password: pass
            };
           Ext.Ajax.request({
               //url: 'server/login.php',
               //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/login.php',
               url: 'http://localhost/~huypham612/SipSip/server/login.php',
               params: params,
               success: function(response){
                   var text = response.responseText;
                   //console.log('passed: ', text);
                   if(text === 'Login Succeeded'){
                       me.toMainPage(username);
                   }
                   else{
                       Ext.Msg.alert(text);
                   }
               },
               failure : function(response) {
                   var text = response.responseText;
                   Ext.Msg.alert(text);
               }
           });
        }

    },
    /**
     * Return true if username and password are valid.
     * @param username
     * @param pass
     * @param verify
     * @return {Boolean}
     */
    myValidate: function(username,pass,verify){
        var name_re = new RegExp("^[a-zA-Z0-9_-]{3,20}$");
        var pass_re = new RegExp("^.{6,20}$");
        if(username && pass && verify && (pass == verify)){
            if(!name_re.test(username)){return false;}
            if(!pass_re.test(pass)){return false;}
            return true;
        }
        return false;
    }

});
