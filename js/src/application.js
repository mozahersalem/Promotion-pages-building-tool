$(document).ready(function() {
    setTimeout(function () {
        $('.logo').show().addClass('animated fadeInDown');}, 100
    );
    setTimeout(function () {
        $('.bg_img').show().addClass('animated fadeInRight');}, 100
    );
    // setTimeout(function () {
    //     $('.series').show().addClass('animated animateBG');}, 100
    // );
    setTimeout(function () {
        $('h1').show().addClass('animated fadeInDown');}, 500
    );
    setTimeout(function () {
        $('p').show().addClass('animated fadeInDown');}, 900
    );
    setTimeout(function () {
        $('#subBtn').show().addClass('animated fadeInDown');}, 1300
    );
    setTimeout(function () {
        $('.step1').show().addClass('animated fadeInDown');}, 200
    );
    setTimeout(function () {
        $('.step2').show().addClass('animated fadeInDown');}, 400
    );
    setTimeout(function () {
        $('.step3').show().addClass('animated fadeInDown');}, 600
    );
    setTimeout(function () {
        $('.step4').show().addClass('animated fadeInDown');}, 800
    );
    setTimeout(function () {
        $('.step5').show().addClass('animated fadeInDown');}, 1000
    );
    setTimeout(function () {
        $('.step6').show().addClass('animated fadeInDown');}, 1200
    );
    setTimeout(function () {
        $('.step7').show().addClass('animated fadeInDown');}, 1400
    );
    setTimeout(function () {
        $('.step8').show().addClass('animated fadeInDown');}, 1600
    );
    setTimeout(function () {
        $('.step9').show().addClass('animated fadeInDown');}, 1800
    );
});


// //URL that is used to connect to rest/lcm/portal which does all the handling for sending pin and verifying it
// var baseURL = "http://du-portal-lcm.mondiamedia.com";
// //operator id in mondia media platform e.g. 5 for Du
// var operatorId = "5";
// //project id in mondia media platform e.g. 29 for Du My world project
// var projectId = "29";
// //event id used for tracking addon. by default is null
// var sxid;
// //promoter id used for tracking addon. by default is 0
// var pcid = "0";
// //redirect url after user subscribed successfully
// var redirectUrlAfterSub = "http://du-camp.mondiamediamena.com/vd/16052017/ar/success.html";
// //default url if subsribe user didn't work
// var defaultUrl = "http://du-portal.mondiamedia.com/app/inc/video?keyword=ar";


// // GET USER TOKEN
// //=======================================================================

// function getUserToken() {
//     var userTokenText = $("#userToken").val();
//     if (userTokenText != null && userTokenText != "") {
//         console.log("UserToken: " + userTokenText);
//         return userTokenText;
//     }
//     return null;
// }

// //Check HE
// //===================================================================
// function checkHE() {
//     var subscriptionTypeId = document.getElementById('subscriptionTypeId').value;
//     if (subscriptionTypeId != null) {
//         $.ajax({
//             type: "GET",
//             crossDomain: true,
//             url: baseURL + "/du-portal-lcm-v1/api/user/header/authorize/" + subscriptionTypeId,
//             success: function (msg) {
//                 var jsonResponse = JSON.stringify(msg, undefined , 4);
//                 console.log(jsonResponse);
//                 $("#msisdn").val(msg.msisdn);
//                 $("#userToken").val(msg.access_token);
//             }
//         }).fail(function () {
//             console.log("Msisdn is not found in header. Redirect");
//             window.location.replace(defaultUrl);
//         });
//     } else {
//         alert("SubscriptionType is NULL");
//     }
// }

// // SUB 3G
// //=======================================================================

// function subUser() {
//     //get UserToken from hidden input
//     var userToken = getUserToken();
//     //get Msisdn from hidden input
//     var msisdn = $("#msisdn").val().trim();
//     var e = getQueryString('sxid');
//     if (e && e.length !== 0) {
//         sxid = e;
//     }
//     var p = getQueryString('pcid');
//     if (p && p.length !== 0) {
//         pcid = p;
//     }
//     var subscriptionTypeId = document.getElementById('subscriptionTypeId').value;

//     if ( userToken != null && subscriptionTypeId != null ) {

//         var bodyParams = JSON.stringify({
//             "msisdn": msisdn, //msisdn is optional since userToken is enough but put it anyway
//             "subscriptionTypeId": subscriptionTypeId,
//             "promoter": pcid, //Important
//             "eventId": sxid, //Important
//             "userAgent": navigator.userAgent
//         });

//         $.ajax({
//             type: "POST",
//             crossDomain: true,
//             headers: {
//                 'Authorization': 'Bearer ' + userToken,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             data: bodyParams,
//             dataType: 'json',
//             url: baseURL +"/du-portal-lcm-v1/api/subscription/subscribe/" + subscriptionTypeId,
//             success: handleAjaxSubSuccess,
//             error: handleAjaxErrorSub
//         });
//     } else {
//         console.log("UserToken or SubTypeId NULL");
//     }
// }

// function handleAjaxSubSuccess(data, message, xhr) {
//     var json = JSON.parse(xhr.responseText);
//     var jsonResponse = JSON.stringify(json, undefined , 4);
//     console.log(jsonResponse);
//     window.location.replace(redirectUrlAfterSub);
// }

// function handleAjaxErrorSub(xhr, status, error) {
//     console.log("Error in ajax: " +  xhr.responseText);
//     window.location.replace(defaultUrl);
// }

// function getQueryString ( field, url ) {
//     var href = url ? url : window.location.href;
//     var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
//     var string = reg.exec(href);
//     return string ? string[1] : null;
// }