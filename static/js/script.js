$(function () {
  'use strict';


  

  // ////////////////////////////////
  // spinner script start
  // ////////////////////////////////
  $("#content.inner-container").append(
    '<div style="position:absolute;left:40%;top:20%;z-index:6;" class="load"><div id="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
  );

  $(window).on("load", function () {
    setTimeout(removeLoader, 500);
  });

  function removeLoader() {
    $(".load").fadeOut(500, function () {
      $(".load").remove();
    });
  }

  // ////////////////////////////////
  // spinner script start
  // ////////////////////////////////


  // ////////////////////////////////
  // classyNav.js 1.0.0 script start
  // ////////////////////////////////
  if ($.fn.classyNav) {
    $('#main-menu').classyNav();
  }
  // ////////////////////////////////
  // classyNav.js 1.0.0 script end
  // ////////////////////////////////


  // ////////////////////////////////
  // flipper script start
  // ////////////////////////////////
  jQuery(function ($) {
    $('#myFlipper').flipper('init');
  });
  // ////////////////////////////////
  // flipper script end
  // ////////////////////////////////


  // ////////////////////////////////
  // owlcarousel script start
  // ////////////////////////////////
  $('.owl-left-banner').owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: true,
    autoplay: true,
    margin: 30,
    // responsive:{
    // 	  0:{
    // 		  items:1
    // 	  },
    // 	  600:{
    // 		  items:1
    // 	  },
    // 	  1200:{
    // 		  items:1
    // 	  },
    // 	  1800:{
    // 		items:1
    // 	}
    // }
  })
  $('.owl-right-banner').owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1
      },
      575: {
        items: 2
      },
      992: {
        items: 1
      },
      1800: {
        items: 1
      }
    }

  })
  $('.recommendation-movie').owlCarousel({
    items: 5,
    loop: true,
    dots: false,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      320: {
        items: 1
      },
      575: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }

  })
  // ////////////////////////////////
  // owlcarousel script end
  // ////////////////////////////////


  // ////////////////////////////////
  // magnific-popup script start
  // ////////////////////////////////
  if ($.fn.magnificPopup) {
    $('.video-play-btn').magnificPopup({
      type: 'iframe'
    });
  }
  $(document).ready(function () {
    $('.image-link').magnificPopup({
      type: 'image'
    });
  });

  $('.gallery-lb').each(function () { // the containers for all your galleries
    $(this).magnificPopup({
      delegate: 'a', // the selector for gallery item
      type: 'image',
      gallery: {
        enabled: true
      },
      mainClass: 'mfp-fade'
    });
  });
  // ////////////////////////////////
  // magnific-popup script end
  // ////////////////////////////////


  // ////////////////////////////////
  // slidebars script start
  // ////////////////////////////////
  (function ($) {
    $.slidebars = function (options) {
      function initialise() {
        if (
          !settings.disableOver ||
          ("number" == typeof settings.disableOver &&
            settings.disableOver >= windowWidth)
        ) {
          enabled = true;
          $("html").addClass("sb-init");
          if (settings.hideControlClasses) {
            $delegate.removeClass("sb-hide");
          }
          init();
        } else {
          if ("number" == typeof settings.disableOver) {
            if (settings.disableOver < windowWidth) {
              enabled = false;
              $("html").removeClass("sb-init");
              if (settings.hideControlClasses) {
                $delegate.addClass("sb-hide");
              }
              res.css("minHeight", "");
              if (program || inverse) {
                close();
              }
            }
          }
        }
      }

      function init() {
        res.css("minHeight", "");
        var rgt = parseInt(res.css("height"), 10);
        if (parseInt($("html").css("height"), 10) > rgt) {
          res.css("minHeight", $("html").css("height"));
        }
        if (element) {
          if (element.hasClass("sb-width-custom")) {
            element.css("width", element.attr("data-sb-width"));
          }
        }
        if (el) {
          if (el.hasClass("sb-width-custom")) {
            el.css("width", el.attr("data-sb-width"));
          }
        }
        if (element) {
          if (
            element.hasClass("sb-style-push") ||
            element.hasClass("sb-style-overlay")
          ) {
            element.css("marginLeft", "-" + element.css("width"));
          }
        }
        if (el) {
          if (el.hasClass("sb-style-push") || el.hasClass("sb-style-overlay")) {
            el.css("marginRight", "-" + el.css("width"));
          }
        }
        if (settings.scrollLock) {
          $("html").addClass("sb-scroll-lock");
        }
      }

      function animate(obj, value, prop) {
        function render() {
          that.removeAttr("style");
          init();
        }
        var that;
        if (
          ((that = obj.hasClass("sb-style-push") ?
              res.add(obj).add(dest) :
              obj.hasClass("sb-style-overlay") ?
              obj :
              res.add(dest)),
            "translate" === animation)
        ) {
          if ("0px" === value) {
            render();
          } else {
            that.css("transform", "translate( " + value + " )");
          }
        } else {
          if ("side" === animation) {
            if ("0px" === value) {
              render();
            } else {
              if ("-" === value[0]) {
                value = value.substr(1);
              }
              that.css(prop, "0px");
              setTimeout(function () {
                that.css(prop, value);
              }, 1);
            }
          } else {
            if ("jQuery" === animation) {
              if ("-" === value[0]) {
                value = value.substr(1);
              }
              var anim = {};
              anim[prop] = value;
              that.stop().animate(anim, 400);
            }
          }
        }
      }

      function open(title) {
        function proceed() {
          if (enabled && "left" === title && element) {
            $("html").addClass("sb-active sb-active-left");
            element.addClass("sb-active");
            animate(element, element.css("width"), "left");
            setTimeout(function () {
              program = true;
            }, 400);
          } else {
            if (enabled) {
              if ("right" === title) {
                if (el) {
                  $("html").addClass("sb-active sb-active-right");
                  el.addClass("sb-active");
                  animate(el, "-" + el.css("width"), "right");
                  setTimeout(function () {
                    inverse = true;
                  }, 400);
                }
              }
            }
          }
        }
        if (
          ("left" === title && element && inverse) ||
          ("right" === title && el && program)
        ) {
          close();
          setTimeout(proceed, 400);
        } else {
          proceed();
        }
      }

      function close(url, target) {
        if (program || inverse) {
          if (program) {
            animate(element, "0px", "left");
            program = false;
          }
          if (inverse) {
            animate(el, "0px", "right");
            inverse = false;
          }
          setTimeout(function () {
            $("html").removeClass("sb-active sb-active-left sb-active-right");
            if (element) {
              element.removeClass("sb-active");
            }
            if (el) {
              el.removeClass("sb-active");
            }
            if (void 0 !== url) {
              if (void 0 === typeof target) {
                target = "_self";
              }
              window.open(url, target);
            }
          }, 400);
        }
      }

      function toggle(var_args) {
        if ("left" === var_args) {
          if (element) {
            if (program) {
              close();
            } else {
              open("left");
            }
          }
        }
        if ("right" === var_args) {
          if (el) {
            if (inverse) {
              close();
            } else {
              open("right");
            }
          }
        }
      }

      function eventHandler(e, event) {
        e.stopPropagation();
        e.preventDefault();
        if ("touchend" === e.type) {
          event.off("click");
        }
      }
      var settings = $.extend({
          siteClose: true,
          scrollLock: false,
          disableOver: false,
          hideControlClasses: false
        },
        options
      );

      var style = document.createElement("div").style;
      var a = false;
      var b = false;
      if (
        "" === style.MozTransition ||
        "" === style.WebkitTransition ||
        "" === style.OTransition ||
        "" === style.transition
      ) {
        a = true;
      }
      if (
        "" === style.MozTransform ||
        "" === style.WebkitTransform ||
        "" === style.OTransform ||
        "" === style.transform
      ) {
        b = true;
      }
      var agent = navigator.userAgent;
      var resampleWidth = false;
      var resampleHeight = false;
      if (/Android/.test(agent)) {
        resampleWidth = agent.substr(agent.indexOf("Android") + 8, 3);
      } else {
        if (/(iPhone|iPod|iPad)/.test(agent)) {
          resampleHeight = agent
            .substr(agent.indexOf("OS ") + 3, 3)
            .replace("_", ".");
        }
      }
      if (
        (resampleWidth && 3 > resampleWidth) ||
        (resampleHeight && 5 > resampleHeight)
      ) {
        $("html").addClass("sb-static");
      }
      var res = $("#site-container, .sb-site-container");
      if ($(".sb-left").length) {
        var element = $(".sb-left");
        var program = false;
      }
      if ($(".sb-right").length) {
        var el = $(".sb-right");
        var inverse = false;
      }
      var enabled = false;
      var windowWidth = $(window).width();
      var $delegate = $(
        ".sb-toggle-left, .sb-toggle-right, .sb-open-left, .sb-open-right, .sb-close"
      );
      var dest = $(".sb-slide");
      initialise();
      $(window).resize(function () {
        var windowWidthNew = $(window).width();
        if (windowWidth !== windowWidthNew) {
          windowWidth = windowWidthNew;
          initialise();
          if (program) {
            open("left");
          }
          if (inverse) {
            open("right");
          }
        }
      });
      var animation;
      if (a && b) {
        animation = "translate";
        if (resampleWidth) {
          if (4.4 > resampleWidth) {
            animation = "side";
          }
        }
      } else {
        animation = "jQuery";
      }
      this.slidebars = {
        open: open,
        close: close,
        toggle: toggle,
        init: function () {
          return enabled;
        },
        active: function (alignment) {
          return "left" === alignment && element ?
            program :
            "right" === alignment && el ?
            inverse :
            void 0;
        },
        destroy: function (alignment) {
          if ("left" === alignment) {
            if (element) {
              if (program) {
                close();
              }
              setTimeout(function () {
                element.remove();
                element = false;
              }, 400);
            }
          }
          if ("right" === alignment) {
            if (el) {
              if (inverse) {
                close();
              }
              setTimeout(function () {
                el.remove();
                el = false;
              }, 400);
            }
          }
        }
      };
      $(".sb-toggle-left").on("touchend click", function (e) {
        eventHandler(e, $(this));
        toggle("left");
      });
      $(".sb-toggle-right").on("touchend click", function (e) {
        eventHandler(e, $(this));
        toggle("right");
      });
      $(".sb-open-left").on("touchend click", function (e) {
        eventHandler(e, $(this));
        open("left");
      });
      $(".sb-open-right").on("touchend click", function (e) {
        eventHandler(e, $(this));
        open("right");
      });
      $(".sb-close").on("touchend click", function (e) {
        if ($(this).is("a") || $(this).children().is("a")) {
          if ("click" === e.type) {
            e.stopPropagation();
            e.preventDefault();
            var $el = $(this).is("a") ? $(this) : $(this).find("a");
            var linkURL = $el.attr("href");
            var basePrototype = $el.attr("target") ?
              $el.attr("target") :
              "_self";
            close(linkURL, basePrototype);
          }
        } else {
          eventHandler(e, $(this));
          close();
        }
      });
      res.on("touchend click", function (e) {
        if (settings.siteClose) {
          if (program || inverse) {
            eventHandler(e, $(this));
            close();
          }
        }
      });
    };
  })(jQuery),
  (function ($) {
    $(document).ready(function () {
      $.slidebars();
    });
  })(jQuery),
  // ////////////////////////////////
  // slidebars script end
  // ////////////////////////////////

  // ////////////////////////////////
  // header secondary script start
  // ////////////////////////////////
  (function ($) {
    function getParent($this) {
      var selector = $this.attr("data-target");
      if (!selector) {
        selector = $this.attr("href");
        selector =
          selector &&
          /#[A-Za-z]/.test(selector) &&
          selector.replace(/.*(?=#[^\s]*$)/, "");
      }
      var $parent = selector && $(selector);
      return $parent && $parent.length ? $parent : $this.parent();
    }

    function init(e) {
      if (!(e && 3 === e.which)) {
        $(backdrop).remove();
        $(selector).each(function () {
          var $this = $(this);
          var $parent = getParent($this);
          var relatedTarget = {
            relatedTarget: this
          };
          if ($parent.hasClass("open")) {
            if (
              !(
                e &&
                "click" == e.type &&
                /input|textarea/i.test(e.target.tagName) &&
                $.contains($parent[0], e.target)
              )
            ) {
              $parent.trigger((e = $.Event("hide.bs.dropdown", relatedTarget)));
              if (!e.isDefaultPrevented()) {
                $this.attr("aria-expanded", "false");
                $parent
                  .removeClass("open")
                  .trigger($.Event("hidden.bs.dropdown", relatedTarget));
              }
            }
          }
        });
      }
    }

    function setValue(type) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data("bs.dropdown");
        if (!data) {
          $this.data("bs.dropdown", (data = new Dropdown(this)));
        }
        if ("string" == typeof type) {
          data[type].call($this);
        }
      });
    }
    var backdrop = ".dropdown-backdrop";
    var selector = '[data-toggle="dropdown"]';
    var Dropdown = function (element) {
      $(element).on("click.bs.dropdown", this.toggle);
    };
    Dropdown.VERSION = "3.3.5";
    Dropdown.prototype.toggle = function (event) {
      var $this = $(this);
      if (!$this.is(".disabled, :disabled")) {
        var $parent = getParent($this);
        var isActive = $parent.hasClass("open");
        if ((init(), !isActive)) {
          if ("ontouchstart" in document.documentElement) {
            if (!$parent.closest(".navbar-nav").length) {
              $(document.createElement("div"))
                .addClass("dropdown-backdrop")
                .insertAfter($(this))
                .on("click", init);
            }
          }
          var touch = {
            relatedTarget: this
          };
          if (
            ($parent.trigger((event = $.Event("show.bs.dropdown", touch))),
              event.isDefaultPrevented())
          ) {
            return;
          }
          $this.trigger("focus").attr("aria-expanded", "true");
          $parent
            .toggleClass("open")
            .trigger($.Event("shown.bs.dropdown", touch));
        }
        return false;
      }
    };
    Dropdown.prototype.keydown = function (e) {
      if (
        /(38|40|27|32)/.test(e.which) &&
        !/input|textarea/i.test(e.target.tagName)
      ) {
        var $this = $(this);
        if (
          (e.preventDefault(),
            e.stopPropagation(),
            !$this.is(".disabled, :disabled"))
        ) {
          var $parent = getParent($this);
          var isActive = $parent.hasClass("open");
          if ((!isActive && 27 != e.which) || (isActive && 27 == e.which)) {
            return (
              27 == e.which && $parent.find(selector).trigger("focus"),
              $this.trigger("click")
            );
          }
          var elements = $parent.find(
            ".dropdown-menu li:not(.disabled):visible a"
          );
          if (elements.length) {
            var index = elements.index(e.target);
            if (38 == e.which) {
              if (index > 0) {
                index--;
              }
            }
            if (40 == e.which) {
              if (index < elements.length - 1) {
                index++;
              }
            }
            if (!~index) {
              index = 0;
            }
            elements.eq(index).trigger("focus");
          }
        }
      }
    };
    var old = $.fn.dropdown;
    $.fn.dropdown = setValue;
    $.fn.dropdown.Constructor = Dropdown;
    $.fn.dropdown.noConflict = function () {
      return ($.fn.dropdown = old), this;
    };
    $(document)
      .on("click.bs.dropdown.data-api", init)
      .on("click.bs.dropdown.data-api", ".dropdown form", function (event) {
        event.stopPropagation();
      })
      .on("click.bs.dropdown.data-api", selector, Dropdown.prototype.toggle)
      .on("keydown.bs.dropdown.data-api", selector, Dropdown.prototype.keydown)
      .on(
        "keydown.bs.dropdown.data-api",
        ".dropdown-menu",
        Dropdown.prototype.keydown
      );
  })(jQuery);
  // ////////////////////////////////
  // header secondary script end
  // ////////////////////////////////

  // ////////////////////////////////
  // Go top buttom script start
  // ////////////////////////////////
  const rootElement = document.documentElement;
  const upToTopBtn = document.getElementById("upToTopBtn");
  
  function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  
  function showBtn() {
    if (document.body.scrollTop > 100 || rootElement.scrollTop > 100) {
      upToTopBtn.classList.add("active");
    } else {
      upToTopBtn.classList.remove("active");
    }
  }
  
  document.addEventListener("scroll", showBtn);
  upToTopBtn.addEventListener("click", scrollToTop);
  // ////////////////////////////////
  // Go top buttom script end
  // ////////////////////////////////





});