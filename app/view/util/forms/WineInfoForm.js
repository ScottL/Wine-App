/**
 * Created with JetBrains PhpStorm.
 * Date: 5/22/13
 * Time: 4:52 PM
 */
Ext.define("SipSip.view.util.forms.WineInfoForm",{

    extend: 'Ext.form.Panel',
    //extend: 'Ext.form.FieldSet',
    xtype:  'wineInfoForm',
    id:  'wineInfoForm_id',
    config:{
        fullscreen: true,
        //title: 'Add Custom Wine',
        items:[
            {
               html: '<p><b>Add Custom Wine</b></p>'
            },
            {
                xtype: 'textfield',
                name : 'wineName',
                placeHolder: 'Wine Name',
                required: true
            },
            {
                xtype: 'textfield',
                name : 'picture',
                placeHolder: 'Wine Picture'
            },
            {
                xtype: 'textfield',
                name : 'winery',
                placeHolder: 'Winery'
            },
            {
                xtype: 'textfield',
                name : 'varietal',
                placeHolder: 'Varietal'
            },
            {
                xtype: 'textfield',
                name : 'vintage',
                placeHolder: 'Vintage'
            },
            {
                xtype: 'textfield',
                name : 'releasePrice',
                placeHolder: 'Release Price'
            },
            {
                xtype: 'textfield',
                name : 'casesMade',
                placeHolder: 'Cases Made'
            },
            {
                xtype: 'selectfield',
                label: 'Type',
                name: 'type',
                labelWidth: '55%',
                options: [
                    {text: 'Red', value: 'Red'},
                    {text: 'White', value: 'White'},
                    {text: 'Dessert', value: 'Dessert'},
                    {text: 'Fortified', value: 'Fortified'},
                    {text: 'Sparkling', value: 'Sparkling'},
                    {text: 'Rose', value: 'Rose'},
                    {text: 'Other', value: 'Other'}
                ]
            },
            {
                xtype: 'selectfield',
                label: 'Enthusiast Score',
                name: 'enthusiast',
                labelWidth: '55%',
                options: [
                    {text: '0', value: 0},
                    {text: '1', value: 1},
                    {text: '2', value: 2},
                    {text: '3', value: 3},
                    {text: '4', value: 4},
                    {text: '5', value: 5},
                    {text: '6', value: 6},
                    {text: '7', value: 7},
                    {text: '8', value: 8},
                    {text: '9', value: 9},
                    {text: '10', value: 10}
                ]
            },
            {
                xtype: 'selectfield',
                label: 'Spectator Score',
                name: 'spectator',
                labelWidth: '55%',
                options: [
                    {text: '0', value: 0},
                    {text: '1', value: 1},
                    {text: '2', value: 2},
                    {text: '3', value: 3},
                    {text: '4', value: 4},
                    {text: '5', value: 5},
                    {text: '6', value: 6},
                    {text: '7', value: 7},
                    {text: '8', value: 8},
                    {text: '9', value: 9},
                    {text: '10', value: 10}
                ]
            },
            {
                xtype: 'selectfield',
                label: 'Advocate Score',
                name: 'advocate',
                labelWidth: '55%',
                options: [
                    {text: '0', value: 0},
                    {text: '1', value: 1},
                    {text: '2', value: 2},
                    {text: '3', value: 3},
                    {text: '4', value: 4},
                    {text: '5', value: 5},
                    {text: '6', value: 6},
                    {text: '7', value: 7},
                    {text: '8', value: 8},
                    {text: '9', value: 9},
                    {text: '10', value: 10}
                ]
            },
            {
                xtype: 'selectfield',
                label: 'Sweetness',
                name: 'sweetness',
                labelWidth: '55%',
                options: [
                    {text: '0', value: 0},
                    {text: '1', value: 1},
                    {text: '2', value: 2},
                    {text: '3', value: 3},
                    {text: '4', value: 4},
                    {text: '5', value: 5},
                    {text: '6', value: 6},
                    {text: '7', value: 7},
                    {text: '8', value: 8},
                    {text: '9', value: 9},
                    {text: '10', value: 10}
                ]
            },
            {
                xtype: 'selectfield',
                label: 'Boldness',
                name: 'boldness',
                labelWidth: '55%',
                options: [
                    {text: '0', value: 0},
                    {text: '1', value: 1},
                    {text: '2', value: 2},
                    {text: '3', value: 3},
                    {text: '4', value: 4},
                    {text: '5', value: 5},
                    {text: '6', value: 6},
                    {text: '7', value: 7},
                    {text: '8', value: 8},
                    {text: '9', value: 9},
                    {text: '10', value: 10}
                ]
            },
            {
                xtype: 'button',
                text: 'Add',
                action: 'addWineCarousel_addButton',
                id:'wineInfoForm_addButton',
                margin: '3% 4% 0 4%'
            },
            {
                xtype: 'button',
                text: 'Reset',
                action: 'addWineCarousel_resetButton',
                margin: '0 4% 0 4%'
            }
        ]
    }
})
