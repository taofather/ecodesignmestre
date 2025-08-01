//----------------------------------------------------/
//
//      POLO
//      Author: INSPIRO
//      Version: v4.0
//      Update: 20/03/2017
//
//----------------------------------------------------/

//Global var
var INSPIRO = {},
    $ = jQuery.noConflict();
(function ($) {
    // USE STRICT
    "use strict";
    //----------------------------------------------------/
    // Predefined Variables
    //----------------------------------------------------/
    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $section = $('section'),
        $pageContent = $('#page-content'),
        $pageTitle = $('#page-title'),
        $topbar = $('#topbar'),
        $header = $('#header'),
        $headerCurrentClasses = $header.attr('class'),

        logo = $('#logo').find('.logo'),
        logoImg = logo.find('img').attr('src'),
        logoDark = logo.attr('data-dark-logo'), //Main menu
        //mainmenuitems = $("#mainMenu > ul > li"),
        $mainmenu = $('#mainMenu'),
        $mainmenuitems = $mainmenu.find('li.dropdown > a'),
        $mainsubmenuitems = $mainmenu.find('li.dropdown-submenu > a, li.dropdown-submenu > span'), //Vertical Dot Menu
        $dotsMenu = $('#dotsMenu'),
        $dotsMenuItems = $dotsMenu.find("ul > li > a"),
        $pageMenu = $('.page-menu'),
        sidePanel = $('#side-panel'),
        sidePanellogo = $('#panel-logo').find('.logo'),
        sidePanellogoImg = sidePanellogo.find('img').attr('src'),
        sidePanellogoDark = sidePanellogo.attr('data-dark-logo'),
        /*Footer*/
        $footer = $('#footer'),
        $footerStickyClass = $(".footer-sticky"), //Fullscreen panel
        fullScreenPanel = $('#fullscreen-panel'),
        $topSearch = $('#top-search'),
        $parallax = $('[data-parallax-image]'),
        $textRotator = $('.text-rotator'), //Window size control
        $fullScreen = $('.fullscreen') || $('.section-fullscreen'),
        $halfScreen = $('.halfscreen'), //Slider
        $slider = $('#slider'),
        $inspiroSlider = $('.inspiro-slider'),
        $carousel = $('.carousel'),
        $carouselIcons = ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],

        $flickity = $('.carousell'),
        $equalize = $('.equalize'),
        /*Grid Layout*/
        $gridLayout = $(".grid-layout"),
        $gridFilter = $(".grid-filter"), //Elements
        dataAnimation = $("[data-animation]"),
        $counter = $('.counter:not(.counter-instant)'),
        $countdownTimer = $('.countdown'),
        $progressBar = $('.progress-bar'),
        $pieChart = $('.pie-chart'),
        $map = $('.map'),
        accordionType = "accordion",
        toogleType = "toggle",
        accordionItem = "ac-item",
        itemActive = "ac-active",
        itemTitle = "ac-title",
        itemContent = "ac-content",
        $lightbox_gallery = $('[data-lightbox="gallery"]'),
        $lightbox_image = $('[data-lightbox="image"]'),
        $lightbox_iframe = $('[data-lightbox="iframe"]'),
        $lightbox_ajax = $('[data-lightbox="ajax"]'),
        $lightbox_inline = $('[data-lightbox="inline"]'), //Widgets
        $widget_twitter = $('.widget-tweeter') || $('.widget-twitter'),
        $flickr_widget = $('.flickr-widget'),
        $ytPlayer = $('.youtube-background'),
        $vmPlayer = $('.vimeo-background'),
        $stickySidebar = $('.sticky-sidebar'),
        $contactForm = $(".widget-contact-form"),
        $subscribeForm = $(".widget-subscribe-form"),
        $goToTop = $('#goToTop'),
        $copyToClipboard = $('.copy-to-clipboard'),

        //Utilites
        classFinder = ".";

    if ($header.length > 0) {
        var $headerOffsetTop = $header.offset().top;
    }



    INSPIRO.core = {
        functions: function () {
            INSPIRO.core.responsiveClasses();
            INSPIRO.core.goToTop();
            INSPIRO.core.screenSizeControl();
            INSPIRO.core.rtlStatus();
            INSPIRO.core.customHeight();
            INSPIRO.core.equalize();
            INSPIRO.core.stickyFooter();
        },
        responsiveClasses: function () {
            if (typeof jRespond === 'undefined') {
                console.log('responsiveClasses: jRespond plugin is missing.');
                return true;
            }
            var jRes = jRespond([
                {
                    label: 'smallest',
                    enter: 0,
                    exit: 479
				}, {
                    label: 'handheld',
                    enter: 480,
                    exit: 767
				}, {
                    label: 'tablet',
                    enter: 768,
                    exit: 991
				}, {
                    label: 'laptop',
                    enter: 992,
                    exit: 1199
				}, {
                    label: 'desktop',
                    enter: 1200,
                    exit: 10000
				}
			]);
            jRes.addFunc([
                {
                    breakpoint: 'desktop',
                    enter: function () {
                        $body.addClass('device-lg');
                    },
                    exit: function () {
                        $body.removeClass('device-lg');
                    }
				}, {
                    breakpoint: 'laptop',
                    enter: function () {
                        $body.addClass('device-md');
                    },
                    exit: function () {
                        $body.removeClass('device-md');
                    }
				}, {
                    breakpoint: 'tablet',
                    enter: function () {
                        $body.addClass('device-sm');
                    },
                    exit: function () {
                        $body.removeClass('device-sm');
                    }
				}, {
                    breakpoint: 'handheld',
                    enter: function () {
                        $body.addClass('device-xs');
                    },
                    exit: function () {
                        $body.removeClass('device-xs');
                    }
				}, {
                    breakpoint: 'smallest',
                    enter: function () {
                        $body.addClass('device-xxs');
                    },
                    exit: function () {
                        $body.removeClass('device-xxs');
                    }
				}
			]);
        },
        goToTop: function () {
            if ($goToTop.length > 0) {

                var scrollOffset = $body.attr('data-offset') || 800;

                if ($window.scrollTop() > scrollOffset) {
                    $goToTop.css({
                        'bottom': '26px',
                        'opacity': 1
                    });
                } else {
                    $goToTop.css({
                        'bottom': '16px',
                        'opacity': 0
                    });
                }

                
                $goToTop.off('click').on('click', function() {
				$('body,html').stop(true).animate({
					'scrollTop': 0
				}, 700, 'easeInOutExpo');
				return false;
			});
            }
        },
        pageLoader: function () {
            if (!$().animsition) {
                console.log('pageLoader: animsition plugin is missing.');
                return true;
            }
            if (!$body.hasClass('no-page-loader')) {
                var pageInAnimation = $body.attr('data-animation-in') || "fadeIn",
                    pageOutAnimation = $body.attr('data-animation-out') || "fadeOut",
                    pageLoaderIcon = $body.attr('data-icon') || 10,
                    pageLoaderIconColor = $body.attr('data-icon-color') || null,
                    pageInDuration = $body.attr('data-speed-in') || 1500,
                    pageOutDuration = $body.attr('data-speed-out') || 800,
                    iconColor = "",
                    loadingInnerHTML = "";

                switch (Number(pageLoaderIcon)) {
                    case 1:
                        loadingInnerHTML = '<div class="material-icon"><div class="spinner"><div class="right-side"><div class="bar"></div></div><div class="left-side"><div class="bar"></div></div></div></div>';
                        iconColor = '.spinner .bar {border-color: ' + pageLoaderIconColor + ';} .spinner .bar:after {background: ' + pageLoaderIconColor + ';}';
                        break;
                    case 2:
                        loadingInnerHTML = '<div class="loader-inner ball-grid-pulse"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
                        iconColor = '.ball-grid-pulse > div {background: ' + pageLoaderIconColor + '!important;}';
                        break;
                    case 3:
                        loadingInnerHTML = '<div class="loader01"></div>';
                        iconColor = '.loader01 {border-color: ' + pageLoaderIconColor + ' transparent ' + pageLoaderIconColor + ' ' + pageLoaderIconColor + ';} .loader01::after {background: ' + pageLoaderIconColor + ';}';
                        break;
                    case 4:
                        loadingInnerHTML = '<div class="loader-inner square-spin"><div></div></div>';
                        iconColor = '.square-spin > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 5:
                        loadingInnerHTML = '<div class="loader04"></div>';
                        iconColor = '.loader04:after {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 6:
                        loadingInnerHTML = '<div class="loader-inner ball-rotate"><div></div></div>';
                        iconColor = '.ball-rotate > div, .ball-rotate > div:after, .ball-rotate > div:before {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 7:
                        loadingInnerHTML = '<div class="loader-inner cube-transition"><div></div><div></div></div>';
                        iconColor = '.cube-transition > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 8:
                        loadingInnerHTML = '<div class="loader-inner ball-zig-zag"><div></div><div></div></div>';
                        iconColor = '.ball-zig-zag > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 9:
                        loadingInnerHTML = '<div class="loader-inner ball-triangle-path"><div></div><div></div><div></div></div>';
                        iconColor = '.ball-triangle-path > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 10:
                        loadingInnerHTML = '<div class="loader-inner line-scale"><div></div><div></div><div></div><div></div><div></div></div>';
                        iconColor = '.line-scale > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 11:
                        loadingInnerHTML = '<div class="loader-inner ball-scale-multiple"><div></div><div></div><div></div></div>';
                        iconColor = '.ball-scale-multiple > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 12:
                        loadingInnerHTML = '<div class="loader-inner ball-pulse-sync"><div></div><div></div><div></div></div>';
                        iconColor = '.ball-pulse-sync > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 13:
                        loadingInnerHTML = '<div class="loader-inner ball-beat"><div></div><div></div><div></div></div>';
                        iconColor = '.ball-beat > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 14:
                        loadingInnerHTML = '<div class="loader-inner line-scale-pulse-out-rapid"><div></div><div></div><div></div><div></div><div></div></div>';
                        iconColor = '.line-scale-pulse-out-rapid > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 15:
                        loadingInnerHTML = '<div class="loader-inner ball-scale-ripple-multiple"><div></div><div></div><div></div></div>';
                        iconColor = '.ball-scale-ripple-multiple > div {border-color: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 16:
                        loadingInnerHTML = '<div class="loader-inner ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
                        iconColor = '.ball-spin-fade-loader > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 17:
                        loadingInnerHTML = '<div class="loader-inner line-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
                        iconColor = '.line-spin-fade-loader > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 18:
                        loadingInnerHTML = '<div class="loader-inner pacman"><div></div><div></div><div></div><div></div><div></div></div>';
                        iconColor = '.pacman > div:nth-child(3), .pacman > div:nth-child(4), .pacman > div:nth-child(5), .pacman > div:nth-child(6)  {background: ' + pageLoaderIconColor + ' !important;} .pacman > div:first-of-type, .pacman > div:nth-child(2) {border-color: ' + pageLoaderIconColor + ' transparent ' + pageLoaderIconColor + ' ' + pageLoaderIconColor + '}';
                        break;
                    case 19:
                        loadingInnerHTML = '<div class="loader-inner ball-grid-beat"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
                        iconColor = '.ball-grid-beat > div {background: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    case 20:
                        loadingInnerHTML = '<div class="single9"></div>';
                        iconColor = '.single9:before {background-color: ' + pageLoaderIconColor + ' !important;}';
                        break;
                    default:
                        loadingInnerHTML = '<div class="material-icon"><div class="spinner"><div class="right-side"><div class="bar"></div></div><div class="left-side"><div class="bar"></div></div></div></div>';
                        iconColor = '.spinner .bar {border-color: ' + pageLoaderIconColor + ';} .spinner .bar:after {background: ' + pageLoaderIconColor + ';}';
                        break;
                }
                if (pageLoaderIconColor) {
                    $('head').append('<style type="text/css">' + iconColor + '</style>');
                }
                $wrapper.animsition({
                    inClass: pageInAnimation,
                    outClass: pageOutAnimation,
                    inDuration: pageInDuration,
                    outDuration: pageOutDuration,
                    loading: true,
                    onLoadEvent: true,
                    loadingParentElement: 'body', //animsition wrapper element
                    loadingClass: 'animsition-loading',
                    loadingInner: '<div class="loader">' + loadingInnerHTML + '</div>',
                    linkElement: '#mainMenu a:not([target="_blank"]):not([href*="#"]):not([data-lightbox]):not([href^="mailto"]):not([href^="tel"]):not([href^="sms"]):not([href^="call"]):not([href*="mestre-table"]), .animsition-link, .slide-link'


                });
                var t = setTimeout(function () {
                    if ($(".animsition-loading").length) {
                        $body.addClass("no-page-loader");
                        $(".animsition-loading").hide();
                    }
                }, 10000);
            }

        },
        screenSizeControl: function () {
            if ($fullScreen.length > 0) {
                $fullScreen.each(function () {
                    var $elem = $(this),
                        elemHeight = $window.height();
                    if ($body.hasClass('device-lg') || $body.hasClass('device-md')) {
                        $elem.css('height', elemHeight);
                    } else {
                        var fullScreenContentHeight = $elem.find(".text-middle").height() + 100;
                        $elem.css({
                            'height': fullScreenContentHeight,
                            'padding': '60px 15px 120px'
                        });
                    }
                });
            }
            if ($halfScreen.length > 0) {
                $halfScreen.each(function () {
                    var $elem = $(this),
                        elemHeight = $window.height();
                    $elem.css('height', elemHeight / 1.5);
                });
            }
        },
        rtlStatus: function () {
            var $rtlStatusCheck = $("html").attr("dir");
            var $rtlStatus = false;
            if ($rtlStatusCheck == "rtl") {
                $('head').append('<link rel="stylesheet" type="text/css" href="css/rtl.css">');
                $rtlStatus = true;
            } else {
                $rtlStatus = false;
            }
        },
        customHeight: function () {
            var $customHeightXxs = $('[data-height-xxs]'),
                $customHeightXs = $('[data-height-xs]'),
                $customHeightSm = $('[data-height-sm]'),
                $customHeightMd = $('[data-height-md]'),
                $customHeightLg = $('[data-height-lg]');
            if ($customHeightXxs.length > 0) {
                $customHeightXxs.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-xxs');
                    if ($body.hasClass('device-xxs')) {
                        if (elementHeight !== '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }
            if ($customHeightXs.length > 0) {
                $customHeightXs.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-xs');
                    if ($body.hasClass('device-xs')) {
                        if (elementHeight !== '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }
            if ($customHeightSm.length > 0) {
                $customHeightSm.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-sm');
                    if ($body.hasClass('device-sm')) {
                        if (elementHeight !== '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }
            if ($customHeightMd.length > 0) {
                $customHeightMd.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-md');
                    if ($body.hasClass('device-md')) {
                        if (elementHeight !== '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }
            if ($customHeightLg.length > 0) {
                $customHeightLg.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-lg');
                    if ($body.hasClass('device-lg')) {
                        if (elementHeight !== '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }
        },
        equalize: function () {

            if ($equalize.length > 0) {
                $equalize.each(function () {

                    var elem = $(this),
                        selectorItem = elem.find(elem.attr('data-equalize-item')) || "> div",
                        maxHeight = 0;

                    selectorItem.each(function () {
                        if ($(this).outerHeight(true) > maxHeight) {
                            maxHeight = $(this).outerHeight(true);
                        }
                    });
                    selectorItem.height(maxHeight);

                });
            }
        },
        stickyFooter: function () {
            if ($footerStickyClass.length > 0) {
                if ($body.hasClass('device-lg') || $body.hasClass('device-md')) {
                    var elemOuterHeight = $footerStickyClass.outerHeight();

                    var t = setTimeout(function () {
                        $footerStickyClass.addClass("footer-sticky-active");
                    }, 1000);

                    // $pageContent.addClass("page-content-shadow");
                    $wrapper.css({
                        'margin-bottom': elemOuterHeight,
                        'z-index': 1
                    });
                } else {
                    $wrapper.css({
                        'margin-bottom': 0
                    });
                    $footerStickyClass.removeClass("footer-sticky-active");
                }
            }
        },


    };
    INSPIRO.header = {
        functions: function () {
            INSPIRO.header.logoStatus();
            INSPIRO.header.stickyHeader();
            INSPIRO.header.topBar();
            INSPIRO.header.topSearch();
            INSPIRO.header.mainMenu();
            INSPIRO.header.pageTitle();
            INSPIRO.header.pageMenu();
            INSPIRO.header.sidePanel();
            INSPIRO.header.dotsMenu();
            INSPIRO.header.onepageMenu();
        },
        logoStatus: function () {
            if (!$body.is('.device-lg, .device-md, .menu-overlay-active') && $header.is('.dark.header-transparent, .dark.header-colored-transparent, .dark.header-colored')) {
                logo.find('img').attr('src', logoImg);
            } else if ($header.hasClass('dark')) {
                if (logoDark) {
                    logo.find('img').attr('src', logoDark);
                } else {
                    logo.find('img').attr('src', logoImg);
                }
            } else {
                logo.find('img').attr('src', logoImg);
            }
        },
        stickyHeader: function () {

            var elem = $(this),
                shrinkHeader = elem.attr('data-shrink') || 0,
                shrinkHeaderActive = elem.attr('data-sticky-active') || 200,
                scrollOnTop = $window.scrollTop();

            if ($header.hasClass("header-modern")) {
                shrinkHeader = 300;
            }

            if (!$header.is(".header-no-sticky, .header-static")) {

                if ($header.hasClass("header-sticky-resposnive") || $body.is('.device-lg, .device-md')) {

                    if (scrollOnTop > $headerOffsetTop + shrinkHeader) {
                        INSPIRO.header.logoStatus();
                        $("#header").addClass('header-sticky');

                        if (scrollOnTop > $headerOffsetTop + shrinkHeaderActive) {
                            if (!$body.is(".overlay-menu") && $header.is(".header-transparent:not(.header-modern), .header-colored, .header-colored-transparent")) {
                                $header.addClass('sticky-active').removeClass("dark");
                            } else {
                                $header.addClass('sticky-active');
                            }
                        }
                    } else {
                        $header.removeClass().addClass($headerCurrentClasses);
                        INSPIRO.header.logoStatus();
                    }
                }
            }
        },
        topBar: function () {
            if ($topbar.length > 0) {
                $("#topbar .topbar-dropdown .topbar-form").each(function (index, element) {
                    if ($window.width() - ($(element).width() + $(element).offset().left) < 0) {
                        $(element).addClass('dropdown-invert');
                    }
                });
            }
        },
        topSearch: function () {
            $("#top-search-trigger").on("click", function () {
                $body.toggleClass('top-search-active');
                $topSearch.find('input').focus();
                return false;
            });
        },
        mainMenu: function () {
            if ($mainmenu.length > 0) {

                if ($body.is('.device-lg, .device-md')) {
                    $("body #mainMenu.menu-onclick nav > ul > li.dropdown > a, body .dropdown-submenu > a, body .dropdown-submenu > span").on('click touchend', function (e) {
                        var href = $(this).attr('href');
                        
                        // Only prevent default for non-navigation links (dropdown toggles)
                        if (!href || href === '#' || href === 'javascript:void(0)' || href.startsWith('#')) {
                            $(this).parent('li').siblings().removeClass('hover-active').removeClass('current');
                            $(this).parent('li').toggleClass('hover-active');
                            return false;
                        }
                        // Allow normal navigation for actual page links
                    });

                } else {
                    $("#mainMenu nav > ul > li.dropdown > a, .dropdown-submenu > a, .dropdown-submenu > span").on('click touchend', function (e) {
                        var href = $(this).attr('href');
                        
                        // Only prevent default for non-navigation links (dropdown toggles)
                        if (!href || href === '#' || href === 'javascript:void(0)' || href.startsWith('#')) {
                            $(this).parent('li').siblings().removeClass('hover-active');
                            $(this).parent('li').toggleClass('hover-active');
                            return false;
                        }
                        // Allow normal navigation for actual page links
                    });
                }

                $("#mainMenu-trigger button").on('click touchend', function (e) {
                    $body.toggleClass("mainMenu-open");
                    $(this).toggleClass("toggle-active");
                    if ($body.hasClass("mainMenu-open")) {
                        $header.find("#mainMenu").css("max-height", $window.height() - $header.height());
                    } else {
                        $header.find("#mainMenu").css("max-height", 0);
                    }
                    return false;
                });

                if ($body.is('.device-lg, .device-md')) {
                    /*invert menu fix*/
												
					var $menuLastItem = $("nav > ul > li:last-child"),
						$menuLastItemUl = $("nav > ul > li:last-child > ul"),
						$menuLastInvert = $menuLastItemUl.width() - $menuLastItem.width(),
						$menuItems = $("nav > ul > li").find(".dropdown-menu");

					$menuItems.css('display', 'block');
					$('.dropdown:not(.mega-menu-item) ul ul').each(function (index, element) {
                        if ($window.width() - ($(element).width() + $(element).offset().left) < 0) {
                            $(element).addClass('menu-invert');
                        }
                    });
					
					if($window.width() - ($menuLastItemUl.width() + $menuLastItem.offset().left) < 0) {
							$menuLastItemUl.addClass('menu-last');		
					}
					
					$menuItems.css('display', '');
					
				
                }
            }
        },
        pageTitle: function () {
            if ($pageTitle.length > 0) {
                //     var pageTitleHeight = $pageTitle.find("> .container").innerHeightHeight();
                //  
                //   alert(pageTitleHeight);
                //     $pageTitle.css('min-height', pageTitleHeight);

                /* if ($topbar && $header) {
                      $pageTitle.css("padding-top", $header.height() + $topbar.height());
                  }else{
                       $pageTitle.css("padding-top", $header.height());
                  }
*/
            }
        },


        /*TO BE CHECKED !!!!!!!!!!!!!!!*/
        pageMenu: function () {
            if ($pageMenu.length > 0) {
                $pageMenu.each(function () {
                    if ($pageMenu.hasClass("slide-menu")) {
                        $pageMenu.addClass("slide-menu-version");
                        $("#menu-responsive-icon").on("click", function () {
                            $pageMenu.toggleClass("page-menu-active");
                            $pageMenu.toggleClass("items-visible");
                        });
                    } else {
                        $("#menu-responsive-icon").on("click", function () {
                            $pageMenu.toggleClass("page-menu-active");
                            $pageMenu.toggleClass("items-visible");
                        });
                    }
                });
            }
        },
        sidePanel: function () {
            if (sidePanel.length > 0) {
                $(".side-panel:not(.side-panel-admin) #wrapper, #close-panel").on("click", function () {
                    $body.removeClass("side-panel-active");
                    $("#side-panel-trigger").removeClass("toggle-active");
                });
                var t = setTimeout(function () {
                    INSPIRO.elements.gridLayoutRefresh();
                }, 1000);
            }
        },
        dotsMenu: function () {
            if ($dotsMenu.length > 0) {
                $dotsMenuItems.on('click', function () {
                    var href = $(this).attr('href');
                    
                    // Only prevent default for anchor links, allow page navigation
                    if (href && href.startsWith('#')) {
                        $dotsMenuItems.parent("li").removeClass('current');
                        $(this).parent("li").addClass('current');
                        return false;
                    }
                    // Allow normal navigation for page links
                });

                $dotsMenuItems.parents("li").removeClass('current');
                $dotsMenu.find('a[href="#' + INSPIRO.header.currentSection() + '"]').parent("li").addClass('current');
            }
        },
        onepageMenu: function () {
            if ($mainmenu.hasClass("menu-one-page")) {
                $mainmenu.find("nav > ul > li > a").parents("li").removeClass('current');
                $mainmenu.find('nav > ul > li > a[href="#' + INSPIRO.header.currentSection() + '"]').parent("li").addClass('current');
            }
        },
        currentSection: function () {
            var elemCurrent = "body";
            $section.each(function () {
                var elem = $(this),
                    elemeId = elem.attr("id");

                if ((elem.offset().top - $window.height() / 3 < $window.scrollTop()) && (elem.offset().top + elem.height() - $window.height() / 3 > $window.scrollTop())) {
                    elemCurrent = elemeId;
                }
            });
            return elemCurrent;
        }
    };
    INSPIRO.slider = {
        functions: function () {
            INSPIRO.slider.sliderScreenSizeControl();
            INSPIRO.slider.inspiroSlider();
            INSPIRO.slider.carousel();
        },
        sliderScreenSizeControl: function () {
            if ($inspiroSlider.length > 0) {
                var headerHeight = $header.outerHeight(),
                    topbarHeight = $topbar.outerHeight() || 0,
                    windowHeight = $window.height(),
                    screenHeightExtra = headerHeight + topbarHeight,
                    sliderFullscreen = $inspiroSlider.hasClass('slider-fullscreen'),
                    screenRatio = $inspiroSlider.hasClass('slider-fullscreen') ? 1 : 1.28,
                    transparentHeader = $header.hasClass("header-transparent") || $header.hasClass("header-light-transparent") || $header.hasClass("header-dark-transparent") || $header.hasClass("header-colored-transparent") || $header.hasClass("header-modern"),
                    sliderTargetElements = $(".inspiro-slider, .inspiro-slider .owl-stage-outer, .inspiro-slider .owl-stage, .inspiro-slider .slide"),
                    customHeight = $inspiroSlider.data("height"),
                    responsiveHeightxs = $inspiroSlider.data("height-xs") || 300;

                if ($body.is(".device-lg, .device-md, .device-sm")) {
                    if (transparentHeader) {
                        if (sliderFullscreen) {
                            sliderTargetElements.css('height', windowHeight + 'px');
                        } else {
                            if (!$header.hasClass(".header-transparent")) {
                                $(".inspiro-slider .slide").css('padding-top', screenHeightExtra + 'px');

                            }
                            if (!customHeight) {
                                sliderTargetElements.css('height', windowHeight / screenRatio + 'px');
                            } else {
                                sliderTargetElements.css('height', customHeight + 'px');
                            }
                        }
                    } else {
                        if (sliderFullscreen) {
                            sliderTargetElements.css('height', windowHeight - screenHeightExtra + 'px');

                        } else {
                            sliderTargetElements.css('height', windowHeight / screenRatio - screenHeightExtra + 'px');
                        }
                        if (customHeight) {
                            sliderTargetElements.css('height', customHeight + 'px');
                        }
                    }
                } else {
                    sliderTargetElements.css('height', responsiveHeightxs + 'px');
                }
            }
        },
        inspiroSlider: function () {
            if (!$().owlCarousel) {
                console.log('inspiroSlider: owlCarousel plugin is missing.');
                return true;
            }
            if ($inspiroSlider.length > 0) {
                $inspiroSlider.each(function () {
                    var elem = $(this),
                        carouselNav = elem.attr('data-arrows') || true,
                        carouselDots = elem.attr('data-dots') || true,
                        carouselAutoPlay = elem.attr('data-autoplay') || false,
                        carouselAutoplayTimeout = elem.attr('data-autoplay-timeout') || 5000,
                        carouseAnimateIn = elem.attr('data-animate-in') || false,
                        carouseAnimateOut = elem.attr('data-animate-out') || false,
                        carouselLoop = elem.attr('data-loop') || true,
                        carouselHoverPause = elem.attr('data-hover-pause') || true,
                        carouselMargin = elem.attr('data-margin') || 0,
                        carouselVideo = elem.attr('data-video') || true,
                        carouselItems = elem.attr('data-items') || 4,
                        carouselSmartSpeed = elem.attr('data-smart-speed') || 500,
                        carouselItemsLg = elem.attr('data-items-lg') || Number(carouselItems),
                        carouselItemsMd = elem.attr('data-items-md') || Number(carouselItemsLg),
                        carouselItemsSm = elem.attr('data-items-sm') || Number(carouselItemsMd),
                        carouselItemsXs = elem.attr('data-items-xs') || Number(carouselItemsSm),
                        carouselItemsXxs = elem.attr('data-items-xxs') || Number(carouselItemsXs),
                        carouselDrag = elem.attr('data-drag') || true;


                    elem.addClass("owl-carousel");
                    //Kenburns effect
                    elem.find('.slide').each(function () {
                        if ($(this).hasClass("kenburns")) {
                            var elemChild = $(this),
                                elemChildImage = elemChild.css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
                            elemChild.prepend('<div class="kenburns-bg" style="background-image:url(' + elemChildImage + ')"></div>');
                        }
                    });
					
                    if (elem.find('.slide').length > 1) {

                        elem.owlCarousel({
                            nav: carouselNav,
                            dots: carouselDots,
                            navText: $carouselIcons,
                            autoplay: carouselAutoPlay,
                            autoplayTimeout: carouselAutoplayTimeout,
                            autoplayHoverPause: carouselHoverPause,
                            loop: carouselLoop,
                            margin: Number(carouselMargin),
                            smartSpeed: Number(carouselSmartSpeed),
                            video: carouselVideo,
                            animateIn: carouseAnimateIn,
                            animateOut: carouseAnimateOut,
                            rtl: INSPIRO.core.rtlStatus(),
                            items: 1,
                            mouseDrag: carouselDrag,
                            touchDrag: carouselDrag,
                            pullDrag: false,
                            freeDrag: false,
                            callbacks: true,
                            onInitialize: function (event) {
                                var t = setTimeout(function () {
                                    elem.find(".owl-item:not(.active) .slide > video").each(function () {
                                        this.pause();
                                    });
                                    elem.find(".owl-item.active .slide .kenburns-bg").addClass("kenburns-bg-animate");

                                    elem.addClass("slider-loaded");
                                }, 100);


                            }
                        });
                        var $captions = elem.find('.slide-captions > *');
                        $captions.each(function () {
                            var $captionElem = $(this);
                            var animationDuration = "600ms";
                            if ($(this).data("animation-duration")) {
                                animationDuration = $(this).data("animation-duration") + "ms";
                            }
                            $(this).css("animation-duration", animationDuration);
                            $captionElem.addClass('slide-caption-hide');
                        });
                        $captions.each(function (index) {
                            var $captionElem = $(this),
                                captionDelay = $captionElem.data("caption-delay") || index * 80,
                                captionAnimation = $captionElem.data('caption-animation') || "fadeInUp";
                            var t = setTimeout(function () {
                                $captionElem.removeClass('slide-caption-hide').addClass(captionAnimation);
                            }, captionDelay);
                        });
                        elem.on('changed.owl.carousel', function (property) {
                            var current = property.item.index,
                                currentSlide = $(property.target).find(".owl-item").eq(current),
                                currentSlideCaptions = currentSlide.find(".slide-captions > *"),
                                currentSlideDark = currentSlide.find(".slide").hasClass("slide-dark"),
                                currentSlideKenburns = currentSlide.find(".slide").hasClass("kenburns");
                            if (currentSlideKenburns) {
                                $(this).find(".kenburns-bg").addClass("kenburns-bg-animate");
                            }
                            currentSlideCaptions.each(function (index) {
                                var $captionElem = $(this),
                                    captionDelay = $captionElem.data("caption-delay") || (index * 350 + 1000),
                                    captionAnimation = $captionElem.data('caption-animation') || "fadeInUp";
                                var t = setTimeout(function () {
                                    $captionElem.removeClass('slide-caption-hide').addClass(captionAnimation);
                                }, captionDelay);
                            });
                            if ($window.width() > 992) {
                                //Pause HTML5 Video
                                if (currentSlide.find("video").length > 0) {
                                    var t = setTimeout(function () {
                                        currentSlide.find(".slide video").get(0).play();
                                    }, 1000);
                                }
                            }
                        });
                        elem.on('change.owl.carousel', function (property) {
                            var current = property.item.index,
                                currentSlide = $(property.target).find(".owl-item").eq(current),
                                currentSlideCaptions = $(property.target).find(".owl-item:not(.active)").find(".slide-captions > *"),
                                currentSlideKenburns = currentSlide.find(".slide").hasClass("kenburns");
                            currentSlideCaptions.each(function () {
                                var $captionElem = $(this),
                                    captionAnimation = $captionElem.data('caption-animation') || "fadeInUp";
                                $captionElem.removeClass(captionAnimation).addClass('slide-caption-hide');
                            });
                            elem.find(".slide video").each(function () {
                                this.pause();
                            });
                            if (currentSlideKenburns) {
                                $(this).find(".kenburns-bg").removeClass("kenburns-bg-animate");
                            }
                        });





                    } else {
                        elem.addClass("slider-loaded");
                        var t = setTimeout(function () {
                            elem.find('.slide').find(".kenburns-bg").addClass("kenburns-bg-animate");
                        }, 200);
                    }
                    // var t = setTimeout(function () {
                    INSPIRO.slider.sliderScreenSizeControl();

                    //}, 100);

                });
            }
        },
		
        carouselAjax: function () {
            if (!$().owlCarousel) {
                console.log('carouselAjax: owlCarousel plugin is missing.');
                return true;
            }
            var carousel = $(".carousel"),
                carouselNav = carousel.attr('data-arrows'),
                carouselDots = carousel.attr('data-dots') || true,
                carouselAutoPlay = carousel.attr('data-autoplay') || false,
                carouselAutoplayTimeout = carousel.attr('data-autoplay-timeout') || 5000,
                carouseAnimateIn = carousel.attr('data-animate-in') || false,
                carouseAnimateOut = carousel.attr('data-animate-out') || false,
                carouselLoop = carousel.attr('data-loop') || false,
                carouselMargin = carousel.attr('data-margin') || 0,
                carouselVideo = carousel.attr('data-video') || true,
                carouselItems = carousel.attr('data-items') || 4,
                carouselItemsLg = carousel.attr('data-items-lg') || Number(carouselItems),
                carouselItemsMd = carousel.attr('data-items-md') || Number(carouselItemsLg),
                carouselItemsSm = carousel.attr('data-items-sm') || Number(carouselItemsMd),
                carouselItemsXs = carousel.attr('data-items-xs') || Number(carouselItemsSm),
                carouselItemsXxs = carousel.attr('data-items-xxs') || Number(carouselItemsXs);

            if (carouselNav == 'false') {
                carouselNav = false;
            } else {
                carouselNav = true;
            }

            if (carouselDots == 'false') {
                carouselDots = false;
            } else {
                carouselDots = true;
            }

            carousel.owlCarousel({
                nav: carouselNav,
                dots: carouselDots,
                navText: $carouselIcons,
                autoplay: carouselAutoPlay,
                autoplayTimeout: carouselAutoplayTimeout,
                autoplayHoverPause: true,
                loop: carouselLoop,
                margin: Number(carouselMargin),
                smartSpeed: Number(1000),
                video: carouselVideo,
                animateIn: carouseAnimateIn,
                animateOut: carouseAnimateOut,
                rtl: INSPIRO.core.rtlStatus(),
                onInitialize: function (event) {
                    carousel.addClass("carousel-loaded owl-carousel");
                },
                responsive: {
                    0: {
                        items: Number(carouselItemsXxs)
                    },
                    480: {
                        items: Number(carouselItemsXs)
                    },
                    768: {
                        items: Number(carouselItemsSm)
                    },
                    992: {
                        items: Number(carouselItemsMd)
                    },
                    1200: {
                        items: Number(carouselItemsLg)
                    }
                }
            });
        },
        carousel: function () {
            if (!$().owlCarousel) {
                console.log('carousel: owlCarousel plugin is missing.');
                return true;
            }
            if ($carousel.length > 0) {
                $carousel.each(function () {
                    var elem = $(this),
                        carouselItemElement = elem.attr('data-item') || "div",
                        carouselNav = elem.attr('data-arrows'),
                        carouselDots = elem.attr('data-dots') || true,
                        carouselAutoPlay = elem.attr('data-autoplay') || false,
                        carouselAutoplayTimeout = elem.attr('data-autoplay-timeout') || 5000,
                        carouselAutoWidth = elem.attr('data-auto-width') || false,
                        carouseAnimateIn = elem.attr('data-animate-in') || false,
                        carouseAnimateOut = elem.attr('data-animate-out') || false,
                        carouselLoop = elem.attr('data-loop') || false,
                        carouselMargin = elem.attr('data-margin') || 0,
                        carouselVideo = elem.attr('data-video') || false,
                        carouselItems = elem.attr('data-items') || 4,
                        carouselItemsLg = elem.attr('data-items-lg') || Number(carouselItems),
                        carouselItemsMd = elem.attr('data-items-md') || Number(carouselItemsLg),
                        carouselItemsSm = elem.attr('data-items-sm') || Number(carouselItemsMd),
                        carouselItemsXs = elem.attr('data-items-xs') || Number(carouselItemsSm),
                        carouselItemsXxs = elem.attr('data-items-xxs') || Number(carouselItemsXs);

                    if (carouselItemsMd >= 3) {
                        var carouselItemsSm = elem.attr('data-items-sm') || Number(2);
                    }
                    if (carouselItemsSm >= 2) {
                        var carouselItemsXs = elem.attr('data-items-xs') || Number(2);
                    }
                    if (carouselItemsXs >= 1) {
                        var carouselItemsXxs = elem.attr('data-items-xxs') || Number(1);
                    }

                    if (carouselNav == 'false') {
                        carouselNav = false;
                    } else {
                        carouselNav = true;
                    }

                    if (carouselDots == 'false') {
                        carouselDots = false;
                    } else {
                        carouselDots = true;
                    }

                    if (carouselAutoPlay == 'false') {
                        carouselAutoPlay = false;
                    }

                    var t = setTimeout(function () {
                        elem.owlCarousel({
                            nav: carouselNav,
                            dots: carouselDots,
                            navText: $carouselIcons,
                            itemElement: carouselItemElement,
                            autoplay: carouselAutoPlay,
                            autoplayTimeout: carouselAutoplayTimeout,
                            autoplayHoverPause: true,
                            autoWidth: carouselAutoWidth,
                            loop: carouselLoop,
                            margin: Number(carouselMargin),
                            smartSpeed: Number(350),
							fluidSpeed: Number(260),
                            video: carouselVideo,
                            animateIn: carouseAnimateIn,
                            animateOut: carouseAnimateOut,
                            rtl: INSPIRO.core.rtlStatus(),
                            onInitialize: function (event) {
                                // setTimeout(function () {
                                elem.addClass("carousel-loaded owl-carousel");
                                //    }, 1000);
                            },
                            responsive: {
                                0: {
                                    items: Number(carouselItemsXxs)
                                },
                                480: {
                                    items: Number(carouselItemsXs)
                                },
                                768: {
                                    items: Number(carouselItemsSm)
                                },
                                992: {
                                    items: Number(carouselItemsMd)
                                },
                                1200: {
                                    items: Number(carouselItemsLg)
                                }
                            }
                        });
                    }, 100);
                });
            }
        },
        flickityCarousel: function () {
            if (!$().flickity) {
                console.log('flickityCarousel: flickity plugin is missing.');
                return true;
            }
            if ($flickity.length > 0) {
                $flickity.each(function () {
                    var elem = $(this),
                        accessibility = elem.attr('data-accessibility') || false,
                        adaptiveHeight = elem.attr('data-adaptiveHeight') || false,
                        autoPlay = elem.attr('data-autoPlay') || true,
                        cellAlign = elem.attr('data-cellAlign') || 0,
                        cellSelector = elem.attr('data-cellSelector') || undefined,
                        contain = elem.attr('data-contain') || true,
                        draggable = elem.attr('data-draggable') || true,
                        dragThreshold = elem.attr('data-dragThreshold') || 3,
                        freeScroll = elem.attr('data-freeScroll') || false,
                        friction = elem.attr('data-friction') || 0.2,
                        groupCells = elem.attr('data-groupCells') || false,
                        initialIndex = elem.attr('data-initialIndex') || 0,
                        lazyLoad = elem.attr('data-lazyLoad') || true,
                        percentPosition = elem.attr('data-percentPosition') || true,
                        prevNextButtons = elem.attr('data-prevNextButtons') || true,
                        pageDots = elem.attr('data- pageDots') || true,
                        resize = elem.attr('data-resize') || true,
                        rightToLeft = elem.attr('data-rightToLeft') || false,
                        setGallerySize = elem.attr('data-setGallerySize') || true,
                        watchCSS = elem.attr('data-watchCSS') || false,
                        wrapAround = elem.attr('data-wrapAround') || false;


                    var t = setTimeout(function () {
                        elem.flickity({
                            accessibility: accessibility,
                            adaptiveHeight: adaptiveHeight,
                            autoPlay: autoPlay,
                            cellAlign: cellAlign,
                            cellSelector: cellSelector,
                            contain: contain,
                            draggable: draggable,
                            dragThreshold: dragThreshold,
                            freeScroll: freeScroll,
                            friction: friction,
                            groupCells: groupCells,
                            initialIndex: initialIndex,
                            lazyLoad: lazyLoad,
                            percentPosition: percentPosition,
                            prevNextButtons: prevNextButtons,
                            pageDots: pageDots,
                            resize: resize,
                            rightToLeft: rightToLeft,
                            setGallerySize: setGallerySize,
                            watchCSS: watchCSS,
                            wrapAround: wrapAround
                        });
                    }, 100);
                });
            }
        },


    };
    INSPIRO.elements = {
        functions: function () {
            INSPIRO.elements.naTo();
            INSPIRO.elements.textRotator();
            INSPIRO.elements.buttons();
            INSPIRO.elements.accordion();
            INSPIRO.elements.animations();
            INSPIRO.elements.parallax();
            INSPIRO.elements.responsiveVideos();
            INSPIRO.elements.counters();
            INSPIRO.elements.countdownTimer();
            INSPIRO.elements.progressBar();
            INSPIRO.elements.pieChart();
            INSPIRO.elements.maps();
            INSPIRO.elements.gridLayout();
            INSPIRO.elements.tooltip();
            INSPIRO.elements.popover();
            INSPIRO.elements.lightBoxInspiro();
            INSPIRO.elements.youTubeBgPlayer();
            INSPIRO.elements.vimeoBgPlayer();
            INSPIRO.elements.modal();
            INSPIRO.elements.stickySidebar();
            INSPIRO.elements.copyToClipboard();
            //  INSPIRO.elements.notification();
            INSPIRO.elements.other();

        },

        other: function (context) {


            $('[data-switch=true], .bt-switch').bootstrapSwitch();

            if ($(".toggle-item").length > 0) {
                $(".toggle-item").each(function () {
                    var elem = $(this),
                        toggleItemClass = elem.attr('data-class'),
                        toggleItemClassTarget = elem.attr('data-target');

                    elem.on("click", function () {
                        if (toggleItemClass) {
                            if (toggleItemClassTarget) {
                                $(toggleItemClassTarget).toggleClass(toggleItemClass);
                            } else {
                                elem.toggleClass(toggleItemClass);
                            }
                        }
                        elem.toggleClass("toggle-active");
                        return false;
                    });
                });
            }

            /*Hover 3d Effect*/
            if ($(".hover-3d").length > 0) {
                $(".hover-3d").each(function () {
                    var $elem = $(this),
                        selector = $elem.attr("data-selector") || ".portfolio-item-wrap",
                        shine = $elem.attr("data-shine") || false,
                        sensitivity = $elem.attr("data-sensitivity") || 16;

                    $elem.hover3d({
                        selector: selector,
                        shine: shine,
                        sensitivity: Number(sensitivity)
                    });
                });
            }








            $('.form-group.form-group-default', context).click(function () {
                $(this).find('input').focus();
            });

            if (!this.initFormGroupDefaultRun) {
                $('body').on('focus', '.form-group.form-group-default :input', function () {
                    $('.form-group.form-group-default').removeClass('focused');
                    $(this).parents('.form-group').addClass('focused');
                });

                $('body').on('blur', '.form-group.form-group-default :input', function () {
                    $(this).parents('.form-group').removeClass('focused');
                    if ($(this).val()) {
                        $(this).closest('.form-group').find('label').addClass('fade');
                    } else {
                        $(this).closest('.form-group').find('label').removeClass('fade');
                    }
                });

                // Only run the above code once.
                this.initFormGroupDefaultRun = true;
            }

            $('.form-group.form-group-default .checkbox, .form-group.form-group-default .radio', context).hover(function () {
                $(this).parents('.form-group').addClass('focused');
            }, function () {
                $(this).parents('.form-group').removeClass('focused');
            });





        },
        naTo: function () {
            // Handle all dotsMenu links, but filter behavior based on href
            $('a.scroll-to, #dotsMenu > ul > li > a, .menu-one-page nav > ul > li > a[href^="#"]').on('click', function (e) {
                var $anchor = $(this);
                var href = $anchor.attr('href');
                
                // Check if this is an anchor link and target exists
                if (!href || !href.startsWith('#') || $(href).length === 0) {
                    // Not an anchor link or target doesn't exist, navigate normally
                    return;
                }

                e.preventDefault();

                if ($body.is('.device-xxs, .device-xs, .device-sm')) {
                    if ($mainmenu.hasClass('menu-one-page')) {
                        $header.find("#mainMenu").css("max-height", 0);
                        $body.toggleClass("mainMenu-open");
                        $("#mainMenu-trigger button").toggleClass("toggle-active");
                    }
                }

                var extraPaddingTop = 0,
                    extraHeaderHeight = 0;

                if ($('.dashboard').length > 0) {
                    extraPaddingTop = 30;
                }
                if ($header.length > 0) {
                    extraHeaderHeight = $header.height();
                }

                $('html, body').stop(true, false).animate({
                    scrollTop: ($(href).offset().top - (extraHeaderHeight + extraPaddingTop))
                }, 1500, 'easeInOutExpo');
            });
        },
        textRotator: function () {
            if (!$().Morphext) {
                console.log('textRotator: Morphext plugin is missing.');
                return true;
            }
            if ($textRotator.length > 0) {
                $textRotator.each(function () {
                    var $elem = $(this),
                        dataTextSeperator = $elem.attr('data-rotate-separator') || ",",
                        dataTextEffect = $elem.attr('data-rotate-effect') || "flipInX",
                        dataTextSpeed = $elem.attr('data-rotate-speed') || 2000;
                    $elem.Morphext({
                        animation: dataTextEffect,
                        separator: dataTextSeperator,
                        speed: Number(dataTextSpeed)
                    });
                });
            }
        },
        buttons: function () {
            //Button slide width
            if ($(".btn-slide[data-width]")) {

                $(".btn.btn-slide[data-width]").each(function () {
                    var elem = $(this),
                        elemWidth = elem.attr('data-width'),
                        elemDefaultWidth;
                    switch (true) {
                        case elem.hasClass('btn-lg'):
                            elemDefaultWidth = "60";
                            break;
                        case elem.hasClass('btn-sm'):
                            elemDefaultWidth = "36";
                            break;
                        case elem.hasClass('btn-xs'):
                            elemDefaultWidth = "28";
                            break;
                        default:
                            elemDefaultWidth = "48";
                            break;
                    }
                    elem.hover(function () {
                        $(this).css("width", elemWidth + "px");
                    }, function () {
                        $(this).css("width", elemDefaultWidth + "px");
                    });
                });
            }
        },
        accordion: function () {
            var $accs = $(classFinder + accordionItem);
            $accs.length && ($accs.each(function () {
                var $item = $(this);
                $item.hasClass(itemActive) ? $item.addClass(itemActive) : $item.find(classFinder + itemContent).hide();
            }), $(classFinder + itemTitle).on("click", function (e) {
                var $link = $(this),
                    $item = $link.parents(classFinder + accordionItem),
                    $acc = $item.parents(classFinder + accordionType);
                $item.hasClass(itemActive) ? $acc.hasClass(toogleType) ? ($item.removeClass(itemActive), $link.next(classFinder + itemContent).slideUp("fast")) : ($acc.find(classFinder + accordionItem).removeClass(itemActive), $acc.find(classFinder + itemContent).slideUp("fast")) : ($acc.hasClass(toogleType) || ($acc.find(classFinder + accordionItem).removeClass(itemActive), $acc.find(classFinder + itemContent).slideUp("fast")), $item.addClass(itemActive), $link.next(classFinder + itemContent).slideToggle("fast")), e.preventDefault();
                return false;
            }));
        },
        animations: function () {
            if (dataAnimation.length > 0) {
                //if ( $body.hasClass('device-xl') || $body.hasClass('device-lg') || $body.hasClass('device-md')) {
                    dataAnimation.each(function () {
                        $(this).addClass("animated");
                        var $elem = $(this),
                            animationType = $elem.attr("data-animation") || "fadeIn",
                            animationDelay = $elem.attr("data-animation-delay") || 200,
                            animationDirection = ~animationType.indexOf("Out") ? "back" : "forward";
                        if (animationDirection == "forward") {
                            $elem.appear(function () {
                                var t = setTimeout(function () {
                                    $elem.addClass(animationType + " visible");
                                }, animationDelay);
                            }, {
                                accX: 0,
                                accY: -120
                            }, 'easeInCubic');
                        } else {
                            $elem.addClass("visible");
                            $elem.on("click", function () {
                                $elem.addClass(animationType);
                                return false;
                            });
                        }
                        if ($elem.parents('.demo-play-animations').length) {
                            $elem.on("click", function () {
                                $elem.removeClass(animationType);
                                var t = setTimeout(function () {
                                    $elem.addClass(animationType);
                                }, 50);
                                return false;
                            });
                        }
                    });
               // }
            }
        },
        parallax: function () {

            if (!$().scrolly) {
                console.log('parallax: scrolly plugin is missing.');
                return true;
            }
            if ($parallax.length > 0) {
                $parallax.each(function () {

                    var $elem = $(this),
                        elemImageSrc = $elem.attr("data-parallax-image"),
                        elemImageVelocity = $elem.attr("data-velocity") || "-.090";

                    $elem.prepend('<div class="parallax-container" data-velocity="' + elemImageVelocity + '" style="background: url(' + elemImageSrc + ')"></div>');

                    if ($body.hasClass('device-lg') || $body.hasClass('device-md')) {
                        $elem.find(".parallax-container").scrolly({
                            bgParallax: true
                        });

                    } else {
                        $elem.find(".parallax-container").addClass("parallax-responsive");
                    }

                });
            }
        },
        responsiveVideos: function () {
            if (!$().fitVids) {
                console.log('responsiveVideos: fitVids plugin is missing.');
                return true;
            }
            $("section, .content, .post-content, .video-js, .post-video, .video-wrap, .ajax-quick-view,#slider:not(.revslider-wrap)").fitVids();
        },
        counters: function () {
            if (!$().countTo) {
                console.log('counters: countTo plugin is missing.');
                return true;
            }
            if ($counter.length > 0) {
                $counter.each(function () {
                    var $elem = $(this);
                    if ($body.hasClass('device-lg') || $body.hasClass('device-md')) {
                        $elem.appear(function () {
                            $elem.find('span').countTo();
                        });
                    } else {
                        var countTo = $elem.find('span').attr('data-to');
                        $elem.find('span').html(countTo);
                    }
                });
            }
        },
        countdownTimer: function () {
            if (!$().countdown) {
                console.log('countdownTimer: countdown plugin is missing.');
                return true;
            }
            if ($countdownTimer.length > 0) {
                var t = setTimeout(function () {
                    $('[data-countdown]').each(function () {
                        var $this = $(this),
                            finalDate = $(this).data('countdown');
                        $this.countdown(finalDate, function (event) {
                            $this.html(event.strftime('<div class="countdown-container"><div class="countdown-box"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="countdown-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="countdown-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="countdown-box"><div class="number">%S</div><span>Seconds</span></div></div>'));
                        });
                    });
                }, 300);
            }
        },
        progressBar: function () {
            if ($progressBar.length > 0) {
                $progressBar.each(function (i, elem) {
                    var $elem = $(this),
                        percent = $elem.attr('data-percent') || "100",
                        delay = $elem.attr('data-delay') || "60",
                        type = $elem.attr('data-type') || "%";
                    if (!$elem.hasClass('progress-animated')) {
                        $elem.css({
                            'width': '0%'
                        });
                    }
                    var progressBarRun = function () {
                        $elem.animate({
                            'width': percent + '%'
                        }, 'easeInOutCirc').addClass('progress-animated');
                        $elem.delay(delay).append('<span class="progress-type">' + type + '</span><span class="progress-number animated fadeIn">' + percent + '</span>');
                    };
                    if ($body.hasClass('device-lg') || $body.hasClass('device-md')) {
                        $(elem).appear(function () {
                            var t = setTimeout(function () {
                                progressBarRun();
                            }, delay);
                        });
                    } else {
                        progressBarRun();
                    }
                });
            }
        },
        pieChart: function () {
            if (!$().easyPieChart) {
                console.log('pieChart: easyPieChart plugin is missing.');
                return true;
            }
            if ($pieChart.length > 0) {
                $pieChart.each(function () {
                    var $elem = $(this),
                        pieChartSize = $elem.attr('data-size') || "160",
                        pieChartAnimate = $elem.attr('data-animate') || "2000",
                        pieChartWidth = $elem.attr('data-width') || "6",
                        pieChartColor = $elem.attr('data-color') || "$base-color",
                        pieChartTrackColor = $elem.attr('data-trackcolor') || "rgba(0,0,0,0.10)";
                    $elem.find('span, i').css({
                        'width': pieChartSize + 'px',
                        'height': pieChartSize + 'px',
                        'line-height': pieChartSize + 'px'
                    });
                    $elem.appear(function () {
                        $elem.easyPieChart({
                            size: Number(pieChartSize),
                            animate: Number(pieChartAnimate),
                            trackColor: pieChartTrackColor,
                            lineWidth: Number(pieChartWidth),
                            barColor: pieChartColor,
                            scaleColor: false,
                            lineCap: 'square',
                            onStep: function (from, to, percent) {
                                $elem.find('span.percent').text(Math.round(percent));
                            }
                        });
                    });
                });
            }
        },
        maps: function () {
            if (!$().gMap) {
                console.log('maps: gMap plugin is missing.');
                return true;
            }
            if ($map.length > 0) {
                $map.each(function () {
                    var $elem = $(this),
                        mapAddress = $elem.attr('data-map-address') ? $elem.attr('data-map-address') : "Melbourne, Australia",
                        mapType = $elem.attr('data-map-type') ? $elem.attr('data-map-type') : "ROADMAP",
                        mapZoom = $elem.attr('data-map-zoom') ? $elem.attr('data-map-zoom') : "14",
                        mapIcon = $elem.attr('data-map-icon') ? $elem.attr('data-map-icon') : "images/markers/marker2.png";



                    var markers = [{
                        address: mapAddress,
                        html: mapAddress,
                        icon: {
                            image: mapIcon,
                            iconsize: [40, 63],
                            iconanchor: [18, 60],
                        },
                    }];
                    $elem.gMap({
                        address: mapAddress,
                        maptype: mapType,
                        markers: markers,
                        zoom: Number(mapZoom),
                        doubleclickzoom: true,
                        controls: {
                            panControl: true,
                            zoomControl: true,
                            mapTypeControl: false,
                            scaleControl: true,
                            streetViewControl: false,
                            overviewMapControl: true
                        },
                        styles: [{
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{
                                visibility: "off"
                        }]
                    }]
                    });
                });
            }
        },
        gridLayout: function () {
            if (!$().isotope) {
                console.log('gridLayout: isotope plugin is missing.');
                return true;
            }
            if ($gridLayout.length > 0) {
                $gridLayout.each(function () {
                    var elem = $(this),
                        gridItem = elem.attr('data-item') || "portfolio-item",
                        gridLayoutMode = elem.attr('data-layout') || "masonry",
                        gridStagger = elem.attr('data-stagger') || 10,
                        gridMargin = elem.attr('data-margin') || 20,
						gridXsMargin = elem.attr('data-xs-margin') || gridMargin,
                        gridTransition = elem.attr("data-transition") || "0.55s";
					
					
	
					 if($window.width() < 992) {
						 gridMargin = gridXsMargin;
					 }

                    if (gridLayoutMode == "fitRows") {
                        var gridMargin2 = (gridMargin + 2);
                    } else {
                        var gridMargin2 = gridMargin;
                        var gridMargin2 = gridMargin;
                    }

                    elem.css("margin", "0 -" + gridMargin2 + "px -" + gridMargin + "px 0");

                    elem.find('.' + gridItem).css("padding", "0 " + gridMargin + "px " + gridMargin + "px 0");
					


                    // $window.on("load", function () {
                    //elem.imagesLoaded( function() {
                    //setTimeout(function () {
                    elem.imagesLoaded(function () {
                        var t = setTimeout(function () {
                            elem.isotope({
                                layoutMode: gridLayoutMode,
                                transitionDuration: gridTransition,
                                stagger: Number(gridStagger),
                                itemSelector: "." + gridItem,
                                autoHeight: true,
                                hiddenStyle: {
                                    opacity: 0,
                                    transform: "translate3d(0px, 60px, 0px)",
                                },
                                visibleStyle: {
                                    opacity: 1,
                                    transform: "translate3d(0px, 0px, 0px)",
                                },
                                masonry: {
                                    // use outer width of grid-sizer for columnWidth
                                    columnWidth: elem.find('.' + gridItem + ':not(.large-width)')[0],
                                }
                            });
                            elem.css({
                                'opacity': 1
                            });
                            var iso = elem.data('isotope');
                            elem.isotope('reveal', iso.items);

                        }, 100);

                    });
                    /*Infinity Scroll*/
                    if (elem.next().hasClass("infinite-scroll")) {
                        INSPIRO.elements.gridLayoutInfinite(elem, gridItem, gridMargin);
                    }


                });
                if ($gridFilter.length > 0) {
                    $gridFilter.each(function () {
                        var elem = $(this),
                            elemLayoutCnt = elem.attr('data-layout'),
                            elemActive = elem.attr('data-active-class') || "active";
                        elem.find('a').click(function () {
                            elem.find('li').removeClass(elemActive);
                            $(this).parent('li').addClass(elemActive);
                            $(elemLayoutCnt).isotope({
                                filter: $(this).attr('data-category')
                            });

                            if ($(".grid-active-title").length > 0) {
                                $(".grid-active-title").empty().append($(this).text())
                            }
                            return false;
                        });
                    });
                }


            }
        },
        gridLayoutRefresh: function () {
            if ($gridLayout.length > 0) {
                $gridLayout.each(function () {
                    var elem = $(this);
                    var t = setTimeout(function () {
                        elem.isotope('layout');
                    }, 300);
                });
            }
        },
        gridLayoutInfinite: function (element, elementSelector, elemGridMargin) {
            if (!$().infinitescroll) {
                console.log('gridLayoutInfinite: infinitescroll plugin is missing.');
                return true;
            }

            var elem = element,
                gridItem = elementSelector,
                gridMargin = elemGridMargin,
                navSelector = "#pagination",
                loadMoreElem = $("#showMore"),
                loadMoreBtn = $("#showMore a.btn"),
                loadMoreBtnText = $("#showMore a.btn").text(),
                loadMoreMessage = $('<div class="infinite-scroll-message"><p class="animated visible fadeIn">No more posts to show</p></div>');



            elem.imagesLoaded(function () {
                elem.infinitescroll({
                        itemSelector: "." + gridItem,
                        navSelector: navSelector,
                        nextSelector: navSelector + ' a:not(.btn)',
                        state: {
                            isDone: false
                        },
                        extraScrollPx: 10,
                        errorCallback: function () {
                            loadMoreElem.addClass("animated visible fadeOut");
                            var t = setTimeout(function () {
                                loadMoreElem.hide();
                                elem.after(loadMoreMessage);
                            }, 500);
                            var t = setTimeout(function () {
                                $(".infinite-scroll-message").addClass("animated visible fadeOut");
                            }, 3800);
                        },
                    },

                    // Function called once the elements are retrieved
                    function (newElements) {
                        loadMoreBtn.text(loadMoreBtnText);

                        elem.css("margin", "0 -" + gridMargin + "px -" + gridMargin + "px 0");
                        elem.find('.' + gridItem).css("padding", "0 " + gridMargin + "px " + gridMargin + "px 0");




                        INSPIRO.slider.carouselAjax();
                        elem.isotope('appended', newElements);
                        INSPIRO.elements.gridLayoutRefresh();

                    });
            });



            if (loadMoreElem.length > 0) {

                $window.unbind('.infscr');

                loadMoreBtn.click(function () {
                    loadMoreBtn.text("Loading...");
                    elem.infinitescroll('retrieve');
                    return false;
                });
            }


        },
        tooltip: function () {
            if (!$().tooltip) {
                console.log('tooltip: tooltip plugin is missing.');
                return true;
            }
            var $tooltip = $('[data-toggle="tooltip"]');
            if ($tooltip.length > 0) {
                $('[data-toggle="tooltip"]').tooltip();
            }
        },
        popover: function () {
            if (!$().popover) {
                console.log('popover: popover plugin is missing.');
                return true;
            }
            var $popover = $('[data-toggle="popover"]');
            if ($popover.length > 0) {
                $('[data-toggle="popover"]').popover({
                    container: 'body',
                    html: true
                });
            }
        },
        lightBoxInspiro: function () {
            
        
			var $lightboxImageEl = $('[data-lightbox="image"]'),
				$lightboxGalleryEl = $('[data-lightbox="gallery"]'),
				$lightboxIframeEl = $('[data-lightbox="iframe"]'),
				$lightboxInlineEl = $('[data-lightbox="inline"]'),
				$lightboxAjaxEl = $('[data-lightbox="ajax"]'),
				$lightboxAjaxGalleryEl = $('[data-lightbox="ajax-gallery"]');

/*			if( $lightboxImageEl.length > 0 ) {
				$lightboxImageEl.magnificPopup({
					type: 'image',
					closeOnContentClick: true,
					closeBtnInside: false,
					fixedContentPos: true,
					mainClass: 'mfp-no-margins mfp-fade', // class to remove default margin from left and right side
					image: {
						verticalFit: true
					}
				});
			}*/
            
            
            if (!$().magnificPopup) {
                console.log('lightBoxInspiro: magnificPopup plugin is missing.');
                return true;
            }
            
            
            if ($lightboxImageEl.length > 0) {
                $lightboxImageEl.magnificPopup({
                    type: 'image',
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function () {
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = "mfp-zoom-out";
                        }
                    },
                });
            }
            if ($lightbox_gallery.length > 0) {
                $lightbox_gallery.each(function () {
                    $(this).magnificPopup({
                        delegate: 'a[data-lightbox="gallery-item"], a[data-lightbox="gallery-image"]',
                        type: 'image',
                        image: {
                            verticalFit: true
                        },
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                        },
                        removalDelay: 500, //delay removal by X to allow out-animation
                        callbacks: {
                            beforeOpen: function () {
                                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                this.st.mainClass = "mfp-zoom-out";
                            }
                        },
                    });
                });
            }
            if ($lightbox_iframe.length > 0) {
                $lightbox_iframe.each(function () {
                    $(this).magnificPopup({
                        type: 'iframe',
                        removalDelay: 500, //delay removal by X to allow out-animation
                        callbacks: {
                            beforeOpen: function () {
                                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                this.st.mainClass = "mfp-zoom-out";
                            }
                        },
                    });
                });
            }
            if ($lightbox_ajax.length > 0) {
                $lightbox_ajax.each(function () {
                    $(this).magnificPopup({
                        type: 'ajax',
                        removalDelay: 500, //delay removal by X to allow out-animation
                        callbacks: {
                            ajaxContentAdded: function (mfpResponse) {
                                INSPIRO.slider.carouselAjax();
                                INSPIRO.elements.responsiveVideos();
                                // INSPIRO.elements.accordion();
                                INSPIRO.elements.buttons();
                            }
                        }
                    });
                });
            }
            if ($lightbox_inline.length > 0) {
                $lightbox_inline.magnificPopup({
                    type: 'inline',
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function () {
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = "mfp-zoom-out";
                        }
                    },
                    closeBtnInside: false,
                    fixedContentPos: true,
                    overflowY: 'scroll',
                });
            }
        },
        youTubeBgPlayer: function () {
            if (!$().mb_YTPlayer) {
                console.log('youTubeBgPlayer: mb_YTPlayer plugin is missing.');
                return true;
            }
            if ($ytPlayer.length > 0) {
                $ytPlayer.each(function () {
                    var elem = $(this),
                        ytPlayerVideo = elem.attr('data-youtube-url') || null,
                        ytPlayerMute = elem.attr('data-youtube-mute') || false,
                        ytPlayerRatio = elem.attr('data-youtube-ratio') || '16/9',
                        ytPlayerQuality = elem.attr('data-youtube-quality') || 'hd720',
                        ytPlayerOpacity = elem.attr('data-youtube-opacity') || 1,
                        ytPlayerContainer = elem.attr('data-youtube-container') || 'self',
                        ytPlayerOptimize = elem.attr('data-youtube-optimize') || true,
                        ytPlayerLoop = elem.attr('data-youtube-loop') || true,
                        ytPlayerVolume = elem.attr('data-youtube-volume') || 70,
                        ytPlayerStart = elem.attr('data-youtube-start') || 0,
                        ytPlayerStop = elem.attr('data-youtube-stop') || 0,
                        ytPlayerAutoPlay = elem.attr('data-youtube-autoplay') || false,
                        ytPlayerFullScreen = elem.attr('data-youtube-fullscreen') || true,
                        ytPlayerControls = elem.attr('data-youtube-controls') || false,
                        ytPlayerLogo = elem.attr('data-youtube-logo') || false,
                        ytPlayerAutoPause = elem.attr('data-youtube-autopause') || false;
                    elem.mb_YTPlayer({
                        videoURL: ytPlayerVideo,
                        mute: ytPlayerMute,
                        ratio: ytPlayerRatio,
                        quality: ytPlayerQuality,
                        opacity: ytPlayerOpacity,
                        containment: ytPlayerContainer,
                        optimizeDisplay: ytPlayerOptimize,
                        loop: ytPlayerLoop,
                        vol: ytPlayerVolume,
                        startAt: ytPlayerStart,
                        stopAt: ytPlayerStop,
                        autoPlay: ytPlayerAutoPlay,
                        realfullscreen: ytPlayerFullScreen,
                        showYTLogo: ytPlayerLogo,
                        showControls: ytPlayerControls
                    });
                    if (!ytPlayerAutoPlay) {
                        elem.find("#youtube-background-controls").addClass("video-is-playing");
                    }
                    elem.on("YTPReady", function () {
                        $("#youtube-background-controls").on("click", function () {
                            if (!$(this).hasClass("video-is-playing")) {
                                $(this).addClass("video-is-playing");
                                $ytPlayer.YTPPause();
                            } else {
                                $(this).removeClass("video-is-playing");
                                $ytPlayer.YTPPlay();
                            }
                            return false;
                        });
                        var elemContainerHeight = elem.height();
                        if (ytPlayerAutoPause) {
                            $window.on('scroll', function () {
                                if ($window.scrollTop() > elemContainerHeight) {
                                    $("#youtube-background-controls").addClass("video-is-playing");
                                    $ytPlayer.YTPPause();
                                }
                            });
                        }
                    });
                });
            }
        },
        vimeoBgPlayer: function () {
            if (!$().vimeo_player) {
                console.log('vimeoBgPlayer: mb.vimeo_player plugin is missing.');
                return true;
            }
            if ($vmPlayer.length > 0) {
                $vmPlayer.each(function () {
                    var elem = $(this);

                    var elem = $(this),
                        vmPlayerVideo = elem.attr('data-vimeo-url') || null,
                        vmPlayerMute = elem.attr('data-vimeo-mute') || false,
                        vmPlayerRatio = elem.attr('data-vimeo-ratio') || '16/9',
                        vmPlayerQuality = elem.attr('data-vimeo-quality') || 'hd720',
                        vmPlayerOpacity = elem.attr('data-vimeo-opacity') || 1,
                        vmPlayerContainer = elem.attr('data-vimeo-container') || 'self',
                        vmPlayerOptimize = elem.attr('data-vimeo-optimize') || true,
                        vmPlayerLoop = elem.attr('data-vimeo-loop') || true,
                        vmPlayerVolume = elem.attr('data-vimeo-volume') || 70,
                        vmPlayerStart = elem.attr('data-vimeo-start') || 0,
                        vmPlayerStop = elem.attr('data-vimeo-stop') || 0,
                        vmPlayerAutoPlay = elem.attr('data-vimeo-autoplay') || true,
                        vmPlayerFullScreen = elem.attr('data-vimeo-fullscreen') || true,
                        vmPlayerControls = elem.attr('data-vimeo-controls') || false,
                        vmPlayerLogo = elem.attr('data-vimeo-logo') || false,
                        vmPlayerAutoPause = elem.attr('data-vimeo-autopause') || false;

                    elem.vimeo_player({
                        videoURL: vmPlayerVideo,
                        mute: vmPlayerMute,
                        ratio: vmPlayerRatio,
                        quality: vmPlayerQuality,
                        opacity: vmPlayerOpacity,
                        containment: vmPlayerContainer,
                        optimizeDisplay: vmPlayerOptimize,
                        loop: vmPlayerLoop,
                        vol: vmPlayerVolume,
                        startAt: vmPlayerStart,
                        stopAt: vmPlayerStop,
                        autoPlay: vmPlayerAutoPlay,
                        realfullscreen: vmPlayerFullScreen,
                        showvmLogo: vmPlayerLogo,
                        showControls: vmPlayerControls
                    });


                });



            }
        },
        modal: function () {
            if (!$().magnificPopup) {
                console.log('lightBoxInspiro: magnificPopup plugin is missing.');
                return true;
            }
            var $modal = $(".modal"),
                $modalStrip = $(".modal-strip"),
                $btnModal = $(".btn-modal"),
                modalShow = "modal-auto-open",
                modalShowClass = "modal-active",
                modalDecline = $(".modal-close"),
                /*CookieNotify*/
                cookieNotify = $(".cookie-notify"),
                cookieConfirm = cookieNotify.find(".modal-confirm, .mfp-close"),
                coockieExpire = cookieNotify.attr("data-expire") || 365,
                coockieName = cookieNotify.attr("data-cookie-name") || "websiteCookies";

            /*Modal*/
            if ($modal.length > 0) {
                $modal.each(function () {
                    var elem = $(this),
                        elemDelay = elem.attr("data-delay") || 3000;



                    /*Modal Auto Show*/
                    if (elem.hasClass(modalShow)) {
                        if ($.cookie(coockieName) != 'confirfmed') {
                            var t = setTimeout(function () {
                                $.magnificPopup.open({
                                    items: {
                                        src: elem
                                    },
                                    type: 'inline',
                                    closeBtnInside: true,
                                    removalDelay: 500,
                                    callbacks: {
                                        beforeOpen: function () {
                                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                            this.st.mainClass = "mfp-zoom-out";
                                        },
                                        open: function () {
                                            if (elem.find("video").length > 0) {
                                                elem.find("video").get(0).play();
                                            }
                                        }
                                    }
                                }, 0);
                            }, elemDelay);
                        }
                    }

                    /*Modal Dissmis Button*/
                    elem.find(modalDecline).click(function () {
                        $.magnificPopup.close();
                        return false;
                    });

                    /*Cookie Notify*/
                    if (elem.hasClass("cookie-notify")) {
                        var t = setTimeout(function () {
                            if ($.cookie(coockieName) != 'confirfmed') {
                                cookieNotify.addClass(modalShowClass);
                            }
                        }, elemDelay);
                        cookieConfirm.click(function () {
                            $.cookie(coockieName, 'confirfmed', {
                                expires: Number(coockieExpire)
                            });
                            $.magnificPopup.close();
                            cookieNotify.removeClass(modalShowClass);
                            return false;
                        });
                    }
                });
            }
            /*Modal Strip*/
            if ($modalStrip.length > 0) {

                $modalStrip.each(function () {
                    var elem = $(this),
                        modalDelay = elem.attr("data-delay") || 3000;
                    /*Modal Auto Show*/
                    if (elem.hasClass(modalShow)) {
                        var modalElem = $(this);
                        var t = setTimeout(function () {
                            modalElem.addClass(modalShowClass);
                        }, modalDelay);
                    }
                    /*Modal Dissmis Button*/
                    elem.find(modalDecline).click(function () {
                        elem.removeClass(modalShowClass);
                        return false;
                    });
                    /*Cookie Notify*/
                    if (elem.hasClass("cookie-notify")) {
                        var t = setTimeout(function () {
                            if ($.cookie(coockieName) != 'confirfmed') {
                                cookieNotify.addClass(modalShowClass);
                            }
                        }, modalDelay);
                        cookieConfirm.click(function () {
                            $.cookie(coockieName, 'confirfmed', {
                                expires: Number(coockieExpire)
                            });
                            cookieNotify.removeClass(modalShowClass);
                            return false;
                        });
                    }
                });
            }
            /*Modal toggles*/
            if ($btnModal.length > 0) {

                $btnModal.each(function () {
                    var elem = $(this),
                        modalTarget = elem.attr("data-modal");
                    elem.click(function () {
                        $(modalTarget).toggleClass(modalShowClass, 1000);
                        return false;
                    });
                });
            }
        },

        notification: function ($message, $type) {

            $.notify({
                message: $message
            }, {
                type: $type || 'success',
                mouse_over: true
            });

        },

        stickySidebar: function () {

            if (!$().theiaStickySidebar) {
                console.log('Sticky Sidebar: theiaStickySidebar plugin is missing.');
                return true;
            }

            $stickySidebar.each(function () {
                var elem = $(this),
                    elemTop = elem.attr('data-offset-top') || 120,
                    elemBottom = elem.attr('data-offset-bottom') || 50;

                elem.theiaStickySidebar({
                    // Settings
                    additionalMarginTop: Number(elemTop),
                    additionalMarginBottom: Number(elemBottom)
                });
            });

        },
        copyToClipboard: function () {
            /*FA5 demo list #REMOVE THIS CODE*/
            if ($(".icon-set-container").length > 0) {
                $(".icon-set-container .icon-class").each(function () {
                    $(this).attr("id", $(this).text());
                    $(this).parent().attr("data-clipboard-target", $(this).text());
                });
            };

            $("[data-clipboard-target]").click(function () {
                var id = $(this).attr('data-clipboard-target');
                var el = document.getElementById(id);
                var range = document.createRange();
                range.selectNodeContents(el);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                document.execCommand('copy');
                INSPIRO.elements.notification("<b>" + sel + "</b>" + " is copied successfuly!", "success");
                return false;
            });


        }
    };

    INSPIRO.isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (INSPIRO.isMobile.Android() || INSPIRO.isMobile.BlackBerry() || INSPIRO.isMobile.iOS() || INSPIRO.isMobile.Opera() || INSPIRO.isMobile.Windows());
        }
    };

    //Document resize functions
    INSPIRO.documentOnResize = {
        functions: function () {
            INSPIRO.header.logoStatus();
            INSPIRO.header.stickyHeader();
            INSPIRO.core.screenSizeControl();
            //INSPIRO.slider.sliderScreenSizeControl();
            // INSPIRO.header.mainMenu();
            INSPIRO.core.customHeight();
            // INSPIRO.core.stickyFooter();
        },
    };
    $window.on('resize', INSPIRO.documentOnResize.functions);

    //Document ready functions
    INSPIRO.documentReady = {
        functions: function () {
            INSPIRO.core.pageLoader();
            //INSPIRO.slider.sliderScreenSizeControl();
            INSPIRO.core.functions();
            INSPIRO.header.logoStatus();
            INSPIRO.header.functions();
            INSPIRO.slider.functions();
            INSPIRO.elements.functions();
            //INSPIRO.widgets.functions();
        },
    };
    $(document).ready(INSPIRO.documentReady.functions);

    //Document on load functions
    INSPIRO.documentOnLoad = {
        functions: function () {



        },
    };
    $(window).on('load', INSPIRO.documentOnLoad.functions);

    //Document Scroll functions
    INSPIRO.documentScroll = {
        functions: function () {
            INSPIRO.header.logoStatus();
            INSPIRO.header.stickyHeader();
            INSPIRO.core.goToTop();
            INSPIRO.header.dotsMenu();
            INSPIRO.header.onepageMenu();
        },
    };
    $window.on('scroll', INSPIRO.documentScroll.functions);



    INSPIRO.lightBoxInspiro = function () {

        if ($lightbox_image.length > 0) {
            $lightbox_image.magnificPopup({
                type: 'image',
                removalDelay: 500, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = "mfp-zoom-out";
                    }
                },
            });
        }
        if ($lightbox_gallery.length > 0) {
            $lightbox_gallery.each(function () {
                $(this).magnificPopup({
                    delegate: 'a[data-lightbox="gallery-item"]',
                    type: 'image',
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function () {
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = "mfp-zoom-out";
                        }
                    },
                });
            });
        }
        if ($lightbox_iframe.length > 0) {
            $lightbox_iframe.each(function () {
                $(this).magnificPopup({
                    type: 'iframe',
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function () {
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = "mfp-zoom-out";
                        }
                    },
                });
            });
        }
        if ($lightbox_ajax.length > 0) {
            $lightbox_ajax.each(function () {
                $(this).magnificPopup({
                    type: 'ajax',
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        ajaxContentAdded: function (mfpResponse) {
                            INSPIRO.lightBoxInspiro();
                            INSPIRO.slider.carouselAjax();
                            INSPIRO.elements.responsiveVideos();
                            INSPIRO.elements.accordion();
                        }
                    }
                });
            });
        }
        if ($lightbox_inline.length > 0) {
            $lightbox_inline.magnificPopup({
                type: 'inline',
                removalDelay: 500, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = "mfp-zoom-out";
                    }
                },
                closeBtnInside: false,
                fixedContentPos: true,
                overflowY: 'scroll',
            });
        }
    };

})(jQuery);
