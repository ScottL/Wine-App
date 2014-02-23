/**
 * Created with JetBrains PhpStorm.
 * Date: 4/16/13
 * Time: 9:19 PM
 */
Ext.define('SipSip.store.UserProfileStore', {
    extend: 'Ext.data.Store',
    requires: 'SipSip.model.UserProfile',

    config: {
        model: 'SipSip.model.UserProfile',
        autoLoad: false,
        proxy:{
            type: 'ajax',
            //url:  'server/user/getProfile.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/user/getProfile.php',
            url:  'http://localhost/~huypham612/SipSip/server/user/getProfile.php',
            reader: {
                type: 'json'
            }
        }

    }
});
