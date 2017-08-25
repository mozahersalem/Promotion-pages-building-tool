function subscribe() {

    /********************************************************************************
    ********************************************************************************
    ********************************************************************************
    **********************  change this variables ONLY  ****************************
    ********************************************************************************
    ********************************************************************************
    ********************************************************************************/
    
    
    var sublink = 'http://igames.ae/mobileportal/promo/landing/ooredoo-oman/igames/igames-direct.jsp?';
    
    var redirect_when_wifi = 'http://camp.igames.ae/';
    
    var redirect_after_subscribtion = 'http://camp.igames.ae/';
    
    var image_link = 'http%3A%2F%2Fdu-camp.mondiamediamena.com%2Fassets%2Fimg%2FDMC-11%2Fbg.jpg';
    
    var redirect_after_thank_you_page =  'http%3A%2F%2Figames.ae%2Fweb%2Fdu%2Fhome';

    /********************************************************************************
    ********************************************************************************
    ********************************************************************************
    **********************  change above variables ONLY  ****************************
    ********************************************************************************
    ********************************************************************************
    ********************************************************************************/



    var getQueryString = function (field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    };


    //Only wifi
    if (isWifiPage()) {
        console.log("This page is wifi")
            if (validateMsisdn()) {
                msisdn = document.getElementById('msisdn').value;
                if (!msisdn.startsWith("968")) {
                    msisdn = "968" + msisdn.replace(/^[0]+/g, "").trim();
                }
                sublink += "msisdn=" + msisdn;
            } else {
                return false;
            }
           
        // sublink += "msisdn=96897277945"; 
    } else {
        // wifi page link
        sublink += 'wifiRedirect=' + redirect_when_wifi;
    }

    var sublink;
 

    // thank you page link
    sublink += '&isty=true&';
    sublink += '&image=' + image_link; 
    sublink += '&cgredirect=' + redirect_after_subscribtion;
    sublink += '&redirectAfterTY=' + redirect_after_thank_you_page;

    var pcid = getQueryString('pcid');
    if (pcid && pcid.length !== 0) {
        sublink += '&pcid=' + pcid;
    }
    var sxid = getQueryString('sxid');
    if (sxid && sxid.length !== 0) {
        sublink += '&mobtag=' + sxid;
    }


    location.replace(sublink);
}


function isWifiPage() {
    return document.getElementById('msisdn');
}

//================================================================================================
// validate

function validateMsisdn(){

    var msisdn = document.getElementById('msisdn').value;
    if ((msisdn === null || msisdn.length === 0)) {
        alert("Please enter mobile number");
        return false;
    }

    if(!validatePhone(msisdn)){
        alert("Please Enter digits only");
        return false;
    }

    if (!(msisdn.length === 11)){
        alert("Please enter correct mobile number");
        return false;
    }
    return true;
}

function validatePhone(txtPhone) {
    var filter = /^[0-9-+]+$/;
    return filter.test(txtPhone);
}