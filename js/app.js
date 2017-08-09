$(document).ready(function() {
    setTimeout(function () {
        $('body').show().addClass('animated fadeIn');}, 100
    );
    setTimeout(function () {
        $('.logo').show().addClass('animated bounceInDown');}, 200
    );
    setTimeout(function () {
        $('button').show().addClass('animated zoomIn');}, 500
    );

    setTimeout(function () {
        $('.txtbx').show().addClass('animated bounceInUp');}, 900
    );

    setTimeout(function () {
        $('button').show().removeClass('zoomin');}, 1500
    );
	setTimeout(function () {
        $('.subbtn').show().addClass('pulsethis');}, 1500
    );
});

//URL that is used to connect to rest/lcm/portal which does all the handling for sending pin and verifying it
var baseURL = "http://du-portal-lcm.mondiamedia.com";
//operator id in mondia media platform e.g. 5 for Du
var operatorId = "5";
//project id in mondia media platform e.g. 29 for Du My world project
var projectId = "29";
//event id used for tracking addon. by default is null
var sxid;
//promoter id used for tracking addon. by default is 0
var pcid = "0";
//redirect url after user subscribed successfully
var redirectUrlAfterSub = "http://google.ae";
//default url if subsribe user didn't work
var defaultUrl = "http://du-portal.mondiamedia.com/app/southasian/home?language=en";


// GET USER TOKEN
//=======================================================================

function getUserToken() {
    var userTokenText = document.getElementById('userToken').value;
    if (userTokenText !== null && userTokenText !== "") {
        console.log("UserToken: " + userTokenText);
        return userTokenText;
    }
    return null;
}

//Check HE
//===================================================================
function checkHE() {
    var subscriptionTypeId = document.getElementById('subscriptionTypeId').value;
    if (subscriptionTypeId !== null) {
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: baseURL + "/du-portal-lcm-v1/api/user/header/authorize/" + subscriptionTypeId,
            success: handleAjaxCheckHESuccess,
            error: handleAjaxErrorCheckHE
        });
    } else {
        alert("SubscriptionType is NULL");
    }
}


function handleAjaxCheckHESuccess(data, message, xhr) {
    var json = JSON.parse(xhr.responseText);
    var jsonResponse = JSON.stringify(json, undefined , 4);
    console.log(jsonResponse);
    document.getElementById('msisdn').value = json.msisdn;
    document.getElementById('userToken').value = json.access_token;

}

function handleAjaxErrorCheckHE(xhr, status, error) {
    console.log("Msisdn is not found in header.");
    displayWifiInput();
}


// SUB 3G
//=======================================================================

function subUser() {
    //get UserToken from hidden input
    var userToken = getUserToken();

    var subscriptionTypeId = document.getElementById('subscriptionTypeId').value;

    //get Msisdn from hidden input
    var msisdn = document.getElementById('msisdn').value;

    var e = getQueryString('sxid');
    if (e && e.length !== 0) {
        sxid = e;
    }
    var p = getQueryString('pcid');
    if (p && p.length !== 0) {
        pcid = p;
    }

    if ( userToken !== null && subscriptionTypeId !== null ) {

        var bodyParams = JSON.stringify({
            "msisdn": msisdn, //msisdn is optional since userToken is enough but put it anyway
            "subscriptionTypeId": subscriptionTypeId,
            "promoter": pcid, //Important
            "eventId": sxid, //Important
            "userAgent": navigator.userAgent
        });

        $.ajax({
            type: "POST",
            crossDomain: true,
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: bodyParams,
            dataType: 'json',
            url: baseURL +"/du-portal-lcm-v1/api/subscription/subscribe/" + subscriptionTypeId,
            success: handleAjaxSubSuccess,
            error: handleAjaxErrorSub
        });
    } else {
        console.log("UserToken or SubTypeId NULL");
    }
}

function handleAjaxSubSuccess(data, message, xhr) {
    var json = JSON.parse(xhr.responseText);
    var jsonResponse = JSON.stringify(json, undefined , 4);
    console.log(jsonResponse);
    window.location.replace(redirectUrlAfterSub);
}

function handleAjaxErrorSub(xhr, status, error) {
    console.log("Error in ajax: " +  xhr.responseText);
    window.location.replace(defaultUrl);
}



// SEND PIN AND SUB REQUEST
//=======================================================================

function sendPin() {
    var e = getQueryString('sxid');
    if (e && e.length !== 0) {
        sxid = e;
    }
    var p = getQueryString('pcid');
    if (p && p.length !== 0) {
        pcid = p;
    } else {
        pcid = 0;
    }
    var subscriptionTypeId = document.getElementById('subscriptionTypeId').value;

    var msisdn = document.getElementById('msisdn').value;

    if (subscriptionTypeId !== null && validateMsisdn()) {

        msisdn = "971" + msisdn.replace(/^[0]+/g,"").trim();

        var bodyParams = JSON.stringify({
            "msisdn": msisdn,
            "subscriptionTypeId": subscriptionTypeId,
            "promoter": pcid,
            "eventId": sxid,
            "redirectUrl": defaultUrl,
            "userAgent": navigator.userAgent
        });

        $.ajax({
            type: "POST",
            crossDomain: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: bodyParams,
            dataType: 'json',
            url: baseURL + "/du-portal-lcm-v1/api/subscription/subscribe/sendSubPin",
            success: handleAjaxSendPinSuccess,
            error: handleAjaxErrorSendPin
        })
    } else {
        console.log("Abort sending pin ");
    }
}

function handleAjaxSendPinSuccess(data, message, xhr) {
    var json = JSON.parse(xhr.responseText);
    var jsonResponse = JSON.stringify(json, undefined , 4);
    console.log(jsonResponse);
    document.getElementById('requestId').value = json.custRequestId;
    document.getElementById('otp').value = json.otp;
    displayOtpInput();
}

function handleAjaxErrorSendPin(xhr, status, error) {
    console.log(xhr.responseText);
    alert("Please Enter correct pin");
}




// VERIFY PIN AND SUBSCRIBE
//=======================================================================



function verifyPin() {
    var pin = $("#pin").val().trim();
    var requestId = $("#requestId").val().trim();
    if (pin != null && pin != "" && pin.length == 6 && requestId != null && requestId != "") {
        var bodyParams = JSON.stringify({"requestId" : requestId, "pin" : pin});
        $.ajax({
            type: "POST",
            crossDomain: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: bodyParams,
            dataType: 'json',
            url: baseURL + "/du-portal-lcm-v1/api/subscription/subscribe/verifyPinAndSubscribe",
            success: handleAjaxVerifyPinSuccess,
            error: handleAjaxErrorVerifyPin
        });
    } else {
        alert("Please enter correct pin");
    }
}

function handleAjaxVerifyPinSuccess(data, message, xhr) {
    var json = JSON.parse(xhr.responseText);
    var jsonResponse = JSON.stringify(json, undefined , 4);
    console.log(jsonResponse);
    if (json.text == "CREATE_SUB_OK") {
        window.location.replace(redirectUrlAfterSub);
    } else {
        alert("Pin is incorrect");
    }
}

function handleAjaxErrorVerifyPin(xhr, status, error) {
    console.log(xhr.responseText);
    alert("Pin is incorrect");
}

//===========================
//utils

function getQueryString ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
}



//===============================================================================================
// Handle UX

function displayWifiInput(){
    document.getElementById('defaultWrapper').style.display = "none";
    document.getElementById('wifiwrapper').style.display = "block";
}

function displayOtpInput(){
    //hide send pin stuff
    document.getElementById('wifiwrapper').style.display = "none";
    //display otp stuff
    document.getElementById('otpwrapper').style.display = "block";
}



//================================================================================================
// validate

function validateMsisdn(){

    var msisdn = document.getElementById('msisdn').value;
    if ((msisdn === null || msisdn.length === 0)) {
        alert("Please enter mobile number");
        return false;
    }

    msisdn = "971" + msisdn.replace(/^[0]+/g,"");

    if(!validatePhone(msisdn)){
        alert("Please Enter digits only");
        return false;
    }

    if (!(msisdn.length === 12)){
        alert("Please enter correct mobile number");
        return false;
    }

    return true;
}

function validatePhone(txtPhone) {
    var filter = /^[0-9-+]+$/;
    return filter.test(txtPhone);
}