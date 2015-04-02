/* v 1.4.5.1
author http://codecanyon.net/user/zlac/portfolio?ref=zlac
*/
var FLIPBOOK = FLIPBOOK || {};

{/* Main */
(function init(jQuery, window, document, undefined) {

	jQuery.fn.flipBook = function (options) {
		//entry point
		var flipBook = new Main();
		flipBook.init(options, this);
		return flipBook;
	};

	// DEFAULT OPTIONS
	jQuery.fn.flipBook.options = {

		//pdf file
		pdfUrl : "",
		pdfBrowserViewerIfMobile : false,
		pdfBrowserViewerFullscreen : true,
		pdfBrowserViewerFullscreenTarget : "_blank",
		pdfPageScale:1.5,
		
		rightToLeft : false,
		/*array of page objects - this must be passed to plugin constructor
		{
			src:"page url",
			thumb:"thumb url",
		}*/
		pages : [],
		/*array of table_of_content objects
		{
			title:"Cover",
			page:"1",
		}*/
		tableOfContent:[],
		
		adds : [],
		
		deeplinking: {
			// deep linking options go gere
			enabled: false,
			prefix: ""
		},

		rootFolder : "",

		assets : {
			preloader : "images/preloader.jpg",
			left : "images/left.png",
			overlay : "images/overlay.png",
			flipMp3 : "mp3/turnPage.mp3"
		},

		//page that will be displayed when the book starts
		startPage : 0,
		
		//if the sound is enabled
		sound:true,
		
		backgroundColor:"#818181",
		backgroundPattern:"",

		//book default settings
		pageWidth : 1000,
		pageHeight : 1414,
		thumbnailWidth : 100,
		thumbnailHeight : 141,
		
		loadAllPages:false,

		//menu buttons
		currentPage : {enabled:true, title:"Current page"},
		btnNext : {enabled:true, title:"Next page", icon:"fa-chevron-right"},
		btnPrev : {enabled:true, title:"Previous page", icon:"fa-chevron-left"},
		btnZoomIn : {enabled:true, title:"Zoom in", icon:"fa-plus"},
		btnZoomOut : {enabled:true, title:"Zoom out", icon:"fa-minus"},
		btnToc : {enabled:true, title:"Table of content", icon:"fa-list-ol"},
		btnThumbs : {enabled:true, title:"Pages", icon:"fa-th-large"},
		btnShare : {enabled:true, title:"Share", icon:"fa-link"},
		btnDownloadPages : {enabled:true, title:"Download pages", icon:"fa-download" ,url:"images/pages.zip"},
		btnDownloadPdf : {enabled:true, title:"Download PDF", icon:"fa-file" ,url:"images/pages.pdf"},
		btnSound : {enabled:true, title:"Volume", icon:"fa-volume-up"},
		btnExpand : {enabled:true, title:"Toggle fullscreen", icon:"fa-expand", iconAlt:"fa-compress"},
		btnExpandLightbox : {enabled:true, title:"Toggle fullscreen", icon:"fa-expand", iconAlt:"fa-compress"},
		btnPrint : {enabled:true, title:"Print", icon:"fa-print"},
		
		
		/*
			array of social share buttons
			each social button is an object that needs to have ison, url, name and target properties 
			
			@icon - CSS class of the icon
			@url - link that will open when the button is clickedPage
			@name - text description of the button
			@target - if the link will be opened in new window ("_blank") or in the same window ("_self")
			
			for example
			
			socialShare : [
				{ 	icon:"fa-facebook", 
					url:"http://www.facebook.com", 
					name:"Facebook", 
					target:"_self"},
				{ 	icon:"fa-twitter", 
					url:"http://www.twitter.com", 
					name:"Facebook", 
					target:"_blank"}
			]
			
			list of supported icons can be found here: http://fortawesome.github.io/Font-Awesome/icons/ 
		*/
		socialShare:[],

		//flip animation type; can be "2d", "3d" , "webgl", "scroll"
		viewMode : 'webgl',
		useMobileView:true,
		zoom : 1,
		zoomLevels : [1,1.2,1.5,1.9,2.5,4,6],
		zoomDisabled : false, 
		
		//flip animation parameters
		time1 : 300,
		transition1 : 'easeInSine',
		time2 : 400,
		transition2 : 'easeOutSine',

		
		//lightbox settings
		lightBox : false,
		lightBoxOpened : false,
		lightBoxFullscreen : false,
		lightboxTransparent : true,
		lightboxCloseOnClick : false,
		lightboxPadding : 0,
		lightboxMargin : 20,

		lightboxWidth : '75%', //width of the lightbox in pixels or percent, for example '1000px' or '75%'
		lightboxHeight : 600,
		lightboxMinWidth : 400, //minimum width of lightbox before it starts to resize to fit the screen
		lightboxMinHeight : 100,
		lightboxMaxWidth : 9999,
		lightboxMaxHeight : 9999,

		lightboxAutoSize : true,
		lightboxAutoHeight : false,
		lightboxAutoWidth : false,

		//WebGL settings
		webgl : true,
		renderer : "webgl", // "webgl" or "canvas"
		//web gl 3d settings
		cameraDistance : 2500,

		pan : 0,
		panMax : 10,
		panMin : -10,
		tilt : 0,
		tiltMax : 5,
		tiltMin : -30,

		//book
		bookX : 0,
		bookY : 0,
		bookZ : 0,

		//pages
		pageMaterial : 'phong', // page material, 'phong', 'lambert' or 'basic'
		pageShadow : true,
		pageHardness : 2,
		coverHardness : 2,
		pageSegmentsW : 10,
		pageSegmentsH : 1,
		pageShininess : 25,
		pageFlipDuration : 2,

		//point light
		pointLight : true, // point light enabled
		pointLightX : 0, // point light x position
		pointLightY : 200, // point light y position
		pointLightZ : 1500, // point light z position
		pointLightColor : 0xffffff, // point light color
		pointLightIntensity : 0.04, // point light intensity

		//directional light
		directionalLight : false, // directional light enabled
		directionalLightX : 0, // directional light x position
		directionalLightY : 0, // directional light y position
		directionalLightZ : 2000, // directional light z position
		directionalLightColor : 0xffffff, // directional light color
		directionalLightIntensity : 0.01, // directional light intensity

		//ambient light
		ambientLight : true, // ambient light enabled
		ambientLightColor : 0xffffff, // ambient light color
		ambientLightIntensity : 1, // ambient light intensity

		//spot light
		spotLight : false, // spot light enabled
		spotLightX : 0, // spot light x position
		spotLightY : 0, // spot light y position
		spotLightZ : 5000, // spot light z position
		spotLightColor : 0xffffff, // spot light color
		spotLightIntensity : 0.2, // spot light intensity
		spotLightShadowCameraNear : 0.1, // spot light shadow near limit
		spotLightShadowCameraFar : 10000, // spot light shadow far limit
		spotLightCastShadow : true, // spot light casting shadows
		spotLightShadowDarkness : 0.5, // spot light shadow darkness

		skin : "light", //dark, light

		contentOnStart : false,
		thumbnailsOnStart : false
	};
	
	var Main = function () {};
	Main.prototype = {
		init : function (options, elem) {

			var self = this;
			self.elem = elem;
			self.jQueryelem = jQuery(elem);
			self.options = {};

			var dummyStyle = document.createElement('div').style,
			vendor = (function () {
				var vendors = 't,webkitT,MozT,msT,OT'.split(','),
				t,
				i = 0,
				l = vendors.length;

				for (; i < l; i++) {
					t = vendors[i] + 'ransform';
					if (t in dummyStyle) {
						return vendors[i].substr(0, vendors[i].length - 1);
					}
				}
				return false;
			})(),
			prefixStyle = function (style) {
				if (vendor === '')
					return style;

				style = style.charAt(0).toUpperCase() + style.substr(1);
				return vendor + style;
			},

			isAndroid = (/android/gi).test(navigator.appVersion),
			isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
			isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
			has3d = prefixStyle('perspective')in dummyStyle,
			hasTouch = 'ontouchstart' in window && !isTouchPad,
			RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
			CLICK_EV = hasTouch ? 'touchend' : 'click',
			START_EV = hasTouch ? 'touchstart' : 'mousedown',
			MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
			END_EV = hasTouch ? 'touchend' : 'mouseup',
			CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
			transform = prefixStyle('transform'),
			perspective = prefixStyle('perspective'),
			transition = prefixStyle('transition'),
			transitionProperty = prefixStyle('transitionProperty'),
			transitionDuration = prefixStyle('transitionDuration'),
			transformOrigin = prefixStyle('transformOrigin'),
			transformStyle = prefixStyle('transformStyle'),
			transitionTimingFunction = prefixStyle('transitionTimingFunction'),
			transitionDelay = prefixStyle('transitionDelay'),
			backfaceVisibility = prefixStyle('backfaceVisibility');

			
			 
			if(jQuery.browser.mobile && self.options.useMobileView)
				self.options.viewMode = 'carousel';

			self.has3d = has3d;
			self.hasWebGl = Detector.webgl;
			self.hasTouch = hasTouch;
			self.RESIZE_EV = RESIZE_EV;
			self.transform = transform;
			self.transitionProperty = transitionProperty;
			self.transitionDuration = transitionDuration;
			self.transformOrigin = transformOrigin;
			self.transitionTimingFunction = transitionTimingFunction;
			self.transitionDelay = transitionDelay;
			self.perspective = perspective;
			self.transformStyle = transformStyle;
			self.transition = transition;
			self.backfaceVisibility = backfaceVisibility;

			//default options are overridden by options object passed to plugin constructor
			self.options = jQuery.extend({}, jQuery.fn.flipBook.options, options);
			self.options.main = self;
			self.p = false;
			
			if((jQuery.browser.mobile || isIDevice || isAndroid) && options.pdfBrowserViewerIfMobile && options.pdfUrl){
			
			// if( options.pdfBrowserViewerIfMobile && options.pdfUrl){  // TEST mobile = true
			
				if(self.options.lightBox && !self.options.lightBoxOpened){
					self.jQueryelem.on("touched click", function(){
						openPdfBrowserViewer()
					}).css('cursor','pointer')
				}else{
					openPdfBrowserViewer()
				}
				return;
			}
			
			function openPdfBrowserViewer(){
				if(self.options.pdfBrowserViewerFullscreen){
					window.open (self.options.pdfUrl, self.options.pdfBrowserViewerFullscreenTarget)
				}else{
					jQuery('<object type="application/pdf"/>').width("100%").height("100%").attr('data',self.options.pdfUrl).appendTo(self.jQueryelem)
					//<div> <object data="test.pdf" type="application/pdf" width="300" height="200"> alt : <a href="test.pdf">test.pdf</a> </object> </div>
				}
			}

			if(self.options.pages && self.options.pages.length > 0)
				self.options.pdfUrl = ""
			
			self.pages = self.options.pages;
			
			var zl = self.options.zoomLevels
			
			if(typeof zl == 'string')
				zl = zl.split(',')
				
			for (i=0;i<zl.length;i++){
				zl[i] = Number(zl[i])
			}
			
			self.options.zoomLevels = zl;
			
			self.options.zoomMin = zl[0]
			self.options.zoomMax = zl[zl.length-1]

			self.wrapper = jQuery(document.createElement('div'))
				.addClass('flipbook-main-wrapper');
				
			if(self.options.backgroundColor != "")
				self.wrapper.css('background', self.options.backgroundColor);
			if(self.options.backgroundPattern != "")
				self.wrapper.css('background', 'url('+self.options.backgroundPattern+') repeat');
				
			self.bookLayer = jQuery(document.createElement('div'))
				.addClass('flipbook-bookLayer')
				.appendTo(self.wrapper);
			self.bookLayer[0].style[self.transformOrigin] = '100% 100%';

			self.book = jQuery(document.createElement('div'))
				.addClass('book')
				.appendTo(self.bookLayer);

			this.createLoadingBar();
				
			//start page
			if(self.options.deeplinking.enabled){
				function getPageFromHash(){
					var res = parseInt(window.location.hash.replace(/#/g, '').replace(self.options.deeplinking.prefix, ""))
					if(isNaN(res)) res = 0;
					return res;
				}
				window.onhashchange = function(e){
					var targetPage = getPageFromHash() - 1
					if(self.options.rightToLeft)
						targetPage = self.options.pages.length - targetPage
					if(typeof(self.Book) != 'undefined' && targetPage >= 0)
						self.Book.goToPage(targetPage, true)
				}
				self.options.startPage = getPageFromHash()
				if(self.options.viewMode == 'carousel'){
					self.options.startPage -= 1
					if(!self.options.lightBox)
						window.location.hash = "#" + this.options.deeplinking.prefix + String(self.options.startPage)
				}else{
					var page = self.options.startPage == 0 ? 1 : self.options.startPage;
					if(!self.options.lightBox)
						window.location.hash = "#" + this.options.deeplinking.prefix + String(page)
				}
			}
			
			//if pdf
			if(self.options.pdfUrl == ""){
				self.wrapper.appendTo(self.jQueryelem);
				self.start();
			}else{
				self.initPdf();
				if (!self.options.lightBox) {
					self.wrapper.appendTo(self.jQueryelem);
				}
			}
			
			this.flipsound = document.createElement('audio');
			this.flipsound.setAttribute('src', this.options.assets.flipMp3);
			this.flipsound.setAttribute('type', 'audio/mpeg')
			
			// jQuery(this).on("onTurnPageComplete", function(e){
				// self.updateCurrentPage()
				// if(self.options.deeplinking.enabled)
					// window.location.hash = "#" + this.options.deeplinking.prefix + String(this.currentPageNumber)
			// })
		},
		start : function () {
			if(this.started)
				return;
			this.started = true;

			var self = this;
			
			
			//new
			if (self.options.lightBox) {
				self.lightbox = new FLIPBOOK.Lightbox(this, self.wrapper, self.options);
				if (self.options.lightboxTransparent == true) {
					self.wrapper.css('background', 'none');
					self.bookLayer.css('background', 'none');
					self.book.css('background', 'none');
				}
			}/*else{
				self.wrapper.appendTo(self.jQueryelem);
			}*/
			
			//if rtl reverse pageSegments
			if (self.options.rightToLeft) {
				self.pagesReversed = [];
				for (var i = self.options.pages.length - 1; i >= 0; i--) {
					self.pagesReversed.push(self.options.pages[i]);
				}
				self.options.pages = self.pagesReversed;
			}

			if (self.options.viewMode == '3d' && !self.has3d)
				self.options.viewMode = '2d';

			this.createBook();
		},
		lightboxStart : function () {
			var self = this;
			if (!this.started)
				this.start();
			if(typeof this.Book == 'undefined'){
				setTimeout(function(){
					self.lightboxStart()
				}, 100);
				return;
			}
			this.Book.enable();
			if (this.options.contentOnStart)
				this.toggleToc(true)
			if (this.options.thumbnailsOnStart)
				this.toggleThumbs(true)
				
			if(self.options.deeplinking.enabled){

				var res = parseInt(window.location.hash.replace(/#/g, '').replace(self.options.deeplinking.prefix, ""))
				if(isNaN(res)) 
					window.location.hash = "#" + this.options.deeplinking.prefix + String(self.currentPageNumber)
				
			}
			self.initColors();
			self.resize();
		},
		initColors:function(){
			jQuery(".skin-color-bg")
				.removeClass("flipbook-bg-light")
				.removeClass("flipbook-bg-dark")
				.addClass("flipbook-bg-" + this.options.skin);
			
			jQuery(".skin-color")
				.removeClass("flipbook-color-light")
				.removeClass("flipbook-color-dark")
				.addClass("flipbook-color-" + this.options.skin);
		},
		lightboxEnd : function () {
			this.Book.disable();
			if (THREEx.FullScreen.available()) {
				if (THREEx.FullScreen.activated()) {
					THREEx.FullScreen.cancel();
				}
			}
			if(window.location.hash){			
				var urlWithoutHash = document.location.href.replace(location.hash , "" );
				window.location.hash = "";
			}
		},
		turnPageComplete : function () {
			//this == FLIPBOOK.Book

			this.animating = false;
			this.updateCurrentPage();

			if(this.options.deeplinking.enabled)
				window.location.hash = "#" + this.options.deeplinking.prefix + String(this.currentPageNumber)
				
			jQuery(this).trigger("onTurnPageComplete")
		},
		updateCurrentPage : function (index) {
			if (typeof this.currentPage === 'undefined')
				return;
			var rightIndex = this.Book.rightIndex;
			
			if(typeof(index) != 'undefined')
				rightIndex = index
			
			var text = rightIndex == 0 ? '1' : String(rightIndex)
			
			if(this.options.viewMode == 'carousel'){
				this.enableButton(this.btnPrev, rightIndex > 1)
				this.enableButton(this.btnNext, rightIndex <= this.pages.length-1)
			}else{
				this.enableButton(this.btnPrev, rightIndex > 0)
				this.enableButton(this.btnNext, rightIndex < this.pages.length-1)
			}
			if(this.options.rightToLeft){
				text = String(this.options.pages.length - parseInt(text) + 1)
			}
			
			this.currentPageNumber = parseInt(text)
			this.currentPage.attr('value', text);
			this.currentPage.val(text);

			if (this.p && this.options.pages.length != 24 && this.options.pages.length != 16 && this.options.pages.length != 8 && this.options.pages.length != 192)
				this.Book.goToPage(0)
		},
		initPdf : function(){
		
			var self = this;
			
			//load pdf.js first
	
			if(!FLIPBOOK.scriptsLoaded[FLIPBOOK.compatibilityjsSrc]){
				self.loadScript(FLIPBOOK.compatibilityjsSrc, self.initPdf)
				return;
			}
				  
			if(!FLIPBOOK.scriptsLoaded[FLIPBOOK.pdfjsSrc]){
				self.loadScript(FLIPBOOK.pdfjsSrc, self.initPdf)
				return;
			}  
				  
			var self = this;
			PDFJS.disableWorker = true;
			PDFJS.workerSrc = FLIPBOOK.pdfjsworkerSrc
			
			function getDocumentProgress(progressData) {
			  //console.log(progressData.loaded / progressData.total);
			  
			  self.setLoadingProgress(progressData.loaded / progressData.total);
			}
			
			PDFJS.getDocument(self.options.pdfUrl, null, false, getDocumentProgress).then(function (pdf) {
				self.onPdfOpen(pdf);
			});
		},
		onPdfOpen : function (pdf) {

			var self = this;
			self.pdfDocument = pdf;
			
			var numPages = pdf.pdfInfo.numPages;

			for(var i=0;i<numPages;i++){
				self.pages.push({title:"Page " + String(i+1)})
			}
			// self.loadPageFromPdf(0, self.start);
			
			 if (self.options.lightBox) {
				 self.loadPagesFromPdf([0,1,2], function(){});
				 self.start()
			 }else{
				self.loadPagesFromPdf([0], self.start);
				//self.start();
			 }
			
			// for(var i=0;i<numPages;i++){
				// i != numPages-1 ? self.loadPageFromPdf(i) : self.loadPageFromPdf(i, self.start)
			// }

		},
		loadPagesFromPdf : function (arr, callback) {
			var toLoad = arr[0], self = this;
			
			arr.shift()
			
			if(arr.length > 0){
				
				this.loadPageFromPdf(toLoad, function(){self.loadPagesFromPdf(arr,callback)})
			}
			else
				this.loadPageFromPdf(toLoad ,callback)
		},
		loadPageFromPdf : function (pageIndex, callback) {
			var self = this;
			var pdf = self.pdfDocument;
			if(self.pages[pageIndex].src){
				callback.call(self)
			}else if(self.pages[pageIndex].getPageCompleted){
				self.renderPageFromPdf(self.pages[pageIndex].getPageCompleted, pageIndex, callback)
			}else{
				self.setLoadingProgress(.3)
				pdf.getPage(pageIndex + 1).then(function(p){
					self.pages[pageIndex].getPageCompleted = p
					self.renderPageFromPdf(p,pageIndex,callback)
				});
			}
		},
		renderPageFromPdf:function(page,pi, callback){
			var self = this, pdf = self.pdfDocument, info = pdf.pdfInfo, numPages = info.numPages, scale = this.options.pdfPageScale;
			
			self.setLoadingProgress(.6)

			
			if(self.pages[pi].src){
				callback.call(self)
				self.setLoadingProgress(1)
			}else if(typeof(self.pages[pi].renderTask) != 'undefined'){
				setTimeout(function(){
					self.renderPageFromPdf(page,pi,callback)
				},100)
			}else{

				var viewport = page.getViewport(scale);
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var renderContext = {
				  canvasContext: context,
				  viewport: viewport,
				  intent:'print'
				};
				//context.fillStyle = '#f00';
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				self.options.pageWidth = parseInt(self.options.pageHeight * viewport.width / viewport.height)
				var destinationCanvas = document.createElement("canvas");
				destinationCanvas.width = canvas.width;
				destinationCanvas.height = canvas.height;
				var destCtx = destinationCanvas.getContext('2d');
				destCtx.fillStyle = "#FFFFFF";
					
				self.pages[pi].renderTask = page.render(renderContext).then(function(){
					self.pages[pi].renderedPage = page
					
					destCtx.fillRect(0,0,canvas.width,canvas.height);

					//draw the original canvas onto the destination canvas
					destCtx.drawImage(canvas, 0, 0);

					self.pages[pi].canvas = destinationCanvas

					var url = destinationCanvas.toDataURL("image/jpeg");
					self.pages[pi].src = url;

					callback.call(self)
					self.setLoadingProgress(1)
				});
			}
		},
		loadScript:function (src, callback) {
			var script = this.getScriptBySrc(src), self = this
			var prev = script.onload
			
			script.onload = function() {
				FLIPBOOK.scriptsLoaded[src] = true;
				if (callback)
					callback.call(self);
				//execute previous onLoad that was overridden by this onLoad
				if (prev)
					prev();
			}
		},	
		getScriptBySrc:function (src) {
			var scripts = document.getElementsByTagName('script');
			for (var i = scripts.length; i--;) {
				if (scripts[i].src == src) return scripts[i];
			}
			var script = document.createElement('script');
			script.setAttribute('src', src);
			document.getElementsByTagName('head')[0].appendChild(script);
			return script;
		},
		createBook : function () {
			var self = this;
			//WebGL mode
			if (self.options.viewMode == "webgl" && self.hasWebGl) {
				  if(!FLIPBOOK.scriptsLoaded[FLIPBOOK.threejsSrc]){
					self.loadScript(FLIPBOOK.threejsSrc, self.createBook)
					return;
				  }
				  if(!FLIPBOOK.scriptsLoaded[FLIPBOOK.flipbookWebGlSrc]){
					self.loadScript(FLIPBOOK.flipbookWebGlSrc, self.createBook)
					return;
				  }

				var bookOptions = self.options;
				bookOptions.pagesArr = self.options.pages;
				bookOptions.scroll = self.scroll;
				bookOptions.parent = self;
				self.Book = new FLIPBOOK.BookWebGL(self.book[0], bookOptions);
				self.webglMode = true;
			} else if(self.options.viewMode == "carousel"){
				 self.Book = new FLIPBOOK.BookCarousel(self);
			}else{
				if(self.options.viewMode != "2d")
					self.options.viewMode = "3d"
				self.Book = new FLIPBOOK.Book(self.book[0], self.options);
				self.scroll = new IScroll(self.bookLayer[0], {
					zoom: true,
					zoomMin : self.options.zoomMin,
					zoomMax : self.options.zoomMax,
					scrollX: true,
					scrollY: true,
					mouseWheel: true,
					keepInCenterV:true,
					keepInCenterH:true,
					wheelAction: 'zoom'
				});
				self.webglMode = false;
			}

			if(self.options.viewMode != 'carousel' && self.options.startPage % 2 == 1)
				self.options.startPage -= 1;
			
			if (self.options.rightToLeft) {
				self.Book.goToPage(Number(self.options.pages.length - Number(self.options.startPage) ), true);
			} else {
				self.Book.goToPage(Number(self.options.startPage),true);
			}
			
			jQuery(window).resize(function () {
				self.resize();
			});
			
			//keyboard evetns
			document.addEventListener ("keydown", function (e) {
				e = e || window.event;
				switch (e.keyCode) {
				//left
				case 37: self.Book.prevPage(); break;
				//up
				case 38: self.zoomIn(); break;
				//right
				case 39: self.Book.nextPage(); break;
				//down
				case 40: self.zoomOut(); break;
				}
			})
			
			if(!self.options.zoomDisabled){
				//disable page scrolling
				jQuery(this.wrapper).on('DOMMouseScroll',function(e){e.preventDefault();});
				jQuery(this.wrapper).on('mousewheel',function(e){e.preventDefault();});	
			}
			
			
			this.Book.updateVisiblePages();
			
			// this.createNavigation();
			
			
			
			//thumbs disabled for pdf mode
			if (self.options.pdfUrl == "" && self.options.btnThumbs.enabled) {
////				this.createThumbs();
			}else{
				self.options.btnThumbs = {enabled:false}
			}
			this.createMenu();
			
			if (this.options.currentPage.enabled) {
				this.createCurrentPage();
				this.updateCurrentPage();
			}

			this.createToc(this.options.tableOfContent);
			
			this.resize();
			
			this.zoom = this.options.zoom;
			
			
			//add mouse scroll listeners
			
			if(!this.options.zoomDisabled){
				//Firefox
				this.bookLayer.bind('DOMMouseScroll', function(e){
					 if(e.originalEvent.detail > 0) {
						 //scroll down
						 // console.log('Down');
						 self.zoomOut()
					 }else {
						 //scroll up
						 // console.log('Up');
						 self.zoomIn()
					 }
					 //prevent page fom scrolling
					 return false;
				 });

				 //IE, Opera, Safari
				 this.bookLayer.bind('mousewheel', function(e){
				 // alert("mousewheel")
					 if(e.originalEvent.wheelDelta < 0) {
						 //scroll down
						 // console.log('Down');
						 self.zoomOut()
					 }else {
						 //scroll up
						 // console.log('Up');
						 self.zoomIn()
					 }
					 //prevent page fom scrolling
					 return false;
				 });
				 
				 this.bookLayer.bind('gesturestart', function(e) {
				 // alert("gesturestart")
					if (e.scale < 1.0) {
						// User moved fingers closer together
					} else if (e.scale > 1.0) {
						// User moved fingers further apart
					}
				}, false);
				 
				 this.bookLayer.bind('gestureend', function(e) {
				 				 // alert("gestureend")
					if (e.scale < 1.0) {
					self.zoomOut()
						// User moved fingers closer together
					} else if (e.scale > 1.0) {
					self.zoomIn()
						// User moved fingers further apart
					}
				}, false);
				
				this.bookLayer.bind('gesturechange', function(e) {
								 // alert("gesturechange")
					if (e.scale < 1.0) {
						// User moved fingers closer together
						self.zoomOut()
					} else if (e.scale > 1.0) {
						// User moved fingers further apart
						self.zoomIn()
					}
				}, false);




			}
			
			if (self.options.lightBox && !self.options.lightBoxOpened)
				self.Book.disable()
				
			// else
				// self.Book.enable();
			//init skin
			
			else {
				if (self.options.contentOnStart)
					self.toggleToc(true);
				if (self.options.thumbnailsOnStart)
					self.toggleThumbs(true);
					
				self.Book.enable()
			}	
			self.initColors();
			
		},
		createButton:function(btn){
				return jQuery(document.createElement('span'))
					.attr('aria-hidden', 'true')
					.appendTo(this.menu)
					.addClass(btn.icon)
					.addClass('flipbook-icon-general flipbook-menu-btn skin-color fa')
					.attr('title',btn.title)
		},
		createMenu : function () {
			if (this.p && this.options.pages.length != 2*2*2*3 && this.options.pages.length != 2*2*2*2 && this.options.pages.length != 2*2*2 && this.options.pages.length != 2*2*2*2*2*2*3)
				return;
			var self = this;
			this.menuWrapper = jQuery(document.createElement('div'))
				.addClass('flipbook-menuWrapper')
				.appendTo(this.wrapper);
			this.menu = jQuery(document.createElement('div'))
				.addClass('flipbook-menu')
				.addClass('skin-color-bg')
				.appendTo(this.menuWrapper);
			if (this.options.lightboxTransparent) {}

			if(self.options.btnPrev.enabled)
			this.btnPrev = this.createButton(self.options.btnPrev)
				.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
					self.Book.prevPage();
				});
				
			if(self.options.btnNext.enabled)
			this.btnNext = this.createButton(self.options.btnNext)
				.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
					self.Book.nextPage();
				});	
				
			if(self.options.btnZoomIn.enabled)
			this.btnZoomIn = this.createButton(self.options.btnZoomIn)
				.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
					self.zoomIn();
				});	
				
			if(self.options.btnZoomOut.enabled)
			this.btnZoomOut = this.createButton(self.options.btnZoomOut)
				.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
					self.zoomOut();
				});		
				
			if(self.options.btnToc.enabled)
			this.btnToc = this.createButton(self.options.btnToc)
				.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
					self.toggleToc();
				});		
				
			if(self.options.btnThumbs.enabled)
			this.btnThumbs = this.createButton(self.options.btnThumbs)
				.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
					self.toggleThumbs();
				});		
				
			if(self.options.btnShare.enabled && this.options.socialShare.length > 0){
			
				this.btnShare = this.createButton(self.options.btnShare)
					.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
						self.toggleShare();
					});		
				this.createShareButtons();
			}
				
			if(self.options.btnDownloadPages.enabled)
			this.btnDownloadPages = this.createButton(self.options.btnDownloadPages)
				.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
					window.location = self.options.btnDownloadPages.url;
				});	

			if(self.options.btnPrint.enabled){
				this.btnPrint = this.createButton(self.options.btnPrint)
					.bind('touchend click', function () {
						self.togglePrintWindow();
					});	
				// this.printPopup = 
				
			}
				
			if(self.options.btnDownloadPdf.enabled)
			this.btnDownloadPdf = this.createButton(self.options.btnDownloadPdf)
				.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
				
					if(self.options.pdfUrl != "")
						self.options.btnDownloadPdf.url = self.options.pdfUrl
						
					window.location = self.options.btnDownloadPdf.url;
				});	
				
			if (self.options.sound && self.options.btnSound.enabled) {
				this.btnSound = this.createButton(self.options.btnSound)
					.bind('touchend click', function (e) {
						e.stopPropagation();
						e.preventDefault();
						if (self.options.sound) {
							self.options.sound = false
							jQuery(this)
							.addClass('fa-volume-off')
							.removeClass('fa-volume-up');
						} else {
							self.options.sound = true
							jQuery(this)
							.addClass('fa-volume-up')
							.removeClass('fa-volume-off');
						}
					});
			}
			
			
			
			if (self.options.btnExpand.enabled) {
				this.btnExpand = this.createButton(self.options.btnExpand)
					.addClass('btnExpand')
					.bind('touchend click', function (e) {
						e.stopPropagation();
						e.preventDefault();

						if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")|| RunPrefixMethod(document, "msFullscreenElement ")) {
							RunPrefixMethod(document, "CancelFullScreen");
						}
						else {
							RunPrefixMethod(self.wrapper[0], "RequestFullScreen");
							RunPrefixMethod(self.wrapper[0], "RequestFullscreen");
						}

					})
			}

			var pfx = ["webkit", "moz", "ms", "o", ""];
			function RunPrefixMethod(obj, method) {
				
				var p = 0, m, t;
				while (p < pfx.length && !obj[m]) {
					m = method;
					if (pfx[p] == "") {
						m = m.substr(0,1).toLowerCase() + m.substr(1);
					}
					m = pfx[p] + m;
					t = typeof obj[m];
					if (t != "undefined") {
						pfx = [pfx[p]];
						return (t == "function" ? obj[m]() : obj[m]);
					}
					p++;
				}

			}
			
			handleFsChange = function(){
				if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) { 
						jQuery('.btnExpand')
						.addClass(self.options.btnExpand.iconAlt)
						.removeClass(self.options.btnExpand.icon);
				  } else {
						jQuery('.btnExpand')
						.addClass(self.options.btnExpand.icon)
						.removeClass(self.options.btnExpand.iconAlt);
				  }
			}
			
			document.addEventListener("MSFullscreenChange", function (e) {
					  handleFsChange()
				  });
				  
				  document.addEventListener("mozfullscreenchange", function (e) {
					  handleFsChange()
				  });
				  
				  document.addEventListener("webkitfullscreenchange", function (e) {
					  handleFsChange()
				  });
				  
				  document.addEventListener("fullscreenchange", function (e) {
					  handleFsChange()
				  });
		},
		createLoadingBar : function(){
			this.loadingBar = jQuery(document.createElement('div'))
				.addClass('flipbook-loading-bar')
				.appendTo(this.wrapper);
				
			this.progressBar = jQuery(document.createElement('div'))
				.addClass('flipbook-progress-bar')
				.appendTo(this.loadingBar);
			
			this.loadingGif = jQuery('<div id="floatingCirclesG"><div class="f_circleG" id="frotateG_01"></div><div class="f_circleG" id="frotateG_02"></div><div class="f_circleG" id="frotateG_03"></div><div class="f_circleG" id="frotateG_04"></div><div class="f_circleG" id="frotateG_05"></div><div class="f_circleG" id="frotateG_06"></div><div class="f_circleG" id="frotateG_07"></div><div class="f_circleG" id="frotateG_08"></div></div>')
			.appendTo(this.wrapper);
			
			
			this.setLoadingProgress(0);
		},
		setLoadingProgress : function(percent){
			if(percent > 0 && percent < 1){
				this.loadingBar.css('display', 'block');
				this.loadingGif.css('display', 'block');
			}else{
				this.loadingBar.css('display', 'none');
				this.loadingGif.css('display', 'none');
			}
			this.progressBar.css('width', (percent * 100).toString() +'%');
		},
		createNavigation : function(){
			var self = this;
			
			this.navLeft = jQuery('<div />');
			this.navLeft
			// .appendTo(this.bookLayer)
			// .css('position','absolute')
			// .css('width','200px')
			// .css('height','200px')
			.css('background','#f00')
			.css('left','0')
			.css('top','200px')
			.attr('aria-hidden', 'true')
			.addClass('skin-color fa fa-chevron-left fa-5x')
			.css('margin-top',this.navLeft.height()+'px')
			.bind('touchend click', function () {
					self.Book.prevPage();
				});
				
			this.navRight = jQuery('<div />')
			.appendTo(this.bookLayer)
			.css('position','absolute')
			.css('width','200px')
			.css('height','200px')
			.css('margin-top','-100px')
			.css('background','#f00')
			.css('right','0')
			.css('top','200px')
			.bind('touchend click', function () {
					self.Book.nextPage();
				});
			
			
		},
		createShareButtons : function () {
			var self = this;
			this.shareButtons = jQuery(document.createElement('span'))
				.appendTo(this.bookLayer)
				.addClass('flipbook-shareButtons')
				.addClass('skin-color-bg')
				.addClass('invisible')
				.addClass('transition');

			var i;
			for (i = 0; i < self.options.socialShare.length; i++) {
				createButton(self.options.socialShare[i]);
			}
			function createButton(social) {
				if(typeof(social.target) == 'undefined') social.target = '_self';
				if(typeof(social.name) == 'undefined') social.name = '';
				
				var btn = jQuery(document.createElement('span'))
					.attr('aria-hidden', 'true')
					.attr('title', social.name)
					.appendTo(self.shareButtons)
					.addClass('fa')
					.addClass('flipbook-shareBtn')
					.addClass(social.icon)
					.addClass('flipbook-icon-general')
					.addClass('skin-color')
					.bind('touchend click', function (e) {
						e.stopPropagation();
						e.preventDefault();
						window.open(social.url, social.target)
					});
			}
		},
		playFlipSound:function(){
			if(this.options.sound && this.Book.enabled){
				try{
					this.flipsound.currentTime = 0;
					this.flipsound.play();
				}catch(err){
					console.log(err)
				}
			}
		},
		onMouseWheel : function(e){
			console.log(e)
			
			if ('wheelDeltaX' in e) {
				wheelDeltaX = e.wheelDeltaX / 12;
				wheelDeltaY = e.wheelDeltaY / 12;
			} else if ('wheelDelta' in e) {
				wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
			} else if ('detail' in e) {
				wheelDeltaX = wheelDeltaY = -e.detail * 3;
			} else {
				return;
			}
			if(wheelDeltaX > 0)
				this.zoomIn()
			else
				this.zoomOut();
	
		},
		zoomOut : function () {
		
			var zl = this.options.zoomLevels;
			for(var i = 0;i<zl.length;i++){
				var level = zl[i]
				if(this.zoom == level && i > 0){
					this.zoom = zl[i-1] 
					break;
				}
				// this.zoom = zl[0] 
			}
			switch(this.options.viewMode){
				case '2d':
				case '3d':
					this.scroll.zoom(this.bookLayer.width() / 2, this.bookLayer.height() / 2, this.zoom* this.ratio, 400);
					break;
				case 'webgl':
					this.Book.zoomTo(this.zoom);
					break;
				case 'carousel':
					this.Book.zoomOut();
					break;
			}
		},
		zoomIn : function () {
			var zl = this.options.zoomLevels;
			for(var i = 0;i<zl.length;i++){
				var level = zl[i]
				if(this.zoom == level && i < (zl.length - 1)){
					this.zoom = zl[i+1] 
					break;
				}
				// this.zoom = zl[0] 
			}
			switch(this.options.viewMode){
				case '2d':
				case '3d':
					this.scroll.zoom(this.bookLayer.width() / 2, this.bookLayer.height() /2, this.zoom* this.ratio, 400);
					break;
				case 'webgl':
					this.Book.zoomTo(this.zoom);
					break;
				case 'carousel':
					this.Book.zoomIn();
					break;
			}
		},
		onZoom : function(newZoom){
			this.enableButton(this.btnZoomIn, newZoom < this.options.zoomMax)
			this.enableButton(this.btnZoomOut, newZoom > this.options.zoomMin)
		},
		toggleShare : function () {
			this.shareButtons.toggleClass('invisible');
		},
		createCurrentPage : function () {
			var self = this;
			var currentPageHolder = jQuery('<div>').appendTo(this.menuWrapper).addClass('flipbook-currentPageHolder')
			this.currentPage = jQuery(document.createElement('input'))
				.addClass('flipbook-currentPage')
				.attr('type', 'text')
				.attr('size', '1')
				.attr('maxlength', '4')
				.addClass('skin-color')
				// .addClass('skin-color-bg')
				.appendTo(currentPageHolder)
				.keyup(function (e) {
					if (e.keyCode == 13) {
						var value = parseInt(jQuery(this).val()) - 1;
						value = value > self.pages.length ? self.pages.length : value;
						if (self.options.rightToLeft) {
							value = self.options.pages.length - value - 1;
						}
						self.updateCurrentPage();
						self.Book.goToPage(value);
					}
				})
				.focus(function (e) {
					jQuery(this).val("");
				})
				.focusout(function (e) {
					var value = parseInt(jQuery(this).val()) - 1;
					self.updateCurrentPage();
					// self.Book.goToPage(value);
				});
				
			this.totalPages = jQuery('<span/>')
			.text('/ '+this.options.pages.length)
			.appendTo(currentPageHolder)
			.addClass('skin-color')
			.addClass('skin-color-bg')
			.addClass('flipbook-totalPages')
		},
		createToc : function (tocArray) {
			var self = this;
			this.tocHolder = jQuery('<div>')
				.addClass('flipbook-tocHolder invisible skin-color-bg')
				.appendTo(this.wrapper)
				//                .hide();
		;
			this.toc = jQuery('<div>')
				.addClass('.flipbook-toc')
				.appendTo(this.tocHolder);
			self.tocScroll = new IScroll(self.tocHolder[0], {
					bounce : false,
					// wheelAction : 'none'
					wheelAction : 'scroll'
				});

			//tiile
			var title = jQuery(document.createElement('span'))
				.addClass('flipbook-tocTitle')
				.addClass('skin-color')
				.appendTo(this.toc);

			var btnClose = jQuery('<span>')
				.attr('aria-hidden', 'true')
				.appendTo(title)
				.addClass('flipbook-btn-close fa fa-times flipbook-icon-general skin-color')
				.bind('touchend click', function (e) {
					e.stopPropagation();
					e.preventDefault();
					self.toggleToc();
				});

				
				if(tocArray.length > 0){
				
					var pages = this.pages;
					for (var i = 0; i < tocArray.length; i++) {

						var tocItem = jQuery(document.createElement('a'))
							.attr('class', 'flipbook-tocItem')
							// .addClass('skin-color-bg')
							.addClass('skin-color')
							.attr('title', tocArray[i].page)
							.appendTo(this.toc)
							//                    .unbind(self.CLICK_EV)
							.bind('touchend click', function (e) {
								e.stopPropagation();
								e.preventDefault();

								if (!self.tocScroll.moved) {
									var clickedPage = Number(jQuery(this).attr('title')) - 1;
									if (self.options.rightToLeft)
										clickedPage = self.pages.length - clickedPage - 1;
									if (self.Book.goingToPage != clickedPage)
										self.Book.goToPage(clickedPage);
									//                            console.log(e,this);
								}
							});
						jQuery(document.createElement('span'))
						.appendTo(tocItem)
						.text(tocArray[i].title);
						jQuery(document.createElement('span'))
						.appendTo(tocItem)
						.attr('class', 'right')
						.text(tocArray[i].page);
					}
				
				}else{
					var pages = this.pages;
					for (var i = 0; i < pages.length; i++) {
						if (pages[i].title == "")
							continue;
						if (typeof pages[i].title === "undefined")
							continue;

						var tocItem = jQuery(document.createElement('a'))
							.attr('class', 'flipbook-tocItem')
							// .addClass('skin-color-bg')
							.addClass('skin-color')
							.attr('title', String(i + 1))
							.appendTo(this.toc)
							//                    .unbind(self.CLICK_EV)
							.bind('touchend click', function (e) {
								e.stopPropagation();
								e.preventDefault();

								if (!self.tocScroll.moved) {
									var clickedPage = Number(jQuery(this).attr('title')) - 1;
									if (self.options.rightToLeft)
										clickedPage = self.pages.length - clickedPage - 1;
									if (self.Book.goingToPage != clickedPage)
										self.Book.goToPage(clickedPage);
									//                            console.log(e,this);
								}
							});
						jQuery(document.createElement('span'))
						.appendTo(tocItem)
						.text(pages[i].title);
						jQuery(document.createElement('span'))
						.appendTo(tocItem)
						.attr('class', 'right')
						.text(i + 1);
					}
				}
				
			self.tocScroll.refresh();
		},
		enableButton : function(button, enabled){
			if(typeof(button) == 'undefined')	
				return;
			if(enabled){
				button.css('opacity','1')
				button.css('pointer-events','auto')
			}else{
				button.css('opacity','.3')
				button.css('pointer-events','none')
			}
		},
		resize : function () {
			var blw = this.bookLayer.width(),
			blh = this.bookLayer.height(),
			bw = this.book.width(),
			bh = this.book.height(),
			menuW = this.menuWrapper.width();
			var self = this;
			if (blw == 0 || blh == 0 || bw == 0 || bh == 0) {
				setTimeout(function () {
					self.resize();
				}, 200);
				return;
			}

			if (blw / blh >= bw / bh)
				this.fitToHeight(true);
			else
				this.fitToWidth(true);
				
			// this.Book.singlePageMode()
			
			if (typeof(this.btnShare) != 'undefined') {
				var sharrBtnX = this.btnShare.offset().left;
				var bookLayerX = this.bookLayer.offset().left;
				this.shareButtons.css('left', String(sharrBtnX - bookLayerX) + 'px');
			}
			if(this.options.viewMode == 'carousel'){
				this.Book.resize();
			}
			
		},
		fitToHeight : function (resize) {
			var x = this.bookLayer.height();
			var y = this.book.height();
			if (resize)
				this.ratio = x / y;
			this.fit(this.ratio, resize);
			this.thumbsVertical();
		},
		fitToWidth : function (resize) {
			var x = this.bookLayer.width();
			var y = this.book.width();
			if (resize)
				this.ratio = x / y;
			this.fit(this.ratio, resize);
			//            this.thumbsHorizontal();
			this.thumbsVertical();
		},
		fit : function (r, resize) {
			if (!this.webglMode && this.scroll) {
				r = resize ? this.ratio : this.scroll.scale;
				if (resize ) {

					this.scroll.options.zoomMin = r * this.options.zoomMin;
					this.scroll.options.zoomMax = r * this.options.zoomMax;
				}
				this.scroll.zoom(r * this.options.zoom,this.bookLayer.width() / 2, this.bookLayer.height() / 2, 0);
			}
		},
		createThumbs : function () {
			var self = this,
			point1,
			point2;
			if (self.options.pdfUrl != "" || !self.options.btnThumbs.enabled) {
				return;
			}
			self.thumbsCreated = true;
			//create thumb holder - parent for thumb container
			self.thumbHolder = jQuery(document.createElement('div'))
				.addClass('flipbook-thumbHolder')
				.addClass('invisible')
				.addClass('skin-color-bg')
				.appendTo(self.wrapper);
			//create thumb container - parent for thumbs
			self.thumbsContainer = jQuery(document.createElement('div')).
				appendTo(self.thumbHolder)
				.addClass('flipbook-thumbContainer')
				
				.width(2*self.options.thumbnailWidth + 45)
				;
			
			//tiile
			var title = jQuery(document.createElement('span'))
				.addClass('flipbook-thumbsTitle')
				// .addClass('skin-color-bg')
				.addClass('skin-color')
				.appendTo(this.thumbHolder);

			var btnClose = jQuery(document.createElement('span'))
				.attr('aria-hidden', 'true')
				.appendTo(title)
				.addClass('flipbook-btn-close')
				.addClass('fa fa-times')
				.addClass('flipbook-icon-general')
				.addClass('skin-color')
				// .addClass('skin-color-bg')
				.bind('touchend click', function (e) {
					self.toggleThumbs();
				});
				
				
			
			self.thumbs = [];
			var pages = self.pages;
			
			var $thumb = jQuery('<div class="flipbook-thumb">').appendTo(self.thumbsContainer).width(self.options.thumbnailWidth);
			
			for (var i = 0; i < pages.length; i++) {
				var imgUrl = pages[i].thumb;
				
				var $thumb = jQuery('<div class="flipbook-thumb">').appendTo(self.thumbsContainer);
				var $thumbImg = jQuery('<img/>').attr('src', imgUrl)
				.appendTo($thumb)
				.width(self.options.thumbnailWidth)
				.height(self.options.thumbnailHeight)
				.attr('title', i + 1)
				.bind('touchend click', function (e) {
					if (!self.thumbScroll.moved) {
						var clickedPage = Number(jQuery(this).attr('title')) - 1;
						if (self.options.rightToLeft)
							clickedPage = pages.length - clickedPage - 1;
						if (self.Book.goingToPage != clickedPage)
							self.Book.goToPage(clickedPage);
					}
				});
				var $pageNumber = jQuery('<span/>').text(i+1)
				.appendTo($thumb)
				.addClass('skin-color')
				.addClass('flipbook-thumb-num')
				.width(self.options.thumbnailWidth)
				;
			}
			self.thumbScroll = new IScroll(self.thumbHolder[0], {
					bounce : false,
					wheelAction:'scroll'
				});
		},
		toggleThumbs : function (value) {
			if (!this.thumbsCreated){
				////return;
				this.createThumbs()
				this.initColors()
			}
			if (value){
			
				this.thumbHolder.removeClass('invisible');
			}
			else{
			
				this.thumbHolder.toggleClass('invisible');
			}
			this.thumbsVertical();
			this.thumbsShowing = !this.thumbHolder.hasClass('invisible');
			if(this.tocShowing) 
				this.tocHolder.toggleClass('invisible');
		},
		toggleToc : function (value) {
			var self = this
			if(this.toggleTocDisabled) return;
			if (value){
				this.tocHolder.removeClass('invisible');
			}
			else{
				this.tocHolder.toggleClass('invisible');
			}
			this.tocShowing = !this.tocHolder.hasClass('invisible');
			// if(tocShowing)
				// this.bookLayer.css('left','300px');
			// else
				// this.bookLayer.css('left','0');
			this.tocScroll.refresh();
			// $(window).trigger('resize');
			if(this.thumbsShowing) 
				this.thumbHolder.toggleClass('invisible');

			this.toggleTocDisabled = true
			setTimeout(function(){
				self.toggleTocDisabled = false
			},100)
		},
		togglePrintWindow:function(value){
			var self = this;
			function printme()
			{
			  link = "about:blank";
			  var pw = window.open(link, "_new");
			  pw.document.open();
			  var images = ""
			  for (var i = 0; i< self.options.pages.length; i++) {
				if(self.options.pages[i].src)
					images +='<img src="'+self.options.pages[i].src.toString()+'"/>\n'
				}
			  var printHtml = printWindowHtml(images)
			  pw.document.write(printHtml);
			  pw.document.close();
			}

			 
			 function printWindowHtml(images)
			{
			  // We break the closing script tag in half to prevent
			  // the HTML parser from seeing it as a part of
			  // the *main* page.

			  return "<html>\n" +
				"<head>\n" +
				"<title>Temporary Printing Window</title>\n" +
				"<script>\n" +
				"function step1() {\n" +
				"  setTimeout('step2()', 10);\n" +
				"}\n" +
				"function step2() {\n" +
				"  window.print();\n" +
				"  window.close();\n" +
				"}\n" +
				"</scr" + "ipt>\n" +
				"</head>\n" +
				"<body onLoad='step1()'>\n" +
				images + 
				"</body>\n" +
				"</html>\n";
			}
						
			printme()
			return;
		
		
			var self = this
			if(!this.printWindowCreated){
				this.printWindowCreated = true
				this.printWindow = jQuery('<div>').addClass('flipbook-print-window').appendTo(this.wrapper)
				var html = jQuery('<div class="panel panel-default">'+
                        '<div class="panel-heading">Print</div>'+
                        '<div class="panel-body">'+
                           '<div class="row">'+
                               '<div class="col-lg-12">'+
                                    '<form role="form">'+
                                        '<div class="form-group">'+
                                           '<label></label>'+
                                            '<label class="radio-inline"><input type="radio" name="optionsRadiosInline" id="optionsRadiosInline1" value="option1" checked>Left page</label>'+
                                           '<label class="radio-inline"><input type="radio" name="optionsRadiosInline" id="optionsRadiosInline2" value="option2">Right page</label>'+
                                           '<label class="radio-inline"><input type="radio" name="optionsRadiosInline" id="optionsRadiosInline3" value="option3">All pages</label>'+
                                        '</div>'+
                                        '<div class="form-group">'+
                                            '<label>Or select one or more pages</label>'+
                                           '<select multiple class="form-control">'+
                                               '<option>Page 1</option>'+
                                           '</select>'+
                                        '</div>'+
                                        '<button type="button" class="btn btn-default btn-close">Close</button>'+
                                       '<button type="button" class="btn btn-default pull-right btn-print">Print</button>'+
                                    '</form>'+
                                '</div>'+
                            '</div>'+
                       '</div>'+
                   '</div>').appendTo(this.printWindow).hide().fadeIn()
				   
					this.printWindow.find('.btn-print').bind('touchend click', function(){
						printme()
					})
					this.printWindow.find('.btn-close').bind('touchend click', function(){
						self.printWindow.fadeToggle()
					})
			}else{
				this.printWindow.fadeToggle()
			}
		},
		thumbsVertical : function () {
			if (!this.thumbsCreated)
				return;
			this.thumbScroll.hScroll = false;
			this.thumbScroll.vScroll = true;
			this.thumbScroll.refresh();
		},
		toggleExpand : function () {
			if (THREEx.FullScreen.available()) {
				if (THREEx.FullScreen.activated()) {
					THREEx.FullScreen.cancel();
				} else {
					THREEx.FullScreen.request(this.wrapper[0]);
				}
			}
		}
	};

	//easign functions
	jQuery.extend(jQuery.easing, {
		def : 'easeOutQuad',
		swing : function (x, t, b, c, d) {
			//alert(jQuery.easing.default);
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},
		easeInQuad : function (x, t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOutQuad : function (x, t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOutQuad : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		easeInCubic : function (x, t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOutCubic : function (x, t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOutCubic : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		easeInQuart : function (x, t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		easeOutQuart : function (x, t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOutQuart : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		easeInQuint : function (x, t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutQuint : function (x, t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutQuint : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		easeInSine : function (x, t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOutSine : function (x, t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOutSine : function (x, t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		easeInExpo : function (x, t, b, c, d) {
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOutExpo : function (x, t, b, c, d) {
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOutExpo : function (x, t, b, c, d) {
			if (t == 0)
				return b;
			if (t == d)
				return b + c;
			if ((t /= d / 2) < 1)
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc : function (x, t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOutCirc : function (x, t, b, c, d) {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOutCirc : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		easeInElastic : function (x, t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0)
				return b;
			if ((t /= d) == 1)
				return b + c;
			if (!p)
				p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			return  - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic : function (x, t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0)
				return b;
			if ((t /= d) == 1)
				return b + c;
			if (!p)
				p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOutElastic : function (x, t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0)
				return b;
			if ((t /= d / 2) == 2)
				return b + c;
			if (!p)
				p = d * (.3 * 1.5);
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1)
				return  - .5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		easeInBack : function (x, t, b, c, d, s) {
			if (s == undefined)
				s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack : function (x, t, b, c, d, s) {
			if (s == undefined)
				s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack : function (x, t, b, c, d, s) {
			if (s == undefined)
				s = 1.70158;
			if ((t /= d / 2) < 1)
				return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		easeInBounce : function (x, t, b, c, d) {
			return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
		},
		easeOutBounce : function (x, t, b, c, d) {
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOutBounce : function (x, t, b, c, d) {
			if (t < d / 2)
				return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
			return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	});

})(jQuery, window, document)
}

{/* FLIPBOOK.Lightbox */
FLIPBOOK.Lightbox = function(context,content,options){

    var self = this;
    this.context = context;
    this.options = options;
	
	jQuery(context.elem)
		.css('cursor','pointer')
        .bind('touchstart mousedown', function (e) {
            self.openLightbox();
			
			if(self.context.options.lightBoxFullscreen){
				if (THREEx.FullScreen.available()) {
					THREEx.FullScreen.request(self.context.wrapper[0]);
					// self.context.btnExpand
					// .addClass('fa-compress')
					// .removeClass('fa-expand');
				}
			}
			
        });
		
	
		
	// var overlay = jQuery('<div/>')
		// .addClass('flipbook-lightbox-thumb-overlay')
		// .appendTo(jQuery(context.elem));
	// var iconHolder = jQuery('<div/>')
		// .addClass('flipbook-lightbox-thumb-icon-holder')
		// .appendTo(overlay);
	//add boverlay to elem
	// var icon = jQuery('<span/>')
		// .addClass('fa fa-book fa-2x')
		// .addClass('flipbook-lightbox-thumb-icon')
		// .appendTo(iconHolder);
		
	var img = jQuery(context.elem).find('img');
	// if(img){
		// overlay.width(img.width());
		// overlay.height(img.height());
		// jQuery(context.elem).css('position','relative')
	// }
	
    self.overlay = jQuery(document.createElement('div'))
        .attr('class', 'flipbook-overlay')
        .css('display', 'none')
        // .css('visibility', 'hidden')
        .css('z-index', '999999')      // on top of everything ! wordpress menu bar has z-index 99999
        .bind('touchstart mousedown', function (e) {
            if (jQuery(e.target).hasClass('flipbook-bookLayer') && self.options.lightboxCloseOnClick) {
                self.closeLightbox();
            }
        })
        .appendTo('body')
//                .appendTo(self.jQueryelem)

	jQuery(document).keyup(function(e) {
	  if (e.keyCode == 27) {
			self.closeLightbox();
	   }   // escape key maps to keycode `27`
	});

	
    self.wrapper = jQuery(document.createElement('div'))
        .css('width', self.options.lightboxWidth)
        .css('height', 'auto')
        .appendTo(self.overlay)
    ;
    if(self.options.lightboxTransparent == true){
        self.wrapper
            .attr('class', 'flipbook-wrapper-transparent')
            .css('margin', '0px auto' )
            .css('padding', '0px')
            .css('height', '100%')
            .css('width', '100%')
        ;
    }else{
        self.wrapper
            .attr('class', 'flipbook-wrapper')
            .css('margin', String(self.options.lightboxMargin)+'px auto' )
            .css('padding', String(self.options.lightboxPadding)+'px')
        ;
        content
        .css('margin', String(self.options.lightboxPadding)+'px')
    }

    content
//        .css('margin', String(self.options.lightboxPadding)+'px')
        .appendTo(self.wrapper)
    ;

    // close button
	var $toolbar = jQuery('<div/>')
	.appendTo(self.wrapper)
	.addClass('flipbook-lightbox-toolbar');
	
	var $close = jQuery('<span title="Press Esc tp close"/>')
	.appendTo($toolbar)
	.bind('touchend click', function (e) {
		self.closeLightbox();
	})
	.addClass('flipbook-lightbox-close fa fa-times skin-color skin-color-bg');
	
	if(options.btnExpandLightbox.enabled){
		var $fullscreen = jQuery('<span title="Enter Fullscreen"/>')
		.appendTo($toolbar)
		.addClass('.btnExpand')
		.bind('touchend click', function (e) {
			context.toggleExpand();
		})
		.addClass('flipbook-lightbox-fullscreen fa skin-color skin-color-bg').addClass(options.btnExpandLightbox.icon);
	}
	
    self.resize();
    jQuery(window).resize(function () {
        self.resize();
    });
    // self.resize();
	
	if(options.lightBoxOpened)
		self.openLightbox();
    else if(options.deeplinking.enabled){		
		//first check if deeplinking.prefix is inside the url
		if(window.location.hash && window.location.hash.indexOf(options.deeplinking.prefix) > -1)
			self.openLightbox();
	}

//    this.overlay.css('display','none');

};
FLIPBOOK.Lightbox.prototype = {

    openLightbox:function(){
        var self = this;
        this.overlay.css('visibility','visible');
        this.overlay.css('display','none');
        this.wrapper.css('display','none');
        this.overlay.fadeIn("fast", function(){
            self.wrapper.css('display','block');
			self.context.lightboxStart();
			self.lightboxOpened = true
        });
        jQuery('body').css('overflow', 'hidden');
		// self.context.resize();
    },
    closeLightbox:function(){
        var self = this;
		if(self.lightboxOpened != true) return;
		self.lightboxOpened = false;
        this.overlay.fadeOut("fast");
//        this.overlay.css('visibility','hidden');
        jQuery('body').css('overflow', 'auto');

        self.context.lightboxEnd();
    },
    resize:function(){
        var self = this;
        var jQuerywindow = jQuery(window), ww = jQuerywindow.width(), wh = jQuerywindow.height();
        if(self.options.lightboxTransparent == true) {
//        if(self.options.lightboxTransparent == true || (THREEx.FullScreen.available() && THREEx.FullScreen.activated())) {
            self.wrapper
                .css('width', '100%')
            ;
        } else {
            self.wrapper.css('width', self.options.lightboxWidth);

            if((self.wrapper.width() + 2*self.options.lightboxMargin + 2*self.options.lightboxPadding) < self.options.lightboxMinWidth){
                self.wrapper.css('width', String(ww - 2*self.options.lightboxMargin -2*self.options.lightboxPadding)+'px');
            }

        }
    }
};
}

{/* FLIPBOOK.BookCarousel */
FLIPBOOK.BookCarousel = function (main) {
	var self = this
	this.main = main
	this.bookLayer = main.bookLayer
	this.rightIndex = 1;
	this.currentPage = 0;
	
	
	this.scroller = main.book.removeClass('book').addClass('flipbook-carousel-scroller')
	
	this.left = jQuery('<div>').appendTo(this.scroller).addClass('flipbook-carousel-page').css({'width':String(window.innerWidth-1)+'px', /*'background':'#f00', */'display':'inline-block'});
	this.imgLeft = jQuery("<img>").appendTo(this.left).addClass('img')
	
	this.center = jQuery('<div>').appendTo(this.scroller).addClass('flipbook-carousel-page').css({'width':String(window.innerWidth-1)+'px', /*'background':'#0f0',*/ 'display':'inline-block'});
	this.imgCenter = jQuery("<img>").appendTo(this.center).addClass('img')
	
	this.right = jQuery('<div>').appendTo(this.scroller).addClass('flipbook-carousel-page').css({'width':String(window.innerWidth-1)+'px', /*'background':'#00f',*/ 'display':'inline-block'});
	this.imgRight = jQuery("<img>").appendTo(this.right).addClass('img')
	
	
	this.zoomLayer = jQuery('<div>').appendTo(this.main.bookLayer).addClass('')
	.css({'position':'absolute','top':'0','left':'0','width':'100%', 'height':'100%','display':'inline-block'});
	this.imgScroller = jQuery("<div>").appendTo(this.zoomLayer)  
	.css({'position':'relative','width':String(main.options.pageWidth)+'px','height':String(main.options.pageHeight)+'px', 'background':'#f00'})
	this.imgZoom = jQuery("<img>").appendTo(this.imgScroller)
	
	this.zoomLayer.remove()
	this.zoomScroll = new IScroll(this.zoomLayer[0], {
		zoom:true,
		wheelAction:'none',
		keepInCenterH : true,
		keepInCenterV : true,
		zoomMin:0,
		zoomMax:100,
		onZoomEnd:function(){
			// if(this.scale > this.options.zoomMin){
				// self.iscroll.disable()
				// self.zoomLayer.css({'pointer-events':'auto'})
				// self.zoomLayer.show()
				// self.scroller.hide()
			// }else{
				// self.iscroll.enable()
				// self.zoomLayer.css({'pointer-events':'none'})
				// self.zoomLayer.hide()
				// self.scroller.show()
			// }
		},
		onZoom:function(){
			// if(this.scale > this.options.zoomMin){
				// self.iscroll.disable()
				// self.zoomLayer.css({'pointer-events':'auto'})
			// }else{
				// self.iscroll.enable()
				// self.zoomLayer.css({'pointer-events':'none'})
			// }
		}
	})
	this.zoomScroll.refresh();
	this.zoomTo(1)
	
	this.iscroll = new IScroll(main.bookLayer[0], {
		snap: true,
		// zoom: true,
		// wheelAction:'zoom',
		momentum: false,
		hScrollbar: false,
		onScrollEnd: function () {
			// self.rightIndex = self.iscroll.currPageX + 1;
			// main.updateCurrentPage();
			if(this.currPageX == 0 && self.currentPage > 0){
				// console.log('prev complete')
				self.currentPage --;
				self.updateImages()
			}else if(this.currPageX == 2 && self.currentPage < self.main.options.pages.length - 1){
				self.currentPage ++;
				// console.log('next complete')
				self.updateImages()
			}else if(this.currPageX == 1 && self.currentPage == 0){
				self.currentPage ++
				self.updateImages()
			}else if(this.currPageX == 1 && self.currentPage == self.main.options.pages.length - 1){
				self.currentPage --
				self.updateImages()
			}
			main.updateCurrentPage(self.currentPage+1);
			self.rightIndex = self.currentPage+1
			main.turnPageComplete();
		},
		onScrollStart: function () {
			// self.updateImages()
		},
		onZoom:function(){
			// console.log(this)
		},
		onZoomEnd:function(){
			// console.log(this)
			// this.options.snap = (this.scale == 1);
			// if(self.currentPage > 0)
				// self.left.hide();
			// if(self.currentPage < self.main.options.pages.length - 1)
				// self.right.hide();
			// this.refresh()
		}
	 });
	 this.iscroll.refresh() 
	 this.resize();
}
FLIPBOOK.BookCarousel.prototype.constructor = FLIPBOOK.BookCarousel;
FLIPBOOK.BookCarousel.prototype = {
	goToPage:function(value, time){
		//if(this.iscroll.pagesX.length == 0) return;
		if(isNaN(value) || value < 0)
			value = 0
		this.currentPage = value
		this.updateImages()
	},
	updateImages:function(){
		var pages = this.main.options.pages
		var page = this.currentPage
		
		if(page >0)
			this.imgLeft.attr('src',pages[page-1].src)
			// this.imgLeft.css({'background-image':'url('+pages[page-1].src+')'})
		
		this.imgCenter.attr('src',pages[page].src)
		// this.imgCenter.css({'background-image':'url('+pages[page].src+')'})
		
		if(page < pages.length-1)
			this.imgRight.attr('src',pages[page+1].src)
			
			this.imgScroller.css({'background-image':'url('+pages[page].src+')'})
			
			// this.imgZoom.attr('src',pages[page].src)
			
		if(page == pages.length-1){
			this.imgCenter.attr('src',pages[page-1].src)
			this.imgRight.attr('src',pages[page].src)
		}
		
		if(page == 0){
			this.left.hide()
			this.scrollToPage(0,0)
		}else if (page == pages.length-1){
			//this.right.hide()
			this.left.show()
			this.right.show()
			this.scrollToPage(2,0)
		}else{
			this.left.show()
			this.right.show()
			this.scrollToPage(1,0)
		}
	},
	nextPage:function(){
		if(this.currentPage == 0)
			this.scrollToPage(1)
		else
			this.scrollToPage(2)
	},
	prevPage:function(){
		this.scrollToPage(0)
	},
	updateVisiblePages:function(){
	
	},
	disable:function(){
	
	},
	enable:function(){
	
	},
	resize:function(){
		
		jQuery(this.scroller.children()).css('width',String(this.main.bookLayer.width())+'px');
		
		if(this.main.bookLayer.width()/this.main.bookLayer.height() > this.main.options.pageWidth/this.main.options.pageHeight){
			//fit to height
			this.scroller.find('.img').css({'width':'auto', 'height':'100%'});
			/*this.zoomScroll.options.zoomMin = this.main.bookLayer.height() / this.main.options.pageHeight
			this.zoomTo(this.main.bookLayer.height() / this.main.options.pageHeight, 0)*/
		}else{
			//fit to widht
			this.scroller.find('.img').css({'width':'100%', 'height':'auto'});
			/*this.zoomScroll.options.zoomMin = this.main.bookLayer.width() / this.main.options.pageWidth
			this.zoomTo(this.main.bookLayer.width() / this.main.options.pageWidth, 0)*/
		}
		
		this.scroller.css('width',String(3 * this.main.bookLayer.width())  + 'px')
		
		this.iscroll.refresh();
		
		this.updateImages()
	},
	scrollToPage:function(index,time){
		// console.log("scrollToPage",index)
		var self = this;
		self.iscroll.refresh()
		// if(self.iscroll.currPageX == index) 
			// return;
		if(self.iscroll.maxScrollX < 0)
			self.iscroll.scrollToPage(index,0,time)
		else{
			//setTimeout(function(){
		//		self.scrollToPage(index,time)
		//	},100);
			
		}
	},
	zoomTo:function(val,time){
		time = typeof(time) != 'undefined' ? time : 400
		var self = this;
		self.zoomScroll.refresh()
		if(self.zoomScroll.wrapperW != 1)
			self.zoomScroll.zoom(self.bookLayer.width() / 2, self.bookLayer.height() / 2,val, time);
		else{
			setTimeout(function(){
				self.zoomTo(val, time)
			},100);
		}
	},
	zoomIn:function(){
		var i = 0
		var newZoom = this.zoomScroll.scale * 1.2 
		newZoom = newZoom < this.zoomScroll.options.zoomMax ? newZoom : this.zoomScroll.options.zoomMax
		this.zoomTo(newZoom)
	},
	zoomOut:function(){
		var i = 0
		this.zoomTo(this.zoomScroll.scale * .8)
		
		var newZoom = this.zoomScroll.scale * .8
		newZoom = newZoom > this.zoomScroll.options.zoomMin ? newZoom : this.zoomScroll.options.zoomMin
		this.zoomTo(newZoom)
	}
}
}

{/* FLIPBOOK.Book */
FLIPBOOK.Book = function (el, options) {
    /**
     * local variables
     */
    var self = this, i,main = options.main ;
    this.main = options.main;
    this.transform = main.transform;
    this.transformOrigin = main.transformOrigin;
    this.transformStyle = main.transformStyle;
    this.transition = main.transition;
    this.transitionDuration = main.transitionDuration;
    this.transitionDelay = main.transitionDelay;
    this.transitionProperty = main.transitionProperty;
    this.backfaceVisibility = main.backfaceVisibility;

    this.wrapper = typeof el == 'object' ? el : document.getElementById(el);
    jQuery(this.wrapper).addClass('flipbook-book');

    // Default options
    this.options = {
        //A4
        //2d or 3d
        viewMode:'2d',
        shadow1opacity:.7, // black overlay for 3d flip
        shadow2opacity:.7 // gradient overlay
    };

    // User defined options
    for (i in options) this.options[i] = options[i];
    this.pages = [];
    this.pageWidth = this.options.pageWidth;
    this.pageHeight = this.options.pageHeight;
    this.animating = false;
    this.rightIndex = 0;

    var s = this.wrapper.style;
    // s.width = String(2 * this.pageWidth) + 'px';
    s.width = String(2*this.pageWidth) + 'px';
    s.height = String(this.pageHeight) + 'px';
    
    this.viewMode = this.options.viewMode;
    this.shadow1opacity = this.options.shadow1opacity;
    this.shadow2opacity = this.options.shadow2opacity;

    //add bitmap pages
    var point1, point2;

    //book shadow
    //left
    /*this.shadowL = document.createElement('div');
    jQuery(this.shadowL).addClass('flipbook-shadowLeft')
        .css("width",String(this.pageWidth) + 'px')
        .css("height", String(this.pageHeight) + 'px');
    this.wrapper.appendChild(this.shadowL);
    this.shadowLVisible =true;*/
    //right
   /* this.shadowR = document.createElement('div');
    jQuery(this.shadowR).addClass('flipbook-shadowRight')
        .css("width",String(this.pageWidth) + 'px')
        .css("height", String(this.pageHeight) + 'px');
    this.wrapper.appendChild(this.shadowR);
    this.shadowRVisible =true;*/

    this.shadowRight();

    for ( i = 0; i < self.options.pages.length; i++) {
        this.addPage(i);
        jQuery(this.pages[i].wrapper)
            .attr('title', i + 1)
            .bind('touchend click', function (e) {
                var x, x2, y, y2, z, z2;
                x = self.main.scroll.x;
                x2 = self.xOnMouseDown;
                y = self.main.scroll.y;
                y2 = self.yOnMouseDown;
                z = self.zoomOnMouseUp;
                z2 = self.zoomOnMouseDown;

                function isClose(x1,x2){
                   return (Math.abs(x1-x2) < 10);
                }
                if(self.main.scroll.moved || self.main.scroll.animating || self.main.scroll.zoomed || (self.zoomOnMouseDown != self.main.scroll.scale))
                    return;
                if(e.target.className == "flipbook-page-link")
                    return;
                if(isClose(x,x2) && isClose(y,y2) && z === z2 ){
                    var clickedPage = Number(jQuery(this).attr('title'))-1;
                    if(clickedPage == self.rightIndex){
                        self.nextPage();
                    }
                    else{
                        self.prevPage();
                    }
                }
            })
            .bind('touchstart mousedown', function(e){
                self.zoomOnMouseDown = self.main.scroll.scale;
                self.xOnMouseDown = self.main.scroll.x;
                self.yOnMouseDown = self.main.scroll.y;
            })
            .bind('touchend mouseup', function(e){
                self.zoomOnMouseUp = self.main.scroll.scale;
                self.xOnMouseUp = self.main.scroll.x;
                self.yOnMouseUp = self.main.scroll.y;
            })
        ;
		
		if(self.options.loadAllPages)
			this.pages[i].loadPage();
    }
    this.pages[0].loadPage();
    // this.pages[1].loadPage();
    // if(this.pages.length > 2)
    // this.pages[2].loadPage();

    this.updateVisiblePages();
	
};
FLIPBOOK.Book.prototype.constructor = FLIPBOOK.Book;
FLIPBOOK.Book.prototype = {
    /**
     * add new page to book
     * @param i
     */
    addPage:function(i){
        var page = new FLIPBOOK.Page(this.options.pages[i], this.pageWidth, this.pageHeight,this.pages.length,this);
//        var page = new FLIPBOOK.Page(this.options.pages[i].src, this.options.pages[i].htmlContent, this.pageWidth, this.pageHeight, this.pages.length,this);
        this.wrapper.appendChild(page.wrapper);
        this.pages.push(page);
    },
	
    // i - page number, 0-based 0,1,2,... pages.length-1
    goToPage:function (i,instant) {
        if (i < 0 || i > this.pages.length)
            return;
        if (this.animating)
            return;
        if(isNaN(i))
            return;
        this.goingToPage = i;
		
        //convert target page to right index 0,2,4, ... pages.length
        i = (i % 2 == 1) ? i + 1 : i;
		
		var self = this;
		
		if(self.rightIndex == 0 && i > 0 && this.pages[0].isCentered){
			//slide right first
			this.pages[0].slideRight(instant, function(){
				self.goToPage(i,instant)
			});
			return;
		}
		if(self.rightIndex == self.pages.length && i < self.rightIndex && this.pages[self.rightIndex-1].isCentered){
			//slide right first
			this.pages[self.rightIndex-1].slideLeft(instant, function(){
				self.goToPage(i,instant)
			});
			return;
		}

        if(i == 0 ){
            this.rightIndex == this.pages.length ? this.shadowNone() : this.shadowRight();
        }else if(i == this.pages.length){
            this.rightIndex == 0 ? this.shadowNone() : this.shadowLeft();
        }

	
        var pl, pr, plNew, prNew;
        //if going left or right
        if (i < this.rightIndex)
        //prev page
        {
            pl = this.pages[this.rightIndex - 1];
            pr = this.pages[i];
			prNew = this.pages[i];
            if (i > 0) {
                plNew = this.pages[i - 1];
                if(this.viewMode == '2d')
					plNew.expand();
                plNew.show();
            }
            if(this.viewMode == '2d'){
				pr.contract();
				this.animatePages(pl, pr, instant, plNew, this.pages[i+2]);
			}else{
				// this.animatePages(pl, pr, instant);
				this.animatePages(pl, pr, instant, plNew, this.pages[i+2]);
			}
			this.main.playFlipSound();
			if(plNew) plNew.slideLeft(true)
			if(prNew) prNew.slideRight(true)
        }
        //next page
        else if (i > this.rightIndex) {
            pl = this.pages[i - 1];
            pr = this.pages[this.rightIndex];
			plNew = this.pages[i - 1];
            if (i < this.pages.length) {
                prNew = this.pages[i];
                if(this.viewMode == '2d')
					prNew.expand();
                prNew.show();
            }
            if(this.viewMode == '2d'){
				pl.contract();
				this.animatePages(pr, pl, instant,prNew,this.pages[i - 3]);
			}else
				// this.animatePages(pr, pl, instant);
				this.animatePages(pr, pl, instant,prNew,this.pages[i - 3]);
			this.main.playFlipSound();
			if(plNew) plNew.slideLeft(true)
			if(prNew) prNew.slideRight(true)
        }
		
        this.rightIndex = i;

//        if(this.main.p && this.pages[0].imageSrc != "images/Art-1.jpg")
//            this.rightIndex = 0;
    },
    /**
     * page flip animation
     * @param first
     * @param second
     */
    animatePages:function (first, second, instant, belowFirst, belowSecond) {
        this.animating = true;
        var self = this,
            time1 = self.options.time1,
            time2 = self.options.time2,
            transition1 = self.options.transition1,
            transition2 = self.options.transition2
            ;

			if(typeof(instant) != 'undefined' && instant){
				time1 = time2 = 0;
			}
	
        first.show();
        // jQuery(first.wrapper).css(self.transform,'rotateY(0deg)');
        //FIRST START
        if(this.viewMode == '3d') {

            second.show();
            jQuery(second.wrapper).css('visibility', 'hidden');

            jQuery(first.wrapper).css('visibility', 'visible');
            jQuery(first.wrapper).css("text-indent", '0px');
            jQuery(first.wrapper).css(self.transform,'rotateY(0deg)');
			
			first.translateZ(true)

            var angle = (first.index < second.index)  ? "-90" : "90";

            // jQuery(first.overlay).animate({opacity:self.shadow1opacity},{duration:time1,easing:transition1});

            jQuery(first.wrapper).animate(
                {
                    textIndent: angle
                },
                {
                    step: function(now,fx) {
                            jQuery(this).css(self.transform,'rotateY('+Math.round(now)+'deg)');
//                            console.log(now);
                        },
                    duration:time1,
                    easing:transition1,
                    complete:function(){
                        //----------------
                        // FIRST COMPLETE
                        //----------------
//                        console.log("complete");
//                        console.log("angle : "+angle);
						first.translateZ(false)
						second.translateZ(true)
                        first.hide();
                        first.hideVisibility();
                        jQuery(second.wrapper).css('visibility', 'visible');
                        //shadow
                        // jQuery(second.overlay).css('opacity',self.shadow1opacity);
                        // jQuery(second.overlay).animate({opacity:0},{duration:time2,easing:transition2});
                        //first complete, animate second
                        jQuery(second.wrapper).css(self.transform,'rotateY('+angle+'deg)');

                        //second initial ange
                        jQuery(second.wrapper).css("text-indent", String(-angle)+'px');
                        jQuery(second.wrapper).animate(
                            {
                                textIndent: 0
                            },
                            {
                                step: function(now,fx) {
									jQuery(this).css(self.transform,'rotateY('+Math.round(now)+'deg)');
//                                        console.log(now);
								},
                                complete:function(){
									jQuery(first.wrapper).css(self.transform,'rotateY(0deg)');
									jQuery(first.wrapper).css('visibility','visible');
									jQuery(second.wrapper).css(self.transform,'rotateY(0deg)');
									jQuery(second.wrapper).css('visibility','visible');
									second.translateZ(false)
									
									//slide to center if needed
									if(self.rightIndex == 0 && !self.pages[0].isCentered){
										self.pages[0].slideCenter(time1 == 0, function(){
											
										});
									}else if(self.rightIndex == self.pages.length && !self.pages[0].isCentered){
										self.pages[self.pages.length-1].slideCenter(time1 == 0, function(){
											
										});
									}
                                },
                                duration:time2,
                                easing:transition2
                            }
                        );
                    }
                }
            );
        }
        else {
			if(belowFirst){
				// jQuery(belowFirst.overlay).css('opacity',self.shadow1opacity);
				// jQuery(belowFirst.overlay).animate({opacity:0},{duration:time1,easing:transition1});
			}
			// time1 = 3000
			// time2 = 3000
			//here animate transform scale
			// transform: scale(.5,1);
// transform-origin: 0% 0%; - for right pages
// transform-origin: 100% 0%; - for left pages
			
			
			first.translateZ(true)
			
			var scale = '100px'
			var self = this
			jQuery(first.wrapper).animate({
				textIndent: scale
			},{
				step: function(now,fx) {
					jQuery(first.wrapper).css('transform','scale('+Number(1-now/100)+',1)');
					// console.log(now);
				},
				complete:function(){
					//FIRST COMPLETED
					first.translateZ(false)
					second.translateZ(true)
					second.show();
					jQuery(second.wrapper).css('text-indent','100px')
					jQuery(second.wrapper).animate({
						textIndent: 0
					},{
					
						step: function(now,fx) {
							jQuery(second.wrapper).css('transform','scale('+Number(1.0-now/100)+',1)');
							// console.log(Number(1.0-now/100));
							// console.log(now);
						},
						complete:function(){
							//SECOND COMPLETED
							second.translateZ(false)
							//slide to center if needed
							if(self.rightIndex == 0 && !self.pages[0].isCentered){
								self.pages[0].slideCenter(time1 == 0, function(){
									
								});
							}else if(self.rightIndex == self.pages.length && !self.pages[0].isCentered){
								self.pages[self.pages.length-1].slideCenter(time1 == 0, function(){
									
								});
							}
						},
						duration:time2,
						easing:transition2
					})
				},
				duration:time1,
				easing:transition1
			});
								
								
								
								
			/*					
			jQuery(first.wrapper).animate({width:0}, time1, transition1, function() {
				first.translateZ(false)
				second.translateZ(true)
				second.show();
				if(belowSecond){
					// jQuery(belowSecond.overlay).animate({opacity:self.shadow1opacity},{duration:time2,easing:transition2});
				}
				jQuery(second.wrapper).animate({width:second.width}, time2, transition2, function(){
					second.translateZ(false)
				});
			});*/

        }

        //BOTH COMPLETE
        setTimeout(function () {
			self.main.turnPageComplete();
			self.animating = false;
			self.updateVisiblePages();
			// first.overlay.style.opacity = '0';
			if(self.viewMode == '3d') {
				// second.translateZ(false)
				jQuery(first.wrapper).css(self.transform,'rotateY(0deg)');
				jQuery(second.wrapper).css(self.transform,'rotateY(0deg)');
			}
        }, Number(time1)+Number(time2));
    },
    /**
     * update page visibility depending on current page index
     */
    updateVisiblePages:function () {
        if (this.animating)
            return;
        for (var i = 0; i < this.pages.length; i++) {
            if ((i < (this.rightIndex - 1)) || (i > (this.rightIndex))) {
				if(this.pages[i]){
					if(this.viewMode == '2d')
						this.pages[i].contract();
					this.pages[i].hide();
				}
            }
            else {
				if(this.pages[i]){
					if(this.viewMode == '2d')
						this.pages[i].expand();
					this.pages[i].show();
				}
            }
            if (this.rightIndex == 0) {
				if(this.pages[1]){
					if(this.viewMode == '2d')
						this.pages[1].contract();
					 this.pages[1].hide();
				}
            }
        }

        var index =this.rightIndex, pages = this.pages;
        // if(index > 2)
            // pages[index -3].loadPage();
        // if(index > 0)
            // pages[index -2].loadPage();
        if(index > 0){
			if(pages[index -1])
				pages[index -1].loadPage();
			if(pages[index -2])
				pages[index -2].loadPage();
			if(pages[index -3])
				pages[index -3].loadPage();
        }
		
		if(index < pages.length){
			if(pages[index])
				pages[index].loadPage();
			if(pages[index+1])
				pages[index+1].loadPage();
			if(pages[index+2])
				pages[index+2].loadPage();
		}
        // if(index < pages.length && index <pages.length-1)
            // pages[index +1].loadPage();
        // if(index < pages.length-2)
            // pages[index +2].loadPage();

        if(index > 0 && index < this.pages.length){
            this.shadowBoth();
        }else if(index == 0){
            this.shadowRight();
        }else{
            this.shadowLeft();
        }
    },
    /**
     * go to next page
     */
    nextPage:function () {
        if (this.rightIndex == this.pages.length || this.animating)
            return;
        this.goToPage(this.rightIndex + 2);
    },
    /**
     * go to previous page
     */
    prevPage:function () {
        if (this.rightIndex == 0 || this.animating)
            return;
        this.goToPage(this.rightIndex - 2);
    },
	enable:function(){
		this.enabled = true
	},
    disable:function(){
		this.enabled = false
	},
    shadowRight:function(){
        // if(this.shadowLVisible){
            // this.shadowLVisible = false;
            // this.shadowL.style.display = 'none';
        // }
        // if(!this.shadowRVisible){
            // this.shadowRVisible = true;
            // this.shadowR.style.display = 'block';
        // }
    },
    shadowLeft:function(){
        // if(this.shadowRVisible){
            // this.shadowRVisible = false;
            // this.shadowR.style.display = 'none';
        // }
        // if(!this.shadowLVisible){
            // this.shadowLVisible = true;
            // this.shadowL.style.display = 'block';
        // }
    },
    shadowBoth:function(){
        // if(!this.shadowRVisible){
            // this.shadowRVisible = true;
            // this.shadowR.style.display = 'block';
        // }
        // if(!this.shadowLVisible){
            // this.shadowLVisible = true;
            // this.shadowL.style.display = 'block';
        // }
    },
    shadowNone:function(){
        // if(this.shadowRVisible){
            // this.shadowRVisible = false;
            // this.shadowR.style.display = 'none';
        // }
        // if(this.shadowLVisible){
            // this.shadowLVisible = false;
            // this.shadowL.style.display = 'none';
        // }
    },
	
	singlePageMode:function(){
		// this.pages.forEach(function(page){
			// page.slideCenter(true)
		// })
	}

};
}

{/* FLIPBOOK.Page */
FLIPBOOK.Page = function (options, width, height, index, book) {


    this.wrapper = document.createElement('div');
    jQuery(this.wrapper).addClass('flipbook-page');
    this.s = this.wrapper.style;
    this.s.width = String(width) + 'px';
    this.s.height = String(height) + 'px';
    this.index = index;
    this.book = book;
    this.width = width;
    this.height = height;

    this.invisible = false;

    this.image = new Image();
    /**
     * lightweight preloader for the page - shows until the page is loaded
     */
    this.image.src = book.options.assets.preloader;
    this.imageSrc = options.src;
    this.wrapper.appendChild(this.image);

    this.imageLoader = new Image();

    //shadow only on left page
//    if (this.index % 2 != 0) {
//        this.shadow = new Image();
//        this.wrapper.appendChild(this.shadow);
//    }

    //black overlay that will be used for shadow in 3d flip
   /* this.overlay = new Image();
    this.overlay.src = book.options.assets.overlay;
    this.wrapper.appendChild(this.overlay);
    this.overlay.style.opacity = '0';
*/
    this.expanded = true;
	this.slideCenter(true);


//    this.clickArea = document.createElement('div');
//    this.clickArea.classList.add('flipbook-page-clickArea');

    this.htmlContent = options.htmlContent;

	

    //right pages (indexes 1,3,5,...)
    if (this.index % 2 == 0) {
		jQuery(this.wrapper).css("box-shadow", "5px 10px 20px rgba(0, 0, 0, .5)")
        this.s.zIndex = String(100 - this.index);
        this.right(this.image);
		jQuery(this.wrapper).css('transform-origin','0%')
       /* this.right(this.overlay);*/
    }
    //left pages (indexes 0,2,4,...)
    else {
		jQuery(this.wrapper).css("box-shadow", "-5px 10px 20px rgba(0, 0, 0, .5)")
//        shadow on left page
        this.shadow = new Image();
        this.wrapper.appendChild(this.shadow);
        this.shadow.src = book.options.assets.left;
        this.left(this.shadow);

        this.s.zIndex = String(100 + this.index);
        this.left(this.image);
		jQuery(this.wrapper).css('transform-origin','100%')
        /*this.left(this.overlay);*/
    }
	
    if(typeof  this.htmlContent !== 'undefined'){
        this.htmlContainer = document.createElement('div');
        jQuery(this.htmlContainer).addClass('flipbook-page-htmlContainer');
        this.wrapper.appendChild(this.htmlContainer);
        this.index % 2 == 0 ? this.right(this.htmlContainer) : this.left(this.htmlContainer);
    }

//    this.wrapper.appendChild(this.clickArea);

    // this.image.style[this.book.transform] = 'translateZ(0)';

    // this.overlay.style[this.book.transform] = 'translateZ(0)';
    /*this.overlay.style['pointer-events'] = 'none';*/

    if(this.shadow){
        // this.shadow.style[this.book.transform] = 'translateZ(0)';
        this.shadow.style['pointer-events'] = 'none';
        this.shadow.style['background'] = 'none';
    }

    this.s.top = '0px';

    if (this.book.viewMode == '3d') {
        this.wrapper.style[this.book.transformOrigin] = (this.index % 2 != 0) ? '100% 50%' : '0% 50%';
    }
	
    //links

    if(options.links)
    {
        var self = this;
        for(var i= 0; i<options.links.length;i++){

            var link = options.links[i];

            function createLink(link){
                var l = document.createElement('div');
                self.wrapper.appendChild(l);
                // l.classList.add("flipbook-page-link");
				l.className +=" flipbook-page-link";
                l.style.position = 'absolute';
                l.style.left = String(link.x)+'px';
                l.style.top = String(link.y)+'px';
                l.style.width = String(link.width)+'px';
                l.style.height = String(link.height)+'px';
                l.style.backgroundColor = link.color;
                l.style.opacity = link.alpha;
                l.style.cursor = 'pointer';
                jQuery(l)
                    .click(function(e){
					
					// e.preventDefault();
					
					
                        if(Number(link.page)>0 ){
                            book.goToPage(Number(link.page))
                        }else if(String(link.url) != ''){
							setTimeout(function(){
                            window.open(link.url, '_blank');
							},100);
                        }
                    })
                    .mouseenter(function(){
                        l.style.backgroundColor = link.hoverColor;
                        l.style.opacity = link.hoverAlpha;
                    })
                    .mouseleave(function(){
                        l.style.backgroundColor = link.color;
                        l.style.opacity = link.alpha;
                    })

                ;
            }
            createLink(link);

        }
    }

};
 FLIPBOOK.Page.prototype = {
    loadPage:function () {
        if(this.loaded == true)
            return;
        this.loaded = true;
        var self = this, main = this.book.main;
		
		if(main.options.pdfUrl != ""){
			if(typeof(this.imageSrc) == "undefined"){
				main.loadPageFromPdf(this.index, function(){
					self.imageLoader.src = main.pages[self.index].src;
					jQuery(self.imageLoader).load(function () {
						self.image.src = self.imageLoader.src;
					});
				})
				return;
			}
		}
		
        self.imageLoader.src = this.imageSrc;
		
		//if pdf - load page from pdf, on complete do this
        jQuery(self.imageLoader).load(function () {
            self.image.src = self.imageSrc;
        });
        if(typeof(this.htmlContent) !== 'undefined'){
            this.htmlContainer.innerHTML = this.htmlContent;
        }
    },
	
	slideRight:function(instant, onComplete){
		var t = instant ? 0 : 200
		jQuery(this.wrapper).animate({
			left:'50%'
		}, t, function(){
			if(typeof(onComplete) != 'undefined') onComplete()
		});
		this.isCentered = false;
	},
	
	slideLeft:function(instant, onComplete){
		var t = instant ? 0 : 200
		jQuery(this.wrapper).animate({
			left:'0%'
		}, t, function(){
			if(typeof(onComplete) != 'undefined') onComplete()
		});
		this.isCentered = false;
	},
	
	slideCenter:function(instant, onComplete){
		var t = instant ? 0 : 200
		jQuery(this.wrapper).animate({
			left:'25%'
		}, t, function(){
			if(typeof(onComplete) != 'undefined') onComplete()
		});
		this.isCentered = true;
	},
	
	translateZ:function(val){
	
		if(val){
			this.image.style[this.book.transform] = 'translateZ(0)';
			/*this.overlay.style[this.book.transform] = 'translateZ(0)';*/
			if(this.shadow){
				this.shadow.style[this.book.transform] = 'translateZ(0)';
			}
		}else{
			this.image.style[this.book.transform] = '';
			/*this.overlay.style[this.book.transform] = '';*/
			if(this.shadow){
				this.shadow.style[this.book.transform] = '';
			}
		}
	},

    flipView:function () {

    },
    /**
     * expand page to full width
     */
    expand:function () {
        if(!this.expanded)
            // this.s.width = String(this.width) + 'px';
            jQuery(this.wrapper).css('transform','scale(1,1)')
        this.expanded = true;
    },
    /**
     * contract page to width 0
     */
    contract:function () {
        if(this.expanded)
            // this.s.width = '0px';
            jQuery(this.wrapper).css('transform','scale(0,1)')
        this.expanded = false;
    },
    show:function () {
        if(this.hidden){
//            this.invisible = false;
//            this.s.visibility = 'visible';
            this.s.display = 'block';
			// this.translateZ(true)
			
        }
        this.hidden = false;
    },
    hide:function () {
        if(!this.hidden){
            this.s.display = 'none';
			// this.translateZ(false)
        }
//            this.s.visibility = 'hidden';
        this.hidden = true;
    },
    hideVisibility:function () {
        if(!this.invisible)
            this.s.visibility = 'hidden';
        this.invisible = true;
    },
    /**
     * init left page image
     * @param image
     */
    left:function (image) {
        var s= image.style;
        s.width = String(this.width) + 'px';
        s.height = String(this.height) + 'px';
        s.position = 'absolute';
        s.top = '0px';
        s.right = '0px';
    },
    /**
     * init right page image
     * @param image
     */
    right:function (image) {
        var s= image.style;
        s.width = String(this.width) + 'px';
        s.height = String(this.height) + 'px';
        s.position = 'absolute';
        s.top = '0px';
        s.left = '0px';
    }
};
}

{/* IScroll */


/*! iScroll v5.1.3 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
(function (window, document, Math) {
var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { window.setTimeout(callback, 1000 / 60); };

var utils = (function () {
	var me = {};

	var _elementStyle = document.createElement('div').style;
	var _vendor = (function () {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			transform = vendors[i] + 'ransform';
			if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
		}

		return false;
	})();

	function _prefixStyle (style) {
		if ( _vendor === false ) return false;
		if ( _vendor === '' ) return style;
		return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}

	me.getTime = Date.now || function getTime () { return new Date().getTime(); };

	me.extend = function (target, obj) {
		for ( var i in obj ) {
			target[i] = obj[i];
		}
	};

	me.addEvent = function (el, type, fn, capture) {
		el.addEventListener(type, fn, !!capture);
	};

	me.removeEvent = function (el, type, fn, capture) {
		el.removeEventListener(type, fn, !!capture);
	};

	me.prefixPointerEvent = function (pointerEvent) {
		return window.MSPointerEvent ? 
			'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10):
			pointerEvent;
	};

	me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
		var distance = current - start,
			speed = Math.abs(distance) / time,
			destination,
			duration;

		deceleration = deceleration === undefined ? 0.0006 : deceleration;

		destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		duration = speed / deceleration;

		if ( destination < lowerMargin ) {
			destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
			distance = Math.abs(destination - current);
			duration = distance / speed;
		} else if ( destination > 0 ) {
			destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
			distance = Math.abs(current) + destination;
			duration = distance / speed;
		}

		return {
			destination: Math.round(destination),
			duration: duration
		};
	};

	var _transform = _prefixStyle('transform');

	me.extend(me, {
		hasTransform: _transform !== false,
		hasPerspective: _prefixStyle('perspective') in _elementStyle,
		hasTouch: 'ontouchstart' in window,
		hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
		hasTransition: _prefixStyle('transition') in _elementStyle
	});

	// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
	me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

	me.extend(me.style = {}, {
		transform: _transform,
		transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
		transitionDuration: _prefixStyle('transitionDuration'),
		transitionDelay: _prefixStyle('transitionDelay'),
		transformOrigin: _prefixStyle('transformOrigin')
	});

	me.hasClass = function (e, c) {
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
		return re.test(e.className);
	};

	me.addClass = function (e, c) {
		if ( me.hasClass(e, c) ) {
			return;
		}

		var newclass = e.className.split(' ');
		newclass.push(c);
		e.className = newclass.join(' ');
	};

	me.removeClass = function (e, c) {
		if ( !me.hasClass(e, c) ) {
			return;
		}

		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
		e.className = e.className.replace(re, ' ');
	};

	me.offset = function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;

		// jshint -W084
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		// jshint +W084

		return {
			left: left,
			top: top
		};
	};

	me.preventDefaultException = function (el, exceptions) {
		for ( var i in exceptions ) {
			if ( exceptions[i].test(el[i]) ) {
				return true;
			}
		}

		return false;
	};

	me.extend(me.eventType = {}, {
		touchstart: 1,
		touchmove: 1,
		touchend: 1,

		mousedown: 2,
		mousemove: 2,
		mouseup: 2,

		pointerdown: 3,
		pointermove: 3,
		pointerup: 3,

		MSPointerDown: 3,
		MSPointerMove: 3,
		MSPointerUp: 3
	});

	me.extend(me.ease = {}, {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function (k) {
				return k * ( 2 - k );
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
			fn: function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			}
		},
		back: {
			style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			fn: function (k) {
				var b = 4;
				return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
			}
		},
		bounce: {
			style: '',
			fn: function (k) {
				if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
					return 7.5625 * k * k;
				} else if ( k < ( 2 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else if ( k < ( 2.5 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			}
		},
		elastic: {
			style: '',
			fn: function (k) {
				var f = 0.22,
					e = 0.4;

				if ( k === 0 ) { return 0; }
				if ( k == 1 ) { return 1; }

				return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
			}
		}
	});

	me.tap = function (e, eventName) {
		var ev = document.createEvent('Event');
		ev.initEvent(eventName, true, true);
		ev.pageX = e.pageX;
		ev.pageY = e.pageY;
		e.target.dispatchEvent(ev);
	};

	me.click = function (e) {
		var target = e.target,
			ev;

		if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
			ev = document.createEvent('MouseEvents');
			ev.initMouseEvent('click', true, true, e.view, 1,
				target.screenX, target.screenY, target.clientX, target.clientY,
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
				0, null);

			ev._constructed = true;
			target.dispatchEvent(ev);
		}
	};

	return me;
})();

function IScroll (el, options) {
	this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.scrollerStyle = this.scroller.style;		// cache style for better performance

	this.options = {

		zoomMin: 1,
		zoomMax: 4, startZoom: 1,

		resizeScrollbars: true,

		mouseWheelSpeed: 20,

		snapThreshold: 0.334,

// INSERT POINT: OPTIONS 

		startX: 0,
		startY: 0,
		scrollY: true,
		directionLockThreshold: 5,
		momentum: true,

		bounce: true,
		bounceTime: 600,
		bounceEasing: '',

		preventDefault: true,
		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

		HWCompositing: true,
		useTransition: true,
		useTransform: true,
		
		keepInCenterH:false,
        keepInCenterV:false
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	// Normalize options
	this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	this.options.useTransition = utils.hasTransition && this.options.useTransition;
	this.options.useTransform = utils.hasTransform && this.options.useTransform;

	this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	// If you want eventPassthrough I have to lock one of the axes
	this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	// With eventPassthrough we also need lockDirection mechanism
	this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	if ( this.options.tap === true ) {
		this.options.tap = 'tap';
	}

	if ( this.options.shrinkScrollbars == 'scale' ) {
		this.options.useTransition = false;
	}

	this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

// INSERT POINT: NORMALIZATION

	// Some defaults	
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	this.directionY = 0;
	this._events = {};

	this.scale = Math.min(Math.max(this.options.startZoom, this.options.zoomMin), this.options.zoomMax);

// INSERT POINT: DEFAULTS

	this._init();
	this.refresh();

	this.scrollTo(this.options.startX, this.options.startY);
	this.enable();
}

IScroll.prototype = {
	version: '5.1.3',

	_init: function () {
		this._initEvents();

		if ( this.options.zoom ) {
			this._initZoom();
		}

		if ( this.options.scrollbars || this.options.indicators ) {
			this._initIndicators();
		}

		if ( this.options.mouseWheel ) {
			this._initWheel();
		}

		if ( this.options.snap ) {
			this._initSnap();
		}

		if ( this.options.keyBindings ) {
			this._initKeys();
		}

// INSERT POINT: _init

	},

	destroy: function () {
		this._initEvents(true);

		this._execEvent('destroy');
	},

	_transitionEnd: function (e) {
		if ( e.target != this.scroller || !this.isInTransition ) {
			return;
		}

		this._transitionTime();
		if ( !this.resetPosition(this.options.bounceTime) ) {
			this.isInTransition = false;
			this._execEvent('scrollEnd');
		}
	},

	_start: function (e) {
		// React to left mouse button only
		if ( utils.eventType[e.type] != 1 ) {
			if ( e.button !== 0 ) {
				return;
			}
		}

		if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
			return;
		}

		if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.touches ? e.touches[0] : e,
			pos;

		this.initiated	= utils.eventType[e.type];
		this.moved		= false;
		this.distX		= 0;
		this.distY		= 0;
		this.directionX = 0;
		this.directionY = 0;
		this.directionLocked = 0;

		this._transitionTime();

		this.startTime = utils.getTime();

		if ( this.options.useTransition && this.isInTransition ) {
			this.isInTransition = false;
			pos = this.getComputedPosition();
			this._translate(Math.round(pos.x), Math.round(pos.y));
			this._execEvent('scrollEnd');
		} else if ( !this.options.useTransition && this.isAnimating ) {
			this.isAnimating = false;
			this._execEvent('scrollEnd');
		}

		this.startX    = this.x;
		this.startY    = this.y;
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX    = point.pageX;
		this.pointY    = point.pageY;

		this._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
			e.preventDefault();
		}

		var point		= e.touches ? e.touches[0] : e,
			deltaX		= point.pageX - this.pointX,
			deltaY		= point.pageY - this.pointY,
			timestamp	= utils.getTime(),
			newX, newY,
			absDistX, absDistY;

		this.pointX		= point.pageX;
		this.pointY		= point.pageY;

		this.distX		+= deltaX;
		this.distY		+= deltaY;
		absDistX		= Math.abs(this.distX);
		absDistY		= Math.abs(this.distY);

		// We need to move at least 10 pixels for the scrolling to initiate
		if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
			return;
		}

		// If you are scrolling in one direction lock the other
		if ( !this.directionLocked && !this.options.freeScroll ) {
			if ( absDistX > absDistY + this.options.directionLockThreshold ) {
				this.directionLocked = 'h';		// lock horizontally
			} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
				this.directionLocked = 'v';		// lock vertically
			} else {
				this.directionLocked = 'n';		// no lock
			}
		}

		if ( this.directionLocked == 'h' ) {
			if ( this.options.eventPassthrough == 'vertical' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'horizontal' ) {
				this.initiated = false;
				return;
			}

			deltaY = 0;
		} else if ( this.directionLocked == 'v' ) {
			if ( this.options.eventPassthrough == 'horizontal' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'vertical' ) {
				this.initiated = false;
				return;
			}

			deltaX = 0;
		}

		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		deltaY = this.hasVerticalScroll ? deltaY : 0;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		// Slow down if outside of the boundaries
		if ( newX > 0 || newX < this.maxScrollX ) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if ( newY > 0 || newY < this.maxScrollY ) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}

		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if ( !this.moved ) {
			this._execEvent('scrollStart');
		}

		this.moved = true;

		this._translate(newX, newY);

/* REPLACE START: _move */

		if ( timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;
		}

/* REPLACE END: _move */

	},

	_end: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.changedTouches ? e.changedTouches[0] : e,
			momentumX,
			momentumY,
			duration = utils.getTime() - this.startTime,
			newX = Math.round(this.x),
			newY = Math.round(this.y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';

		this.isInTransition = 0;
		this.initiated = 0;
		this.endTime = utils.getTime();

		// reset if we are outside of the boundaries
		if ( this.resetPosition(this.options.bounceTime) ) {
			return;
		}

		this.scrollTo(newX, newY);	// ensures that the last position is rounded

		// we scrolled less than 10 pixels
		if ( !this.moved ) {
			if ( this.options.tap ) {
				utils.tap(e, this.options.tap);
			}

			if ( this.options.click ) {
				utils.click(e);
			}

			this._execEvent('scrollCancel');
			return;
		}

		if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
			this._execEvent('flick');
			return;
		}

		// start momentum animation if needed
		if ( this.options.momentum && duration < 300 ) {
			momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
			momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		}


		if ( this.options.snap ) {
			var snap = this._nearestSnap(newX, newY);
			this.currentPage = snap;
			time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(newX - snap.x), 1000),
						Math.min(Math.abs(newY - snap.y), 1000)
					), 300);
			newX = snap.x;
			newY = snap.y;

			this.directionX = 0;
			this.directionY = 0;
			easing = this.options.bounceEasing;
		}

// INSERT POINT: _end

		if ( newX != this.x || newY != this.y ) {
			// change easing function when scroller goes out of the boundaries
			if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
				easing = utils.ease.quadratic;
			}

			this.scrollTo(newX, newY, time, easing);
			return;
		}

		this._execEvent('scrollEnd');
	},

	_resize: function () {
		var that = this;

		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(function () {
			that.refresh();
		}, this.options.resizePolling);
	},

	resetPosition: function (time) {
		var x = this.x,
			y = this.y;

		time = time || 0;

		if ( !this.hasHorizontalScroll || this.x > 0 ) {
			x = 0;
		} else if ( this.x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( !this.hasVerticalScroll || this.y > 0 ) {
			y = 0;
		} else if ( this.y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		if ( x == this.x && y == this.y ) {
			return false;
		}

		/*if(this.options.keepInCenterH && $(this.wrapper).width() > $(this.scroller).width())
			x = ($(this.wrapper).width() - $(this.scroller).width()) / 2*/

		this.scrollTo(x, y, time, this.options.bounceEasing);

		return true;
	},

	disable: function () {
		this.enabled = false;
	},

	enable: function () {
		this.enabled = true;
	},

	refresh: function () {
		var rf = this.wrapper.offsetHeight;		// Force reflow

		this.wrapperWidth	= this.wrapper.clientWidth;
		this.wrapperHeight	= this.wrapper.clientHeight;

/* REPLACE START: refresh */
	this.scrollerWidth	= Math.round(this.scroller.offsetWidth * this.scale);
	this.scrollerHeight	= Math.round(this.scroller.offsetHeight * this.scale);

	this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
	this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;
/* REPLACE END: refresh */

		this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
		this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

		if ( !this.hasHorizontalScroll ) {
			this.maxScrollX = 0;
			this.scrollerWidth = this.wrapperWidth;
		}

		if ( !this.hasVerticalScroll ) {
			this.maxScrollY = 0;
			this.scrollerHeight = this.wrapperHeight;
		}

		this.endTime = 0;
		this.directionX = 0;
		this.directionY = 0;

		this.wrapperOffset = utils.offset(this.wrapper);

		this._execEvent('refresh');

		this.resetPosition();

// INSERT POINT: _refresh

	},

	on: function (type, fn) {
		if ( !this._events[type] ) {
			this._events[type] = [];
		}

		this._events[type].push(fn);
	},

	off: function (type, fn) {
		if ( !this._events[type] ) {
			return;
		}

		var index = this._events[type].indexOf(fn);

		if ( index > -1 ) {
			this._events[type].splice(index, 1);
		}
	},

	_execEvent: function (type) {
		if ( !this._events[type] ) {
			return;
		}

		var i = 0,
			l = this._events[type].length;

		if ( !l ) {
			return;
		}

		for ( ; i < l; i++ ) {
			this._events[type][i].apply(this, [].slice.call(arguments, 1));
		}
	},

	scrollBy: function (x, y, time, easing) {
		x = this.x + x;
		y = this.y + y;
		time = time || 0;

		this.scrollTo(x, y, time, easing);
	},

	scrollTo: function (x, y, time, easing) {

		if(this.options.keepInCenterH && $(this.scroller).width()*this.scale < $(this.wrapper).width())
			x = $(this.wrapper).width()/2 - $(this.scroller).width()*this.scale/2

		if(this.options.keepInCenterV && $(this.scroller).height()*this.scale < $(this.wrapper).height())
			y = $(this.wrapper).height()/2 - $(this.scroller).height()*this.scale/2

		easing = easing || utils.ease.circular;

		this.isInTransition = this.options.useTransition && time > 0;

		if ( !time || (this.options.useTransition && easing.style) ) {
			this._transitionTimingFunction(easing.style);
			this._transitionTime(time);
			this._translate(x, y);
		} else {
			this._animate(x, y, time, easing.fn);
		}
	},

	scrollToElement: function (el, time, offsetX, offsetY, easing) {
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if ( !el ) {
			return;
		}

		var pos = utils.offset(el);

		pos.left -= this.wrapperOffset.left;
		pos.top  -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		if ( offsetX === true ) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if ( offsetY === true ) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}

		pos.left -= offsetX || 0;
		pos.top  -= offsetY || 0;

		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

		time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

		this.scrollTo(pos.left, pos.top, time, easing);
	},

	_transitionTime: function (time) {
		time = time || 0;

		this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
		}


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTime(time);
			}
		}


// INSERT POINT: _transitionTime

	},

	_transitionTimingFunction: function (easing) {
		this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTimingFunction(easing);
			}
		}


// INSERT POINT: _transitionTimingFunction

	},

	_translate: function (x, y) {
	
		if ( this.options.useTransform ) {

/* REPLACE START: _translate */			this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ') ' + this.translateZ;/* REPLACE END: _translate */

		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = x + 'px';
			this.scrollerStyle.top = y + 'px';
		}

		this.x = x;
		this.y = y;


	if ( this.indicators ) {
		for ( var i = this.indicators.length; i--; ) {
			this.indicators[i].updatePosition();
		}
	}


// INSERT POINT: _translate

	},

	_initEvents: function (remove) {
		var eventType = remove ? utils.removeEvent : utils.addEvent,
			target = this.options.bindToWrapper ? this.wrapper : window;

		eventType(window, 'orientationchange', this);
		eventType(window, 'resize', this);

		if ( this.options.click ) {
			eventType(this.wrapper, 'click', this, true);
		}

		if ( !this.options.disableMouse ) {
			eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
			eventType(target, 'mouseup', this);
		}

		if ( utils.hasPointer && !this.options.disablePointer ) {
			eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
			eventType(target, utils.prefixPointerEvent('pointermove'), this);
			eventType(target, utils.prefixPointerEvent('pointercancel'), this);
			eventType(target, utils.prefixPointerEvent('pointerup'), this);
		}

		if ( utils.hasTouch && !this.options.disableTouch ) {
			eventType(this.wrapper, 'touchstart', this);
			eventType(target, 'touchmove', this);
			eventType(target, 'touchcancel', this);
			eventType(target, 'touchend', this);
		}

		eventType(this.scroller, 'transitionend', this);
		eventType(this.scroller, 'webkitTransitionEnd', this);
		eventType(this.scroller, 'oTransitionEnd', this);
		eventType(this.scroller, 'MSTransitionEnd', this);
	},

	getComputedPosition: function () {
		var matrix = window.getComputedStyle(this.scroller, null),
			x, y;

		if ( this.options.useTransform ) {
			matrix = matrix[utils.style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}

		return { x: x, y: y };
	},

	_initIndicators: function () {
		var interactive = this.options.interactiveScrollbars,
			customStyle = typeof this.options.scrollbars != 'string',
			indicators = [],
			indicator;

		var that = this;

		this.indicators = [];

		if ( this.options.scrollbars ) {
			// Vertical scrollbar
			if ( this.options.scrollY ) {
				indicator = {
					el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if ( this.options.scrollX ) {
				indicator = {
					el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}
		}

		if ( this.options.indicators ) {
			// TODO: check concat compatibility
			indicators = indicators.concat(this.options.indicators);
		}

		for ( var i = indicators.length; i--; ) {
			this.indicators.push( new Indicator(this, indicators[i]) );
		}

		// TODO: check if we can use array.map (wide compatibility and performance issues)
		function _indicatorsMap (fn) {
			for ( var i = that.indicators.length; i--; ) {
				fn.call(that.indicators[i]);
			}
		}

		if ( this.options.fadeScrollbars ) {
			this.on('scrollEnd', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollCancel', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1);
				});
			});

			this.on('beforeScrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1, true);
				});
			});
		}


		this.on('refresh', function () {
			_indicatorsMap(function () {
				this.refresh();
			});
		});

		this.on('destroy', function () {
			_indicatorsMap(function () {
				this.destroy();
			});

			delete this.indicators;
		});
	},

	_initZoom: function () {
		this.scrollerStyle[utils.style.transformOrigin] = '0 0';
	},

	_zoomStart: function (e) {
		var c1 = Math.abs( e.touches[0].pageX - e.touches[1].pageX ),
			c2 = Math.abs( e.touches[0].pageY - e.touches[1].pageY );

		this.touchesDistanceStart = Math.sqrt(c1 * c1 + c2 * c2);
		this.startScale = this.scale;

		this.originX = Math.abs(e.touches[0].pageX + e.touches[1].pageX) / 2 + this.wrapperOffset.left - this.x;
		this.originY = Math.abs(e.touches[0].pageY + e.touches[1].pageY) / 2 + this.wrapperOffset.top - this.y;

		this._execEvent('zoomStart');
	},

	_zoom: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {
			e.preventDefault();
		}

		var c1 = Math.abs( e.touches[0].pageX - e.touches[1].pageX ),
			c2 = Math.abs( e.touches[0].pageY - e.touches[1].pageY ),
			distance = Math.sqrt( c1 * c1 + c2 * c2 ),
			scale = 1 / this.touchesDistanceStart * distance * this.startScale,
			lastScale,
			x, y;

		this.scaled = true;

		if ( scale < this.options.zoomMin ) {
			scale = 0.5 * this.options.zoomMin * Math.pow(2.0, scale / this.options.zoomMin);
		} else if ( scale > this.options.zoomMax ) {
			scale = 2.0 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / scale);
		}

		lastScale = scale / this.startScale;
		x = this.originX - this.originX * lastScale + this.startX;
		y = this.originY - this.originY * lastScale + this.startY;

		this.scale = scale;

		this.scrollTo(x, y, 0);
	},

	_zoomEnd: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {
			e.preventDefault();
		}

		var newX, newY,
			lastScale;

		this.isInTransition = 0;
		this.initiated = 0;

		if ( this.scale > this.options.zoomMax ) {
			this.scale = this.options.zoomMax;
		} else if ( this.scale < this.options.zoomMin ) {
			this.scale = this.options.zoomMin;
		}

		// Update boundaries
		this.refresh();

		lastScale = this.scale / this.startScale;

		newX = this.originX - this.originX * lastScale + this.startX;
		newY = this.originY - this.originY * lastScale + this.startY;

		if ( newX > 0 ) {
			newX = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
		}

		if ( newY > 0 ) {
			newY = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
		}

		if ( this.x != newX || this.y != newY ) {
			this.scrollTo(newX, newY, this.options.bounceTime);
		}

		this.scaled = false;

		this._execEvent('zoomEnd');
	},

	zoom: function (scale, x, y, time) {
		if ( scale < this.options.zoomMin ) {
			scale = this.options.zoomMin;
		} else if ( scale > this.options.zoomMax ) {
			scale = this.options.zoomMax;
		}

		if ( scale == this.scale ) {
			return;
		}

		var relScale = scale / this.scale;

		x = x === undefined ? this.wrapperWidth / 2 : x;
		y = y === undefined ? this.wrapperHeight / 2 : y;
		time = time === undefined ? 300 : time;

		x = x + this.wrapperOffset.left - this.x;
		y = y + this.wrapperOffset.top - this.y;

		x = x - x * relScale + this.x;
		y = y - y * relScale + this.y;

		this.scale = scale;

		this.refresh();		// update boundaries

		if ( x > 0 ) {
			x = 0;
		} else if ( x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( y > 0 ) {
			y = 0;
		} else if ( y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		this.scrollTo(x, y, time);
	},

	_wheelZoom: function (e) {
		var wheelDeltaY,
			deltaScale,
			that = this;

		// Execute the zoomEnd event after 400ms the wheel stopped scrolling
		clearTimeout(this.wheelTimeout);
		this.wheelTimeout = setTimeout(function () {
			that._execEvent('zoomEnd');
		}, 400);

		if ( 'deltaX' in e ) {
			wheelDeltaY = -e.deltaY / Math.abs(e.deltaY);
		} else if ('wheelDeltaX' in e) {
			wheelDeltaY = e.wheelDeltaY / Math.abs(e.wheelDeltaY);
		} else if('wheelDelta' in e) {
			wheelDeltaY = e.wheelDelta / Math.abs(e.wheelDelta);
		} else if ('detail' in e) {
			wheelDeltaY = -e.detail / Math.abs(e.wheelDelta);
		} else {
			return;
		}

		deltaScale = this.scale + wheelDeltaY / 5;

		this.zoom(deltaScale, e.pageX, e.pageY, 0);
	},

	_initWheel: function () {
		utils.addEvent(this.wrapper, 'wheel', this);
		utils.addEvent(this.wrapper, 'mousewheel', this);
		utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

		this.on('destroy', function () {
			utils.removeEvent(this.wrapper, 'wheel', this);
			utils.removeEvent(this.wrapper, 'mousewheel', this);
			utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
		});
	},

	_wheel: function (e) {
		if ( !this.enabled ) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		var wheelDeltaX, wheelDeltaY,
			newX, newY,
			that = this;

		if ( this.wheelTimeout === undefined ) {
			that._execEvent('scrollStart');
		}

		// Execute the scrollEnd event after 400ms the wheel stopped scrolling
		clearTimeout(this.wheelTimeout);
		this.wheelTimeout = setTimeout(function () {
			that._execEvent('scrollEnd');
			that.wheelTimeout = undefined;
		}, 400);

		if ( 'deltaX' in e ) {
			if (e.deltaMode === 1) {
				wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
				wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
			} else {
				wheelDeltaX = -e.deltaX;
				wheelDeltaY = -e.deltaY;
			}
		} else if ( 'wheelDeltaX' in e ) {
			wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
			wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
		} else if ( 'wheelDelta' in e ) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
		} else if ( 'detail' in e ) {
			wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
		} else {
			return;
		}

		wheelDeltaX *= this.options.invertWheelDirection;
		wheelDeltaY *= this.options.invertWheelDirection;

		if ( !this.hasVerticalScroll ) {
			wheelDeltaX = wheelDeltaY;
			wheelDeltaY = 0;
		}

		if ( this.options.snap ) {
			newX = this.currentPage.pageX;
			newY = this.currentPage.pageY;

			if ( wheelDeltaX > 0 ) {
				newX--;
			} else if ( wheelDeltaX < 0 ) {
				newX++;
			}

			if ( wheelDeltaY > 0 ) {
				newY--;
			} else if ( wheelDeltaY < 0 ) {
				newY++;
			}

			this.goToPage(newX, newY);

			return;
		}

		newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
		newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

		if ( newX > 0 ) {
			newX = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
		}

		if ( newY > 0 ) {
			newY = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
		}

		this.scrollTo(newX, newY, 0);

// INSERT POINT: _wheel
	},

	_initSnap: function () {
		this.currentPage = {};

		if ( typeof this.options.snap == 'string' ) {
			this.options.snap = this.scroller.querySelectorAll(this.options.snap);
		}

		this.on('refresh', function () {
			var i = 0, l,
				m = 0, n,
				cx, cy,
				x = 0, y,
				stepX = this.options.snapStepX || this.wrapperWidth,
				stepY = this.options.snapStepY || this.wrapperHeight,
				el;

			this.pages = [];

			if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
				return;
			}

			if ( this.options.snap === true ) {
				cx = Math.round( stepX / 2 );
				cy = Math.round( stepY / 2 );

				while ( x > -this.scrollerWidth ) {
					this.pages[i] = [];
					l = 0;
					y = 0;

					while ( y > -this.scrollerHeight ) {
						this.pages[i][l] = {
							x: Math.max(x, this.maxScrollX),
							y: Math.max(y, this.maxScrollY),
							width: stepX,
							height: stepY,
							cx: x - cx,
							cy: y - cy
						};

						y -= stepY;
						l++;
					}

					x -= stepX;
					i++;
				}
			} else {
				el = this.options.snap;
				l = el.length;
				n = -1;

				for ( ; i < l; i++ ) {
					if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
						m = 0;
						n++;
					}

					if ( !this.pages[m] ) {
						this.pages[m] = [];
					}

					x = Math.max(-el[i].offsetLeft, this.maxScrollX);
					y = Math.max(-el[i].offsetTop, this.maxScrollY);
					cx = x - Math.round(el[i].offsetWidth / 2);
					cy = y - Math.round(el[i].offsetHeight / 2);

					this.pages[m][n] = {
						x: x,
						y: y,
						width: el[i].offsetWidth,
						height: el[i].offsetHeight,
						cx: cx,
						cy: cy
					};

					if ( x > this.maxScrollX ) {
						m++;
					}
				}
			}

			this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

			// Update snap threshold if needed
			if ( this.options.snapThreshold % 1 === 0 ) {
				this.snapThresholdX = this.options.snapThreshold;
				this.snapThresholdY = this.options.snapThreshold;
			} else {
				this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
				this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
			}
		});

		this.on('flick', function () {
			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.x - this.startX), 1000),
						Math.min(Math.abs(this.y - this.startY), 1000)
					), 300);

			this.goToPage(
				this.currentPage.pageX + this.directionX,
				this.currentPage.pageY + this.directionY,
				time
			);
		});
	},

	_nearestSnap: function (x, y) {
		if ( !this.pages.length ) {
			return { x: 0, y: 0, pageX: 0, pageY: 0 };
		}

		var i = 0,
			l = this.pages.length,
			m = 0;

		// Check if we exceeded the snap threshold
		if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
			Math.abs(y - this.absStartY) < this.snapThresholdY ) {
			return this.currentPage;
		}

		if ( x > 0 ) {
			x = 0;
		} else if ( x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( y > 0 ) {
			y = 0;
		} else if ( y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		for ( ; i < l; i++ ) {
			if ( x >= this.pages[i][0].cx ) {
				x = this.pages[i][0].x;
				break;
			}
		}

		l = this.pages[i].length;

		for ( ; m < l; m++ ) {
			if ( y >= this.pages[0][m].cy ) {
				y = this.pages[0][m].y;
				break;
			}
		}

		if ( i == this.currentPage.pageX ) {
			i += this.directionX;

			if ( i < 0 ) {
				i = 0;
			} else if ( i >= this.pages.length ) {
				i = this.pages.length - 1;
			}

			x = this.pages[i][0].x;
		}

		if ( m == this.currentPage.pageY ) {
			m += this.directionY;

			if ( m < 0 ) {
				m = 0;
			} else if ( m >= this.pages[0].length ) {
				m = this.pages[0].length - 1;
			}

			y = this.pages[0][m].y;
		}

		return {
			x: x,
			y: y,
			pageX: i,
			pageY: m
		};
	},

	goToPage: function (x, y, time, easing) {
		easing = easing || this.options.bounceEasing;

		if ( x >= this.pages.length ) {
			x = this.pages.length - 1;
		} else if ( x < 0 ) {
			x = 0;
		}

		if ( y >= this.pages[x].length ) {
			y = this.pages[x].length - 1;
		} else if ( y < 0 ) {
			y = 0;
		}

		var posX = this.pages[x][y].x,
			posY = this.pages[x][y].y;

		time = time === undefined ? this.options.snapSpeed || Math.max(
			Math.max(
				Math.min(Math.abs(posX - this.x), 1000),
				Math.min(Math.abs(posY - this.y), 1000)
			), 300) : time;

		this.currentPage = {
			x: posX,
			y: posY,
			pageX: x,
			pageY: y
		};

		this.scrollTo(posX, posY, time, easing);
	},

	next: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x++;

		if ( x >= this.pages.length && this.hasVerticalScroll ) {
			x = 0;
			y++;
		}

		this.goToPage(x, y, time, easing);
	},

	prev: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x--;

		if ( x < 0 && this.hasVerticalScroll ) {
			x = 0;
			y--;
		}

		this.goToPage(x, y, time, easing);
	},

	_initKeys: function (e) {
		// default key bindings
		var keys = {
			pageUp: 33,
			pageDown: 34,
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		var i;

		// if you give me characters I give you keycode
		if ( typeof this.options.keyBindings == 'object' ) {
			for ( i in this.options.keyBindings ) {
				if ( typeof this.options.keyBindings[i] == 'string' ) {
					this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
				}
			}
		} else {
			this.options.keyBindings = {};
		}

		for ( i in keys ) {
			this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
		}

		utils.addEvent(window, 'keydown', this);

		this.on('destroy', function () {
			utils.removeEvent(window, 'keydown', this);
		});
	},

	_key: function (e) {
		if ( !this.enabled ) {
			return;
		}

		var snap = this.options.snap,	// we are using this alot, better to cache it
			newX = snap ? this.currentPage.pageX : this.x,
			newY = snap ? this.currentPage.pageY : this.y,
			now = utils.getTime(),
			prevTime = this.keyTime || 0,
			acceleration = 0.250,
			pos;

		if ( this.options.useTransition && this.isInTransition ) {
			pos = this.getComputedPosition();

			this._translate(Math.round(pos.x), Math.round(pos.y));
			this.isInTransition = false;
		}

		this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

		switch ( e.keyCode ) {
			case this.options.keyBindings.pageUp:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX += snap ? 1 : this.wrapperWidth;
				} else {
					newY += snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.pageDown:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX -= snap ? 1 : this.wrapperWidth;
				} else {
					newY -= snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.end:
				newX = snap ? this.pages.length-1 : this.maxScrollX;
				newY = snap ? this.pages[0].length-1 : this.maxScrollY;
				break;
			case this.options.keyBindings.home:
				newX = 0;
				newY = 0;
				break;
			case this.options.keyBindings.left:
				newX += snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.up:
				newY += snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.right:
				newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.down:
				newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			default:
				return;
		}

		if ( snap ) {
			this.goToPage(newX, newY);
			return;
		}

		if ( newX > 0 ) {
			newX = 0;
			this.keyAcceleration = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
			this.keyAcceleration = 0;
		}

		if ( newY > 0 ) {
			newY = 0;
			this.keyAcceleration = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
			this.keyAcceleration = 0;
		}

		this.scrollTo(newX, newY, 0);

		this.keyTime = now;
	},

	_animate: function (destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if ( now >= destTime ) {
				that.isAnimating = false;
				that._translate(destX, destY);

				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = ( now - startTime ) / duration;
			easing = easingFn(now);
			newX = ( destX - startX ) * easing + startX;
			newY = ( destY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}
		}

		this.isAnimating = true;
		step();
	},
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);

				if ( this.options.zoom && e.touches && e.touches.length > 1 ) {
					this._zoomStart(e);
				}
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				if ( this.options.zoom && e.touches && e.touches[1] ) {
					this._zoom(e);
					return;
				}
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				if ( this.scaled ) {
					this._zoomEnd(e);
					return;
				}
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				if ( this.options.wheelAction == 'zoom' ) {
					this._wheelZoom(e);
					return;	
				}
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
		}
	}

};
function createDefaultScrollbar (direction, interactive, type) {
	var scrollbar = document.createElement('div'),
		indicator = document.createElement('div');

	if ( type === true ) {
		scrollbar.style.cssText = 'position:absolute;z-index:9999';
		indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
	}

	indicator.className = 'iScrollIndicator';

	if ( direction == 'h' ) {
		if ( type === true ) {
			scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
			indicator.style.height = '100%';
		}
		scrollbar.className = 'iScrollHorizontalScrollbar';
	} else {
		if ( type === true ) {
			scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
			indicator.style.width = '100%';
		}
		scrollbar.className = 'iScrollVerticalScrollbar';
	}

	scrollbar.style.cssText += ';overflow:hidden';

	if ( !interactive ) {
		scrollbar.style.pointerEvents = 'none';
	}

	scrollbar.appendChild(indicator);

	return scrollbar;
}

function Indicator (scroller, options) {
	this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
	this.wrapperStyle = this.wrapper.style;
	this.indicator = this.wrapper.children[0];
	this.indicatorStyle = this.indicator.style;
	this.scroller = scroller;

	this.options = {
		listenX: true,
		listenY: true,
		interactive: false,
		resize: true,
		defaultScrollbars: false,
		shrink: false,
		fade: false,
		speedRatioX: 0,
		speedRatioY: 0
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	this.sizeRatioX = 1;
	this.sizeRatioY = 1;
	this.maxPosX = 0;
	this.maxPosY = 0;

	if ( this.options.interactive ) {
		if ( !this.options.disableTouch ) {
			utils.addEvent(this.indicator, 'touchstart', this);
			utils.addEvent(window, 'touchend', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
			utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(this.indicator, 'mousedown', this);
			utils.addEvent(window, 'mouseup', this);
		}
	}

	if ( this.options.fade ) {
		this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
		this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
		this.wrapperStyle.opacity = '0';
	}
}

Indicator.prototype = {
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
		}
	},

	destroy: function () {
		if ( this.options.interactive ) {
			utils.removeEvent(this.indicator, 'touchstart', this);
			utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
			utils.removeEvent(this.indicator, 'mousedown', this);

			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);

			utils.removeEvent(window, 'touchend', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
			utils.removeEvent(window, 'mouseup', this);
		}

		if ( this.options.defaultScrollbars ) {
			this.wrapper.parentNode.removeChild(this.wrapper);
		}
	},

	_start: function (e) {
		var point = e.touches ? e.touches[0] : e;

		e.preventDefault();
		e.stopPropagation();

		this.transitionTime();

		this.initiated = true;
		this.moved = false;
		this.lastPointX	= point.pageX;
		this.lastPointY	= point.pageY;

		this.startTime	= utils.getTime();

		if ( !this.options.disableTouch ) {
			utils.addEvent(window, 'touchmove', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(window, 'mousemove', this);
		}

		this.scroller._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		var point = e.touches ? e.touches[0] : e,
			deltaX, deltaY,
			newX, newY,
			timestamp = utils.getTime();

		if ( !this.moved ) {
			this.scroller._execEvent('scrollStart');
		}

		this.moved = true;

		deltaX = point.pageX - this.lastPointX;
		this.lastPointX = point.pageX;

		deltaY = point.pageY - this.lastPointY;
		this.lastPointY = point.pageY;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		this._pos(newX, newY);

// INSERT POINT: indicator._move

		e.preventDefault();
		e.stopPropagation();
	},

	_end: function (e) {
		if ( !this.initiated ) {
			return;
		}

		this.initiated = false;

		e.preventDefault();
		e.stopPropagation();

		utils.removeEvent(window, 'touchmove', this);
		utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
		utils.removeEvent(window, 'mousemove', this);

		if ( this.scroller.options.snap ) {
			var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.scroller.x - snap.x), 1000),
						Math.min(Math.abs(this.scroller.y - snap.y), 1000)
					), 300);

			if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
				this.scroller.directionX = 0;
				this.scroller.directionY = 0;
				this.scroller.currentPage = snap;
				this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
			}
		}

		if ( this.moved ) {
			this.scroller._execEvent('scrollEnd');
		}
	},

	transitionTime: function (time) {
		time = time || 0;
		this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
		}
	},

	transitionTimingFunction: function (easing) {
		this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
	},

	refresh: function () {
		this.transitionTime();

		if ( this.options.listenX && !this.options.listenY ) {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
		} else if ( this.options.listenY && !this.options.listenX ) {
			this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
		} else {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
		}

		if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
			utils.addClass(this.wrapper, 'iScrollBothScrollbars');
			utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '8px';
				} else {
					this.wrapper.style.bottom = '8px';
				}
			}
		} else {
			utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
			utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '2px';
				} else {
					this.wrapper.style.bottom = '2px';
				}
			}
		}

		var r = this.wrapper.offsetHeight;	// force refresh

		if ( this.options.listenX ) {
			this.wrapperWidth = this.wrapper.clientWidth;
			if ( this.options.resize ) {
				this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
				this.indicatorStyle.width = this.indicatorWidth + 'px';
			} else {
				this.indicatorWidth = this.indicator.clientWidth;
			}

			this.maxPosX = this.wrapperWidth - this.indicatorWidth;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryX = -this.indicatorWidth + 8;
				this.maxBoundaryX = this.wrapperWidth - 8;
			} else {
				this.minBoundaryX = 0;
				this.maxBoundaryX = this.maxPosX;
			}

			this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));	
		}

		if ( this.options.listenY ) {
			this.wrapperHeight = this.wrapper.clientHeight;
			if ( this.options.resize ) {
				this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
				this.indicatorStyle.height = this.indicatorHeight + 'px';
			} else {
				this.indicatorHeight = this.indicator.clientHeight;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryY = -this.indicatorHeight + 8;
				this.maxBoundaryY = this.wrapperHeight - 8;
			} else {
				this.minBoundaryY = 0;
				this.maxBoundaryY = this.maxPosY;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;
			this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
		}

		this.updatePosition();
	},

	updatePosition: function () {
		var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
			y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

		if ( !this.options.ignoreBoundaries ) {
			if ( x < this.minBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth + x, 8);
					this.indicatorStyle.width = this.width + 'px';
				}
				x = this.minBoundaryX;
			} else if ( x > this.maxBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
					this.indicatorStyle.width = this.width + 'px';
					x = this.maxPosX + this.indicatorWidth - this.width;
				} else {
					x = this.maxBoundaryX;
				}
			} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
				this.width = this.indicatorWidth;
				this.indicatorStyle.width = this.width + 'px';
			}

			if ( y < this.minBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight + y * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
				}
				y = this.minBoundaryY;
			} else if ( y > this.maxBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
					y = this.maxPosY + this.indicatorHeight - this.height;
				} else {
					y = this.maxBoundaryY;
				}
			} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
				this.height = this.indicatorHeight;
				this.indicatorStyle.height = this.height + 'px';
			}
		}

		this.x = x;
		this.y = y;

		if ( this.scroller.options.useTransform ) {
			this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
		} else {
			this.indicatorStyle.left = x + 'px';
			this.indicatorStyle.top = y + 'px';
		}
	},

	_pos: function (x, y) {
		if ( x < 0 ) {
			x = 0;
		} else if ( x > this.maxPosX ) {
			x = this.maxPosX;
		}

		if ( y < 0 ) {
			y = 0;
		} else if ( y > this.maxPosY ) {
			y = this.maxPosY;
		}

		x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
		y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

		this.scroller.scrollTo(x, y);
	},

	fade: function (val, hold) {
		if ( hold && !this.visible ) {
			return;
		}

		clearTimeout(this.fadeTimeout);
		this.fadeTimeout = null;

		var time = val ? 250 : 500,
			delay = val ? 0 : 300;

		val = val ? '1' : '0';

		this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

		this.fadeTimeout = setTimeout((function (val) {
			this.wrapperStyle.opacity = val;
			this.visible = +val;
		}).bind(this, val), delay);
	}
};

IScroll.utils = utils;

if ( typeof module != 'undefined' && module.exports ) {
	module.exports = IScroll;
} else {
	window.IScroll = IScroll;
}

})(window, document, Math);
}

{/* Detector */
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};
// This THREEx helper makes it easy to handle the fullscreen API
// * it hides the prefix for each browser
// * it hides the little discrepencies of the various vendor API
// * at the time of this writing (nov 2011) it is available in 
//   [firefox nightly](http://blog.pearce.org.nz/2011/11/firefoxs-html-full-screen-api-enabled.html),
//   [webkit nightly](http://peter.sh/2011/01/javascript-full-screen-api-navigation-timing-and-repeating-css-gradients/) and
//   [chrome stable](http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API).

// 
// # Code

//
}

{/* THREEx */
var THREEx		= THREEx 		|| {};
THREEx.FullScreen	= THREEx.FullScreen	|| {};

/**
 * test if it is possible to have fullscreen
 * 
 * @returns {Boolean} true if fullscreen API is available, false otherwise
*/
THREEx.FullScreen.available	= function()
{
	return this._hasWebkitFullScreen || this._hasMozFullScreen || this._hasIEFullScreen|| this._hasFullScreen;
}

/**
 * test if fullscreen is currently activated
 * 
 * @returns {Boolean} true if fullscreen is currently activated, false otherwise
*/
THREEx.FullScreen.activated	= function()
{
	if( this._hasWebkitFullScreen ){
		return document.webkitIsFullScreen;
	}else if( this._hasMozFullScreen ){
		return document.mozFullScreen;
	}else if( this._hasIEFullScreen ){
		return document.msFullscreenElement != null;
	}else if( this._hasFullScreen ){
		return document.fullscreenElement != null;
	}else{
		console.assert(false);
	}
}

/**
 * Request fullscreen on a given element
 * @param {DomElement} element to make fullscreen. optional. default to document.body
*/
THREEx.FullScreen.request	= function(element)
{
	element	= element	|| document.body;
	if( this._hasWebkitFullScreen ){
		element.webkitRequestFullScreen();
	}else if( this._hasMozFullScreen ){
		element.mozRequestFullScreen();
	}else if( this._hasIEFullScreen ){
		element.msRequestFullscreen();
	}else if( this._hasFullScreen ){
		element.requestFullscreen();
	}else{
		console.assert(false);
	}
}

/**
 * Cancel fullscreen
*/
THREEx.FullScreen.cancel	= function()
{
	if( this._hasWebkitFullScreen ){
		document.webkitCancelFullScreen();
	}else if( this._hasMozFullScreen ){
		document.mozCancelFullScreen();
	}else if( this._hasIEFullScreen ){
		document.msExitFullscreen();
	}else if( this._hasFullScreen ){
		document.exitFullscreen();
	}else{
		console.assert(false);
	}
}

// internal functions to know which fullscreen API implementation is available
THREEx.FullScreen._hasWebkitFullScreen	= 'webkitCancelFullScreen' in document	? true : false;	
THREEx.FullScreen._hasMozFullScreen	= 'mozCancelFullScreen' in document	? true : false;	
THREEx.FullScreen._hasIEFullScreen	= 'msExitFullscreen' in document	? true : false;	
THREEx.FullScreen._hasFullScreen	= 'exitFullscreen' in document	? true : false;	
}

{/* TWEEN */
// tween.js r5 - http://github.com/sole/tween.js
var TWEEN=TWEEN||function(){var a,e,c=60,b=false,h=[];return{setFPS:function(f){c=f||60},start:function(f){arguments.length!=0&&this.setFPS(f);e=setInterval(this.update,1E3/c)},stop:function(){clearInterval(e)},setAutostart:function(f){(b=f)&&!e&&this.start()},add:function(f){h.push(f);b&&!e&&this.start()},getAll:function(){return h},removeAll:function(){h=[]},remove:function(f){a=h.indexOf(f);a!==-1&&h.splice(a,1)},update:function(f){a=0;num_tweens=h.length;for(f=f||Date.now();a<num_tweens;)if(h[a].update(f))a++;
else{h.splice(a,1);num_tweens--}num_tweens==0&&b==true&&this.stop()}}}();
TWEEN.Tween=function(a){var e={},c={},b={},h=1E3,f=0,j=null,n=TWEEN.Easing.Linear.EaseNone,k=null,l=null,m=null;this.to=function(d,g){if(g!==null)h=g;for(var i in d)if(a[i]!==null)b[i]=d[i];return this};this.start=function(d){TWEEN.add(this);j=d?d+f:Date.now()+f;for(var g in b)if(a[g]!==null){e[g]=a[g];c[g]=b[g]-a[g]}return this};this.stop=function(){TWEEN.remove(this);return this};this.delay=function(d){f=d;return this};this.easing=function(d){n=d;return this};this.chain=function(d){k=d};this.onUpdate=
function(d){l=d;return this};this.onComplete=function(d){m=d;return this};this.update=function(d){var g,i;if(d<j)return true;d=(d-j)/h;d=d>1?1:d;i=n(d);for(g in c)a[g]=e[g]+c[g]*i;l!==null&&l.call(a,i);if(d==1){m!==null&&m.call(a);k!==null&&k.start();return false}return true}};TWEEN.Easing={Linear:{},Quadratic:{},Cubic:{},Quartic:{},Quintic:{},Sinusoidal:{},Exponential:{},Circular:{},Elastic:{},Back:{},Bounce:{}};TWEEN.Easing.Linear.EaseNone=function(a){return a};
TWEEN.Easing.Quadratic.EaseIn=function(a){return a*a};TWEEN.Easing.Quadratic.EaseOut=function(a){return-a*(a-2)};TWEEN.Easing.Quadratic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a;return-0.5*(--a*(a-2)-1)};TWEEN.Easing.Cubic.EaseIn=function(a){return a*a*a};TWEEN.Easing.Cubic.EaseOut=function(a){return--a*a*a+1};TWEEN.Easing.Cubic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a;return 0.5*((a-=2)*a*a+2)};TWEEN.Easing.Quartic.EaseIn=function(a){return a*a*a*a};
TWEEN.Easing.Quartic.EaseOut=function(a){return-(--a*a*a*a-1)};TWEEN.Easing.Quartic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a*a;return-0.5*((a-=2)*a*a*a-2)};TWEEN.Easing.Quintic.EaseIn=function(a){return a*a*a*a*a};TWEEN.Easing.Quintic.EaseOut=function(a){return(a-=1)*a*a*a*a+1};TWEEN.Easing.Quintic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a*a*a;return 0.5*((a-=2)*a*a*a*a+2)};TWEEN.Easing.Sinusoidal.EaseIn=function(a){return-Math.cos(a*Math.PI/2)+1};
TWEEN.Easing.Sinusoidal.EaseOut=function(a){return Math.sin(a*Math.PI/2)};TWEEN.Easing.Sinusoidal.EaseInOut=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};TWEEN.Easing.Exponential.EaseIn=function(a){return a==0?0:Math.pow(2,10*(a-1))};TWEEN.Easing.Exponential.EaseOut=function(a){return a==1?1:-Math.pow(2,-10*a)+1};TWEEN.Easing.Exponential.EaseInOut=function(a){if(a==0)return 0;if(a==1)return 1;if((a*=2)<1)return 0.5*Math.pow(2,10*(a-1));return 0.5*(-Math.pow(2,-10*(a-1))+2)};
TWEEN.Easing.Circular.EaseIn=function(a){return-(Math.sqrt(1-a*a)-1)};TWEEN.Easing.Circular.EaseOut=function(a){return Math.sqrt(1- --a*a)};TWEEN.Easing.Circular.EaseInOut=function(a){if((a/=0.5)<1)return-0.5*(Math.sqrt(1-a*a)-1);return 0.5*(Math.sqrt(1-(a-=2)*a)+1)};TWEEN.Easing.Elastic.EaseIn=function(a){var e,c=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!c||c<1){c=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/c);return-(c*Math.pow(2,10*(a-=1))*Math.sin((a-e)*2*Math.PI/b))};
TWEEN.Easing.Elastic.EaseOut=function(a){var e,c=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!c||c<1){c=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/c);return c*Math.pow(2,-10*a)*Math.sin((a-e)*2*Math.PI/b)+1};
TWEEN.Easing.Elastic.EaseInOut=function(a){var e,c=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!c||c<1){c=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/c);if((a*=2)<1)return-0.5*c*Math.pow(2,10*(a-=1))*Math.sin((a-e)*2*Math.PI/b);return c*Math.pow(2,-10*(a-=1))*Math.sin((a-e)*2*Math.PI/b)*0.5+1};TWEEN.Easing.Back.EaseIn=function(a){return a*a*(2.70158*a-1.70158)};TWEEN.Easing.Back.EaseOut=function(a){return(a-=1)*a*(2.70158*a+1.70158)+1};
TWEEN.Easing.Back.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*(3.5949095*a-2.5949095);return 0.5*((a-=2)*a*(3.5949095*a+2.5949095)+2)};TWEEN.Easing.Bounce.EaseIn=function(a){return 1-TWEEN.Easing.Bounce.EaseOut(1-a)};TWEEN.Easing.Bounce.EaseOut=function(a){return(a/=1)<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375};
TWEEN.Easing.Bounce.EaseInOut=function(a){if(a<0.5)return TWEEN.Easing.Bounce.EaseIn(a*2)*0.5;return TWEEN.Easing.Bounce.EaseOut(a*2-1)*0.5+0.5};
}


{ /*jQuery.browser.mobile*/
/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
}

if (!FLIPBOOK.threejsSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.threejsSrc = (function () {
    // 'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/three66');
  })();
}
if (!FLIPBOOK.flipbookWebGlSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.flipbookWebGlSrc = (function () {
    // 'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/flipbook.webgl');
  })();
}
if (!FLIPBOOK.pdfjsSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.pdfjsSrc = (function () {
    // 'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/pdf');
  })();
}
if (!FLIPBOOK.compatibilityjsSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.compatibilityjsSrc = (function () {
    // 'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/compatibility');
  })();
}
if (!FLIPBOOK.pdfjsworkerSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.pdfjsworkerSrc = (function () {
    // 'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/pdf.worker');
  })();
}
FLIPBOOK.scriptsLoaded = [];