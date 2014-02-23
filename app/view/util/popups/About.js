Ext.define('SipSip.view.util.popups.About', {
    extend: 'Ext.Panel',
    xtype: 'aboutpanel',
    id:  'about-id',

    config: {
        title: 'About',
        scrollable: true,
        floating: true,
        centered: true,
        hideOnMaskTap: true,
        modal: true,
        showAnimation: {type: 'slide', direction: 'left'},
        styleHtmlContent: true,
        iconCls: 'About',
        height: '80%',
        width: '100%',

        items:
            [
                {
                    html:[
                        '<h1 style="text-align: center"> SipSip </h1>',
                        '<p>Attribute based wine search, social wine ratings, and personal wine profile iPhone and web application. </p>',
                        '<h2 style="text-align: center"> Features </h2>',
                        '<p><b>Quicksearch:</b> Search for wine suggestions based on keywords right from the home page. </p>',
                        '<p><b>Wine Search:</b> Search for wines based on color, price, boldness, sweetness, and keywords. </p>',
                        '<p><b>Wine Journal:</b> Keep track of your favorite and wines and wineries. Also keep track of wines you would like to try and wineries you would like to visit.</p>',
                        '<p><b>Winery Search:</b> Search for wineries in your area manually or let Winebook create a wine tour for you.</p>',
                        '<p><b>Scan Barcode:</b> Search for a wine with your camera by scanning the barcode.</p>',
                        '<p><b>BAC Calculator:</b> Keep track of your blood alcohol content by entering your age, weight, number of drinks, and the time that you started drinking.</p>',
                        '<body style="background-color:LightSlateGray">',
                        '<h2 style="color:0066CC;text-align:center">Credits</h2>',
                        '<h3><b>Local Undergraduate Software House</b></h3>',
                        '<table border="1" bordercolor="#003399" style="background-color:#F0F0F0 " width="100%" cellpadding="3" cellspacing="3">',
                        '<tr>',
                        '<td><b>Name</td>',
                        '<td><b>Role</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Samuel Vange</td>',
                        '<td>Project Lead</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Wu Yen Lin</td>',
                        '<td>User Interface Specialist</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Mandeep Singh</td>',
                        '<td>Subject Matter Expert</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Huy Phuoc Pham </td>',
                        '<td>Software Development Lead</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Allen Nguyen</td>',
                        '<td>Algorithm Specialist</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Bryan Tran</td>',
                        '<td>Database Specialist</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Leif Alan Shoquist</td>',
                        '<td>Software Architect</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Alexander Ke</td>',
                        '<td>Senior System Analyst</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Khoa G Nguyen</td>',
                        '<td>Quality Assurance Lead</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Scott Lin</td>',
                        '<td>External API Expert</td>',
                        '</tr>',
                        '</table>'].join("")
                },
                {
                        xtype: 'button',
                        text:  'Close',
                        iconAlign: 'top',
                        height: '40%',
                        width: '100%',
                        flex: 3.2,
                        action:'About-close-id'
                }
            ] //end items
    }//end config

});