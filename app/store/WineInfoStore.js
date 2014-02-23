/**
 * Created with JetBrains PhpStorm.
 * Date: 4/19/13
 * Time: 9:31 PM
 */

Ext.define('SipSip.store.WineInfoStore', {
    extend: 'Ext.data.Store',
    requires: 'SipSip.model.WineInfoModel',

    config: {
        model: 'SipSip.model.WineInfoModel',
        autoLoad: false,
        proxy:{
            type: 'ajax',
            //url:  'server/getWineInfo.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/getWineInfo.php',
            url:  'http://localhost/~huypham612/SipSip/server/getWineInfo.php',
            reader: {
                type: 'json'
            }
        }

    }
});
