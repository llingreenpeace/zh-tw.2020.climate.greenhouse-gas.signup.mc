import './main.scss?v=1'
const ProgressBar = require('progressbar.js')
const {$} = window

function initProgressBar() {
    let barTarget = document.querySelector('input[name="barTarget"]') ? parseInt(document.querySelector('input[name="barTarget"]').value, 10) : 50000;
    let barNumber = document.querySelector('input[name="barNumber"]') ? parseInt(document.querySelector('input[name="barNumber"]').value, 10) : 2762;

    if (barNumber < 2762)
        barNumber += 2762;
    if (barNumber > barTarget)
        barTarget = Math.ceil(barNumber / 10000) * 10000;
    
    $('#petition-count').html(barNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    $('#petition-target').html(barTarget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    let bar = new ProgressBar.Line('#progress-bar', {
        strokeWidth: 2,
        easing: 'easeInOut',
        duration: 1400,
        color: 'rgb(85, 112,71)',
        trailColor: 'transparent',
        trailWidth: 2,
        svgStyle: {width: '100%', height: '80%', borderRadius: "10px", padding: "1px 0"}
    });
    //bar.animate(0.15);
    bar.animate(barNumber / barTarget);
}

function createYearOptions() {
    let currYear = new Date().getFullYear()

    $("#fake_supporter_birthYear").append(`<option value="">出生年份</option>`);
    
    for (var i = 0; i < 80; i++) {
        let option = `<option value="${currYear-i}-01-01">${currYear-i}</option>`

        $("#fake_supporter_birthYear").append(option);
        $('#en__field_supporter_NOT_TAGGED_6').append(option);
    }
}

function initForm () {
    //console.log('init form')

    // $('#center_sign-submit').click(function(e){
    //     e.preventDefault();
    //     $("#fake-form").submit();
    //     console.log("fake-form submitting")
    // }).end()
    
    $.extend($.validator.messages, {
        required: "此欄位為必填",
    });

    $.validator.addMethod( //override email with django email validator regex - fringe cases: "user@admin.state.in..us" or "name@website.a"
        'email',
        function(value, element){
            return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i.test(value);
        },
        'Email 格式錯誤'
    );

    $.validator.addMethod(
        "taiwan-phone",
        function (value, element) {
            
            const phoneReg6 = new RegExp(/^(0|886|\+886)?(9\d{8})$/).test(value);
			const phoneReg7 = new RegExp(/^(0|886|\+886){1}[2-8]-?\d{6,8}$/).test(value);

            if ($('#fake_supporter_phone').val()) {
                return (phoneReg6 || phoneReg7)
            }
            //console.log('phone testing')
            return true
        },
        "電話格式不正確，請只輸入數字 0912345678 和 02-23456789")

    $.validator.addClassRules({ // connect it to a css class
        "email": {email: true},
        "taiwan-phone" : { "taiwan-phone" : true }
    });

    $("#fake-form").validate({
        errorPlacement: function(error, element) {
            //console.log(error)
            element.parents("div.form-field:first").after( error );
        },
        submitHandler: function(form) {     
            showFullPageLoading();

			// mc forms
			$('#mc-form [name="FirstName"]').val($('#fake_supporter_firstName').val());
			$('#mc-form [name="LastName"]').val($('#fake_supporter_lastName').val());
			$('#mc-form [name="Email"]').val($('#fake_supporter_emailAddress').val());
            $('#mc-form [name="MobilePhone"]').val($('#fake_supporter_phone').val());
			$('#mc-form [name="Birthdate"]').val($('#fake_supporter_birthYear').val());
			
			$('#mc-form [name="OptIn"]').eq(0).prop("checked", $('#fake_optin').prop('checked')); 
			
			// collect values in the mc form
			let formData = new FormData();
			$("#mc-form input").each(function (idx, el) {
				let v = null
				if (el.type==="checkbox") {
					v = el.checked
				} else {
					v = el.value
				}

				formData.append(el.name, v)
				//console.log("Use", el.name, v)
			});
            
            // send the request			
			let postUrl = $("#mc-form").prop("action");
			fetch(postUrl, {
				method: 'POST',
				body: formData
			})
			.then(response => response.json())
			.then(response => {
                //console.log('fetch response', response);
                if (response) {								
					if (response.Supporter) { // ok, go to next page
						sendPetitionTracking("2020-greenhouse.gas");
					}
                    changeToPage(2);					
                }
                hideFullPageLoading();                  
			})
			.catch(error => {
				hideFullPageLoading();
				//alert("抱歉，聯署時發生問題，請您稍後再嘗試一次。");
				//console.warn("fetch error");
				showSubmittedError();
			});
        },
        invalidHandler: function(event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {                
                console.log(errors)
            } 
        }
    });

    //email suggestion
	// for email correctness
	let domains = [
		"me.com",
		"outlook.com",
		"netvigator.com",
		"cloud.com",
		"live.hk",
		"msn.com",
		"gmail.com",
		"hotmail.com",
		"ymail.com",
		"yahoo.com",
		"yahoo.com.tw",
		"yahoo.com.hk"
	];
	let topLevelDomains = ["com", "net", "org"];

	var Mailcheck = require('mailcheck');
	$("#fake_supporter_emailAddress").on('blur', function() {
		Mailcheck.run({
			email: $("#fake_supporter_emailAddress").val(),
			domains: domains, // optional
			topLevelDomains: topLevelDomains, // optional
			suggested: (suggestion) => {
                $(`<div class="email-suggestion">您想輸入的是 <strong id="emailSuggestion">${suggestion.full}</strong> 嗎？</div>`).insertAfter("#fake_supporter_emailAddress");
				//$('#emailSuggestion').html(suggestion.full);
				//$('.email-suggestion').show();
                
                $(".email-suggestion").click(function() {
                    $("#fake_supporter_emailAddress").val($('#emailSuggestion').html());
                    $('.email-suggestion').remove();
                });
			},
			empty: () => {
				this.emailSuggestion = null
			}
		});
	});
    
    //隱藏dd頁面的捐款按鈕
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('utm_source') === "dd") {
        $('.is-hidden-at-dd-page-only').hide();

        $('#fake_supporter_phone').removeAttr("required"); //移除電話欄位 required Attr
        $('#fake_supporter_phone').attr("placeholder", "  電話");
    }
}

/**
 * Switch to the page
 * @param  {int} pageNo 1 or 2
 */
const changeToPage = (pageNo) => {
	if (pageNo===1) {
        $(".page-2").hide();
	} else if (pageNo===2) {
		$('.page-1').hide();
        $('.page-2').show();
        
		// window.location.href = redirectDonateLink;
	} else {
		throw new Error("Unkonw PageNo:"+pageNo)
	}
}

/**
 * Show the full page loading
 */
const showFullPageLoading = () => {
	if ($("#page-loading").length===0) {
		$("body").append(
			`<div id="page-loading" class="hide">
			  <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
			</div>`)
	}

	setTimeout(() => { // to enable the transition
		$("#page-loading").removeClass("hide")
	}, 0)
}

/**
 * Hide the full page loading
 */
const hideFullPageLoading = () => {
	$("#page-loading").addClass("hide")

	setTimeout(() => {
		$("#page-loading").remove()
	}, 1100)
}

/**
 * Show the submitted error message 
 */
const showSubmittedError = () => {
	if ($("#submitted-error").length === 0) {
		$("body").append(`<div id="submitted-error">抱歉，連署時發生問題，請稍後再嘗試</div>`);		
	}
	
	$("#submitted-error").click(function() {
		$('#submitted-error').remove();
	});
}

/**
 * Send the tracking event to the ga
 * @param  {string} eventLabel The ga trakcing name, normally it will be the short campaign name. ex 2019-plastic_retailer
 * @param  {[type]} eventValue Could be empty
 * @return {[type]}            [description]
 */
const sendPetitionTracking = (eventLabel, eventValue) => {
	window.dataLayer = window.dataLayer || [];

	window.dataLayer.push({
	    'event': 'gaEvent',
	    'eventCategory': 'petitions',
	    'eventAction': 'signup',
	    'eventLabel': eventLabel,
	    'eventValue' : eventValue
	});

	window.dataLayer.push({
	    'event': 'fbqEvent',
	    'contentName': eventLabel,
	    'contentCategory': 'Petition Signup'
	});
}

function initPageEventHandler () {

    $(".hidden-part").hide()

    if ($(window).width() <= 991) {
        $('.to-top-btn').click(function(e){
            $('#center_sign-submit').trigger('click')    
        }).end()
    } else {
        $('.page-2').removeClass('normal-scroll')
    }

    $('#center_sign-submit').click(function(e){
        e.preventDefault();
        
        if (!$("#center_sign-submit").hasClass("active")) {
            $(".hidden-part").fadeIn();
            $(".section__scroll").hide();
            $("#center_sign-submit").addClass("active");
            $.fn.fullpage.reBuild();
        } else {
            $("#fake-form").submit();
            //console.log("fake-form submitting");
        }

    }).end()

    $('.close-form-link').click(function(e){
        e.preventDefault();
        $(".hidden-part").fadeOut()
        $(".section__scroll").show();
        $("#center_sign-submit").removeClass("active")
        $.fn.fullpage.reBuild();
    }).end()

    // mobile transplant
    $(".sink--prev").on('click', function() {
        //console.log('left')
        var $curPoint = $('.sink__spot.active');
        if($curPoint.next().length > 0) {
            $curPoint.next().trigger('click');
        }
        else {
            //console.log($('.sink__spot:eq(0)'))
            $('.sink__spot:eq(0)').trigger('click');
        }
    })
    $(".sink--next").on('click', function() {
        //console.log('right')
        var $curPoint = $('.sink__spot.active');
        if($curPoint.prev().length > 0) {
            $curPoint.prev().trigger('click');
        }
        else {
            //console.log($('.sink__spot:eq(0)'))
            $('.sink__spot:last-child').trigger('click');
        }
    })
    $('.close-link').click(()=> {
        $('.sink__countries').removeClass('active');
        if ($('.sink__countries').hasClass('active')) {
            $('.sink__taiwan').css('z-index', 2)
            $('.sink__countries').css('z-index', 6)
        } else {
            $('.sink__countries').css('z-index', 0)
            $('.sink__taiwan').css('z-index', 4)
        }
    })

}

$(document).ready(function() {
    //console.log( "ready!" );
    initPageEventHandler();
    initForm();
    initProgressBar();
    createYearOptions();
});
