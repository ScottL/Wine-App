/**
 * Created with JetBrains PhpStorm.
 * Date: 4/20/13
 * Time: 2:48 AM
 */
Ext.define('SipSip.store.quickSearchResultStore', {
    extend: 'Ext.data.TreeStore',   //for the nested list
    requires: 'SipSip.model.quickSearchResultModel',

    config: {
        model: 'SipSip.model.quickSearchResultModel',
        autoLoad: false,
        defaultRootProperty: 'text',
        proxy:{
            type: 'ajax',
            //url:  'server/quickSearch.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/quickSearch.php',
            url:  'http://localhost/~huypham612/SipSip/server/quickSearch.php',
            reader: {
                type: 'json'
            }
        }

    }
});
