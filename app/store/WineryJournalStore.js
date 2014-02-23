/**
 * Created with JetBrains PhpStorm.
 * Date: 5/29/13
 * Time: 11:52 PM
 */
Ext.define('SipSip.store.WineryJournalStore', {
    extend: 'Ext.data.Store',
    requires: 'SipSip.model.WineryInfoModel',

    config: {
        model: 'SipSip.model.WineryInfoModel',
        autoLoad: false,
        sorters: 'name',
        grouper: {
            groupFn: function(record) {
                return record.get('name')[0];
            }
        },
        proxy:{
            type: 'ajax',
            //url:  'server/journal/getJournalWinery.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/journal/getJournalWinery.php',
            url:  'http://localhost/~huypham612/SipSip/server/journal/getJournalWinery.php',
            reader: {
                type: 'json'
            }
        }

    }
});
