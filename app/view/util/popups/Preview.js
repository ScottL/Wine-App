/**
 * Created with JetBrains PhpStorm.
 * Date: 5/14/13
 * Time: 4:53 AM
 */
Ext.define('SipSip.view.util.popups.Preview', {
    extend: 'Ext.Panel',
    id:  'preview-id',

    config: {
        title: 'Preview',
        floating: true,
        centered: true,
        modal:    true,
        hideOnMaskTap: true,
        scrollable: true,
        height:   '80%',
        width:    '100%',
        showAnimation: {type: 'pop'},
        fullscreen: true,
        //layout: 'hbox',

        items:
            [
                {
                    id: 'preview-review-id'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    docked: 'bottom',
                    margin: ' 0 0 5 0',
                    defaults:{
                        margin: '5 0 5 5',
                        docked: 'right'
                    },
                    items:[
                        {
                            xtype: 'button',
                            ui:'round',
                            text: 'FaceBook',
                            //width: '20%',
                            id: 'preview-facebookButton-id',
                            action: 'previewFaceBook'
                            //docked: 'right'
                        },
                        {
                            xtype: 'button',
                            ui:'round',
                            text: 'Submit',
                            //width: '20%',
                            id: 'preview-sumbitButton-id',
                            action: 'preview_submit'

                        },
                        {
                            xtype: 'button',
                            ui:'round',
                            text: 'Edit',
                            //width: '20%',
                            id: 'preview-EditButton-id',
                            action: 'preview_edit'

                        }
                    ]
                }
            ] //end items
    }//end config

});
