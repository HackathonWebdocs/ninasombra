/**
 * Author:
 * Fabz
 */
// require("./libs/skrollr");
// require("./libs/picturefill");

// Create a closure to maintain scope of the '$' and FBZ
;(function(FBZ, $) {

		$(window).load(function() {
		});

	$(function() {

		// initial functions 
		// console.log("init");
		// FBZ.control.readFromGoogleDocs();

			FBZ.control.init();

	});// END DOC READY
	
	FBZ.model = {
		// add your data here 

		windowH	: 0, //browser screen 
		windowW	: 0,
		stageH	: window.innerHeight, //total document size
		stageW	: window.innerWidth,
		stateObj : {},
		currentSection : "home",
		currentArticule : "",
		currentSectionIndex : 0,
		i18n : null,
		noBrain : {},
		currentLang:"es",
		$selectedform : {},
		// js detection
		mobileMode:false,
		tabletMode:false,
		desktopMode:false,
		// value holders
		swapToMobileBreakpoint:420,
		swapToTabletBreakpoint:1024,
		audiosBasePath:"../assets/audio/",
		audios:["narrador_1.mp3","narrador_2.mp3","narrador_3.mp3","narrador_4.mp3","narrador_5.mp3","narrador_6.mp3","narrador_7.mp3","narrador_8.mp3","narrador_9.mp3","narrador_10.mp3","narrador_11.mp3","click.mp3"],
		videosBasePath:"../assets/video/",
		// videos:["Intro_Ojocolores_01.mp4","Acto2_Elcolordelaceguera.mp4","Acto2_Queesunaimagen.mp4","Acto2_Comovenelmundo_03.mp4"],
		videos:["Intro_Ojocolores_01.mp4","Intro_Ojocolores_01.mp4","Intro_Ojocolores_01.mp4","Intro_Ojocolores_01.mp4"],
		playedQuestions : 0,
		totalQuestions : 3,
		selectedPath : 0,
	};

	FBZ.view = {

		// add dom elements here
		$stage 				:$(window),
		$header				:$('header'),
		$main				:$('.main'),
		$block				:$('.block'),
		$langBtn			:$('.lang-btn'),
		$footer				:$('footer'),
		$audioPlayer		:$(".audioPlayer"),
		$videoPlayer		:$("video"),
		$headphones 		:$(".headphones-container"),
		$logo 				:$(".logo-container"),
		$analyser			:$("#analyser"),
		$whiteBg			:$(".white-bg"),
		$c1 				:$(".c1"),
		$c2					:$(".c2"),
		$c3					:$(".c3"),
		$clicker			:$(".clicker"),

	};

	FBZ.control = {
		// add function here
		init : function () {
			console.debug('FabzOff is running');
			// FBZ.control.multilingualEngine(); 
			FBZ.control.removeLoadingCurtain();
			FBZ.control.determineSection();
			FBZ.control.onResizeStage();
			FBZ.control.defineStage();
			FBZ.control.resizeContentBlock();
			FBZ.control.displayHeadphones();
			FBZ.control.playVideo(0,"loop");
		},

		displayHeadphones: function () {

			// FBZ.control.playSound(0,FBZ.control.audioEnded);
			// FBZ.control.playVideo(1,FBZ.control.videoEnded);
			// FBZ.control.playVideo(1,"loop");
			FBZ.control.show(FBZ.view.$headphones);

			var tween = TweenLite.to(FBZ.view.$headphones, 3, {opacity:1,scale:1.4, onComplete:FBZ.control.hideHeadphones })
			FBZ.control.playSound(0,FBZ.control.audioEnded);
		},
		hideHeadphones : function () { 
			FBZ.control.blurLong(FBZ.view.$headphones);
			var tween2 = TweenLite.to(FBZ.view.$headphones, 3, {opacity:0,scale:1.7, delay: 3, onComplete:FBZ.control.displayLogo})

		},

		displayLogo : function () {
			FBZ.control.playSound(1,FBZ.control.audioEnded);
			FBZ.control.hide(FBZ.view.$headphones);
			FBZ.control.show(FBZ.view.$logo);
			var tween2 = TweenLite.to(FBZ.view.$logo, 3, {opacity:1, scale:1.4,onComplete:FBZ.control.hideLogo})
		},

		hideLogo : function () { 

			FBZ.control.blurLong(FBZ.view.$logo);
			var tween = TweenLite.to(FBZ.view.$logo, 1, {opacity:0,scale:1.7, delay: 3, onComplete:FBZ.control.displayVideo1Instructions})
		},

		displayVideo1Instructions : function () {

			console.log("displayVideo1Instructions");
			FBZ.control.hide(FBZ.view.$logo);
			FBZ.control.show(FBZ.view.$whiteBg);
			FBZ.control.show(FBZ.view.$analyser);
			var tween = TweenLite.to(FBZ.view.$whiteBg, 1, {opacity:.6})
			var tween = TweenLite.to(FBZ.view.$analyser, 1, {opacity:1})

			FBZ.control.playSound(2,FBZ.control.displayVideo1Instructions2);
		},

		displayVideo1Instructions2 : function () {
			console.log("displayVideo1Instructions2");
			FBZ.view.$audioPlayer[0].removeEventListener("ended", FBZ.control.displayVideo1Instructions2);
			var tween = TweenLite.to(FBZ.view.$whiteBg, 1, {opacity:.6})
			var tween = TweenLite.to(FBZ.view.$analyser, 1, {opacity:1})
			FBZ.control.playSound(3,FBZ.control.hideVideo1Instructions);
			FBZ.view.$videoPlayer[0].pause();
		},

		hideVideo1Instructions : function () {

			FBZ.view.$audioPlayer[0].removeEventListener("ended", FBZ.control.hideVideo1Instructions);
//			FBZ.control.playSound(3,FBZ.control.hideVideo1Instructions);

			console.log("hideVideo1Instructions");
			// FBZ.control.blurLong(FBZ.view.$analyser);
			var tween = TweenLite.to(FBZ.view.$whiteBg, 1, {opacity:1})
			// var tween2 = TweenLite.to(FBZ.view.$analyser, 2, {opacity:0,onComplete:FBZ.control.hide, onCompleteParams:FBZ.view.$analyser})
			var tween2 = TweenLite.to(FBZ.view.$analyser, 2, {opacity:0,opacity:0,onComplete:FBZ.control.generateRandomClicker })
			// change to video act 2 . 
			FBZ.control.pauseSound();
		},

		generateRandomClicker : function () {

			console.log("generateRandomClicker");
			FBZ.control.show(FBZ.view.$clicker);

			FBZ.control.randomlyPositionClicker();
		
			// FBZ.view.$c1.css("left", Math.round(Math.random*100)+"vw");
			// FBZ.view.$clicker.on("mouseover",FBZ.control.onClickerOver); 
			// FBZ.view.$clicker.on("touchstart",FBZ.control.onClickerOver); 

		},

		randomlyPositionClicker : function () {

			console.log("randomlyPositionClicker");

			FBZ.view.$clicker.each(function( index, element ) {
    
			$(element).css("top", Math.round(Math.random()*90)+"%");
			$(element).css("left", Math.round(Math.random()*90)+"%");

    // element == this
   			});

			FBZ.view.$clicker.on("mouseover",FBZ.control.onClickerOver); 

		},

		onClickerOver : function (e) {

			console.log("clicOver",FBZ.model.selectedPath);
			FBZ.control.playSound(11,FBZ.control.audioEnded);

			setTimeout(function(){ 

				FBZ.model.selectedPath  = Number( e.currentTarget.getAttribute("data"));
				FBZ.view.$clicker.off("mouseover",FBZ.control.onClickerOver); 

				// e.currentTarget.getAttribute("data");
				FBZ.control.hide(FBZ.view.$clicker);

				switch (FBZ.model.selectedPath) {
					case 1:
						console.log("case 1 ");
						FBZ.view.$c1.remove();
						FBZ.control.displayQuestion();
					break;
					case 2:
						console.log("case 2 ");

						FBZ.view.$c2.remove();

					break;
					case 3:
						console.log("case 3 ");

						FBZ.view.$c3.remove();

					break;

					}
					FBZ.control.displayQuestion();


					}, 1000);
		},

		questionsCompletionCheck : function () {

			FBZ.model.playedQuestions ++ ; 

			if (FBZ.model.playedQuestions < FBZ.model.totalQuestions) {
				FBZ.control.displayVideo1Instructions2();

			} else {
				FBZ.control.displayAct3();

			}
			console.log ("questionsCompletionCheck : " ,FBZ.model.playedQuestions , FBZ.model.totalQuestions ) 
		},



//Video 1 Narrador: De qué color es la ceguera?

		displayQuestion : function () {
			console.log("displayQuestion1");
			var tween = TweenLite.to(FBZ.view.$whiteBg, 1, {opacity:.6});
			var tween = TweenLite.to(FBZ.view.$analyser, 1, {opacity:1});
			FBZ.control.playSound(FBZ.model.selectedPath+3,FBZ.control.hideQuestion);
		},

		hideQuestion : function () {

	 		FBZ.view.$audioPlayer[0].removeEventListener("ended", FBZ.control.hideQuestion);
			console.log("hideQuestion1");

			// FBZ.control.blurLong(FBZ.view.$analyser);
			var tween = TweenLite.to(FBZ.view.$whiteBg, 1, {opacity:0});
			// var tween2 = TweenLite.to(FBZ.view.$analyser, 2, {opacity:0,onComplete:FBZ.control.hide, onCompleteParams:FBZ.view.$analyser})
			var tween2 = TweenLite.to(FBZ.view.$analyser, 2, {opacity:0});
			// change to video act 2 . 
			FBZ.control.playVideo(FBZ.model.selectedPath,FBZ.control.endVideo);
		},

		endVideo : function () {

			FBZ.view.$audioPlayer[0].removeEventListener("ended", FBZ.control.endVideo);
			FBZ.view.$videoPlayer[0].pause();
			// FBZ.control.videoEnded();
			// FBZ.control.playVideo(0,"loop");

			console.log("endVideo");

			var tween = TweenLite.to(FBZ.view.$whiteBg, 1, {opacity:.6});
			var tween = TweenLite.to(FBZ.view.$analyser, 1, {opacity:1,  onComplete:FBZ.control.questionsCompletionCheck});
		},



		displayAct3 : function () {
			console.log("act 3");
		},

/// utility
		playSound : function (index,endedFunction) {

			var old_element = FBZ.view.$audioPlayer[0];
			var new_element = old_element.cloneNode(true);
			FBZ.view.$audioPlayer.replaceWith(new_element);

		 // old_element.parentNode.replaceChild(new_element, old_element);
			// FBZ.view.$audioPlayer.off();
			console.log("playSound", index, endedFunction.name);

			FBZ.view.$audioPlayer.attr("src",FBZ.model.audiosBasePath+FBZ.model.audios[index]);
			// console.log("play Sound: ",FBZ.view.$audioPlayer,FBZ.model.audiosBasePath+FBZ.model.audios[index]);
			FBZ.view.$audioPlayer[0].play();
			FBZ.view.$audioPlayer[0].addEventListener("ended", endedFunction);
		},

		pauseSound : function () {

			var waitTime = 150;
			setTimeout(function () {      
				  // Resume play if the element if is paused.
				FBZ.view.$audioPlayer[0].pause();

			}, waitTime);

		},

		playVideo : function (index,endedFunction) {

			console.log("playVideo",index, endedFunction.name );
			if ( endedFunction === "loop") {
				FBZ.view.$videoPlayer.attr("loop","loop");
			}else {
				if(	FBZ.view.$videoPlayer[0].hasAttribute("loop") ) {
					FBZ.view.$videoPlayer.removeAttr("loop");
				}

					FBZ.view.$videoPlayer[0].addEventListener('ended', endedFunction, false);
					// FBZ.view.$videoPlayer[0].addEventListener('ended', FBZ.control.videoEnded, false);
			}

			FBZ.view.$videoPlayer.attr("src",FBZ.model.videosBasePath+FBZ.model.videos[index]);
		},

		videoEnded : function () {
			console.log("video ender function");
			// var old_element = FBZ.view.$videoPlayer[0];
			// var new_element = old_element.cloneNode(true);
			// FBZ.view.$videoPlayer.replaceWith(new_element);
			// FBZ.view.$videoPlayer[0].removeEventListener('ended', FBZ.control.endVideo1, false);
			// FBZ.view.$videoPlayer[0].removeEventListener('ended', FBZ.control.endVideo2, false);
			// FBZ.view.$videoPlayer[0].removeEventListener('ended', FBZ.control.endVideo3, false);
		},

		audioEnded : function () {
			console.log("audio ended");
		},

		detectPlatform : function () {

			console.log("js platform detection : ");
			if(FBZ.model.stageW < FBZ.model.swapToMobileBreakpoint) {

				console.log("mobile");
				// boolean to control the vertical positioning
				FBZ.model.mobileMode = true;
				FBZ.model.tabletMode = false;
				FBZ.model.desktopMode = false;

			// if this brakpoint condition is met display the tablet mode	
			}else if(FBZ.model.stageW < FBZ.model.swapToTabletBreakpoint) { 

				console.log("tablet");

				FBZ.model.mobileMode = false;
				FBZ.model.tabletMode = true;
				FBZ.model.desktopMode = false;

			}else {

				FBZ.model.mobileMode = false;
				FBZ.model.tabletMode = false;
				FBZ.model.desktopMode = true;

				console.log("desktop");

			}

		},

		removeLoadingCurtain : function() { 
			FBZ.control.fadeHideLong($(".curtain"));
		},

		determineSection : function () { 
			// this function determines the current page and assign it to a string

			var section = window.location.href.split("/");

			// console.log("section length :",section.length);

			if ( section.length <= 4 ) {

					FBZ.model.currentSection = "home";

			} else {
					FBZ.model.currentSection  = section[section.length-2];
			}

			FBZ.model.currentArticule  = section[section.length-1];
			//console.log(FBZ.model.currentSection);
		}, 

		sectionMonitor : function (index) { 

			FBZ.control.determineSection();
			FBZ.model.currentSectionIndex = index;
		},

		animate : function (element,animClass) {

				if(element.hasClass("is-hidden")) {
					element.removeClass("is-hidden");
				}
				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);
		},

		animateAndHide : function (element,animClass,time) {

				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);

				setTimeout(function(){ 
					element.addClass("is-hidden");
				}, time);
		},
		// parseBrain : function () {

		// 	// triggers the init func
		// 	FBZ.control.init();
		// 	FBZ.control.multilingualEngine(); 
		// 	FBZ.control.removeLoadingCurtain();
		// 	//FBZ.control.updateLanguage();
		// },

		blurLong : function (el) { 

			el.addClass("is-blurring-out");

			setTimeout(function(){ 
				el.addClass("is-hidden");
				el.removeClass("is-blurring-out");
			}, 5001);
		},




		fadeHideLong : function (el) { 

			el.addClass("is-fading-out-long");

			setTimeout(function(){ 
				el.addClass("is-hidden");
				el.removeClass("is-fading-out-long");
			}, 5001);
		},

		fadeHide : function (el) { 

			el.addClass("is-fading-out");

			setTimeout(function(){ 
				el.addClass("is-hidden");
				el.removeClass("is-fading-out");
			}, 701);
		},

		hide : function (el) { 

				el.addClass("is-hidden");
		},

		show : function (el) { 

			el.removeClass("is-hidden");
		},


		fadeShow : function (el) { 

			el.addClass("is-fading-in");
			el.removeClass("is-hidden");

			setTimeout(function(){ 

				el.removeClass("is-fading-in");
			}, 701);
		},

		fadeShowLong : function (el) { 

			el.addClass("is-fading-in-long");
			el.removeClass("is-hidden");

			setTimeout(function(){ 

				el.removeClass("is-fading-in-long");
			}, 701);
		},

	
		multilingualEngine : function () {

			// multilingual plugin config . 

			i18n = window.domI18n({
				selector: '[data-translatable]',
				separator: ' // ',
				languages: ['es', 'en'],
				defaultLanguage: 'es'
			});
			
			FBZ.view.$langBtn.click(function(){
				
				var languageSelected = $(this).attr('lang');
				FBZ.control.changeLanguage(languageSelected);
			//	console.log("change language to :",languageSelected);
				
				var buttons = $.find(".lang-btn");
				for(var i = 0 ; i < buttons.length ; i ++ ) { 
					$(buttons[i]).removeClass("active");
					// console.dir(buttons[i],buttons[i]);
				//	if (buttons[i].hasClass("active")) {
				//	}
				}
			//	console.log($.find(".lang-btn").hasClass("active").removeClass("active" ));	
				$(this).addClass("active" );
			});

			FBZ.control.updateLanguage();
		},
		
		updateLanguage : function () {

			FBZ.control.changeLanguage(FBZ.model.currentLang);
		},

		changeLanguage : function (language) { 

			i18n.changeLanguage(language);
		//	console.log("changeLanguage");
			FBZ.model.currentLang = language;
		},

		getHeight : function (obj) {

			var value = obj.height();
			return value;
		},

		getWidth : function(obj) {

			var value = obj.width();
			return value;
		},
		defineStage : function ( ) { 

			FBZ.model.stageH = FBZ.control.getHeight(FBZ.view.$stage);
			FBZ.model.stageW = FBZ.control.getWidth(FBZ.view.$stage);
			FBZ.control.detectPlatform();

		//	console.log("def stage", FBZ.model.stageH, FBZ.model.stageW );

		},

		// function to trigger when you resize stage
		onResizeStage : function ()  { 

			$(window).resize(function() {
				// to re - resize the layout . 
				FBZ.control.defineStage();
				FBZ.control.resizeContentBlock();

			});

		},

		resizeContentBlock : function () { 
			FBZ.view.$block.css("width",FBZ.model.stageW);
			FBZ.view.$block.css("height",FBZ.model.stageH);
		},

		toCamelCase: function (str){
			return str.toLowerCase().replace(/(\-[a-z])/g, function($1){
				return $1.toUpperCase().replace('-','');
			});
		},

		setCss3Style: function (el,prop,val){

			var vendors = ['-moz-','-webkit-','-o-','-ms-','-khtml-',''];

			for(var i=0,l=vendors.length;i<l;i++)
				{
					var p = FBZ.control.toCamelCase(vendors[i] + prop);
					if(p in el.style)
						el.style[p] = val;
				}
		}
	};
	// Example module
	/*
	FBZ.MyExampleModule = {
		init : function () {
			FBZ.MyExampleModule.setupEvents();
		},

		setupEvents : function () {
			//do some more stuff in here
		}
	};
	*/


})(window.FBZ = window.FBZ || {}, jQuery);

// multilingual support obj
var i18n;

// debounce prototype
Function.prototype.debounce = function (milliseconds) {
    var baseFunction = this,
        timer = null,
        wait = milliseconds;

    return function () {
        var self = this,
            args = arguments;

        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complete, wait);
    };
};

