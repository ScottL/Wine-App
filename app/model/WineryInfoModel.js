/**
 * Created with JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 8:08 PM
 */
Ext.define('SipSip.model.WineryInfoModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'address',  type: 'string'},
            {name: 'city',  type: 'string'},
            {name: 'state',  type: 'string'},
            {name: 'zipCode',  type: 'string'},
            {name: 'country',  type: 'string'},
            {name: 'phone',    type: 'string'},
            {name: 'fax',    type: 'string'},
            {name: 'website',    type: 'string'},
            {name: 'email',    type: 'string'},
            {name: 'owners',    type: 'string'},
            {name: 'wineMakers',    type: 'string'},
            {name: 'businessHours',    type: 'string'},
            {name: 'varietalsGrown',    type: 'string'},
            {name: 'picture',    type: 'string'},
            {name: 'iwineId',    type: 'string'},
            {name: 'name',    type: 'string'},
            {name: 'created', type: 'string'},
            {name: 'wineryId', type: 'string'}
        ]
    }
});
