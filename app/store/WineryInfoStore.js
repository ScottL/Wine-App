/**
 * Created with JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 8:21 PM
 */
Ext.define('SipSip.store.WineryInfoStore', {
    extend: 'Ext.data.Store',
    requires: 'SipSip.model.WineInfoModel',

    config: {
        model: 'SipSip.model.WineryInfoModel',
        autoLoad: false,
        proxy:{
            type: 'ajax',
            //url:  'server/winery/getWineryInfo.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/winery/getWineryInfo.php',
            url:  'http://localhost/~huypham612/SipSip/server/winery/getWineryInfo.php',
            reader: {
                type: 'json'
            }
        }

    }
});
