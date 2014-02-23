/**
 * Created with JetBrains PhpStorm.
 * Date: 4/16/13
 * Time: 9:14 PM
 */
Ext.define('SipSip.model.UserProfile', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'username',  type: 'string'},
            //{name: 'password',  type: 'string'},
            {name: 'favWines',    type: 'string'},
            {name: 'wineTried',        type: 'string'},
            {name: 'favWineries', type: 'string'},
            {name: 'visited',      type: 'string'},
            {name: 'reviews',          type: 'string'}
        ]
    }
});





