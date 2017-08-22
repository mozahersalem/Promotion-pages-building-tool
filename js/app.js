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

function subscribe() {
	var sublink = 'http://mymixtapesmena.com/mobileportal/promo/landing/ooredoo-oman/mymixtapes/mymixtapes-direct.jsp?' +
	'wifiRedirect=http://camp.mymixtapesmena.com/mymixtapes/om/flow2/flow2.html' +
	'&image=http://camp.mymixtapesmena.com/mymixtapes/om/img/concent.jpg';
	var pcid = document.getElementById("pcid").value;
	var mobtag = document.getElementById("mobtag").value;
	var image = document.getElementById("image").value;
	if (pcid && pcid.length !== 0) {
		sublink += '&pcid=' + pcid;
	}
	if (mobtag && mobtag.length !== 0) {
		sublink += '&mobtag=' + mobtag;
	}
	sublink += "&cgredirect=http://mymixtapesmena.com/mobileportal/mymixtape/";
	if (image && image.length !== 0) {
		sublink += "&image=" + image;
	}
	location.replace(sublink);
	return false;
}


(function (i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function () {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o),
	m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-85449201-2', 'auto');
ga('send', 'pageview');

window.onload = function () {
	var getQueryString = function (field, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		var string = reg.exec(href);
		return string ? string[1] : null;
	};
	var sxid = getQueryString('sxid');
	var pcid = getQueryString('pcid');
	if (pcid && pcid.length !== 0) {
		document.getElementById("pcid").value = pcid;
	}
	if (sxid && sxid.length !== 0) {
		document.getElementById("mobtag").value = sxid;
	}
};