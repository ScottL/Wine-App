/**
 * Created with JetBrains PhpStorm.
 * Date: 4/19/13
 * Time: 12:30 AM
 */

Ext.define('SipSip.model.WineInfoModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'winery',  type: 'string'},
            {name: 'varietal',    type: 'string'},
            {name: 'varietalType',    type: 'string'},
            {name: 'vintage',    type: 'string'},
            {name: 'releasePrice',    type: 'string'},
            {name: 'casesMade',    type: 'string'},
            {name: 'wineEnthusiastScore',    type: 'string'},
            {name: 'wineSpectatorScore',    type: 'string'},
            {name: 'wineAdvocateScore',    type: 'string'},
            {name: 'picture',    type: 'string'},
            {name: 'iwineId',    type: 'string'},
            {name: 'wineId',    type: 'string'},
            {name: 'name',    type: 'string'},
            {name: 'sweetness', type: 'string'},
            {name: 'boldness', type: 'string'},
            {name: 'created', type: 'string'}
        ]
    }
});
