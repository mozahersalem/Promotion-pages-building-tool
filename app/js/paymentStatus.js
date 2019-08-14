/**
 * This function reads query/URL parameter related to subscription
 * status and do some DOM minuplation to show different messages
 * to the user
 * @summary loop through elemnts inside the tag with id #success-message
 *          and display payment status on h1,h2, or h3 tags ONLY
 *          #success-message tag should have two elemnt of type header
 *          <div  id="success-message">
				<p>Any other elemnt</p>
				<h1 class="header">Congratulations</h2> MAIN Title
				<br/>
				<h2 class="sub-text light">vEnjoy the service</h2> User Message
				<p>Any other elemnt</p>
				<p>Any other elemnt</p>
			</div>
 * @checkForPaymentStatus {} DOM element
 * @getQueryString {RegExp, URL} string
 * @checkIfOnTrial {message} arr
 *
 */

function checkForPaymentStatus() {

	let pageLang = document.documentElement.lang;

	const paymentStatusQuery = getQueryString('paymentStatus')
	const paymentResultQuery = getQueryString('paymentResult')

	/**
	 * Get all child nodes of tag(div, section) with id  success-message
	 * and aad them to messages array
	 */
	let successMessage = document.getElementById('success-message')
	let successMessageNodes = successMessage.childNodes


	let userMessages = []
	let userMessagesNewSub,  userMessagesAlreadySubed, userMessagesFailed, userMessagesDefault = []
	let trialMessage

	if (pageLang === 'en') {
			userMessagesNewSub = [
					'Congratulations',
					'You are successfully subscribed to service ENJOY!'
			]
			userMessagesAlreadySubed = [
					'Thank You!',
					'You are Already subscribed to service ENJOY!'
			]
			userMessagesFailed = [
					'Something went wrong!',
					'Please try again'
			]
			userMessagesDefault = [
					'Sorry',
					'Your Payment result is unkown',
					'there is no paymentResult query parameter in the URL'
			]
			trialMessage = ' your trial period!';
	}

	if (pageLang === 'ar') {
			userMessagesNewSub = [
					'تهانينا',
					'لقد إشتركت في الخدمة بنجاح'
			]
			userMessagesAlreadySubed = [
					'شكرا جزيلا',
					'أنت بالفعل مشترك في الخدمة'
			]
			userMessagesFailed = [
					'حدث خطأ ما',
					'أعد المحاولة من فضلك'
			]
			userMessagesDefault = [
					'عذرا',
					'نتيجة الدفع الخاصة بك غير معروفة. لا توجد أي مدفوعات استعلام نتيجة الاستعلام في عنوان الصفحة'
			]
			trialMessage = ' الفترة التجريبية!';
	}

	if (pageLang === 'fr') {
			userMessagesNewSub = [
					'Félicitations',
					'Vous êtes abonné au service ENJOY!'
			]
			userMessagesAlreadySubed = [
					'Merci!',
					'Vous êtes déjà abonné au service ENJOY!'
			]
			userMessagesFailed = [
					'Il y a une erreur!',
					'Veuillez réessayer'
			]
			userMessagesDefault = [
					'Désolé',
					'Le résultat de votre paiement est inconnu there is no paymentResult query parameter in the URL'
			]
			trialMessage = ' votre période d\'essai!';
	}


	let subscriptionStatus = {
			paymentStatus: {
					TRIAL: 'TRIAL'
			},
			paymentResult: {
					newSubscription: 'newSubscription',
					alreadySubscribed: 'alreadySubscribed',
					failed: 'failed'
			},
			errorCode: {
					errorCode: 'ERROR_CODE_PAY_SUBSCRIPTION_FAILED'
			}
	}

	function checkIfOnTrial(message) {
			if (paymentStatusQuery === subscriptionStatus.paymentStatus.TRIAL) {
					message = userMessages.pop()
					message += trialMessage
					return userMessages.push(message)
			}
	}

	switch (paymentResultQuery) {
			case 'newSubscription':
					userMessages = userMessagesNewSub
					checkIfOnTrial(userMessages[1]);
					break;

					case 'alreadySubscribed':
					userMessages = userMessagesAlreadySubed
					checkIfOnTrial(userMessages[1]);
					break;

			case 'failed':
					userMessages = userMessagesFailed
					break;

			default:
					userMessages = userMessagesDefault
					console.log('Sorry', 'Your Payment result is unkown', 'there is no paymentResult query parameter in the URL')
					break;
	}

	if (paymentStatusQuery !== subscriptionStatus.TRIAL) {
			let userMessagesNode = 0
			for (let node = 0; node < successMessageNodes.length; node++) {
					let htmlTag = successMessageNodes[node].tagName
					if (htmlTag === 'H1' || htmlTag === 'H2' || htmlTag === 'H3') {
							successMessageNodes[node].innerHTML = userMessages[userMessagesNode]
							userMessagesNode++
							console.log(successMessageNodes[node].innerHTML)
					}
			}
	} else {
			console.log(userMessagesDefault)
	}
}

function getQueryString(field, url) {
		var href = url ? url : window.location.href
		var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i')
		var string = reg.exec(href)
		return string ? string[1] : null
}