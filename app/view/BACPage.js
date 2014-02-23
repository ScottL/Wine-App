/**
 * Created with JetBrains PhpStorm.
 * Date: 5/10/13
 * Time: 3:54 AM
 */
Ext.define("SipSip.view.BACPage",{

    extend: 'Ext.form.Panel',
    //xtype:  'loginForm',
    requires: ['Ext.form.FieldSet', 'Ext.field.Select' ],
    id:'bacPage-id',
    config:{
        fullscreen: true,
        cls: 'bacPage',
        scrollable: true,
        showAnimation:{
            type :'slide',direction : 'left', duration: 250
        },
        hideAnimation:{
            type :'slide',direction : 'right', out: true,duration: 260
        },
        items:[
            {
                xtype: 'titlebar',
                docked: 'top',
                //ui: 'light',
                title: 'BAC Calculator',
                items:[
                    { //back to main menu page
                        ui: 'back',
                        xtype: 'button',
                        text: 'Menu',
                        action: 'bac-backButton',
                        //id: 'bac-backButton-id',
                        cls: 'backBt'
                    }
                ]

            },
            {
                margin: '40 20 0 20',
                xtype: 'selectfield',
                name: 'sex',
                required: true,
                label: 'Sex',
                options: [
                    {text: 'Male',  value: 'male'},
                    {text: 'Female', value: 'female'}
                ],
                id: 'bac-sex-id',
                labelWidth: '55%'
            },
            {
                xtype: 'textfield',
                name: 'weight',
                placeHolder: 'Weight in Pounds',
                margin: '5 20 0 20',
                required: true,
                id: 'bac-weight-id'

            },


            {
                xtype:  'textfield',
                name: 'time',
                placeHolder:   'Drinking Duration in Hours',
                //ui:     'confirm',
                id: 'bac-time-id',
                //ui: 'round',
                margin: '5 20 0 20',
                required: true


            },
            {
                xtype: 'selectfield',
                label: 'Type of Alcohol',
                name: 'alcohol',
                options: [
                    {text: 'Beer',  value: '0'},
                    {text: 'Wine', value: '1'},
                    {text: 'Shot', value: '2'}
                ],
                id: 'bac-type-id',
                margin: '5 20 0 20',
                labelWidth: '55%',
                required: true
                
            },
            {
                xtype: 'selectfield',
                label: 'Consumed',
                name: 'amount',
                labelWidth: '55%',
                options: [
                    {text: '1', value: 1},
                    {text: '2', value: 2},
                    {text: '3', value: 3},
                    {text: '4', value: 4},
                    {text: '5', value: 5},
                    {text: '6', value: 6},
                    {text: '7', value: 7},
                    {text: '8', value: 8},
                    {text: '9', value: 9},
                    {text: '10', value: 10},
                    {text: '11', value: 11},
                    {text: '12', value: 12},
                    {text: '13', value: 13},
                    {text: '14', value: 14},
                    {text: '15', value: 15},
                    {text: '16', value: 16},
                    {text: '17', value: 17},
                    {text: '18', value: 18},
                    {text: '19', value: 19},
                    {text: '20', value: 20}
                ],
                id: 'bac-amount-id',
                margin: '5 20 0 20',
                required: true

            },
            {
                xtype:  'button',
                text:   'Calculate',
                ui:     'confirm',
                action: 'bac-calculate-id',
                margin: '35 20 0 20'
                
            },
            {
                xtype:  'button',
                text:   'Reset',
                ui:     'action',
                action: 'bac-reset-id',
                margin: '2 20 0 20'
                
            }
        ]
    }


})
