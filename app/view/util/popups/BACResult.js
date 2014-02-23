/**
 * Created with JetBrains PhpStorm.
 * Date: 5/12/13
 * Time: 12:12 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('SipSip.view.util.popups.BACResult', {
    extend: 'Ext.Panel',
    id:  'BACResult-id',

    config: {
        title: 'BAC Result',
        scrollable: true,
        floating: true,
        centered: true,
        hideOnMaskTap: true,
        modal: true,
        showAnimation: {type: 'pop'},
        styleHtmlContent: true,
        //iconCls: 'BACResult',
        height: '45%',
        width: '100%',

        items:
            [
                {
                    xtype: 'container',
                    layout:{
                        type: 'hbox',
                        align: 'middle'
                    },
                    items:[
                        {
                            xtype: 'image',
                            id: 'bacPopup-image-id',
                            flex: 1,
                            margin: '0 0 5 0',
                            height: 72,
                            width: 72
                        },
                        {
                            //Message and BAC Result will be update in BACControl
                            id: 'bacPopup-result-id',
                            flex: 1.5
                        }
                    ]
                },
                {
                    html: '<br><i>Data collected from www.brad21.org</i>'
                }

            ] //end items
    }//end config

});
