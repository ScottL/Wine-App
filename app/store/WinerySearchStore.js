/**
 * Created with JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 11:22 PM
 */
Ext.define('SipSip.store.WinerySearchStore', {
    extend: 'Ext.data.Store',
    requires: 'SipSip.model.WineInfoModel',

    config: {
        model: 'SipSip.model.WineryInfoModel',
        autoLoad: false,
        proxy:{
            type: 'ajax',
            //url:  'server/winery/searchWinery.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/winery/searchWinery.php',
            url:  'http://localhost/~huypham612/SipSip/server/winery/searchWinery.php',
            reader: {
                type: 'json'
            }
        }

    }
});
