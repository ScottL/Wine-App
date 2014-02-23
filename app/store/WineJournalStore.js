/**
 * Created with JetBrains PhpStorm.
 * Date: 5/20/13
 * Time: 11:57 PM
 */
Ext.define('SipSip.store.WineJournalStore', {
    extend: 'Ext.data.Store',
    requires: 'SipSip.model.WineInfoModel',

    config: {
        model: 'SipSip.model.WineInfoModel',
        autoLoad: false,
        sorters: 'name',
        grouper: {
            groupFn: function(record) {
                return record.get('name')[0];
            }
        },
        proxy:{
            type: 'ajax',
            //url:  'server/journal/getJournalWine.php',
            //url: 'http://huyphamucsd.com/iphoneapps/SipSip/server/journal/getJournalWine.php',
            url:  'http://localhost/~huypham612/SipSip/server/journal/getJournalWine.php',
            reader: {
                type: 'json'
            }
        }

    }
});
