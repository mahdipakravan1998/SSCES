(function (f) {
    f.fn.marquee = function (x) {
        return this.each(function () {
            var a = f.extend({}, f.fn.marquee.defaults, x),
                b = f(this),
                c, h, t, u, k, e = 3,
                y = "animation-play-state",
                n = !1,
                E = function (a, b, c) {
                    for (var e = ["webkit", "moz", "MS", "o", ""], d = 0; d < e.length; d++) e[d] || (b = b.toLowerCase()), a.addEventListener(e[d] + b, c, !1)
                },
                F = function (a) {
                    var b = [],
                        c;
                    for (c in a) a.hasOwnProperty(c) && b.push(c + ":" + a[c]);
                    b.push();
                    return "{" + b.join(",") + "}"
                },
                p = {
                    pause: function () {
                        n && a.allowCss3Support ? c.css(y, "paused") : f.fn.pause && c.pause();
                        b.data("runningStatus",
                            "paused");
                        b.trigger("paused")
                    },
                    resume: function () {
                        n && a.allowCss3Support ? c.css(y, "running") : f.fn.resume && c.resume();
                        b.data("runningStatus", "resumed");
                        b.trigger("resumed")
                    },
                    toggle: function () {
                        p["resumed" == b.data("runningStatus") ? "pause" : "resume"]()
                    },
                    destroy: function () {
                        clearTimeout(b.timer);
                        b.find("*").andSelf().unbind();
                        b.html(b.find(".js-marquee:first").html())
                    }
                };
            if ("string" === typeof x) f.isFunction(p[x]) && (c || (c = b.find(".js-marquee-wrapper")), !0 === b.data("css3AnimationIsSupported") && (n = !0), p[x]());
            else {
                var v;
                f.each(a, function (c, d) {
                    v = b.attr("data-" + c);
                    if ("undefined" !== typeof v) {
                        switch (v) {
                            case "true":
                                v = !0;
                                break;
                            case "false":
                                v = !1
                        }
                        a[c] = v
                    }
                });
                a.speed && (a.duration = a.speed * parseInt(b.width(), 10));
                u = "up" == a.direction || "down" == a.direction;
                a.gap = a.duplicated ? parseInt(a.gap) : 0;
                b.wrapInner('<div class="js-marquee"></div>');
                var l = b.find(".js-marquee").css({
                    "margin-right": a.gap,
                    "float": "left"
                });
                a.duplicated && l.clone(!0).appendTo(b);
                b.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
                c = b.find(".js-marquee-wrapper");
                if (u) {
                    var m = b.height();
                    c.removeAttr("style");
                    b.height(m);
                    b.find(".js-marquee").css({
                        "float": "none",
                        "margin-bottom": a.gap,
                        "margin-right": 0
                    });
                    a.duplicated && b.find(".js-marquee:last").css({
                        "margin-bottom": 0
                    });
                    var q = b.find(".js-marquee:first").height() + a.gap;
                    a.startVisible && !a.duplicated ? (a._completeDuration = (parseInt(q, 10) + parseInt(m, 10)) / parseInt(m, 10) * a.duration, a.duration *= parseInt(q, 10) / parseInt(m, 10)) : a.duration *= (parseInt(q, 10) + parseInt(m, 10)) / parseInt(m, 10)
                } else k = b.find(".js-marquee:first").width() +
                    a.gap, h = b.width(), a.startVisible && !a.duplicated ? (a._completeDuration = (parseInt(k, 10) + parseInt(h, 10)) / parseInt(h, 10) * a.duration, a.duration *= parseInt(k, 10) / parseInt(h, 10)) : a.duration *= (parseInt(k, 10) + parseInt(h, 10)) / parseInt(h, 10);
                a.duplicated && (a.duration /= 2);
                if (a.allowCss3Support) {
                    var l = document.body || document.createElement("div"),
                        g = "marqueeAnimation-" + Math.floor(1E7 * Math.random()),
                        A = ["Webkit", "Moz", "O", "ms", "Khtml"],
                        B = "animation",
                        d = "",
                        r = "";
                    l.style.animation && (r = "@keyframes " + g + " ", n = !0);
                    if (!1 ===
                        n)
                        for (var z = 0; z < A.length; z++)
                            if (void 0 !== l.style[A[z] + "AnimationName"]) {
                                l = "-" + A[z].toLowerCase() + "-";
                                B = l + B;
                                y = l + y;
                                r = "@" + l + "keyframes " + g + " ";
                                n = !0;
                                break
                            } n && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s infinite " + a.css3easing, b.data("css3AnimationIsSupported", !0))
                }
                var C = function () {
                        c.css("margin-top", "up" == a.direction ? m + "px" : "-" + q + "px")
                    },
                    D = function () {
                        c.css("margin-left", "left" == a.direction ? h + "px" : "-" + k + "px")
                    };
                a.duplicated ? (u ? a.startVisible ? c.css("margin-top", 0) : c.css("margin-top", "up" == a.direction ?
                    m + "px" : "-" + (2 * q - a.gap) + "px") : a.startVisible ? c.css("margin-left", 0) : c.css("margin-left", "left" == a.direction ? h + "px" : "-" + (2 * k - a.gap) + "px"), a.startVisible || (e = 1)) : a.startVisible ? e = 2 : u ? C() : D();
                var w = function () {
                    a.duplicated && (1 === e ? (a._originalDuration = a.duration, a.duration = u ? "up" == a.direction ? a.duration + m / (q / a.duration) : 2 * a.duration : "left" == a.direction ? a.duration + h / (k / a.duration) : 2 * a.duration, d && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s " + a.css3easing), e++) : 2 === e && (a.duration = a._originalDuration,
                        d && (g += "0", r = f.trim(r) + "0 ", d = g + " " + a.duration / 1E3 + "s 0s infinite " + a.css3easing), e++));
                    u ? a.duplicated ? (2 < e && c.css("margin-top", "up" == a.direction ? 0 : "-" + q + "px"), t = {
                        "margin-top": "up" == a.direction ? "-" + q + "px" : 0
                    }) : a.startVisible ? 2 === e ? (d && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s " + a.css3easing), t = {
                        "margin-top": "up" == a.direction ? "-" + q + "px" : m + "px"
                    }, e++) : 3 === e && (a.duration = a._completeDuration, d && (g += "0", r = f.trim(r) + "0 ", d = g + " " + a.duration / 1E3 + "s 0s infinite " + a.css3easing), C()) : (C(), t = {
                        "margin-top": "up" ==
                            a.direction ? "-" + c.height() + "px" : m + "px"
                    }) : a.duplicated ? (2 < e && c.css("margin-left", "left" == a.direction ? 0 : "-" + k + "px"), t = {
                        "margin-left": "left" == a.direction ? "-" + k + "px" : 0
                    }) : a.startVisible ? 2 === e ? (d && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s " + a.css3easing), t = {
                        "margin-left": "left" == a.direction ? "-" + k + "px" : h + "px"
                    }, e++) : 3 === e && (a.duration = a._completeDuration, d && (g += "0", r = f.trim(r) + "0 ", d = g + " " + a.duration / 1E3 + "s 0s infinite " + a.css3easing), D()) : (D(), t = {
                        "margin-left": "left" == a.direction ? "-" + k + "px" : h + "px"
                    });
                    b.trigger("beforeStarting");
                    if (n) {
                        c.css(B, d);
                        var l = r + " { 100%  " + F(t) + "}",
                            p = c.find("style");
                        0 !== p.length ? p.filter(":last").html(l) : c.append("<style>" + l + "</style>");
                        E(c[0], "AnimationIteration", function () {
                            b.trigger("finished")
                        });
                        E(c[0], "AnimationEnd", function () {
                            w();
                            b.trigger("finished")
                        })
                    } else c.animate(t, a.duration, a.easing, function () {
                        b.trigger("finished");
                        a.pauseOnCycle ? b.timer = setTimeout(w, a.delayBeforeStart) : w()
                    });
                    b.data("runningStatus", "resumed")
                };
                b.bind("pause", p.pause);
                b.bind("resume",
                    p.resume);
                a.pauseOnHover && b.bind("mouseenter mouseleave", p.toggle);
                n && a.allowCss3Support ? w() : b.timer = setTimeout(w, a.delayBeforeStart)
            }
        })
    };
    f.fn.marquee.defaults = {
        allowCss3Support: !0,
        css3easing: "linear",
        easing: "linear",
        delayBeforeStart: 1E3,
        direction: "left",
        duplicated: !1,
        duration: 5E3,
        gap: 20,
        pauseOnCycle: !1,
        pauseOnHover: !1,
        startVisible: !1
    }
})(jQuery);
var Froogaloop = function () {
    function e(t) {
        return new e.fn.init(t)
    }
    var d = {},
        f = !1,
        c = (Array.prototype.slice, "");

    function o(t, e, n) {
        if (!n.contentWindow.postMessage) return !1;
        var r = n.getAttribute("src").split("?")[0],
            i = JSON.stringify({
                method: t,
                value: e
            });
        n.contentWindow.postMessage(i, r)
    }

    function t(t) {
        var e, n;
        try {
            n = (e = JSON.parse(t.data)).event || e.method
        } catch (t) {}
        if ("ready" != n || f || (f = !0), t.origin != c) return !1;
        var r, i, l = e.value,
            o = e.data,
            u = "" === u ? null : e.player_id,
            a = (r = n, (i = u) ? d[i][r] : d[r]),
            s = [];
        return !!a && (void 0 !== l && s.push(l), o && s.push(o), u && s.push(u), 0 < s.length ? a.apply(null, s) : a.call())
    }

    function u(t, e, n) {
        n ? (d[n] || (d[n] = {}), d[n][t] = e) : d[t] = e
    }

    function a(t) {
        return !!(t && t.constructor && t.call && t.apply)
    }
    return (e.fn = e.prototype = {
        element: null,
        init: function (t) {
            return "string" == typeof t && (t = document.getElementById(t)), this.element = t, c = function (t) {
                for (var e = t.split("https://max-themes.net/"), n = "", r = 0, i = e.length; r < i && r < 3; r++) n += e[r], r < 2 && (n += "https://max-themes.net/");
                return n
            }(this.element.getAttribute("src")), this
        },
        api: function (t, e) {
            if (!this.element || !t) return !1;
            var n = this.element,
                r = "" !== n.id ? n.id : null,
                i = a(e) ? null : e,
                l = a(e) ? e : null;
            return l && u(t, l, r), o(t, i, n), this
        },
        addEvent: function (t, e) {
            if (!this.element) return !1;
            var n = this.element,
                r = "" !== n.id ? n.id : null;
            return u(t, e, r), "ready" != t ? o("addEventListener", t, n) : "ready" == t && f && e.call(null, r), this
        },
        removeEvent: function (t) {
            if (!this.element) return !1;
            var e = this.element,
                n = function (t, e) {
                    if (e && d[e]) {
                        if (!d[e][t]) return !1;
                        d[e][t] = null
                    } else {
                        if (!d[t]) return !1;
                        d[t] = null
                    }
                    return !0
                }(t, "" !== e.id ? e.id : null);
            "ready" != t && n && o("removeEventListener", t, e)
        }
    }).init.prototype = e.fn, window.addEventListener ? window.addEventListener("message", t, !1) : window.attachEvent("onmessage", t, !1), window.Froogaloop = window.$f = e
}();
! function (a) {
    var b = function () {
            var a, b = document.createElement("fakeelement"),
                c = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
            for (a in c)
                if (void 0 !== b.style[a]) return c[a]
        },
        c = function (b, c, d) {
            this.setting = {
                axis: "y",
                reverse: !1,
                trigger: "click",
                speed: 500,
                forceHeight: !1,
                forceWidth: !1,
                autoSize: !0,
                front: ".front",
                back: ".back"
            }, this.setting = a.extend(this.setting, c), "string" != typeof c.axis || "x" !== c.axis.toLowerCase() && "y" !== c.axis.toLowerCase() || (this.setting.axis = c.axis.toLowerCase()), "boolean" == typeof c.reverse && (this.setting.reverse = c.reverse), "string" == typeof c.trigger && (this.setting.trigger = c.trigger.toLowerCase());
            var e = parseInt(c.speed);
            isNaN(e) || (this.setting.speed = e), "boolean" == typeof c.forceHeight && (this.setting.forceHeight = c.forceHeight), "boolean" == typeof c.forceWidth && (this.setting.forceWidth = c.forceWidth), "boolean" == typeof c.autoSize && (this.setting.autoSize = c.autoSize), ("string" == typeof c.front || c.front instanceof a) && (this.setting.front = c.front), ("string" == typeof c.back || c.back instanceof a) && (this.setting.back = c.back), this.element = b, this.frontElement = this.getFrontElement(), this.backElement = this.getBackElement(), this.isFlipped = !1, this.init(d)
        };
    a.extend(c.prototype, {
        flipDone: function (a) {
            var c = this;
            c.element.one(b(), function () {
                c.element.trigger("flip:done"), "function" == typeof a && a.call(c.element)
            })
        },
        flip: function (a) {
            if (!this.isFlipped) {
                this.isFlipped = !0;
                var b = "rotate" + this.setting.axis;
                this.frontElement.css({
                    transform: b + (this.setting.reverse ? "(-180deg)" : "(180deg)"),
                    "z-index": "0"
                }), this.backElement.css({
                    transform: b + "(0deg)",
                    "z-index": "1"
                }), this.flipDone(a)
            }
        },
        unflip: function (a) {
            if (this.isFlipped) {
                this.isFlipped = !1;
                var b = "rotate" + this.setting.axis;
                this.frontElement.css({
                    transform: b + "(0deg)",
                    "z-index": "1"
                }), this.backElement.css({
                    transform: b + (this.setting.reverse ? "(180deg)" : "(-180deg)"),
                    "z-index": "0"
                }), this.flipDone(a)
            }
        },
        getFrontElement: function () {
            return this.setting.front instanceof a ? this.setting.front : this.element.find(this.setting.front)
        },
        getBackElement: function () {
            return this.setting.back instanceof a ? this.setting.back : this.element.find(this.setting.back)
        },
        init: function (a) {
            var b = this,
                c = b.frontElement.add(b.backElement),
                d = "rotate" + b.setting.axis,
                e = 2 * b.element["outer" + ("rotatex" === d ? "Height" : "Width")](),
                f = {
                    perspective: e,
                    position: "relative"
                },
                g = {
                    transform: d + "(" + (b.setting.reverse ? "180deg" : "-180deg") + ")",
                    "z-index": "0",
                    position: "relative"
                },
                h = {
                    "backface-visibility": "hidden",
                    "transform-style": "preserve-3d",
                    position: "absolute",
                    "z-index": "1"
                };
            b.setting.forceHeight ? c.outerHeight(b.element.height()) : b.setting.autoSize && (h.height = "100%"), b.setting.forceWidth ? c.outerWidth(b.element.width()) : b.setting.autoSize && (h.width = "100%"), (window.chrome || window.Intl && Intl.v8BreakIterator) && "CSS" in window && (f["-webkit-transform-style"] = "preserve-3d"), c.css(h).find("*").css({
                "backface-visibility": "hidden"
            }), b.element.css(f), b.backElement.css(g), setTimeout(function () {
                var d = b.setting.speed / 1e3 || .5;
                c.css({
                    transition: "all " + d + "s ease-out"
                }), "function" == typeof a && a.call(b.element)
            }, 20), b.attachEvents()
        },
        clickHandler: function (b) {
            b || (b = window.event), this.element.find(a(b.target).closest('button, a, input[type="submit"]')).length || (this.isFlipped ? this.unflip() : this.flip())
        },
        hoverHandler: function () {
            var b = this;
            b.element.off("mouseleave.flip"), b.flip(), setTimeout(function () {
                b.element.on("mouseleave.flip", a.proxy(b.unflip, b)), b.element.is(":hover") || b.unflip()
            }, b.setting.speed + 150)
        },
        attachEvents: function () {
            var b = this;
            "click" === b.setting.trigger ? b.element.on(a.fn.tap ? "tap.flip" : "click.flip", a.proxy(b.clickHandler, b)) : "hover" === b.setting.trigger && (b.element.on("mouseenter.flip", a.proxy(b.hoverHandler, b)), b.element.on("mouseleave.flip", a.proxy(b.unflip, b)))
        },
        flipChanged: function (a) {
            this.element.trigger("flip:change"), "function" == typeof a && a.call(this.element)
        },
        changeSettings: function (a, b) {
            var c = this,
                d = !1;
            if (void 0 !== a.axis && c.setting.axis !== a.axis.toLowerCase() && (c.setting.axis = a.axis.toLowerCase(), d = !0), void 0 !== a.reverse && c.setting.reverse !== a.reverse && (c.setting.reverse = a.reverse, d = !0), d) {
                var e = c.frontElement.add(c.backElement),
                    f = e.css(["transition-property", "transition-timing-function", "transition-duration", "transition-delay"]);
                e.css({
                    transition: "none"
                });
                var g = "rotate" + c.setting.axis;
                c.isFlipped ? c.frontElement.css({
                    transform: g + (c.setting.reverse ? "(-180deg)" : "(180deg)"),
                    "z-index": "0"
                }) : c.backElement.css({
                    transform: g + (c.setting.reverse ? "(180deg)" : "(-180deg)"),
                    "z-index": "0"
                }), setTimeout(function () {
                    e.css(f), c.flipChanged(b)
                }, 0)
            } else c.flipChanged(b)
        }
    }), a.fn.flip = function (b, d) {
        return "function" == typeof b && (d = b), "string" == typeof b || "boolean" == typeof b ? this.each(function () {
            var c = a(this).data("flip-model");
            "toggle" === b && (b = !c.isFlipped), b ? c.flip(d) : c.unflip(d)
        }) : this.each(function () {
            if (a(this).data("flip-model")) {
                var e = a(this).data("flip-model");
                !b || void 0 === b.axis && void 0 === b.reverse || e.changeSettings(b, d)
            } else a(this).data("flip-model", new c(a(this), b || {}, d))
        }), this
    }
}(jQuery);
! function (a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function (a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function (a) {
    var b = function (a, b) {
            var c, d = document.createElement("canvas");
            a.appendChild(d), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
            var e = d.getContext("2d");
            d.width = d.height = b.size;
            var f = 1;
            window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
            var g = (b.size - b.lineWidth) / 2;
            b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function () {
                return +new Date
            };
            var h = function (a, b, c) {
                    c = Math.min(Math.max(-1, c || 0), 1);
                    var d = 0 >= c ? !0 : !1;
                    e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
                },
                i = function () {
                    var a, c;
                    e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
                    for (var d = 24; d > 0; --d) d % 6 === 0 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
                    e.restore()
                },
                j = function () {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (a) {
                        window.setTimeout(a, 1e3 / 60)
                    }
                }(),
                k = function () {
                    b.scaleColor && i(), b.trackColor && h(b.trackColor, b.trackWidth || b.lineWidth, 1)
                };
            this.getCanvas = function () {
                return d
            }, this.getCtx = function () {
                return e
            }, this.clear = function () {
                e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
            }, this.draw = function (a) {
                b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
                var d;
                d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
            }.bind(this), this.animate = function (a, c) {
                var d = Date.now();
                b.onStart(a, c);
                var e = function () {
                    var f = Math.min(Date.now() - d, b.animate.duration),
                        g = b.easing(this, f, a, c - a, b.animate.duration);
                    this.draw(g), b.onStep(a, c, g), f >= b.animate.duration ? b.onStop(a, c) : j(e)
                }.bind(this);
                j(e)
            }.bind(this)
        },
        c = function (a, c) {
            var d = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                trackWidth: void 0,
                size: 110,
                rotate: 0,
                animate: {
                    duration: 1e3,
                    enabled: !0
                },
                easing: function (a, b, c, d, e) {
                    return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
                },
                onStart: function (a, b) {},
                onStep: function (a, b, c) {},
                onStop: function (a, b) {}
            };
            if ("undefined" != typeof b) d.renderer = b;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                d.renderer = SVGRenderer
            }
            var e = {},
                f = 0,
                g = function () {
                    this.el = a, this.options = e;
                    for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
                    "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? e.easing = jQuery.easing[e.easing] : e.easing = d.easing, "number" == typeof e.animate && (e.animate = {
                        duration: e.animate,
                        enabled: !0
                    }), "boolean" != typeof e.animate || e.animate || (e.animate = {
                        duration: 1e3,
                        enabled: e.animate
                    }), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
                }.bind(this);
            this.update = function (a) {
                return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
            }.bind(this), this.disableAnimation = function () {
                return e.animate.enabled = !1, this
            }, this.enableAnimation = function () {
                return e.animate.enabled = !0, this
            }, g()
        };
    a.fn.easyPieChart = function (b) {
        return this.each(function () {
            var d;
            a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
        })
    }
});
! function (T) {
    var a = !0;
    T.goodlayers_flexslider = function (p, e) {
        var m = T(p);
        m.vars = T.extend({}, T.goodlayers_flexslider.defaults, e);
        var t, v = m.vars.namespace,
            f = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            g = ("ontouchstart" in window || f || window.DocumentTouch && document instanceof DocumentTouch) && m.vars.touch,
            r = "click touchend MSPointerUp keyup",
            o = "",
            h = "vertical" === m.vars.direction,
            y = m.vars.reverse,
            S = 0 < m.vars.itemWidth,
            x = "fade" === m.vars.animation,
            w = "" !== m.vars.asNavFor,
            b = {};
        T.data(p, "goodlayers_flexslider", m), b = {
            init: function () {
                m.animating = !1, m.currentSlide = parseInt(m.vars.startAt ? m.vars.startAt : 0, 10), isNaN(m.currentSlide) && (m.currentSlide = 0), m.animatingTo = m.currentSlide, m.atEnd = 0 === m.currentSlide || m.currentSlide === m.last, m.containerSelector = m.vars.selector.substr(0, m.vars.selector.search(" ")), m.slides = T(m.vars.selector, m), m.container = T(m.containerSelector, m), m.count = m.slides.length, m.syncExists = 0 < T(m.vars.sync).length, "slide" === m.vars.animation && (m.vars.animation = "swing"), m.prop = h ? "top" : "marginLeft", m.args = {}, m.manualPause = !1, m.stopped = !1, m.started = !1, m.startTimeout = null, m.transitions = !m.vars.video && !x && m.vars.useCSS && function () {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var a in t)
                        if (void 0 !== e.style[t[a]]) return m.pfx = t[a].replace("Perspective", "").toLowerCase(), m.prop = "-" + m.pfx + "-transform", !0;
                    return !1
                }(), (m.ensureAnimationEnd = "") !== m.vars.controlsContainer && (m.controlsContainer = 0 < T(m.vars.controlsContainer).length && T(m.vars.controlsContainer)), "" !== m.vars.manualControls && (m.manualControls = 0 < T(m.vars.manualControls).length && T(m.vars.manualControls)), "" !== m.vars.customDirectionNav && (m.customDirectionNav = 2 === T(m.vars.customDirectionNav).length && T(m.vars.customDirectionNav)), m.vars.randomize && (m.slides.sort(function () {
                    return Math.round(Math.random()) - .5
                }), m.container.empty().append(m.slides)), m.doMath(), m.setup("init"), m.vars.controlNav && b.controlNav.setup(), m.vars.directionNav && b.directionNav.setup(), m.vars.keyboard && (1 === T(m.containerSelector).length || m.vars.multipleKeyboard) && T(document).bind("keyup", function (e) {
                    var t = e.keyCode;
                    if (!m.animating && (39 === t || 37 === t)) {
                        var a = 39 === t ? m.getTarget("next") : 37 === t && m.getTarget("prev");
                        m.flexAnimate(a, m.vars.pauseOnAction)
                    }
                }), m.vars.mousewheel && m.bind("mousewheel", function (e, t, a, n) {
                    e.preventDefault();
                    var i = t < 0 ? m.getTarget("next") : m.getTarget("prev");
                    m.flexAnimate(i, m.vars.pauseOnAction)
                }), m.vars.pausePlay && b.pausePlay.setup(), m.vars.slideshow && m.vars.pauseInvisible && b.pauseInvisible.init(), m.vars.slideshow && (m.vars.pauseOnHover && m.hover(function () {
                    m.manualPlay || m.manualPause || m.pause()
                }, function () {
                    m.manualPause || m.manualPlay || m.stopped || m.play()
                }), m.vars.pauseInvisible && b.pauseInvisible.isHidden() || (0 < m.vars.initDelay ? m.startTimeout = setTimeout(m.play, m.vars.initDelay) : m.play())), w && b.asNav.setup(), g && m.vars.touch && b.touch(), (!x || x && m.vars.smoothHeight) && T(window).bind("resize orientationchange focus gdlr-core-element-resize", b.resize), m.find("img").attr("draggable", "false"), setTimeout(function () {
                    m.vars.start(m)
                }, 200)
            },
            asNav: {
                setup: function () {
                    m.asNav = !0, m.animatingTo = Math.floor(m.currentSlide / m.move), m.currentItem = m.currentSlide, m.slides.removeClass(v + "active-slide").eq(m.currentItem).addClass(v + "active-slide"), f ? (p._slider = m).slides.each(function () {
                        var e = this;
                        e._gesture = new MSGesture, (e._gesture.target = e).addEventListener("MSPointerDown", function (e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), e.addEventListener("MSGestureTap", function (e) {
                            e.preventDefault();
                            var t = T(this),
                                a = t.index();
                            T(m.vars.asNavFor).data("goodlayers_flexslider").animating || t.hasClass("active") || (m.direction = m.currentItem < a ? "next" : "prev", m.flexAnimate(a, m.vars.pauseOnAction, !1, !0, !0))
                        })
                    }) : m.slides.on(r, function (e) {
                        e.preventDefault();
                        var t = T(this),
                            a = t.index();
                        t.offset().left - T(m).scrollLeft() <= 0 && t.hasClass(v + "active-slide") ? m.flexAnimate(m.getTarget("prev"), !0) : T(m.vars.asNavFor).data("goodlayers_flexslider").animating || t.hasClass(v + "active-slide") || (m.direction = m.currentItem < a ? "next" : "prev", m.flexAnimate(a, m.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function () {
                    m.manualControls ? b.controlNav.setupManual() : b.controlNav.setupPaging()
                },
                setupPaging: function () {
                    var e, t, a = "thumbnails" === m.vars.controlNav ? "control-thumbs" : "control-paging",
                        n = 1;
                    if (m.controlNavScaffold = T('<ol class="' + v + "control-nav " + v + a + '"></ol>'), 1 < m.pagingCount)
                        for (var i = 0; i < m.pagingCount; i++) {
                            if (void 0 === (t = m.slides.eq(i)).attr("data-thumb-alt") && t.attr("data-thumb-alt", ""), altText = "" !== t.attr("data-thumb-alt") ? altText = ' alt="' + t.attr("data-thumb-alt") + '"' : "", e = "thumbnails" === m.vars.controlNav ? '<img src="' + t.attr("data-thumb") + '"' + altText + "/>" : '<a href="#">' + n + "</a>", "thumbnails" === m.vars.controlNav && !0 === m.vars.thumbCaptions) {
                                var s = t.attr("data-thumbcaption");
                                "" !== s && void 0 !== s && (e += '<span class="' + v + 'caption">' + s + "</span>")
                            }
                            m.controlNavScaffold.append("<li>" + e + "</li>"), n++
                        }
                    m.controlsContainer ? T(m.controlsContainer).append(m.controlNavScaffold) : m.append(m.controlNavScaffold), b.controlNav.set(), b.controlNav.active(), m.controlNavScaffold.delegate("a, img", r, function (e) {
                        if (e.preventDefault(), "" === o || o === e.type) {
                            var t = T(this),
                                a = m.controlNav.index(t);
                            t.hasClass(v + "active") || (m.direction = a > m.currentSlide ? "next" : "prev", m.flexAnimate(a, m.vars.pauseOnAction))
                        }
                        "" === o && (o = e.type), b.setToClearWatchedEvent()
                    })
                },
                setupManual: function () {
                    m.controlNav = m.manualControls, b.controlNav.active(), m.controlNav.bind(r, function (e) {
                        if (e.preventDefault(), "" === o || o === e.type) {
                            var t = T(this),
                                a = m.controlNav.index(t);
                            t.hasClass(v + "active") || (a > m.currentSlide ? m.direction = "next" : m.direction = "prev", m.flexAnimate(a, m.vars.pauseOnAction))
                        }
                        "" === o && (o = e.type), b.setToClearWatchedEvent()
                    })
                },
                set: function () {
                    var e = "thumbnails" === m.vars.controlNav ? "img" : "a";
                    m.controlNav = T("." + v + "control-nav li " + e, m.controlsContainer ? m.controlsContainer : m)
                },
                active: function () {
                    m.controlNav.removeClass(v + "active").eq(m.animatingTo).addClass(v + "active")
                },
                update: function (e, t) {
                    1 < m.pagingCount && "add" === e ? m.controlNavScaffold.append(T('<li><a href="#">' + m.count + "</a></li>")) : 1 === m.pagingCount ? m.controlNavScaffold.find("li").remove() : m.controlNav.eq(t).closest("li").remove(), b.controlNav.set(), 1 < m.pagingCount && m.pagingCount !== m.controlNav.length ? m.update(t, e) : b.controlNav.active()
                }
            },
            directionNav: {
                setup: function () {
                    var e = T('<ul class="' + v + 'direction-nav"><li class="' + v + 'nav-prev"><a class="' + v + 'prev" href="#">' + m.vars.prevText + '</a></li><li class="' + v + 'nav-next"><a class="' + v + 'next" href="#">' + m.vars.nextText + "</a></li></ul>");
                    m.customDirectionNav ? m.directionNav = m.customDirectionNav : m.controlsContainer ? (T(m.controlsContainer).append(e), m.directionNav = T("." + v + "direction-nav li a", m.controlsContainer)) : (m.append(e), m.directionNav = T("." + v + "direction-nav li a", m)), b.directionNav.update(), m.directionNav.bind(r, function (e) {
                        var t;
                        e.preventDefault(), "" !== o && o !== e.type || (t = T(this).hasClass(v + "next") ? m.getTarget("next") : m.getTarget("prev"), m.flexAnimate(t, m.vars.pauseOnAction)), "" === o && (o = e.type), b.setToClearWatchedEvent()
                    })
                },
                update: function () {
                    var e = v + "disabled";
                    1 === m.pagingCount ? m.directionNav.addClass(e).attr("tabindex", "-1") : m.vars.animationLoop ? m.directionNav.removeClass(e).removeAttr("tabindex") : 0 === m.animatingTo ? m.directionNav.removeClass(e).filter("." + v + "prev").addClass(e).attr("tabindex", "-1") : m.animatingTo === m.last ? m.directionNav.removeClass(e).filter("." + v + "next").addClass(e).attr("tabindex", "-1") : m.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function () {
                    var e = T('<div class="' + v + 'pauseplay"><a href="#"></a></div>');
                    m.controlsContainer ? (m.controlsContainer.append(e), m.pausePlay = T("." + v + "pauseplay a", m.controlsContainer)) : (m.append(e), m.pausePlay = T("." + v + "pauseplay a", m)), b.pausePlay.update(m.vars.slideshow ? v + "pause" : v + "play"), m.pausePlay.bind(r, function (e) {
                        e.preventDefault(), "" !== o && o !== e.type || (T(this).hasClass(v + "pause") ? (m.manualPause = !0, m.manualPlay = !1, m.pause()) : (m.manualPause = !1, m.manualPlay = !0, m.play())), "" === o && (o = e.type), b.setToClearWatchedEvent()
                    })
                },
                update: function (e) {
                    "play" === e ? m.pausePlay.removeClass(v + "pause").addClass(v + "play").html(m.vars.playText) : m.pausePlay.removeClass(v + "play").addClass(v + "pause").html(m.vars.pauseText)
                }
            },
            touch: function () {
                var i, s, r, o, l, d, e, n, c, u = !1,
                    t = 0,
                    a = 0,
                    v = 0;
                if (f) {
                    p.style.msTouchAction = "none", p._gesture = new MSGesture, (p._gesture.target = p).addEventListener("MSPointerDown", function (e) {
                        e.stopPropagation(), m.animating ? e.preventDefault() : (m.pause(), p._gesture.addPointer(e.pointerId), v = 0, o = h ? m.h : m.w, d = Number(new Date), r = S && y && m.animatingTo === m.last ? 0 : S && y ? m.limit - (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo : S && m.currentSlide === m.last ? m.limit : S ? (m.itemW + m.vars.itemMargin) * m.move * m.currentSlide : y ? (m.last - m.currentSlide + m.cloneOffset) * o : (m.currentSlide + m.cloneOffset) * o)
                    }, !1), p._slider = m, p.addEventListener("MSGestureChange", function (e) {
                        e.stopPropagation();
                        var t = e.target._slider;
                        if (!t) return;
                        var a = -e.translationX,
                            n = -e.translationY;
                        if (l = v += h ? n : a, u = h ? Math.abs(v) < Math.abs(-a) : Math.abs(v) < Math.abs(-n), e.detail === e.MSGESTURE_FLAG_INERTIA) return void setImmediate(function () {
                            p._gesture.stop()
                        });
                        (!u || 500 < Number(new Date) - d) && (e.preventDefault(), !x && t.transitions && (t.vars.animationLoop || (l = v / (0 === t.currentSlide && v < 0 || t.currentSlide === t.last && 0 < v ? Math.abs(v) / o + 2 : 1)), t.setProps(r + l, "setTouch")))
                    }, !1), p.addEventListener("MSGestureEnd", function (e) {
                        e.stopPropagation();
                        var t = e.target._slider;
                        if (!t) return;
                        if (t.animatingTo === t.currentSlide && !u && null !== l) {
                            var a = y ? -l : l,
                                n = 0 < a ? t.getTarget("next") : t.getTarget("prev");
                            t.canAdvance(n) && (Number(new Date) - d < 550 && 50 < Math.abs(a) || Math.abs(a) > o / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : x || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                        }
                        r = l = s = i = null, v = 0
                    }, !1)
                } else e = function (e) {
                    m.animating ? e.preventDefault() : !window.navigator.msPointerEnabled && 1 !== e.touches.length || (m.pause(), o = h ? m.h : m.w, d = Number(new Date), t = e.touches[0].pageX, a = e.touches[0].pageY, r = S && y && m.animatingTo === m.last ? 0 : S && y ? m.limit - (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo : S && m.currentSlide === m.last ? m.limit : S ? (m.itemW + m.vars.itemMargin) * m.move * m.currentSlide : y ? (m.last - m.currentSlide + m.cloneOffset) * o : (m.currentSlide + m.cloneOffset) * o, i = h ? a : t, s = h ? t : a, p.addEventListener("touchmove", n, !1), p.addEventListener("touchend", c, !1))
                }, n = function (e) {
                    t = e.touches[0].pageX, a = e.touches[0].pageY, l = h ? i - a : i - t;
                    (!(u = h ? Math.abs(l) < Math.abs(t - s) : Math.abs(l) < Math.abs(a - s)) || 500 < Number(new Date) - d) && (e.preventDefault(), !x && m.transitions && (m.vars.animationLoop || (l /= 0 === m.currentSlide && l < 0 || m.currentSlide === m.last && 0 < l ? Math.abs(l) / o + 2 : 1), m.setProps(r + l, "setTouch")))
                }, c = function (e) {
                    if (p.removeEventListener("touchmove", n, !1), m.animatingTo === m.currentSlide && !u && null !== l) {
                        var t = y ? -l : l,
                            a = 0 < t ? m.getTarget("next") : m.getTarget("prev");
                        m.canAdvance(a) && (Number(new Date) - d < 550 && 50 < Math.abs(t) || Math.abs(t) > o / 2) ? m.flexAnimate(a, m.vars.pauseOnAction) : x || m.flexAnimate(m.currentSlide, m.vars.pauseOnAction, !0)
                    }
                    p.removeEventListener("touchend", c, !1), r = l = s = i = null
                }, p.addEventListener("touchstart", e, !1)
            },
            resize: function () {
                !m.animating && m.is(":visible") && (S || m.doMath(), x ? b.smoothHeight() : S ? (m.slides.width(m.computedW), m.update(m.pagingCount), m.setProps()) : h ? (m.viewport.height(m.h), m.setProps(m.h, "setTotal")) : (m.vars.smoothHeight && b.smoothHeight(), m.newSlides.width(m.computedW), m.setProps(m.computedW, "setTotal")))
            },
            smoothHeight: function (e) {
                if (!h || x) {
                    var t = x ? m : m.viewport;
                    e ? t.animate({
                        height: m.slides.eq(m.animatingTo).height()
                    }, e) : t.height(m.slides.eq(m.animatingTo).height())
                }
            },
            sync: function (e) {
                var t = T(m.vars.sync).data("goodlayers_flexslider"),
                    a = m.animatingTo;
                switch (e) {
                    case "animate":
                        t.flexAnimate(a, m.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        t.playing || t.asNav || t.play();
                        break;
                    case "pause":
                        t.pause()
                }
            },
            uniqueID: function (e) {
                return e.filter("[id]").add(e.find("[id]")).each(function () {
                    var e = T(this);
                    e.attr("id", e.attr("id") + "_clone")
                }), e
            },
            pauseInvisible: {
                visProp: null,
                init: function () {
                    var e = b.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function () {
                            b.pauseInvisible.isHidden() ? m.startTimeout ? clearTimeout(m.startTimeout) : m.pause() : m.started ? m.play() : 0 < m.vars.initDelay ? setTimeout(m.play, m.vars.initDelay) : m.play()
                        })
                    }
                },
                isHidden: function () {
                    var e = b.pauseInvisible.getHiddenProp();
                    return !!e && document[e]
                },
                getHiddenProp: function () {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function () {
                clearTimeout(t), t = setTimeout(function () {
                    o = ""
                }, 3e3)
            }
        }, m.flexAnimate = function (e, t, a, n, s) {
            if (m.vars.animationLoop || e === m.currentSlide || (m.direction = e > m.currentSlide ? "next" : "prev"), w && 1 === m.pagingCount && (m.direction = m.currentItem < e ? "next" : "prev"), !m.animating && (m.canAdvance(e, s) || a) && m.is(":visible")) {
                if (w && n) {
                    var r = T(m.vars.asNavFor).data("goodlayers_flexslider");
                    if (m.atEnd = 0 === e || e === m.count - 1, r.flexAnimate(e, !0, !1, !0, s), m.direction = m.currentItem < e ? "next" : "prev", r.direction = m.direction, Math.ceil((e + 1) / m.visible) - 1 === m.currentSlide || 0 === e) return m.currentItem = e, m.slides.removeClass(v + "active-slide").eq(e).addClass(v + "active-slide"), !1;
                    m.currentItem = e, m.slides.removeClass(v + "active-slide").eq(e).addClass(v + "active-slide"), e = Math.floor(e / m.visible)
                }
                if (m.animating = !0, m.animatingTo = e, t && m.pause(), m.vars.before(m), m.syncExists && !s && b.sync("animate"), m.vars.controlNav && b.controlNav.active(), S) {
                    var o = e * m.move;
                    m.slides.length - o < m.move && (o = m.slides.length - m.move), m.slides.removeClass(v + "active-slide").eq(o).each(function () {
                        var e = T(this),
                            t = m.showItems;
                        for (i = 1; i <= t; i++) e.addClass(v + "active-slide"), e = e.next()
                    })
                } else m.slides.removeClass(v + "active-slide").eq(e).addClass(v + "active-slide");
                if (m.atEnd = 0 === e || e === m.last, m.vars.directionNav && b.directionNav.update(), e === m.last && (m.vars.end(m), m.vars.animationLoop || m.pause()), x) g ? (m.slides.eq(m.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), m.slides.eq(e).css({
                    opacity: 1,
                    zIndex: 2
                }), m.wrapup(u)) : (m.slides.eq(m.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, m.vars.animationSpeed, m.vars.easing), m.slides.eq(e).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, m.vars.animationSpeed, m.vars.easing, m.wrapup));
                else {
                    var l, d, c, u = h ? m.slides.filter(":first").height() : m.computedW;
                    d = S ? (l = m.vars.itemMargin, (c = (m.itemW + l) * m.move * m.animatingTo) > m.limit && 1 !== m.visible ? m.limit : c) : 0 === m.currentSlide && e === m.count - 1 && m.vars.animationLoop && "next" !== m.direction ? y ? (m.count + m.cloneOffset) * u : 0 : m.currentSlide === m.last && 0 === e && m.vars.animationLoop && "prev" !== m.direction ? y ? 0 : (m.count + 1) * u : y ? (m.count - 1 - e + m.cloneOffset) * u : (e + m.cloneOffset) * u, m.setProps(d, "", m.vars.animationSpeed), m.transitions ? (m.vars.animationLoop && m.atEnd || (m.animating = !1, m.currentSlide = m.animatingTo), m.container.unbind("webkitTransitionEnd transitionend"), m.container.bind("webkitTransitionEnd transitionend", function () {
                        clearTimeout(m.ensureAnimationEnd), m.wrapup(u)
                    }), clearTimeout(m.ensureAnimationEnd), m.ensureAnimationEnd = setTimeout(function () {
                        m.wrapup(u)
                    }, m.vars.animationSpeed + 100)) : m.container.animate(m.args, m.vars.animationSpeed, m.vars.easing, function () {
                        m.wrapup(u)
                    })
                }
                m.vars.smoothHeight && b.smoothHeight(m.vars.animationSpeed)
            }
        }, m.wrapup = function (e) {
            x || S || (0 === m.currentSlide && m.animatingTo === m.last && m.vars.animationLoop ? m.setProps(e, "jumpEnd") : m.currentSlide === m.last && 0 === m.animatingTo && m.vars.animationLoop && m.setProps(e, "jumpStart")), m.animating = !1, m.currentSlide = m.animatingTo, m.vars.after(m)
        }, m.animateSlides = function () {
            !m.animating && a && m.flexAnimate(m.getTarget("next"))
        }, m.pause = function () {
            clearInterval(m.animatedSlides), m.animatedSlides = null, m.playing = !1, m.vars.pausePlay && b.pausePlay.update("play"), m.syncExists && b.sync("pause")
        }, m.play = function () {
            m.playing && clearInterval(m.animatedSlides), m.animatedSlides = m.animatedSlides || setInterval(m.animateSlides, m.vars.slideshowSpeed), m.started = m.playing = !0, m.vars.pausePlay && b.pausePlay.update("pause"), m.syncExists && b.sync("play")
        }, m.stop = function () {
            m.pause(), m.stopped = !0
        }, m.canAdvance = function (e, t) {
            var a = w ? m.pagingCount - 1 : m.last;
            return !!t || (w && m.currentItem === m.count - 1 && 0 === e && "prev" === m.direction || (!w || 0 !== m.currentItem || e !== m.pagingCount - 1 || "next" === m.direction) && ((e !== m.currentSlide || w) && (!!m.vars.animationLoop || (!m.atEnd || 0 !== m.currentSlide || e !== a || "next" === m.direction) && (!m.atEnd || m.currentSlide !== a || 0 !== e || "next" !== m.direction))))
        }, m.getTarget = function (e) {
            return "next" === (m.direction = e) ? m.currentSlide === m.last ? 0 : m.currentSlide + 1 : 0 === m.currentSlide ? m.last : m.currentSlide - 1
        }, m.setProps = function (e, t, a) {
            var n, i = (n = e || (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo, -1 * function () {
                if (S) return "setTouch" === t ? e : y && m.animatingTo === m.last ? 0 : y ? m.limit - (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo : m.animatingTo === m.last ? m.limit : n;
                switch (t) {
                    case "setTotal":
                        return y ? (m.count - 1 - m.currentSlide + m.cloneOffset) * e : (m.currentSlide + m.cloneOffset) * e;
                    case "setTouch":
                        return e;
                    case "jumpEnd":
                        return y ? e : m.count * e;
                    case "jumpStart":
                        return y ? m.count * e : e;
                    default:
                        return e
                }
            }() + "px");
            m.transitions && (i = h ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", m.container.css("-" + m.pfx + "-transition-duration", a), m.container.css("transition-duration", a)), m.args[m.prop] = i, !m.transitions && void 0 !== a || m.container.css(m.args), m.container.css("transform", i)
        }, m.setup = function (e) {
            var t, a;
            x ? (m.slides.css({
                width: "100%",
                float: "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === e && (g ? m.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + m.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(m.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : 0 == m.vars.fadeFirstSlide ? m.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(m.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : m.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(m.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, m.vars.animationSpeed, m.vars.easing)), m.vars.smoothHeight && b.smoothHeight()) : ("init" === e && (m.viewport = T('<div class="' + v + 'viewport"></div>').css({
                overflow: "hidden",
                position: "relative"
            }).appendTo(m).append(m.container), m.cloneCount = 0, m.cloneOffset = 0, y && (a = T.makeArray(m.slides).reverse(), m.slides = T(a), m.container.empty().append(m.slides))), m.vars.animationLoop && !S && (m.cloneCount = 2, m.cloneOffset = 1, "init" !== e && m.container.find(".clone").remove(), m.container.append(b.uniqueID(m.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(b.uniqueID(m.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), m.newSlides = T(m.vars.selector, m), t = y ? m.count - 1 - m.currentSlide + m.cloneOffset : m.currentSlide + m.cloneOffset, h && !S ? (m.container.height(200 * (m.count + m.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                m.newSlides.css({
                    display: "block"
                }), m.doMath(), m.viewport.height(m.h), m.setProps(t * m.h, "init")
            }, "init" === e ? 100 : 0)) : (m.container.width(200 * (m.count + m.cloneCount) + "%"), m.setProps(t * m.computedW, "init"), setTimeout(function () {
                m.doMath(), m.newSlides.css({
                    width: m.computedW,
                    marginRight: m.computedM,
                    float: "left",
                    display: "block"
                }), m.vars.smoothHeight && b.smoothHeight()
            }, "init" === e ? 100 : 0)));
            S ? (m.slides.addClass(v + "with-active-class"), m.slides.removeClass(v + "active-slide").eq(m.currentSlide).each(function () {
                var e = T(this),
                    t = m.showItems;
                for (i = 1; i <= t; i++) e.addClass(v + "active-slide"), e = e.next()
            })) : m.slides.removeClass(v + "active-slide").eq(m.currentSlide).addClass(v + "active-slide"), m.vars.init(m)
        }, m.doMath = function () {
            var e = m.slides.first(),
                t = m.vars.itemMargin,
                a = m.vars.minItems,
                n = m.vars.maxItems;
            "function" == typeof window.matchMedia ? (window.matchMedia("(max-width: 767px)").matches && (n = a = 1), window.matchMedia("(max-width: 419px)").matches && (n = a = 1)) : (T(window).innerWidth() < 767 && (n = a = 1), T(window).innerWidth() < 419 && (n = a = 1)), m.w = void 0 === m.viewport ? m.width() : m.viewport.width(), m.h = e.height(), m.boxPadding = e.outerWidth() - e.width(), S ? (m.showItems = a, m.itemT = m.vars.itemWidth + t, m.itemM = t, m.minW = a ? a * m.itemT : m.w, m.maxW = n ? n * m.itemT - t : m.w, m.itemW = m.minW > m.w ? (m.w - t * (a - 1)) / a : m.maxW < m.w ? (m.w - t * (n - 1)) / n : m.vars.itemWidth > m.w ? m.w : m.vars.itemWidth, m.visible = Math.floor((m.w + m.itemM) / (m.itemW + m.itemM)), m.move = 0 < m.vars.move && m.vars.move < m.visible ? m.vars.move : m.visible, m.pagingCount = Math.ceil((m.count - m.visible) / m.move + 1), m.last = m.pagingCount - 1, m.limit = 1 === m.pagingCount ? 0 : m.vars.itemWidth > m.w ? m.itemW * (m.count - 1) + t * (m.count - 1) : (m.itemW + t) * m.count - m.w - t) : (m.itemW = m.w, m.itemM = t, m.pagingCount = m.count, m.last = m.count - 1), m.computedW = m.itemW - m.boxPadding, m.computedM = m.itemM
        }, m.update = function (e, t) {
            m.doMath(), S || (e < m.currentSlide ? m.currentSlide += 1 : e <= m.currentSlide && 0 !== e && --m.currentSlide, m.animatingTo = m.currentSlide), m.vars.controlNav && !m.manualControls && ("add" === t && !S || m.pagingCount > m.controlNav.length ? b.controlNav.update("add") : ("remove" === t && !S || m.pagingCount < m.controlNav.length) && (S && m.currentSlide > m.last && (--m.currentSlide, --m.animatingTo), b.controlNav.update("remove", m.last))), m.vars.directionNav && b.directionNav.update()
        }, m.addSlide = function (e, t) {
            var a = T(e);
            m.count += 1, m.last = m.count - 1, h && y ? void 0 !== t ? m.slides.eq(m.count - t).after(a) : m.container.prepend(a) : void 0 !== t ? m.slides.eq(t).before(a) : m.container.append(a), m.update(t, "add"), m.slides = T(m.vars.selector + ":not(.clone)", m), m.setup(), m.vars.added(m)
        }, m.removeSlide = function (e) {
            var t = isNaN(e) ? m.slides.index(T(e)) : e;
            --m.count, m.last = m.count - 1, isNaN(e) ? T(e, m.slides).remove() : h && y ? m.slides.eq(m.last).remove() : m.slides.eq(e).remove(), m.doMath(), m.update(t, "remove"), m.slides = T(m.vars.selector + ":not(.clone)", m), m.setup(), m.vars.removed(m)
        }, m.editItemWidth = function (e) {
            m.vars.itemWidth = e, b.resize()
        }, b.init()
    }, T(window).blur(function (e) {
        a = !1
    }).focus(function (e) {
        a = !0
    }), T.goodlayers_flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function () {},
        before: function () {},
        after: function () {},
        end: function () {},
        added: function () {},
        removed: function () {},
        init: function () {}
    }, T.fn.goodlayers_flexslider = function (n) {
        if (void 0 === n && (n = {}), "object" == typeof n) return this.each(function () {
            var e = T(this),
                t = n.selector ? n.selector : ".slides > li",
                a = e.find(t);
            1 === a.length && !0 === n.allowOneSlide || 0 === a.length ? (a.fadeIn(400), n.start && n.start(e)) : void 0 === e.data("goodlayers_flexslider") && new T.goodlayers_flexslider(this, n)
        });
        var e = T(this).data("goodlayers_flexslider");
        switch (n) {
            case "play":
                e.play();
                break;
            case "pause":
                e.pause();
                break;
            case "stop":
                e.stop();
                break;
            case "next":
                e.flexAnimate(e.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                e.flexAnimate(e.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof n && e.flexAnimate(n, !0)
        }
    }
}(jQuery);
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).lightGallery = e()
}(this, (function () {
    "use strict";
    var t = function () {
        return (t = Object.assign || function (t) {
            for (var e, i = 1, s = arguments.length; i < s; i++)
                for (var n in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t
        }).apply(this, arguments)
    };
    var e = "lgAfterAppendSlide",
        i = "lgInit",
        s = "lgHasVideo",
        n = "lgContainerResize",
        o = "lgUpdateSlides",
        r = "lgAfterAppendSubHtml",
        l = "lgBeforeOpen",
        a = "lgAfterOpen",
        g = "lgSlideItemLoad",
        d = "lgBeforeSlide",
        h = "lgAfterSlide",
        u = "lgPosterClick",
        c = "lgDragStart",
        m = "lgDragMove",
        p = "lgDragEnd",
        f = "lgBeforeNextSlide",
        v = "lgBeforePrevSlide",
        y = "lgBeforeClose",
        b = "lgAfterClose",
        I = {
            mode: "lg-slide",
            easing: "ease",
            speed: 400,
            licenseKey: "0000-0000-000-0000",
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 300,
            container: "",
            startAnimationDuration: 400,
            zoomFromOrigin: !0,
            hideBarsDelay: 0,
            showBarsAfter: 1e4,
            slideDelay: 0,
            supportLegacyBrowser: !0,
            allowMediaOverlap: !1,
            videoMaxSize: "1280-720",
            loadYouTubePoster: !0,
            defaultCaptionHeight: 0,
            ariaLabelledby: "",
            ariaDescribedby: "",
            closable: !0,
            swipeToClose: !0,
            closeOnTap: !0,
            showCloseIcon: !0,
            showMaximizeIcon: !1,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimation: !0,
            hideControlOnEnd: !1,
            mousewheel: !1,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 2,
            numberOfSlideItemsInDom: 10,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: 0,
            iframeWidth: "100%",
            iframeHeight: "100%",
            iframeMaxWidth: "100%",
            iframeMaxHeight: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            extraProps: [],
            exThumbImage: "",
            isMobile: void 0,
            mobileSettings: {
                controls: !1,
                showCloseIcon: !1,
                download: !1
            },
            plugins: [],
            strings: {
                closeGallery: "Close gallery",
                toggleMaximize: "Toggle maximize",
                previousSlide: "Previous slide",
                nextSlide: "Next slide",
                download: "Download",
                playVideo: "Play video"
            }
        };
    var C = function () {
        function t(t) {
            return this.cssVenderPrefixes = ["TransitionDuration", "TransitionTimingFunction", "Transform", "Transition"], this.selector = this._getSelector(t), this.firstElement = this._getFirstEl(), this
        }
        return t.generateUUID = function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (t) {
                var e = 16 * Math.random() | 0;
                return ("x" == t ? e : 3 & e | 8).toString(16)
            }))
        }, t.prototype._getSelector = function (t, e) {
            return void 0 === e && (e = document), "string" != typeof t ? t : (e = e || document, "#" === t.substring(0, 1) ? e.querySelector(t) : e.querySelectorAll(t))
        }, t.prototype._each = function (t) {
            return this.selector ? (void 0 !== this.selector.length ? [].forEach.call(this.selector, t) : t(this.selector, 0), this) : this
        }, t.prototype._setCssVendorPrefix = function (t, e, i) {
            var s = e.replace(/-([a-z])/gi, (function (t, e) {
                return e.toUpperCase()
            })); - 1 !== this.cssVenderPrefixes.indexOf(s) ? (t.style[s.charAt(0).toLowerCase() + s.slice(1)] = i, t.style["webkit" + s] = i, t.style["moz" + s] = i, t.style["ms" + s] = i, t.style["o" + s] = i) : t.style[s] = i
        }, t.prototype._getFirstEl = function () {
            return this.selector && void 0 !== this.selector.length ? this.selector[0] : this.selector
        }, t.prototype.isEventMatched = function (t, e) {
            var i = e.split(".");
            return t.split(".").filter((function (t) {
                return t
            })).every((function (t) {
                return -1 !== i.indexOf(t)
            }))
        }, t.prototype.attr = function (t, e) {
            return void 0 === e ? this.firstElement ? this.firstElement.getAttribute(t) : "" : (this._each((function (i) {
                i.setAttribute(t, e)
            })), this)
        }, t.prototype.find = function (t) {
            return x(this._getSelector(t, this.selector))
        }, t.prototype.first = function () {
            return this.selector && void 0 !== this.selector.length ? x(this.selector[0]) : x(this.selector)
        }, t.prototype.eq = function (t) {
            return x(this.selector[t])
        }, t.prototype.parent = function () {
            return x(this.selector.parentElement)
        }, t.prototype.get = function () {
            return this._getFirstEl()
        }, t.prototype.removeAttr = function (t) {
            var e = t.split(" ");
            return this._each((function (t) {
                e.forEach((function (e) {
                    return t.removeAttribute(e)
                }))
            })), this
        }, t.prototype.wrap = function (t) {
            if (!this.firstElement) return this;
            var e = document.createElement("div");
            return e.className = t, this.firstElement.parentNode.insertBefore(e, this.firstElement), this.firstElement.parentNode.removeChild(this.firstElement), e.appendChild(this.firstElement), this
        }, t.prototype.addClass = function (t) {
            return void 0 === t && (t = ""), this._each((function (e) {
                t.split(" ").forEach((function (t) {
                    t && e.classList.add(t)
                }))
            })), this
        }, t.prototype.removeClass = function (t) {
            return this._each((function (e) {
                t.split(" ").forEach((function (t) {
                    t && e.classList.remove(t)
                }))
            })), this
        }, t.prototype.hasClass = function (t) {
            return !!this.firstElement && this.firstElement.classList.contains(t)
        }, t.prototype.hasAttribute = function (t) {
            return !!this.firstElement && this.firstElement.hasAttribute(t)
        }, t.prototype.toggleClass = function (t) {
            return this.firstElement ? (this.hasClass(t) ? this.removeClass(t) : this.addClass(t), this) : this
        }, t.prototype.css = function (t, e) {
            var i = this;
            return this._each((function (s) {
                i._setCssVendorPrefix(s, t, e)
            })), this
        }, t.prototype.on = function (e, i) {
            var s = this;
            return this.selector ? (e.split(" ").forEach((function (e) {
                Array.isArray(t.eventListeners[e]) || (t.eventListeners[e] = []), t.eventListeners[e].push(i), s.selector.addEventListener(e.split(".")[0], i)
            })), this) : this
        }, t.prototype.once = function (t, e) {
            var i = this;
            return this.on(t, (function () {
                i.off(t), e(t)
            })), this
        }, t.prototype.off = function (e) {
            var i = this;
            return this.selector ? (Object.keys(t.eventListeners).forEach((function (s) {
                i.isEventMatched(e, s) && (t.eventListeners[s].forEach((function (t) {
                    i.selector.removeEventListener(s.split(".")[0], t)
                })), t.eventListeners[s] = [])
            })), this) : this
        }, t.prototype.trigger = function (t, e) {
            if (!this.firstElement) return this;
            var i = new CustomEvent(t.split(".")[0], {
                detail: e || null
            });
            return this.firstElement.dispatchEvent(i), this
        }, t.prototype.load = function (t) {
            var e = this;
            return fetch(t).then((function (t) {
                return t.text()
            })).then((function (t) {
                e.selector.innerHTML = t
            })), this
        }, t.prototype.html = function (t) {
            return void 0 === t ? this.firstElement ? this.firstElement.innerHTML : "" : (this._each((function (e) {
                e.innerHTML = t
            })), this)
        }, t.prototype.append = function (t) {
            return this._each((function (e) {
                "string" == typeof t ? e.insertAdjacentHTML("beforeend", t) : e.appendChild(t)
            })), this
        }, t.prototype.prepend = function (t) {
            return this._each((function (e) {
                e.insertAdjacentHTML("afterbegin", t)
            })), this
        }, t.prototype.remove = function () {
            return this._each((function (t) {
                t.parentNode.removeChild(t)
            })), this
        }, t.prototype.empty = function () {
            return this._each((function (t) {
                t.innerHTML = ""
            })), this
        }, t.prototype.scrollTop = function (t) {
            return void 0 !== t ? (document.body.scrollTop = t, document.documentElement.scrollTop = t, this) : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        }, t.prototype.scrollLeft = function (t) {
            return void 0 !== t ? (document.body.scrollLeft = t, document.documentElement.scrollLeft = t, this) : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        }, t.prototype.offset = function () {
            if (!this.firstElement) return {
                left: 0,
                top: 0
            };
            var t = this.firstElement.getBoundingClientRect(),
                e = x("body").style().marginLeft;
            return {
                left: t.left - parseFloat(e) + this.scrollLeft(),
                top: t.top + this.scrollTop()
            }
        }, t.prototype.style = function () {
            return this.firstElement ? this.firstElement.currentStyle || window.getComputedStyle(this.firstElement) : {}
        }, t.prototype.width = function () {
            var t = this.style();
            return this.firstElement.clientWidth - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight)
        }, t.prototype.height = function () {
            var t = this.style();
            return this.firstElement.clientHeight - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom)
        }, t.eventListeners = {}, t
    }();

    function x(t) {
        return function () {
            if ("function" == typeof window.CustomEvent) return !1;
            window.CustomEvent = function (t, e) {
                e = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: null
                };
                var i = document.createEvent("CustomEvent");
                return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i
            }
        }(), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), new C(t)
    }
    var w = ["src", "sources", "subHtml", "subHtmlUrl", "html", "video", "poster", "slideName", "responsive", "srcset", "sizes", "iframe", "downloadUrl", "download", "width", "facebookShareUrl", "tweetText", "iframeTitle", "twitterShareUrl", "pinterestShareUrl", "pinterestText", "fbHtml", "disqusIdentifier", "disqusUrl"];

    function S(t) {
        return "href" === t ? "src" : t = (t = (t = t.replace("data-", "")).charAt(0).toLowerCase() + t.slice(1)).replace(/-([a-z])/g, (function (t) {
            return t[1].toUpperCase()
        }))
    }
    var T = function (t, e, i, s) {
            void 0 === i && (i = 0);
            var n = x(t).attr("data-lg-size") || s;
            if (n) {
                var o = n.split(",");
                if (o[1])
                    for (var r = window.innerWidth, l = 0; l < o.length; l++) {
                        var a = o[l];
                        if (parseInt(a.split("-")[2], 10) > r) {
                            n = a;
                            break
                        }
                        l === o.length - 1 && (n = a)
                    }
                var g = n.split("-"),
                    d = parseInt(g[0], 10),
                    h = parseInt(g[1], 10),
                    u = e.width(),
                    c = e.height() - i,
                    m = Math.min(u, d),
                    p = Math.min(c, h),
                    f = Math.min(m / d, p / h);
                return {
                    width: d * f,
                    height: h * f
                }
            }
        },
        E = function (t, e, i, s, n) {
            if (n) {
                var o = x(t).find("img").first();
                if (o.get()) {
                    var r = e.get().getBoundingClientRect(),
                        l = r.width,
                        a = e.height() - (i + s),
                        g = o.width(),
                        d = o.height(),
                        h = o.style(),
                        u = (l - g) / 2 - o.offset().left + (parseFloat(h.paddingLeft) || 0) + (parseFloat(h.borderLeft) || 0) + x(window).scrollLeft() + r.left,
                        c = (a - d) / 2 - o.offset().top + (parseFloat(h.paddingTop) || 0) + (parseFloat(h.borderTop) || 0) + x(window).scrollTop() + i;
                    return "translate3d(" + (u *= -1) + "px, " + (c *= -1) + "px, 0) scale3d(" + g / n.width + ", " + d / n.height + ", 1)"
                }
            }
        },
        O = function (t, e, i, s, n, o) {
            return '<div class="lg-video-cont lg-has-iframe" style="width:' + t + "; max-width:" + i + "; height: " + e + "; max-height:" + s + '">\n                    <iframe class="lg-object" frameborder="0" ' + (o ? 'title="' + o + '"' : "") + ' src="' + n + '"  allowfullscreen="true"></iframe>\n                </div>'
        },
        L = function (t, e, i, s, n, o) {
            var r = "<img " + i + " " + (s ? 'srcset="' + s + '"' : "") + "  " + (n ? 'sizes="' + n + '"' : "") + ' class="lg-object lg-image" data-index="' + t + '" src="' + e + '" />',
                l = "";
            o && (l = ("string" == typeof o ? JSON.parse(o) : o).map((function (t) {
                var e = "";
                return Object.keys(t).forEach((function (i) {
                    e += " " + i + '="' + t[i] + '"'
                })), "<source " + e + "></source>"
            })));
            return "" + l + r
        },
        D = function (t) {
            for (var e = [], i = [], s = "", n = 0; n < t.length; n++) {
                var o = t[n].split(" ");
                "" === o[0] && o.splice(0, 1), i.push(o[0]), e.push(o[1])
            }
            for (var r = window.innerWidth, l = 0; l < e.length; l++)
                if (parseInt(e[l], 10) > r) {
                    s = i[l];
                    break
                } return s
        },
        z = function (t) {
            return !!t && (!!t.complete && 0 !== t.naturalWidth)
        },
        M = function (t, e, i, s, n) {
            return '<div class="lg-video-cont ' + (n && n.youtube ? "lg-has-youtube" : n && n.vimeo ? "lg-has-vimeo" : "lg-has-html5") + '" style="' + i + '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' + s + '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' + s + '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' + (e || "") + '\n            <img class="lg-object lg-video-poster" src="' + t + '" />\n        </div>'
        },
        G = function (t, e, i, s) {
            var n = [],
                o = function () {
                    for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length;
                    var s = Array(t),
                        n = 0;
                    for (e = 0; e < i; e++)
                        for (var o = arguments[e], r = 0, l = o.length; r < l; r++, n++) s[n] = o[r];
                    return s
                }(w, e);
            return [].forEach.call(t, (function (t) {
                for (var e = {}, r = 0; r < t.attributes.length; r++) {
                    var l = t.attributes[r];
                    if (l.specified) {
                        var a = S(l.name),
                            g = "";
                        o.indexOf(a) > -1 && (g = a), g && (e[g] = l.value)
                    }
                }
                var d = x(t),
                    h = d.find("img").first().attr("alt"),
                    u = d.attr("title"),
                    c = s ? d.attr(s) : d.find("img").first().attr("src");
                e.thumb = c, i && !e.subHtml && (e.subHtml = u || h || ""), e.alt = h || u || "", n.push(e)
            })), n
        },
        k = function () {
            return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        },
        A = function (t, e, i) {
            if (!t) return e ? {
                html5: !0
            } : void console.error("lightGallery :- data-src is not provided on slide item " + (i + 1) + ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/");
            var s = t.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i),
                n = t.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i),
                o = t.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
            return s ? {
                youtube: s
            } : n ? {
                vimeo: n
            } : o ? {
                wistia: o
            } : void 0
        },
        B = 0,
        P = function () {
            function w(t, e) {
                if (this.lgOpened = !1, this.index = 0, this.plugins = [], this.lGalleryOn = !1, this.lgBusy = !1, this.currentItemsInDom = [], this.prevScrollTop = 0, this.isDummyImageRemoved = !1, this.dragOrSwipeEnabled = !1, this.mediaContainerPosition = {
                        top: 0,
                        bottom: 0
                    }, !t) return this;
                if (B++, this.lgId = B, this.el = t, this.LGel = x(t), this.generateSettings(e), this.buildModules(), this.settings.dynamic && void 0 !== this.settings.dynamicEl && !Array.isArray(this.settings.dynamicEl)) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                return this.galleryItems = this.getItems(), this.normalizeSettings(), this.init(), this.validateLicense(), this
            }
            return w.prototype.generateSettings = function (e) {
                if (this.settings = t(t({}, I), e), this.settings.isMobile && "function" == typeof this.settings.isMobile ? this.settings.isMobile() : k()) {
                    var i = t(t({}, this.settings.mobileSettings), this.settings.mobileSettings);
                    this.settings = t(t({}, this.settings), i)
                }
            }, w.prototype.normalizeSettings = function () {
                this.settings.slideEndAnimation && (this.settings.hideControlOnEnd = !1), this.settings.closable || (this.settings.swipeToClose = !1), this.zoomFromOrigin = this.settings.zoomFromOrigin, this.settings.dynamic && (this.zoomFromOrigin = !1), this.settings.container || (this.settings.container = document.body), this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length)
            }, w.prototype.init = function () {
                var t = this;
                this.addSlideVideoInfo(this.galleryItems), this.buildStructure(), this.LGel.trigger(i, {
                    instance: this
                }), this.settings.keyPress && this.keyPress(), setTimeout((function () {
                    t.enableDrag(), t.enableSwipe(), t.triggerPosterClick()
                }), 50), this.arrow(), this.settings.mousewheel && this.mousewheel(), this.settings.dynamic || this.openGalleryOnItemClick()
            }, w.prototype.openGalleryOnItemClick = function () {
                for (var t = this, e = function (e) {
                        var s = i.items[e],
                            n = x(s),
                            o = C.generateUUID();
                        n.attr("data-lg-id", o).on("click.lgcustom-item-" + o, (function (i) {
                            i.preventDefault();
                            var n = t.settings.index || e;
                            t.openGallery(n, s)
                        }))
                    }, i = this, s = 0; s < this.items.length; s++) e(s)
            }, w.prototype.buildModules = function () {
                var t = this;
                this.settings.plugins.forEach((function (e) {
                    t.plugins.push(new e(t, x))
                }))
            }, w.prototype.validateLicense = function () {
                this.settings.licenseKey ? "0000-0000-000-0000" === this.settings.licenseKey && console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use") : console.error("Please provide a valid license key")
            }, w.prototype.getSlideItem = function (t) {
                return x(this.getSlideItemId(t))
            }, w.prototype.getSlideItemId = function (t) {
                return "#lg-item-" + this.lgId + "-" + t
            }, w.prototype.getIdName = function (t) {
                return t + "-" + this.lgId
            }, w.prototype.getElementById = function (t) {
                return x("#" + this.getIdName(t))
            }, w.prototype.manageSingleSlideClassName = function () {
                this.galleryItems.length < 2 ? this.outer.addClass("lg-single-item") : this.outer.removeClass("lg-single-item")
            }, w.prototype.buildStructure = function () {
                var t = this;
                if (!(this.$container && this.$container.get())) {
                    var e = "",
                        i = "";
                    this.settings.controls && (e = '<button type="button" id="' + this.getIdName("lg-prev") + '" aria-label="' + this.settings.strings.previousSlide + '" class="lg-prev lg-icon"> ' + this.settings.prevHtml + ' </button>\n                <button type="button" id="' + this.getIdName("lg-next") + '" aria-label="' + this.settings.strings.nextSlide + '" class="lg-next lg-icon"> ' + this.settings.nextHtml + " </button>"), ".lg-item" !== this.settings.appendSubHtmlTo && (i = '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
                    var s = "";
                    this.settings.allowMediaOverlap && (s += "lg-media-overlap ");
                    var n = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : "",
                        o = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : "",
                        r = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? "lg-inline" : ""),
                        l = this.settings.closable && this.settings.showCloseIcon ? '<button type="button" aria-label="' + this.settings.strings.closeGallery + '" id="' + this.getIdName("lg-close") + '" class="lg-close lg-icon"></button>' : "",
                        a = this.settings.showMaximizeIcon ? '<button type="button" aria-label="' + this.settings.strings.toggleMaximize + '" id="' + this.getIdName("lg-maximize") + '" class="lg-maximize lg-icon"></button>' : "",
                        g = '\n        <div class="' + r + '" id="' + this.getIdName("lg-container") + '" tabindex="-1" aria-modal="true" ' + n + " " + o + ' role="dialog"\n        >\n            <div id="' + this.getIdName("lg-backdrop") + '" class="lg-backdrop"></div>\n\n            <div id="' + this.getIdName("lg-outer") + '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' + s + ' ">\n\n              <div id="' + this.getIdName("lg-content") + '" class="lg-content">\n                <div id="' + this.getIdName("lg-inner") + '" class="lg-inner">\n                </div>\n                ' + e + '\n              </div>\n                <div id="' + this.getIdName("lg-toolbar") + '" class="lg-toolbar lg-group">\n                    ' + a + "\n                    " + l + "\n                    </div>\n                    " + (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") + '\n                <div id="' + this.getIdName("lg-components") + '" class="lg-components">\n                    ' + (".lg-sub-html" === this.settings.appendSubHtmlTo ? i : "") + "\n                </div>\n            </div>\n        </div>\n        ";
                    x(this.settings.container).append(g), document.body !== this.settings.container && x(this.settings.container).css("position", "relative"), this.outer = this.getElementById("lg-outer"), this.$lgComponents = this.getElementById("lg-components"), this.$backdrop = this.getElementById("lg-backdrop"), this.$container = this.getElementById("lg-container"), this.$inner = this.getElementById("lg-inner"), this.$content = this.getElementById("lg-content"), this.$toolbar = this.getElementById("lg-toolbar"), this.$backdrop.css("transition-duration", this.settings.backdropDuration + "ms");
                    var d = this.settings.mode + " ";
                    this.manageSingleSlideClassName(), this.settings.enableDrag && (d += "lg-grab "), this.outer.addClass(d), this.$inner.css("transition-timing-function", this.settings.easing), this.$inner.css("transition-duration", this.settings.speed + "ms"), this.settings.download && this.$toolbar.append('<a id="' + this.getIdName("lg-download") + '" target="_blank" rel="noopener" aria-label="' + this.settings.strings.download + '" download class="lg-download lg-icon"></a>'), this.counter(), x(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, (function () {
                        t.refreshOnResize()
                    })), this.hideBars(), this.manageCloseGallery(), this.toggleMaximize(), this.initModules()
                }
            }, w.prototype.refreshOnResize = function () {
                if (this.lgOpened) {
                    var t = this.galleryItems[this.index].__slideVideoInfo;
                    this.mediaContainerPosition = this.getMediaContainerPosition();
                    var e = this.mediaContainerPosition,
                        i = e.top,
                        s = e.bottom;
                    if (this.currentImageSize = T(this.items[this.index], this.outer, i + s, t && this.settings.videoMaxSize), t && this.resizeVideoSlide(this.index, this.currentImageSize), this.zoomFromOrigin && !this.isDummyImageRemoved) {
                        var o = this.getDummyImgStyles(this.currentImageSize);
                        this.outer.find(".lg-current .lg-dummy-img").first().attr("style", o)
                    }
                    this.LGel.trigger(n)
                }
            }, w.prototype.resizeVideoSlide = function (t, e) {
                var i = this.getVideoContStyle(e);
                this.getSlideItem(t).find(".lg-video-cont").attr("style", i)
            }, w.prototype.updateSlides = function (t, e) {
                if (this.index > t.length - 1 && (this.index = t.length - 1), 1 === t.length && (this.index = 0), t.length) {
                    var i = this.galleryItems[e].src;
                    this.galleryItems = t, this.updateControls(), this.$inner.empty(), this.currentItemsInDom = [];
                    var s = 0;
                    this.galleryItems.some((function (t, e) {
                        return t.src === i && (s = e, !0)
                    })), this.currentItemsInDom = this.organizeSlideItems(s, -1), this.loadContent(s, !0), this.getSlideItem(s).addClass("lg-current"), this.index = s, this.updateCurrentCounter(s), this.LGel.trigger(o)
                } else this.closeGallery()
            }, w.prototype.getItems = function () {
                if (this.items = [], this.settings.dynamic) return this.settings.dynamicEl || [];
                if ("this" === this.settings.selector) this.items.push(this.el);
                else if (this.settings.selector)
                    if ("string" == typeof this.settings.selector)
                        if (this.settings.selectWithin) {
                            var t = x(this.settings.selectWithin);
                            this.items = t.find(this.settings.selector).get()
                        } else this.items = this.el.querySelectorAll(this.settings.selector);
                else this.items = this.settings.selector;
                else this.items = this.el.children;
                return G(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage)
            }, w.prototype.openGallery = function (t, e) {
                var i = this;
                if (void 0 === t && (t = this.settings.index), !this.lgOpened) {
                    this.lgOpened = !0, this.outer.get().focus(), this.outer.removeClass("lg-hide-items"), this.$container.addClass("lg-show");
                    var s = this.getItemsToBeInsertedToDom(t, t);
                    this.currentItemsInDom = s;
                    var n = "";
                    s.forEach((function (t) {
                        n = n + '<div id="' + t + '" class="lg-item"></div>'
                    })), this.$inner.append(n), this.addHtml(t);
                    var o = "";
                    this.mediaContainerPosition = this.getMediaContainerPosition();
                    var r = this.mediaContainerPosition,
                        g = r.top,
                        d = r.bottom;
                    this.settings.allowMediaOverlap || this.setMediaContainerPosition(g, d);
                    var h = this.galleryItems[t].__slideVideoInfo;
                    this.zoomFromOrigin && e && (this.currentImageSize = T(e, this.outer, g + d, h && this.settings.videoMaxSize), o = E(e, this.outer, g, d, this.currentImageSize)), this.zoomFromOrigin && o || (this.outer.addClass(this.settings.startClass), this.getSlideItem(t).removeClass("lg-complete"));
                    var u = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
                    setTimeout((function () {
                        i.outer.addClass("lg-components-open")
                    }), u), this.index = t, this.LGel.trigger(l), this.getSlideItem(t).addClass("lg-current"), this.lGalleryOn = !1, this.prevScrollTop = x(window).scrollTop(), setTimeout((function () {
                        if (i.zoomFromOrigin && o) {
                            var e = i.getSlideItem(t);
                            e.css("transform", o), setTimeout((function () {
                                e.addClass("lg-start-progress lg-start-end-progress").css("transition-duration", i.settings.startAnimationDuration + "ms"), i.outer.addClass("lg-zoom-from-image")
                            })), setTimeout((function () {
                                e.css("transform", "translate3d(0, 0, 0)")
                            }), 100)
                        }
                        setTimeout((function () {
                            i.$backdrop.addClass("in"), i.$container.addClass("lg-show-in")
                        }), 10), i.zoomFromOrigin && o || setTimeout((function () {
                            i.outer.addClass("lg-visible")
                        }), i.settings.backdropDuration), i.slide(t, !1, !1, !1), i.LGel.trigger(a)
                    })), document.body === this.settings.container && x("html").addClass("lg-on")
                }
            }, w.prototype.getMediaContainerPosition = function () {
                if (this.settings.allowMediaOverlap) return {
                    top: 0,
                    bottom: 0
                };
                var t = this.$toolbar.get().clientHeight || 0,
                    e = this.outer.find(".lg-components .lg-sub-html").get(),
                    i = this.settings.defaultCaptionHeight || e && e.clientHeight || 0,
                    s = this.outer.find(".lg-thumb-outer").get();
                return {
                    top: t,
                    bottom: (s ? s.clientHeight : 0) + i
                }
            }, w.prototype.setMediaContainerPosition = function (t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), this.$content.css("top", t + "px").css("bottom", e + "px")
            }, w.prototype.hideBars = function () {
                var t = this;
                setTimeout((function () {
                    t.outer.removeClass("lg-hide-items"), t.settings.hideBarsDelay > 0 && (t.outer.on("mousemove.lg click.lg touchstart.lg", (function () {
                        t.outer.removeClass("lg-hide-items"), clearTimeout(t.hideBarTimeout), t.hideBarTimeout = setTimeout((function () {
                            t.outer.addClass("lg-hide-items")
                        }), t.settings.hideBarsDelay)
                    })), t.outer.trigger("mousemove.lg"))
                }), this.settings.showBarsAfter)
            }, w.prototype.initPictureFill = function (t) {
                if (this.settings.supportLegacyBrowser) try {
                    picturefill({
                        elements: [t.get()]
                    })
                } catch (t) {
                    console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.")
                }
            }, w.prototype.counter = function () {
                if (this.settings.counter) {
                    var t = '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' + this.getIdName("lg-counter-current") + '" class="lg-counter-current">' + (this.index + 1) + ' </span> /\n                <span id="' + this.getIdName("lg-counter-all") + '" class="lg-counter-all">' + this.galleryItems.length + " </span></div>";
                    this.outer.find(this.settings.appendCounterTo).append(t)
                }
            }, w.prototype.addHtml = function (t) {
                var e, i;
                if (this.galleryItems[t].subHtmlUrl ? i = this.galleryItems[t].subHtmlUrl : e = this.galleryItems[t].subHtml, !i)
                    if (e) {
                        var s = e.substring(0, 1);
                        "." !== s && "#" !== s || (e = this.settings.subHtmlSelectorRelative && !this.settings.dynamic ? x(this.items).eq(t).find(e).first().html() : x(e).first().html())
                    } else e = "";
                if (".lg-item" !== this.settings.appendSubHtmlTo) i ? this.outer.find(".lg-sub-html").load(i) : this.outer.find(".lg-sub-html").html(e);
                else {
                    var n = x(this.getSlideItemId(t));
                    i ? n.load(i) : n.append('<div class="lg-sub-html">' + e + "</div>")
                }
                null != e && ("" === e ? this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html") : this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html")), this.LGel.trigger(r, {
                    index: t
                })
            }, w.prototype.preload = function (t) {
                for (var e = 1; e <= this.settings.preload && !(e >= this.galleryItems.length - t); e++) this.loadContent(t + e, !1);
                for (var i = 1; i <= this.settings.preload && !(t - i < 0); i++) this.loadContent(t - i, !1)
            }, w.prototype.getDummyImgStyles = function (t) {
                return t ? "width:" + t.width + "px;\n                margin-left: -" + t.width / 2 + "px;\n                margin-top: -" + t.height / 2 + "px;\n                height:" + t.height + "px" : ""
            }, w.prototype.getVideoContStyle = function (t) {
                return t ? "width:" + t.width + "px;\n                height:" + t.height + "px" : ""
            }, w.prototype.getDummyImageContent = function (t, e, i) {
                var s;
                if (this.settings.dynamic || (s = x(this.items).eq(e)), s) {
                    var n = void 0;
                    if (!(n = this.settings.exThumbImage ? s.attr(this.settings.exThumbImage) : s.find("img").first().attr("src"))) return "";
                    var o = "<img " + i + ' style="' + this.getDummyImgStyles(this.currentImageSize) + '" class="lg-dummy-img" src="' + n + '" />';
                    return t.addClass("lg-first-slide"), this.outer.addClass("lg-first-slide-loading"), o
                }
                return ""
            }, w.prototype.setImgMarkup = function (t, e, i) {
                var s = this.galleryItems[i],
                    n = s.alt,
                    o = s.srcset,
                    r = s.sizes,
                    l = s.sources,
                    a = n ? 'alt="' + n + '"' : "",
                    g = '<picture class="lg-img-wrap"> ' + (this.isFirstSlideWithZoomAnimation() ? this.getDummyImageContent(e, i, a) : L(i, t, a, o, r, l)) + "</picture>";
                e.prepend(g)
            }, w.prototype.onSlideObjectLoad = function (t, e, i, s) {
                var n = t.find(".lg-object").first();
                z(n.get()) || e ? i() : (n.on("load.lg error.lg", (function () {
                    i && i()
                })), n.on("error.lg", (function () {
                    s && s()
                })))
            }, w.prototype.onLgObjectLoad = function (t, e, i, s, n, o) {
                var r = this;
                this.onSlideObjectLoad(t, o, (function () {
                    r.triggerSlideItemLoad(t, e, i, s, n)
                }), (function () {
                    t.addClass("lg-complete lg-complete_"), t.html('<span class="lg-error-msg">Oops... Failed to load content...</span>')
                }))
            }, w.prototype.triggerSlideItemLoad = function (t, e, i, s, n) {
                var o = this,
                    r = this.galleryItems[e],
                    l = n && "video" === this.getSlideType(r) && !r.poster ? s : 0;
                setTimeout((function () {
                    t.addClass("lg-complete lg-complete_"), o.LGel.trigger(g, {
                        index: e,
                        delay: i || 0,
                        isFirstSlide: n
                    })
                }), l)
            }, w.prototype.isFirstSlideWithZoomAnimation = function () {
                return !(this.lGalleryOn || !this.zoomFromOrigin || !this.currentImageSize)
            }, w.prototype.addSlideVideoInfo = function (t) {
                var e = this;
                t.forEach((function (t, i) {
                    t.__slideVideoInfo = A(t.src, !!t.video, i), t.__slideVideoInfo && e.settings.loadYouTubePoster && !t.poster && t.__slideVideoInfo.youtube && (t.poster = "//img.youtube.com/vi/" + t.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg")
                }))
            }, w.prototype.loadContent = function (t, i) {
                var n = this,
                    o = this.galleryItems[t],
                    r = x(this.getSlideItemId(t)),
                    l = o.poster,
                    a = o.srcset,
                    g = o.sizes,
                    d = o.sources,
                    h = o.src,
                    u = o.video,
                    c = u && "string" == typeof u ? JSON.parse(u) : u;
                if (o.responsive) {
                    var m = o.responsive.split(",");
                    h = D(m) || h
                }
                var p = o.__slideVideoInfo,
                    f = "",
                    v = !!o.iframe,
                    y = !this.lGalleryOn,
                    b = 0;
                if (y && (b = this.zoomFromOrigin && this.currentImageSize ? this.settings.startAnimationDuration + 10 : this.settings.backdropDuration + 10), !r.hasClass("lg-loaded")) {
                    if (p) {
                        var I = this.mediaContainerPosition,
                            C = I.top,
                            w = I.bottom,
                            S = T(this.items[t], this.outer, C + w, p && this.settings.videoMaxSize);
                        f = this.getVideoContStyle(S)
                    }
                    if (v) {
                        var E = O(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, h, o.iframeTitle);
                        r.prepend(E)
                    } else if (l) {
                        var z = "";
                        y && this.zoomFromOrigin && this.currentImageSize && (z = this.getDummyImageContent(r, t, ""));
                        E = M(l, z || "", f, this.settings.strings.playVideo, p);
                        r.prepend(E)
                    } else if (p) {
                        E = '<div class="lg-video-cont " style="' + f + '"></div>';
                        r.prepend(E)
                    } else if (this.setImgMarkup(h, r, t), a || d) {
                        var G = r.find(".lg-object");
                        this.initPictureFill(G)
                    }(l || p) && this.LGel.trigger(s, {
                        index: t,
                        src: h,
                        html5Video: c,
                        hasPoster: !!l
                    }), this.LGel.trigger(e, {
                        index: t
                    }), this.lGalleryOn && ".lg-item" === this.settings.appendSubHtmlTo && this.addHtml(t)
                }
                var k = 0;
                b && !x(document.body).hasClass("lg-from-hash") && (k = b), this.isFirstSlideWithZoomAnimation() && (setTimeout((function () {
                    r.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style")
                }), this.settings.startAnimationDuration + 100), r.hasClass("lg-loaded") || setTimeout((function () {
                    if ("image" === n.getSlideType(o) && (r.find(".lg-img-wrap").append(L(t, h, "", a, g, o.sources)), a || d)) {
                        var e = r.find(".lg-object");
                        n.initPictureFill(e)
                    }("image" === n.getSlideType(o) || "video" === n.getSlideType(o) && l) && (n.onLgObjectLoad(r, t, b, k, !0, !1), n.onSlideObjectLoad(r, !(!p || !p.html5 || l), (function () {
                        n.loadContentOnFirstSlideLoad(t, r, k)
                    }), (function () {
                        n.loadContentOnFirstSlideLoad(t, r, k)
                    })))
                }), this.settings.startAnimationDuration + 100)), r.addClass("lg-loaded"), this.isFirstSlideWithZoomAnimation() && ("video" !== this.getSlideType(o) || l) || this.onLgObjectLoad(r, t, b, k, y, !(!p || !p.html5 || l)), this.zoomFromOrigin && this.currentImageSize || !r.hasClass("lg-complete_") || this.lGalleryOn || setTimeout((function () {
                    r.addClass("lg-complete")
                }), this.settings.backdropDuration), this.lGalleryOn = !0, !0 === i && (r.hasClass("lg-complete_") ? this.preload(t) : r.find(".lg-object").first().on("load.lg error.lg", (function () {
                    n.preload(t)
                })))
            }, w.prototype.loadContentOnFirstSlideLoad = function (t, e, i) {
                var s = this;
                setTimeout((function () {
                    e.find(".lg-dummy-img").remove(), e.removeClass("lg-first-slide"), s.outer.removeClass("lg-first-slide-loading"), s.isDummyImageRemoved = !0, s.preload(t)
                }), i + 300)
            }, w.prototype.getItemsToBeInsertedToDom = function (t, e, i) {
                var s = this;
                void 0 === i && (i = 0);
                var n = [],
                    o = Math.max(i, 3);
                o = Math.min(o, this.galleryItems.length);
                var r = "lg-item-" + this.lgId + "-" + e;
                if (this.galleryItems.length <= 3) return this.galleryItems.forEach((function (t, e) {
                    n.push("lg-item-" + s.lgId + "-" + e)
                })), n;
                if (t < (this.galleryItems.length - 1) / 2) {
                    for (var l = t; l > t - o / 2 && l >= 0; l--) n.push("lg-item-" + this.lgId + "-" + l);
                    var a = n.length;
                    for (l = 0; l < o - a; l++) n.push("lg-item-" + this.lgId + "-" + (t + l + 1))
                } else {
                    for (l = t; l <= this.galleryItems.length - 1 && l < t + o / 2; l++) n.push("lg-item-" + this.lgId + "-" + l);
                    for (a = n.length, l = 0; l < o - a; l++) n.push("lg-item-" + this.lgId + "-" + (t - l - 1))
                }
                return this.settings.loop && (t === this.galleryItems.length - 1 ? n.push("lg-item-" + this.lgId + "-0") : 0 === t && n.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1))), -1 === n.indexOf(r) && n.push("lg-item-" + this.lgId + "-" + e), n
            }, w.prototype.organizeSlideItems = function (t, e) {
                var i = this,
                    s = this.getItemsToBeInsertedToDom(t, e, this.settings.numberOfSlideItemsInDom);
                return s.forEach((function (t) {
                    -1 === i.currentItemsInDom.indexOf(t) && i.$inner.append('<div id="' + t + '" class="lg-item"></div>')
                })), this.currentItemsInDom.forEach((function (t) {
                    -1 === s.indexOf(t) && x("#" + t).remove()
                })), s
            }, w.prototype.getPreviousSlideIndex = function () {
                var t = 0;
                try {
                    var e = this.outer.find(".lg-current").first().attr("id");
                    t = parseInt(e.split("-")[3]) || 0
                } catch (e) {
                    t = 0
                }
                return t
            }, w.prototype.setDownloadValue = function (t) {
                if (this.settings.download) {
                    var e = this.galleryItems[t];
                    if (!1 === e.downloadUrl || "false" === e.downloadUrl) this.outer.addClass("lg-hide-download");
                    else {
                        var i = this.getElementById("lg-download");
                        this.outer.removeClass("lg-hide-download"), i.attr("href", e.downloadUrl || e.src), e.download && i.attr("download", e.download)
                    }
                }
            }, w.prototype.makeSlideAnimation = function (t, e, i) {
                var s = this;
                this.lGalleryOn && i.addClass("lg-slide-progress"), setTimeout((function () {
                    s.outer.addClass("lg-no-trans"), s.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide"), "prev" === t ? (e.addClass("lg-prev-slide"), i.addClass("lg-next-slide")) : (e.addClass("lg-next-slide"), i.addClass("lg-prev-slide")), setTimeout((function () {
                        s.outer.find(".lg-item").removeClass("lg-current"), e.addClass("lg-current"), s.outer.removeClass("lg-no-trans")
                    }), 50)
                }), this.lGalleryOn ? this.settings.slideDelay : 0)
            }, w.prototype.slide = function (t, e, i, s) {
                var n = this,
                    o = this.getPreviousSlideIndex();
                if (this.currentItemsInDom = this.organizeSlideItems(t, o), !this.lGalleryOn || o !== t) {
                    var r = this.galleryItems.length;
                    if (!this.lgBusy) {
                        this.settings.counter && this.updateCurrentCounter(t);
                        var l = this.getSlideItem(t),
                            a = this.getSlideItem(o),
                            g = this.galleryItems[t],
                            u = g.__slideVideoInfo;
                        if (this.outer.attr("data-lg-slide-type", this.getSlideType(g)), this.setDownloadValue(t), u) {
                            var c = this.mediaContainerPosition,
                                m = c.top,
                                p = c.bottom,
                                f = T(this.items[t], this.outer, m + p, u && this.settings.videoMaxSize);
                            this.resizeVideoSlide(t, f)
                        }
                        if (this.LGel.trigger(d, {
                                prevIndex: o,
                                index: t,
                                fromTouch: !!e,
                                fromThumb: !!i
                            }), this.lgBusy = !0, clearTimeout(this.hideBarTimeout), this.arrowDisable(t), s || (t < o ? s = "prev" : t > o && (s = "next")), e) {
                            this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");
                            var v = void 0,
                                y = void 0;
                            r > 2 ? (v = t - 1, y = t + 1, (0 === t && o === r - 1 || t === r - 1 && 0 === o) && (y = 0, v = r - 1)) : (v = 0, y = 1), "prev" === s ? this.getSlideItem(y).addClass("lg-next-slide") : this.getSlideItem(v).addClass("lg-prev-slide"), l.addClass("lg-current")
                        } else this.makeSlideAnimation(s, l, a);
                        this.lGalleryOn ? setTimeout((function () {
                            n.loadContent(t, !0), ".lg-item" !== n.settings.appendSubHtmlTo && n.addHtml(t)
                        }), this.settings.speed + 50 + (e ? 0 : this.settings.slideDelay)) : this.loadContent(t, !0), setTimeout((function () {
                            n.lgBusy = !1, a.removeClass("lg-slide-progress"), n.LGel.trigger(h, {
                                prevIndex: o,
                                index: t,
                                fromTouch: e,
                                fromThumb: i
                            })
                        }), (this.lGalleryOn ? this.settings.speed + 100 : 100) + (e ? 0 : this.settings.slideDelay))
                    }
                    this.index = t
                }
            }, w.prototype.updateCurrentCounter = function (t) {
                this.getElementById("lg-counter-current").html(t + 1 + "")
            }, w.prototype.updateCounterTotal = function () {
                this.getElementById("lg-counter-all").html(this.galleryItems.length + "")
            }, w.prototype.getSlideType = function (t) {
                return t.__slideVideoInfo ? "video" : t.iframe ? "iframe" : "image"
            }, w.prototype.touchMove = function (t, e, i) {
                var s = e.pageX - t.pageX,
                    n = e.pageY - t.pageY,
                    o = !1;
                if (this.swipeDirection ? o = !0 : Math.abs(s) > 15 ? (this.swipeDirection = "horizontal", o = !0) : Math.abs(n) > 15 && (this.swipeDirection = "vertical", o = !0), o) {
                    var r = this.getSlideItem(this.index);
                    if ("horizontal" === this.swipeDirection) {
                        null == i || i.preventDefault(), this.outer.addClass("lg-dragging"), this.setTranslate(r, s, 0);
                        var l = r.get().offsetWidth,
                            a = 15 * l / 100 - Math.abs(10 * s / 100);
                        this.setTranslate(this.outer.find(".lg-prev-slide").first(), -l + s - a, 0), this.setTranslate(this.outer.find(".lg-next-slide").first(), l + s + a, 0)
                    } else if ("vertical" === this.swipeDirection && this.settings.swipeToClose) {
                        null == i || i.preventDefault(), this.$container.addClass("lg-dragging-vertical");
                        var g = 1 - Math.abs(n) / window.innerHeight;
                        this.$backdrop.css("opacity", g);
                        var d = 1 - Math.abs(n) / (2 * window.innerWidth);
                        this.setTranslate(r, 0, n, d, d), Math.abs(n) > 100 && this.outer.addClass("lg-hide-items").removeClass("lg-components-open")
                    }
                }
            }, w.prototype.touchEnd = function (t, e, i) {
                var s, n = this;
                "lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"), setTimeout((function () {
                    n.$container.removeClass("lg-dragging-vertical"), n.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");
                    var o = !0;
                    if ("horizontal" === n.swipeDirection) {
                        s = t.pageX - e.pageX;
                        var r = Math.abs(t.pageX - e.pageX);
                        s < 0 && r > n.settings.swipeThreshold ? (n.goToNextSlide(!0), o = !1) : s > 0 && r > n.settings.swipeThreshold && (n.goToPrevSlide(!0), o = !1)
                    } else if ("vertical" === n.swipeDirection) {
                        if (s = Math.abs(t.pageY - e.pageY), n.settings.closable && n.settings.swipeToClose && s > 100) return void n.closeGallery();
                        n.$backdrop.css("opacity", 1)
                    }
                    if (n.outer.find(".lg-item").removeAttr("style"), o && Math.abs(t.pageX - e.pageX) < 5) {
                        var l = x(i.target);
                        n.isPosterElement(l) && n.LGel.trigger(u)
                    }
                    n.swipeDirection = void 0
                })), setTimeout((function () {
                    n.outer.hasClass("lg-dragging") || "lg-slide" === n.settings.mode || n.outer.removeClass("lg-slide")
                }), this.settings.speed + 100)
            }, w.prototype.enableSwipe = function () {
                var t = this,
                    e = {},
                    i = {},
                    s = !1,
                    n = !1;
                this.settings.enableSwipe && (this.$inner.on("touchstart.lg", (function (i) {
                    t.dragOrSwipeEnabled = !0;
                    var s = t.getSlideItem(t.index);
                    !x(i.target).hasClass("lg-item") && !s.get().contains(i.target) || t.outer.hasClass("lg-zoomed") || t.lgBusy || 1 !== i.targetTouches.length || (n = !0, t.touchAction = "swipe", t.manageSwipeClass(), e = {
                        pageX: i.targetTouches[0].pageX,
                        pageY: i.targetTouches[0].pageY
                    })
                })), this.$inner.on("touchmove.lg", (function (o) {
                    n && "swipe" === t.touchAction && 1 === o.targetTouches.length && (i = {
                        pageX: o.targetTouches[0].pageX,
                        pageY: o.targetTouches[0].pageY
                    }, t.touchMove(e, i, o), s = !0)
                })), this.$inner.on("touchend.lg", (function (o) {
                    if ("swipe" === t.touchAction) {
                        if (s) s = !1, t.touchEnd(i, e, o);
                        else if (n) {
                            var r = x(o.target);
                            t.isPosterElement(r) && t.LGel.trigger(u)
                        }
                        t.touchAction = void 0, n = !1
                    }
                })))
            }, w.prototype.enableDrag = function () {
                var t = this,
                    e = {},
                    i = {},
                    s = !1,
                    n = !1;
                this.settings.enableDrag && (this.outer.on("mousedown.lg", (function (i) {
                    t.dragOrSwipeEnabled = !0;
                    var n = t.getSlideItem(t.index);
                    (x(i.target).hasClass("lg-item") || n.get().contains(i.target)) && (t.outer.hasClass("lg-zoomed") || t.lgBusy || (i.preventDefault(), t.lgBusy || (t.manageSwipeClass(), e = {
                        pageX: i.pageX,
                        pageY: i.pageY
                    }, s = !0, t.outer.get().scrollLeft += 1, t.outer.get().scrollLeft -= 1, t.outer.removeClass("lg-grab").addClass("lg-grabbing"), t.LGel.trigger(c))))
                })), x(window).on("mousemove.lg.global" + this.lgId, (function (o) {
                    s && t.lgOpened && (n = !0, i = {
                        pageX: o.pageX,
                        pageY: o.pageY
                    }, t.touchMove(e, i), t.LGel.trigger(m))
                })), x(window).on("mouseup.lg.global" + this.lgId, (function (o) {
                    if (t.lgOpened) {
                        var r = x(o.target);
                        n ? (n = !1, t.touchEnd(i, e, o), t.LGel.trigger(p)) : t.isPosterElement(r) && t.LGel.trigger(u), s && (s = !1, t.outer.removeClass("lg-grabbing").addClass("lg-grab"))
                    }
                })))
            }, w.prototype.triggerPosterClick = function () {
                var t = this;
                this.$inner.on("click.lg", (function (e) {
                    !t.dragOrSwipeEnabled && t.isPosterElement(x(e.target)) && t.LGel.trigger(u)
                }))
            }, w.prototype.manageSwipeClass = function () {
                var t = this.index + 1,
                    e = this.index - 1;
                this.settings.loop && this.galleryItems.length > 2 && (0 === this.index ? e = this.galleryItems.length - 1 : this.index === this.galleryItems.length - 1 && (t = 0)), this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide"), e > -1 && this.getSlideItem(e).addClass("lg-prev-slide"), this.getSlideItem(t).addClass("lg-next-slide")
            }, w.prototype.goToNextSlide = function (t) {
                var e = this,
                    i = this.settings.loop;
                t && this.galleryItems.length < 3 && (i = !1), this.lgBusy || (this.index + 1 < this.galleryItems.length ? (this.index++, this.LGel.trigger(f, {
                    index: this.index
                }), this.slide(this.index, !!t, !1, "next")) : i ? (this.index = 0, this.LGel.trigger(f, {
                    index: this.index
                }), this.slide(this.index, !!t, !1, "next")) : this.settings.slideEndAnimation && !t && (this.outer.addClass("lg-right-end"), setTimeout((function () {
                    e.outer.removeClass("lg-right-end")
                }), 400)))
            }, w.prototype.goToPrevSlide = function (t) {
                var e = this,
                    i = this.settings.loop;
                t && this.galleryItems.length < 3 && (i = !1), this.lgBusy || (this.index > 0 ? (this.index--, this.LGel.trigger(v, {
                    index: this.index,
                    fromTouch: t
                }), this.slide(this.index, !!t, !1, "prev")) : i ? (this.index = this.galleryItems.length - 1, this.LGel.trigger(v, {
                    index: this.index,
                    fromTouch: t
                }), this.slide(this.index, !!t, !1, "prev")) : this.settings.slideEndAnimation && !t && (this.outer.addClass("lg-left-end"), setTimeout((function () {
                    e.outer.removeClass("lg-left-end")
                }), 400)))
            }, w.prototype.keyPress = function () {
                var t = this;
                x(window).on("keydown.lg.global" + this.lgId, (function (e) {
                    t.lgOpened && !0 === t.settings.escKey && 27 === e.keyCode && (e.preventDefault(), t.settings.allowMediaOverlap && t.outer.hasClass("lg-can-toggle") && t.outer.hasClass("lg-components-open") ? t.outer.removeClass("lg-components-open") : t.closeGallery()), t.lgOpened && t.galleryItems.length > 1 && (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()), 39 === e.keyCode && (e.preventDefault(), t.goToNextSlide()))
                }))
            }, w.prototype.arrow = function () {
                var t = this;
                this.getElementById("lg-prev").on("click.lg", (function () {
                    t.goToPrevSlide()
                })), this.getElementById("lg-next").on("click.lg", (function () {
                    t.goToNextSlide()
                }))
            }, w.prototype.arrowDisable = function (t) {
                if (!this.settings.loop && this.settings.hideControlOnEnd) {
                    var e = this.getElementById("lg-prev"),
                        i = this.getElementById("lg-next");
                    t + 1 === this.galleryItems.length ? i.attr("disabled", "disabled").addClass("disabled") : i.removeAttr("disabled").removeClass("disabled"), 0 === t ? e.attr("disabled", "disabled").addClass("disabled") : e.removeAttr("disabled").removeClass("disabled")
                }
            }, w.prototype.setTranslate = function (t, e, i, s, n) {
                void 0 === s && (s = 1), void 0 === n && (n = 1), t.css("transform", "translate3d(" + e + "px, " + i + "px, 0px) scale3d(" + s + ", " + n + ", 1)")
            }, w.prototype.mousewheel = function () {
                var t = this,
                    e = 0;
                this.outer.on("wheel.lg", (function (i) {
                    if (i.deltaY && !(t.galleryItems.length < 2)) {
                        i.preventDefault();
                        var s = (new Date).getTime();
                        s - e < 1e3 || (e = s, i.deltaY > 0 ? t.goToNextSlide() : i.deltaY < 0 && t.goToPrevSlide())
                    }
                }))
            }, w.prototype.isSlideElement = function (t) {
                return t.hasClass("lg-outer") || t.hasClass("lg-item") || t.hasClass("lg-img-wrap")
            }, w.prototype.isPosterElement = function (t) {
                var e = this.getSlideItem(this.index).find(".lg-video-play-button").get();
                return t.hasClass("lg-video-poster") || t.hasClass("lg-video-play-button") || e && e.contains(t.get())
            }, w.prototype.toggleMaximize = function () {
                var t = this;
                this.getElementById("lg-maximize").on("click.lg", (function () {
                    t.$container.toggleClass("lg-inline"), t.refreshOnResize()
                }))
            }, w.prototype.invalidateItems = function () {
                for (var t = 0; t < this.items.length; t++) {
                    var e = x(this.items[t]);
                    e.off("click.lgcustom-item-" + e.attr("data-lg-id"))
                }
            }, w.prototype.manageCloseGallery = function () {
                var t = this;
                if (this.settings.closable) {
                    var e = !1;
                    this.getElementById("lg-close").on("click.lg", (function () {
                        t.closeGallery()
                    })), this.settings.closeOnTap && (this.outer.on("mousedown.lg", (function (i) {
                        var s = x(i.target);
                        e = !!t.isSlideElement(s)
                    })), this.outer.on("mousemove.lg", (function () {
                        e = !1
                    })), this.outer.on("mouseup.lg", (function (i) {
                        var s = x(i.target);
                        t.isSlideElement(s) && e && (t.outer.hasClass("lg-dragging") || t.closeGallery())
                    })))
                }
            }, w.prototype.closeGallery = function (t) {
                var e = this;
                if (!this.lgOpened || !this.settings.closable && !t) return 0;
                this.LGel.trigger(y), x(window).scrollTop(this.prevScrollTop);
                var i, s = this.items[this.index];
                if (this.zoomFromOrigin && s) {
                    var n = this.mediaContainerPosition,
                        o = n.top,
                        r = n.bottom,
                        l = this.galleryItems[this.index],
                        a = l.__slideVideoInfo,
                        g = l.poster,
                        d = T(s, this.outer, o + r, a && g && this.settings.videoMaxSize);
                    i = E(s, this.outer, o, r, d)
                }
                this.zoomFromOrigin && i ? (this.outer.addClass("lg-closing lg-zoom-from-image"), this.getSlideItem(this.index).addClass("lg-start-end-progress").css("transition-duration", this.settings.startAnimationDuration + "ms").css("transform", i)) : (this.outer.addClass("lg-hide-items"), this.outer.removeClass("lg-zoom-from-image")), this.destroyModules(), this.lGalleryOn = !1, this.isDummyImageRemoved = !1, this.zoomFromOrigin = this.settings.zoomFromOrigin, clearTimeout(this.hideBarTimeout), this.hideBarTimeout = !1, x("html").removeClass("lg-on"), this.outer.removeClass("lg-visible lg-components-open"), this.$backdrop.removeClass("in").css("opacity", 0);
                var h = this.zoomFromOrigin && i ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
                return this.$container.removeClass("lg-show-in"), setTimeout((function () {
                    e.zoomFromOrigin && i && e.outer.removeClass("lg-zoom-from-image"), e.$container.removeClass("lg-show"), e.$backdrop.removeAttr("style").css("transition-duration", e.settings.backdropDuration + "ms"), e.outer.removeClass("lg-closing " + e.settings.startClass), e.getSlideItem(e.index).removeClass("lg-start-end-progress"), e.$inner.empty(), e.lgOpened && e.LGel.trigger(b, {
                        instance: e
                    }), e.outer.get() && e.outer.get().blur(), e.lgOpened = !1
                }), h + 100), h + 100
            }, w.prototype.initModules = function () {
                this.plugins.forEach((function (t) {
                    try {
                        t.init()
                    } catch (t) {
                        console.warn("lightGallery:- make sure lightGallery module is properly initiated")
                    }
                }))
            }, w.prototype.destroyModules = function (t) {
                this.plugins.forEach((function (e) {
                    try {
                        t ? e.destroy() : e.closeGallery && e.closeGallery()
                    } catch (t) {
                        console.warn("lightGallery:- make sure lightGallery module is properly destroyed")
                    }
                }))
            }, w.prototype.refresh = function (t) {
                this.settings.dynamic || this.invalidateItems(), this.galleryItems = t || this.getItems(), this.updateControls(), this.openGalleryOnItemClick(), this.LGel.trigger(o)
            }, w.prototype.updateControls = function () {
                this.addSlideVideoInfo(this.galleryItems), this.updateCounterTotal(), this.manageSingleSlideClassName()
            }, w.prototype.destroy = function () {
                var t = this,
                    e = this.closeGallery(!0);
                return setTimeout((function () {
                    t.destroyModules(!0), t.settings.dynamic || t.invalidateItems(), x(window).off(".lg.global" + t.lgId), t.LGel.off(".lg"), t.$container.remove()
                }), e), e
            }, w
        }();
    return function (t, e) {
        return new P(t, e)
    }
}));
// lg-video
! function (e, o) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define(o) : (e = "undefined" != typeof globalThis ? globalThis : e || self).lgVideo = o()
}(this, (function () {
    "use strict";
    var e = function () {
            return (e = Object.assign || function (e) {
                for (var o, i = 1, t = arguments.length; i < t; i++)
                    for (var s in o = arguments[i]) Object.prototype.hasOwnProperty.call(o, s) && (e[s] = o[s]);
                return e
            }).apply(this, arguments)
        },
        o = {
            autoplayFirstVideo: !0,
            youTubePlayerParams: !1,
            vimeoPlayerParams: !1,
            wistiaPlayerParams: !1,
            gotoNextSlideOnVideoEnd: !0,
            autoplayVideoOnSlide: !1,
            videojs: !1,
            videojsOptions: {}
        },
        i = "lgHasVideo",
        t = "lgSlideItemLoad",
        s = "lgBeforeSlide",
        n = "lgAfterSlide",
        l = "lgPosterClick",
        r = function (e) {
            return Object.keys(e).map((function (o) {
                return encodeURIComponent(o) + "=" + encodeURIComponent(e[o])
            })).join("&")
        };
    return function () {
        function d(i) {
            return this.core = i, this.settings = e(e({}, o), this.core.settings), this
        }
        return d.prototype.init = function () {
            var e = this;
            this.core.LGel.on(i + ".video", this.onHasVideo.bind(this)), this.core.LGel.on(l + ".video", (function () {
                var o = e.core.getSlideItem(e.core.index);
                e.loadVideoOnPosterClick(o)
            })), this.core.LGel.on(t + ".video", this.onSlideItemLoad.bind(this)), this.core.LGel.on(s + ".video", this.onBeforeSlide.bind(this)), this.core.LGel.on(n + ".video", this.onAfterSlide.bind(this))
        }, d.prototype.onSlideItemLoad = function (e) {
            var o = this,
                i = e.detail,
                t = i.isFirstSlide,
                s = i.index;
            this.settings.autoplayFirstVideo && t && s === this.core.index && setTimeout((function () {
                o.loadAndPlayVideo(s)
            }), 200), !t && this.settings.autoplayVideoOnSlide && s === this.core.index && this.loadAndPlayVideo(s)
        }, d.prototype.onHasVideo = function (e) {
            var o = e.detail,
                i = o.index,
                t = o.src,
                s = o.html5Video;
            o.hasPoster || (this.appendVideos(this.core.getSlideItem(i), {
                src: t,
                addClass: "lg-object",
                index: i,
                html5Video: s
            }), this.gotoNextSlideOnVideoEnd(t, i))
        }, d.prototype.onBeforeSlide = function (e) {
            if (this.core.lGalleryOn) {
                var o = e.detail.prevIndex;
                this.pauseVideo(o)
            }
        }, d.prototype.onAfterSlide = function (e) {
            var o = this,
                i = e.detail,
                t = i.index,
                s = i.prevIndex,
                n = this.core.getSlideItem(t);
            this.settings.autoplayVideoOnSlide && t !== s && n.hasClass("lg-complete") && setTimeout((function () {
                o.loadAndPlayVideo(t)
            }), 100)
        }, d.prototype.loadAndPlayVideo = function (e) {
            var o = this.core.getSlideItem(e);
            this.core.galleryItems[e].poster ? this.loadVideoOnPosterClick(o, !0) : this.playVideo(e)
        }, d.prototype.playVideo = function (e) {
            this.controlVideo(e, "play")
        }, d.prototype.pauseVideo = function (e) {
            this.controlVideo(e, "pause")
        }, d.prototype.getVideoHtml = function (e, o, i, t) {
            var s = "",
                n = this.core.galleryItems[i].__slideVideoInfo || {},
                l = this.core.galleryItems[i],
                d = l.title || l.alt;
            d = d ? 'title="' + d + '"' : "";
            var a = 'allowtransparency="true"\n            frameborder="0"\n            scrolling="no"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen';
            if (n.youtube) {
                var c = "lg-youtube" + i,
                    u = "?" + (n.youtube[2] ? n.youtube[2] + "&" : "") + "wmode=opaque&autoplay=0&mute=1&enablejsapi=1" + (this.settings.youTubePlayerParams ? "&" + r(this.settings.youTubePlayerParams) : "");
                s = '<iframe allow="autoplay" id=' + c + ' class="lg-video-object lg-youtube ' + o + '" ' + d + ' src="//www.youtube.com/embed/' + (n.youtube[1] + u) + '" ' + a + "></iframe>"
            } else if (n.vimeo) {
                c = "lg-vimeo" + i, u = function (e, o) {
                    if (!o || !o.vimeo) return "";
                    var i = o.vimeo[2] || "";
                    return i = "?" == i[0] ? "&" + i.slice(1) : i || "", "?autoplay=0&muted=1" + (e ? "&" + r(e) : "") + i
                }(this.settings.vimeoPlayerParams, n);
                s = '<iframe allow="autoplay" id=' + c + ' class="lg-video-object lg-vimeo ' + o + '" ' + d + ' src="//player.vimeo.com/video/' + (n.vimeo[1] + u) + '" ' + a + "></iframe>"
            } else if (n.wistia) {
                var f = "lg-wistia" + i;
                u = (u = r(this.settings.wistiaPlayerParams)) ? "?" + u : "", s = '<iframe allow="autoplay" id="' + f + '" src="//fast.wistia.net/embed/iframe/' + (n.wistia[4] + u) + '" ' + d + ' class="wistia_embed lg-video-object lg-wistia ' + o + '" name="wistia_embed" ' + a + "></iframe>"
            } else if (n.html5) {
                for (var h = "", y = 0; y < t.source.length; y++) h += '<source src="' + t.source[y].src + '" type="' + t.source[y].type + '">';
                if (t.tracks) {
                    var g = function (e) {
                        var o = "",
                            i = t.tracks[e];
                        Object.keys(i || {}).forEach((function (e) {
                            o += e + '="' + i[e] + '" '
                        })), h += "<track " + o + ">"
                    };
                    for (y = 0; y < t.tracks.length; y++) g(y)
                }
                var p = "",
                    v = t.attributes || {};
                Object.keys(v || {}).forEach((function (e) {
                    p += e + '="' + v[e] + '" '
                })), s = '<video class="lg-video-object lg-html5 ' + (this.settings.videojs ? "video-js" : "") + '" ' + p + ">\n                " + h + "\n                Your browser does not support HTML5 video.\n            </video>"
            }
            return s
        }, d.prototype.appendVideos = function (e, o) {
            var i, t = this.getVideoHtml(o.src, o.addClass, o.index, o.html5Video);
            e.find(".lg-video-cont").append(t);
            var s = e.find(".lg-video-object").first();
            if (o.html5Video && s.on("mousedown.lg.video", (function (e) {
                    e.stopPropagation()
                })), this.settings.videojs && (null === (i = this.core.galleryItems[o.index].__slideVideoInfo) || void 0 === i ? void 0 : i.html5)) try {
                return videojs(s.get(), this.settings.videojsOptions)
            } catch (e) {
                console.error("lightGallery:- Make sure you have included videojs")
            }
        }, d.prototype.gotoNextSlideOnVideoEnd = function (e, o) {
            var i = this,
                t = this.core.getSlideItem(o).find(".lg-video-object").first(),
                s = this.core.galleryItems[o].__slideVideoInfo || {};
            if (this.settings.gotoNextSlideOnVideoEnd)
                if (s.html5) t.on("ended", (function () {
                    i.core.goToNextSlide()
                }));
                else if (s.vimeo) try {
                new Vimeo.Player(t.get()).on("ended", (function () {
                    i.core.goToNextSlide()
                }))
            } catch (e) {
                console.error("lightGallery:- Make sure you have included //github.com/vimeo/player.js")
            } else if (s.wistia) try {
                window._wq = window._wq || [], window._wq.push({
                    id: t.attr("id"),
                    onReady: function (e) {
                        e.bind("end", (function () {
                            i.core.goToNextSlide()
                        }))
                    }
                })
            } catch (e) {
                console.error("lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js")
            }
        }, d.prototype.controlVideo = function (e, o) {
            var i = this.core.getSlideItem(e).find(".lg-video-object").first(),
                t = this.core.galleryItems[e].__slideVideoInfo || {};
            if (i.get())
                if (t.youtube) try {
                    i.get().contentWindow.postMessage('{"event":"command","func":"' + o + 'Video","args":""}', "*")
                } catch (e) {
                    console.error("lightGallery:- " + e)
                } else if (t.vimeo) try {
                    new Vimeo.Player(i.get())[o]()
                } catch (e) {
                    console.error("lightGallery:- Make sure you have included //github.com/vimeo/player.js")
                } else if (t.html5)
                    if (this.settings.videojs) try {
                        videojs(i.get())[o]()
                    } catch (e) {
                        console.error("lightGallery:- Make sure you have included videojs")
                    } else i.get()[o]();
                    else if (t.wistia) try {
                window._wq = window._wq || [], window._wq.push({
                    id: i.attr("id"),
                    onReady: function (e) {
                        e[o]()
                    }
                })
            } catch (e) {
                console.error("lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js")
            }
        }, d.prototype.loadVideoOnPosterClick = function (e, o) {
            var i = this;
            if (e.hasClass("lg-video-loaded")) o && this.playVideo(this.core.index);
            else if (e.hasClass("lg-has-video")) this.playVideo(this.core.index);
            else {
                e.addClass("lg-has-video");
                var t = void 0,
                    s = this.core.galleryItems[this.core.index].src,
                    n = this.core.galleryItems[this.core.index].video;
                n && (t = "string" == typeof n ? JSON.parse(n) : n);
                var l = this.appendVideos(e, {
                    src: s,
                    addClass: "",
                    index: this.core.index,
                    html5Video: t
                });
                this.gotoNextSlideOnVideoEnd(s, this.core.index);
                var r = e.find(".lg-object").first().get();
                e.find(".lg-video-cont").first().append(r), e.addClass("lg-video-loading"), l && l.ready((function () {
                    l.on("loadedmetadata", (function () {
                        i.onVideoLoadAfterPosterClick(e, i.core.index)
                    }))
                })), e.find(".lg-video-object").first().on("load.lg error.lg loadedmetadata.lg", (function () {
                    setTimeout((function () {
                        i.onVideoLoadAfterPosterClick(e, i.core.index)
                    }), 50)
                }))
            }
        }, d.prototype.onVideoLoadAfterPosterClick = function (e, o) {
            e.addClass("lg-video-loaded"), this.playVideo(o)
        }, d.prototype.destroy = function () {
            this.core.LGel.off(".lg.video"), this.core.LGel.off(".video")
        }, d
    }()
}));
/*! @vimeo/player v2.16.3 | (c) 2022 Vimeo | MIT License | https://github.com/vimeo/player.js */
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Vimeo = e.Vimeo || {}, e.Vimeo.Player = t())
}(this, function () {
    "use strict";

    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    var e = "undefined" != typeof global && "[object global]" === {}.toString.call(global);

    function i(e, t) {
        return 0 === e.indexOf(t.toLowerCase()) ? e : "".concat(t.toLowerCase()).concat(e.substr(0, 1).toUpperCase()).concat(e.substr(1))
    }

    function l(e) {
        return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e)
    }

    function u(e) {
        var t = 0 < arguments.length && void 0 !== e ? e : {},
            n = t.id,
            e = t.url,
            t = n || e;
        if (!t) throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
        if (e = t, !isNaN(parseFloat(e)) && isFinite(e) && Math.floor(e) == e) return "https://vimeo.com/".concat(t);
        if (l(t)) return t.replace("index.html", "index.html");
        if (n) throw new TypeError("“".concat(n, "” is not a valid video id."));
        throw new TypeError("“".concat(t, "” is not a vimeo.com url."))
    }
    var t = void 0 !== Array.prototype.indexOf,
        Player = "undefined" != typeof window && void 0 !== window.postMessage;
    if (!(e || t && Player)) throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
    var n, o, a = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function c() {
        if (void 0 === this) throw new TypeError("Constructor WeakMap requires 'new'");
        if (o(this, "_id", "_WeakMap_" + f() + "." + f()), 0 < arguments.length) throw new TypeError("WeakMap iterable is not supported")
    }

    function s(e, t) {
        if (!d(e) || !n.call(e, "_id")) throw new TypeError(t + " method called on incompatible receiver " + typeof e)
    }

    function f() {
        return Math.random().toString().substring(2)
    }

    function d(e) {
        return Object(e) === e
    }(Player = "undefined" != typeof self ? self : "undefined" != typeof window ? window : a).WeakMap || (n = Object.prototype.hasOwnProperty, Player.WeakMap = ((o = function (e, t, n) {
        Object.defineProperty ? Object.defineProperty(e, t, {
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n
    })(c.prototype, "delete", function (e) {
        if (s(this, "delete"), !d(e)) return !1;
        var t = e[this._id];
        return !(!t || t[0] !== e) && (delete e[this._id], !0)
    }), o(c.prototype, "get", function (e) {
        if (s(this, "get"), d(e)) {
            var t = e[this._id];
            return t && t[0] === e ? t[1] : void 0
        }
    }), o(c.prototype, "has", function (e) {
        if (s(this, "has"), !d(e)) return !1;
        var t = e[this._id];
        return !(!t || t[0] !== e)
    }), o(c.prototype, "set", function (e, t) {
        if (s(this, "set"), !d(e)) throw new TypeError("Invalid value used as weak map key");
        var n = e[this._id];
        return n && n[0] === e ? n[1] = t : o(e, this._id, [e, t]), this
    }), o(c, "_polyfill", !0), c));
    var h, m = (function (e) {
            var t, n, r;
            r = function () {
                var t, n, r, o, i, e = Object.prototype.toString,
                    a = "undefined" != typeof setImmediate ? function (e) {
                        return setImmediate(e)
                    } : setTimeout;
                try {
                    Object.defineProperty({}, "x", {}), t = function (e, t, n, r) {
                        return Object.defineProperty(e, t, {
                            value: n,
                            writable: !0,
                            configurable: !1 !== r
                        })
                    }
                } catch (e) {
                    t = function (e, t, n) {
                        return e[t] = n, e
                    }
                }

                function u(e, t) {
                    this.fn = e, this.self = t, this.next = void 0
                }

                function l(e, t) {
                    y.add(e, t), n = n || a(y.drain)
                }

                function c(e) {
                    var t, n = typeof e;
                    return "function" == typeof (t = null != e && ("object" == n || "function" == n) ? e.then : t) && t
                }

                function s() {
                    for (var e = 0; e < this.chain.length; e++) ! function (e, t, n) {
                        var r, o;
                        try {
                            !1 === t ? n.reject(e.msg) : (r = !0 === t ? e.msg : t.call(void 0, e.msg)) === n.promise ? n.reject(TypeError("Promise-chain cycle")) : (o = c(r)) ? o.call(r, n.resolve, n.reject) : n.resolve(r)
                        } catch (e) {
                            n.reject(e)
                        }
                    }(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
                    this.chain.length = 0
                }

                function f(e) {
                    var n, r = this;
                    if (!r.triggered) {
                        r.triggered = !0, r.def && (r = r.def);
                        try {
                            (n = c(e)) ? l(function () {
                                var t = new m(r);
                                try {
                                    n.call(e, function () {
                                        f.apply(t, arguments)
                                    }, function () {
                                        d.apply(t, arguments)
                                    })
                                } catch (e) {
                                    d.call(t, e)
                                }
                            }): (r.msg = e, r.state = 1, 0 < r.chain.length && l(s, r))
                        } catch (e) {
                            d.call(new m(r), e)
                        }
                    }
                }

                function d(e) {
                    var t = this;
                    t.triggered || (t.triggered = !0, (t = t.def ? t.def : t).msg = e, t.state = 2, 0 < t.chain.length && l(s, t))
                }

                function h(e, n, r, o) {
                    for (var t = 0; t < n.length; t++) ! function (t) {
                        e.resolve(n[t]).then(function (e) {
                            r(t, e)
                        }, o)
                    }(t)
                }

                function m(e) {
                    this.def = e, this.triggered = !1
                }

                function v(e) {
                    this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
                }

                function p(e) {
                    if ("function" != typeof e) throw TypeError("Not a function");
                    if (0 !== this.__NPO__) throw TypeError("Not a promise");
                    this.__NPO__ = 1;
                    var r = new v(this);
                    this.then = function (e, t) {
                        var n = {
                            success: "function" != typeof e || e,
                            failure: "function" == typeof t && t
                        };
                        return n.promise = new this.constructor(function (e, t) {
                            if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                            n.resolve = e, n.reject = t
                        }), r.chain.push(n), 0 !== r.state && l(s, r), n.promise
                    }, this.catch = function (e) {
                        return this.then(void 0, e)
                    };
                    try {
                        e.call(void 0, function (e) {
                            f.call(r, e)
                        }, function (e) {
                            d.call(r, e)
                        })
                    } catch (e) {
                        d.call(r, e)
                    }
                }
                var y = {
                        add: function (e, t) {
                            i = new u(e, t), o ? o.next = i : r = i, o = i, i = void 0
                        },
                        drain: function () {
                            var e = r;
                            for (r = o = n = void 0; e;) e.fn.call(e.self), e = e.next
                        }
                    },
                    g = t({}, "constructor", p, !1);
                return t(p.prototype = g, "__NPO__", 0, !1), t(p, "resolve", function (n) {
                    return n && "object" == typeof n && 1 === n.__NPO__ ? n : new this(function (e, t) {
                        if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                        e(n)
                    })
                }), t(p, "reject", function (n) {
                    return new this(function (e, t) {
                        if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                        t(n)
                    })
                }), t(p, "all", function (t) {
                    var a = this;
                    return "[object Array]" != e.call(t) ? a.reject(TypeError("Not an array")) : 0 === t.length ? a.resolve([]) : new a(function (n, e) {
                        if ("function" != typeof n || "function" != typeof e) throw TypeError("Not a function");
                        var r = t.length,
                            o = Array(r),
                            i = 0;
                        h(a, t, function (e, t) {
                            o[e] = t, ++i === r && n(o)
                        }, e)
                    })
                }), t(p, "race", function (t) {
                    var r = this;
                    return "[object Array]" != e.call(t) ? r.reject(TypeError("Not an array")) : new r(function (n, e) {
                        if ("function" != typeof n || "function" != typeof e) throw TypeError("Not a function");
                        h(r, t, function (e, t) {
                            n(t)
                        }, e)
                    })
                }), p
            }, (n = a)[t = "Promise"] = n[t] || r(), e.exports && (e.exports = n[t])
        }(h = {
            exports: {}
        }), h.exports),
        v = new WeakMap;

    function p(e, t, n) {
        var r = v.get(e.element) || {};
        t in r || (r[t] = []), r[t].push(n), v.set(e.element, r)
    }

    function y(e, t) {
        return (v.get(e.element) || {})[t] || []
    }

    function g(e, t, n) {
        var r = v.get(e.element) || {};
        if (!r[t]) return !0;
        if (!n) return r[t] = [], v.set(e.element, r), !0;
        n = r[t].indexOf(n);
        return -1 !== n && r[t].splice(n, 1), v.set(e.element, r), r[t] && 0 === r[t].length
    }
    var w = ["autopause", "autoplay", "background", "byline", "color", "controls", "dnt", "height", "id", "interactiveparams", "keyboard", "loop", "maxheight", "maxwidth", "muted", "playsinline", "portrait", "responsive", "speed", "texttrack", "title", "transparent", "url", "width"];

    function b(r, e) {
        return w.reduce(function (e, t) {
            var n = r.getAttribute("data-vimeo-".concat(t));
            return !n && "" !== n || (e[t] = "" === n ? 1 : n), e
        }, 1 < arguments.length && void 0 !== e ? e : {})
    }

    function k(e, t) {
        var n = e.html;
        if (!t) throw new TypeError("An element must be provided");
        if (null !== t.getAttribute("data-vimeo-initialized")) return t.querySelector("iframe");
        e = document.createElement("div");
        return e.innerHTML = n, t.appendChild(e.firstChild), t.setAttribute("data-vimeo-initialized", "true"), t.querySelector("iframe")
    }

    function E(i, e, t) {
        var a = 1 < arguments.length && void 0 !== e ? e : {},
            u = 2 < arguments.length ? t : void 0;
        return new Promise(function (t, n) {
            if (!l(i)) throw new TypeError("“".concat(i, "” is not a vimeo.com url."));
            var e, r = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(i));
            for (e in a) a.hasOwnProperty(e) && (r += "&".concat(e, "=").concat(encodeURIComponent(a[e])));
            var o = new("XDomainRequest" in window ? XDomainRequest : XMLHttpRequest);
            o.open("GET.html", r, !0), o.onload = function () {
                if (404 !== o.status)
                    if (403 !== o.status) try {
                        var e = JSON.parse(o.responseText);
                        if (403 === e.domain_status_code) return k(e, u), void n(new Error("“".concat(i, "” is not embeddable.")));
                        t(e)
                    } catch (e) {
                        n(e)
                    } else n(new Error("“".concat(i, "” is not embeddable.")));
                    else n(new Error("“".concat(i, "” was not found.")))
            }, o.onerror = function () {
                var e = o.status ? " (".concat(o.status, ")") : "";
                n(new Error("There was an error fetching the embed code from Vimeo".concat(e, ".")))
            }, o.send()
        })
    }

    function T(e) {
        function n(e) {
            "console" in window && console.error && console.error("There was an error creating an embed: ".concat(e))
        }
        e = 0 < arguments.length && void 0 !== e ? e : document, e = [].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"));
        e.forEach(function (t) {
            try {
                if (null !== t.getAttribute("data-vimeo-defer")) return;
                var e = b(t);
                E(u(e), e, t).then(function (e) {
                    return k(e, t)
                }).catch(n)
            } catch (e) {
                n(e)
            }
        })
    }

    function P(e) {
        if ("string" == typeof e) try {
            e = JSON.parse(e)
        } catch (e) {
            return console.warn(e), {}
        }
        return e
    }

    function _(e, t, n) {
        e.element.contentWindow && e.element.contentWindow.postMessage && (t = {
            method: t
        }, void 0 !== n && (t.value = n), 8 <= (n = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"))) && n < 10 && (t = JSON.stringify(t)), e.element.contentWindow.postMessage(t, e.origin))
    }

    function M(n, r) {
        var t, e, o, i, a = [];
        (r = P(r)).event ? ("error" === r.event && y(n, r.data.method).forEach(function (e) {
            var t = new Error(r.data.message);
            t.name = r.data.name, e.reject(t), g(n, r.data.method, e)
        }), a = y(n, "event:".concat(r.event)), t = r.data) : r.method && (e = n, o = r.method, (i = !((i = y(e, o)).length < 1) && (i = i.shift(), g(e, o, i), i)) && (a.push(i), t = r.value)), a.forEach(function (e) {
            try {
                if ("function" == typeof e) return void e.call(n, t);
                e.resolve(t)
            } catch (e) {}
        })
    }
    var N, F, x, C = new WeakMap,
        j = new WeakMap,
        A = {},
        Player = function () {
            function Player(i) {
                var e, a = this,
                    t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                if (! function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, Player), window.jQuery && i instanceof jQuery && (1 < i.length && window.console && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."), i = i[0]), "undefined" != typeof document && "string" == typeof i && (i = document.getElementById(i)), e = i, !Boolean(e && 1 === e.nodeType && "nodeName" in e && e.ownerDocument && e.ownerDocument.defaultView)) throw new TypeError("You must pass either a valid element or a valid id.");
                if ("IFRAME" === i.nodeName || (r = i.querySelector("iframe")) && (i = r), "IFRAME" === i.nodeName && !l(i.getAttribute("src") || "")) throw new Error("The player element passed isn’t a Vimeo embed.");
                if (C.has(i)) return C.get(i);
                this._window = i.ownerDocument.defaultView, this.element = i, this.origin = "*";
                var n, r = new m(function (r, o) {
                    var e;
                    a._onMessage = function (e) {
                        if (l(e.origin) && a.element.contentWindow === e.source) {
                            "*" === a.origin && (a.origin = e.origin);
                            var t = P(e.data);
                            if (t && "error" === t.event && t.data && "ready" === t.data.method) {
                                var n = new Error(t.data.message);
                                return n.name = t.data.name, void o(n)
                            }
                            e = t && "ready" === t.event, n = t && "ping" === t.method;
                            if (e || n) return a.element.setAttribute("data-ready", "true"), void r();
                            M(a, t)
                        }
                    }, a._window.addEventListener("message", a._onMessage), "IFRAME" !== a.element.nodeName && E(u(e = b(i, t)), e, i).then(function (e) {
                        var t, n, r = k(e, i);
                        return a.element = r, a._originalElement = i, t = i, n = r, r = v.get(t), v.set(n, r), v.delete(t), C.set(a.element, a), e
                    }).catch(o)
                });
                return j.set(this, r), C.set(this.element, this), "IFRAME" === this.element.nodeName && _(this, "ping"), A.isEnabled && (n = function () {
                    return A.exit()
                }, this.fullscreenchangeHandler = function () {
                    (A.isFullscreen ? p : g)(a, "event:exitFullscreen", n), a.ready().then(function () {
                        _(a, "fullscreenchange", A.isFullscreen)
                    })
                }, A.on("fullscreenchange", this.fullscreenchangeHandler)), this
            }
            var e, t, n;
            return e = Player, (t = [{
                key: "callMethod",
                value: function (n) {
                    var r = this,
                        o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                    return new m(function (e, t) {
                        return r.ready().then(function () {
                            p(r, n, {
                                resolve: e,
                                reject: t
                            }), _(r, n, o)
                        }).catch(t)
                    })
                }
            }, {
                key: "get",
                value: function (n) {
                    var r = this;
                    return new m(function (e, t) {
                        return n = i(n, "get"), r.ready().then(function () {
                            p(r, n, {
                                resolve: e,
                                reject: t
                            }), _(r, n)
                        }).catch(t)
                    })
                }
            }, {
                key: "set",
                value: function (n, r) {
                    var o = this;
                    return new m(function (e, t) {
                        if (n = i(n, "set"), null == r) throw new TypeError("There must be a value to set.");
                        return o.ready().then(function () {
                            p(o, n, {
                                resolve: e,
                                reject: t
                            }), _(o, n, r)
                        }).catch(t)
                    })
                }
            }, {
                key: "on",
                value: function (e, t) {
                    if (!e) throw new TypeError("You must pass an event name.");
                    if (!t) throw new TypeError("You must pass a callback function.");
                    if ("function" != typeof t) throw new TypeError("The callback must be a function.");
                    0 === y(this, "event:".concat(e)).length && this.callMethod("addEventListener", e).catch(function () {}), p(this, "event:".concat(e), t)
                }
            }, {
                key: "off",
                value: function (e, t) {
                    if (!e) throw new TypeError("You must pass an event name.");
                    if (t && "function" != typeof t) throw new TypeError("The callback must be a function.");
                    g(this, "event:".concat(e), t) && this.callMethod("removeEventListener", e).catch(function (e) {})
                }
            }, {
                key: "loadVideo",
                value: function (e) {
                    return this.callMethod("loadVideo", e)
                }
            }, {
                key: "ready",
                value: function () {
                    var e = j.get(this) || new m(function (e, t) {
                        t(new Error("Unknown player. Probably unloaded."))
                    });
                    return m.resolve(e)
                }
            }, {
                key: "addCuePoint",
                value: function (e) {
                    return this.callMethod("addCuePoint", {
                        time: e,
                        data: 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
                    })
                }
            }, {
                key: "removeCuePoint",
                value: function (e) {
                    return this.callMethod("removeCuePoint", e)
                }
            }, {
                key: "enableTextTrack",
                value: function (e, t) {
                    if (!e) throw new TypeError("You must pass a language.");
                    return this.callMethod("enableTextTrack", {
                        language: e,
                        kind: t
                    })
                }
            }, {
                key: "disableTextTrack",
                value: function () {
                    return this.callMethod("disableTextTrack")
                }
            }, {
                key: "pause",
                value: function () {
                    return this.callMethod("pause")
                }
            }, {
                key: "play",
                value: function () {
                    return this.callMethod("play")
                }
            }, {
                key: "requestFullscreen",
                value: function () {
                    return A.isEnabled ? A.request(this.element) : this.callMethod("requestFullscreen")
                }
            }, {
                key: "exitFullscreen",
                value: function () {
                    return A.isEnabled ? A.exit() : this.callMethod("exitFullscreen")
                }
            }, {
                key: "getFullscreen",
                value: function () {
                    return A.isEnabled ? m.resolve(A.isFullscreen) : this.get("fullscreen")
                }
            }, {
                key: "requestPictureInPicture",
                value: function () {
                    return this.callMethod("requestPictureInPicture")
                }
            }, {
                key: "exitPictureInPicture",
                value: function () {
                    return this.callMethod("exitPictureInPicture")
                }
            }, {
                key: "getPictureInPicture",
                value: function () {
                    return this.get("pictureInPicture")
                }
            }, {
                key: "unload",
                value: function () {
                    return this.callMethod("unload")
                }
            }, {
                key: "destroy",
                value: function () {
                    var n = this;
                    return new m(function (e) {
                        var t;
                        j.delete(n), C.delete(n.element), n._originalElement && (C.delete(n._originalElement), n._originalElement.removeAttribute("data-vimeo-initialized")), n.element && "IFRAME" === n.element.nodeName && n.element.parentNode && (n.element.parentNode.parentNode && n._originalElement && n._originalElement !== n.element.parentNode ? n.element.parentNode.parentNode.removeChild(n.element.parentNode) : n.element.parentNode.removeChild(n.element)), n.element && "DIV" === n.element.nodeName && n.element.parentNode && (n.element.removeAttribute("data-vimeo-initialized"), (t = n.element.querySelector("iframe")) && t.parentNode && (t.parentNode.parentNode && n._originalElement && n._originalElement !== t.parentNode ? t.parentNode.parentNode.removeChild(t.parentNode) : t.parentNode.removeChild(t))), n._window.removeEventListener("message", n._onMessage), A.isEnabled && A.off("fullscreenchange", n.fullscreenchangeHandler), e()
                    })
                }
            }, {
                key: "getAutopause",
                value: function () {
                    return this.get("autopause")
                }
            }, {
                key: "setAutopause",
                value: function (e) {
                    return this.set("autopause", e)
                }
            }, {
                key: "getBuffered",
                value: function () {
                    return this.get("buffered")
                }
            }, {
                key: "getCameraProps",
                value: function () {
                    return this.get("cameraProps")
                }
            }, {
                key: "setCameraProps",
                value: function (e) {
                    return this.set("cameraProps", e)
                }
            }, {
                key: "getChapters",
                value: function () {
                    return this.get("chapters")
                }
            }, {
                key: "getCurrentChapter",
                value: function () {
                    return this.get("currentChapter")
                }
            }, {
                key: "getColor",
                value: function () {
                    return this.get("color")
                }
            }, {
                key: "setColor",
                value: function (e) {
                    return this.set("color", e)
                }
            }, {
                key: "getCuePoints",
                value: function () {
                    return this.get("cuePoints")
                }
            }, {
                key: "getCurrentTime",
                value: function () {
                    return this.get("currentTime")
                }
            }, {
                key: "setCurrentTime",
                value: function (e) {
                    return this.set("currentTime", e)
                }
            }, {
                key: "getDuration",
                value: function () {
                    return this.get("duration")
                }
            }, {
                key: "getEnded",
                value: function () {
                    return this.get("ended")
                }
            }, {
                key: "getLoop",
                value: function () {
                    return this.get("loop")
                }
            }, {
                key: "setLoop",
                value: function (e) {
                    return this.set("loop", e)
                }
            }, {
                key: "setMuted",
                value: function (e) {
                    return this.set("muted", e)
                }
            }, {
                key: "getMuted",
                value: function () {
                    return this.get("muted")
                }
            }, {
                key: "getPaused",
                value: function () {
                    return this.get("paused")
                }
            }, {
                key: "getPlaybackRate",
                value: function () {
                    return this.get("playbackRate")
                }
            }, {
                key: "setPlaybackRate",
                value: function (e) {
                    return this.set("playbackRate", e)
                }
            }, {
                key: "getPlayed",
                value: function () {
                    return this.get("played")
                }
            }, {
                key: "getQualities",
                value: function () {
                    return this.get("qualities")
                }
            }, {
                key: "getQuality",
                value: function () {
                    return this.get("quality")
                }
            }, {
                key: "setQuality",
                value: function (e) {
                    return this.set("quality", e)
                }
            }, {
                key: "getSeekable",
                value: function () {
                    return this.get("seekable")
                }
            }, {
                key: "getSeeking",
                value: function () {
                    return this.get("seeking")
                }
            }, {
                key: "getTextTracks",
                value: function () {
                    return this.get("textTracks")
                }
            }, {
                key: "getVideoEmbedCode",
                value: function () {
                    return this.get("videoEmbedCode")
                }
            }, {
                key: "getVideoId",
                value: function () {
                    return this.get("videoId")
                }
            }, {
                key: "getVideoTitle",
                value: function () {
                    return this.get("videoTitle")
                }
            }, {
                key: "getVideoWidth",
                value: function () {
                    return this.get("videoWidth")
                }
            }, {
                key: "getVideoHeight",
                value: function () {
                    return this.get("videoHeight")
                }
            }, {
                key: "getVideoUrl",
                value: function () {
                    return this.get("videoUrl")
                }
            }, {
                key: "getVolume",
                value: function () {
                    return this.get("volume")
                }
            }, {
                key: "setVolume",
                value: function (e) {
                    return this.set("volume", e)
                }
            }]) && r(e.prototype, t), n && r(e, n), Player
        }();
    return e || (N = function () {
        for (var e, t = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ], n = 0, r = t.length, o = {}; n < r; n++)
            if ((e = t[n]) && e[1] in document) {
                for (n = 0; n < e.length; n++) o[t[0][n]] = e[n];
                return o
            } return !1
    }(), F = {
        fullscreenchange: N.fullscreenchange,
        fullscreenerror: N.fullscreenerror
    }, x = {
        request: function (o) {
            return new Promise(function (e, t) {
                function n() {
                    x.off("fullscreenchange", n), e()
                }
                x.on("fullscreenchange", n);
                var r = (o = o || document.documentElement)[N.requestFullscreen]();
                r instanceof Promise && r.then(n).catch(t)
            })
        },
        exit: function () {
            return new Promise(function (t, e) {
                var n, r;
                x.isFullscreen ? (n = function e() {
                    x.off("fullscreenchange", e), t()
                }, x.on("fullscreenchange", n), (r = document[N.exitFullscreen]()) instanceof Promise && r.then(n).catch(e)) : t()
            })
        },
        on: function (e, t) {
            e = F[e];
            e && document.addEventListener(e, t)
        },
        off: function (e, t) {
            e = F[e];
            e && document.removeEventListener(e, t)
        }
    }, Object.defineProperties(x, {
        isFullscreen: {
            get: function () {
                return Boolean(document[N.fullscreenElement])
            }
        },
        element: {
            enumerable: !0,
            get: function () {
                return document[N.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function () {
                return Boolean(document[N.fullscreenEnabled])
            }
        }
    }), A = x, T(), function (e) {
        var r = 0 < arguments.length && void 0 !== e ? e : document;
        window.VimeoPlayerResizeEmbeds_ || (window.VimeoPlayerResizeEmbeds_ = !0, window.addEventListener("message", function (e) {
            if (l(e.origin) && e.data && "spacechange" === e.data.event)
                for (var t = r.querySelectorAll("iframe"), n = 0; n < t.length; n++)
                    if (t[n].contentWindow === e.source) {
                        t[n].parentElement.style.paddingBottom = "".concat(e.data.data[0].bottom, "px");
                        break
                    }
        }))
    }()), Player
});
/** lightgallery | 2.5.0-beta.2 | March 6th 2022 */
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).lgShare = e()
}(this, (function () {
    "use strict";
    var t = function () {
        return (t = Object.assign || function (t) {
            for (var e, r = 1, o = arguments.length; r < o; r++)
                for (var n in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t
        }).apply(this, arguments)
    };

    function e() {
        for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
        var o = Array(t),
            n = 0;
        for (e = 0; e < r; e++)
            for (var i = arguments[e], s = 0, a = i.length; s < a; s++, n++) o[n] = i[s];
        return o
    }
    var r = {
        share: !0,
        facebook: !0,
        facebookDropdownText: "Facebook",
        twitter: !0,
        twitterDropdownText: "Twitter",
        pinterest: !0,
        pinterestDropdownText: "Pinterest",
        additionalShareOptions: [],
        sharePluginStrings: {
            share: "Share"
        }
    };

    function o(t) {
        return "//www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(t.facebookShareUrl || window.location.href)
    }

    function n(t) {
        var e = encodeURIComponent(t.twitterShareUrl || window.location.href);
        return "//twitter.com/intent/tweet?text=" + t.tweetText + "&url=" + e
    }

    function i(t) {
        var e = t.pinterestText,
            r = encodeURIComponent(t.src);
        return "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(t.pinterestShareUrl || window.location.href) + "&media=" + r + "&description=" + e
    }
    var s = "lgAfterSlide";
    return function () {
        function a(e) {
            return this.shareOptions = [], this.core = e, this.settings = t(t({}, r), this.core.settings), this
        }
        return a.prototype.init = function () {
            this.settings.share && (this.shareOptions = e(this.getDefaultShareOptions(), this.settings.additionalShareOptions), this.setLgShareMarkup(), this.core.outer.find(".lg-share .lg-dropdown").append(this.getShareListHtml()), this.core.LGel.on(s + ".share", this.onAfterSlide.bind(this)))
        }, a.prototype.getShareListHtml = function () {
            var t = "";
            return this.shareOptions.forEach((function (e) {
                t += e.dropdownHTML
            })), t
        }, a.prototype.setLgShareMarkup = function () {
            var t = this;
            this.core.$toolbar.append('<button type="button" aria-label="' + this.settings.sharePluginStrings.share + '" aria-haspopup="true" aria-expanded="false" class="lg-share lg-icon">\n                <ul class="lg-dropdown" style="position: absolute;"></ul></button>'), this.core.outer.append('<div class="lg-dropdown-overlay"></div>'), this.core.outer.find(".lg-share").first().on("click.lg", (function () {
                t.core.outer.toggleClass("lg-dropdown-active"), t.core.outer.hasClass("lg-dropdown-active") ? t.core.outer.attr("aria-expanded", !0) : t.core.outer.attr("aria-expanded", !1)
            })), this.core.outer.find(".lg-dropdown-overlay").first().on("click.lg", (function () {
                t.core.outer.removeClass("lg-dropdown-active"), t.core.outer.attr("aria-expanded", !1)
            }))
        }, a.prototype.onAfterSlide = function (t) {
            var e = this,
                r = t.detail.index,
                o = this.core.galleryItems[r];
            setTimeout((function () {
                e.shareOptions.forEach((function (t) {
                    var r = t.selector;
                    e.core.outer.find(r).attr("href", t.generateLink(o))
                }))
            }), 100)
        }, a.prototype.getShareListItemHTML = function (t, e) {
            return '<li><a class="lg-share-' + t + '" rel="noopener" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + e + "</span></a></li>"
        }, a.prototype.getDefaultShareOptions = function () {
            return e(this.settings.facebook ? [{
                type: "facebook",
                generateLink: o,
                dropdownHTML: this.getShareListItemHTML("facebook", this.settings.facebookDropdownText),
                selector: ".lg-share-facebook"
            }] : [], this.settings.twitter ? [{
                type: "twitter",
                generateLink: n,
                dropdownHTML: this.getShareListItemHTML("twitter", this.settings.twitterDropdownText),
                selector: ".lg-share-twitter"
            }] : [], this.settings.pinterest ? [{
                type: "pinterest",
                generateLink: i,
                dropdownHTML: this.getShareListItemHTML("pinterest", this.settings.pinterestDropdownText),
                selector: ".lg-share-pinterest"
            }] : [])
        }, a.prototype.destroy = function () {
            this.core.outer.find(".lg-dropdown-overlay").remove(), this.core.outer.find(".lg-share").remove(), this.core.LGel.off(".lg.share"), this.core.LGel.off(".share")
        }, a
    }()
}));
! function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, n) {
            var o, s = "$()." + i + '("' + e + '")';
            return t.each(function (t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, n);
                o = void 0 === o ? l : o
            }), void 0 !== o ? o : t
        }

        function h(t, e) {
            t.each(function (t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new s(n, e), a.data(n, i, o))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function (t) {
            if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var o = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function () {} : function (t) {
            s.error(t)
        };
    return n(e || t.jQuery), i
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t]; o;) {
                var r = s && s[o];
                r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t
}),
function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = -1 == t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; h > e; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function o() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            s.isBoxSizeOuter = r = 200 == t(o.width), i.removeChild(e)
        }
    }

    function s(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = n(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; h > l; l++) {
                var f = u[l],
                    c = s[f],
                    m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight,
                y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                I = a.borderTopWidth + a.borderBottomWidth,
                z = d && r,
                x = t(s.width);
            x !== !1 && (a.width = x + (z ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        },
        u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = u.length,
        d = !1;
    return s
}),
function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
    "use strict";
    var t = function () {
        var t = Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i],
                o = n + "MatchesSelector";
            if (t[o]) return o
        }
    }();
    return function (e, i) {
        return e[t](i)
    }
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
    var i = {};
    i.extend = function (t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function (t, e) {
        return (t % e + e) % e
    }, i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }, i.removeFrom = function (t, e) {
        var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
    }, i.getParent = function (t, i) {
        for (; t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function (t) {
            if (t instanceof HTMLElement) {
                if (!n) return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++) o.push(i[s])
            }
        }), o
    }, i.debounceMethod = function (t, e, i) {
        var n = t.prototype[e],
            o = e + "Timeout";
        t.prototype[e] = function () {
            var t = this[o];
            t && clearTimeout(t);
            var e = arguments,
                s = this;
            this[o] = setTimeout(function () {
                n.apply(s, e), delete s[o]
            }, i || 100)
        }
    }, i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? t() : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function (t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function (e, o) {
        i.docReady(function () {
            var s = i.toDashed(o),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options",
                l = t.jQuery;
            h.forEach(function (t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var u = new e(t, i);
                l && l.data(t, o, u)
            })
        })
    }, i
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function (t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function o(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        } [r],
        h = {
            transform: a,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function () {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function () {
        this.size = e(this.element)
    }, d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
            var n = h[i] || i;
            e[n] = t[i]
        }
    }, d.getPosition = function () {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            n = t[e ? "left" : "right"],
            o = t[i ? "top" : "bottom"],
            s = this.layout.size,
            r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.width : parseInt(n, 10),
            a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.height : parseInt(o, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, d.layoutPosition = function () {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"),
            o = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[o];
        e[s] = this.getXValue(a), e[r] = "";
        var u = n ? "paddingTop" : "paddingBottom",
            h = n ? "top" : "bottom",
            d = n ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
            n = this.position.y,
            o = parseInt(t, 10),
            s = parseInt(e, 10),
            r = o === this.position.x && s === this.position.y;
        if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i,
            u = e - n,
            h = {};
        h.transform = this.getTranslate(a, u), this.transition({
            to: h,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop");
        return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var n = this.element.offsetHeight;
            n = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + o(a);
    d.enableTransition = function () {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(u, this, !1)
        }
    }, d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function (t) {
        this.ontransitionend(t)
    };
    var f = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function (t) {
        if (t.target === this.element) {
            var e = this._transn,
                n = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                var o = e.onEnd[n];
                o.call(this), delete e.onEnd[n]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function () {
        this.css(c)
    }, d.stagger = function (t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, d.remove = function () {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function () {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function () {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function () {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, d.destroy = function () {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, n
}),
function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, s) {
        return e(t, i, n, o, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function (t, e, i, n, o) {
    "use strict";

    function s(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
        var o = ++l;
        this.element.outlayerGUID = o, f[o] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var o = m[n] || 1;
        return i * o
    }
    var u = t.console,
        h = t.jQuery,
        d = function () {},
        l = 0,
        f = {};
    s.namespace = "outlayer", s.Item = o, s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var c = s.prototype;
    n.extend(c, e.prototype), c.option = function (t) {
        n.extend(this.options, t)
    }, c._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, c.reloadItems = function () {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function (t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var s = e[o],
                r = new i(s, this);
            n.push(r)
        }
        return n
    }, c._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }, c.getItemElements = function () {
        return this.items.map(function (t) {
            return t.element
        })
    }, c.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function () {
        this.getSize()
    }, c.getSize = function () {
        this.size = i(this.element)
    }, c._getMeasurement = function (t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
    }, c.layoutItems = function (t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, c._getItemsForLayout = function (t) {
        return t.filter(function (t) {
            return !t.isIgnored
        })
    }, c._layoutItems = function (t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function (t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function () {
        return {
            x: 0,
            y: 0
        }
    }, c._processLayoutQueue = function (t) {
        this.updateStagger(), t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, c.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, c._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, c._postLayout = function () {
        this.resizeContainer()
    }, c.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, c._emitCompleteOnItems = function (t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [e])
        }

        function n() {
            r++, r == s && i()
        }
        var o = this,
            s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function (e) {
            e.once(t, n)
        })
    }, c.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), h)
            if (this.$element = this.$element || h(this.element), e) {
                var o = h.Event(e);
                o.type = t, this.$element.trigger(o, i)
            } else this.$element.trigger(t, i)
    }, c.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, c.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, c.stamp = function (t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, c.unstamp = function (t) {
        t = this._find(t), t && t.forEach(function (t) {
            n.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, c._find = function (t) {
        return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
    }, c._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
            n = this._boundingRect,
            o = i(t),
            s = {
                left: e.left - n.left - o.marginLeft,
                top: e.top - n.top - o.marginTop,
                right: n.right - e.right - o.marginRight,
                bottom: n.bottom - e.bottom - o.marginBottom
            };
        return s
    }, c.handleEvent = n.handleEvent, c.bindResize = function () {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function () {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function () {
        this.resize()
    }, n.debounceMethod(s, "onresize", 100), c.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function () {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, c.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, c.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, c.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, c.reveal = function (t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, c.hide = function (t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, c.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, c.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e)
    }, c.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, c.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, c.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
            t.remove(), n.removeFrom(this.items, t)
        }, this)
    }, c.destroy = function () {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, s.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e]
    }, s.create = function (t, e) {
        var i = r(s);
        return i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(o), n.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return s.Item = o, s
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function (t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        n = i._create;
    i._create = function () {
        this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
    }, i.updateSortData = function () {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var n = e[i];
                this.sortData[i] = n(this.element, this)
            }
        }
    };
    var o = i.destroy;
    return i.destroy = function () {
        o.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function (t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var n = i.prototype,
        o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return o.forEach(function (t) {
        n[t] = function () {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), n.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, n._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments)
    }, n.getColumnWidth = function () {
        this.getSegmentSize("column", "Width")
    }, n.getRowHeight = function () {
        this.getSegmentSize("row", "Height")
    }, n.getSegmentSize = function (t, e) {
        var i = t + e,
            n = "outer" + e;
        if (this._getMeasurement(i, n), !this[i]) {
            var o = this.getFirstItemSize();
            this[i] = o && o[n] || this.isotope.size["inner" + e]
        }
    }, n.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, n.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments)
    }, n.getSize = function () {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function (t, e) {
        function o() {
            i.apply(this, arguments)
        }
        return o.prototype = Object.create(n), o.prototype.constructor = o, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
    }, i
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function (t, e) {
    var i = t.create("masonry");
    return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0
    }, i.prototype.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter,
            o = this.containerWidth + this.gutter,
            s = o / n,
            r = n - o % n,
            a = r && 1 > r ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, i.prototype.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            n = e(i);
        this.containerWidth = n && n.innerWidth
    }, i.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && 1 > e ? "round" : "ceil",
            n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var o = this._getColGroup(n), s = Math.min.apply(Math, o), r = o.indexOf(s), a = {
                x: this.columnWidth * r,
                y: s
            }, u = s + t.size.outerHeight, h = this.cols + 1 - o.length, d = 0; h > d; d++) this.colYs[r + d] = u;
        return a
    }, i.prototype._getColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
            var o = this.colYs.slice(n, n + t);
            e[n] = Math.max.apply(Math, o)
        }
        return e
    }, i.prototype._manageStamp = function (t) {
        var i = e(t),
            n = this._getElementOffset(t),
            o = this._getOption("originLeft"),
            s = o ? n.left : n.right,
            r = s + i.outerWidth,
            a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? n.top : n.bottom) + i.outerHeight, l = a; u >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, i.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, i.prototype._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, i.prototype.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"),
        n = i.prototype,
        o = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var s in e.prototype) o[s] || (n[s] = e.prototype[s]);
    var r = n.measureColumns;
    n.measureColumns = function () {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var a = n._getOption;
    return n._getOption = function (t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function () {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var n = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
    }, i._getContainerSize = function () {
        return {
            height: this.maxY
        }
    }, e
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        i = e.prototype;
    return i._resetLayout = function () {
        this.y = 0
    }, i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, i._getContainerSize = function () {
        return {
            height: this.y
        }
    }, e
}),
function (t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (i, n, o, s, r, a) {
        return e(t, i, n, o, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function (t, e, i, n, o, s, r) {
    function a(t, e) {
        return function (i, n) {
            for (var o = 0; o < t.length; o++) {
                var s = t[o],
                    r = i.sortData[s],
                    a = n.sortData[s];
                if (r > a || a > r) {
                    var u = void 0 !== e[s] ? e[s] : e,
                        h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery,
        h = String.prototype.trim ? function (t) {
            return t.trim()
        } : function (t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        d = e.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function () {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in r.modes) this._initLayoutMode(t)
    }, l.reloadItems = function () {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, l._itemize = function () {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var n = t[i];
            n.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, l._initLayoutMode = function (t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, l.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, l._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, l.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, l._init = l.arrange, l._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, l._getIsInstant = function () {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, l._bindArrangeComplete = function () {
        function t() {
            e && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
        }
        var e, i, n, o = this;
        this.once("layoutComplete", function () {
            e = !0, t()
        }), this.once("hideComplete", function () {
            i = !0, t()
        }), this.once("revealComplete", function () {
            n = !0, t()
        })
    }, l._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? n.push(a) : u || a.isHidden || o.push(a)
            }
        }
        return {
            matches: i,
            needReveal: n,
            needHide: o
        }
    }, l._getFilterTest = function (t) {
        return u && this.options.isJQueryFiltering ? function (e) {
            return u(e.element).is(t)
        } : "function" == typeof t ? function (e) {
            return t(e.element)
        } : function (e) {
            return n(e.element, t)
        }
    }, l.updateSortData = function (t) {
        var e;
        t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, l._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }, l._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && e > i; i++) {
            var n = t[i];
            n.updateSortData()
        }
    };
    var f = function () {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "),
                n = i[0],
                o = n.match(/^\[(.+)\]$/),
                s = o && o[1],
                r = e(s, n),
                a = d.sortDataParsers[i[1]];
            return t = a ? function (t) {
                return t && a(r(t))
            } : function (t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function (e) {
                return e.getAttribute(t)
            } : function (t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }
        return t
    }();
    d.sortDataParsers = {
        parseInt: function (t) {
            return parseInt(t, 10)
        },
        parseFloat: function (t) {
            return parseFloat(t)
        }
    }, l._sort = function () {
        var t = this.options.sortBy;
        if (t) {
            var e = [].concat.apply(t, this.sortHistory),
                i = a(e, this.options.sortAscending);
            this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
        }
    }, l._mode = function () {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, l._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, l._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t)
    }, l._manageStamp = function (t) {
        this._mode()._manageStamp(t)
    }, l._getContainerSize = function () {
        return this._mode()._getContainerSize()
    }, l.needsResizeLayout = function () {
        return this._mode().needsResizeLayout()
    }, l.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, l.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, l._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, l.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, n, o = e.length;
            for (i = 0; o > i; i++) n = e[i], this.element.appendChild(n.element);
            var s = this._filter(e).matches;
            for (i = 0; o > i; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; o > i; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = l.remove;
    return l.remove = function (t) {
        t = o.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, n = 0; i && i > n; n++) {
            var s = e[n];
            o.removeFrom(this.filteredItems, s)
        }
    }, l.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, l._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return this.options.transitionDuration = i, n
    }, l.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
            return t.element
        })
    }, d
});
! function (Te, e, ke) {
    "use strict";
    var xe, De, Ae, Ee = "sly",
        qe = e.cancelAnimationFrame || e.cancelRequestAnimationFrame,
        Oe = e.requestAnimationFrame,
        Ne = Te(document),
        He = "touchstart." + Ee + " mousedown." + Ee,
        Xe = "mousemove." + Ee + " mouseup." + Ee,
        Ye = "touchmove." + Ee + " touchend." + Ee,
        Me = (document.implementation.hasFeature("Event.wheel", "3.0") ? "wheel." : "mousewheel.") + Ee,
        je = "click." + Ee,
        Fe = "mousedown." + Ee,
        Le = ["INPUT", "SELECT", "BUTTON", "TEXTAREA"],
        Re = [],
        We = Math.abs,
        Ue = Math.sqrt,
        $e = Math.pow,
        Qe = Math.round,
        Ze = Math.max,
        Ge = Math.min,
        Je = 0;

    function Ke(o, e, n) {
        if (!(this instanceof Ke)) return new Ke(o, e, n);
        var a, i, g = Te.extend({}, Ke.defaults, e),
            l = this,
            m = at(o),
            c = Te(o),
            y = g.slidee ? Te(g.slidee).eq(0) : c.children().eq(0),
            w = 0,
            I = 0,
            b = {
                start: 0,
                center: 0,
                end: 0,
                cur: 0,
                dest: 0
            },
            P = Te(g.scrollBar).eq(0),
            z = P.children().eq(0),
            C = 0,
            S = 0,
            B = {
                start: 0,
                end: 0,
                cur: 0
            },
            T = Te(g.pagesBar),
            k = 0,
            x = [],
            D = 0,
            A = [],
            E = {
                firstItem: 0,
                lastItem: 0,
                centerItem: 0,
                activeItem: null,
                activePage: 0
            },
            r = new rt(c[0]),
            s = new rt(y[0]),
            d = new rt(P[0]),
            u = new rt(z[0]),
            t = "basic" === g.itemNav,
            q = "forceCentered" === g.itemNav,
            O = "centered" === g.itemNav || q,
            N = !m && (t || O || q),
            f = g.scrollSource ? Te(g.scrollSource) : c,
            v = g.dragSource ? Te(g.dragSource) : c,
            h = Te(g.forward),
            p = Te(g.backward),
            H = Te(g.prev),
            X = Te(g.next),
            Y = Te(g.prevPage),
            M = Te(g.nextPage),
            j = {},
            F = {},
            L = {},
            R = {},
            W = {
                released: 1
            },
            U = {
                last: 0,
                delta: 0,
                resetTime: 200
            },
            $ = 0,
            Q = 0,
            Z = 0,
            G = 0;

        function J(e) {
            var t = x.length;
            if (b.old = Te.extend({}, b), w = m ? 0 : c[g.horizontal ? "width" : "height"](), C = P[g.horizontal ? "width" : "height"](), I = m ? o : y[g.horizontal ? "outerWidth" : "outerHeight"](), x.length = 0, b.start = 0, b.end = Ze(I - w, 0), N) {
                A.length, D = y.children(g.itemSelector), A.length = 0;
                var d, u = nt(y, g.horizontal ? "paddingLeft" : "paddingTop"),
                    f = nt(y, g.horizontal ? "paddingRight" : "paddingBottom"),
                    a = "border-box" === Te(D).css("boxSizing"),
                    v = "none" !== D.css("float"),
                    h = 0,
                    p = D.length - 1;
                I = 0, D.each(function (e, t) {
                    var a = Te(t),
                        n = t.getBoundingClientRect(),
                        i = Qe(g.horizontal ? n.width || n.right - n.left : n.height || n.bottom - n.top),
                        r = nt(a, g.horizontal ? "marginLeft" : "marginTop"),
                        s = nt(a, g.horizontal ? "marginRight" : "marginBottom"),
                        o = i + r + s,
                        l = !r || !s,
                        c = {};
                    c.el = t, c.size = l ? i : o, c.half = c.size / 2, c.start = I + (l ? r : 0), c.center = c.start - Qe(w / 2 - c.size / 2), c.end = c.start - w + c.size, e || (I += u), I += o, g.horizontal || v || s && r && 0 < e && (I -= Ge(r, s)), e === p && (c.end += f, I += f, h = l ? s : 0), A.push(c), d = c
                }), y[0].style[g.horizontal ? "width" : "height"] = (a ? I : I - u - f) + y.children().length + "px", I -= h, A.length ? (b.start = A[0][q ? "center" : "start"], b.end = q ? d.center : w < I ? d.end : b.start) : b.start = b.end = 0
            }
            if (b.center = Qe(b.end / 2 + b.start / 2), se(), z.length && 0 < C && (g.dynamicHandle ? (S = it(S = b.start === b.end ? C : Qe(C * w / I), g.minHandleSize, C), z[0].style[g.horizontal ? "width" : "height"] = S + "px") : S = z[g.horizontal ? "outerWidth" : "outerHeight"](), B.end = C - S, $ || _()), !m && 0 < w) {
                var n = b.start,
                    i = "";
                if (N) Te.each(A, function (e, t) {
                    q ? x.push(t.center) : t.start + t.size > n && n <= b.end && (n = t.start, x.push(n), (n += w) > b.end && n < b.end + w && x.push(b.end))
                });
                else
                    for (; n - w < b.end;) x.push(n), n += w;
                if (T[0] && t !== x.length) {
                    for (var r = 0; r < x.length; r++) i += g.pageBuilder.call(l, r);
                    (k = T.html(i).children()).eq(E.activePage).addClass(g.activeClass)
                }
            }
            if (E.slideeSize = I, E.frameSize = w, E.sbSize = C, E.handleSize = S, N) {
                e && null != g.startAt && (ie(g.startAt), l[O ? "toCenter" : "toStart"](g.startAt));
                var s = A[E.activeItem];
                K(O && s ? s.center : it(b.dest, b.start, b.end))
            } else e ? null != g.startAt && K(g.startAt, 1) : K(it(b.dest, b.start, b.end));
            Be("load")
        }

        function K(e, t, a) {
            if (N && W.released && !a) {
                var n = re(e),
                    i = e > b.start && e < b.end;
                O ? (i && (e = A[n.centerItem].center), q && g.activateMiddle && ie(n.centerItem)) : i && (e = A[n.firstItem].start)
            }
            W.init && W.slidee && g.elasticBounds ? e > b.end ? e = b.end + (e - b.end) / 6 : e < b.start && (e = b.start + (e - b.start) / 6) : e = it(e, b.start, b.end), L.start = +new Date, L.time = 0, L.from = b.cur, L.to = e, L.delta = e - b.cur, L.tweesing = W.tweese || W.init && !W.slidee, L.immediate = !L.tweesing && (t || W.init && W.slidee || !g.speed), W.tweese = 0, e !== b.dest && (b.dest = e, Be("change"), $ || V()), de(), se(), oe(), k[0] && F.page !== E.activePage && (F.page = E.activePage, k.removeClass(g.activeClass).eq(E.activePage).addClass(g.activeClass), Be("activePage", F.page))
        }

        function V() {
            if (l.initialized) {
                if (!$) return $ = Oe(V), void(W.released && Be("moveStart"));
                L.immediate ? b.cur = L.to : L.tweesing ? (L.tweeseDelta = L.to - b.cur, We(L.tweeseDelta) < .1 ? b.cur = L.to : b.cur += L.tweeseDelta * (W.released ? g.swingSpeed : g.syncSpeed)) : (L.time = Ge(+new Date - L.start, g.speed), b.cur = L.from + L.delta * Te.easing[g.easing](L.time / g.speed, L.time, 0, 1, g.speed)), L.to === b.cur ? (b.cur = L.to, W.tweese = $ = 0) : $ = Oe(V), Be("move"), m || (xe ? y[0].style[xe] = De + (g.horizontal ? "translateX" : "translateY") + "(" + -b.cur + "px)" : y[0].style[g.horizontal ? "left" : "top"] = -Qe(b.cur) + "px"), !$ && W.released && Be("moveEnd"), _()
            }
        }

        function _() {
            z.length && (B.cur = b.start === b.end ? 0 : ((W.init && !W.slidee ? b.dest : b.cur) - b.start) / (b.end - b.start) * B.end, B.cur = it(Qe(B.cur), B.start, B.end), F.hPos !== B.cur && (F.hPos = B.cur, xe ? z[0].style[xe] = De + (g.horizontal ? "translateX" : "translateY") + "(" + B.cur + "px)" : z[0].style[g.horizontal ? "left" : "top"] = B.cur + "px"))
        }

        function ee() {
            R.speed && b.cur !== (0 < R.speed ? b.end : b.start) || l.stop(), G = W.init ? Oe(ee) : 0, R.now = +new Date, R.pos = b.cur + (R.now - R.lastTime) / 1e3 * R.speed, K(W.init ? R.pos : Qe(R.pos)), W.init || b.cur !== b.dest || Be("moveEnd"), R.lastTime = R.now
        }

        function te(e, t, a) {
            if ("boolean" === Ve(t) && (a = t, t = ke), t === ke) K(b[e], a);
            else {
                if (O && "center" !== e) return;
                var n = l.getPos(t);
                n && K(n[e], a, !O)
            }
        }

        function ae(e) {
            return null != e ? at(e) ? 0 <= e && e < A.length ? e : -1 : D.index(e) : -1
        }

        function ne(e) {
            return ae(at(e) && e < 0 ? e + A.length : e)
        }

        function ie(e, t) {
            var a = ae(e);
            return !(!N || a < 0) && ((F.active !== a || t) && (D.eq(E.activeItem).removeClass(g.activeClass), D.eq(a).addClass(g.activeClass), F.active = E.activeItem = a, oe(), Be("active", a)), a)
        }

        function re(e) {
            e = it(at(e) ? e : b.dest, b.start, b.end);
            var t = {},
                a = q ? 0 : w / 2;
            if (!m)
                for (var n = 0, i = x.length; n < i; n++) {
                    if (e >= b.end || n === x.length - 1) {
                        t.activePage = x.length - 1;
                        break
                    }
                    if (e <= x[n] + a) {
                        t.activePage = n;
                        break
                    }
                }
            if (N) {
                for (var r = !1, s = !1, o = !1, l = 0, c = A.length; l < c; l++)
                    if (!1 === r && e <= A[l].start + A[l].half && (r = l), !1 === o && e <= A[l].center + A[l].half && (o = l), l === c - 1 || e <= A[l].end + A[l].half) {
                        s = l;
                        break
                    } t.firstItem = at(r) ? r : 0, t.centerItem = at(o) ? o : t.firstItem, t.lastItem = at(s) ? s : t.centerItem
            }
            return t
        }

        function se(e) {
            Te.extend(E, re(e))
        }

        function oe() {
            var e = b.dest <= b.start,
                t = b.dest >= b.end,
                a = (e ? 1 : 0) | (t ? 2 : 0);
            if (F.slideePosState !== a && (F.slideePosState = a, Y.is("button,input") && Y.prop("disabled", e), M.is("button,input") && M.prop("disabled", t), Y.add(p)[e ? "addClass" : "removeClass"](g.disabledClass), M.add(h)[t ? "addClass" : "removeClass"](g.disabledClass)), F.fwdbwdState !== a && W.released && (F.fwdbwdState = a, p.is("button,input") && p.prop("disabled", e), h.is("button,input") && h.prop("disabled", t)), N && null != E.activeItem) {
                var n = 0 === E.activeItem,
                    i = E.activeItem >= A.length - 1,
                    r = (n ? 1 : 0) | (i ? 2 : 0);
                F.itemsButtonState !== r && (F.itemsButtonState = r, H.is("button,input") && H.prop("disabled", n), X.is("button,input") && X.prop("disabled", i), H[n ? "addClass" : "removeClass"](g.disabledClass), X[i ? "addClass" : "removeClass"](g.disabledClass))
            }
        }

        function le(e, t, a) {
            if (e = ne(e), t = ne(t), -1 < e && -1 < t && e !== t && (!a || t !== e - 1) && (a || t !== e + 1)) {
                D.eq(e)[a ? "insertAfter" : "insertBefore"](A[t].el);
                var n = e < t ? e : a ? t : t - 1,
                    i = t < e ? e : a ? t + 1 : t,
                    r = t < e;
                null != E.activeItem && (e === E.activeItem ? F.active = E.activeItem = a ? r ? t + 1 : t : r ? t : t - 1 : E.activeItem > n && E.activeItem < i && (F.active = E.activeItem += r ? 1 : -1)), J()
            }
        }

        function ce(e, t) {
            for (var a = 0, n = j[e].length; a < n; a++)
                if (j[e][a] === t) return a;
            return -1
        }

        function de() {
            W.released && !l.isPaused && l.resume()
        }

        function ue(e) {
            return Qe(it(e, B.start, B.end) / B.end * (b.end - b.start)) + b.start
        }

        function fe() {
            W.history[0] = W.history[1], W.history[1] = W.history[2], W.history[2] = W.history[3], W.history[3] = W.delta
        }

        function ve(e) {
            W.released = 0, W.source = e, W.slidee = "slidee" === e
        }

        function he(e) {
            var t = "touchstart" === e.type,
                a = e.data.source,
                n = "slidee" === a;
            W.init || !t && me(e.target) || ("handle" !== a || g.dragHandle && B.start !== B.end) && (n && !(t ? g.touchDragging : g.mouseDragging && e.which < 2) || (t || _e(e), ve(a), W.init = 0, W.$source = Te(e.target), W.touch = t, W.pointer = t ? e.originalEvent.touches[0] : e, W.initX = W.pointer.pageX, W.initY = W.pointer.pageY, W.initPos = n ? b.cur : B.cur, W.start = +new Date, W.time = 0, W.path = 0, W.delta = 0, W.locked = 0, W.history = [0, 0, 0, 0], W.pathToLock = n ? t ? 30 : 10 : 0, Ne.on(t ? Ye : Xe, pe), l.pause(1), (n ? y : z).addClass(g.draggedClass), Be("moveStart"), n && (Q = setInterval(fe, 10))))
        }

        function pe(e) {
            if (W.released = "mouseup" === e.type || "touchend" === e.type, W.pointer = W.touch ? e.originalEvent[W.released ? "changedTouches" : "touches"][0] : e, W.pathX = W.pointer.pageX - W.initX, W.pathY = W.pointer.pageY - W.initY, W.path = Ue($e(W.pathX, 2) + $e(W.pathY, 2)), W.delta = g.horizontal ? W.pathX : W.pathY, W.released || !(W.path < 1)) {
                if (!W.init) {
                    if (W.path < g.dragThreshold) return W.released ? ge() : ke;
                    if (!(g.horizontal ? We(W.pathX) > We(W.pathY) : We(W.pathX) < We(W.pathY))) return ge();
                    W.init = 1
                }
                _e(e), !W.locked && W.path > W.pathToLock && W.slidee && (W.locked = 1, W.$source.on(je, et)), W.released && (ge(), g.releaseSwing && W.slidee && (W.swing = (W.delta - W.history[0]) / 40 * 300, W.delta += W.swing, W.tweese = 10 < We(W.swing))), K(W.slidee ? Qe(W.initPos - W.delta) : ue(W.initPos + W.delta))
            }
        }

        function ge() {
            clearInterval(Q), W.released = !0, Ne.off(W.touch ? Ye : Xe, pe), (W.slidee ? y : z).removeClass(g.draggedClass), setTimeout(function () {
                W.$source.off(je, et)
            }), b.cur === b.dest && W.init && Be("moveEnd"), l.resume(1), W.init = 0
        }

        function me(e) {
            return ~Te.inArray(e.nodeName, Le) || Te(e).is(g.interactive)
        }

        function ye() {
            l.stop(), Ne.off("mouseup", ye)
        }

        function we(e) {
            switch (_e(e), this) {
                case h[0]:
                case p[0]:
                    l.moveBy(h.is(this) ? g.moveBy : -g.moveBy), Ne.on("mouseup", ye);
                    break;
                case H[0]:
                    l.prev();
                    break;
                case X[0]:
                    l.next();
                    break;
                case Y[0]:
                    l.prevPage();
                    break;
                case M[0]:
                    l.nextPage()
            }
        }

        function Ie(e) {
            e.originalEvent[Ee] = l;
            var t = +new Date;
            if (Je + g.scrollHijack > t && f[0] !== document && f[0] !== window) Je = t;
            else if (g.scrollBy && b.start !== b.end) {
                var a, n = (a = e.originalEvent, U.curDelta = (g.horizontal ? a.deltaY || a.deltaX : a.deltaY) || -a.wheelDelta, U.curDelta /= 1 === a.deltaMode ? 3 : 100, N ? (Ae = +new Date, U.last < Ae - U.resetTime && (U.delta = 0), U.last = Ae, U.delta += U.curDelta, We(U.delta) < 1 ? U.finalDelta = 0 : (U.finalDelta = Qe(U.delta / 1), U.delta %= 1), U.finalDelta) : U.curDelta);
                (g.scrollTrap || 0 < n && b.dest < b.end || n < 0 && b.dest > b.start) && _e(e, 1), l.slideBy(g.scrollBy * n)
            }
        }

        function be(e) {
            g.clickBar && e.target === P[0] && (_e(e), K(ue((g.horizontal ? e.pageX - P.offset().left : e.pageY - P.offset().top) - S / 2)))
        }

        function Pe(e) {
            if (g.keyboardNavBy) switch (e.which) {
                case g.horizontal ? 37:
                    38: _e(e), l["pages" === g.keyboardNavBy ? "prevPage" : "prev"]();
                    break;
                case g.horizontal ? 39:
                    40: _e(e), l["pages" === g.keyboardNavBy ? "nextPage" : "next"]()
            }
        }

        function ze(e) {
            me(this) ? e.originalEvent[Ee + "ignore"] = !0 : this.parentNode !== y[0] || e.originalEvent[Ee + "ignore"] || l.activate(this)
        }

        function Ce() {
            this.parentNode === T[0] && l.activatePage(k.index(this))
        }

        function Se(e) {
            g.pauseOnHover && l["mouseenter" === e.type ? "pause" : "resume"](2)
        }

        function Be(e, t) {
            if (j[e]) {
                for (i = j[e].length, Re.length = 0, a = 0; a < i; a++) Re.push(j[e][a]);
                for (a = 0; a < i; a++) Re[a].call(l, e, t)
            }
        }
        m || (o = c[0]), l.initialized = 0, l.frame = o, l.slidee = y[0], l.pos = b, l.rel = E, l.items = A, l.pages = x, l.isPaused = 0, l.options = g, l.dragging = W, l.reload = function () {
            J()
        }, l.getPos = function (e) {
            if (N) {
                var t = ae(e);
                return -1 !== t && A[t]
            }
            var a = y.find(e).eq(0);
            if (a[0]) {
                var n = g.horizontal ? a.offset().left - y.offset().left : a.offset().top - y.offset().top,
                    i = a[g.horizontal ? "outerWidth" : "outerHeight"]();
                return {
                    start: n,
                    center: n - w / 2 + i / 2,
                    end: n - w + i,
                    size: i
                }
            }
            return !1
        }, l.moveBy = function (e) {
            R.speed = e, !W.init && R.speed && b.cur !== (0 < R.speed ? b.end : b.start) && (R.lastTime = +new Date, R.startPos = b.cur, ve("button"), W.init = 1, Be("moveStart"), qe(G), ee())
        }, l.stop = function () {
            "button" === W.source && (W.init = 0, W.released = 1)
        }, l.prev = function () {
            l.activate(null == E.activeItem ? 0 : E.activeItem - 1)
        }, l.next = function () {
            l.activate(null == E.activeItem ? 0 : E.activeItem + 1)
        }, l.prevPage = function () {
            l.activatePage(E.activePage - 1)
        }, l.nextPage = function () {
            l.activatePage(E.activePage + 1)
        }, l.slideBy = function (e, t) {
            e && (N ? l[O ? "toCenter" : "toStart"](it((O ? E.centerItem : E.firstItem) + g.scrollBy * e, 0, A.length)) : K(b.dest + e, t))
        }, l.slideTo = function (e, t) {
            K(e, t)
        }, l.toStart = function (e, t) {
            te("start", e, t)
        }, l.toEnd = function (e, t) {
            te("end", e, t)
        }, l.toCenter = function (e, t) {
            te("center", e, t)
        }, l.getIndex = ae, l.activate = function (e, t) {
            var a = ie(e);
            g.smart && !1 !== a && (O ? l.toCenter(a, t) : a >= E.lastItem ? l.toStart(a, t) : a <= E.firstItem ? l.toEnd(a, t) : de())
        }, l.activatePage = function (e, t) {
            at(e) && K(x[it(e, 0, x.length - 1)], t)
        }, l.resume = function (e) {
            g.cycleBy && g.cycleInterval && ("items" !== g.cycleBy || A[0] && null != E.activeItem) && !(e < l.isPaused) && (l.isPaused = 0, Z ? Z = clearTimeout(Z) : Be("resume"), Z = setTimeout(function () {
                switch (Be("cycle"), g.cycleBy) {
                    case "items":
                        l.activate(E.activeItem >= A.length - 1 ? 0 : E.activeItem + 1);
                        break;
                    case "pages":
                        l.activatePage(E.activePage >= x.length - 1 ? 0 : E.activePage + 1)
                }
            }, g.cycleInterval))
        }, l.pause = function (e) {
            e < l.isPaused || (l.isPaused = e || 100, Z && (Z = clearTimeout(Z), Be("pause")))
        }, l.toggle = function () {
            l[Z ? "pause" : "resume"]()
        }, l.set = function (e, t) {
            Te.isPlainObject(e) ? Te.extend(g, e) : g.hasOwnProperty(e) && (g[e] = t)
        }, l.add = function (e, t) {
            var a = Te(e);
            N ? (null == t || !A[0] || t >= A.length ? a.appendTo(y) : A.length && a.insertBefore(A[t].el), null != E.activeItem && t <= E.activeItem && (F.active = E.activeItem += a.length)) : y.append(a), J()
        }, l.remove = function (e) {
            if (N) {
                var t = ne(e);
                if (-1 < t) {
                    D.eq(t).remove();
                    var a = t === E.activeItem;
                    null != E.activeItem && t < E.activeItem && (F.active = --E.activeItem), J(), a && (F.active = null, l.activate(E.activeItem))
                }
            } else Te(e).remove(), J()
        }, l.moveAfter = function (e, t) {
            le(e, t, 1)
        }, l.moveBefore = function (e, t) {
            le(e, t)
        }, l.on = function (e, t) {
            if ("object" === Ve(e))
                for (var a in e) e.hasOwnProperty(a) && l.on(a, e[a]);
            else if ("function" === Ve(t))
                for (var n = e.split(" "), i = 0, r = n.length; i < r; i++) j[n[i]] = j[n[i]] || [], -1 === ce(n[i], t) && j[n[i]].push(t);
            else if ("array" === Ve(t))
                for (var s = 0, o = t.length; s < o; s++) l.on(e, t[s])
        }, l.one = function (t, a) {
            l.on(t, function e() {
                a.apply(l, arguments), l.off(t, e)
            })
        }, l.off = function (e, t) {
            if (t instanceof Array)
                for (var a = 0, n = t.length; a < n; a++) l.off(e, t[a]);
            else
                for (var i = e.split(" "), r = 0, s = i.length; r < s; r++)
                    if (j[i[r]] = j[i[r]] || [], null == t) j[i[r]].length = 0;
                    else {
                        var o = ce(i[r], t); - 1 !== o && j[i[r]].splice(o, 1)
                    }
        }, l.destroy = function () {
            return Ke.removeInstance(o), f.add(z).add(P).add(T).add(h).add(p).add(H).add(X).add(Y).add(M).off("." + Ee), Ne.off("keydown", Pe), H.add(X).add(Y).add(M).removeClass(g.disabledClass), D && null != E.activeItem && D.eq(E.activeItem).removeClass(g.activeClass), T.empty(), m || (c.off("." + Ee), r.restore(), s.restore(), d.restore(), u.restore(), Te.removeData(o, Ee)), A.length = x.length = 0, F = {}, l.initialized = 0, l
        }, l.init = function () {
            if (!l.initialized) {
                if (Ke.getInstance(o)) throw new Error("There is already a Sly instance on this element");
                Ke.storeInstance(o, l), l.on(n);
                var e = ["overflow", "position"],
                    t = ["position", "webkitTransform", "msTransform", "transform", "left", "top", "width", "height"];
                r.save.apply(r, e), d.save.apply(d, e), s.save.apply(s, t), u.save.apply(u, t);
                var a = z;
                return m || (a = a.add(y), c.css("overflow", "hidden"), xe || "static" !== c.css("position") || c.css("position", "relative")), xe ? De && a.css(xe, De) : ("static" === P.css("position") && P.css("position", "relative"), a.css({
                    position: "absolute"
                })), g.forward && h.on(Fe, we), g.backward && p.on(Fe, we), g.prev && H.on(je, we), g.next && X.on(je, we), g.prevPage && Y.on(je, we), g.nextPage && M.on(je, we), f.on(Me, Ie), P[0] && P.on(je, be), N && g.activateOn && c.on(g.activateOn + "." + Ee, "*", ze), T[0] && g.activatePageOn && T.on(g.activatePageOn + "." + Ee, "*", Ce), v.on(He, {
                    source: "slidee"
                }, he), z && z.on(He, {
                    source: "handle"
                }, he), Ne.on("keydown", Pe), m || (c.on("mouseenter." + Ee + " mouseleave." + Ee, Se), c.on("scroll." + Ee, tt)), l.initialized = 1, J(!0), g.cycleBy && !m && l[g.startPaused ? "pause" : "resume"](), l
            }
        }
    }

    function Ve(e) {
        return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase() || "object" : typeof e
    }

    function _e(e, t) {
        e.preventDefault(), t && e.stopPropagation()
    }

    function et(e) {
        _e(e, 1), Te(this).off(e.type, et)
    }

    function tt() {
        this.scrollLeft = 0, this.scrollTop = 0
    }

    function at(e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
    }

    function nt(e, t) {
        return 0 | Qe(String(e.css(t)).replace(/[^\-0-9.]/g, ""))
    }

    function it(e, t, a) {
        return e < t ? t : a < e ? a : e
    }

    function rt(t) {
        var a = {
            style: {},
            save: function () {
                if (t && t.nodeType) {
                    for (var e = 0; e < arguments.length; e++) a.style[arguments[e]] = t.style[arguments[e]];
                    return a
                }
            },
            restore: function () {
                if (t && t.nodeType) {
                    for (var e in a.style) a.style.hasOwnProperty(e) && (t.style[e] = a.style[e]);
                    return a
                }
            }
        };
        return a
    }
    Ne.on(Me, function (e) {
            var t = e.originalEvent[Ee],
                a = +new Date;
            (!t || t.options.scrollHijack < a - Je) && (Je = a)
        }), Ke.getInstance = function (e) {
            return Te.data(e, Ee)
        }, Ke.storeInstance = function (e, t) {
            return Te.data(e, Ee, t)
        }, Ke.removeInstance = function (e) {
            return Te.removeData(e, Ee)
        },
        function (t) {
            Oe = t.requestAnimationFrame || t.webkitRequestAnimationFrame || function (e) {
                var t = (new Date).getTime(),
                    a = Math.max(0, 16 - (t - i)),
                    n = setTimeout(e, a);
                return i = t, n
            };
            var i = (new Date).getTime();
            var a = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.clearTimeout;
            qe = function (e) {
                a.call(t, e)
            }
        }(window),
        function () {
            var i = ["", "Webkit", "Moz", "ms", "O"],
                r = document.createElement("div");

            function e(e) {
                for (var t = 0, a = i.length; t < a; t++) {
                    var n = i[t] ? i[t] + e.charAt(0).toUpperCase() + e.slice(1) : e;
                    if (null != r.style[n]) return n
                }
            }
            xe = e("transform"), De = e("perspective") ? "translateZ(0) " : ""
        }(), e.Sly = Ke, Te.fn.sly = function (n, i) {
            var r, s;
            return Te.isPlainObject(n) || ("string" !== Ve(n) && !1 !== n || (r = !1 === n ? "destroy" : n, s = Array.prototype.slice.call(arguments, 1)), n = {}), this.each(function (e, t) {
                var a = Ke.getInstance(t);
                a || r ? a && r && a[r] && a[r].apply(a, s) : a = new Ke(t, n, i).init()
            })
        }, Ke.defaults = {
            slidee: null,
            horizontal: !1,
            itemNav: null,
            itemSelector: null,
            smart: !1,
            activateOn: null,
            activateMiddle: !1,
            scrollSource: null,
            scrollBy: 0,
            scrollHijack: 300,
            scrollTrap: !1,
            dragSource: null,
            mouseDragging: !1,
            touchDragging: !1,
            releaseSwing: !1,
            swingSpeed: .2,
            elasticBounds: !1,
            dragThreshold: 3,
            interactive: null,
            scrollBar: null,
            dragHandle: !1,
            dynamicHandle: !1,
            minHandleSize: 50,
            clickBar: !1,
            syncSpeed: .5,
            pagesBar: null,
            activatePageOn: null,
            pageBuilder: function (e) {
                return "<li>" + (e + 1) + "</li>"
            },
            forward: null,
            backward: null,
            prev: null,
            next: null,
            prevPage: null,
            nextPage: null,
            cycleBy: null,
            cycleInterval: 5e3,
            pauseOnHover: !1,
            startPaused: !1,
            moveBy: 300,
            speed: 0,
            easing: "swing",
            startAt: null,
            keyboardNavBy: null,
            draggedClass: "dragged",
            activeClass: "active",
            disabledClass: "disabled"
        }
}(jQuery, window);
! function (t) {
    "use strict";
    var s = function (s, e) {
        this.el = t(s), this.options = t.extend({}, t.fn.typed.defaults, e), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    s.prototype = {
        constructor: s,
        init: function () {
            var t = this;
            t.timeout = setTimeout(function () {
                for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
            }, t.startDelay)
        },
        build: function () {
            var s = this;
            if (this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                this.strings = [], this.stringsElement.hide(), console.log(this.stringsElement.children());
                var e = this.stringsElement.children();
                t.each(e, function (e, i) {
                    s.strings.push(t(i).html())
                })
            }
            this.init()
        },
        typewrite: function (t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.typeSpeed,
                    i = this;
                i.timeout = setTimeout(function () {
                    var e = 0,
                        r = t.substr(s);
                    if ("^" === r.charAt(0)) {
                        var o = 1;
                        /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0], o += r.length, e = parseInt(r)), t = t.substring(0, s) + t.substring(s + o)
                    }
                    if ("html" === i.contentType) {
                        var n = t.substr(s).charAt(0);
                        if ("<" === n || "&" === n) {
                            var a = "",
                                h = "";
                            for (h = "<" === n ? ">" : ";"; t.substr(s + 1).charAt(0) !== h && (a += t.substr(s).charAt(0), s++, !(s + 1 > t.length)););
                            s++, a += h
                        }
                    }
                    i.timeout = setTimeout(function () {
                        if (s === t.length) {
                            if (i.options.onStringTyped(i.arrayPos), i.arrayPos === i.strings.length - 1 && (i.options.callback(), i.curLoop++, i.loop === !1 || i.curLoop === i.loopCount)) return;
                            i.timeout = setTimeout(function () {
                                i.backspace(t, s)
                            }, i.backDelay)
                        } else {
                            0 === s && i.options.preStringTyped(i.arrayPos);
                            var e = t.substr(0, s + 1);
                            i.attr ? i.el.attr(i.attr, e) : i.isInput ? i.el.val(e) : "html" === i.contentType ? i.el.html(e) : i.el.text(e), s++, i.typewrite(t, s)
                        }
                    }, e)
                }, e)
            }
        },
        backspace: function (t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.backSpeed,
                    i = this;
                i.timeout = setTimeout(function () {
                    if ("html" === i.contentType && ">" === t.substr(s).charAt(0)) {
                        for (var e = "";
                            "<" !== t.substr(s - 1).charAt(0) && (e -= t.substr(s).charAt(0), s--, !(0 > s)););
                        s--, e += "<"
                    }
                    var r = t.substr(0, s);
                    i.attr ? i.el.attr(i.attr, r) : i.isInput ? i.el.val(r) : "html" === i.contentType ? i.el.html(r) : i.el.text(r), s > i.stopNum ? (s--, i.backspace(t, s)) : s <= i.stopNum && (i.arrayPos++, i.arrayPos === i.strings.length ? (i.arrayPos = 0, i.shuffle && (i.sequence = i.shuffleArray(i.sequence)), i.init()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], s))
                }, e)
            }
        },
        shuffleArray: function (t) {
            var s, e, i = t.length;
            if (i)
                for (; --i;) e = Math.floor(Math.random() * (i + 1)), s = t[e], t[e] = t[i], t[i] = s;
            return t
        },
        reset: function () {
            var t = this;
            clearInterval(t.timeout);
            this.el.attr("id");
            this.el.empty(), "undefined" != typeof this.cursor && this.cursor.remove(), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, this.options.resetCallback()
        }
    }, t.fn.typed = function (e) {
        return this.each(function () {
            var i = t(this),
                r = i.data("typed"),
                o = "object" == typeof e && e;
            r && r.reset(), i.data("typed", r = new s(this, o)), "string" == typeof e && r[e]()
        })
    }, t.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function () {},
        preStringTyped: function () {},
        onStringTyped: function () {},
        resetCallback: function () {}
    }
}(window.jQuery);

function hexToRgb(e) {
    var a = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    e = e.replace(a, function (e, a, t, i) {
        return a + a + t + t + i + i
    });
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? {
        r: parseInt(t[1], 16),
        g: parseInt(t[2], 16),
        b: parseInt(t[3], 16)
    } : null
}

function clamp(e, a, t) {
    return Math.min(Math.max(e, a), t)
}

function isInArray(e, a) {
    return a.indexOf(e) > -1
}
var pJS = function (e, a) {
    var t = document.querySelector("#" + e + " > .particles-js-canvas-el");
    this.pJS = {
        canvas: {
            el: t,
            w: t.offsetWidth,
            h: t.offsetHeight
        },
        particles: {
            number: {
                value: 400,
                density: {
                    enable: !0,
                    value_area: 800
                }
            },
            color: {
                value: "#fff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#ff0000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 1,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 2,
                    opacity_min: 0,
                    sync: !1
                }
            },
            size: {
                value: 20,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 20,
                    size_min: 0,
                    sync: !1
                }
            },
            line_linked: {
                enable: !0,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1
            },
            move: {
                enable: !0,
                speed: 2,
                direction: "none",
                random: !1,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {
                    enable: !1,
                    rotateX: 3e3,
                    rotateY: 3e3
                }
            },
            array: []
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !0,
                    mode: "grab"
                },
                onclick: {
                    enable: !0,
                    mode: "push"
                },
                resize: !0
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 200,
                    size: 80,
                    duration: .4
                },
                repulse: {
                    distance: 200,
                    duration: .4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            },
            mouse: {}
        },
        retina_detect: !1,
        fn: {
            interact: {},
            modes: {},
            vendors: {}
        },
        tmp: {}
    };
    var i = this.pJS;
    a && Object.deepExtend(i, a), i.tmp.obj = {
        size_value: i.particles.size.value,
        size_anim_speed: i.particles.size.anim.speed,
        move_speed: i.particles.move.speed,
        line_linked_distance: i.particles.line_linked.distance,
        line_linked_width: i.particles.line_linked.width,
        mode_grab_distance: i.interactivity.modes.grab.distance,
        mode_bubble_distance: i.interactivity.modes.bubble.distance,
        mode_bubble_size: i.interactivity.modes.bubble.size,
        mode_repulse_distance: i.interactivity.modes.repulse.distance
    }, i.fn.retinaInit = function () {
        i.retina_detect && window.devicePixelRatio > 1 ? (i.canvas.pxratio = window.devicePixelRatio, i.tmp.retina = !0) : (i.canvas.pxratio = 1, i.tmp.retina = !1), i.canvas.w = i.canvas.el.offsetWidth * i.canvas.pxratio, i.canvas.h = i.canvas.el.offsetHeight * i.canvas.pxratio, i.particles.size.value = i.tmp.obj.size_value * i.canvas.pxratio, i.particles.size.anim.speed = i.tmp.obj.size_anim_speed * i.canvas.pxratio, i.particles.move.speed = i.tmp.obj.move_speed * i.canvas.pxratio, i.particles.line_linked.distance = i.tmp.obj.line_linked_distance * i.canvas.pxratio, i.interactivity.modes.grab.distance = i.tmp.obj.mode_grab_distance * i.canvas.pxratio, i.interactivity.modes.bubble.distance = i.tmp.obj.mode_bubble_distance * i.canvas.pxratio, i.particles.line_linked.width = i.tmp.obj.line_linked_width * i.canvas.pxratio, i.interactivity.modes.bubble.size = i.tmp.obj.mode_bubble_size * i.canvas.pxratio, i.interactivity.modes.repulse.distance = i.tmp.obj.mode_repulse_distance * i.canvas.pxratio
    }, i.fn.canvasInit = function () {
        i.canvas.ctx = i.canvas.el.getContext("2d")
    }, i.fn.canvasSize = function () {
        i.canvas.el.width = i.canvas.w, i.canvas.el.height = i.canvas.h, i && i.interactivity.events.resize && window.addEventListener("resize", function () {
            i.canvas.w = i.canvas.el.offsetWidth, i.canvas.h = i.canvas.el.offsetHeight, i.tmp.retina && (i.canvas.w *= i.canvas.pxratio, i.canvas.h *= i.canvas.pxratio), i.canvas.el.width = i.canvas.w, i.canvas.el.height = i.canvas.h, i.particles.move.enable || (i.fn.particlesEmpty(), i.fn.particlesCreate(), i.fn.particlesDraw(), i.fn.vendors.densityAutoParticles()), i.fn.vendors.densityAutoParticles()
        })
    }, i.fn.canvasPaint = function () {
        i.canvas.ctx.fillRect(0, 0, i.canvas.w, i.canvas.h)
    }, i.fn.canvasClear = function () {
        i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h)
    }, i.fn.particle = function (e, a, t) {
        if (this.radius = (i.particles.size.random ? Math.random() : 1) * i.particles.size.value, i.particles.size.anim.enable && (this.size_status = !1, this.vs = i.particles.size.anim.speed / 100, i.particles.size.anim.sync || (this.vs = this.vs * Math.random())), this.x = t ? t.x : Math.random() * i.canvas.w, this.y = t ? t.y : Math.random() * i.canvas.h, this.x > i.canvas.w - 2 * this.radius ? this.x = this.x - this.radius : this.x < 2 * this.radius && (this.x = this.x + this.radius), this.y > i.canvas.h - 2 * this.radius ? this.y = this.y - this.radius : this.y < 2 * this.radius && (this.y = this.y + this.radius), i.particles.move.bounce && i.fn.vendors.checkOverlap(this, t), this.color = {}, "object" == typeof e.value)
            if (e.value instanceof Array) {
                var s = e.value[Math.floor(Math.random() * i.particles.color.value.length)];
                this.color.rgb = hexToRgb(s)
            } else void 0 != e.value.r && void 0 != e.value.g && void 0 != e.value.b && (this.color.rgb = {
                r: e.value.r,
                g: e.value.g,
                b: e.value.b
            }), void 0 != e.value.h && void 0 != e.value.s && void 0 != e.value.l && (this.color.hsl = {
                h: e.value.h,
                s: e.value.s,
                l: e.value.l
            });
        else "random" == e.value ? this.color.rgb = {
            r: Math.floor(256 * Math.random()) + 0,
            g: Math.floor(256 * Math.random()) + 0,
            b: Math.floor(256 * Math.random()) + 0
        } : "string" == typeof e.value && (this.color = e, this.color.rgb = hexToRgb(this.color.value));
        this.opacity = (i.particles.opacity.random ? Math.random() : 1) * i.particles.opacity.value, i.particles.opacity.anim.enable && (this.opacity_status = !1, this.vo = i.particles.opacity.anim.speed / 100, i.particles.opacity.anim.sync || (this.vo = this.vo * Math.random()));
        var n = {};
        switch (i.particles.move.direction) {
            case "top":
                n = {
                    x: 0,
                    y: -1
                };
                break;
            case "top-right":
                n = {
                    x: .5,
                    y: -.5
                };
                break;
            case "right":
                n = {
                    x: 1,
                    y: -0
                };
                break;
            case "bottom-right":
                n = {
                    x: .5,
                    y: .5
                };
                break;
            case "bottom":
                n = {
                    x: 0,
                    y: 1
                };
                break;
            case "bottom-left":
                n = {
                    x: -.5,
                    y: 1
                };
                break;
            case "left":
                n = {
                    x: -1,
                    y: 0
                };
                break;
            case "top-left":
                n = {
                    x: -.5,
                    y: -.5
                };
                break;
            default:
                n = {
                    x: 0,
                    y: 0
                }
        }
        i.particles.move.straight ? (this.vx = n.x, this.vy = n.y, i.particles.move.random && (this.vx = this.vx * Math.random(), this.vy = this.vy * Math.random())) : (this.vx = n.x + Math.random() - .5, this.vy = n.y + Math.random() - .5), this.vx_i = this.vx, this.vy_i = this.vy;
        var r = i.particles.shape.type;
        if ("object" == typeof r) {
            if (r instanceof Array) {
                var c = r[Math.floor(Math.random() * r.length)];
                this.shape = c
            }
        } else this.shape = r;
        if ("image" == this.shape) {
            var o = i.particles.shape;
            this.img = {
                src: o.image.src,
                ratio: o.image.width / o.image.height
            }, this.img.ratio || (this.img.ratio = 1), "svg" == i.tmp.img_type && void 0 != i.tmp.source_svg && (i.fn.vendors.createSvgImg(this), i.tmp.pushing && (this.img.loaded = !1))
        }
    }, i.fn.particle.prototype.draw = function () {
        function e() {
            i.canvas.ctx.drawImage(r, a.x - t, a.y - t, 2 * t, 2 * t / a.img.ratio)
        }
        var a = this;
        if (void 0 != a.radius_bubble) var t = a.radius_bubble;
        else var t = a.radius;
        if (void 0 != a.opacity_bubble) var s = a.opacity_bubble;
        else var s = a.opacity;
        if (a.color.rgb) var n = "rgba(" + a.color.rgb.r + "," + a.color.rgb.g + "," + a.color.rgb.b + "," + s + ")";
        else var n = "hsla(" + a.color.hsl.h + "," + a.color.hsl.s + "%," + a.color.hsl.l + "%," + s + ")";
        switch (i.canvas.ctx.fillStyle = n, i.canvas.ctx.beginPath(), a.shape) {
            case "circle":
                i.canvas.ctx.arc(a.x, a.y, t, 0, 2 * Math.PI, !1);
                break;
            case "edge":
                i.canvas.ctx.rect(a.x - t, a.y - t, 2 * t, 2 * t);
                break;
            case "triangle":
                i.fn.vendors.drawShape(i.canvas.ctx, a.x - t, a.y + t / 1.66, 2 * t, 3, 2);
                break;
            case "polygon":
                i.fn.vendors.drawShape(i.canvas.ctx, a.x - t / (i.particles.shape.polygon.nb_sides / 3.5), a.y - t / .76, 2.66 * t / (i.particles.shape.polygon.nb_sides / 3), i.particles.shape.polygon.nb_sides, 1);
                break;
            case "star":
                i.fn.vendors.drawShape(i.canvas.ctx, a.x - 2 * t / (i.particles.shape.polygon.nb_sides / 4), a.y - t / 1.52, 2 * t * 2.66 / (i.particles.shape.polygon.nb_sides / 3), i.particles.shape.polygon.nb_sides, 2);
                break;
            case "image":
                if ("svg" == i.tmp.img_type) var r = a.img.obj;
                else var r = i.tmp.img_obj;
                r && e()
        }
        i.canvas.ctx.closePath(), i.particles.shape.stroke.width > 0 && (i.canvas.ctx.strokeStyle = i.particles.shape.stroke.color, i.canvas.ctx.lineWidth = i.particles.shape.stroke.width, i.canvas.ctx.stroke()), i.canvas.ctx.fill()
    }, i.fn.particlesCreate = function () {
        for (var e = 0; e < i.particles.number.value; e++) i.particles.array.push(new i.fn.particle(i.particles.color, i.particles.opacity.value))
    }, i.fn.particlesUpdate = function () {
        for (var e = 0; e < i.particles.array.length; e++) {
            var a = i.particles.array[e];
            if (i.particles.move.enable) {
                var t = i.particles.move.speed / 2;
                a.x += a.vx * t, a.y += a.vy * t
            }
            if (i.particles.opacity.anim.enable && (1 == a.opacity_status ? (a.opacity >= i.particles.opacity.value && (a.opacity_status = !1), a.opacity += a.vo) : (a.opacity <= i.particles.opacity.anim.opacity_min && (a.opacity_status = !0), a.opacity -= a.vo), a.opacity < 0 && (a.opacity = 0)), i.particles.size.anim.enable && (1 == a.size_status ? (a.radius >= i.particles.size.value && (a.size_status = !1), a.radius += a.vs) : (a.radius <= i.particles.size.anim.size_min && (a.size_status = !0), a.radius -= a.vs), a.radius < 0 && (a.radius = 0)), "bounce" == i.particles.move.out_mode) var s = {
                x_left: a.radius,
                x_right: i.canvas.w,
                y_top: a.radius,
                y_bottom: i.canvas.h
            };
            else var s = {
                x_left: -a.radius,
                x_right: i.canvas.w + a.radius,
                y_top: -a.radius,
                y_bottom: i.canvas.h + a.radius
            };
            switch (a.x - a.radius > i.canvas.w ? (a.x = s.x_left, a.y = Math.random() * i.canvas.h) : a.x + a.radius < 0 && (a.x = s.x_right, a.y = Math.random() * i.canvas.h), a.y - a.radius > i.canvas.h ? (a.y = s.y_top, a.x = Math.random() * i.canvas.w) : a.y + a.radius < 0 && (a.y = s.y_bottom, a.x = Math.random() * i.canvas.w), i.particles.move.out_mode) {
                case "bounce":
                    a.x + a.radius > i.canvas.w ? a.vx = -a.vx : a.x - a.radius < 0 && (a.vx = -a.vx), a.y + a.radius > i.canvas.h ? a.vy = -a.vy : a.y - a.radius < 0 && (a.vy = -a.vy)
            }
            if (isInArray("grab", i.interactivity.events.onhover.mode) && i.fn.modes.grabParticle(a), (isInArray("bubble", i.interactivity.events.onhover.mode) || isInArray("bubble", i.interactivity.events.onclick.mode)) && i.fn.modes.bubbleParticle(a), (isInArray("repulse", i.interactivity.events.onhover.mode) || isInArray("repulse", i.interactivity.events.onclick.mode)) && i.fn.modes.repulseParticle(a), i.particles.line_linked.enable || i.particles.move.attract.enable)
                for (var n = e + 1; n < i.particles.array.length; n++) {
                    var r = i.particles.array[n];
                    i.particles.line_linked.enable && i.fn.interact.linkParticles(a, r), i.particles.move.attract.enable && i.fn.interact.attractParticles(a, r), i.particles.move.bounce && i.fn.interact.bounceParticles(a, r)
                }
        }
    }, i.fn.particlesDraw = function () {
        i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h), i.fn.particlesUpdate();
        for (var e = 0; e < i.particles.array.length; e++) {
            var a = i.particles.array[e];
            a.draw()
        }
    }, i.fn.particlesEmpty = function () {
        i.particles.array = []
    }, i.fn.particlesRefresh = function () {
        cancelRequestAnimFrame(i.fn.checkAnimFrame), cancelRequestAnimFrame(i.fn.drawAnimFrame), i.tmp.source_svg = void 0, i.tmp.img_obj = void 0, i.tmp.count_svg = 0, i.fn.particlesEmpty(), i.fn.canvasClear(), i.fn.vendors.start()
    }, i.fn.interact.linkParticles = function (e, a) {
        var t = e.x - a.x,
            s = e.y - a.y,
            n = Math.sqrt(t * t + s * s);
        if (n <= i.particles.line_linked.distance) {
            var r = i.particles.line_linked.opacity - n / (1 / i.particles.line_linked.opacity) / i.particles.line_linked.distance;
            if (r > 0) {
                var c = i.particles.line_linked.color_rgb_line;
                i.canvas.ctx.strokeStyle = "rgba(" + c.r + "," + c.g + "," + c.b + "," + r + ")", i.canvas.ctx.lineWidth = i.particles.line_linked.width, i.canvas.ctx.beginPath(), i.canvas.ctx.moveTo(e.x, e.y), i.canvas.ctx.lineTo(a.x, a.y), i.canvas.ctx.stroke(), i.canvas.ctx.closePath()
            }
        }
    }, i.fn.interact.attractParticles = function (e, a) {
        var t = e.x - a.x,
            s = e.y - a.y,
            n = Math.sqrt(t * t + s * s);
        if (n <= i.particles.line_linked.distance) {
            var r = t / (1e3 * i.particles.move.attract.rotateX),
                c = s / (1e3 * i.particles.move.attract.rotateY);
            e.vx -= r, e.vy -= c, a.vx += r, a.vy += c
        }
    }, i.fn.interact.bounceParticles = function (e, a) {
        var t = e.x - a.x,
            i = e.y - a.y,
            s = Math.sqrt(t * t + i * i),
            n = e.radius + a.radius;
        n >= s && (e.vx = -e.vx, e.vy = -e.vy, a.vx = -a.vx, a.vy = -a.vy)
    }, i.fn.modes.pushParticles = function (e, a) {
        i.tmp.pushing = !0;
        for (var t = 0; e > t; t++) i.particles.array.push(new i.fn.particle(i.particles.color, i.particles.opacity.value, {
            x: a ? a.pos_x : Math.random() * i.canvas.w,
            y: a ? a.pos_y : Math.random() * i.canvas.h
        })), t == e - 1 && (i.particles.move.enable || i.fn.particlesDraw(), i.tmp.pushing = !1)
    }, i.fn.modes.removeParticles = function (e) {
        i.particles.array.splice(0, e), i.particles.move.enable || i.fn.particlesDraw()
    }, i.fn.modes.bubbleParticle = function (e) {
        function a() {
            e.opacity_bubble = e.opacity, e.radius_bubble = e.radius
        }

        function t(a, t, s, n, c) {
            if (a != t)
                if (i.tmp.bubble_duration_end) {
                    if (void 0 != s) {
                        var o = n - p * (n - a) / i.interactivity.modes.bubble.duration,
                            l = a - o;
                        d = a + l, "size" == c && (e.radius_bubble = d), "opacity" == c && (e.opacity_bubble = d)
                    }
                } else if (r <= i.interactivity.modes.bubble.distance) {
                if (void 0 != s) var v = s;
                else var v = n;
                if (v != a) {
                    var d = n - p * (n - a) / i.interactivity.modes.bubble.duration;
                    "size" == c && (e.radius_bubble = d), "opacity" == c && (e.opacity_bubble = d)
                }
            } else "size" == c && (e.radius_bubble = void 0), "opacity" == c && (e.opacity_bubble = void 0)
        }
        if (i.interactivity.events.onhover.enable && isInArray("bubble", i.interactivity.events.onhover.mode)) {
            var s = e.x - i.interactivity.mouse.pos_x,
                n = e.y - i.interactivity.mouse.pos_y,
                r = Math.sqrt(s * s + n * n),
                c = 1 - r / i.interactivity.modes.bubble.distance;
            if (r <= i.interactivity.modes.bubble.distance) {
                if (c >= 0 && "mousemove" == i.interactivity.status) {
                    if (i.interactivity.modes.bubble.size != i.particles.size.value)
                        if (i.interactivity.modes.bubble.size > i.particles.size.value) {
                            var o = e.radius + i.interactivity.modes.bubble.size * c;
                            o >= 0 && (e.radius_bubble = o)
                        } else {
                            var l = e.radius - i.interactivity.modes.bubble.size,
                                o = e.radius - l * c;
                            o > 0 ? e.radius_bubble = o : e.radius_bubble = 0
                        } if (i.interactivity.modes.bubble.opacity != i.particles.opacity.value)
                        if (i.interactivity.modes.bubble.opacity > i.particles.opacity.value) {
                            var v = i.interactivity.modes.bubble.opacity * c;
                            v > e.opacity && v <= i.interactivity.modes.bubble.opacity && (e.opacity_bubble = v)
                        } else {
                            var v = e.opacity - (i.particles.opacity.value - i.interactivity.modes.bubble.opacity) * c;
                            v < e.opacity && v >= i.interactivity.modes.bubble.opacity && (e.opacity_bubble = v)
                        }
                }
            } else a();
            "mouseleave" == i.interactivity.status && a()
        } else if (i.interactivity.events.onclick.enable && isInArray("bubble", i.interactivity.events.onclick.mode)) {
            if (i.tmp.bubble_clicking) {
                var s = e.x - i.interactivity.mouse.click_pos_x,
                    n = e.y - i.interactivity.mouse.click_pos_y,
                    r = Math.sqrt(s * s + n * n),
                    p = ((new Date).getTime() - i.interactivity.mouse.click_time) / 1e3;
                p > i.interactivity.modes.bubble.duration && (i.tmp.bubble_duration_end = !0), p > 2 * i.interactivity.modes.bubble.duration && (i.tmp.bubble_clicking = !1, i.tmp.bubble_duration_end = !1)
            }
            i.tmp.bubble_clicking && (t(i.interactivity.modes.bubble.size, i.particles.size.value, e.radius_bubble, e.radius, "size"), t(i.interactivity.modes.bubble.opacity, i.particles.opacity.value, e.opacity_bubble, e.opacity, "opacity"))
        }
    }, i.fn.modes.repulseParticle = function (e) {
        function a() {
            var a = Math.atan2(d, p);
            if (e.vx = u * Math.cos(a), e.vy = u * Math.sin(a), "bounce" == i.particles.move.out_mode) {
                var t = {
                    x: e.x + e.vx,
                    y: e.y + e.vy
                };
                t.x + e.radius > i.canvas.w ? e.vx = -e.vx : t.x - e.radius < 0 && (e.vx = -e.vx), t.y + e.radius > i.canvas.h ? e.vy = -e.vy : t.y - e.radius < 0 && (e.vy = -e.vy)
            }
        }
        if (i.interactivity.events.onhover.enable && isInArray("repulse", i.interactivity.events.onhover.mode) && "mousemove" == i.interactivity.status) {
            var t = e.x - i.interactivity.mouse.pos_x,
                s = e.y - i.interactivity.mouse.pos_y,
                n = Math.sqrt(t * t + s * s),
                r = {
                    x: t / n,
                    y: s / n
                },
                c = i.interactivity.modes.repulse.distance,
                o = 100,
                l = clamp(1 / c * (-1 * Math.pow(n / c, 2) + 1) * c * o, 0, 50),
                v = {
                    x: e.x + r.x * l,
                    y: e.y + r.y * l
                };
            "bounce" == i.particles.move.out_mode ? (v.x - e.radius > 0 && v.x + e.radius < i.canvas.w && (e.x = v.x), v.y - e.radius > 0 && v.y + e.radius < i.canvas.h && (e.y = v.y)) : (e.x = v.x, e.y = v.y)
        } else if (i.interactivity.events.onclick.enable && isInArray("repulse", i.interactivity.events.onclick.mode))
            if (i.tmp.repulse_finish || (i.tmp.repulse_count++, i.tmp.repulse_count == i.particles.array.length && (i.tmp.repulse_finish = !0)), i.tmp.repulse_clicking) {
                var c = Math.pow(i.interactivity.modes.repulse.distance / 6, 3),
                    p = i.interactivity.mouse.click_pos_x - e.x,
                    d = i.interactivity.mouse.click_pos_y - e.y,
                    m = p * p + d * d,
                    u = -c / m * 1;
                c >= m && a()
            } else 0 == i.tmp.repulse_clicking && (e.vx = e.vx_i, e.vy = e.vy_i)
    }, i.fn.modes.grabParticle = function (e) {
        if (i.interactivity.events.onhover.enable && "mousemove" == i.interactivity.status) {
            var a = e.x - i.interactivity.mouse.pos_x,
                t = e.y - i.interactivity.mouse.pos_y,
                s = Math.sqrt(a * a + t * t);
            if (s <= i.interactivity.modes.grab.distance) {
                var n = i.interactivity.modes.grab.line_linked.opacity - s / (1 / i.interactivity.modes.grab.line_linked.opacity) / i.interactivity.modes.grab.distance;
                if (n > 0) {
                    var r = i.particles.line_linked.color_rgb_line;
                    i.canvas.ctx.strokeStyle = "rgba(" + r.r + "," + r.g + "," + r.b + "," + n + ")", i.canvas.ctx.lineWidth = i.particles.line_linked.width, i.canvas.ctx.beginPath(), i.canvas.ctx.moveTo(e.x, e.y), i.canvas.ctx.lineTo(i.interactivity.mouse.pos_x, i.interactivity.mouse.pos_y), i.canvas.ctx.stroke(), i.canvas.ctx.closePath()
                }
            }
        }
    }, i.fn.vendors.eventsListeners = function () {
        "window" == i.interactivity.detect_on ? i.interactivity.el = window : i.interactivity.el = i.canvas.el, (i.interactivity.events.onhover.enable || i.interactivity.events.onclick.enable) && (i.interactivity.el.addEventListener("mousemove", function (e) {
            if (i.interactivity.el == window) var a = e.clientX,
                t = e.clientY;
            else var a = e.offsetX || e.clientX,
                t = e.offsetY || e.clientY;
            i.interactivity.mouse.pos_x = a, i.interactivity.mouse.pos_y = t, i.tmp.retina && (i.interactivity.mouse.pos_x *= i.canvas.pxratio, i.interactivity.mouse.pos_y *= i.canvas.pxratio), i.interactivity.status = "mousemove"
        }), i.interactivity.el.addEventListener("mouseleave", function (e) {
            i.interactivity.mouse.pos_x = null, i.interactivity.mouse.pos_y = null, i.interactivity.status = "mouseleave"
        })), i.interactivity.events.onclick.enable && i.interactivity.el.addEventListener("click", function () {
            if (i.interactivity.mouse.click_pos_x = i.interactivity.mouse.pos_x, i.interactivity.mouse.click_pos_y = i.interactivity.mouse.pos_y, i.interactivity.mouse.click_time = (new Date).getTime(), i.interactivity.events.onclick.enable) switch (i.interactivity.events.onclick.mode) {
                case "push":
                    i.particles.move.enable ? i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb, i.interactivity.mouse) : 1 == i.interactivity.modes.push.particles_nb ? i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb, i.interactivity.mouse) : i.interactivity.modes.push.particles_nb > 1 && i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb);
                    break;
                case "remove":
                    i.fn.modes.removeParticles(i.interactivity.modes.remove.particles_nb);
                    break;
                case "bubble":
                    i.tmp.bubble_clicking = !0;
                    break;
                case "repulse":
                    i.tmp.repulse_clicking = !0, i.tmp.repulse_count = 0, i.tmp.repulse_finish = !1, setTimeout(function () {
                        i.tmp.repulse_clicking = !1
                    }, 1e3 * i.interactivity.modes.repulse.duration)
            }
        })
    }, i.fn.vendors.densityAutoParticles = function () {
        if (i.particles.number.density.enable) {
            var e = i.canvas.el.width * i.canvas.el.height / 1e3;
            i.tmp.retina && (e /= 2 * i.canvas.pxratio);
            var a = e * i.particles.number.value / i.particles.number.density.value_area,
                t = i.particles.array.length - a;
            0 > t ? i.fn.modes.pushParticles(Math.abs(t)) : i.fn.modes.removeParticles(t)
        }
    }, i.fn.vendors.checkOverlap = function (e, a) {
        for (var t = 0; t < i.particles.array.length; t++) {
            var s = i.particles.array[t],
                n = e.x - s.x,
                r = e.y - s.y,
                c = Math.sqrt(n * n + r * r);
            c <= e.radius + s.radius && (e.x = a ? a.x : Math.random() * i.canvas.w, e.y = a ? a.y : Math.random() * i.canvas.h, i.fn.vendors.checkOverlap(e))
        }
    }, i.fn.vendors.createSvgImg = function (e) {
        var a = i.tmp.source_svg,
            t = /#([0-9A-F]{3,6})/gi,
            s = a.replace(t, function (a, t, i, s) {
                if (e.color.rgb) var n = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + e.opacity + ")";
                else var n = "hsla(" + e.color.hsl.h + "," + e.color.hsl.s + "%," + e.color.hsl.l + "%," + e.opacity + ")";
                return n
            }),
            n = new Blob([s], {
                type: "image/svg+xml;charset=utf-8"
            }),
            r = window.URL || window.webkitURL || window,
            c = r.createObjectURL(n),
            o = new Image;
        o.addEventListener("load", function () {
            e.img.obj = o, e.img.loaded = !0, r.revokeObjectURL(c), i.tmp.count_svg++
        }), o.src = c
    }, i.fn.vendors.destroypJS = function () {
        cancelAnimationFrame(i.fn.drawAnimFrame), t.remove(), pJSDom = null
    }, i.fn.vendors.drawShape = function (e, a, t, i, s, n) {
        var r = s * n,
            c = s / n,
            o = 180 * (c - 2) / c,
            l = Math.PI - Math.PI * o / 180;
        e.save(), e.beginPath(), e.translate(a, t), e.moveTo(0, 0);
        for (var v = 0; r > v; v++) e.lineTo(i, 0), e.translate(i, 0), e.rotate(l);
        e.fill(), e.restore()
    }, i.fn.vendors.exportImg = function () {
        window.open(i.canvas.el.toDataURL("image/png"), "_blank")
    }, i.fn.vendors.loadImg = function (e) {
        if (i.tmp.img_error = void 0, "" != i.particles.shape.image.src)
            if ("svg" == e) {
                var a = new XMLHttpRequest;
                a.open("GET.html", i.particles.shape.image.src), a.onreadystatechange = function (e) {
                    4 == a.readyState && (200 == a.status ? (i.tmp.source_svg = e.currentTarget.response, i.fn.vendors.checkBeforeDraw()) : (console.log("Error pJS - Image not found"), i.tmp.img_error = !0))
                }, a.send()
            } else {
                var t = new Image;
                t.addEventListener("load", function () {
                    i.tmp.img_obj = t, i.fn.vendors.checkBeforeDraw()
                }), t.src = i.particles.shape.image.src
            }
        else console.log("Error%20pJS%20-%20No%20image.html"), i.tmp.img_error = !0
    }, i.fn.vendors.draw = function () {
        "image" == i.particles.shape.type ? "svg" == i.tmp.img_type ? i.tmp.count_svg >= i.particles.number.value ? (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame)) : i.tmp.img_error || (i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw)) : void 0 != i.tmp.img_obj ? (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame)) : i.tmp.img_error || (i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw)) : (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame))
    }, i.fn.vendors.checkBeforeDraw = function () {
        "image" == i.particles.shape.type ? "svg" == i.tmp.img_type && void 0 == i.tmp.source_svg ? i.tmp.checkAnimFrame = requestAnimFrame(check) : (cancelRequestAnimFrame(i.tmp.checkAnimFrame), i.tmp.img_error || (i.fn.vendors.init(), i.fn.vendors.draw())) : (i.fn.vendors.init(), i.fn.vendors.draw())
    }, i.fn.vendors.init = function () {
        i.fn.retinaInit(), i.fn.canvasInit(), i.fn.canvasSize(), i.fn.canvasPaint(), i.fn.particlesCreate(), i.fn.vendors.densityAutoParticles(), i.particles.line_linked.color_rgb_line = hexToRgb(i.particles.line_linked.color)
    }, i.fn.vendors.start = function () {
        isInArray("image", i.particles.shape.type) ? (i.tmp.img_type = i.particles.shape.image.src.substr(i.particles.shape.image.src.length - 3), i.fn.vendors.loadImg(i.tmp.img_type)) : i.fn.vendors.checkBeforeDraw()
    }, i.fn.vendors.eventsListeners(), i.fn.vendors.start()
};
Object.deepExtend = function (e, a) {
    for (var t in a) a[t] && a[t].constructor && a[t].constructor === Object ? (e[t] = e[t] || {}, arguments.callee(e[t], a[t])) : e[t] = a[t];
    return e
}, window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
        window.setTimeout(e, 1e3 / 60)
    }
}(), window.cancelRequestAnimFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
}(), window.pJSDom = [], window.particlesJS = function (e, a) {
    "string" != typeof e && (a = e, e = "particles-js"), e || (e = "particles-js");
    var t = document.getElementById(e),
        i = "particles-js-canvas-el",
        s = t.getElementsByClassName(i);
    if (s.length)
        for (; s.length > 0;) t.removeChild(s[0]);
    var n = document.createElement("canvas");
    n.className = i, n.style.width = "100%", n.style.height = "100%";
    var r = document.getElementById(e).appendChild(n);
    null != r && pJSDom.push(new pJS(e, a))
}, window.particlesJS.load = function (e, a, t) {
    var i = new XMLHttpRequest;
    i.open("GET.html", a), i.onreadystatechange = function (a) {
        if (4 == i.readyState)
            if (200 == i.status) {
                var s = JSON.parse(a.currentTarget.response);
                window.particlesJS(e, s), t && t()
            } else console.log("Error pJS - XMLHttpRequest status: " + i.status), console.log("Error pJS - File config not found")
    }, i.send()
};
! function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Chart = t()
    }
}(function () {
    return function () {
        return function t(e, i, n) {
            function a(o, s) {
                if (!i[o]) {
                    if (!e[o]) {
                        var l = "function" == typeof require && require;
                        if (!s && l) return l(o, !0);
                        if (r) return r(o, !0);
                        var u = new Error("Cannot find module '" + o + "'");
                        throw u.code = "MODULE_NOT_FOUND", u
                    }
                    var d = i[o] = {
                        exports: {}
                    };
                    e[o][0].call(d.exports, function (t) {
                        var i = e[o][1][t];
                        return a(i || t)
                    }, d, d.exports, t, e, i, n)
                }
                return i[o].exports
            }
            for (var r = "function" == typeof require && require, o = 0; o < n.length; o++) a(n[o]);
            return a
        }
    }()({
        1: [function (t, e, i) {
            var n = t(5);

            function a(t) {
                if (t) {
                    var e = [0, 0, 0],
                        i = 1,
                        a = t.match(/^#([a-fA-F0-9]{3})$/i);
                    if (a) {
                        a = a[1];
                        for (var r = 0; r < e.length; r++) e[r] = parseInt(a[r] + a[r], 16)
                    } else if (a = t.match(/^#([a-fA-F0-9]{6})$/i)) {
                        a = a[1];
                        for (r = 0; r < e.length; r++) e[r] = parseInt(a.slice(2 * r, 2 * r + 2), 16)
                    } else if (a = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
                        for (r = 0; r < e.length; r++) e[r] = parseInt(a[r + 1]);
                        i = parseFloat(a[4])
                    } else if (a = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
                        for (r = 0; r < e.length; r++) e[r] = Math.round(2.55 * parseFloat(a[r + 1]));
                        i = parseFloat(a[4])
                    } else if (a = t.match(/(\w+)/)) {
                        if ("transparent" == a[1]) return [0, 0, 0, 0];
                        if (!(e = n[a[1]])) return
                    }
                    for (r = 0; r < e.length; r++) e[r] = d(e[r], 0, 255);
                    return i = i || 0 == i ? d(i, 0, 1) : 1, e[3] = i, e
                }
            }

            function r(t) {
                if (t) {
                    var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                    if (e) {
                        var i = parseFloat(e[4]);
                        return [d(parseInt(e[1]), 0, 360), d(parseFloat(e[2]), 0, 100), d(parseFloat(e[3]), 0, 100), d(isNaN(i) ? 1 : i, 0, 1)]
                    }
                }
            }

            function o(t) {
                if (t) {
                    var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                    if (e) {
                        var i = parseFloat(e[4]);
                        return [d(parseInt(e[1]), 0, 360), d(parseFloat(e[2]), 0, 100), d(parseFloat(e[3]), 0, 100), d(isNaN(i) ? 1 : i, 0, 1)]
                    }
                }
            }

            function s(t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
            }

            function l(t, e) {
                return "rgba(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%, " + (e || t[3] || 1) + ")"
            }

            function u(t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
            }

            function d(t, e, i) {
                return Math.min(Math.max(e, t), i)
            }

            function h(t) {
                var e = t.toString(16).toUpperCase();
                return e.length < 2 ? "0" + e : e
            }
            e.exports = {
                getRgba: a,
                getHsla: r,
                getRgb: function (t) {
                    var e = a(t);
                    return e && e.slice(0, 3)
                },
                getHsl: function (t) {
                    var e = r(t);
                    return e && e.slice(0, 3)
                },
                getHwb: o,
                getAlpha: function (t) {
                    var e = a(t); {
                        if (e) return e[3];
                        if (e = r(t)) return e[3];
                        if (e = o(t)) return e[3]
                    }
                },
                hexString: function (t) {
                    return "#" + h(t[0]) + h(t[1]) + h(t[2])
                },
                rgbString: function (t, e) {
                    if (e < 1 || t[3] && t[3] < 1) return s(t, e);
                    return "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
                },
                rgbaString: s,
                percentString: function (t, e) {
                    if (e < 1 || t[3] && t[3] < 1) return l(t, e);
                    var i = Math.round(t[0] / 255 * 100),
                        n = Math.round(t[1] / 255 * 100),
                        a = Math.round(t[2] / 255 * 100);
                    return "rgb(" + i + "%, " + n + "%, " + a + "%)"
                },
                percentaString: l,
                hslString: function (t, e) {
                    if (e < 1 || t[3] && t[3] < 1) return u(t, e);
                    return "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)"
                },
                hslaString: u,
                hwbString: function (t, e) {
                    void 0 === e && (e = void 0 !== t[3] ? t[3] : 1);
                    return "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")"
                },
                keyword: function (t) {
                    return c[t.slice(0, 3)]
                }
            };
            var c = {};
            for (var f in n) c[n[f]] = f
        }, {
            5: 5
        }],
        2: [function (t, e, i) {
            var n = t(4),
                a = t(1),
                r = function (t) {
                    return t instanceof r ? t : this instanceof r ? (this.valid = !1, this.values = {
                        rgb: [0, 0, 0],
                        hsl: [0, 0, 0],
                        hsv: [0, 0, 0],
                        hwb: [0, 0, 0],
                        cmyk: [0, 0, 0, 0],
                        alpha: 1
                    }, void("string" == typeof t ? (e = a.getRgba(t)) ? this.setValues("rgb", e) : (e = a.getHsla(t)) ? this.setValues("hsl", e) : (e = a.getHwb(t)) && this.setValues("hwb", e) : "object" == typeof t && (void 0 !== (e = t).r || void 0 !== e.red ? this.setValues("rgb", e) : void 0 !== e.l || void 0 !== e.lightness ? this.setValues("hsl", e) : void 0 !== e.v || void 0 !== e.value ? this.setValues("hsv", e) : void 0 !== e.w || void 0 !== e.whiteness ? this.setValues("hwb", e) : void 0 === e.c && void 0 === e.cyan || this.setValues("cmyk", e)))) : new r(t);
                    var e
                };
            r.prototype = {
                isValid: function () {
                    return this.valid
                },
                rgb: function () {
                    return this.setSpace("rgb", arguments)
                },
                hsl: function () {
                    return this.setSpace("hsl", arguments)
                },
                hsv: function () {
                    return this.setSpace("hsv", arguments)
                },
                hwb: function () {
                    return this.setSpace("hwb", arguments)
                },
                cmyk: function () {
                    return this.setSpace("cmyk", arguments)
                },
                rgbArray: function () {
                    return this.values.rgb
                },
                hslArray: function () {
                    return this.values.hsl
                },
                hsvArray: function () {
                    return this.values.hsv
                },
                hwbArray: function () {
                    var t = this.values;
                    return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb
                },
                cmykArray: function () {
                    return this.values.cmyk
                },
                rgbaArray: function () {
                    var t = this.values;
                    return t.rgb.concat([t.alpha])
                },
                hslaArray: function () {
                    var t = this.values;
                    return t.hsl.concat([t.alpha])
                },
                alpha: function (t) {
                    return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this)
                },
                red: function (t) {
                    return this.setChannel("rgb", 0, t)
                },
                green: function (t) {
                    return this.setChannel("rgb", 1, t)
                },
                blue: function (t) {
                    return this.setChannel("rgb", 2, t)
                },
                hue: function (t) {
                    return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t)
                },
                saturation: function (t) {
                    return this.setChannel("hsl", 1, t)
                },
                lightness: function (t) {
                    return this.setChannel("hsl", 2, t)
                },
                saturationv: function (t) {
                    return this.setChannel("hsv", 1, t)
                },
                whiteness: function (t) {
                    return this.setChannel("hwb", 1, t)
                },
                blackness: function (t) {
                    return this.setChannel("hwb", 2, t)
                },
                value: function (t) {
                    return this.setChannel("hsv", 2, t)
                },
                cyan: function (t) {
                    return this.setChannel("cmyk", 0, t)
                },
                magenta: function (t) {
                    return this.setChannel("cmyk", 1, t)
                },
                yellow: function (t) {
                    return this.setChannel("cmyk", 2, t)
                },
                black: function (t) {
                    return this.setChannel("cmyk", 3, t)
                },
                hexString: function () {
                    return a.hexString(this.values.rgb)
                },
                rgbString: function () {
                    return a.rgbString(this.values.rgb, this.values.alpha)
                },
                rgbaString: function () {
                    return a.rgbaString(this.values.rgb, this.values.alpha)
                },
                percentString: function () {
                    return a.percentString(this.values.rgb, this.values.alpha)
                },
                hslString: function () {
                    return a.hslString(this.values.hsl, this.values.alpha)
                },
                hslaString: function () {
                    return a.hslaString(this.values.hsl, this.values.alpha)
                },
                hwbString: function () {
                    return a.hwbString(this.values.hwb, this.values.alpha)
                },
                keyword: function () {
                    return a.keyword(this.values.rgb, this.values.alpha)
                },
                rgbNumber: function () {
                    var t = this.values.rgb;
                    return t[0] << 16 | t[1] << 8 | t[2]
                },
                luminosity: function () {
                    for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) {
                        var n = t[i] / 255;
                        e[i] = n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4)
                    }
                    return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
                },
                contrast: function (t) {
                    var e = this.luminosity(),
                        i = t.luminosity();
                    return e > i ? (e + .05) / (i + .05) : (i + .05) / (e + .05)
                },
                level: function (t) {
                    var e = this.contrast(t);
                    return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : ""
                },
                dark: function () {
                    var t = this.values.rgb;
                    return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128
                },
                light: function () {
                    return !this.dark()
                },
                negate: function () {
                    for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e];
                    return this.setValues("rgb", t), this
                },
                lighten: function (t) {
                    var e = this.values.hsl;
                    return e[2] += e[2] * t, this.setValues("hsl", e), this
                },
                darken: function (t) {
                    var e = this.values.hsl;
                    return e[2] -= e[2] * t, this.setValues("hsl", e), this
                },
                saturate: function (t) {
                    var e = this.values.hsl;
                    return e[1] += e[1] * t, this.setValues("hsl", e), this
                },
                desaturate: function (t) {
                    var e = this.values.hsl;
                    return e[1] -= e[1] * t, this.setValues("hsl", e), this
                },
                whiten: function (t) {
                    var e = this.values.hwb;
                    return e[1] += e[1] * t, this.setValues("hwb", e), this
                },
                blacken: function (t) {
                    var e = this.values.hwb;
                    return e[2] += e[2] * t, this.setValues("hwb", e), this
                },
                greyscale: function () {
                    var t = this.values.rgb,
                        e = .3 * t[0] + .59 * t[1] + .11 * t[2];
                    return this.setValues("rgb", [e, e, e]), this
                },
                clearer: function (t) {
                    var e = this.values.alpha;
                    return this.setValues("alpha", e - e * t), this
                },
                opaquer: function (t) {
                    var e = this.values.alpha;
                    return this.setValues("alpha", e + e * t), this
                },
                rotate: function (t) {
                    var e = this.values.hsl,
                        i = (e[0] + t) % 360;
                    return e[0] = i < 0 ? 360 + i : i, this.setValues("hsl", e), this
                },
                mix: function (t, e) {
                    var i = this,
                        n = t,
                        a = void 0 === e ? .5 : e,
                        r = 2 * a - 1,
                        o = i.alpha() - n.alpha(),
                        s = ((r * o == -1 ? r : (r + o) / (1 + r * o)) + 1) / 2,
                        l = 1 - s;
                    return this.rgb(s * i.red() + l * n.red(), s * i.green() + l * n.green(), s * i.blue() + l * n.blue()).alpha(i.alpha() * a + n.alpha() * (1 - a))
                },
                toJSON: function () {
                    return this.rgb()
                },
                clone: function () {
                    var t, e, i = new r,
                        n = this.values,
                        a = i.values;
                    for (var o in n) n.hasOwnProperty(o) && (t = n[o], "[object Array]" === (e = {}.toString.call(t)) ? a[o] = t.slice(0) : "[object Number]" === e ? a[o] = t : console.error("unexpected color value:", t));
                    return i
                }
            }, r.prototype.spaces = {
                rgb: ["red", "green", "blue"],
                hsl: ["hue", "saturation", "lightness"],
                hsv: ["hue", "saturation", "value"],
                hwb: ["hue", "whiteness", "blackness"],
                cmyk: ["cyan", "magenta", "yellow", "black"]
            }, r.prototype.maxes = {
                rgb: [255, 255, 255],
                hsl: [360, 100, 100],
                hsv: [360, 100, 100],
                hwb: [360, 100, 100],
                cmyk: [100, 100, 100, 100]
            }, r.prototype.getValues = function (t) {
                for (var e = this.values, i = {}, n = 0; n < t.length; n++) i[t.charAt(n)] = e[t][n];
                return 1 !== e.alpha && (i.a = e.alpha), i
            }, r.prototype.setValues = function (t, e) {
                var i, a, r = this.values,
                    o = this.spaces,
                    s = this.maxes,
                    l = 1;
                if (this.valid = !0, "alpha" === t) l = e;
                else if (e.length) r[t] = e.slice(0, t.length), l = e[t.length];
                else if (void 0 !== e[t.charAt(0)]) {
                    for (i = 0; i < t.length; i++) r[t][i] = e[t.charAt(i)];
                    l = e.a
                } else if (void 0 !== e[o[t][0]]) {
                    var u = o[t];
                    for (i = 0; i < t.length; i++) r[t][i] = e[u[i]];
                    l = e.alpha
                }
                if (r.alpha = Math.max(0, Math.min(1, void 0 === l ? r.alpha : l)), "alpha" === t) return !1;
                for (i = 0; i < t.length; i++) a = Math.max(0, Math.min(s[t][i], r[t][i])), r[t][i] = Math.round(a);
                for (var d in o) d !== t && (r[d] = n[t][d](r[t]));
                return !0
            }, r.prototype.setSpace = function (t, e) {
                var i = e[0];
                return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i), this)
            }, r.prototype.setChannel = function (t, e, i) {
                var n = this.values[t];
                return void 0 === i ? n[e] : i === n[e] ? this : (n[e] = i, this.setValues(t, n), this)
            }, "undefined" != typeof window && (window.ChartColor = r), e.exports = r
        }, {
            1: 1,
            4: 4
        }],
        3: [function (t, e, i) {
            function n(t) {
                var e, i, n = t[0] / 255,
                    a = t[1] / 255,
                    r = t[2] / 255,
                    o = Math.min(n, a, r),
                    s = Math.max(n, a, r),
                    l = s - o;
                return s == o ? e = 0 : n == s ? e = (a - r) / l : a == s ? e = 2 + (r - n) / l : r == s && (e = 4 + (n - a) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), i = (o + s) / 2, [e, 100 * (s == o ? 0 : i <= .5 ? l / (s + o) : l / (2 - s - o)), 100 * i]
            }

            function a(t) {
                var e, i, n = t[0],
                    a = t[1],
                    r = t[2],
                    o = Math.min(n, a, r),
                    s = Math.max(n, a, r),
                    l = s - o;
                return i = 0 == s ? 0 : l / s * 1e3 / 10, s == o ? e = 0 : n == s ? e = (a - r) / l : a == s ? e = 2 + (r - n) / l : r == s && (e = 4 + (n - a) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), [e, i, s / 255 * 1e3 / 10]
            }

            function o(t) {
                var e = t[0],
                    i = t[1],
                    a = t[2];
                return [n(t)[0], 100 * (1 / 255 * Math.min(e, Math.min(i, a))), 100 * (a = 1 - 1 / 255 * Math.max(e, Math.max(i, a)))]
            }

            function s(t) {
                var e, i = t[0] / 255,
                    n = t[1] / 255,
                    a = t[2] / 255;
                return [100 * ((1 - i - (e = Math.min(1 - i, 1 - n, 1 - a))) / (1 - e) || 0), 100 * ((1 - n - e) / (1 - e) || 0), 100 * ((1 - a - e) / (1 - e) || 0), 100 * e]
            }

            function l(t) {
                return S[JSON.stringify(t)]
            }

            function u(t) {
                var e = t[0] / 255,
                    i = t[1] / 255,
                    n = t[2] / 255;
                return [100 * (.4124 * (e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92) + .1805 * (n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92)), 100 * (.2126 * e + .7152 * i + .0722 * n), 100 * (.0193 * e + .1192 * i + .9505 * n)]
            }

            function d(t) {
                var e = u(t),
                    i = e[0],
                    n = e[1],
                    a = e[2];
                return n /= 100, a /= 108.883, i = (i /= 95.047) > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116, [116 * (n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (i - n), 200 * (n - (a = a > .008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116))]
            }

            function h(t) {
                var e, i, n, a, r, o = t[0] / 360,
                    s = t[1] / 100,
                    l = t[2] / 100;
                if (0 == s) return [r = 255 * l, r, r];
                e = 2 * l - (i = l < .5 ? l * (1 + s) : l + s - l * s), a = [0, 0, 0];
                for (var u = 0; u < 3; u++)(n = o + 1 / 3 * -(u - 1)) < 0 && n++, n > 1 && n--, r = 6 * n < 1 ? e + 6 * (i - e) * n : 2 * n < 1 ? i : 3 * n < 2 ? e + (i - e) * (2 / 3 - n) * 6 : e, a[u] = 255 * r;
                return a
            }

            function c(t) {
                var e = t[0] / 60,
                    i = t[1] / 100,
                    n = t[2] / 100,
                    a = Math.floor(e) % 6,
                    r = e - Math.floor(e),
                    o = 255 * n * (1 - i),
                    s = 255 * n * (1 - i * r),
                    l = 255 * n * (1 - i * (1 - r));
                n *= 255;
                switch (a) {
                    case 0:
                        return [n, l, o];
                    case 1:
                        return [s, n, o];
                    case 2:
                        return [o, n, l];
                    case 3:
                        return [o, s, n];
                    case 4:
                        return [l, o, n];
                    case 5:
                        return [n, o, s]
                }
            }

            function f(t) {
                var e, i, n, a, o = t[0] / 360,
                    s = t[1] / 100,
                    l = t[2] / 100,
                    u = s + l;
                switch (u > 1 && (s /= u, l /= u), n = 6 * o - (e = Math.floor(6 * o)), 0 != (1 & e) && (n = 1 - n), a = s + n * ((i = 1 - l) - s), e) {
                    default:
                    case 6:
                    case 0:
                        r = i, g = a, b = s;
                        break;
                    case 1:
                        r = a, g = i, b = s;
                        break;
                    case 2:
                        r = s, g = i, b = a;
                        break;
                    case 3:
                        r = s, g = a, b = i;
                        break;
                    case 4:
                        r = a, g = s, b = i;
                        break;
                    case 5:
                        r = i, g = s, b = a
                }
                return [255 * r, 255 * g, 255 * b]
            }

            function m(t) {
                var e = t[0] / 100,
                    i = t[1] / 100,
                    n = t[2] / 100,
                    a = t[3] / 100;
                return [255 * (1 - Math.min(1, e * (1 - a) + a)), 255 * (1 - Math.min(1, i * (1 - a) + a)), 255 * (1 - Math.min(1, n * (1 - a) + a))]
            }

            function p(t) {
                var e, i, n, a = t[0] / 100,
                    r = t[1] / 100,
                    o = t[2] / 100;
                return i = -.9689 * a + 1.8758 * r + .0415 * o, n = .0557 * a + -.204 * r + 1.057 * o, e = (e = 3.2406 * a + -1.5372 * r + -.4986 * o) > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e *= 12.92, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i *= 12.92, n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : n *= 12.92, [255 * (e = Math.min(Math.max(0, e), 1)), 255 * (i = Math.min(Math.max(0, i), 1)), 255 * (n = Math.min(Math.max(0, n), 1))]
            }

            function v(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2];
                return i /= 100, n /= 108.883, e = (e /= 95.047) > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, [116 * (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16, 500 * (e - i), 200 * (i - (n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116))]
            }

            function y(t) {
                var e, i, n, a, r = t[0],
                    o = t[1],
                    s = t[2];
                return r <= 8 ? a = (i = 100 * r / 903.3) / 100 * 7.787 + 16 / 116 : (i = 100 * Math.pow((r + 16) / 116, 3), a = Math.pow(i / 100, 1 / 3)), [e = e / 95.047 <= .008856 ? e = 95.047 * (o / 500 + a - 16 / 116) / 7.787 : 95.047 * Math.pow(o / 500 + a, 3), i, n = n / 108.883 <= .008859 ? n = 108.883 * (a - s / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(a - s / 200, 3)]
            }

            function x(t) {
                var e, i = t[0],
                    n = t[1],
                    a = t[2];
                return (e = 360 * Math.atan2(a, n) / 2 / Math.PI) < 0 && (e += 360), [i, Math.sqrt(n * n + a * a), e]
            }

            function _(t) {
                return p(y(t))
            }

            function k(t) {
                var e, i = t[0],
                    n = t[1];
                return e = t[2] / 360 * 2 * Math.PI, [i, n * Math.cos(e), n * Math.sin(e)]
            }

            function w(t) {
                return M[t]
            }
            e.exports = {
                rgb2hsl: n,
                rgb2hsv: a,
                rgb2hwb: o,
                rgb2cmyk: s,
                rgb2keyword: l,
                rgb2xyz: u,
                rgb2lab: d,
                rgb2lch: function (t) {
                    return x(d(t))
                },
                hsl2rgb: h,
                hsl2hsv: function (t) {
                    var e = t[0],
                        i = t[1] / 100,
                        n = t[2] / 100;
                    if (0 === n) return [0, 0, 0];
                    return [e, 100 * (2 * (i *= (n *= 2) <= 1 ? n : 2 - n) / (n + i)), 100 * ((n + i) / 2)]
                },
                hsl2hwb: function (t) {
                    return o(h(t))
                },
                hsl2cmyk: function (t) {
                    return s(h(t))
                },
                hsl2keyword: function (t) {
                    return l(h(t))
                },
                hsv2rgb: c,
                hsv2hsl: function (t) {
                    var e, i, n = t[0],
                        a = t[1] / 100,
                        r = t[2] / 100;
                    return e = a * r, [n, 100 * (e = (e /= (i = (2 - a) * r) <= 1 ? i : 2 - i) || 0), 100 * (i /= 2)]
                },
                hsv2hwb: function (t) {
                    return o(c(t))
                },
                hsv2cmyk: function (t) {
                    return s(c(t))
                },
                hsv2keyword: function (t) {
                    return l(c(t))
                },
                hwb2rgb: f,
                hwb2hsl: function (t) {
                    return n(f(t))
                },
                hwb2hsv: function (t) {
                    return a(f(t))
                },
                hwb2cmyk: function (t) {
                    return s(f(t))
                },
                hwb2keyword: function (t) {
                    return l(f(t))
                },
                cmyk2rgb: m,
                cmyk2hsl: function (t) {
                    return n(m(t))
                },
                cmyk2hsv: function (t) {
                    return a(m(t))
                },
                cmyk2hwb: function (t) {
                    return o(m(t))
                },
                cmyk2keyword: function (t) {
                    return l(m(t))
                },
                keyword2rgb: w,
                keyword2hsl: function (t) {
                    return n(w(t))
                },
                keyword2hsv: function (t) {
                    return a(w(t))
                },
                keyword2hwb: function (t) {
                    return o(w(t))
                },
                keyword2cmyk: function (t) {
                    return s(w(t))
                },
                keyword2lab: function (t) {
                    return d(w(t))
                },
                keyword2xyz: function (t) {
                    return u(w(t))
                },
                xyz2rgb: p,
                xyz2lab: v,
                xyz2lch: function (t) {
                    return x(v(t))
                },
                lab2xyz: y,
                lab2rgb: _,
                lab2lch: x,
                lch2lab: k,
                lch2xyz: function (t) {
                    return y(k(t))
                },
                lch2rgb: function (t) {
                    return _(k(t))
                }
            };
            var M = {
                    aliceblue: [240, 248, 255],
                    antiquewhite: [250, 235, 215],
                    aqua: [0, 255, 255],
                    aquamarine: [127, 255, 212],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    bisque: [255, 228, 196],
                    black: [0, 0, 0],
                    blanchedalmond: [255, 235, 205],
                    blue: [0, 0, 255],
                    blueviolet: [138, 43, 226],
                    brown: [165, 42, 42],
                    burlywood: [222, 184, 135],
                    cadetblue: [95, 158, 160],
                    chartreuse: [127, 255, 0],
                    chocolate: [210, 105, 30],
                    coral: [255, 127, 80],
                    cornflowerblue: [100, 149, 237],
                    cornsilk: [255, 248, 220],
                    crimson: [220, 20, 60],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgoldenrod: [184, 134, 11],
                    darkgray: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkgrey: [169, 169, 169],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkseagreen: [143, 188, 143],
                    darkslateblue: [72, 61, 139],
                    darkslategray: [47, 79, 79],
                    darkslategrey: [47, 79, 79],
                    darkturquoise: [0, 206, 209],
                    darkviolet: [148, 0, 211],
                    deeppink: [255, 20, 147],
                    deepskyblue: [0, 191, 255],
                    dimgray: [105, 105, 105],
                    dimgrey: [105, 105, 105],
                    dodgerblue: [30, 144, 255],
                    firebrick: [178, 34, 34],
                    floralwhite: [255, 250, 240],
                    forestgreen: [34, 139, 34],
                    fuchsia: [255, 0, 255],
                    gainsboro: [220, 220, 220],
                    ghostwhite: [248, 248, 255],
                    gold: [255, 215, 0],
                    goldenrod: [218, 165, 32],
                    gray: [128, 128, 128],
                    green: [0, 128, 0],
                    greenyellow: [173, 255, 47],
                    grey: [128, 128, 128],
                    honeydew: [240, 255, 240],
                    hotpink: [255, 105, 180],
                    indianred: [205, 92, 92],
                    indigo: [75, 0, 130],
                    ivory: [255, 255, 240],
                    khaki: [240, 230, 140],
                    lavender: [230, 230, 250],
                    lavenderblush: [255, 240, 245],
                    lawngreen: [124, 252, 0],
                    lemonchiffon: [255, 250, 205],
                    lightblue: [173, 216, 230],
                    lightcoral: [240, 128, 128],
                    lightcyan: [224, 255, 255],
                    lightgoldenrodyellow: [250, 250, 210],
                    lightgray: [211, 211, 211],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightsalmon: [255, 160, 122],
                    lightseagreen: [32, 178, 170],
                    lightskyblue: [135, 206, 250],
                    lightslategray: [119, 136, 153],
                    lightslategrey: [119, 136, 153],
                    lightsteelblue: [176, 196, 222],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    limegreen: [50, 205, 50],
                    linen: [250, 240, 230],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    mediumaquamarine: [102, 205, 170],
                    mediumblue: [0, 0, 205],
                    mediumorchid: [186, 85, 211],
                    mediumpurple: [147, 112, 219],
                    mediumseagreen: [60, 179, 113],
                    mediumslateblue: [123, 104, 238],
                    mediumspringgreen: [0, 250, 154],
                    mediumturquoise: [72, 209, 204],
                    mediumvioletred: [199, 21, 133],
                    midnightblue: [25, 25, 112],
                    mintcream: [245, 255, 250],
                    mistyrose: [255, 228, 225],
                    moccasin: [255, 228, 181],
                    navajowhite: [255, 222, 173],
                    navy: [0, 0, 128],
                    oldlace: [253, 245, 230],
                    olive: [128, 128, 0],
                    olivedrab: [107, 142, 35],
                    orange: [255, 165, 0],
                    orangered: [255, 69, 0],
                    orchid: [218, 112, 214],
                    palegoldenrod: [238, 232, 170],
                    palegreen: [152, 251, 152],
                    paleturquoise: [175, 238, 238],
                    palevioletred: [219, 112, 147],
                    papayawhip: [255, 239, 213],
                    peachpuff: [255, 218, 185],
                    peru: [205, 133, 63],
                    pink: [255, 192, 203],
                    plum: [221, 160, 221],
                    powderblue: [176, 224, 230],
                    purple: [128, 0, 128],
                    rebeccapurple: [102, 51, 153],
                    red: [255, 0, 0],
                    rosybrown: [188, 143, 143],
                    royalblue: [65, 105, 225],
                    saddlebrown: [139, 69, 19],
                    salmon: [250, 128, 114],
                    sandybrown: [244, 164, 96],
                    seagreen: [46, 139, 87],
                    seashell: [255, 245, 238],
                    sienna: [160, 82, 45],
                    silver: [192, 192, 192],
                    skyblue: [135, 206, 235],
                    slateblue: [106, 90, 205],
                    slategray: [112, 128, 144],
                    slategrey: [112, 128, 144],
                    snow: [255, 250, 250],
                    springgreen: [0, 255, 127],
                    steelblue: [70, 130, 180],
                    tan: [210, 180, 140],
                    teal: [0, 128, 128],
                    thistle: [216, 191, 216],
                    tomato: [255, 99, 71],
                    turquoise: [64, 224, 208],
                    violet: [238, 130, 238],
                    wheat: [245, 222, 179],
                    white: [255, 255, 255],
                    whitesmoke: [245, 245, 245],
                    yellow: [255, 255, 0],
                    yellowgreen: [154, 205, 50]
                },
                S = {};
            for (var D in M) S[JSON.stringify(M[D])] = D
        }, {}],
        4: [function (t, e, i) {
            var n = t(3),
                a = function () {
                    return new u
                };
            for (var r in n) {
                a[r + "Raw"] = function (t) {
                    return function (e) {
                        return "number" == typeof e && (e = Array.prototype.slice.call(arguments)), n[t](e)
                    }
                }(r);
                var o = /(\w+)2(\w+)/.exec(r),
                    s = o[1],
                    l = o[2];
                (a[s] = a[s] || {})[l] = a[r] = function (t) {
                    return function (e) {
                        "number" == typeof e && (e = Array.prototype.slice.call(arguments));
                        var i = n[t](e);
                        if ("string" == typeof i || void 0 === i) return i;
                        for (var a = 0; a < i.length; a++) i[a] = Math.round(i[a]);
                        return i
                    }
                }(r)
            }
            var u = function () {
                this.convs = {}
            };
            u.prototype.routeSpace = function (t, e) {
                var i = e[0];
                return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i))
            }, u.prototype.setValues = function (t, e) {
                return this.space = t, this.convs = {}, this.convs[t] = e, this
            }, u.prototype.getValues = function (t) {
                var e = this.convs[t];
                if (!e) {
                    var i = this.space,
                        n = this.convs[i];
                    e = a[i][t](n), this.convs[t] = e
                }
                return e
            }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function (t) {
                u.prototype[t] = function (e) {
                    return this.routeSpace(t, arguments)
                }
            }), e.exports = a
        }, {
            3: 3
        }],
        5: [function (t, e, i) {
            "use strict";
            e.exports = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            }
        }, {}],
        6: [function (t, e, i) {
            var n, a;
            n = this, a = function () {
                "use strict";
                var i, n;

                function a() {
                    return i.apply(null, arguments)
                }

                function r(t) {
                    return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
                }

                function o(t) {
                    return null != t && "[object Object]" === Object.prototype.toString.call(t)
                }

                function s(t) {
                    return void 0 === t
                }

                function l(t) {
                    return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t)
                }

                function u(t) {
                    return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
                }

                function d(t, e) {
                    var i, n = [];
                    for (i = 0; i < t.length; ++i) n.push(e(t[i], i));
                    return n
                }

                function h(t, e) {
                    return Object.prototype.hasOwnProperty.call(t, e)
                }

                function c(t, e) {
                    for (var i in e) h(e, i) && (t[i] = e[i]);
                    return h(e, "toString") && (t.toString = e.toString), h(e, "valueOf") && (t.valueOf = e.valueOf), t
                }

                function f(t, e, i, n) {
                    return Pe(t, e, i, n, !0).utc()
                }

                function g(t) {
                    return null == t._pf && (t._pf = {
                        empty: !1,
                        unusedTokens: [],
                        unusedInput: [],
                        overflow: -2,
                        charsLeftOver: 0,
                        nullInput: !1,
                        invalidMonth: null,
                        invalidFormat: !1,
                        userInvalidated: !1,
                        iso: !1,
                        parsedDateParts: [],
                        meridiem: null,
                        rfc2822: !1,
                        weekdayMismatch: !1
                    }), t._pf
                }

                function m(t) {
                    if (null == t._isValid) {
                        var e = g(t),
                            i = n.call(e.parsedDateParts, function (t) {
                                return null != t
                            }),
                            a = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.weekdayMismatch && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && i);
                        if (t._strict && (a = a && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), null != Object.isFrozen && Object.isFrozen(t)) return a;
                        t._isValid = a
                    }
                    return t._isValid
                }

                function p(t) {
                    var e = f(NaN);
                    return null != t ? c(g(e), t) : g(e).userInvalidated = !0, e
                }
                n = Array.prototype.some ? Array.prototype.some : function (t) {
                    for (var e = Object(this), i = e.length >>> 0, n = 0; n < i; n++)
                        if (n in e && t.call(this, e[n], n, e)) return !0;
                    return !1
                };
                var v = a.momentProperties = [];

                function y(t, e) {
                    var i, n, a;
                    if (s(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), s(e._i) || (t._i = e._i), s(e._f) || (t._f = e._f), s(e._l) || (t._l = e._l), s(e._strict) || (t._strict = e._strict), s(e._tzm) || (t._tzm = e._tzm), s(e._isUTC) || (t._isUTC = e._isUTC), s(e._offset) || (t._offset = e._offset), s(e._pf) || (t._pf = g(e)), s(e._locale) || (t._locale = e._locale), v.length > 0)
                        for (i = 0; i < v.length; i++) s(a = e[n = v[i]]) || (t[n] = a);
                    return t
                }
                var b = !1;

                function x(t) {
                    y(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === b && (b = !0, a.updateOffset(this), b = !1)
                }

                function _(t) {
                    return t instanceof x || null != t && null != t._isAMomentObject
                }

                function k(t) {
                    return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
                }

                function w(t) {
                    var e = +t,
                        i = 0;
                    return 0 !== e && isFinite(e) && (i = k(e)), i
                }

                function M(t, e, i) {
                    var n, a = Math.min(t.length, e.length),
                        r = Math.abs(t.length - e.length),
                        o = 0;
                    for (n = 0; n < a; n++)(i && t[n] !== e[n] || !i && w(t[n]) !== w(e[n])) && o++;
                    return o + r
                }

                function S(t) {
                    !1 === a.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
                }

                function D(t, e) {
                    var i = !0;
                    return c(function () {
                        if (null != a.deprecationHandler && a.deprecationHandler(null, t), i) {
                            for (var n, r = [], o = 0; o < arguments.length; o++) {
                                if (n = "", "object" == typeof arguments[o]) {
                                    for (var s in n += "\n[" + o + "] ", arguments[0]) n += s + ": " + arguments[0][s] + ", ";
                                    n = n.slice(0, -2)
                                } else n = arguments[o];
                                r.push(n)
                            }
                            S(t + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + (new Error).stack), i = !1
                        }
                        return e.apply(this, arguments)
                    }, e)
                }
                var C, P = {};

                function T(t, e) {
                    null != a.deprecationHandler && a.deprecationHandler(t, e), P[t] || (S(e), P[t] = !0)
                }

                function O(t) {
                    return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
                }

                function I(t, e) {
                    var i, n = c({}, t);
                    for (i in e) h(e, i) && (o(t[i]) && o(e[i]) ? (n[i] = {}, c(n[i], t[i]), c(n[i], e[i])) : null != e[i] ? n[i] = e[i] : delete n[i]);
                    for (i in t) h(t, i) && !h(e, i) && o(t[i]) && (n[i] = c({}, n[i]));
                    return n
                }

                function A(t) {
                    null != t && this.set(t)
                }
                a.suppressDeprecationWarnings = !1, a.deprecationHandler = null, C = Object.keys ? Object.keys : function (t) {
                    var e, i = [];
                    for (e in t) h(t, e) && i.push(e);
                    return i
                };
                var F = {};

                function R(t, e) {
                    var i = t.toLowerCase();
                    F[i] = F[i + "s"] = F[e] = t
                }

                function L(t) {
                    return "string" == typeof t ? F[t] || F[t.toLowerCase()] : void 0
                }

                function W(t) {
                    var e, i, n = {};
                    for (i in t) h(t, i) && (e = L(i)) && (n[e] = t[i]);
                    return n
                }
                var Y = {};

                function N(t, e) {
                    Y[t] = e
                }

                function z(t, e, i) {
                    var n = "" + Math.abs(t),
                        a = e - n.length;
                    return (t >= 0 ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + n
                }
                var H = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
                    V = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
                    B = {},
                    E = {};

                function j(t, e, i, n) {
                    var a = n;
                    "string" == typeof n && (a = function () {
                        return this[n]()
                    }), t && (E[t] = a), e && (E[e[0]] = function () {
                        return z(a.apply(this, arguments), e[1], e[2])
                    }), i && (E[i] = function () {
                        return this.localeData().ordinal(a.apply(this, arguments), t)
                    })
                }

                function U(t, e) {
                    return t.isValid() ? (e = q(e, t.localeData()), B[e] = B[e] || function (t) {
                        var e, i, n, a = t.match(H);
                        for (e = 0, i = a.length; e < i; e++) E[a[e]] ? a[e] = E[a[e]] : a[e] = (n = a[e]).match(/\[[\s\S]/) ? n.replace(/^\[|\]$/g, "") : n.replace(/\\/g, "");
                        return function (e) {
                            var n, r = "";
                            for (n = 0; n < i; n++) r += O(a[n]) ? a[n].call(e, t) : a[n];
                            return r
                        }
                    }(e), B[e](t)) : t.localeData().invalidDate()
                }

                function q(t, e) {
                    var i = 5;

                    function n(t) {
                        return e.longDateFormat(t) || t
                    }
                    for (V.lastIndex = 0; i >= 0 && V.test(t);) t = t.replace(V, n), V.lastIndex = 0, i -= 1;
                    return t
                }
                var G = /\d/,
                    Z = /\d\d/,
                    X = /\d{3}/,
                    J = /\d{4}/,
                    K = /[+-]?\d{6}/,
                    $ = /\d\d?/,
                    Q = /\d\d\d\d?/,
                    tt = /\d\d\d\d\d\d?/,
                    et = /\d{1,3}/,
                    it = /\d{1,4}/,
                    nt = /[+-]?\d{1,6}/,
                    at = /\d+/,
                    rt = /[+-]?\d+/,
                    ot = /Z|[+-]\d\d:?\d\d/gi,
                    st = /Z|[+-]\d\d(?::?\d\d)?/gi,
                    lt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
                    ut = {};

                function dt(t, e, i) {
                    ut[t] = O(e) ? e : function (t, n) {
                        return t && i ? i : e
                    }
                }

                function ht(t, e) {
                    return h(ut, t) ? ut[t](e._strict, e._locale) : new RegExp(ct(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, i, n, a) {
                        return e || i || n || a
                    })))
                }

                function ct(t) {
                    return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                }
                var ft = {};

                function gt(t, e) {
                    var i, n = e;
                    for ("string" == typeof t && (t = [t]), l(e) && (n = function (t, i) {
                            i[e] = w(t)
                        }), i = 0; i < t.length; i++) ft[t[i]] = n
                }

                function mt(t, e) {
                    gt(t, function (t, i, n, a) {
                        n._w = n._w || {}, e(t, n._w, n, a)
                    })
                }
                var pt = 0,
                    vt = 1,
                    yt = 2,
                    bt = 3,
                    xt = 4,
                    _t = 5,
                    kt = 6,
                    wt = 7,
                    Mt = 8;

                function St(t) {
                    return Dt(t) ? 366 : 365
                }

                function Dt(t) {
                    return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
                }
                j("Y", 0, 0, function () {
                    var t = this.year();
                    return t <= 9999 ? "" + t : "+" + t
                }), j(0, ["YY", 2], 0, function () {
                    return this.year() % 100
                }), j(0, ["YYYY", 4], 0, "year"), j(0, ["YYYYY", 5], 0, "year"), j(0, ["YYYYYY", 6, !0], 0, "year"), R("year", "y"), N("year", 1), dt("Y", rt), dt("YY", $, Z), dt("YYYY", it, J), dt("YYYYY", nt, K), dt("YYYYYY", nt, K), gt(["YYYYY", "YYYYYY"], pt), gt("YYYY", function (t, e) {
                    e[pt] = 2 === t.length ? a.parseTwoDigitYear(t) : w(t)
                }), gt("YY", function (t, e) {
                    e[pt] = a.parseTwoDigitYear(t)
                }), gt("Y", function (t, e) {
                    e[pt] = parseInt(t, 10)
                }), a.parseTwoDigitYear = function (t) {
                    return w(t) + (w(t) > 68 ? 1900 : 2e3)
                };
                var Ct, Pt = Tt("FullYear", !0);

                function Tt(t, e) {
                    return function (i) {
                        return null != i ? (It(this, t, i), a.updateOffset(this, e), this) : Ot(this, t)
                    }
                }

                function Ot(t, e) {
                    return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
                }

                function It(t, e, i) {
                    t.isValid() && !isNaN(i) && ("FullYear" === e && Dt(t.year()) && 1 === t.month() && 29 === t.date() ? t._d["set" + (t._isUTC ? "UTC" : "") + e](i, t.month(), At(i, t.month())) : t._d["set" + (t._isUTC ? "UTC" : "") + e](i))
                }

                function At(t, e) {
                    if (isNaN(t) || isNaN(e)) return NaN;
                    var i, n = (e % (i = 12) + i) % i;
                    return t += (e - n) / 12, 1 === n ? Dt(t) ? 29 : 28 : 31 - n % 7 % 2
                }
                Ct = Array.prototype.indexOf ? Array.prototype.indexOf : function (t) {
                    var e;
                    for (e = 0; e < this.length; ++e)
                        if (this[e] === t) return e;
                    return -1
                }, j("M", ["MM", 2], "Mo", function () {
                    return this.month() + 1
                }), j("MMM", 0, 0, function (t) {
                    return this.localeData().monthsShort(this, t)
                }), j("MMMM", 0, 0, function (t) {
                    return this.localeData().months(this, t)
                }), R("month", "M"), N("month", 8), dt("M", $), dt("MM", $, Z), dt("MMM", function (t, e) {
                    return e.monthsShortRegex(t)
                }), dt("MMMM", function (t, e) {
                    return e.monthsRegex(t)
                }), gt(["M", "MM"], function (t, e) {
                    e[vt] = w(t) - 1
                }), gt(["MMM", "MMMM"], function (t, e, i, n) {
                    var a = i._locale.monthsParse(t, n, i._strict);
                    null != a ? e[vt] = a : g(i).invalidMonth = t
                });
                var Ft = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
                    Rt = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
                var Lt = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");

                function Wt(t, e) {
                    var i;
                    if (!t.isValid()) return t;
                    if ("string" == typeof e)
                        if (/^\d+$/.test(e)) e = w(e);
                        else if (!l(e = t.localeData().monthsParse(e))) return t;
                    return i = Math.min(t.date(), At(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i), t
                }

                function Yt(t) {
                    return null != t ? (Wt(this, t), a.updateOffset(this, !0), this) : Ot(this, "Month")
                }
                var Nt = lt;
                var zt = lt;

                function Ht() {
                    function t(t, e) {
                        return e.length - t.length
                    }
                    var e, i, n = [],
                        a = [],
                        r = [];
                    for (e = 0; e < 12; e++) i = f([2e3, e]), n.push(this.monthsShort(i, "")), a.push(this.months(i, "")), r.push(this.months(i, "")), r.push(this.monthsShort(i, ""));
                    for (n.sort(t), a.sort(t), r.sort(t), e = 0; e < 12; e++) n[e] = ct(n[e]), a[e] = ct(a[e]);
                    for (e = 0; e < 24; e++) r[e] = ct(r[e]);
                    this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i")
                }

                function Vt(t) {
                    var e = new Date(Date.UTC.apply(null, arguments));
                    return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e
                }

                function Bt(t, e, i) {
                    var n = 7 + e - i;
                    return -((7 + Vt(t, 0, n).getUTCDay() - e) % 7) + n - 1
                }

                function Et(t, e, i, n, a) {
                    var r, o, s = 1 + 7 * (e - 1) + (7 + i - n) % 7 + Bt(t, n, a);
                    return s <= 0 ? o = St(r = t - 1) + s : s > St(t) ? (r = t + 1, o = s - St(t)) : (r = t, o = s), {
                        year: r,
                        dayOfYear: o
                    }
                }

                function jt(t, e, i) {
                    var n, a, r = Bt(t.year(), e, i),
                        o = Math.floor((t.dayOfYear() - r - 1) / 7) + 1;
                    return o < 1 ? n = o + Ut(a = t.year() - 1, e, i) : o > Ut(t.year(), e, i) ? (n = o - Ut(t.year(), e, i), a = t.year() + 1) : (a = t.year(), n = o), {
                        week: n,
                        year: a
                    }
                }

                function Ut(t, e, i) {
                    var n = Bt(t, e, i),
                        a = Bt(t + 1, e, i);
                    return (St(t) - n + a) / 7
                }
                j("w", ["ww", 2], "wo", "week"), j("W", ["WW", 2], "Wo", "isoWeek"), R("week", "w"), R("isoWeek", "W"), N("week", 5), N("isoWeek", 5), dt("w", $), dt("ww", $, Z), dt("W", $), dt("WW", $, Z), mt(["w", "ww", "W", "WW"], function (t, e, i, n) {
                    e[n.substr(0, 1)] = w(t)
                });
                j("d", 0, "do", "day"), j("dd", 0, 0, function (t) {
                    return this.localeData().weekdaysMin(this, t)
                }), j("ddd", 0, 0, function (t) {
                    return this.localeData().weekdaysShort(this, t)
                }), j("dddd", 0, 0, function (t) {
                    return this.localeData().weekdays(this, t)
                }), j("e", 0, 0, "weekday"), j("E", 0, 0, "isoWeekday"), R("day", "d"), R("weekday", "e"), R("isoWeekday", "E"), N("day", 11), N("weekday", 11), N("isoWeekday", 11), dt("d", $), dt("e", $), dt("E", $), dt("dd", function (t, e) {
                    return e.weekdaysMinRegex(t)
                }), dt("ddd", function (t, e) {
                    return e.weekdaysShortRegex(t)
                }), dt("dddd", function (t, e) {
                    return e.weekdaysRegex(t)
                }), mt(["dd", "ddd", "dddd"], function (t, e, i, n) {
                    var a = i._locale.weekdaysParse(t, n, i._strict);
                    null != a ? e.d = a : g(i).invalidWeekday = t
                }), mt(["d", "e", "E"], function (t, e, i, n) {
                    e[n] = w(t)
                });
                var qt = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
                var Gt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
                var Zt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
                var Xt = lt;
                var Jt = lt;
                var Kt = lt;

                function $t() {
                    function t(t, e) {
                        return e.length - t.length
                    }
                    var e, i, n, a, r, o = [],
                        s = [],
                        l = [],
                        u = [];
                    for (e = 0; e < 7; e++) i = f([2e3, 1]).day(e), n = this.weekdaysMin(i, ""), a = this.weekdaysShort(i, ""), r = this.weekdays(i, ""), o.push(n), s.push(a), l.push(r), u.push(n), u.push(a), u.push(r);
                    for (o.sort(t), s.sort(t), l.sort(t), u.sort(t), e = 0; e < 7; e++) s[e] = ct(s[e]), l[e] = ct(l[e]), u[e] = ct(u[e]);
                    this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + o.join("|") + ")", "i")
                }

                function Qt() {
                    return this.hours() % 12 || 12
                }

                function te(t, e) {
                    j(t, 0, 0, function () {
                        return this.localeData().meridiem(this.hours(), this.minutes(), e)
                    })
                }

                function ee(t, e) {
                    return e._meridiemParse
                }
                j("H", ["HH", 2], 0, "hour"), j("h", ["hh", 2], 0, Qt), j("k", ["kk", 2], 0, function () {
                    return this.hours() || 24
                }), j("hmm", 0, 0, function () {
                    return "" + Qt.apply(this) + z(this.minutes(), 2)
                }), j("hmmss", 0, 0, function () {
                    return "" + Qt.apply(this) + z(this.minutes(), 2) + z(this.seconds(), 2)
                }), j("Hmm", 0, 0, function () {
                    return "" + this.hours() + z(this.minutes(), 2)
                }), j("Hmmss", 0, 0, function () {
                    return "" + this.hours() + z(this.minutes(), 2) + z(this.seconds(), 2)
                }), te("a", !0), te("A", !1), R("hour", "h"), N("hour", 13), dt("a", ee), dt("A", ee), dt("H", $), dt("h", $), dt("k", $), dt("HH", $, Z), dt("hh", $, Z), dt("kk", $, Z), dt("hmm", Q), dt("hmmss", tt), dt("Hmm", Q), dt("Hmmss", tt), gt(["H", "HH"], bt), gt(["k", "kk"], function (t, e, i) {
                    var n = w(t);
                    e[bt] = 24 === n ? 0 : n
                }), gt(["a", "A"], function (t, e, i) {
                    i._isPm = i._locale.isPM(t), i._meridiem = t
                }), gt(["h", "hh"], function (t, e, i) {
                    e[bt] = w(t), g(i).bigHour = !0
                }), gt("hmm", function (t, e, i) {
                    var n = t.length - 2;
                    e[bt] = w(t.substr(0, n)), e[xt] = w(t.substr(n)), g(i).bigHour = !0
                }), gt("hmmss", function (t, e, i) {
                    var n = t.length - 4,
                        a = t.length - 2;
                    e[bt] = w(t.substr(0, n)), e[xt] = w(t.substr(n, 2)), e[_t] = w(t.substr(a)), g(i).bigHour = !0
                }), gt("Hmm", function (t, e, i) {
                    var n = t.length - 2;
                    e[bt] = w(t.substr(0, n)), e[xt] = w(t.substr(n))
                }), gt("Hmmss", function (t, e, i) {
                    var n = t.length - 4,
                        a = t.length - 2;
                    e[bt] = w(t.substr(0, n)), e[xt] = w(t.substr(n, 2)), e[_t] = w(t.substr(a))
                });
                var ie, ne = Tt("Hours", !0),
                    ae = {
                        calendar: {
                            sameDay: "[Today at] LT",
                            nextDay: "[Tomorrow at] LT",
                            nextWeek: "dddd [at] LT",
                            lastDay: "[Yesterday at] LT",
                            lastWeek: "[Last] dddd [at] LT",
                            sameElse: "L"
                        },
                        longDateFormat: {
                            LTS: "h:mm:ss A",
                            LT: "h:mm A",
                            L: "MM/DD/YYYY",
                            LL: "MMMM D, YYYY",
                            LLL: "MMMM D, YYYY h:mm A",
                            LLLL: "dddd, MMMM D, YYYY h:mm A"
                        },
                        invalidDate: "Invalid date",
                        ordinal: "%d",
                        dayOfMonthOrdinalParse: /\d{1,2}/,
                        relativeTime: {
                            future: "in %s",
                            past: "%s ago",
                            s: "a few seconds",
                            ss: "%d seconds",
                            m: "a minute",
                            mm: "%d minutes",
                            h: "an hour",
                            hh: "%d hours",
                            d: "a day",
                            dd: "%d days",
                            M: "a month",
                            MM: "%d months",
                            y: "a year",
                            yy: "%d years"
                        },
                        months: Rt,
                        monthsShort: Lt,
                        week: {
                            dow: 0,
                            doy: 6
                        },
                        weekdays: qt,
                        weekdaysMin: Zt,
                        weekdaysShort: Gt,
                        meridiemParse: /[ap]\.?m?\.?/i
                    },
                    re = {},
                    oe = {};

                function se(t) {
                    return t ? t.toLowerCase().replace("_", "-") : t
                }

                function le(i) {
                    var n = null;
                    if (!re[i] && void 0 !== e && e && e.exports) try {
                        n = ie._abbr, t("./locale/" + i), ue(n)
                    } catch (t) {}
                    return re[i]
                }

                function ue(t, e) {
                    var i;
                    return t && (i = s(e) ? he(t) : de(t, e)) && (ie = i), ie._abbr
                }

                function de(t, e) {
                    if (null !== e) {
                        var i = ae;
                        if (e.abbr = t, null != re[t]) T("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), i = re[t]._config;
                        else if (null != e.parentLocale) {
                            if (null == re[e.parentLocale]) return oe[e.parentLocale] || (oe[e.parentLocale] = []), oe[e.parentLocale].push({
                                name: t,
                                config: e
                            }), null;
                            i = re[e.parentLocale]._config
                        }
                        return re[t] = new A(I(i, e)), oe[t] && oe[t].forEach(function (t) {
                            de(t.name, t.config)
                        }), ue(t), re[t]
                    }
                    return delete re[t], null
                }

                function he(t) {
                    var e;
                    if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return ie;
                    if (!r(t)) {
                        if (e = le(t)) return e;
                        t = [t]
                    }
                    return function (t) {
                        for (var e, i, n, a, r = 0; r < t.length;) {
                            for (e = (a = se(t[r]).split("-")).length, i = (i = se(t[r + 1])) ? i.split("-") : null; e > 0;) {
                                if (n = le(a.slice(0, e).join("-"))) return n;
                                if (i && i.length >= e && M(a, i, !0) >= e - 1) break;
                                e--
                            }
                            r++
                        }
                        return null
                    }(t)
                }

                function ce(t) {
                    var e, i = t._a;
                    return i && -2 === g(t).overflow && (e = i[vt] < 0 || i[vt] > 11 ? vt : i[yt] < 1 || i[yt] > At(i[pt], i[vt]) ? yt : i[bt] < 0 || i[bt] > 24 || 24 === i[bt] && (0 !== i[xt] || 0 !== i[_t] || 0 !== i[kt]) ? bt : i[xt] < 0 || i[xt] > 59 ? xt : i[_t] < 0 || i[_t] > 59 ? _t : i[kt] < 0 || i[kt] > 999 ? kt : -1, g(t)._overflowDayOfYear && (e < pt || e > yt) && (e = yt), g(t)._overflowWeeks && -1 === e && (e = wt), g(t)._overflowWeekday && -1 === e && (e = Mt), g(t).overflow = e), t
                }

                function fe(t, e, i) {
                    return null != t ? t : null != e ? e : i
                }

                function ge(t) {
                    var e, i, n, r, o, s = [];
                    if (!t._d) {
                        var l, u;
                        for (l = t, u = new Date(a.now()), n = l._useUTC ? [u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate()] : [u.getFullYear(), u.getMonth(), u.getDate()], t._w && null == t._a[yt] && null == t._a[vt] && function (t) {
                                var e, i, n, a, r, o, s, l;
                                if (null != (e = t._w).GG || null != e.W || null != e.E) r = 1, o = 4, i = fe(e.GG, t._a[pt], jt(Te(), 1, 4).year), n = fe(e.W, 1), ((a = fe(e.E, 1)) < 1 || a > 7) && (l = !0);
                                else {
                                    r = t._locale._week.dow, o = t._locale._week.doy;
                                    var u = jt(Te(), r, o);
                                    i = fe(e.gg, t._a[pt], u.year), n = fe(e.w, u.week), null != e.d ? ((a = e.d) < 0 || a > 6) && (l = !0) : null != e.e ? (a = e.e + r, (e.e < 0 || e.e > 6) && (l = !0)) : a = r
                                }
                                n < 1 || n > Ut(i, r, o) ? g(t)._overflowWeeks = !0 : null != l ? g(t)._overflowWeekday = !0 : (s = Et(i, n, a, r, o), t._a[pt] = s.year, t._dayOfYear = s.dayOfYear)
                            }(t), null != t._dayOfYear && (o = fe(t._a[pt], n[pt]), (t._dayOfYear > St(o) || 0 === t._dayOfYear) && (g(t)._overflowDayOfYear = !0), i = Vt(o, 0, t._dayOfYear), t._a[vt] = i.getUTCMonth(), t._a[yt] = i.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e) t._a[e] = s[e] = n[e];
                        for (; e < 7; e++) t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                        24 === t._a[bt] && 0 === t._a[xt] && 0 === t._a[_t] && 0 === t._a[kt] && (t._nextDay = !0, t._a[bt] = 0), t._d = (t._useUTC ? Vt : function (t, e, i, n, a, r, o) {
                            var s = new Date(t, e, i, n, a, r, o);
                            return t < 100 && t >= 0 && isFinite(s.getFullYear()) && s.setFullYear(t), s
                        }).apply(null, s), r = t._useUTC ? t._d.getUTCDay() : t._d.getDay(), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[bt] = 24), t._w && void 0 !== t._w.d && t._w.d !== r && (g(t).weekdayMismatch = !0)
                    }
                }
                var me = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                    pe = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                    ve = /Z|[+-]\d\d(?::?\d\d)?/,
                    ye = [
                        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                        ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                        ["YYYY-DDD", /\d{4}-\d{3}/],
                        ["YYYY-MM", /\d{4}-\d\d/, !1],
                        ["YYYYYYMMDD", /[+-]\d{10}/],
                        ["YYYYMMDD", /\d{8}/],
                        ["GGGG[W]WWE", /\d{4}W\d{3}/],
                        ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                        ["YYYYDDD", /\d{7}/]
                    ],
                    be = [
                        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                        ["HH:mm", /\d\d:\d\d/],
                        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                        ["HHmmss", /\d\d\d\d\d\d/],
                        ["HHmm", /\d\d\d\d/],
                        ["HH", /\d\d/]
                    ],
                    xe = /^\/?Date\((\-?\d+)/i;

                function _e(t) {
                    var e, i, n, a, r, o, s = t._i,
                        l = me.exec(s) || pe.exec(s);
                    if (l) {
                        for (g(t).iso = !0, e = 0, i = ye.length; e < i; e++)
                            if (ye[e][1].exec(l[1])) {
                                a = ye[e][0], n = !1 !== ye[e][2];
                                break
                            } if (null == a) return void(t._isValid = !1);
                        if (l[3]) {
                            for (e = 0, i = be.length; e < i; e++)
                                if (be[e][1].exec(l[3])) {
                                    r = (l[2] || " ") + be[e][0];
                                    break
                                } if (null == r) return void(t._isValid = !1)
                        }
                        if (!n && null != r) return void(t._isValid = !1);
                        if (l[4]) {
                            if (!ve.exec(l[4])) return void(t._isValid = !1);
                            o = "Z"
                        }
                        t._f = a + (r || "") + (o || ""), De(t)
                    } else t._isValid = !1
                }
                var ke = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

                function we(t, e, i, n, a, r) {
                    var o = [function (t) {
                        var e = parseInt(t, 10); {
                            if (e <= 49) return 2e3 + e;
                            if (e <= 999) return 1900 + e
                        }
                        return e
                    }(t), Lt.indexOf(e), parseInt(i, 10), parseInt(n, 10), parseInt(a, 10)];
                    return r && o.push(parseInt(r, 10)), o
                }
                var Me = {
                    UT: 0,
                    GMT: 0,
                    EDT: -240,
                    EST: -300,
                    CDT: -300,
                    CST: -360,
                    MDT: -360,
                    MST: -420,
                    PDT: -420,
                    PST: -480
                };

                function Se(t) {
                    var e, i, n, a = ke.exec(t._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim());
                    if (a) {
                        var r = we(a[4], a[3], a[2], a[5], a[6], a[7]);
                        if (e = a[1], i = r, n = t, e && Gt.indexOf(e) !== new Date(i[0], i[1], i[2]).getDay() && (g(n).weekdayMismatch = !0, n._isValid = !1, 1)) return;
                        t._a = r, t._tzm = function (t, e, i) {
                            if (t) return Me[t];
                            if (e) return 0;
                            var n = parseInt(i, 10),
                                a = n % 100;
                            return (n - a) / 100 * 60 + a
                        }(a[8], a[9], a[10]), t._d = Vt.apply(null, t._a), t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), g(t).rfc2822 = !0
                    } else t._isValid = !1
                }

                function De(t) {
                    if (t._f !== a.ISO_8601)
                        if (t._f !== a.RFC_2822) {
                            t._a = [], g(t).empty = !0;
                            var e, i, n, r, o, s, l, u, d = "" + t._i,
                                c = d.length,
                                f = 0;
                            for (n = q(t._f, t._locale).match(H) || [], e = 0; e < n.length; e++) r = n[e], (i = (d.match(ht(r, t)) || [])[0]) && ((o = d.substr(0, d.indexOf(i))).length > 0 && g(t).unusedInput.push(o), d = d.slice(d.indexOf(i) + i.length), f += i.length), E[r] ? (i ? g(t).empty = !1 : g(t).unusedTokens.push(r), s = r, u = t, null != (l = i) && h(ft, s) && ft[s](l, u._a, u, s)) : t._strict && !i && g(t).unusedTokens.push(r);
                            g(t).charsLeftOver = c - f, d.length > 0 && g(t).unusedInput.push(d), t._a[bt] <= 12 && !0 === g(t).bigHour && t._a[bt] > 0 && (g(t).bigHour = void 0), g(t).parsedDateParts = t._a.slice(0), g(t).meridiem = t._meridiem, t._a[bt] = function (t, e, i) {
                                var n;
                                if (null == i) return e;
                                return null != t.meridiemHour ? t.meridiemHour(e, i) : null != t.isPM ? ((n = t.isPM(i)) && e < 12 && (e += 12), n || 12 !== e || (e = 0), e) : e
                            }(t._locale, t._a[bt], t._meridiem), ge(t), ce(t)
                        } else Se(t);
                    else _e(t)
                }

                function Ce(t) {
                    var e, i, n, h, f = t._i,
                        v = t._f;
                    return t._locale = t._locale || he(t._l), null === f || void 0 === v && "" === f ? p({
                        nullInput: !0
                    }) : ("string" == typeof f && (t._i = f = t._locale.preparse(f)), _(f) ? new x(ce(f)) : (u(f) ? t._d = f : r(v) ? function (t) {
                        var e, i, n, a, r;
                        if (0 === t._f.length) return g(t).invalidFormat = !0, void(t._d = new Date(NaN));
                        for (a = 0; a < t._f.length; a++) r = 0, e = y({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[a], De(e), m(e) && (r += g(e).charsLeftOver, r += 10 * g(e).unusedTokens.length, g(e).score = r, (null == n || r < n) && (n = r, i = e));
                        c(t, i || e)
                    }(t) : v ? De(t) : s(i = (e = t)._i) ? e._d = new Date(a.now()) : u(i) ? e._d = new Date(i.valueOf()) : "string" == typeof i ? (n = e, null === (h = xe.exec(n._i)) ? (_e(n), !1 === n._isValid && (delete n._isValid, Se(n), !1 === n._isValid && (delete n._isValid, a.createFromInputFallback(n)))) : n._d = new Date(+h[1])) : r(i) ? (e._a = d(i.slice(0), function (t) {
                        return parseInt(t, 10)
                    }), ge(e)) : o(i) ? function (t) {
                        if (!t._d) {
                            var e = W(t._i);
                            t._a = d([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function (t) {
                                return t && parseInt(t, 10)
                            }), ge(t)
                        }
                    }(e) : l(i) ? e._d = new Date(i) : a.createFromInputFallback(e), m(t) || (t._d = null), t))
                }

                function Pe(t, e, i, n, a) {
                    var s, l = {};
                    return !0 !== i && !1 !== i || (n = i, i = void 0), (o(t) && function (t) {
                        if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(t).length;
                        var e;
                        for (e in t)
                            if (t.hasOwnProperty(e)) return !1;
                        return !0
                    }(t) || r(t) && 0 === t.length) && (t = void 0), l._isAMomentObject = !0, l._useUTC = l._isUTC = a, l._l = i, l._i = t, l._f = e, l._strict = n, (s = new x(ce(Ce(l))))._nextDay && (s.add(1, "d"), s._nextDay = void 0), s
                }

                function Te(t, e, i, n) {
                    return Pe(t, e, i, n, !1)
                }
                a.createFromInputFallback = D("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (t) {
                    t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
                }), a.ISO_8601 = function () {}, a.RFC_2822 = function () {};
                var Oe = D("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                        var t = Te.apply(null, arguments);
                        return this.isValid() && t.isValid() ? t < this ? this : t : p()
                    }),
                    Ie = D("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                        var t = Te.apply(null, arguments);
                        return this.isValid() && t.isValid() ? t > this ? this : t : p()
                    });

                function Ae(t, e) {
                    var i, n;
                    if (1 === e.length && r(e[0]) && (e = e[0]), !e.length) return Te();
                    for (i = e[0], n = 1; n < e.length; ++n) e[n].isValid() && !e[n][t](i) || (i = e[n]);
                    return i
                }
                var Fe = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

                function Re(t) {
                    var e = W(t),
                        i = e.year || 0,
                        n = e.quarter || 0,
                        a = e.month || 0,
                        r = e.week || 0,
                        o = e.day || 0,
                        s = e.hour || 0,
                        l = e.minute || 0,
                        u = e.second || 0,
                        d = e.millisecond || 0;
                    this._isValid = function (t) {
                        for (var e in t)
                            if (-1 === Ct.call(Fe, e) || null != t[e] && isNaN(t[e])) return !1;
                        for (var i = !1, n = 0; n < Fe.length; ++n)
                            if (t[Fe[n]]) {
                                if (i) return !1;
                                parseFloat(t[Fe[n]]) !== w(t[Fe[n]]) && (i = !0)
                            } return !0
                    }(e), this._milliseconds = +d + 1e3 * u + 6e4 * l + 1e3 * s * 60 * 60, this._days = +o + 7 * r, this._months = +a + 3 * n + 12 * i, this._data = {}, this._locale = he(), this._bubble()
                }

                function Le(t) {
                    return t instanceof Re
                }

                function We(t) {
                    return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t)
                }

                function Ye(t, e) {
                    j(t, 0, 0, function () {
                        var t = this.utcOffset(),
                            i = "+";
                        return t < 0 && (t = -t, i = "-"), i + z(~~(t / 60), 2) + e + z(~~t % 60, 2)
                    })
                }
                Ye("Z", ":"), Ye("ZZ", ""), dt("Z", st), dt("ZZ", st), gt(["Z", "ZZ"], function (t, e, i) {
                    i._useUTC = !0, i._tzm = ze(st, t)
                });
                var Ne = /([\+\-]|\d\d)/gi;

                function ze(t, e) {
                    var i = (e || "").match(t);
                    if (null === i) return null;
                    var n = ((i[i.length - 1] || []) + "").match(Ne) || ["-", 0, 0],
                        a = 60 * n[1] + w(n[2]);
                    return 0 === a ? 0 : "+" === n[0] ? a : -a
                }

                function He(t, e) {
                    var i, n;
                    return e._isUTC ? (i = e.clone(), n = (_(t) || u(t) ? t.valueOf() : Te(t).valueOf()) - i.valueOf(), i._d.setTime(i._d.valueOf() + n), a.updateOffset(i, !1), i) : Te(t).local()
                }

                function Ve(t) {
                    return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
                }

                function Be() {
                    return !!this.isValid() && (this._isUTC && 0 === this._offset)
                }
                a.updateOffset = function () {};
                var Ee = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
                    je = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

                function Ue(t, e) {
                    var i, n, a, r = t,
                        o = null;
                    return Le(t) ? r = {
                        ms: t._milliseconds,
                        d: t._days,
                        M: t._months
                    } : l(t) ? (r = {}, e ? r[e] = t : r.milliseconds = t) : (o = Ee.exec(t)) ? (i = "-" === o[1] ? -1 : 1, r = {
                        y: 0,
                        d: w(o[yt]) * i,
                        h: w(o[bt]) * i,
                        m: w(o[xt]) * i,
                        s: w(o[_t]) * i,
                        ms: w(We(1e3 * o[kt])) * i
                    }) : (o = je.exec(t)) ? (i = "-" === o[1] ? -1 : (o[1], 1), r = {
                        y: qe(o[2], i),
                        M: qe(o[3], i),
                        w: qe(o[4], i),
                        d: qe(o[5], i),
                        h: qe(o[6], i),
                        m: qe(o[7], i),
                        s: qe(o[8], i)
                    }) : null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (a = function (t, e) {
                        var i;
                        if (!t.isValid() || !e.isValid()) return {
                            milliseconds: 0,
                            months: 0
                        };
                        e = He(e, t), t.isBefore(e) ? i = Ge(t, e) : ((i = Ge(e, t)).milliseconds = -i.milliseconds, i.months = -i.months);
                        return i
                    }(Te(r.from), Te(r.to)), (r = {}).ms = a.milliseconds, r.M = a.months), n = new Re(r), Le(t) && h(t, "_locale") && (n._locale = t._locale), n
                }

                function qe(t, e) {
                    var i = t && parseFloat(t.replace(",", "."));
                    return (isNaN(i) ? 0 : i) * e
                }

                function Ge(t, e) {
                    var i = {
                        milliseconds: 0,
                        months: 0
                    };
                    return i.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(i.months, "M").isAfter(e) && --i.months, i.milliseconds = +e - +t.clone().add(i.months, "M"), i
                }

                function Ze(t, e) {
                    return function (i, n) {
                        var a;
                        return null === n || isNaN(+n) || (T(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), a = i, i = n, n = a), Xe(this, Ue(i = "string" == typeof i ? +i : i, n), t), this
                    }
                }

                function Xe(t, e, i, n) {
                    var r = e._milliseconds,
                        o = We(e._days),
                        s = We(e._months);
                    t.isValid() && (n = null == n || n, s && Wt(t, Ot(t, "Month") + s * i), o && It(t, "Date", Ot(t, "Date") + o * i), r && t._d.setTime(t._d.valueOf() + r * i), n && a.updateOffset(t, o || s))
                }
                Ue.fn = Re.prototype, Ue.invalid = function () {
                    return Ue(NaN)
                };
                var Je = Ze(1, "add"),
                    Ke = Ze(-1, "subtract");

                function $e(t, e) {
                    var i = 12 * (e.year() - t.year()) + (e.month() - t.month()),
                        n = t.clone().add(i, "months");
                    return -(i + (e - n < 0 ? (e - n) / (n - t.clone().add(i - 1, "months")) : (e - n) / (t.clone().add(i + 1, "months") - n))) || 0
                }

                function Qe(t) {
                    var e;
                    return void 0 === t ? this._locale._abbr : (null != (e = he(t)) && (this._locale = e), this)
                }
                a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
                var ti = D("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
                    return void 0 === t ? this.localeData() : this.locale(t)
                });

                function ei() {
                    return this._locale
                }

                function ii(t, e) {
                    j(0, [t, t.length], 0, e)
                }

                function ni(t, e, i, n, a) {
                    var r;
                    return null == t ? jt(this, n, a).year : (e > (r = Ut(t, n, a)) && (e = r), function (t, e, i, n, a) {
                        var r = Et(t, e, i, n, a),
                            o = Vt(r.year, 0, r.dayOfYear);
                        return this.year(o.getUTCFullYear()), this.month(o.getUTCMonth()), this.date(o.getUTCDate()), this
                    }.call(this, t, e, i, n, a))
                }
                j(0, ["gg", 2], 0, function () {
                    return this.weekYear() % 100
                }), j(0, ["GG", 2], 0, function () {
                    return this.isoWeekYear() % 100
                }), ii("gggg", "weekYear"), ii("ggggg", "weekYear"), ii("GGGG", "isoWeekYear"), ii("GGGGG", "isoWeekYear"), R("weekYear", "gg"), R("isoWeekYear", "GG"), N("weekYear", 1), N("isoWeekYear", 1), dt("G", rt), dt("g", rt), dt("GG", $, Z), dt("gg", $, Z), dt("GGGG", it, J), dt("gggg", it, J), dt("GGGGG", nt, K), dt("ggggg", nt, K), mt(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, i, n) {
                    e[n.substr(0, 2)] = w(t)
                }), mt(["gg", "GG"], function (t, e, i, n) {
                    e[n] = a.parseTwoDigitYear(t)
                }), j("Q", 0, "Qo", "quarter"), R("quarter", "Q"), N("quarter", 7), dt("Q", G), gt("Q", function (t, e) {
                    e[vt] = 3 * (w(t) - 1)
                }), j("D", ["DD", 2], "Do", "date"), R("date", "D"), N("date", 9), dt("D", $), dt("DD", $, Z), dt("Do", function (t, e) {
                    return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient
                }), gt(["D", "DD"], yt), gt("Do", function (t, e) {
                    e[yt] = w(t.match($)[0])
                });
                var ai = Tt("Date", !0);
                j("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), R("dayOfYear", "DDD"), N("dayOfYear", 4), dt("DDD", et), dt("DDDD", X), gt(["DDD", "DDDD"], function (t, e, i) {
                    i._dayOfYear = w(t)
                }), j("m", ["mm", 2], 0, "minute"), R("minute", "m"), N("minute", 14), dt("m", $), dt("mm", $, Z), gt(["m", "mm"], xt);
                var ri = Tt("Minutes", !1);
                j("s", ["ss", 2], 0, "second"), R("second", "s"), N("second", 15), dt("s", $), dt("ss", $, Z), gt(["s", "ss"], _t);
                var oi, si = Tt("Seconds", !1);
                for (j("S", 0, 0, function () {
                        return ~~(this.millisecond() / 100)
                    }), j(0, ["SS", 2], 0, function () {
                        return ~~(this.millisecond() / 10)
                    }), j(0, ["SSS", 3], 0, "millisecond"), j(0, ["SSSS", 4], 0, function () {
                        return 10 * this.millisecond()
                    }), j(0, ["SSSSS", 5], 0, function () {
                        return 100 * this.millisecond()
                    }), j(0, ["SSSSSS", 6], 0, function () {
                        return 1e3 * this.millisecond()
                    }), j(0, ["SSSSSSS", 7], 0, function () {
                        return 1e4 * this.millisecond()
                    }), j(0, ["SSSSSSSS", 8], 0, function () {
                        return 1e5 * this.millisecond()
                    }), j(0, ["SSSSSSSSS", 9], 0, function () {
                        return 1e6 * this.millisecond()
                    }), R("millisecond", "ms"), N("millisecond", 16), dt("S", et, G), dt("SS", et, Z), dt("SSS", et, X), oi = "SSSS"; oi.length <= 9; oi += "S") dt(oi, at);

                function li(t, e) {
                    e[kt] = w(1e3 * ("0." + t))
                }
                for (oi = "S"; oi.length <= 9; oi += "S") gt(oi, li);
                var ui = Tt("Milliseconds", !1);
                j("z", 0, 0, "zoneAbbr"), j("zz", 0, 0, "zoneName");
                var di = x.prototype;

                function hi(t) {
                    return t
                }
                di.add = Je, di.calendar = function (t, e) {
                    var i = t || Te(),
                        n = He(i, this).startOf("day"),
                        r = a.calendarFormat(this, n) || "sameElse",
                        o = e && (O(e[r]) ? e[r].call(this, i) : e[r]);
                    return this.format(o || this.localeData().calendar(r, this, Te(i)))
                }, di.clone = function () {
                    return new x(this)
                }, di.diff = function (t, e, i) {
                    var n, a, r;
                    if (!this.isValid()) return NaN;
                    if (!(n = He(t, this)).isValid()) return NaN;
                    switch (a = 6e4 * (n.utcOffset() - this.utcOffset()), e = L(e)) {
                        case "year":
                            r = $e(this, n) / 12;
                            break;
                        case "month":
                            r = $e(this, n);
                            break;
                        case "quarter":
                            r = $e(this, n) / 3;
                            break;
                        case "second":
                            r = (this - n) / 1e3;
                            break;
                        case "minute":
                            r = (this - n) / 6e4;
                            break;
                        case "hour":
                            r = (this - n) / 36e5;
                            break;
                        case "day":
                            r = (this - n - a) / 864e5;
                            break;
                        case "week":
                            r = (this - n - a) / 6048e5;
                            break;
                        default:
                            r = this - n
                    }
                    return i ? r : k(r)
                }, di.endOf = function (t) {
                    return void 0 === (t = L(t)) || "millisecond" === t ? this : ("date" === t && (t = "day"), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"))
                }, di.format = function (t) {
                    t || (t = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat);
                    var e = U(this, t);
                    return this.localeData().postformat(e)
                }, di.from = function (t, e) {
                    return this.isValid() && (_(t) && t.isValid() || Te(t).isValid()) ? Ue({
                        to: this,
                        from: t
                    }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
                }, di.fromNow = function (t) {
                    return this.from(Te(), t)
                }, di.to = function (t, e) {
                    return this.isValid() && (_(t) && t.isValid() || Te(t).isValid()) ? Ue({
                        from: this,
                        to: t
                    }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
                }, di.toNow = function (t) {
                    return this.to(Te(), t)
                }, di.get = function (t) {
                    return O(this[t = L(t)]) ? this[t]() : this
                }, di.invalidAt = function () {
                    return g(this).overflow
                }, di.isAfter = function (t, e) {
                    var i = _(t) ? t : Te(t);
                    return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = L(s(e) ? "millisecond" : e)) ? this.valueOf() > i.valueOf() : i.valueOf() < this.clone().startOf(e).valueOf())
                }, di.isBefore = function (t, e) {
                    var i = _(t) ? t : Te(t);
                    return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = L(s(e) ? "millisecond" : e)) ? this.valueOf() < i.valueOf() : this.clone().endOf(e).valueOf() < i.valueOf())
                }, di.isBetween = function (t, e, i, n) {
                    return ("(" === (n = n || "()")[0] ? this.isAfter(t, i) : !this.isBefore(t, i)) && (")" === n[1] ? this.isBefore(e, i) : !this.isAfter(e, i))
                }, di.isSame = function (t, e) {
                    var i, n = _(t) ? t : Te(t);
                    return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = L(e || "millisecond")) ? this.valueOf() === n.valueOf() : (i = n.valueOf(), this.clone().startOf(e).valueOf() <= i && i <= this.clone().endOf(e).valueOf()))
                }, di.isSameOrAfter = function (t, e) {
                    return this.isSame(t, e) || this.isAfter(t, e)
                }, di.isSameOrBefore = function (t, e) {
                    return this.isSame(t, e) || this.isBefore(t, e)
                }, di.isValid = function () {
                    return m(this)
                }, di.lang = ti, di.locale = Qe, di.localeData = ei, di.max = Ie, di.min = Oe, di.parsingFlags = function () {
                    return c({}, g(this))
                }, di.set = function (t, e) {
                    if ("object" == typeof t)
                        for (var i = function (t) {
                                var e = [];
                                for (var i in t) e.push({
                                    unit: i,
                                    priority: Y[i]
                                });
                                return e.sort(function (t, e) {
                                    return t.priority - e.priority
                                }), e
                            }(t = W(t)), n = 0; n < i.length; n++) this[i[n].unit](t[i[n].unit]);
                    else if (O(this[t = L(t)])) return this[t](e);
                    return this
                }, di.startOf = function (t) {
                    switch (t = L(t)) {
                        case "year":
                            this.month(0);
                        case "quarter":
                        case "month":
                            this.date(1);
                        case "week":
                        case "isoWeek":
                        case "day":
                        case "date":
                            this.hours(0);
                        case "hour":
                            this.minutes(0);
                        case "minute":
                            this.seconds(0);
                        case "second":
                            this.milliseconds(0)
                    }
                    return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
                }, di.subtract = Ke, di.toArray = function () {
                    var t = this;
                    return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
                }, di.toObject = function () {
                    var t = this;
                    return {
                        years: t.year(),
                        months: t.month(),
                        date: t.date(),
                        hours: t.hours(),
                        minutes: t.minutes(),
                        seconds: t.seconds(),
                        milliseconds: t.milliseconds()
                    }
                }, di.toDate = function () {
                    return new Date(this.valueOf())
                }, di.toISOString = function (t) {
                    if (!this.isValid()) return null;
                    var e = !0 !== t,
                        i = e ? this.clone().utc() : this;
                    return i.year() < 0 || i.year() > 9999 ? U(i, e ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : O(Date.prototype.toISOString) ? e ? this.toDate().toISOString() : new Date(this._d.valueOf()).toISOString().replace("Z", U(i, "Z")) : U(i, e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                }, di.inspect = function () {
                    if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
                    var t = "moment",
                        e = "";
                    this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", e = "Z");
                    var i = "[" + t + '("]',
                        n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
                        a = e + '[")]';
                    return this.format(i + n + "-MM-DD[T]HH:mm:ss.SSS" + a)
                }, di.toJSON = function () {
                    return this.isValid() ? this.toISOString() : null
                }, di.toString = function () {
                    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                }, di.unix = function () {
                    return Math.floor(this.valueOf() / 1e3)
                }, di.valueOf = function () {
                    return this._d.valueOf() - 6e4 * (this._offset || 0)
                }, di.creationData = function () {
                    return {
                        input: this._i,
                        format: this._f,
                        locale: this._locale,
                        isUTC: this._isUTC,
                        strict: this._strict
                    }
                }, di.year = Pt, di.isLeapYear = function () {
                    return Dt(this.year())
                }, di.weekYear = function (t) {
                    return ni.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
                }, di.isoWeekYear = function (t) {
                    return ni.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
                }, di.quarter = di.quarters = function (t) {
                    return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
                }, di.month = Yt, di.daysInMonth = function () {
                    return At(this.year(), this.month())
                }, di.week = di.weeks = function (t) {
                    var e = this.localeData().week(this);
                    return null == t ? e : this.add(7 * (t - e), "d")
                }, di.isoWeek = di.isoWeeks = function (t) {
                    var e = jt(this, 1, 4).week;
                    return null == t ? e : this.add(7 * (t - e), "d")
                }, di.weeksInYear = function () {
                    var t = this.localeData()._week;
                    return Ut(this.year(), t.dow, t.doy)
                }, di.isoWeeksInYear = function () {
                    return Ut(this.year(), 1, 4)
                }, di.date = ai, di.day = di.days = function (t) {
                    if (!this.isValid()) return null != t ? this : NaN;
                    var e, i, n = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                    return null != t ? (e = t, i = this.localeData(), t = "string" != typeof e ? e : isNaN(e) ? "number" == typeof (e = i.weekdaysParse(e)) ? e : null : parseInt(e, 10), this.add(t - n, "d")) : n
                }, di.weekday = function (t) {
                    if (!this.isValid()) return null != t ? this : NaN;
                    var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
                    return null == t ? e : this.add(t - e, "d")
                }, di.isoWeekday = function (t) {
                    if (!this.isValid()) return null != t ? this : NaN;
                    if (null != t) {
                        var e = (i = t, n = this.localeData(), "string" == typeof i ? n.weekdaysParse(i) % 7 || 7 : isNaN(i) ? null : i);
                        return this.day(this.day() % 7 ? e : e - 7)
                    }
                    return this.day() || 7;
                    var i, n
                }, di.dayOfYear = function (t) {
                    var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                    return null == t ? e : this.add(t - e, "d")
                }, di.hour = di.hours = ne, di.minute = di.minutes = ri, di.second = di.seconds = si, di.millisecond = di.milliseconds = ui, di.utcOffset = function (t, e, i) {
                    var n, r = this._offset || 0;
                    if (!this.isValid()) return null != t ? this : NaN;
                    if (null != t) {
                        if ("string" == typeof t) {
                            if (null === (t = ze(st, t))) return this
                        } else Math.abs(t) < 16 && !i && (t *= 60);
                        return !this._isUTC && e && (n = Ve(this)), this._offset = t, this._isUTC = !0, null != n && this.add(n, "m"), r !== t && (!e || this._changeInProgress ? Xe(this, Ue(t - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this
                    }
                    return this._isUTC ? r : Ve(this)
                }, di.utc = function (t) {
                    return this.utcOffset(0, t)
                }, di.local = function (t) {
                    return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Ve(this), "m")), this
                }, di.parseZone = function () {
                    if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
                    else if ("string" == typeof this._i) {
                        var t = ze(ot, this._i);
                        null != t ? this.utcOffset(t) : this.utcOffset(0, !0)
                    }
                    return this
                }, di.hasAlignedHourOffset = function (t) {
                    return !!this.isValid() && (t = t ? Te(t).utcOffset() : 0, (this.utcOffset() - t) % 60 == 0)
                }, di.isDST = function () {
                    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
                }, di.isLocal = function () {
                    return !!this.isValid() && !this._isUTC
                }, di.isUtcOffset = function () {
                    return !!this.isValid() && this._isUTC
                }, di.isUtc = Be, di.isUTC = Be, di.zoneAbbr = function () {
                    return this._isUTC ? "UTC" : ""
                }, di.zoneName = function () {
                    return this._isUTC ? "Coordinated Universal Time" : ""
                }, di.dates = D("dates accessor is deprecated. Use date instead.", ai), di.months = D("months accessor is deprecated. Use month instead", Yt), di.years = D("years accessor is deprecated. Use year instead", Pt), di.zone = D("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function (t, e) {
                    return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
                }), di.isDSTShifted = D("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function () {
                    if (!s(this._isDSTShifted)) return this._isDSTShifted;
                    var t = {};
                    if (y(t, this), (t = Ce(t))._a) {
                        var e = t._isUTC ? f(t._a) : Te(t._a);
                        this._isDSTShifted = this.isValid() && M(t._a, e.toArray()) > 0
                    } else this._isDSTShifted = !1;
                    return this._isDSTShifted
                });
                var ci = A.prototype;

                function fi(t, e, i, n) {
                    var a = he(),
                        r = f().set(n, e);
                    return a[i](r, t)
                }

                function gi(t, e, i) {
                    if (l(t) && (e = t, t = void 0), t = t || "", null != e) return fi(t, e, i, "month");
                    var n, a = [];
                    for (n = 0; n < 12; n++) a[n] = fi(t, n, i, "month");
                    return a
                }

                function mi(t, e, i, n) {
                    "boolean" == typeof t ? (l(e) && (i = e, e = void 0), e = e || "") : (i = e = t, t = !1, l(e) && (i = e, e = void 0), e = e || "");
                    var a, r = he(),
                        o = t ? r._week.dow : 0;
                    if (null != i) return fi(e, (i + o) % 7, n, "day");
                    var s = [];
                    for (a = 0; a < 7; a++) s[a] = fi(e, (a + o) % 7, n, "day");
                    return s
                }
                ci.calendar = function (t, e, i) {
                    var n = this._calendar[t] || this._calendar.sameElse;
                    return O(n) ? n.call(e, i) : n
                }, ci.longDateFormat = function (t) {
                    var e = this._longDateFormat[t],
                        i = this._longDateFormat[t.toUpperCase()];
                    return e || !i ? e : (this._longDateFormat[t] = i.replace(/MMMM|MM|DD|dddd/g, function (t) {
                        return t.slice(1)
                    }), this._longDateFormat[t])
                }, ci.invalidDate = function () {
                    return this._invalidDate
                }, ci.ordinal = function (t) {
                    return this._ordinal.replace("%d", t)
                }, ci.preparse = hi, ci.postformat = hi, ci.relativeTime = function (t, e, i, n) {
                    var a = this._relativeTime[i];
                    return O(a) ? a(t, e, i, n) : a.replace(/%d/i, t)
                }, ci.pastFuture = function (t, e) {
                    var i = this._relativeTime[t > 0 ? "future" : "past"];
                    return O(i) ? i(e) : i.replace(/%s/i, e)
                }, ci.set = function (t) {
                    var e, i;
                    for (i in t) O(e = t[i]) ? this[i] = e : this["_" + i] = e;
                    this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
                }, ci.months = function (t, e) {
                    return t ? r(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || Ft).test(e) ? "format" : "standalone"][t.month()] : r(this._months) ? this._months : this._months.standalone
                }, ci.monthsShort = function (t, e) {
                    return t ? r(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[Ft.test(e) ? "format" : "standalone"][t.month()] : r(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
                }, ci.monthsParse = function (t, e, i) {
                    var n, a, r;
                    if (this._monthsParseExact) return function (t, e, i) {
                        var n, a, r, o = t.toLocaleLowerCase();
                        if (!this._monthsParse)
                            for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n) r = f([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[n] = this.months(r, "").toLocaleLowerCase();
                        return i ? "MMM" === e ? -1 !== (a = Ct.call(this._shortMonthsParse, o)) ? a : null : -1 !== (a = Ct.call(this._longMonthsParse, o)) ? a : null : "MMM" === e ? -1 !== (a = Ct.call(this._shortMonthsParse, o)) ? a : -1 !== (a = Ct.call(this._longMonthsParse, o)) ? a : null : -1 !== (a = Ct.call(this._longMonthsParse, o)) ? a : -1 !== (a = Ct.call(this._shortMonthsParse, o)) ? a : null
                    }.call(this, t, e, i);
                    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
                        if (a = f([2e3, n]), i && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp("^" + this.months(a, "").replace(".", "") + "$", "i"), this._shortMonthsParse[n] = new RegExp("^" + this.monthsShort(a, "").replace(".", "") + "$", "i")), i || this._monthsParse[n] || (r = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[n] = new RegExp(r.replace(".", ""), "i")), i && "MMMM" === e && this._longMonthsParse[n].test(t)) return n;
                        if (i && "MMM" === e && this._shortMonthsParse[n].test(t)) return n;
                        if (!i && this._monthsParse[n].test(t)) return n
                    }
                }, ci.monthsRegex = function (t) {
                    return this._monthsParseExact ? (h(this, "_monthsRegex") || Ht.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (h(this, "_monthsRegex") || (this._monthsRegex = zt), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
                }, ci.monthsShortRegex = function (t) {
                    return this._monthsParseExact ? (h(this, "_monthsRegex") || Ht.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = Nt), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
                }, ci.week = function (t) {
                    return jt(t, this._week.dow, this._week.doy).week
                }, ci.firstDayOfYear = function () {
                    return this._week.doy
                }, ci.firstDayOfWeek = function () {
                    return this._week.dow
                }, ci.weekdays = function (t, e) {
                    return t ? r(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()] : r(this._weekdays) ? this._weekdays : this._weekdays.standalone
                }, ci.weekdaysMin = function (t) {
                    return t ? this._weekdaysMin[t.day()] : this._weekdaysMin
                }, ci.weekdaysShort = function (t) {
                    return t ? this._weekdaysShort[t.day()] : this._weekdaysShort
                }, ci.weekdaysParse = function (t, e, i) {
                    var n, a, r;
                    if (this._weekdaysParseExact) return function (t, e, i) {
                        var n, a, r, o = t.toLocaleLowerCase();
                        if (!this._weekdaysParse)
                            for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n) r = f([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(r, "").toLocaleLowerCase();
                        return i ? "dddd" === e ? -1 !== (a = Ct.call(this._weekdaysParse, o)) ? a : null : "ddd" === e ? -1 !== (a = Ct.call(this._shortWeekdaysParse, o)) ? a : null : -1 !== (a = Ct.call(this._minWeekdaysParse, o)) ? a : null : "dddd" === e ? -1 !== (a = Ct.call(this._weekdaysParse, o)) ? a : -1 !== (a = Ct.call(this._shortWeekdaysParse, o)) ? a : -1 !== (a = Ct.call(this._minWeekdaysParse, o)) ? a : null : "ddd" === e ? -1 !== (a = Ct.call(this._shortWeekdaysParse, o)) ? a : -1 !== (a = Ct.call(this._weekdaysParse, o)) ? a : -1 !== (a = Ct.call(this._minWeekdaysParse, o)) ? a : null : -1 !== (a = Ct.call(this._minWeekdaysParse, o)) ? a : -1 !== (a = Ct.call(this._weekdaysParse, o)) ? a : -1 !== (a = Ct.call(this._shortWeekdaysParse, o)) ? a : null
                    }.call(this, t, e, i);
                    for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
                        if (a = f([2e3, 1]).day(n), i && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp("^" + this.weekdays(a, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[n] = new RegExp("^" + this.weekdaysShort(a, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[n] = new RegExp("^" + this.weekdaysMin(a, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[n] || (r = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[n] = new RegExp(r.replace(".", ""), "i")), i && "dddd" === e && this._fullWeekdaysParse[n].test(t)) return n;
                        if (i && "ddd" === e && this._shortWeekdaysParse[n].test(t)) return n;
                        if (i && "dd" === e && this._minWeekdaysParse[n].test(t)) return n;
                        if (!i && this._weekdaysParse[n].test(t)) return n
                    }
                }, ci.weekdaysRegex = function (t) {
                    return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || $t.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = Xt), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
                }, ci.weekdaysShortRegex = function (t) {
                    return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || $t.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Jt), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
                }, ci.weekdaysMinRegex = function (t) {
                    return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || $t.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Kt), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
                }, ci.isPM = function (t) {
                    return "p" === (t + "").toLowerCase().charAt(0)
                }, ci.meridiem = function (t, e, i) {
                    return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
                }, ue("en", {
                    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                    ordinal: function (t) {
                        var e = t % 10;
                        return t + (1 === w(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th")
                    }
                }), a.lang = D("moment.lang is deprecated. Use moment.locale instead.", ue), a.langData = D("moment.langData is deprecated. Use moment.localeData instead.", he);
                var pi = Math.abs;

                function vi(t, e, i, n) {
                    var a = Ue(e, i);
                    return t._milliseconds += n * a._milliseconds, t._days += n * a._days, t._months += n * a._months, t._bubble()
                }

                function yi(t) {
                    return t < 0 ? Math.floor(t) : Math.ceil(t)
                }

                function bi(t) {
                    return 4800 * t / 146097
                }

                function xi(t) {
                    return 146097 * t / 4800
                }

                function _i(t) {
                    return function () {
                        return this.as(t)
                    }
                }
                var ki = _i("ms"),
                    wi = _i("s"),
                    Mi = _i("m"),
                    Si = _i("h"),
                    Di = _i("d"),
                    Ci = _i("w"),
                    Pi = _i("M"),
                    Ti = _i("y");

                function Oi(t) {
                    return function () {
                        return this.isValid() ? this._data[t] : NaN
                    }
                }
                var Ii = Oi("milliseconds"),
                    Ai = Oi("seconds"),
                    Fi = Oi("minutes"),
                    Ri = Oi("hours"),
                    Li = Oi("days"),
                    Wi = Oi("months"),
                    Yi = Oi("years");
                var Ni = Math.round,
                    zi = {
                        ss: 44,
                        s: 45,
                        m: 45,
                        h: 22,
                        d: 26,
                        M: 11
                    };
                var Hi = Math.abs;

                function Vi(t) {
                    return (t > 0) - (t < 0) || +t
                }

                function Bi() {
                    if (!this.isValid()) return this.localeData().invalidDate();
                    var t, e, i = Hi(this._milliseconds) / 1e3,
                        n = Hi(this._days),
                        a = Hi(this._months);
                    e = k((t = k(i / 60)) / 60), i %= 60, t %= 60;
                    var r = k(a / 12),
                        o = a %= 12,
                        s = n,
                        l = e,
                        u = t,
                        d = i ? i.toFixed(3).replace(/\.?0+$/, "") : "",
                        h = this.asSeconds();
                    if (!h) return "P0D";
                    var c = h < 0 ? "-" : "",
                        f = Vi(this._months) !== Vi(h) ? "-" : "",
                        g = Vi(this._days) !== Vi(h) ? "-" : "",
                        m = Vi(this._milliseconds) !== Vi(h) ? "-" : "";
                    return c + "P" + (r ? f + r + "Y" : "") + (o ? f + o + "M" : "") + (s ? g + s + "D" : "") + (l || u || d ? "T" : "") + (l ? m + l + "H" : "") + (u ? m + u + "M" : "") + (d ? m + d + "S" : "")
                }
                var Ei = Re.prototype;
                return Ei.isValid = function () {
                    return this._isValid
                }, Ei.abs = function () {
                    var t = this._data;
                    return this._milliseconds = pi(this._milliseconds), this._days = pi(this._days), this._months = pi(this._months), t.milliseconds = pi(t.milliseconds), t.seconds = pi(t.seconds), t.minutes = pi(t.minutes), t.hours = pi(t.hours), t.months = pi(t.months), t.years = pi(t.years), this
                }, Ei.add = function (t, e) {
                    return vi(this, t, e, 1)
                }, Ei.subtract = function (t, e) {
                    return vi(this, t, e, -1)
                }, Ei.as = function (t) {
                    if (!this.isValid()) return NaN;
                    var e, i, n = this._milliseconds;
                    if ("month" === (t = L(t)) || "year" === t) return e = this._days + n / 864e5, i = this._months + bi(e), "month" === t ? i : i / 12;
                    switch (e = this._days + Math.round(xi(this._months)), t) {
                        case "week":
                            return e / 7 + n / 6048e5;
                        case "day":
                            return e + n / 864e5;
                        case "hour":
                            return 24 * e + n / 36e5;
                        case "minute":
                            return 1440 * e + n / 6e4;
                        case "second":
                            return 86400 * e + n / 1e3;
                        case "millisecond":
                            return Math.floor(864e5 * e) + n;
                        default:
                            throw new Error("Unknown unit " + t)
                    }
                }, Ei.asMilliseconds = ki, Ei.asSeconds = wi, Ei.asMinutes = Mi, Ei.asHours = Si, Ei.asDays = Di, Ei.asWeeks = Ci, Ei.asMonths = Pi, Ei.asYears = Ti, Ei.valueOf = function () {
                    return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * w(this._months / 12) : NaN
                }, Ei._bubble = function () {
                    var t, e, i, n, a, r = this._milliseconds,
                        o = this._days,
                        s = this._months,
                        l = this._data;
                    return r >= 0 && o >= 0 && s >= 0 || r <= 0 && o <= 0 && s <= 0 || (r += 864e5 * yi(xi(s) + o), o = 0, s = 0), l.milliseconds = r % 1e3, t = k(r / 1e3), l.seconds = t % 60, e = k(t / 60), l.minutes = e % 60, i = k(e / 60), l.hours = i % 24, s += a = k(bi(o += k(i / 24))), o -= yi(xi(a)), n = k(s / 12), s %= 12, l.days = o, l.months = s, l.years = n, this
                }, Ei.clone = function () {
                    return Ue(this)
                }, Ei.get = function (t) {
                    return t = L(t), this.isValid() ? this[t + "s"]() : NaN
                }, Ei.milliseconds = Ii, Ei.seconds = Ai, Ei.minutes = Fi, Ei.hours = Ri, Ei.days = Li, Ei.weeks = function () {
                    return k(this.days() / 7)
                }, Ei.months = Wi, Ei.years = Yi, Ei.humanize = function (t) {
                    if (!this.isValid()) return this.localeData().invalidDate();
                    var e, i, n, a, r, o, s, l, u, d, h, c = this.localeData(),
                        f = (i = !t, n = c, a = Ue(e = this).abs(), r = Ni(a.as("s")), o = Ni(a.as("m")), s = Ni(a.as("h")), l = Ni(a.as("d")), u = Ni(a.as("M")), d = Ni(a.as("y")), (h = r <= zi.ss && ["s", r] || r < zi.s && ["ss", r] || o <= 1 && ["m"] || o < zi.m && ["mm", o] || s <= 1 && ["h"] || s < zi.h && ["hh", s] || l <= 1 && ["d"] || l < zi.d && ["dd", l] || u <= 1 && ["M"] || u < zi.M && ["MM", u] || d <= 1 && ["y"] || ["yy", d])[2] = i, h[3] = +e > 0, h[4] = n, function (t, e, i, n, a) {
                            return a.relativeTime(e || 1, !!i, t, n)
                        }.apply(null, h));
                    return t && (f = c.pastFuture(+this, f)), c.postformat(f)
                }, Ei.toISOString = Bi, Ei.toString = Bi, Ei.toJSON = Bi, Ei.locale = Qe, Ei.localeData = ei, Ei.toIsoString = D("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Bi), Ei.lang = ti, j("X", 0, 0, "unix"), j("x", 0, 0, "valueOf"), dt("x", rt), dt("X", /[+-]?\d+(\.\d{1,3})?/), gt("X", function (t, e, i) {
                    i._d = new Date(1e3 * parseFloat(t, 10))
                }), gt("x", function (t, e, i) {
                    i._d = new Date(w(t))
                }), a.version = "2.20.1", i = Te, a.fn = di, a.min = function () {
                    return Ae("isBefore", [].slice.call(arguments, 0))
                }, a.max = function () {
                    return Ae("isAfter", [].slice.call(arguments, 0))
                }, a.now = function () {
                    return Date.now ? Date.now() : +new Date
                }, a.utc = f, a.unix = function (t) {
                    return Te(1e3 * t)
                }, a.months = function (t, e) {
                    return gi(t, e, "months")
                }, a.isDate = u, a.locale = ue, a.invalid = p, a.duration = Ue, a.isMoment = _, a.weekdays = function (t, e, i) {
                    return mi(t, e, i, "weekdays")
                }, a.parseZone = function () {
                    return Te.apply(null, arguments).parseZone()
                }, a.localeData = he, a.isDuration = Le, a.monthsShort = function (t, e) {
                    return gi(t, e, "monthsShort")
                }, a.weekdaysMin = function (t, e, i) {
                    return mi(t, e, i, "weekdaysMin")
                }, a.defineLocale = de, a.updateLocale = function (t, e) {
                    if (null != e) {
                        var i, n, a = ae;
                        null != (n = le(t)) && (a = n._config), (i = new A(e = I(a, e))).parentLocale = re[t], re[t] = i, ue(t)
                    } else null != re[t] && (null != re[t].parentLocale ? re[t] = re[t].parentLocale : null != re[t] && delete re[t]);
                    return re[t]
                }, a.locales = function () {
                    return C(re)
                }, a.weekdaysShort = function (t, e, i) {
                    return mi(t, e, i, "weekdaysShort")
                }, a.normalizeUnits = L, a.relativeTimeRounding = function (t) {
                    return void 0 === t ? Ni : "function" == typeof t && (Ni = t, !0)
                }, a.relativeTimeThreshold = function (t, e) {
                    return void 0 !== zi[t] && (void 0 === e ? zi[t] : (zi[t] = e, "s" === t && (zi.ss = e - 1), !0))
                }, a.calendarFormat = function (t, e) {
                    var i = t.diff(e, "days", !0);
                    return i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse"
                }, a.prototype = di, a.HTML5_FMT = {
                    DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
                    DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
                    DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
                    DATE: "YYYY-MM-DD",
                    TIME: "HH:mm",
                    TIME_SECONDS: "HH:mm:ss",
                    TIME_MS: "HH:mm:ss.SSS",
                    WEEK: "YYYY-[W]WW",
                    MONTH: "YYYY-MM"
                }, a
            }, "object" == typeof i && void 0 !== e ? e.exports = a() : n.moment = a()
        }, {}],
        7: [function (t, e, i) {
            var n = t(29)();
            n.helpers = t(45), t(27)(n), n.defaults = t(25), n.Element = t(26), n.elements = t(40), n.Interaction = t(28), n.layouts = t(30), n.platform = t(48), n.plugins = t(31), n.Ticks = t(34), t(22)(n), t(23)(n), t(24)(n), t(33)(n), t(32)(n), t(35)(n), t(55)(n), t(53)(n), t(54)(n), t(56)(n), t(57)(n), t(58)(n), t(15)(n), t(16)(n), t(17)(n), t(18)(n), t(19)(n), t(20)(n), t(21)(n), t(8)(n), t(9)(n), t(10)(n), t(11)(n), t(12)(n), t(13)(n), t(14)(n);
            var a = t(49);
            for (var r in a) a.hasOwnProperty(r) && n.plugins.register(a[r]);
            n.platform.initialize(), e.exports = n, "undefined" != typeof window && (window.Chart = n), n.Legend = a.legend._element, n.Title = a.title._element, n.pluginService = n.plugins, n.PluginBase = n.Element.extend({}), n.canvasHelpers = n.helpers.canvas, n.layoutService = n.layouts
        }, {
            10: 10,
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            16: 16,
            17: 17,
            18: 18,
            19: 19,
            20: 20,
            21: 21,
            22: 22,
            23: 23,
            24: 24,
            25: 25,
            26: 26,
            27: 27,
            28: 28,
            29: 29,
            30: 30,
            31: 31,
            32: 32,
            33: 33,
            34: 34,
            35: 35,
            40: 40,
            45: 45,
            48: 48,
            49: 49,
            53: 53,
            54: 54,
            55: 55,
            56: 56,
            57: 57,
            58: 58,
            8: 8,
            9: 9
        }],
        8: [function (t, e, i) {
            "use strict";
            e.exports = function (t) {
                t.Bar = function (e, i) {
                    return i.type = "bar", new t(e, i)
                }
            }
        }, {}],
        9: [function (t, e, i) {
            "use strict";
            e.exports = function (t) {
                t.Bubble = function (e, i) {
                    return i.type = "bubble", new t(e, i)
                }
            }
        }, {}],
        10: [function (t, e, i) {
            "use strict";
            e.exports = function (t) {
                t.Doughnut = function (e, i) {
                    return i.type = "doughnut", new t(e, i)
                }
            }
        }, {}],
        11: [function (t, e, i) {
            "use strict";
            e.exports = function (t) {
                t.Line = function (e, i) {
                    return i.type = "line", new t(e, i)
                }
            }
        }, {}],
        12: [function (t, e, i) {
            "use strict";
            e.exports = function (t) {
                t.PolarArea = function (e, i) {
                    return i.type = "polarArea", new t(e, i)
                }
            }
        }, {}],
        13: [function (t, e, i) {
            "use strict";
            e.exports = function (t) {
                t.Radar = function (e, i) {
                    return i.type = "radar", new t(e, i)
                }
            }
        }, {}],
        14: [function (t, e, i) {
            "use strict";
            e.exports = function (t) {
                t.Scatter = function (e, i) {
                    return i.type = "scatter", new t(e, i)
                }
            }
        }, {}],
        15: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("bar", {
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [{
                        type: "category",
                        categoryPercentage: .8,
                        barPercentage: .9,
                        offset: !0,
                        gridLines: {
                            offsetGridLines: !0
                        }
                    }],
                    yAxes: [{
                        type: "linear"
                    }]
                }
            }), n._set("horizontalBar", {
                hover: {
                    mode: "index",
                    axis: "y"
                },
                scales: {
                    xAxes: [{
                        type: "linear",
                        position: "bottom"
                    }],
                    yAxes: [{
                        position: "left",
                        type: "category",
                        categoryPercentage: .8,
                        barPercentage: .9,
                        offset: !0,
                        gridLines: {
                            offsetGridLines: !0
                        }
                    }]
                },
                elements: {
                    rectangle: {
                        borderSkipped: "left"
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function (t, e) {
                            var i = "";
                            return t.length > 0 && (t[0].yLabel ? i = t[0].yLabel : e.labels.length > 0 && t[0].index < e.labels.length && (i = e.labels[t[0].index])), i
                        },
                        label: function (t, e) {
                            return (e.datasets[t.datasetIndex].label || "") + ": " + t.xLabel
                        }
                    },
                    mode: "index",
                    axis: "y"
                }
            }), e.exports = function (t) {
                t.controllers.bar = t.DatasetController.extend({
                    dataElementType: a.Rectangle,
                    initialize: function () {
                        var e;
                        t.DatasetController.prototype.initialize.apply(this, arguments), (e = this.getMeta()).stack = this.getDataset().stack, e.bar = !0
                    },
                    update: function (t) {
                        var e, i, n = this.getMeta().data;
                        for (this._ruler = this.getRuler(), e = 0, i = n.length; e < i; ++e) this.updateElement(n[e], e, t)
                    },
                    updateElement: function (t, e, i) {
                        var n = this,
                            a = n.chart,
                            o = n.getMeta(),
                            s = n.getDataset(),
                            l = t.custom || {},
                            u = a.options.elements.rectangle;
                        t._xScale = n.getScaleForId(o.xAxisID), t._yScale = n.getScaleForId(o.yAxisID), t._datasetIndex = n.index, t._index = e, t._model = {
                            datasetLabel: s.label,
                            label: a.data.labels[e],
                            borderSkipped: l.borderSkipped ? l.borderSkipped : u.borderSkipped,
                            backgroundColor: l.backgroundColor ? l.backgroundColor : r.valueAtIndexOrDefault(s.backgroundColor, e, u.backgroundColor),
                            borderColor: l.borderColor ? l.borderColor : r.valueAtIndexOrDefault(s.borderColor, e, u.borderColor),
                            borderWidth: l.borderWidth ? l.borderWidth : r.valueAtIndexOrDefault(s.borderWidth, e, u.borderWidth)
                        }, n.updateElementGeometry(t, e, i), t.pivot()
                    },
                    updateElementGeometry: function (t, e, i) {
                        var n = this,
                            a = t._model,
                            r = n.getValueScale(),
                            o = r.getBasePixel(),
                            s = r.isHorizontal(),
                            l = n._ruler || n.getRuler(),
                            u = n.calculateBarValuePixels(n.index, e),
                            d = n.calculateBarIndexPixels(n.index, e, l);
                        a.horizontal = s, a.base = i ? o : u.base, a.x = s ? i ? o : u.head : d.center, a.y = s ? d.center : i ? o : u.head, a.height = s ? d.size : void 0, a.width = s ? void 0 : d.size
                    },
                    getValueScaleId: function () {
                        return this.getMeta().yAxisID
                    },
                    getIndexScaleId: function () {
                        return this.getMeta().xAxisID
                    },
                    getValueScale: function () {
                        return this.getScaleForId(this.getValueScaleId())
                    },
                    getIndexScale: function () {
                        return this.getScaleForId(this.getIndexScaleId())
                    },
                    _getStacks: function (t) {
                        var e, i, n = this.chart,
                            a = this.getIndexScale().options.stacked,
                            r = void 0 === t ? n.data.datasets.length : t + 1,
                            o = [];
                        for (e = 0; e < r; ++e)(i = n.getDatasetMeta(e)).bar && n.isDatasetVisible(e) && (!1 === a || !0 === a && -1 === o.indexOf(i.stack) || void 0 === a && (void 0 === i.stack || -1 === o.indexOf(i.stack))) && o.push(i.stack);
                        return o
                    },
                    getStackCount: function () {
                        return this._getStacks().length
                    },
                    getStackIndex: function (t, e) {
                        var i = this._getStacks(t),
                            n = void 0 !== e ? i.indexOf(e) : -1;
                        return -1 === n ? i.length - 1 : n
                    },
                    getRuler: function () {
                        var t, e, i = this.getIndexScale(),
                            n = this.getStackCount(),
                            a = this.index,
                            o = i.isHorizontal(),
                            s = o ? i.left : i.top,
                            l = s + (o ? i.width : i.height),
                            u = [];
                        for (t = 0, e = this.getMeta().data.length; t < e; ++t) u.push(i.getPixelForValue(null, t, a));
                        return {
                            min: r.isNullOrUndef(i.options.barThickness) ? function (t, e) {
                                var i, n, a, r, o = t.isHorizontal() ? t.width : t.height,
                                    s = t.getTicks();
                                for (a = 1, r = e.length; a < r; ++a) o = Math.min(o, e[a] - e[a - 1]);
                                for (a = 0, r = s.length; a < r; ++a) n = t.getPixelForTick(a), o = a > 0 ? Math.min(o, n - i) : o, i = n;
                                return o
                            }(i, u) : -1,
                            pixels: u,
                            start: s,
                            end: l,
                            stackCount: n,
                            scale: i
                        }
                    },
                    calculateBarValuePixels: function (t, e) {
                        var i, n, a, r, o, s, l = this.chart,
                            u = this.getMeta(),
                            d = this.getValueScale(),
                            h = l.data.datasets,
                            c = d.getRightValue(h[t].data[e]),
                            f = d.options.stacked,
                            g = u.stack,
                            m = 0;
                        if (f || void 0 === f && void 0 !== g)
                            for (i = 0; i < t; ++i)(n = l.getDatasetMeta(i)).bar && n.stack === g && n.controller.getValueScaleId() === d.id && l.isDatasetVisible(i) && (a = d.getRightValue(h[i].data[e]), (c < 0 && a < 0 || c >= 0 && a > 0) && (m += a));
                        return r = d.getPixelForValue(m), {
                            size: s = ((o = d.getPixelForValue(m + c)) - r) / 2,
                            base: r,
                            head: o,
                            center: o + s / 2
                        }
                    },
                    calculateBarIndexPixels: function (t, e, i) {
                        var n, a, o, s, l, u, d, h, c, f, g, m, p, v, y, b, x, _ = i.scale.options,
                            k = "flex" === _.barThickness ? (c = e, g = _, p = (f = i).pixels, v = p[c], y = c > 0 ? p[c - 1] : null, b = c < p.length - 1 ? p[c + 1] : null, x = g.categoryPercentage, null === y && (y = v - (null === b ? f.end - v : b - v)), null === b && (b = v + v - y), m = v - (v - y) / 2 * x, {
                                chunk: (b - y) / 2 * x / f.stackCount,
                                ratio: g.barPercentage,
                                start: m
                            }) : (n = e, a = i, u = (o = _).barThickness, d = a.stackCount, h = a.pixels[n], r.isNullOrUndef(u) ? (s = a.min * o.categoryPercentage, l = o.barPercentage) : (s = u * d, l = 1), {
                                chunk: s / d,
                                ratio: l,
                                start: h - s / 2
                            }),
                            w = this.getStackIndex(t, this.getMeta().stack),
                            M = k.start + k.chunk * w + k.chunk / 2,
                            S = Math.min(r.valueOrDefault(_.maxBarThickness, 1 / 0), k.chunk * k.ratio);
                        return {
                            base: M - S / 2,
                            head: M + S / 2,
                            center: M,
                            size: S
                        }
                    },
                    draw: function () {
                        var t = this.chart,
                            e = this.getValueScale(),
                            i = this.getMeta().data,
                            n = this.getDataset(),
                            a = i.length,
                            o = 0;
                        for (r.canvas.clipArea(t.ctx, t.chartArea); o < a; ++o) isNaN(e.getRightValue(n.data[o])) || i[o].draw();
                        r.canvas.unclipArea(t.ctx)
                    },
                    setHoverStyle: function (t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            a = t._model;
                        a.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : r.valueAtIndexOrDefault(e.hoverBackgroundColor, i, r.getHoverColor(a.backgroundColor)), a.borderColor = n.hoverBorderColor ? n.hoverBorderColor : r.valueAtIndexOrDefault(e.hoverBorderColor, i, r.getHoverColor(a.borderColor)), a.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : r.valueAtIndexOrDefault(e.hoverBorderWidth, i, a.borderWidth)
                    },
                    removeHoverStyle: function (t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            a = t._model,
                            o = this.chart.options.elements.rectangle;
                        a.backgroundColor = n.backgroundColor ? n.backgroundColor : r.valueAtIndexOrDefault(e.backgroundColor, i, o.backgroundColor), a.borderColor = n.borderColor ? n.borderColor : r.valueAtIndexOrDefault(e.borderColor, i, o.borderColor), a.borderWidth = n.borderWidth ? n.borderWidth : r.valueAtIndexOrDefault(e.borderWidth, i, o.borderWidth)
                    }
                }), t.controllers.horizontalBar = t.controllers.bar.extend({
                    getValueScaleId: function () {
                        return this.getMeta().xAxisID
                    },
                    getIndexScaleId: function () {
                        return this.getMeta().yAxisID
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        16: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("bubble", {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [{
                        type: "linear",
                        position: "bottom",
                        id: "x-axis-0"
                    }],
                    yAxes: [{
                        type: "linear",
                        position: "left",
                        id: "y-axis-0"
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function () {
                            return ""
                        },
                        label: function (t, e) {
                            var i = e.datasets[t.datasetIndex].label || "",
                                n = e.datasets[t.datasetIndex].data[t.index];
                            return i + ": (" + t.xLabel + ", " + t.yLabel + ", " + n.r + ")"
                        }
                    }
                }
            }), e.exports = function (t) {
                t.controllers.bubble = t.DatasetController.extend({
                    dataElementType: a.Point,
                    update: function (t) {
                        var e = this,
                            i = e.getMeta().data;
                        r.each(i, function (i, n) {
                            e.updateElement(i, n, t)
                        })
                    },
                    updateElement: function (t, e, i) {
                        var n = this,
                            a = n.getMeta(),
                            r = t.custom || {},
                            o = n.getScaleForId(a.xAxisID),
                            s = n.getScaleForId(a.yAxisID),
                            l = n._resolveElementOptions(t, e),
                            u = n.getDataset().data[e],
                            d = n.index,
                            h = i ? o.getPixelForDecimal(.5) : o.getPixelForValue("object" == typeof u ? u : NaN, e, d),
                            c = i ? s.getBasePixel() : s.getPixelForValue(u, e, d);
                        t._xScale = o, t._yScale = s, t._options = l, t._datasetIndex = d, t._index = e, t._model = {
                            backgroundColor: l.backgroundColor,
                            borderColor: l.borderColor,
                            borderWidth: l.borderWidth,
                            hitRadius: l.hitRadius,
                            pointStyle: l.pointStyle,
                            radius: i ? 0 : l.radius,
                            skip: r.skip || isNaN(h) || isNaN(c),
                            x: h,
                            y: c
                        }, t.pivot()
                    },
                    setHoverStyle: function (t) {
                        var e = t._model,
                            i = t._options;
                        e.backgroundColor = r.valueOrDefault(i.hoverBackgroundColor, r.getHoverColor(i.backgroundColor)), e.borderColor = r.valueOrDefault(i.hoverBorderColor, r.getHoverColor(i.borderColor)), e.borderWidth = r.valueOrDefault(i.hoverBorderWidth, i.borderWidth), e.radius = i.radius + i.hoverRadius
                    },
                    removeHoverStyle: function (t) {
                        var e = t._model,
                            i = t._options;
                        e.backgroundColor = i.backgroundColor, e.borderColor = i.borderColor, e.borderWidth = i.borderWidth, e.radius = i.radius
                    },
                    _resolveElementOptions: function (t, e) {
                        var i, n, a, o = this.chart,
                            s = o.data.datasets[this.index],
                            l = t.custom || {},
                            u = o.options.elements.point,
                            d = r.options.resolve,
                            h = s.data[e],
                            c = {},
                            f = {
                                chart: o,
                                dataIndex: e,
                                dataset: s,
                                datasetIndex: this.index
                            },
                            g = ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle"];
                        for (i = 0, n = g.length; i < n; ++i) c[a = g[i]] = d([l[a], s[a], u[a]], f, e);
                        return c.radius = d([l.radius, h ? h.r : void 0, s.radius, u.radius], f, e), c
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        17: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("doughnut", {
                animation: {
                    animateRotate: !0,
                    animateScale: !1
                },
                hover: {
                    mode: "single"
                },
                legendCallback: function (t) {
                    var e = [];
                    e.push('<ul class="' + t.id + '-legend">');
                    var i = t.data,
                        n = i.datasets,
                        a = i.labels;
                    if (n.length)
                        for (var r = 0; r < n[0].data.length; ++r) e.push('<li><span style="background-color:' + n[0].backgroundColor[r] + '"></span>'), a[r] && e.push(a[r]), e.push("</li>");
                    return e.push("</ul>"), e.join("")
                },
                legend: {
                    labels: {
                        generateLabels: function (t) {
                            var e = t.data;
                            return e.labels.length && e.datasets.length ? e.labels.map(function (i, n) {
                                var a = t.getDatasetMeta(0),
                                    o = e.datasets[0],
                                    s = a.data[n],
                                    l = s && s.custom || {},
                                    u = r.valueAtIndexOrDefault,
                                    d = t.options.elements.arc;
                                return {
                                    text: i,
                                    fillStyle: l.backgroundColor ? l.backgroundColor : u(o.backgroundColor, n, d.backgroundColor),
                                    strokeStyle: l.borderColor ? l.borderColor : u(o.borderColor, n, d.borderColor),
                                    lineWidth: l.borderWidth ? l.borderWidth : u(o.borderWidth, n, d.borderWidth),
                                    hidden: isNaN(o.data[n]) || a.data[n].hidden,
                                    index: n
                                }
                            }) : []
                        }
                    },
                    onClick: function (t, e) {
                        var i, n, a, r = e.index,
                            o = this.chart;
                        for (i = 0, n = (o.data.datasets || []).length; i < n; ++i)(a = o.getDatasetMeta(i)).data[r] && (a.data[r].hidden = !a.data[r].hidden);
                        o.update()
                    }
                },
                cutoutPercentage: 50,
                rotation: -.5 * Math.PI,
                circumference: 2 * Math.PI,
                tooltips: {
                    callbacks: {
                        title: function () {
                            return ""
                        },
                        label: function (t, e) {
                            var i = e.labels[t.index],
                                n = ": " + e.datasets[t.datasetIndex].data[t.index];
                            return r.isArray(i) ? (i = i.slice())[0] += n : i += n, i
                        }
                    }
                }
            }), n._set("pie", r.clone(n.doughnut)), n._set("pie", {
                cutoutPercentage: 0
            }), e.exports = function (t) {
                t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({
                    dataElementType: a.Arc,
                    linkScales: r.noop,
                    getRingIndex: function (t) {
                        for (var e = 0, i = 0; i < t; ++i) this.chart.isDatasetVisible(i) && ++e;
                        return e
                    },
                    update: function (t) {
                        var e = this,
                            i = e.chart,
                            n = i.chartArea,
                            a = i.options,
                            o = a.elements.arc,
                            s = n.right - n.left - o.borderWidth,
                            l = n.bottom - n.top - o.borderWidth,
                            u = Math.min(s, l),
                            d = {
                                x: 0,
                                y: 0
                            },
                            h = e.getMeta(),
                            c = a.cutoutPercentage,
                            f = a.circumference;
                        if (f < 2 * Math.PI) {
                            var g = a.rotation % (2 * Math.PI),
                                m = (g += 2 * Math.PI * (g >= Math.PI ? -1 : g < -Math.PI ? 1 : 0)) + f,
                                p = Math.cos(g),
                                v = Math.sin(g),
                                y = Math.cos(m),
                                b = Math.sin(m),
                                x = g <= 0 && m >= 0 || g <= 2 * Math.PI && 2 * Math.PI <= m,
                                _ = g <= .5 * Math.PI && .5 * Math.PI <= m || g <= 2.5 * Math.PI && 2.5 * Math.PI <= m,
                                k = g <= -Math.PI && -Math.PI <= m || g <= Math.PI && Math.PI <= m,
                                w = g <= .5 * -Math.PI && .5 * -Math.PI <= m || g <= 1.5 * Math.PI && 1.5 * Math.PI <= m,
                                M = c / 100,
                                S = k ? -1 : Math.min(p * (p < 0 ? 1 : M), y * (y < 0 ? 1 : M)),
                                D = w ? -1 : Math.min(v * (v < 0 ? 1 : M), b * (b < 0 ? 1 : M)),
                                C = x ? 1 : Math.max(p * (p > 0 ? 1 : M), y * (y > 0 ? 1 : M)),
                                P = _ ? 1 : Math.max(v * (v > 0 ? 1 : M), b * (b > 0 ? 1 : M)),
                                T = .5 * (C - S),
                                O = .5 * (P - D);
                            u = Math.min(s / T, l / O), d = {
                                x: -.5 * (C + S),
                                y: -.5 * (P + D)
                            }
                        }
                        i.borderWidth = e.getMaxBorderWidth(h.data), i.outerRadius = Math.max((u - i.borderWidth) / 2, 0), i.innerRadius = Math.max(c ? i.outerRadius / 100 * c : 0, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), i.offsetX = d.x * i.outerRadius, i.offsetY = d.y * i.outerRadius, h.total = e.calculateTotal(), e.outerRadius = i.outerRadius - i.radiusLength * e.getRingIndex(e.index), e.innerRadius = Math.max(e.outerRadius - i.radiusLength, 0), r.each(h.data, function (i, n) {
                            e.updateElement(i, n, t)
                        })
                    },
                    updateElement: function (t, e, i) {
                        var n = this,
                            a = n.chart,
                            o = a.chartArea,
                            s = a.options,
                            l = s.animation,
                            u = (o.left + o.right) / 2,
                            d = (o.top + o.bottom) / 2,
                            h = s.rotation,
                            c = s.rotation,
                            f = n.getDataset(),
                            g = i && l.animateRotate ? 0 : t.hidden ? 0 : n.calculateCircumference(f.data[e]) * (s.circumference / (2 * Math.PI)),
                            m = i && l.animateScale ? 0 : n.innerRadius,
                            p = i && l.animateScale ? 0 : n.outerRadius,
                            v = r.valueAtIndexOrDefault;
                        r.extend(t, {
                            _datasetIndex: n.index,
                            _index: e,
                            _model: {
                                x: u + a.offsetX,
                                y: d + a.offsetY,
                                startAngle: h,
                                endAngle: c,
                                circumference: g,
                                outerRadius: p,
                                innerRadius: m,
                                label: v(f.label, e, a.data.labels[e])
                            }
                        });
                        var y = t._model;
                        this.removeHoverStyle(t), i && l.animateRotate || (y.startAngle = 0 === e ? s.rotation : n.getMeta().data[e - 1]._model.endAngle, y.endAngle = y.startAngle + y.circumference), t.pivot()
                    },
                    removeHoverStyle: function (e) {
                        t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
                    },
                    calculateTotal: function () {
                        var t, e = this.getDataset(),
                            i = this.getMeta(),
                            n = 0;
                        return r.each(i.data, function (i, a) {
                            t = e.data[a], isNaN(t) || i.hidden || (n += Math.abs(t))
                        }), n
                    },
                    calculateCircumference: function (t) {
                        var e = this.getMeta().total;
                        return e > 0 && !isNaN(t) ? 2 * Math.PI * (Math.abs(t) / e) : 0
                    },
                    getMaxBorderWidth: function (t) {
                        for (var e, i, n = 0, a = this.index, r = t.length, o = 0; o < r; o++) e = t[o]._model ? t[o]._model.borderWidth : 0, n = (i = t[o]._chart ? t[o]._chart.config.data.datasets[a].hoverBorderWidth : 0) > (n = e > n ? e : n) ? i : n;
                        return n
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        18: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("line", {
                showLines: !0,
                spanGaps: !1,
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [{
                        type: "category",
                        id: "x-axis-0"
                    }],
                    yAxes: [{
                        type: "linear",
                        id: "y-axis-0"
                    }]
                }
            }), e.exports = function (t) {
                function e(t, e) {
                    return r.valueOrDefault(t.showLine, e.showLines)
                }
                t.controllers.line = t.DatasetController.extend({
                    datasetElementType: a.Line,
                    dataElementType: a.Point,
                    update: function (t) {
                        var i, n, a, o = this,
                            s = o.getMeta(),
                            l = s.dataset,
                            u = s.data || [],
                            d = o.chart.options,
                            h = d.elements.line,
                            c = o.getScaleForId(s.yAxisID),
                            f = o.getDataset(),
                            g = e(f, d);
                        for (g && (a = l.custom || {}, void 0 !== f.tension && void 0 === f.lineTension && (f.lineTension = f.tension), l._scale = c, l._datasetIndex = o.index, l._children = u, l._model = {
                                spanGaps: f.spanGaps ? f.spanGaps : d.spanGaps,
                                tension: a.tension ? a.tension : r.valueOrDefault(f.lineTension, h.tension),
                                backgroundColor: a.backgroundColor ? a.backgroundColor : f.backgroundColor || h.backgroundColor,
                                borderWidth: a.borderWidth ? a.borderWidth : f.borderWidth || h.borderWidth,
                                borderColor: a.borderColor ? a.borderColor : f.borderColor || h.borderColor,
                                borderCapStyle: a.borderCapStyle ? a.borderCapStyle : f.borderCapStyle || h.borderCapStyle,
                                borderDash: a.borderDash ? a.borderDash : f.borderDash || h.borderDash,
                                borderDashOffset: a.borderDashOffset ? a.borderDashOffset : f.borderDashOffset || h.borderDashOffset,
                                borderJoinStyle: a.borderJoinStyle ? a.borderJoinStyle : f.borderJoinStyle || h.borderJoinStyle,
                                fill: a.fill ? a.fill : void 0 !== f.fill ? f.fill : h.fill,
                                steppedLine: a.steppedLine ? a.steppedLine : r.valueOrDefault(f.steppedLine, h.stepped),
                                cubicInterpolationMode: a.cubicInterpolationMode ? a.cubicInterpolationMode : r.valueOrDefault(f.cubicInterpolationMode, h.cubicInterpolationMode)
                            }, l.pivot()), i = 0, n = u.length; i < n; ++i) o.updateElement(u[i], i, t);
                        for (g && 0 !== l._model.tension && o.updateBezierControlPoints(), i = 0, n = u.length; i < n; ++i) u[i].pivot()
                    },
                    getPointBackgroundColor: function (t, e) {
                        var i = this.chart.options.elements.point.backgroundColor,
                            n = this.getDataset(),
                            a = t.custom || {};
                        return a.backgroundColor ? i = a.backgroundColor : n.pointBackgroundColor ? i = r.valueAtIndexOrDefault(n.pointBackgroundColor, e, i) : n.backgroundColor && (i = n.backgroundColor), i
                    },
                    getPointBorderColor: function (t, e) {
                        var i = this.chart.options.elements.point.borderColor,
                            n = this.getDataset(),
                            a = t.custom || {};
                        return a.borderColor ? i = a.borderColor : n.pointBorderColor ? i = r.valueAtIndexOrDefault(n.pointBorderColor, e, i) : n.borderColor && (i = n.borderColor), i
                    },
                    getPointBorderWidth: function (t, e) {
                        var i = this.chart.options.elements.point.borderWidth,
                            n = this.getDataset(),
                            a = t.custom || {};
                        return isNaN(a.borderWidth) ? !isNaN(n.pointBorderWidth) || r.isArray(n.pointBorderWidth) ? i = r.valueAtIndexOrDefault(n.pointBorderWidth, e, i) : isNaN(n.borderWidth) || (i = n.borderWidth) : i = a.borderWidth, i
                    },
                    updateElement: function (t, e, i) {
                        var n, a, o = this,
                            s = o.getMeta(),
                            l = t.custom || {},
                            u = o.getDataset(),
                            d = o.index,
                            h = u.data[e],
                            c = o.getScaleForId(s.yAxisID),
                            f = o.getScaleForId(s.xAxisID),
                            g = o.chart.options.elements.point;
                        void 0 !== u.radius && void 0 === u.pointRadius && (u.pointRadius = u.radius), void 0 !== u.hitRadius && void 0 === u.pointHitRadius && (u.pointHitRadius = u.hitRadius), n = f.getPixelForValue("object" == typeof h ? h : NaN, e, d), a = i ? c.getBasePixel() : o.calculatePointY(h, e, d), t._xScale = f, t._yScale = c, t._datasetIndex = d, t._index = e, t._model = {
                            x: n,
                            y: a,
                            skip: l.skip || isNaN(n) || isNaN(a),
                            radius: l.radius || r.valueAtIndexOrDefault(u.pointRadius, e, g.radius),
                            pointStyle: l.pointStyle || r.valueAtIndexOrDefault(u.pointStyle, e, g.pointStyle),
                            backgroundColor: o.getPointBackgroundColor(t, e),
                            borderColor: o.getPointBorderColor(t, e),
                            borderWidth: o.getPointBorderWidth(t, e),
                            tension: s.dataset._model ? s.dataset._model.tension : 0,
                            steppedLine: !!s.dataset._model && s.dataset._model.steppedLine,
                            hitRadius: l.hitRadius || r.valueAtIndexOrDefault(u.pointHitRadius, e, g.hitRadius)
                        }
                    },
                    calculatePointY: function (t, e, i) {
                        var n, a, r, o = this.chart,
                            s = this.getMeta(),
                            l = this.getScaleForId(s.yAxisID),
                            u = 0,
                            d = 0;
                        if (l.options.stacked) {
                            for (n = 0; n < i; n++)
                                if (a = o.data.datasets[n], "line" === (r = o.getDatasetMeta(n)).type && r.yAxisID === l.id && o.isDatasetVisible(n)) {
                                    var h = Number(l.getRightValue(a.data[e]));
                                    h < 0 ? d += h || 0 : u += h || 0
                                } var c = Number(l.getRightValue(t));
                            return c < 0 ? l.getPixelForValue(d + c) : l.getPixelForValue(u + c)
                        }
                        return l.getPixelForValue(t)
                    },
                    updateBezierControlPoints: function () {
                        var t, e, i, n, a = this.getMeta(),
                            o = this.chart.chartArea,
                            s = a.data || [];

                        function l(t, e, i) {
                            return Math.max(Math.min(t, i), e)
                        }
                        if (a.dataset._model.spanGaps && (s = s.filter(function (t) {
                                return !t._model.skip
                            })), "monotone" === a.dataset._model.cubicInterpolationMode) r.splineCurveMonotone(s);
                        else
                            for (t = 0, e = s.length; t < e; ++t) i = s[t]._model, n = r.splineCurve(r.previousItem(s, t)._model, i, r.nextItem(s, t)._model, a.dataset._model.tension), i.controlPointPreviousX = n.previous.x, i.controlPointPreviousY = n.previous.y, i.controlPointNextX = n.next.x, i.controlPointNextY = n.next.y;
                        if (this.chart.options.elements.line.capBezierPoints)
                            for (t = 0, e = s.length; t < e; ++t)(i = s[t]._model).controlPointPreviousX = l(i.controlPointPreviousX, o.left, o.right), i.controlPointPreviousY = l(i.controlPointPreviousY, o.top, o.bottom), i.controlPointNextX = l(i.controlPointNextX, o.left, o.right), i.controlPointNextY = l(i.controlPointNextY, o.top, o.bottom)
                    },
                    draw: function () {
                        var t = this.chart,
                            i = this.getMeta(),
                            n = i.data || [],
                            a = t.chartArea,
                            o = n.length,
                            s = 0;
                        for (r.canvas.clipArea(t.ctx, a), e(this.getDataset(), t.options) && i.dataset.draw(), r.canvas.unclipArea(t.ctx); s < o; ++s) n[s].draw(a)
                    },
                    setHoverStyle: function (t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            a = t._model;
                        a.radius = n.hoverRadius || r.valueAtIndexOrDefault(e.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius), a.backgroundColor = n.hoverBackgroundColor || r.valueAtIndexOrDefault(e.pointHoverBackgroundColor, i, r.getHoverColor(a.backgroundColor)), a.borderColor = n.hoverBorderColor || r.valueAtIndexOrDefault(e.pointHoverBorderColor, i, r.getHoverColor(a.borderColor)), a.borderWidth = n.hoverBorderWidth || r.valueAtIndexOrDefault(e.pointHoverBorderWidth, i, a.borderWidth)
                    },
                    removeHoverStyle: function (t) {
                        var e = this,
                            i = e.chart.data.datasets[t._datasetIndex],
                            n = t._index,
                            a = t.custom || {},
                            o = t._model;
                        void 0 !== i.radius && void 0 === i.pointRadius && (i.pointRadius = i.radius), o.radius = a.radius || r.valueAtIndexOrDefault(i.pointRadius, n, e.chart.options.elements.point.radius), o.backgroundColor = e.getPointBackgroundColor(t, n), o.borderColor = e.getPointBorderColor(t, n), o.borderWidth = e.getPointBorderWidth(t, n)
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        19: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("polarArea", {
                scale: {
                    type: "radialLinear",
                    angleLines: {
                        display: !1
                    },
                    gridLines: {
                        circular: !0
                    },
                    pointLabels: {
                        display: !1
                    },
                    ticks: {
                        beginAtZero: !0
                    }
                },
                animation: {
                    animateRotate: !0,
                    animateScale: !0
                },
                startAngle: -.5 * Math.PI,
                legendCallback: function (t) {
                    var e = [];
                    e.push('<ul class="' + t.id + '-legend">');
                    var i = t.data,
                        n = i.datasets,
                        a = i.labels;
                    if (n.length)
                        for (var r = 0; r < n[0].data.length; ++r) e.push('<li><span style="background-color:' + n[0].backgroundColor[r] + '"></span>'), a[r] && e.push(a[r]), e.push("</li>");
                    return e.push("</ul>"), e.join("")
                },
                legend: {
                    labels: {
                        generateLabels: function (t) {
                            var e = t.data;
                            return e.labels.length && e.datasets.length ? e.labels.map(function (i, n) {
                                var a = t.getDatasetMeta(0),
                                    o = e.datasets[0],
                                    s = a.data[n].custom || {},
                                    l = r.valueAtIndexOrDefault,
                                    u = t.options.elements.arc;
                                return {
                                    text: i,
                                    fillStyle: s.backgroundColor ? s.backgroundColor : l(o.backgroundColor, n, u.backgroundColor),
                                    strokeStyle: s.borderColor ? s.borderColor : l(o.borderColor, n, u.borderColor),
                                    lineWidth: s.borderWidth ? s.borderWidth : l(o.borderWidth, n, u.borderWidth),
                                    hidden: isNaN(o.data[n]) || a.data[n].hidden,
                                    index: n
                                }
                            }) : []
                        }
                    },
                    onClick: function (t, e) {
                        var i, n, a, r = e.index,
                            o = this.chart;
                        for (i = 0, n = (o.data.datasets || []).length; i < n; ++i)(a = o.getDatasetMeta(i)).data[r].hidden = !a.data[r].hidden;
                        o.update()
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function () {
                            return ""
                        },
                        label: function (t, e) {
                            return e.labels[t.index] + ": " + t.yLabel
                        }
                    }
                }
            }), e.exports = function (t) {
                t.controllers.polarArea = t.DatasetController.extend({
                    dataElementType: a.Arc,
                    linkScales: r.noop,
                    update: function (t) {
                        var e = this,
                            i = e.chart,
                            n = i.chartArea,
                            a = e.getMeta(),
                            o = i.options,
                            s = o.elements.arc,
                            l = Math.min(n.right - n.left, n.bottom - n.top);
                        i.outerRadius = Math.max((l - s.borderWidth / 2) / 2, 0), i.innerRadius = Math.max(o.cutoutPercentage ? i.outerRadius / 100 * o.cutoutPercentage : 1, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), e.outerRadius = i.outerRadius - i.radiusLength * e.index, e.innerRadius = e.outerRadius - i.radiusLength, a.count = e.countVisibleElements(), r.each(a.data, function (i, n) {
                            e.updateElement(i, n, t)
                        })
                    },
                    updateElement: function (t, e, i) {
                        for (var n = this, a = n.chart, o = n.getDataset(), s = a.options, l = s.animation, u = a.scale, d = a.data.labels, h = n.calculateCircumference(o.data[e]), c = u.xCenter, f = u.yCenter, g = 0, m = n.getMeta(), p = 0; p < e; ++p) isNaN(o.data[p]) || m.data[p].hidden || ++g;
                        var v = s.startAngle,
                            y = t.hidden ? 0 : u.getDistanceFromCenterForValue(o.data[e]),
                            b = v + h * g,
                            x = b + (t.hidden ? 0 : h),
                            _ = l.animateScale ? 0 : u.getDistanceFromCenterForValue(o.data[e]);
                        r.extend(t, {
                            _datasetIndex: n.index,
                            _index: e,
                            _scale: u,
                            _model: {
                                x: c,
                                y: f,
                                innerRadius: 0,
                                outerRadius: i ? _ : y,
                                startAngle: i && l.animateRotate ? v : b,
                                endAngle: i && l.animateRotate ? v : x,
                                label: r.valueAtIndexOrDefault(d, e, d[e])
                            }
                        }), n.removeHoverStyle(t), t.pivot()
                    },
                    removeHoverStyle: function (e) {
                        t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
                    },
                    countVisibleElements: function () {
                        var t = this.getDataset(),
                            e = this.getMeta(),
                            i = 0;
                        return r.each(e.data, function (e, n) {
                            isNaN(t.data[n]) || e.hidden || i++
                        }), i
                    },
                    calculateCircumference: function (t) {
                        var e = this.getMeta().count;
                        return e > 0 && !isNaN(t) ? 2 * Math.PI / e : 0
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        20: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("radar", {
                scale: {
                    type: "radialLinear"
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            }), e.exports = function (t) {
                t.controllers.radar = t.DatasetController.extend({
                    datasetElementType: a.Line,
                    dataElementType: a.Point,
                    linkScales: r.noop,
                    update: function (t) {
                        var e = this,
                            i = e.getMeta(),
                            n = i.dataset,
                            a = i.data,
                            o = n.custom || {},
                            s = e.getDataset(),
                            l = e.chart.options.elements.line,
                            u = e.chart.scale;
                        void 0 !== s.tension && void 0 === s.lineTension && (s.lineTension = s.tension), r.extend(i.dataset, {
                            _datasetIndex: e.index,
                            _scale: u,
                            _children: a,
                            _loop: !0,
                            _model: {
                                tension: o.tension ? o.tension : r.valueOrDefault(s.lineTension, l.tension),
                                backgroundColor: o.backgroundColor ? o.backgroundColor : s.backgroundColor || l.backgroundColor,
                                borderWidth: o.borderWidth ? o.borderWidth : s.borderWidth || l.borderWidth,
                                borderColor: o.borderColor ? o.borderColor : s.borderColor || l.borderColor,
                                fill: o.fill ? o.fill : void 0 !== s.fill ? s.fill : l.fill,
                                borderCapStyle: o.borderCapStyle ? o.borderCapStyle : s.borderCapStyle || l.borderCapStyle,
                                borderDash: o.borderDash ? o.borderDash : s.borderDash || l.borderDash,
                                borderDashOffset: o.borderDashOffset ? o.borderDashOffset : s.borderDashOffset || l.borderDashOffset,
                                borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : s.borderJoinStyle || l.borderJoinStyle
                            }
                        }), i.dataset.pivot(), r.each(a, function (i, n) {
                            e.updateElement(i, n, t)
                        }, e), e.updateBezierControlPoints()
                    },
                    updateElement: function (t, e, i) {
                        var n = this,
                            a = t.custom || {},
                            o = n.getDataset(),
                            s = n.chart.scale,
                            l = n.chart.options.elements.point,
                            u = s.getPointPositionForValue(e, o.data[e]);
                        void 0 !== o.radius && void 0 === o.pointRadius && (o.pointRadius = o.radius), void 0 !== o.hitRadius && void 0 === o.pointHitRadius && (o.pointHitRadius = o.hitRadius), r.extend(t, {
                            _datasetIndex: n.index,
                            _index: e,
                            _scale: s,
                            _model: {
                                x: i ? s.xCenter : u.x,
                                y: i ? s.yCenter : u.y,
                                tension: a.tension ? a.tension : r.valueOrDefault(o.lineTension, n.chart.options.elements.line.tension),
                                radius: a.radius ? a.radius : r.valueAtIndexOrDefault(o.pointRadius, e, l.radius),
                                backgroundColor: a.backgroundColor ? a.backgroundColor : r.valueAtIndexOrDefault(o.pointBackgroundColor, e, l.backgroundColor),
                                borderColor: a.borderColor ? a.borderColor : r.valueAtIndexOrDefault(o.pointBorderColor, e, l.borderColor),
                                borderWidth: a.borderWidth ? a.borderWidth : r.valueAtIndexOrDefault(o.pointBorderWidth, e, l.borderWidth),
                                pointStyle: a.pointStyle ? a.pointStyle : r.valueAtIndexOrDefault(o.pointStyle, e, l.pointStyle),
                                hitRadius: a.hitRadius ? a.hitRadius : r.valueAtIndexOrDefault(o.pointHitRadius, e, l.hitRadius)
                            }
                        }), t._model.skip = a.skip ? a.skip : isNaN(t._model.x) || isNaN(t._model.y)
                    },
                    updateBezierControlPoints: function () {
                        var t = this.chart.chartArea,
                            e = this.getMeta();
                        r.each(e.data, function (i, n) {
                            var a = i._model,
                                o = r.splineCurve(r.previousItem(e.data, n, !0)._model, a, r.nextItem(e.data, n, !0)._model, a.tension);
                            a.controlPointPreviousX = Math.max(Math.min(o.previous.x, t.right), t.left), a.controlPointPreviousY = Math.max(Math.min(o.previous.y, t.bottom), t.top), a.controlPointNextX = Math.max(Math.min(o.next.x, t.right), t.left), a.controlPointNextY = Math.max(Math.min(o.next.y, t.bottom), t.top), i.pivot()
                        })
                    },
                    setHoverStyle: function (t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t.custom || {},
                            n = t._index,
                            a = t._model;
                        a.radius = i.hoverRadius ? i.hoverRadius : r.valueAtIndexOrDefault(e.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius), a.backgroundColor = i.hoverBackgroundColor ? i.hoverBackgroundColor : r.valueAtIndexOrDefault(e.pointHoverBackgroundColor, n, r.getHoverColor(a.backgroundColor)), a.borderColor = i.hoverBorderColor ? i.hoverBorderColor : r.valueAtIndexOrDefault(e.pointHoverBorderColor, n, r.getHoverColor(a.borderColor)), a.borderWidth = i.hoverBorderWidth ? i.hoverBorderWidth : r.valueAtIndexOrDefault(e.pointHoverBorderWidth, n, a.borderWidth)
                    },
                    removeHoverStyle: function (t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t.custom || {},
                            n = t._index,
                            a = t._model,
                            o = this.chart.options.elements.point;
                        a.radius = i.radius ? i.radius : r.valueAtIndexOrDefault(e.pointRadius, n, o.radius), a.backgroundColor = i.backgroundColor ? i.backgroundColor : r.valueAtIndexOrDefault(e.pointBackgroundColor, n, o.backgroundColor), a.borderColor = i.borderColor ? i.borderColor : r.valueAtIndexOrDefault(e.pointBorderColor, n, o.borderColor), a.borderWidth = i.borderWidth ? i.borderWidth : r.valueAtIndexOrDefault(e.pointBorderWidth, n, o.borderWidth)
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        21: [function (t, e, i) {
            "use strict";
            t(25)._set("scatter", {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [{
                        id: "x-axis-1",
                        type: "linear",
                        position: "bottom"
                    }],
                    yAxes: [{
                        id: "y-axis-1",
                        type: "linear",
                        position: "left"
                    }]
                },
                showLines: !1,
                tooltips: {
                    callbacks: {
                        title: function () {
                            return ""
                        },
                        label: function (t) {
                            return "(" + t.xLabel + ", " + t.yLabel + ")"
                        }
                    }
                }
            }), e.exports = function (t) {
                t.controllers.scatter = t.controllers.line
            }
        }, {
            25: 25
        }],
        22: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45);
            n._set("global", {
                animation: {
                    duration: 1e3,
                    easing: "easeOutQuart",
                    onProgress: r.noop,
                    onComplete: r.noop
                }
            }), e.exports = function (t) {
                t.Animation = a.extend({
                    chart: null,
                    currentStep: 0,
                    numSteps: 60,
                    easing: "",
                    render: null,
                    onAnimationProgress: null,
                    onAnimationComplete: null
                }), t.animationService = {
                    frameDuration: 17,
                    animations: [],
                    dropFrames: 0,
                    request: null,
                    addAnimation: function (t, e, i, n) {
                        var a, r, o = this.animations;
                        for (e.chart = t, n || (t.animating = !0), a = 0, r = o.length; a < r; ++a)
                            if (o[a].chart === t) return void(o[a] = e);
                        o.push(e), 1 === o.length && this.requestAnimationFrame()
                    },
                    cancelAnimation: function (t) {
                        var e = r.findIndex(this.animations, function (e) {
                            return e.chart === t
                        }); - 1 !== e && (this.animations.splice(e, 1), t.animating = !1)
                    },
                    requestAnimationFrame: function () {
                        var t = this;
                        null === t.request && (t.request = r.requestAnimFrame.call(window, function () {
                            t.request = null, t.startDigest()
                        }))
                    },
                    startDigest: function () {
                        var t = this,
                            e = Date.now(),
                            i = 0;
                        t.dropFrames > 1 && (i = Math.floor(t.dropFrames), t.dropFrames = t.dropFrames % 1), t.advance(1 + i);
                        var n = Date.now();
                        t.dropFrames += (n - e) / t.frameDuration, t.animations.length > 0 && t.requestAnimationFrame()
                    },
                    advance: function (t) {
                        for (var e, i, n = this.animations, a = 0; a < n.length;) i = (e = n[a]).chart, e.currentStep = (e.currentStep || 0) + t, e.currentStep = Math.min(e.currentStep, e.numSteps), r.callback(e.render, [i, e], i), r.callback(e.onAnimationProgress, [e], i), e.currentStep >= e.numSteps ? (r.callback(e.onAnimationComplete, [e], i), i.animating = !1, n.splice(a, 1)) : ++a
                    }
                }, Object.defineProperty(t.Animation.prototype, "animationObject", {
                    get: function () {
                        return this
                    }
                }), Object.defineProperty(t.Animation.prototype, "chartInstance", {
                    get: function () {
                        return this.chart
                    },
                    set: function (t) {
                        this.chart = t
                    }
                })
            }
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        23: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45),
                r = t(28),
                o = t(30),
                s = t(48),
                l = t(31);
            e.exports = function (t) {
                function e(t) {
                    return "top" === t || "bottom" === t
                }
                t.types = {}, t.instances = {}, t.controllers = {}, a.extend(t.prototype, {
                    construct: function (e, i) {
                        var r, o, l = this;
                        (o = (r = (r = i) || {}).data = r.data || {}).datasets = o.datasets || [], o.labels = o.labels || [], r.options = a.configMerge(n.global, n[r.type], r.options || {}), i = r;
                        var u = s.acquireContext(e, i),
                            d = u && u.canvas,
                            h = d && d.height,
                            c = d && d.width;
                        l.id = a.uid(), l.ctx = u, l.canvas = d, l.config = i, l.width = c, l.height = h, l.aspectRatio = h ? c / h : null, l.options = i.options, l._bufferedRender = !1, l.chart = l, l.controller = l, t.instances[l.id] = l, Object.defineProperty(l, "data", {
                            get: function () {
                                return l.config.data
                            },
                            set: function (t) {
                                l.config.data = t
                            }
                        }), u && d ? (l.initialize(), l.update()) : console.error("Failed to create chart: can't acquire context from the given item")
                    },
                    initialize: function () {
                        var t = this;
                        return l.notify(t, "beforeInit"), a.retinaScale(t, t.options.devicePixelRatio), t.bindEvents(), t.options.responsive && t.resize(!0), t.ensureScalesHaveIDs(), t.buildOrUpdateScales(), t.initToolTip(), l.notify(t, "afterInit"), t
                    },
                    clear: function () {
                        return a.canvas.clear(this), this
                    },
                    stop: function () {
                        return t.animationService.cancelAnimation(this), this
                    },
                    resize: function (t) {
                        var e = this,
                            i = e.options,
                            n = e.canvas,
                            r = i.maintainAspectRatio && e.aspectRatio || null,
                            o = Math.max(0, Math.floor(a.getMaximumWidth(n))),
                            s = Math.max(0, Math.floor(r ? o / r : a.getMaximumHeight(n)));
                        if ((e.width !== o || e.height !== s) && (n.width = e.width = o, n.height = e.height = s, n.style.width = o + "px", n.style.height = s + "px", a.retinaScale(e, i.devicePixelRatio), !t)) {
                            var u = {
                                width: o,
                                height: s
                            };
                            l.notify(e, "resize", [u]), e.options.onResize && e.options.onResize(e, u), e.stop(), e.update(e.options.responsiveAnimationDuration)
                        }
                    },
                    ensureScalesHaveIDs: function () {
                        var t = this.options,
                            e = t.scales || {},
                            i = t.scale;
                        a.each(e.xAxes, function (t, e) {
                            t.id = t.id || "x-axis-" + e
                        }), a.each(e.yAxes, function (t, e) {
                            t.id = t.id || "y-axis-" + e
                        }), i && (i.id = i.id || "scale")
                    },
                    buildOrUpdateScales: function () {
                        var i = this,
                            n = i.options,
                            r = i.scales || {},
                            o = [],
                            s = Object.keys(r).reduce(function (t, e) {
                                return t[e] = !1, t
                            }, {});
                        n.scales && (o = o.concat((n.scales.xAxes || []).map(function (t) {
                            return {
                                options: t,
                                dtype: "category",
                                dposition: "bottom"
                            }
                        }), (n.scales.yAxes || []).map(function (t) {
                            return {
                                options: t,
                                dtype: "linear",
                                dposition: "left"
                            }
                        }))), n.scale && o.push({
                            options: n.scale,
                            dtype: "radialLinear",
                            isDefault: !0,
                            dposition: "chartArea"
                        }), a.each(o, function (n) {
                            var o = n.options,
                                l = o.id,
                                u = a.valueOrDefault(o.type, n.dtype);
                            e(o.position) !== e(n.dposition) && (o.position = n.dposition), s[l] = !0;
                            var d = null;
                            if (l in r && r[l].type === u)(d = r[l]).options = o, d.ctx = i.ctx, d.chart = i;
                            else {
                                var h = t.scaleService.getScaleConstructor(u);
                                if (!h) return;
                                d = new h({
                                    id: l,
                                    type: u,
                                    options: o,
                                    ctx: i.ctx,
                                    chart: i
                                }), r[d.id] = d
                            }
                            d.mergeTicksOptions(), n.isDefault && (i.scale = d)
                        }), a.each(s, function (t, e) {
                            t || delete r[e]
                        }), i.scales = r, t.scaleService.addScalesToLayout(this)
                    },
                    buildOrUpdateControllers: function () {
                        var e = this,
                            i = [],
                            n = [];
                        return a.each(e.data.datasets, function (a, r) {
                            var o = e.getDatasetMeta(r),
                                s = a.type || e.config.type;
                            if (o.type && o.type !== s && (e.destroyDatasetMeta(r), o = e.getDatasetMeta(r)), o.type = s, i.push(o.type), o.controller) o.controller.updateIndex(r), o.controller.linkScales();
                            else {
                                var l = t.controllers[o.type];
                                if (void 0 === l) throw new Error('"' + o.type + '" is not a chart type.');
                                o.controller = new l(e, r), n.push(o.controller)
                            }
                        }, e), n
                    },
                    resetElements: function () {
                        var t = this;
                        a.each(t.data.datasets, function (e, i) {
                            t.getDatasetMeta(i).controller.reset()
                        }, t)
                    },
                    reset: function () {
                        this.resetElements(), this.tooltip.initialize()
                    },
                    update: function (e) {
                        var i, n, r = this;
                        if (e && "object" == typeof e || (e = {
                                duration: e,
                                lazy: arguments[1]
                            }), n = (i = r).options, a.each(i.scales, function (t) {
                                o.removeBox(i, t)
                            }), n = a.configMerge(t.defaults.global, t.defaults[i.config.type], n), i.options = i.config.options = n, i.ensureScalesHaveIDs(), i.buildOrUpdateScales(), i.tooltip._options = n.tooltips, i.tooltip.initialize(), l._invalidate(r), !1 !== l.notify(r, "beforeUpdate")) {
                            r.tooltip._data = r.data;
                            var s = r.buildOrUpdateControllers();
                            a.each(r.data.datasets, function (t, e) {
                                r.getDatasetMeta(e).controller.buildOrUpdateElements()
                            }, r), r.updateLayout(), r.options.animation && r.options.animation.duration && a.each(s, function (t) {
                                t.reset()
                            }), r.updateDatasets(), r.tooltip.initialize(), r.lastActive = [], l.notify(r, "afterUpdate"), r._bufferedRender ? r._bufferedRequest = {
                                duration: e.duration,
                                easing: e.easing,
                                lazy: e.lazy
                            } : r.render(e)
                        }
                    },
                    updateLayout: function () {
                        !1 !== l.notify(this, "beforeLayout") && (o.update(this, this.width, this.height), l.notify(this, "afterScaleUpdate"), l.notify(this, "afterLayout"))
                    },
                    updateDatasets: function () {
                        if (!1 !== l.notify(this, "beforeDatasetsUpdate")) {
                            for (var t = 0, e = this.data.datasets.length; t < e; ++t) this.updateDataset(t);
                            l.notify(this, "afterDatasetsUpdate")
                        }
                    },
                    updateDataset: function (t) {
                        var e = this.getDatasetMeta(t),
                            i = {
                                meta: e,
                                index: t
                            };
                        !1 !== l.notify(this, "beforeDatasetUpdate", [i]) && (e.controller.update(), l.notify(this, "afterDatasetUpdate", [i]))
                    },
                    render: function (e) {
                        var i = this;
                        e && "object" == typeof e || (e = {
                            duration: e,
                            lazy: arguments[1]
                        });
                        var n = e.duration,
                            r = e.lazy;
                        if (!1 !== l.notify(i, "beforeRender")) {
                            var o = i.options.animation,
                                s = function (t) {
                                    l.notify(i, "afterRender"), a.callback(o && o.onComplete, [t], i)
                                };
                            if (o && (void 0 !== n && 0 !== n || void 0 === n && 0 !== o.duration)) {
                                var u = new t.Animation({
                                    numSteps: (n || o.duration) / 16.66,
                                    easing: e.easing || o.easing,
                                    render: function (t, e) {
                                        var i = a.easing.effects[e.easing],
                                            n = e.currentStep,
                                            r = n / e.numSteps;
                                        t.draw(i(r), r, n)
                                    },
                                    onAnimationProgress: o.onProgress,
                                    onAnimationComplete: s
                                });
                                t.animationService.addAnimation(i, u, n, r)
                            } else i.draw(), s(new t.Animation({
                                numSteps: 0,
                                chart: i
                            }));
                            return i
                        }
                    },
                    draw: function (t) {
                        var e = this;
                        e.clear(), a.isNullOrUndef(t) && (t = 1), e.transition(t), !1 !== l.notify(e, "beforeDraw", [t]) && (a.each(e.boxes, function (t) {
                            t.draw(e.chartArea)
                        }, e), e.scale && e.scale.draw(), e.drawDatasets(t), e._drawTooltip(t), l.notify(e, "afterDraw", [t]))
                    },
                    transition: function (t) {
                        for (var e = 0, i = (this.data.datasets || []).length; e < i; ++e) this.isDatasetVisible(e) && this.getDatasetMeta(e).controller.transition(t);
                        this.tooltip.transition(t)
                    },
                    drawDatasets: function (t) {
                        var e = this;
                        if (!1 !== l.notify(e, "beforeDatasetsDraw", [t])) {
                            for (var i = (e.data.datasets || []).length - 1; i >= 0; --i) e.isDatasetVisible(i) && e.drawDataset(i, t);
                            l.notify(e, "afterDatasetsDraw", [t])
                        }
                    },
                    drawDataset: function (t, e) {
                        var i = this.getDatasetMeta(t),
                            n = {
                                meta: i,
                                index: t,
                                easingValue: e
                            };
                        !1 !== l.notify(this, "beforeDatasetDraw", [n]) && (i.controller.draw(e), l.notify(this, "afterDatasetDraw", [n]))
                    },
                    _drawTooltip: function (t) {
                        var e = this.tooltip,
                            i = {
                                tooltip: e,
                                easingValue: t
                            };
                        !1 !== l.notify(this, "beforeTooltipDraw", [i]) && (e.draw(), l.notify(this, "afterTooltipDraw", [i]))
                    },
                    getElementAtEvent: function (t) {
                        return r.modes.single(this, t)
                    },
                    getElementsAtEvent: function (t) {
                        return r.modes.label(this, t, {
                            intersect: !0
                        })
                    },
                    getElementsAtXAxis: function (t) {
                        return r.modes["x-axis"](this, t, {
                            intersect: !0
                        })
                    },
                    getElementsAtEventForMode: function (t, e, i) {
                        var n = r.modes[e];
                        return "function" == typeof n ? n(this, t, i) : []
                    },
                    getDatasetAtEvent: function (t) {
                        return r.modes.dataset(this, t, {
                            intersect: !0
                        })
                    },
                    getDatasetMeta: function (t) {
                        var e = this.data.datasets[t];
                        e._meta || (e._meta = {});
                        var i = e._meta[this.id];
                        return i || (i = e._meta[this.id] = {
                            type: null,
                            data: [],
                            dataset: null,
                            controller: null,
                            hidden: null,
                            xAxisID: null,
                            yAxisID: null
                        }), i
                    },
                    getVisibleDatasetCount: function () {
                        for (var t = 0, e = 0, i = this.data.datasets.length; e < i; ++e) this.isDatasetVisible(e) && t++;
                        return t
                    },
                    isDatasetVisible: function (t) {
                        var e = this.getDatasetMeta(t);
                        return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden
                    },
                    generateLegend: function () {
                        return this.options.legendCallback(this)
                    },
                    destroyDatasetMeta: function (t) {
                        var e = this.id,
                            i = this.data.datasets[t],
                            n = i._meta && i._meta[e];
                        n && (n.controller.destroy(), delete i._meta[e])
                    },
                    destroy: function () {
                        var e, i, n = this,
                            r = n.canvas;
                        for (n.stop(), e = 0, i = n.data.datasets.length; e < i; ++e) n.destroyDatasetMeta(e);
                        r && (n.unbindEvents(), a.canvas.clear(n), s.releaseContext(n.ctx), n.canvas = null, n.ctx = null), l.notify(n, "destroy"), delete t.instances[n.id]
                    },
                    toBase64Image: function () {
                        return this.canvas.toDataURL.apply(this.canvas, arguments)
                    },
                    initToolTip: function () {
                        var e = this;
                        e.tooltip = new t.Tooltip({
                            _chart: e,
                            _chartInstance: e,
                            _data: e.data,
                            _options: e.options.tooltips
                        }, e)
                    },
                    bindEvents: function () {
                        var t = this,
                            e = t._listeners = {},
                            i = function () {
                                t.eventHandler.apply(t, arguments)
                            };
                        a.each(t.options.events, function (n) {
                            s.addEventListener(t, n, i), e[n] = i
                        }), t.options.responsive && (i = function () {
                            t.resize()
                        }, s.addEventListener(t, "resize", i), e.resize = i)
                    },
                    unbindEvents: function () {
                        var t = this,
                            e = t._listeners;
                        e && (delete t._listeners, a.each(e, function (e, i) {
                            s.removeEventListener(t, i, e)
                        }))
                    },
                    updateHoverStyle: function (t, e, i) {
                        var n, a, r, o = i ? "setHoverStyle" : "removeHoverStyle";
                        for (a = 0, r = t.length; a < r; ++a)(n = t[a]) && this.getDatasetMeta(n._datasetIndex).controller[o](n)
                    },
                    eventHandler: function (t) {
                        var e = this,
                            i = e.tooltip;
                        if (!1 !== l.notify(e, "beforeEvent", [t])) {
                            e._bufferedRender = !0, e._bufferedRequest = null;
                            var n = e.handleEvent(t);
                            i && (n = i._start ? i.handleEvent(t) : n | i.handleEvent(t)), l.notify(e, "afterEvent", [t]);
                            var a = e._bufferedRequest;
                            return a ? e.render(a) : n && !e.animating && (e.stop(), e.render(e.options.hover.animationDuration, !0)), e._bufferedRender = !1, e._bufferedRequest = null, e
                        }
                    },
                    handleEvent: function (t) {
                        var e, i = this,
                            n = i.options || {},
                            r = n.hover;
                        return i.lastActive = i.lastActive || [], "mouseout" === t.type ? i.active = [] : i.active = i.getElementsAtEventForMode(t, r.mode, r), a.callback(n.onHover || n.hover.onHover, [t.native, i.active], i), "mouseup" !== t.type && "click" !== t.type || n.onClick && n.onClick.call(i, t.native, i.active), i.lastActive.length && i.updateHoverStyle(i.lastActive, r.mode, !1), i.active.length && r.mode && i.updateHoverStyle(i.active, r.mode, !0), e = !a.arrayEquals(i.active, i.lastActive), i.lastActive = i.active, e
                    }
                }), t.Controller = t
            }
        }, {
            25: 25,
            28: 28,
            30: 30,
            31: 31,
            45: 45,
            48: 48
        }],
        24: [function (t, e, i) {
            "use strict";
            var n = t(45);
            e.exports = function (t) {
                var e = ["push", "pop", "shift", "splice", "unshift"];

                function i(t, i) {
                    var n = t._chartjs;
                    if (n) {
                        var a = n.listeners,
                            r = a.indexOf(i); - 1 !== r && a.splice(r, 1), a.length > 0 || (e.forEach(function (e) {
                            delete t[e]
                        }), delete t._chartjs)
                    }
                }
                t.DatasetController = function (t, e) {
                    this.initialize(t, e)
                }, n.extend(t.DatasetController.prototype, {
                    datasetElementType: null,
                    dataElementType: null,
                    initialize: function (t, e) {
                        this.chart = t, this.index = e, this.linkScales(), this.addElements()
                    },
                    updateIndex: function (t) {
                        this.index = t
                    },
                    linkScales: function () {
                        var t = this,
                            e = t.getMeta(),
                            i = t.getDataset();
                        null !== e.xAxisID && e.xAxisID in t.chart.scales || (e.xAxisID = i.xAxisID || t.chart.options.scales.xAxes[0].id), null !== e.yAxisID && e.yAxisID in t.chart.scales || (e.yAxisID = i.yAxisID || t.chart.options.scales.yAxes[0].id)
                    },
                    getDataset: function () {
                        return this.chart.data.datasets[this.index]
                    },
                    getMeta: function () {
                        return this.chart.getDatasetMeta(this.index)
                    },
                    getScaleForId: function (t) {
                        return this.chart.scales[t]
                    },
                    reset: function () {
                        this.update(!0)
                    },
                    destroy: function () {
                        this._data && i(this._data, this)
                    },
                    createMetaDataset: function () {
                        var t = this.datasetElementType;
                        return t && new t({
                            _chart: this.chart,
                            _datasetIndex: this.index
                        })
                    },
                    createMetaData: function (t) {
                        var e = this.dataElementType;
                        return e && new e({
                            _chart: this.chart,
                            _datasetIndex: this.index,
                            _index: t
                        })
                    },
                    addElements: function () {
                        var t, e, i = this.getMeta(),
                            n = this.getDataset().data || [],
                            a = i.data;
                        for (t = 0, e = n.length; t < e; ++t) a[t] = a[t] || this.createMetaData(t);
                        i.dataset = i.dataset || this.createMetaDataset()
                    },
                    addElementAndReset: function (t) {
                        var e = this.createMetaData(t);
                        this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0)
                    },
                    buildOrUpdateElements: function () {
                        var t, a, r = this,
                            o = r.getDataset(),
                            s = o.data || (o.data = []);
                        r._data !== s && (r._data && i(r._data, r), a = r, (t = s)._chartjs ? t._chartjs.listeners.push(a) : (Object.defineProperty(t, "_chartjs", {
                            configurable: !0,
                            enumerable: !1,
                            value: {
                                listeners: [a]
                            }
                        }), e.forEach(function (e) {
                            var i = "onData" + e.charAt(0).toUpperCase() + e.slice(1),
                                a = t[e];
                            Object.defineProperty(t, e, {
                                configurable: !0,
                                enumerable: !1,
                                value: function () {
                                    var e = Array.prototype.slice.call(arguments),
                                        r = a.apply(this, e);
                                    return n.each(t._chartjs.listeners, function (t) {
                                        "function" == typeof t[i] && t[i].apply(t, e)
                                    }), r
                                }
                            })
                        })), r._data = s), r.resyncElements()
                    },
                    update: n.noop,
                    transition: function (t) {
                        for (var e = this.getMeta(), i = e.data || [], n = i.length, a = 0; a < n; ++a) i[a].transition(t);
                        e.dataset && e.dataset.transition(t)
                    },
                    draw: function () {
                        var t = this.getMeta(),
                            e = t.data || [],
                            i = e.length,
                            n = 0;
                        for (t.dataset && t.dataset.draw(); n < i; ++n) e[n].draw()
                    },
                    removeHoverStyle: function (t, e) {
                        var i = this.chart.data.datasets[t._datasetIndex],
                            a = t._index,
                            r = t.custom || {},
                            o = n.valueAtIndexOrDefault,
                            s = t._model;
                        s.backgroundColor = r.backgroundColor ? r.backgroundColor : o(i.backgroundColor, a, e.backgroundColor), s.borderColor = r.borderColor ? r.borderColor : o(i.borderColor, a, e.borderColor), s.borderWidth = r.borderWidth ? r.borderWidth : o(i.borderWidth, a, e.borderWidth)
                    },
                    setHoverStyle: function (t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            a = t.custom || {},
                            r = n.valueAtIndexOrDefault,
                            o = n.getHoverColor,
                            s = t._model;
                        s.backgroundColor = a.hoverBackgroundColor ? a.hoverBackgroundColor : r(e.hoverBackgroundColor, i, o(s.backgroundColor)), s.borderColor = a.hoverBorderColor ? a.hoverBorderColor : r(e.hoverBorderColor, i, o(s.borderColor)), s.borderWidth = a.hoverBorderWidth ? a.hoverBorderWidth : r(e.hoverBorderWidth, i, s.borderWidth)
                    },
                    resyncElements: function () {
                        var t = this.getMeta(),
                            e = this.getDataset().data,
                            i = t.data.length,
                            n = e.length;
                        n < i ? t.data.splice(n, i - n) : n > i && this.insertElements(i, n - i)
                    },
                    insertElements: function (t, e) {
                        for (var i = 0; i < e; ++i) this.addElementAndReset(t + i)
                    },
                    onDataPush: function () {
                        this.insertElements(this.getDataset().data.length - 1, arguments.length)
                    },
                    onDataPop: function () {
                        this.getMeta().data.pop()
                    },
                    onDataShift: function () {
                        this.getMeta().data.shift()
                    },
                    onDataSplice: function (t, e) {
                        this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2)
                    },
                    onDataUnshift: function () {
                        this.insertElements(0, arguments.length)
                    }
                }), t.DatasetController.extend = n.inherits
            }
        }, {
            45: 45
        }],
        25: [function (t, e, i) {
            "use strict";
            var n = t(45);
            e.exports = {
                _set: function (t, e) {
                    return n.merge(this[t] || (this[t] = {}), e)
                }
            }
        }, {
            45: 45
        }],
        26: [function (t, e, i) {
            "use strict";
            var n = t(2),
                a = t(45);
            var r = function (t) {
                a.extend(this, t), this.initialize.apply(this, arguments)
            };
            a.extend(r.prototype, {
                initialize: function () {
                    this.hidden = !1
                },
                pivot: function () {
                    var t = this;
                    return t._view || (t._view = a.clone(t._model)), t._start = {}, t
                },
                transition: function (t) {
                    var e = this,
                        i = e._model,
                        a = e._start,
                        r = e._view;
                    return i && 1 !== t ? (r || (r = e._view = {}), a || (a = e._start = {}), function (t, e, i, a) {
                        var r, o, s, l, u, d, h, c, f, g = Object.keys(i);
                        for (r = 0, o = g.length; r < o; ++r)
                            if (d = i[s = g[r]], e.hasOwnProperty(s) || (e[s] = d), (l = e[s]) !== d && "_" !== s[0]) {
                                if (t.hasOwnProperty(s) || (t[s] = l), (h = typeof d) == typeof (u = t[s]))
                                    if ("string" === h) {
                                        if ((c = n(u)).valid && (f = n(d)).valid) {
                                            e[s] = f.mix(c, a).rgbString();
                                            continue
                                        }
                                    } else if ("number" === h && isFinite(u) && isFinite(d)) {
                                    e[s] = u + (d - u) * a;
                                    continue
                                }
                                e[s] = d
                            }
                    }(a, r, i, t), e) : (e._view = i, e._start = null, e)
                },
                tooltipPosition: function () {
                    return {
                        x: this._model.x,
                        y: this._model.y
                    }
                },
                hasValue: function () {
                    return a.isNumber(this._model.x) && a.isNumber(this._model.y)
                }
            }), r.extend = a.inherits, e.exports = r
        }, {
            2: 2,
            45: 45
        }],
        27: [function (t, e, i) {
            "use strict";
            var n = t(2),
                a = t(25),
                r = t(45);
            e.exports = function (t) {
                function e(t, e, i) {
                    var n;
                    return "string" == typeof t ? (n = parseInt(t, 10), -1 !== t.indexOf("%") && (n = n / 100 * e.parentNode[i])) : n = t, n
                }

                function i(t) {
                    return null != t && "none" !== t
                }

                function o(t, n, a) {
                    var r = document.defaultView,
                        o = t.parentNode,
                        s = r.getComputedStyle(t)[n],
                        l = r.getComputedStyle(o)[n],
                        u = i(s),
                        d = i(l),
                        h = Number.POSITIVE_INFINITY;
                    return u || d ? Math.min(u ? e(s, t, a) : h, d ? e(l, o, a) : h) : "none"
                }
                r.configMerge = function () {
                    return r.merge(r.clone(arguments[0]), [].slice.call(arguments, 1), {
                        merger: function (e, i, n, a) {
                            var o = i[e] || {},
                                s = n[e];
                            "scales" === e ? i[e] = r.scaleMerge(o, s) : "scale" === e ? i[e] = r.merge(o, [t.scaleService.getScaleDefaults(s.type), s]) : r._merger(e, i, n, a)
                        }
                    })
                }, r.scaleMerge = function () {
                    return r.merge(r.clone(arguments[0]), [].slice.call(arguments, 1), {
                        merger: function (e, i, n, a) {
                            if ("xAxes" === e || "yAxes" === e) {
                                var o, s, l, u = n[e].length;
                                for (i[e] || (i[e] = []), o = 0; o < u; ++o) l = n[e][o], s = r.valueOrDefault(l.type, "xAxes" === e ? "category" : "linear"), o >= i[e].length && i[e].push({}), !i[e][o].type || l.type && l.type !== i[e][o].type ? r.merge(i[e][o], [t.scaleService.getScaleDefaults(s), l]) : r.merge(i[e][o], l)
                            } else r._merger(e, i, n, a)
                        }
                    })
                }, r.where = function (t, e) {
                    if (r.isArray(t) && Array.prototype.filter) return t.filter(e);
                    var i = [];
                    return r.each(t, function (t) {
                        e(t) && i.push(t)
                    }), i
                }, r.findIndex = Array.prototype.findIndex ? function (t, e, i) {
                    return t.findIndex(e, i)
                } : function (t, e, i) {
                    i = void 0 === i ? t : i;
                    for (var n = 0, a = t.length; n < a; ++n)
                        if (e.call(i, t[n], n, t)) return n;
                    return -1
                }, r.findNextWhere = function (t, e, i) {
                    r.isNullOrUndef(i) && (i = -1);
                    for (var n = i + 1; n < t.length; n++) {
                        var a = t[n];
                        if (e(a)) return a
                    }
                }, r.findPreviousWhere = function (t, e, i) {
                    r.isNullOrUndef(i) && (i = t.length);
                    for (var n = i - 1; n >= 0; n--) {
                        var a = t[n];
                        if (e(a)) return a
                    }
                }, r.isNumber = function (t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                }, r.almostEquals = function (t, e, i) {
                    return Math.abs(t - e) < i
                }, r.almostWhole = function (t, e) {
                    var i = Math.round(t);
                    return i - e < t && i + e > t
                }, r.max = function (t) {
                    return t.reduce(function (t, e) {
                        return isNaN(e) ? t : Math.max(t, e)
                    }, Number.NEGATIVE_INFINITY)
                }, r.min = function (t) {
                    return t.reduce(function (t, e) {
                        return isNaN(e) ? t : Math.min(t, e)
                    }, Number.POSITIVE_INFINITY)
                }, r.sign = Math.sign ? function (t) {
                    return Math.sign(t)
                } : function (t) {
                    return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1
                }, r.log10 = Math.log10 ? function (t) {
                    return Math.log10(t)
                } : function (t) {
                    var e = Math.log(t) * Math.LOG10E,
                        i = Math.round(e);
                    return t === Math.pow(10, i) ? i : e
                }, r.toRadians = function (t) {
                    return t * (Math.PI / 180)
                }, r.toDegrees = function (t) {
                    return t * (180 / Math.PI)
                }, r.getAngleFromPoint = function (t, e) {
                    var i = e.x - t.x,
                        n = e.y - t.y,
                        a = Math.sqrt(i * i + n * n),
                        r = Math.atan2(n, i);
                    return r < -.5 * Math.PI && (r += 2 * Math.PI), {
                        angle: r,
                        distance: a
                    }
                }, r.distanceBetweenPoints = function (t, e) {
                    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
                }, r.aliasPixel = function (t) {
                    return t % 2 == 0 ? 0 : .5
                }, r.splineCurve = function (t, e, i, n) {
                    var a = t.skip ? e : t,
                        r = e,
                        o = i.skip ? e : i,
                        s = Math.sqrt(Math.pow(r.x - a.x, 2) + Math.pow(r.y - a.y, 2)),
                        l = Math.sqrt(Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2)),
                        u = s / (s + l),
                        d = l / (s + l),
                        h = n * (u = isNaN(u) ? 0 : u),
                        c = n * (d = isNaN(d) ? 0 : d);
                    return {
                        previous: {
                            x: r.x - h * (o.x - a.x),
                            y: r.y - h * (o.y - a.y)
                        },
                        next: {
                            x: r.x + c * (o.x - a.x),
                            y: r.y + c * (o.y - a.y)
                        }
                    }
                }, r.EPSILON = Number.EPSILON || 1e-14, r.splineCurveMonotone = function (t) {
                    var e, i, n, a, o, s, l, u, d, h = (t || []).map(function (t) {
                            return {
                                model: t._model,
                                deltaK: 0,
                                mK: 0
                            }
                        }),
                        c = h.length;
                    for (e = 0; e < c; ++e)
                        if (!(n = h[e]).model.skip) {
                            if (i = e > 0 ? h[e - 1] : null, (a = e < c - 1 ? h[e + 1] : null) && !a.model.skip) {
                                var f = a.model.x - n.model.x;
                                n.deltaK = 0 !== f ? (a.model.y - n.model.y) / f : 0
                            }!i || i.model.skip ? n.mK = n.deltaK : !a || a.model.skip ? n.mK = i.deltaK : this.sign(i.deltaK) !== this.sign(n.deltaK) ? n.mK = 0 : n.mK = (i.deltaK + n.deltaK) / 2
                        } for (e = 0; e < c - 1; ++e) n = h[e], a = h[e + 1], n.model.skip || a.model.skip || (r.almostEquals(n.deltaK, 0, this.EPSILON) ? n.mK = a.mK = 0 : (o = n.mK / n.deltaK, s = a.mK / n.deltaK, (u = Math.pow(o, 2) + Math.pow(s, 2)) <= 9 || (l = 3 / Math.sqrt(u), n.mK = o * l * n.deltaK, a.mK = s * l * n.deltaK)));
                    for (e = 0; e < c; ++e)(n = h[e]).model.skip || (i = e > 0 ? h[e - 1] : null, a = e < c - 1 ? h[e + 1] : null, i && !i.model.skip && (d = (n.model.x - i.model.x) / 3, n.model.controlPointPreviousX = n.model.x - d, n.model.controlPointPreviousY = n.model.y - d * n.mK), a && !a.model.skip && (d = (a.model.x - n.model.x) / 3, n.model.controlPointNextX = n.model.x + d, n.model.controlPointNextY = n.model.y + d * n.mK))
                }, r.nextItem = function (t, e, i) {
                    return i ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1]
                }, r.previousItem = function (t, e, i) {
                    return i ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1]
                }, r.niceNum = function (t, e) {
                    var i = Math.floor(r.log10(t)),
                        n = t / Math.pow(10, i);
                    return (e ? n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10 : n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * Math.pow(10, i)
                }, r.requestAnimFrame = "undefined" == typeof window ? function (t) {
                    t()
                } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                    return window.setTimeout(t, 1e3 / 60)
                }, r.getRelativePosition = function (t, e) {
                    var i, n, a = t.originalEvent || t,
                        o = t.currentTarget || t.srcElement,
                        s = o.getBoundingClientRect(),
                        l = a.touches;
                    l && l.length > 0 ? (i = l[0].clientX, n = l[0].clientY) : (i = a.clientX, n = a.clientY);
                    var u = parseFloat(r.getStyle(o, "padding-left")),
                        d = parseFloat(r.getStyle(o, "padding-top")),
                        h = parseFloat(r.getStyle(o, "padding-right")),
                        c = parseFloat(r.getStyle(o, "padding-bottom")),
                        f = s.right - s.left - u - h,
                        g = s.bottom - s.top - d - c;
                    return {
                        x: i = Math.round((i - s.left - u) / f * o.width / e.currentDevicePixelRatio),
                        y: n = Math.round((n - s.top - d) / g * o.height / e.currentDevicePixelRatio)
                    }
                }, r.getConstraintWidth = function (t) {
                    return o(t, "max-width", "clientWidth")
                }, r.getConstraintHeight = function (t) {
                    return o(t, "max-height", "clientHeight")
                }, r.getMaximumWidth = function (t) {
                    var e = t.parentNode;
                    if (!e) return t.clientWidth;
                    var i = parseInt(r.getStyle(e, "padding-left"), 10),
                        n = parseInt(r.getStyle(e, "padding-right"), 10),
                        a = e.clientWidth - i - n,
                        o = r.getConstraintWidth(t);
                    return isNaN(o) ? a : Math.min(a, o)
                }, r.getMaximumHeight = function (t) {
                    var e = t.parentNode;
                    if (!e) return t.clientHeight;
                    var i = parseInt(r.getStyle(e, "padding-top"), 10),
                        n = parseInt(r.getStyle(e, "padding-bottom"), 10),
                        a = e.clientHeight - i - n,
                        o = r.getConstraintHeight(t);
                    return isNaN(o) ? a : Math.min(a, o)
                }, r.getStyle = function (t, e) {
                    return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
                }, r.retinaScale = function (t, e) {
                    var i = t.currentDevicePixelRatio = e || window.devicePixelRatio || 1;
                    if (1 !== i) {
                        var n = t.canvas,
                            a = t.height,
                            r = t.width;
                        n.height = a * i, n.width = r * i, t.ctx.scale(i, i), n.style.height || n.style.width || (n.style.height = a + "px", n.style.width = r + "px")
                    }
                }, r.fontString = function (t, e, i) {
                    return e + " " + t + "px " + i
                }, r.longestText = function (t, e, i, n) {
                    var a = (n = n || {}).data = n.data || {},
                        o = n.garbageCollect = n.garbageCollect || [];
                    n.font !== e && (a = n.data = {}, o = n.garbageCollect = [], n.font = e), t.font = e;
                    var s = 0;
                    r.each(i, function (e) {
                        null != e && !0 !== r.isArray(e) ? s = r.measureText(t, a, o, s, e) : r.isArray(e) && r.each(e, function (e) {
                            null == e || r.isArray(e) || (s = r.measureText(t, a, o, s, e))
                        })
                    });
                    var l = o.length / 2;
                    if (l > i.length) {
                        for (var u = 0; u < l; u++) delete a[o[u]];
                        o.splice(0, l)
                    }
                    return s
                }, r.measureText = function (t, e, i, n, a) {
                    var r = e[a];
                    return r || (r = e[a] = t.measureText(a).width, i.push(a)), r > n && (n = r), n
                }, r.numberOfLabelLines = function (t) {
                    var e = 1;
                    return r.each(t, function (t) {
                        r.isArray(t) && t.length > e && (e = t.length)
                    }), e
                }, r.color = n ? function (t) {
                    return t instanceof CanvasGradient && (t = a.global.defaultColor), n(t)
                } : function (t) {
                    return console.error("Color.js not found!"), t
                }, r.getHoverColor = function (t) {
                    return t instanceof CanvasPattern ? t : r.color(t).saturate(.5).darken(.1).rgbString()
                }
            }
        }, {
            2: 2,
            25: 25,
            45: 45
        }],
        28: [function (t, e, i) {
            "use strict";
            var n = t(45);

            function a(t, e) {
                return t.native ? {
                    x: t.x,
                    y: t.y
                } : n.getRelativePosition(t, e)
            }

            function r(t, e) {
                var i, n, a, r, o;
                for (n = 0, r = t.data.datasets.length; n < r; ++n)
                    if (t.isDatasetVisible(n))
                        for (a = 0, o = (i = t.getDatasetMeta(n)).data.length; a < o; ++a) {
                            var s = i.data[a];
                            s._view.skip || e(s)
                        }
            }

            function o(t, e) {
                var i = [];
                return r(t, function (t) {
                    t.inRange(e.x, e.y) && i.push(t)
                }), i
            }

            function s(t, e, i, n) {
                var a = Number.POSITIVE_INFINITY,
                    o = [];
                return r(t, function (t) {
                    if (!i || t.inRange(e.x, e.y)) {
                        var r = t.getCenterPoint(),
                            s = n(e, r);
                        s < a ? (o = [t], a = s) : s === a && o.push(t)
                    }
                }), o
            }

            function l(t) {
                var e = -1 !== t.indexOf("x"),
                    i = -1 !== t.indexOf("y");
                return function (t, n) {
                    var a = e ? Math.abs(t.x - n.x) : 0,
                        r = i ? Math.abs(t.y - n.y) : 0;
                    return Math.sqrt(Math.pow(a, 2) + Math.pow(r, 2))
                }
            }

            function u(t, e, i) {
                var n = a(e, t);
                i.axis = i.axis || "x";
                var r = l(i.axis),
                    u = i.intersect ? o(t, n) : s(t, n, !1, r),
                    d = [];
                return u.length ? (t.data.datasets.forEach(function (e, i) {
                    if (t.isDatasetVisible(i)) {
                        var n = t.getDatasetMeta(i).data[u[0]._index];
                        n && !n._view.skip && d.push(n)
                    }
                }), d) : []
            }
            e.exports = {
                modes: {
                    single: function (t, e) {
                        var i = a(e, t),
                            n = [];
                        return r(t, function (t) {
                            if (t.inRange(i.x, i.y)) return n.push(t), n
                        }), n.slice(0, 1)
                    },
                    label: u,
                    index: u,
                    dataset: function (t, e, i) {
                        var n = a(e, t);
                        i.axis = i.axis || "xy";
                        var r = l(i.axis),
                            u = i.intersect ? o(t, n) : s(t, n, !1, r);
                        return u.length > 0 && (u = t.getDatasetMeta(u[0]._datasetIndex).data), u
                    },
                    "x-axis": function (t, e) {
                        return u(t, e, {
                            intersect: !1
                        })
                    },
                    point: function (t, e) {
                        return o(t, a(e, t))
                    },
                    nearest: function (t, e, i) {
                        var n = a(e, t);
                        i.axis = i.axis || "xy";
                        var r = l(i.axis),
                            o = s(t, n, i.intersect, r);
                        return o.length > 1 && o.sort(function (t, e) {
                            var i = t.getArea() - e.getArea();
                            return 0 === i && (i = t._datasetIndex - e._datasetIndex), i
                        }), o.slice(0, 1)
                    },
                    x: function (t, e, i) {
                        var n = a(e, t),
                            o = [],
                            s = !1;
                        return r(t, function (t) {
                            t.inXRange(n.x) && o.push(t), t.inRange(n.x, n.y) && (s = !0)
                        }), i.intersect && !s && (o = []), o
                    },
                    y: function (t, e, i) {
                        var n = a(e, t),
                            o = [],
                            s = !1;
                        return r(t, function (t) {
                            t.inYRange(n.y) && o.push(t), t.inRange(n.x, n.y) && (s = !0)
                        }), i.intersect && !s && (o = []), o
                    }
                }
            }
        }, {
            45: 45
        }],
        29: [function (t, e, i) {
            "use strict";
            t(25)._set("global", {
                responsive: !0,
                responsiveAnimationDuration: 0,
                maintainAspectRatio: !0,
                events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
                hover: {
                    onHover: null,
                    mode: "nearest",
                    intersect: !0,
                    animationDuration: 400
                },
                onClick: null,
                defaultColor: "rgba(0,0,0,0.1)",
                defaultFontColor: "#666",
                defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                defaultFontSize: 12,
                defaultFontStyle: "normal",
                showLines: !0,
                elements: {},
                layout: {
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            }), e.exports = function () {
                var t = function (t, e) {
                    return this.construct(t, e), this
                };
                return t.Chart = t, t
            }
        }, {
            25: 25
        }],
        30: [function (t, e, i) {
            "use strict";
            var n = t(45);

            function a(t, e) {
                return n.where(t, function (t) {
                    return t.position === e
                })
            }

            function r(t, e) {
                t.forEach(function (t, e) {
                    return t._tmpIndex_ = e, t
                }), t.sort(function (t, i) {
                    var n = e ? i : t,
                        a = e ? t : i;
                    return n.weight === a.weight ? n._tmpIndex_ - a._tmpIndex_ : n.weight - a.weight
                }), t.forEach(function (t) {
                    delete t._tmpIndex_
                })
            }
            e.exports = {
                defaults: {},
                addBox: function (t, e) {
                    t.boxes || (t.boxes = []), e.fullWidth = e.fullWidth || !1, e.position = e.position || "top", e.weight = e.weight || 0, t.boxes.push(e)
                },
                removeBox: function (t, e) {
                    var i = t.boxes ? t.boxes.indexOf(e) : -1; - 1 !== i && t.boxes.splice(i, 1)
                },
                configure: function (t, e, i) {
                    for (var n, a = ["fullWidth", "position", "weight"], r = a.length, o = 0; o < r; ++o) n = a[o], i.hasOwnProperty(n) && (e[n] = i[n])
                },
                update: function (t, e, i) {
                    if (t) {
                        var o = t.options.layout || {},
                            s = n.options.toPadding(o.padding),
                            l = s.left,
                            u = s.right,
                            d = s.top,
                            h = s.bottom,
                            c = a(t.boxes, "left"),
                            f = a(t.boxes, "right"),
                            g = a(t.boxes, "top"),
                            m = a(t.boxes, "bottom"),
                            p = a(t.boxes, "chartArea");
                        r(c, !0), r(f, !1), r(g, !0), r(m, !1);
                        var v = e - l - u,
                            y = i - d - h,
                            b = y / 2,
                            x = (e - v / 2) / (c.length + f.length),
                            _ = (i - b) / (g.length + m.length),
                            k = v,
                            w = y,
                            M = [];
                        n.each(c.concat(f, g, m), function (t) {
                            var e, i = t.isHorizontal();
                            i ? (e = t.update(t.fullWidth ? v : k, _), w -= e.height) : (e = t.update(x, w), k -= e.width), M.push({
                                horizontal: i,
                                minSize: e,
                                box: t
                            })
                        });
                        var S = 0,
                            D = 0,
                            C = 0,
                            P = 0;
                        n.each(g.concat(m), function (t) {
                            if (t.getPadding) {
                                var e = t.getPadding();
                                S = Math.max(S, e.left), D = Math.max(D, e.right)
                            }
                        }), n.each(c.concat(f), function (t) {
                            if (t.getPadding) {
                                var e = t.getPadding();
                                C = Math.max(C, e.top), P = Math.max(P, e.bottom)
                            }
                        });
                        var T = l,
                            O = u,
                            I = d,
                            A = h;
                        n.each(c.concat(f), z), n.each(c, function (t) {
                            T += t.width
                        }), n.each(f, function (t) {
                            O += t.width
                        }), n.each(g.concat(m), z), n.each(g, function (t) {
                            I += t.height
                        }), n.each(m, function (t) {
                            A += t.height
                        }), n.each(c.concat(f), function (t) {
                            var e = n.findNextWhere(M, function (e) {
                                    return e.box === t
                                }),
                                i = {
                                    left: 0,
                                    right: 0,
                                    top: I,
                                    bottom: A
                                };
                            e && t.update(e.minSize.width, w, i)
                        }), T = l, O = u, I = d, A = h, n.each(c, function (t) {
                            T += t.width
                        }), n.each(f, function (t) {
                            O += t.width
                        }), n.each(g, function (t) {
                            I += t.height
                        }), n.each(m, function (t) {
                            A += t.height
                        });
                        var F = Math.max(S - T, 0);
                        T += F, O += Math.max(D - O, 0);
                        var R = Math.max(C - I, 0);
                        I += R, A += Math.max(P - A, 0);
                        var L = i - I - A,
                            W = e - T - O;
                        W === k && L === w || (n.each(c, function (t) {
                            t.height = L
                        }), n.each(f, function (t) {
                            t.height = L
                        }), n.each(g, function (t) {
                            t.fullWidth || (t.width = W)
                        }), n.each(m, function (t) {
                            t.fullWidth || (t.width = W)
                        }), w = L, k = W);
                        var Y = l + F,
                            N = d + R;
                        n.each(c.concat(g), H), Y += k, N += w, n.each(f, H), n.each(m, H), t.chartArea = {
                            left: T,
                            top: I,
                            right: T + k,
                            bottom: I + w
                        }, n.each(p, function (e) {
                            e.left = t.chartArea.left, e.top = t.chartArea.top, e.right = t.chartArea.right, e.bottom = t.chartArea.bottom, e.update(k, w)
                        })
                    }

                    function z(t) {
                        var e = n.findNextWhere(M, function (e) {
                            return e.box === t
                        });
                        if (e)
                            if (t.isHorizontal()) {
                                var i = {
                                    left: Math.max(T, S),
                                    right: Math.max(O, D),
                                    top: 0,
                                    bottom: 0
                                };
                                t.update(t.fullWidth ? v : k, y / 2, i)
                            } else t.update(e.minSize.width, w)
                    }

                    function H(t) {
                        t.isHorizontal() ? (t.left = t.fullWidth ? l : T, t.right = t.fullWidth ? e - u : T + k, t.top = N, t.bottom = N + t.height, N = t.bottom) : (t.left = Y, t.right = Y + t.width, t.top = I, t.bottom = I + w, Y = t.right)
                    }
                }
            }
        }, {
            45: 45
        }],
        31: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45);
            n._set("global", {
                plugins: {}
            }), e.exports = {
                _plugins: [],
                _cacheId: 0,
                register: function (t) {
                    var e = this._plugins;
                    [].concat(t).forEach(function (t) {
                        -1 === e.indexOf(t) && e.push(t)
                    }), this._cacheId++
                },
                unregister: function (t) {
                    var e = this._plugins;
                    [].concat(t).forEach(function (t) {
                        var i = e.indexOf(t); - 1 !== i && e.splice(i, 1)
                    }), this._cacheId++
                },
                clear: function () {
                    this._plugins = [], this._cacheId++
                },
                count: function () {
                    return this._plugins.length
                },
                getAll: function () {
                    return this._plugins
                },
                notify: function (t, e, i) {
                    var n, a, r, o, s, l = this.descriptors(t),
                        u = l.length;
                    for (n = 0; n < u; ++n)
                        if ("function" == typeof (s = (r = (a = l[n]).plugin)[e]) && ((o = [t].concat(i || [])).push(a.options), !1 === s.apply(r, o))) return !1;
                    return !0
                },
                descriptors: function (t) {
                    var e = t.$plugins || (t.$plugins = {});
                    if (e.id === this._cacheId) return e.descriptors;
                    var i = [],
                        r = [],
                        o = t && t.config || {},
                        s = o.options && o.options.plugins || {};
                    return this._plugins.concat(o.plugins || []).forEach(function (t) {
                        if (-1 === i.indexOf(t)) {
                            var e = t.id,
                                o = s[e];
                            !1 !== o && (!0 === o && (o = a.clone(n.global.plugins[e])), i.push(t), r.push({
                                plugin: t,
                                options: o || {}
                            }))
                        }
                    }), e.descriptors = r, e.id = this._cacheId, r
                },
                _invalidate: function (t) {
                    delete t.$plugins
                }
            }
        }, {
            25: 25,
            45: 45
        }],
        32: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = t(34);

            function s(t) {
                var e, i, n = [];
                for (e = 0, i = t.length; e < i; ++e) n.push(t[e].label);
                return n
            }

            function l(t, e, i) {
                var n = t.getPixelForTick(e);
                return i && (n -= 0 === e ? (t.getPixelForTick(1) - n) / 2 : (n - t.getPixelForTick(e - 1)) / 2), n
            }
            n._set("scale", {
                display: !0,
                position: "left",
                offset: !1,
                gridLines: {
                    display: !0,
                    color: "rgba(0, 0, 0, 0.1)",
                    lineWidth: 1,
                    drawBorder: !0,
                    drawOnChartArea: !0,
                    drawTicks: !0,
                    tickMarkLength: 10,
                    zeroLineWidth: 1,
                    zeroLineColor: "rgba(0,0,0,0.25)",
                    zeroLineBorderDash: [],
                    zeroLineBorderDashOffset: 0,
                    offsetGridLines: !1,
                    borderDash: [],
                    borderDashOffset: 0
                },
                scaleLabel: {
                    display: !1,
                    labelString: "",
                    lineHeight: 1.2,
                    padding: {
                        top: 4,
                        bottom: 4
                    }
                },
                ticks: {
                    beginAtZero: !1,
                    minRotation: 0,
                    maxRotation: 50,
                    mirror: !1,
                    padding: 0,
                    reverse: !1,
                    display: !0,
                    autoSkip: !0,
                    autoSkipPadding: 0,
                    labelOffset: 0,
                    callback: o.formatters.values,
                    minor: {},
                    major: {}
                }
            }), e.exports = function (t) {
                function e(t, e, i) {
                    return r.isArray(e) ? r.longestText(t, i, e) : t.measureText(e).width
                }

                function i(t) {
                    var e = r.valueOrDefault,
                        i = n.global,
                        a = e(t.fontSize, i.defaultFontSize),
                        o = e(t.fontStyle, i.defaultFontStyle),
                        s = e(t.fontFamily, i.defaultFontFamily);
                    return {
                        size: a,
                        style: o,
                        family: s,
                        font: r.fontString(a, o, s)
                    }
                }

                function o(t) {
                    return r.options.toLineHeight(r.valueOrDefault(t.lineHeight, 1.2), r.valueOrDefault(t.fontSize, n.global.defaultFontSize))
                }
                t.Scale = a.extend({
                    getPadding: function () {
                        return {
                            left: this.paddingLeft || 0,
                            top: this.paddingTop || 0,
                            right: this.paddingRight || 0,
                            bottom: this.paddingBottom || 0
                        }
                    },
                    getTicks: function () {
                        return this._ticks
                    },
                    mergeTicksOptions: function () {
                        var t = this.options.ticks;
                        for (var e in !1 === t.minor && (t.minor = {
                                display: !1
                            }), !1 === t.major && (t.major = {
                                display: !1
                            }), t) "major" !== e && "minor" !== e && (void 0 === t.minor[e] && (t.minor[e] = t[e]), void 0 === t.major[e] && (t.major[e] = t[e]))
                    },
                    beforeUpdate: function () {
                        r.callback(this.options.beforeUpdate, [this])
                    },
                    update: function (t, e, i) {
                        var n, a, o, s, l, u, d = this;
                        for (d.beforeUpdate(), d.maxWidth = t, d.maxHeight = e, d.margins = r.extend({
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }, i), d.longestTextCache = d.longestTextCache || {}, d.beforeSetDimensions(), d.setDimensions(), d.afterSetDimensions(), d.beforeDataLimits(), d.determineDataLimits(), d.afterDataLimits(), d.beforeBuildTicks(), l = d.buildTicks() || [], d.afterBuildTicks(), d.beforeTickToLabelConversion(), o = d.convertTicksToLabels(l) || d.ticks, d.afterTickToLabelConversion(), d.ticks = o, n = 0, a = o.length; n < a; ++n) s = o[n], (u = l[n]) ? u.label = s : l.push(u = {
                            label: s,
                            major: !1
                        });
                        return d._ticks = l, d.beforeCalculateTickRotation(), d.calculateTickRotation(), d.afterCalculateTickRotation(), d.beforeFit(), d.fit(), d.afterFit(), d.afterUpdate(), d.minSize
                    },
                    afterUpdate: function () {
                        r.callback(this.options.afterUpdate, [this])
                    },
                    beforeSetDimensions: function () {
                        r.callback(this.options.beforeSetDimensions, [this])
                    },
                    setDimensions: function () {
                        var t = this;
                        t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0
                    },
                    afterSetDimensions: function () {
                        r.callback(this.options.afterSetDimensions, [this])
                    },
                    beforeDataLimits: function () {
                        r.callback(this.options.beforeDataLimits, [this])
                    },
                    determineDataLimits: r.noop,
                    afterDataLimits: function () {
                        r.callback(this.options.afterDataLimits, [this])
                    },
                    beforeBuildTicks: function () {
                        r.callback(this.options.beforeBuildTicks, [this])
                    },
                    buildTicks: r.noop,
                    afterBuildTicks: function () {
                        r.callback(this.options.afterBuildTicks, [this])
                    },
                    beforeTickToLabelConversion: function () {
                        r.callback(this.options.beforeTickToLabelConversion, [this])
                    },
                    convertTicksToLabels: function () {
                        var t = this.options.ticks;
                        this.ticks = this.ticks.map(t.userCallback || t.callback, this)
                    },
                    afterTickToLabelConversion: function () {
                        r.callback(this.options.afterTickToLabelConversion, [this])
                    },
                    beforeCalculateTickRotation: function () {
                        r.callback(this.options.beforeCalculateTickRotation, [this])
                    },
                    calculateTickRotation: function () {
                        var t = this,
                            e = t.ctx,
                            n = t.options.ticks,
                            a = s(t._ticks),
                            o = i(n);
                        e.font = o.font;
                        var l = n.minRotation || 0;
                        if (a.length && t.options.display && t.isHorizontal())
                            for (var u, d = r.longestText(e, o.font, a, t.longestTextCache), h = d, c = t.getPixelForTick(1) - t.getPixelForTick(0) - 6; h > c && l < n.maxRotation;) {
                                var f = r.toRadians(l);
                                if (u = Math.cos(f), Math.sin(f) * d > t.maxHeight) {
                                    l--;
                                    break
                                }
                                l++, h = u * d
                            }
                        t.labelRotation = l
                    },
                    afterCalculateTickRotation: function () {
                        r.callback(this.options.afterCalculateTickRotation, [this])
                    },
                    beforeFit: function () {
                        r.callback(this.options.beforeFit, [this])
                    },
                    fit: function () {
                        var t = this,
                            n = t.minSize = {
                                width: 0,
                                height: 0
                            },
                            a = s(t._ticks),
                            l = t.options,
                            u = l.ticks,
                            d = l.scaleLabel,
                            h = l.gridLines,
                            c = l.display,
                            f = t.isHorizontal(),
                            g = i(u),
                            m = l.gridLines.tickMarkLength;
                        if (n.width = f ? t.isFullWidth() ? t.maxWidth - t.margins.left - t.margins.right : t.maxWidth : c && h.drawTicks ? m : 0, n.height = f ? c && h.drawTicks ? m : 0 : t.maxHeight, d.display && c) {
                            var p = o(d) + r.options.toPadding(d.padding).height;
                            f ? n.height += p : n.width += p
                        }
                        if (u.display && c) {
                            var v = r.longestText(t.ctx, g.font, a, t.longestTextCache),
                                y = r.numberOfLabelLines(a),
                                b = .5 * g.size,
                                x = t.options.ticks.padding;
                            if (f) {
                                t.longestLabelWidth = v;
                                var _ = r.toRadians(t.labelRotation),
                                    k = Math.cos(_),
                                    w = Math.sin(_) * v + g.size * y + b * (y - 1) + b;
                                n.height = Math.min(t.maxHeight, n.height + w + x), t.ctx.font = g.font;
                                var M = e(t.ctx, a[0], g.font),
                                    S = e(t.ctx, a[a.length - 1], g.font);
                                0 !== t.labelRotation ? (t.paddingLeft = "bottom" === l.position ? k * M + 3 : k * b + 3, t.paddingRight = "bottom" === l.position ? k * b + 3 : k * S + 3) : (t.paddingLeft = M / 2 + 3, t.paddingRight = S / 2 + 3)
                            } else u.mirror ? v = 0 : v += x + b, n.width = Math.min(t.maxWidth, n.width + v), t.paddingTop = g.size / 2, t.paddingBottom = g.size / 2
                        }
                        t.handleMargins(), t.width = n.width, t.height = n.height
                    },
                    handleMargins: function () {
                        var t = this;
                        t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0), t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0), t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0))
                    },
                    afterFit: function () {
                        r.callback(this.options.afterFit, [this])
                    },
                    isHorizontal: function () {
                        return "top" === this.options.position || "bottom" === this.options.position
                    },
                    isFullWidth: function () {
                        return this.options.fullWidth
                    },
                    getRightValue: function (t) {
                        if (r.isNullOrUndef(t)) return NaN;
                        if ("number" == typeof t && !isFinite(t)) return NaN;
                        if (t)
                            if (this.isHorizontal()) {
                                if (void 0 !== t.x) return this.getRightValue(t.x)
                            } else if (void 0 !== t.y) return this.getRightValue(t.y);
                        return t
                    },
                    getLabelForIndex: r.noop,
                    getPixelForValue: r.noop,
                    getValueForPixel: r.noop,
                    getPixelForTick: function (t) {
                        var e = this,
                            i = e.options.offset;
                        if (e.isHorizontal()) {
                            var n = (e.width - (e.paddingLeft + e.paddingRight)) / Math.max(e._ticks.length - (i ? 0 : 1), 1),
                                a = n * t + e.paddingLeft;
                            i && (a += n / 2);
                            var r = e.left + Math.round(a);
                            return r += e.isFullWidth() ? e.margins.left : 0
                        }
                        var o = e.height - (e.paddingTop + e.paddingBottom);
                        return e.top + t * (o / (e._ticks.length - 1))
                    },
                    getPixelForDecimal: function (t) {
                        var e = this;
                        if (e.isHorizontal()) {
                            var i = (e.width - (e.paddingLeft + e.paddingRight)) * t + e.paddingLeft,
                                n = e.left + Math.round(i);
                            return n += e.isFullWidth() ? e.margins.left : 0
                        }
                        return e.top + t * e.height
                    },
                    getBasePixel: function () {
                        return this.getPixelForValue(this.getBaseValue())
                    },
                    getBaseValue: function () {
                        var t = this.min,
                            e = this.max;
                        return this.beginAtZero ? 0 : t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0
                    },
                    _autoSkip: function (t) {
                        var e, i, n, a, o = this,
                            s = o.isHorizontal(),
                            l = o.options.ticks.minor,
                            u = t.length,
                            d = r.toRadians(o.labelRotation),
                            h = Math.cos(d),
                            c = o.longestLabelWidth * h,
                            f = [];
                        for (l.maxTicksLimit && (a = l.maxTicksLimit), s && (e = !1, (c + l.autoSkipPadding) * u > o.width - (o.paddingLeft + o.paddingRight) && (e = 1 + Math.floor((c + l.autoSkipPadding) * u / (o.width - (o.paddingLeft + o.paddingRight)))), a && u > a && (e = Math.max(e, Math.floor(u / a)))), i = 0; i < u; i++) n = t[i], (e > 1 && i % e > 0 || i % e == 0 && i + e >= u) && i !== u - 1 && delete n.label, f.push(n);
                        return f
                    },
                    draw: function (t) {
                        var e = this,
                            a = e.options;
                        if (a.display) {
                            var s = e.ctx,
                                u = n.global,
                                d = a.ticks.minor,
                                h = a.ticks.major || d,
                                c = a.gridLines,
                                f = a.scaleLabel,
                                g = 0 !== e.labelRotation,
                                m = e.isHorizontal(),
                                p = d.autoSkip ? e._autoSkip(e.getTicks()) : e.getTicks(),
                                v = r.valueOrDefault(d.fontColor, u.defaultFontColor),
                                y = i(d),
                                b = r.valueOrDefault(h.fontColor, u.defaultFontColor),
                                x = i(h),
                                _ = c.drawTicks ? c.tickMarkLength : 0,
                                k = r.valueOrDefault(f.fontColor, u.defaultFontColor),
                                w = i(f),
                                M = r.options.toPadding(f.padding),
                                S = r.toRadians(e.labelRotation),
                                D = [],
                                C = e.options.gridLines.lineWidth,
                                P = "right" === a.position ? e.right : e.right - C - _,
                                T = "right" === a.position ? e.right + _ : e.right,
                                O = "bottom" === a.position ? e.top + C : e.bottom - _ - C,
                                I = "bottom" === a.position ? e.top + C + _ : e.bottom + C;
                            if (r.each(p, function (i, n) {
                                    if (!r.isNullOrUndef(i.label)) {
                                        var o, s, h, f, v, y, b, x, k, w, M, A, F, R, L = i.label;
                                        n === e.zeroLineIndex && a.offset === c.offsetGridLines ? (o = c.zeroLineWidth, s = c.zeroLineColor, h = c.zeroLineBorderDash, f = c.zeroLineBorderDashOffset) : (o = r.valueAtIndexOrDefault(c.lineWidth, n), s = r.valueAtIndexOrDefault(c.color, n), h = r.valueOrDefault(c.borderDash, u.borderDash), f = r.valueOrDefault(c.borderDashOffset, u.borderDashOffset));
                                        var W = "middle",
                                            Y = "middle",
                                            N = d.padding;
                                        if (m) {
                                            var z = _ + N;
                                            "bottom" === a.position ? (Y = g ? "middle" : "top", W = g ? "right" : "center", R = e.top + z) : (Y = g ? "middle" : "bottom", W = g ? "left" : "center", R = e.bottom - z);
                                            var H = l(e, n, c.offsetGridLines && p.length > 1);
                                            H < e.left && (s = "rgba(0,0,0,0)"), H += r.aliasPixel(o), F = e.getPixelForTick(n) + d.labelOffset, v = b = k = M = H, y = O, x = I, w = t.top, A = t.bottom + C
                                        } else {
                                            var V, B = "left" === a.position;
                                            d.mirror ? (W = B ? "left" : "right", V = N) : (W = B ? "right" : "left", V = _ + N), F = B ? e.right - V : e.left + V;
                                            var E = l(e, n, c.offsetGridLines && p.length > 1);
                                            E < e.top && (s = "rgba(0,0,0,0)"), E += r.aliasPixel(o), R = e.getPixelForTick(n) + d.labelOffset, v = P, b = T, k = t.left, M = t.right + C, y = x = w = A = E
                                        }
                                        D.push({
                                            tx1: v,
                                            ty1: y,
                                            tx2: b,
                                            ty2: x,
                                            x1: k,
                                            y1: w,
                                            x2: M,
                                            y2: A,
                                            labelX: F,
                                            labelY: R,
                                            glWidth: o,
                                            glColor: s,
                                            glBorderDash: h,
                                            glBorderDashOffset: f,
                                            rotation: -1 * S,
                                            label: L,
                                            major: i.major,
                                            textBaseline: Y,
                                            textAlign: W
                                        })
                                    }
                                }), r.each(D, function (t) {
                                    if (c.display && (s.save(), s.lineWidth = t.glWidth, s.strokeStyle = t.glColor, s.setLineDash && (s.setLineDash(t.glBorderDash), s.lineDashOffset = t.glBorderDashOffset), s.beginPath(), c.drawTicks && (s.moveTo(t.tx1, t.ty1), s.lineTo(t.tx2, t.ty2)), c.drawOnChartArea && (s.moveTo(t.x1, t.y1), s.lineTo(t.x2, t.y2)), s.stroke(), s.restore()), d.display) {
                                        s.save(), s.translate(t.labelX, t.labelY), s.rotate(t.rotation), s.font = t.major ? x.font : y.font, s.fillStyle = t.major ? b : v, s.textBaseline = t.textBaseline, s.textAlign = t.textAlign;
                                        var i = t.label;
                                        if (r.isArray(i))
                                            for (var n = i.length, a = 1.5 * y.size, o = e.isHorizontal() ? 0 : -a * (n - 1) / 2, l = 0; l < n; ++l) s.fillText("" + i[l], 0, o), o += a;
                                        else s.fillText(i, 0, 0);
                                        s.restore()
                                    }
                                }), f.display) {
                                var A, F, R = 0,
                                    L = o(f) / 2;
                                if (m) A = e.left + (e.right - e.left) / 2, F = "bottom" === a.position ? e.bottom - L - M.bottom : e.top + L + M.top;
                                else {
                                    var W = "left" === a.position;
                                    A = W ? e.left + L + M.top : e.right - L - M.top, F = e.top + (e.bottom - e.top) / 2, R = W ? -.5 * Math.PI : .5 * Math.PI
                                }
                                s.save(), s.translate(A, F), s.rotate(R), s.textAlign = "center", s.textBaseline = "middle", s.fillStyle = k, s.font = w.font, s.fillText(f.labelString, 0, 0), s.restore()
                            }
                            if (c.drawBorder) {
                                s.lineWidth = r.valueAtIndexOrDefault(c.lineWidth, 0), s.strokeStyle = r.valueAtIndexOrDefault(c.color, 0);
                                var Y = e.left,
                                    N = e.right + C,
                                    z = e.top,
                                    H = e.bottom + C,
                                    V = r.aliasPixel(s.lineWidth);
                                m ? (z = H = "top" === a.position ? e.bottom : e.top, z += V, H += V) : (Y = N = "left" === a.position ? e.right : e.left, Y += V, N += V), s.beginPath(), s.moveTo(Y, z), s.lineTo(N, H), s.stroke()
                            }
                        }
                    }
                })
            }
        }, {
            25: 25,
            26: 26,
            34: 34,
            45: 45
        }],
        33: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45),
                r = t(30);
            e.exports = function (t) {
                t.scaleService = {
                    constructors: {},
                    defaults: {},
                    registerScaleType: function (t, e, i) {
                        this.constructors[t] = e, this.defaults[t] = a.clone(i)
                    },
                    getScaleConstructor: function (t) {
                        return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0
                    },
                    getScaleDefaults: function (t) {
                        return this.defaults.hasOwnProperty(t) ? a.merge({}, [n.scale, this.defaults[t]]) : {}
                    },
                    updateScaleDefaults: function (t, e) {
                        this.defaults.hasOwnProperty(t) && (this.defaults[t] = a.extend(this.defaults[t], e))
                    },
                    addScalesToLayout: function (t) {
                        a.each(t.scales, function (e) {
                            e.fullWidth = e.options.fullWidth, e.position = e.options.position, e.weight = e.options.weight, r.addBox(t, e)
                        })
                    }
                }
            }
        }, {
            25: 25,
            30: 30,
            45: 45
        }],
        34: [function (t, e, i) {
            "use strict";
            var n = t(45);
            e.exports = {
                formatters: {
                    values: function (t) {
                        return n.isArray(t) ? t : "" + t
                    },
                    linear: function (t, e, i) {
                        var a = i.length > 3 ? i[2] - i[1] : i[1] - i[0];
                        Math.abs(a) > 1 && t !== Math.floor(t) && (a = t - Math.floor(t));
                        var r = n.log10(Math.abs(a)),
                            o = "";
                        if (0 !== t) {
                            var s = -1 * Math.floor(r);
                            s = Math.max(Math.min(s, 20), 0), o = t.toFixed(s)
                        } else o = "0";
                        return o
                    },
                    logarithmic: function (t, e, i) {
                        var a = t / Math.pow(10, Math.floor(n.log10(t)));
                        return 0 === t ? "0" : 1 === a || 2 === a || 5 === a || 0 === e || e === i.length - 1 ? t.toExponential() : ""
                    }
                }
            }
        }, {
            45: 45
        }],
        35: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45);
            n._set("global", {
                tooltips: {
                    enabled: !0,
                    custom: null,
                    mode: "nearest",
                    position: "average",
                    intersect: !0,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    titleFontStyle: "bold",
                    titleSpacing: 2,
                    titleMarginBottom: 6,
                    titleFontColor: "#fff",
                    titleAlign: "left",
                    bodySpacing: 2,
                    bodyFontColor: "#fff",
                    bodyAlign: "left",
                    footerFontStyle: "bold",
                    footerSpacing: 2,
                    footerMarginTop: 6,
                    footerFontColor: "#fff",
                    footerAlign: "left",
                    yPadding: 6,
                    xPadding: 6,
                    caretPadding: 2,
                    caretSize: 5,
                    cornerRadius: 6,
                    multiKeyBackground: "#fff",
                    displayColors: !0,
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    callbacks: {
                        beforeTitle: r.noop,
                        title: function (t, e) {
                            var i = "",
                                n = e.labels,
                                a = n ? n.length : 0;
                            if (t.length > 0) {
                                var r = t[0];
                                r.xLabel ? i = r.xLabel : a > 0 && r.index < a && (i = n[r.index])
                            }
                            return i
                        },
                        afterTitle: r.noop,
                        beforeBody: r.noop,
                        beforeLabel: r.noop,
                        label: function (t, e) {
                            var i = e.datasets[t.datasetIndex].label || "";
                            return i && (i += ": "), i += t.yLabel
                        },
                        labelColor: function (t, e) {
                            var i = e.getDatasetMeta(t.datasetIndex).data[t.index]._view;
                            return {
                                borderColor: i.borderColor,
                                backgroundColor: i.backgroundColor
                            }
                        },
                        labelTextColor: function () {
                            return this._options.bodyFontColor
                        },
                        afterLabel: r.noop,
                        afterBody: r.noop,
                        beforeFooter: r.noop,
                        footer: r.noop,
                        afterFooter: r.noop
                    }
                }
            }), e.exports = function (t) {
                function e(t, e) {
                    var i = r.color(t);
                    return i.alpha(e * i.alpha()).rgbaString()
                }

                function i(t, e) {
                    return e && (r.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
                }

                function o(t) {
                    var e = n.global,
                        i = r.valueOrDefault;
                    return {
                        xPadding: t.xPadding,
                        yPadding: t.yPadding,
                        xAlign: t.xAlign,
                        yAlign: t.yAlign,
                        bodyFontColor: t.bodyFontColor,
                        _bodyFontFamily: i(t.bodyFontFamily, e.defaultFontFamily),
                        _bodyFontStyle: i(t.bodyFontStyle, e.defaultFontStyle),
                        _bodyAlign: t.bodyAlign,
                        bodyFontSize: i(t.bodyFontSize, e.defaultFontSize),
                        bodySpacing: t.bodySpacing,
                        titleFontColor: t.titleFontColor,
                        _titleFontFamily: i(t.titleFontFamily, e.defaultFontFamily),
                        _titleFontStyle: i(t.titleFontStyle, e.defaultFontStyle),
                        titleFontSize: i(t.titleFontSize, e.defaultFontSize),
                        _titleAlign: t.titleAlign,
                        titleSpacing: t.titleSpacing,
                        titleMarginBottom: t.titleMarginBottom,
                        footerFontColor: t.footerFontColor,
                        _footerFontFamily: i(t.footerFontFamily, e.defaultFontFamily),
                        _footerFontStyle: i(t.footerFontStyle, e.defaultFontStyle),
                        footerFontSize: i(t.footerFontSize, e.defaultFontSize),
                        _footerAlign: t.footerAlign,
                        footerSpacing: t.footerSpacing,
                        footerMarginTop: t.footerMarginTop,
                        caretSize: t.caretSize,
                        cornerRadius: t.cornerRadius,
                        backgroundColor: t.backgroundColor,
                        opacity: 0,
                        legendColorBackground: t.multiKeyBackground,
                        displayColors: t.displayColors,
                        borderColor: t.borderColor,
                        borderWidth: t.borderWidth
                    }
                }
                t.Tooltip = a.extend({
                    initialize: function () {
                        this._model = o(this._options), this._lastActive = []
                    },
                    getTitle: function () {
                        var t = this._options.callbacks,
                            e = t.beforeTitle.apply(this, arguments),
                            n = t.title.apply(this, arguments),
                            a = t.afterTitle.apply(this, arguments),
                            r = [];
                        return r = i(r = i(r = i(r, e), n), a)
                    },
                    getBeforeBody: function () {
                        var t = this._options.callbacks.beforeBody.apply(this, arguments);
                        return r.isArray(t) ? t : void 0 !== t ? [t] : []
                    },
                    getBody: function (t, e) {
                        var n = this,
                            a = n._options.callbacks,
                            o = [];
                        return r.each(t, function (t) {
                            var r = {
                                before: [],
                                lines: [],
                                after: []
                            };
                            i(r.before, a.beforeLabel.call(n, t, e)), i(r.lines, a.label.call(n, t, e)), i(r.after, a.afterLabel.call(n, t, e)), o.push(r)
                        }), o
                    },
                    getAfterBody: function () {
                        var t = this._options.callbacks.afterBody.apply(this, arguments);
                        return r.isArray(t) ? t : void 0 !== t ? [t] : []
                    },
                    getFooter: function () {
                        var t = this._options.callbacks,
                            e = t.beforeFooter.apply(this, arguments),
                            n = t.footer.apply(this, arguments),
                            a = t.afterFooter.apply(this, arguments),
                            r = [];
                        return r = i(r = i(r = i(r, e), n), a)
                    },
                    update: function (e) {
                        var i, n, a, s, l, u, d, h, c, f, g, m, p, v, y, b, x, _, k, w, M = this,
                            S = M._options,
                            D = M._model,
                            C = M._model = o(S),
                            P = M._active,
                            T = M._data,
                            O = {
                                xAlign: D.xAlign,
                                yAlign: D.yAlign
                            },
                            I = {
                                x: D.x,
                                y: D.y
                            },
                            A = {
                                width: D.width,
                                height: D.height
                            },
                            F = {
                                x: D.caretX,
                                y: D.caretY
                            };
                        if (P.length) {
                            C.opacity = 1;
                            var R = [],
                                L = [];
                            F = t.Tooltip.positioners[S.position].call(M, P, M._eventPosition);
                            var W = [];
                            for (i = 0, n = P.length; i < n; ++i) W.push((b = P[i], x = void 0, _ = void 0, void 0, void 0, x = b._xScale, _ = b._yScale || b._scale, k = b._index, w = b._datasetIndex, {
                                xLabel: x ? x.getLabelForIndex(k, w) : "",
                                yLabel: _ ? _.getLabelForIndex(k, w) : "",
                                index: k,
                                datasetIndex: w,
                                x: b._model.x,
                                y: b._model.y
                            }));
                            S.filter && (W = W.filter(function (t) {
                                return S.filter(t, T)
                            })), S.itemSort && (W = W.sort(function (t, e) {
                                return S.itemSort(t, e, T)
                            })), r.each(W, function (t) {
                                R.push(S.callbacks.labelColor.call(M, t, M._chart)), L.push(S.callbacks.labelTextColor.call(M, t, M._chart))
                            }), C.title = M.getTitle(W, T), C.beforeBody = M.getBeforeBody(W, T), C.body = M.getBody(W, T), C.afterBody = M.getAfterBody(W, T), C.footer = M.getFooter(W, T), C.x = Math.round(F.x), C.y = Math.round(F.y), C.caretPadding = S.caretPadding, C.labelColors = R, C.labelTextColors = L, C.dataPoints = W, O = function (t, e) {
                                var i, n, a, r, o, s = t._model,
                                    l = t._chart,
                                    u = t._chart.chartArea,
                                    d = "center",
                                    h = "center";
                                s.y < e.height ? h = "top" : s.y > l.height - e.height && (h = "bottom");
                                var c = (u.left + u.right) / 2,
                                    f = (u.top + u.bottom) / 2;
                                "center" === h ? (i = function (t) {
                                    return t <= c
                                }, n = function (t) {
                                    return t > c
                                }) : (i = function (t) {
                                    return t <= e.width / 2
                                }, n = function (t) {
                                    return t >= l.width - e.width / 2
                                }), a = function (t) {
                                    return t + e.width + s.caretSize + s.caretPadding > l.width
                                }, r = function (t) {
                                    return t - e.width - s.caretSize - s.caretPadding < 0
                                }, o = function (t) {
                                    return t <= f ? "top" : "bottom"
                                }, i(s.x) ? (d = "left", a(s.x) && (d = "center", h = o(s.y))) : n(s.x) && (d = "right", r(s.x) && (d = "center", h = o(s.y)));
                                var g = t._options;
                                return {
                                    xAlign: g.xAlign ? g.xAlign : d,
                                    yAlign: g.yAlign ? g.yAlign : h
                                }
                            }(this, A = function (t, e) {
                                var i = t._chart.ctx,
                                    n = 2 * e.yPadding,
                                    a = 0,
                                    o = e.body,
                                    s = o.reduce(function (t, e) {
                                        return t + e.before.length + e.lines.length + e.after.length
                                    }, 0);
                                s += e.beforeBody.length + e.afterBody.length;
                                var l = e.title.length,
                                    u = e.footer.length,
                                    d = e.titleFontSize,
                                    h = e.bodyFontSize,
                                    c = e.footerFontSize;
                                n += l * d, n += l ? (l - 1) * e.titleSpacing : 0, n += l ? e.titleMarginBottom : 0, n += s * h, n += s ? (s - 1) * e.bodySpacing : 0, n += u ? e.footerMarginTop : 0, n += u * c, n += u ? (u - 1) * e.footerSpacing : 0;
                                var f = 0,
                                    g = function (t) {
                                        a = Math.max(a, i.measureText(t).width + f)
                                    };
                                return i.font = r.fontString(d, e._titleFontStyle, e._titleFontFamily), r.each(e.title, g), i.font = r.fontString(h, e._bodyFontStyle, e._bodyFontFamily), r.each(e.beforeBody.concat(e.afterBody), g), f = e.displayColors ? h + 2 : 0, r.each(o, function (t) {
                                    r.each(t.before, g), r.each(t.lines, g), r.each(t.after, g)
                                }), f = 0, i.font = r.fontString(c, e._footerFontStyle, e._footerFontFamily), r.each(e.footer, g), {
                                    width: a += 2 * e.xPadding,
                                    height: n
                                }
                            }(this, C)), a = C, s = A, l = O, u = M._chart, d = a.x, h = a.y, c = a.caretSize, f = a.caretPadding, g = a.cornerRadius, m = l.xAlign, p = l.yAlign, v = c + f, y = g + f, "right" === m ? d -= s.width : "center" === m && ((d -= s.width / 2) + s.width > u.width && (d = u.width - s.width), d < 0 && (d = 0)), "top" === p ? h += v : h -= "bottom" === p ? s.height + v : s.height / 2, "center" === p ? "left" === m ? d += v : "right" === m && (d -= v) : "left" === m ? d -= y : "right" === m && (d += y), I = {
                                x: d,
                                y: h
                            }
                        } else C.opacity = 0;
                        return C.xAlign = O.xAlign, C.yAlign = O.yAlign, C.x = I.x, C.y = I.y, C.width = A.width, C.height = A.height, C.caretX = F.x, C.caretY = F.y, M._model = C, e && S.custom && S.custom.call(M, C), M
                    },
                    drawCaret: function (t, e) {
                        var i = this._chart.ctx,
                            n = this._view,
                            a = this.getCaretPosition(t, e, n);
                        i.lineTo(a.x1, a.y1), i.lineTo(a.x2, a.y2), i.lineTo(a.x3, a.y3)
                    },
                    getCaretPosition: function (t, e, i) {
                        var n, a, r, o, s, l, u = i.caretSize,
                            d = i.cornerRadius,
                            h = i.xAlign,
                            c = i.yAlign,
                            f = t.x,
                            g = t.y,
                            m = e.width,
                            p = e.height;
                        if ("center" === c) s = g + p / 2, "left" === h ? (a = (n = f) - u, r = n, o = s + u, l = s - u) : (a = (n = f + m) + u, r = n, o = s - u, l = s + u);
                        else if ("left" === h ? (n = (a = f + d + u) - u, r = a + u) : "right" === h ? (n = (a = f + m - d - u) - u, r = a + u) : (n = (a = i.caretX) - u, r = a + u), "top" === c) s = (o = g) - u, l = o;
                        else {
                            s = (o = g + p) + u, l = o;
                            var v = r;
                            r = n, n = v
                        }
                        return {
                            x1: n,
                            x2: a,
                            x3: r,
                            y1: o,
                            y2: s,
                            y3: l
                        }
                    },
                    drawTitle: function (t, i, n, a) {
                        var o = i.title;
                        if (o.length) {
                            n.textAlign = i._titleAlign, n.textBaseline = "top";
                            var s, l, u = i.titleFontSize,
                                d = i.titleSpacing;
                            for (n.fillStyle = e(i.titleFontColor, a), n.font = r.fontString(u, i._titleFontStyle, i._titleFontFamily), s = 0, l = o.length; s < l; ++s) n.fillText(o[s], t.x, t.y), t.y += u + d, s + 1 === o.length && (t.y += i.titleMarginBottom - d)
                        }
                    },
                    drawBody: function (t, i, n, a) {
                        var o = i.bodyFontSize,
                            s = i.bodySpacing,
                            l = i.body;
                        n.textAlign = i._bodyAlign, n.textBaseline = "top", n.font = r.fontString(o, i._bodyFontStyle, i._bodyFontFamily);
                        var u = 0,
                            d = function (e) {
                                n.fillText(e, t.x + u, t.y), t.y += o + s
                            };
                        n.fillStyle = e(i.bodyFontColor, a), r.each(i.beforeBody, d);
                        var h = i.displayColors;
                        u = h ? o + 2 : 0, r.each(l, function (s, l) {
                            var u = e(i.labelTextColors[l], a);
                            n.fillStyle = u, r.each(s.before, d), r.each(s.lines, function (r) {
                                h && (n.fillStyle = e(i.legendColorBackground, a), n.fillRect(t.x, t.y, o, o), n.lineWidth = 1, n.strokeStyle = e(i.labelColors[l].borderColor, a), n.strokeRect(t.x, t.y, o, o), n.fillStyle = e(i.labelColors[l].backgroundColor, a), n.fillRect(t.x + 1, t.y + 1, o - 2, o - 2), n.fillStyle = u), d(r)
                            }), r.each(s.after, d)
                        }), u = 0, r.each(i.afterBody, d), t.y -= s
                    },
                    drawFooter: function (t, i, n, a) {
                        var o = i.footer;
                        o.length && (t.y += i.footerMarginTop, n.textAlign = i._footerAlign, n.textBaseline = "top", n.fillStyle = e(i.footerFontColor, a), n.font = r.fontString(i.footerFontSize, i._footerFontStyle, i._footerFontFamily), r.each(o, function (e) {
                            n.fillText(e, t.x, t.y), t.y += i.footerFontSize + i.footerSpacing
                        }))
                    },
                    drawBackground: function (t, i, n, a, r) {
                        n.fillStyle = e(i.backgroundColor, r), n.strokeStyle = e(i.borderColor, r), n.lineWidth = i.borderWidth;
                        var o = i.xAlign,
                            s = i.yAlign,
                            l = t.x,
                            u = t.y,
                            d = a.width,
                            h = a.height,
                            c = i.cornerRadius;
                        n.beginPath(), n.moveTo(l + c, u), "top" === s && this.drawCaret(t, a), n.lineTo(l + d - c, u), n.quadraticCurveTo(l + d, u, l + d, u + c), "center" === s && "right" === o && this.drawCaret(t, a), n.lineTo(l + d, u + h - c), n.quadraticCurveTo(l + d, u + h, l + d - c, u + h), "bottom" === s && this.drawCaret(t, a), n.lineTo(l + c, u + h), n.quadraticCurveTo(l, u + h, l, u + h - c), "center" === s && "left" === o && this.drawCaret(t, a), n.lineTo(l, u + c), n.quadraticCurveTo(l, u, l + c, u), n.closePath(), n.fill(), i.borderWidth > 0 && n.stroke()
                    },
                    draw: function () {
                        var t = this._chart.ctx,
                            e = this._view;
                        if (0 !== e.opacity) {
                            var i = {
                                    width: e.width,
                                    height: e.height
                                },
                                n = {
                                    x: e.x,
                                    y: e.y
                                },
                                a = Math.abs(e.opacity < .001) ? 0 : e.opacity,
                                r = e.title.length || e.beforeBody.length || e.body.length || e.afterBody.length || e.footer.length;
                            this._options.enabled && r && (this.drawBackground(n, e, t, i, a), n.x += e.xPadding, n.y += e.yPadding, this.drawTitle(n, e, t, a), this.drawBody(n, e, t, a), this.drawFooter(n, e, t, a))
                        }
                    },
                    handleEvent: function (t) {
                        var e, i = this,
                            n = i._options;
                        return i._lastActive = i._lastActive || [], "mouseout" === t.type ? i._active = [] : i._active = i._chart.getElementsAtEventForMode(t, n.mode, n), (e = !r.arrayEquals(i._active, i._lastActive)) && (i._lastActive = i._active, (n.enabled || n.custom) && (i._eventPosition = {
                            x: t.x,
                            y: t.y
                        }, i.update(!0), i.pivot())), e
                    }
                }), t.Tooltip.positioners = {
                    average: function (t) {
                        if (!t.length) return !1;
                        var e, i, n = 0,
                            a = 0,
                            r = 0;
                        for (e = 0, i = t.length; e < i; ++e) {
                            var o = t[e];
                            if (o && o.hasValue()) {
                                var s = o.tooltipPosition();
                                n += s.x, a += s.y, ++r
                            }
                        }
                        return {
                            x: Math.round(n / r),
                            y: Math.round(a / r)
                        }
                    },
                    nearest: function (t, e) {
                        var i, n, a, o = e.x,
                            s = e.y,
                            l = Number.POSITIVE_INFINITY;
                        for (i = 0, n = t.length; i < n; ++i) {
                            var u = t[i];
                            if (u && u.hasValue()) {
                                var d = u.getCenterPoint(),
                                    h = r.distanceBetweenPoints(e, d);
                                h < l && (l = h, a = u)
                            }
                        }
                        if (a) {
                            var c = a.tooltipPosition();
                            o = c.x, s = c.y
                        }
                        return {
                            x: o,
                            y: s
                        }
                    }
                }
            }
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        36: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45);
            n._set("global", {
                elements: {
                    arc: {
                        backgroundColor: n.global.defaultColor,
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                }
            }), e.exports = a.extend({
                inLabelRange: function (t) {
                    var e = this._view;
                    return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2)
                },
                inRange: function (t, e) {
                    var i = this._view;
                    if (i) {
                        for (var n = r.getAngleFromPoint(i, {
                                x: t,
                                y: e
                            }), a = n.angle, o = n.distance, s = i.startAngle, l = i.endAngle; l < s;) l += 2 * Math.PI;
                        for (; a > l;) a -= 2 * Math.PI;
                        for (; a < s;) a += 2 * Math.PI;
                        var u = a >= s && a <= l,
                            d = o >= i.innerRadius && o <= i.outerRadius;
                        return u && d
                    }
                    return !1
                },
                getCenterPoint: function () {
                    var t = this._view,
                        e = (t.startAngle + t.endAngle) / 2,
                        i = (t.innerRadius + t.outerRadius) / 2;
                    return {
                        x: t.x + Math.cos(e) * i,
                        y: t.y + Math.sin(e) * i
                    }
                },
                getArea: function () {
                    var t = this._view;
                    return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2))
                },
                tooltipPosition: function () {
                    var t = this._view,
                        e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                        i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                    return {
                        x: t.x + Math.cos(e) * i,
                        y: t.y + Math.sin(e) * i
                    }
                },
                draw: function () {
                    var t = this._chart.ctx,
                        e = this._view,
                        i = e.startAngle,
                        n = e.endAngle;
                    t.beginPath(), t.arc(e.x, e.y, e.outerRadius, i, n), t.arc(e.x, e.y, e.innerRadius, n, i, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke()
                }
            })
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        37: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = n.global;
            n._set("global", {
                elements: {
                    line: {
                        tension: .4,
                        backgroundColor: o.defaultColor,
                        borderWidth: 3,
                        borderColor: o.defaultColor,
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0,
                        borderJoinStyle: "miter",
                        capBezierPoints: !0,
                        fill: !0
                    }
                }
            }), e.exports = a.extend({
                draw: function () {
                    var t, e, i, n, a = this._view,
                        s = this._chart.ctx,
                        l = a.spanGaps,
                        u = this._children.slice(),
                        d = o.elements.line,
                        h = -1;
                    for (this._loop && u.length && u.push(u[0]), s.save(), s.lineCap = a.borderCapStyle || d.borderCapStyle, s.setLineDash && s.setLineDash(a.borderDash || d.borderDash), s.lineDashOffset = a.borderDashOffset || d.borderDashOffset, s.lineJoin = a.borderJoinStyle || d.borderJoinStyle, s.lineWidth = a.borderWidth || d.borderWidth, s.strokeStyle = a.borderColor || o.defaultColor, s.beginPath(), h = -1, t = 0; t < u.length; ++t) e = u[t], i = r.previousItem(u, t), n = e._view, 0 === t ? n.skip || (s.moveTo(n.x, n.y), h = t) : (i = -1 === h ? i : u[h], n.skip || (h !== t - 1 && !l || -1 === h ? s.moveTo(n.x, n.y) : r.canvas.lineTo(s, i._view, e._view), h = t));
                    s.stroke(), s.restore()
                }
            })
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        38: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = n.global.defaultColor;

            function s(t) {
                var e = this._view;
                return !!e && Math.abs(t - e.x) < e.radius + e.hitRadius
            }
            n._set("global", {
                elements: {
                    point: {
                        radius: 3,
                        pointStyle: "circle",
                        backgroundColor: o,
                        borderColor: o,
                        borderWidth: 1,
                        hitRadius: 1,
                        hoverRadius: 4,
                        hoverBorderWidth: 1
                    }
                }
            }), e.exports = a.extend({
                inRange: function (t, e) {
                    var i = this._view;
                    return !!i && Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) < Math.pow(i.hitRadius + i.radius, 2)
                },
                inLabelRange: s,
                inXRange: s,
                inYRange: function (t) {
                    var e = this._view;
                    return !!e && Math.abs(t - e.y) < e.radius + e.hitRadius
                },
                getCenterPoint: function () {
                    var t = this._view;
                    return {
                        x: t.x,
                        y: t.y
                    }
                },
                getArea: function () {
                    return Math.PI * Math.pow(this._view.radius, 2)
                },
                tooltipPosition: function () {
                    var t = this._view;
                    return {
                        x: t.x,
                        y: t.y,
                        padding: t.radius + t.borderWidth
                    }
                },
                draw: function (t) {
                    var e = this._view,
                        i = this._model,
                        a = this._chart.ctx,
                        s = e.pointStyle,
                        l = e.radius,
                        u = e.x,
                        d = e.y,
                        h = r.color,
                        c = 0;
                    e.skip || (a.strokeStyle = e.borderColor || o, a.lineWidth = r.valueOrDefault(e.borderWidth, n.global.elements.point.borderWidth), a.fillStyle = e.backgroundColor || o, void 0 !== t && (i.x < t.left || 1.01 * t.right < i.x || i.y < t.top || 1.01 * t.bottom < i.y) && (i.x < t.left ? c = (u - i.x) / (t.left - i.x) : 1.01 * t.right < i.x ? c = (i.x - u) / (i.x - t.right) : i.y < t.top ? c = (d - i.y) / (t.top - i.y) : 1.01 * t.bottom < i.y && (c = (i.y - d) / (i.y - t.bottom)), c = Math.round(100 * c) / 100, a.strokeStyle = h(a.strokeStyle).alpha(c).rgbString(), a.fillStyle = h(a.fillStyle).alpha(c).rgbString()), r.canvas.drawPoint(a, s, l, u, d))
                }
            })
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        39: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26);

            function r(t) {
                return void 0 !== t._view.width
            }

            function o(t) {
                var e, i, n, a, o = t._view;
                if (r(t)) {
                    var s = o.width / 2;
                    e = o.x - s, i = o.x + s, n = Math.min(o.y, o.base), a = Math.max(o.y, o.base)
                } else {
                    var l = o.height / 2;
                    e = Math.min(o.x, o.base), i = Math.max(o.x, o.base), n = o.y - l, a = o.y + l
                }
                return {
                    left: e,
                    top: n,
                    right: i,
                    bottom: a
                }
            }
            n._set("global", {
                elements: {
                    rectangle: {
                        backgroundColor: n.global.defaultColor,
                        borderColor: n.global.defaultColor,
                        borderSkipped: "bottom",
                        borderWidth: 0
                    }
                }
            }), e.exports = a.extend({
                draw: function () {
                    var t, e, i, n, a, r, o, s = this._chart.ctx,
                        l = this._view,
                        u = l.borderWidth;
                    if (l.horizontal ? (t = l.base, e = l.x, i = l.y - l.height / 2, n = l.y + l.height / 2, a = e > t ? 1 : -1, r = 1, o = l.borderSkipped || "left") : (t = l.x - l.width / 2, e = l.x + l.width / 2, i = l.y, a = 1, r = (n = l.base) > i ? 1 : -1, o = l.borderSkipped || "bottom"), u) {
                        var d = Math.min(Math.abs(t - e), Math.abs(i - n)),
                            h = (u = u > d ? d : u) / 2,
                            c = t + ("left" !== o ? h * a : 0),
                            f = e + ("right" !== o ? -h * a : 0),
                            g = i + ("top" !== o ? h * r : 0),
                            m = n + ("bottom" !== o ? -h * r : 0);
                        c !== f && (i = g, n = m), g !== m && (t = c, e = f)
                    }
                    s.beginPath(), s.fillStyle = l.backgroundColor, s.strokeStyle = l.borderColor, s.lineWidth = u;
                    var p = [
                            [t, n],
                            [t, i],
                            [e, i],
                            [e, n]
                        ],
                        v = ["bottom", "left", "top", "right"].indexOf(o, 0);

                    function y(t) {
                        return p[(v + t) % 4]
                    } - 1 === v && (v = 0);
                    var b = y(0);
                    s.moveTo(b[0], b[1]);
                    for (var x = 1; x < 4; x++) b = y(x), s.lineTo(b[0], b[1]);
                    s.fill(), u && s.stroke()
                },
                height: function () {
                    var t = this._view;
                    return t.base - t.y
                },
                inRange: function (t, e) {
                    var i = !1;
                    if (this._view) {
                        var n = o(this);
                        i = t >= n.left && t <= n.right && e >= n.top && e <= n.bottom
                    }
                    return i
                },
                inLabelRange: function (t, e) {
                    if (!this._view) return !1;
                    var i = o(this);
                    return r(this) ? t >= i.left && t <= i.right : e >= i.top && e <= i.bottom
                },
                inXRange: function (t) {
                    var e = o(this);
                    return t >= e.left && t <= e.right
                },
                inYRange: function (t) {
                    var e = o(this);
                    return t >= e.top && t <= e.bottom
                },
                getCenterPoint: function () {
                    var t, e, i = this._view;
                    return r(this) ? (t = i.x, e = (i.y + i.base) / 2) : (t = (i.x + i.base) / 2, e = i.y), {
                        x: t,
                        y: e
                    }
                },
                getArea: function () {
                    var t = this._view;
                    return t.width * Math.abs(t.y - t.base)
                },
                tooltipPosition: function () {
                    var t = this._view;
                    return {
                        x: t.x,
                        y: t.y
                    }
                }
            })
        }, {
            25: 25,
            26: 26
        }],
        40: [function (t, e, i) {
            "use strict";
            e.exports = {}, e.exports.Arc = t(36), e.exports.Line = t(37), e.exports.Point = t(38), e.exports.Rectangle = t(39)
        }, {
            36: 36,
            37: 37,
            38: 38,
            39: 39
        }],
        41: [function (t, e, i) {
            "use strict";
            var n = t(42);
            i = e.exports = {
                clear: function (t) {
                    t.ctx.clearRect(0, 0, t.width, t.height)
                },
                roundedRect: function (t, e, i, n, a, r) {
                    if (r) {
                        var o = Math.min(r, n / 2),
                            s = Math.min(r, a / 2);
                        t.moveTo(e + o, i), t.lineTo(e + n - o, i), t.quadraticCurveTo(e + n, i, e + n, i + s), t.lineTo(e + n, i + a - s), t.quadraticCurveTo(e + n, i + a, e + n - o, i + a), t.lineTo(e + o, i + a), t.quadraticCurveTo(e, i + a, e, i + a - s), t.lineTo(e, i + s), t.quadraticCurveTo(e, i, e + o, i)
                    } else t.rect(e, i, n, a)
                },
                drawPoint: function (t, e, i, n, a) {
                    var r, o, s, l, u, d;
                    if (!e || "object" != typeof e || "[object HTMLImageElement]" !== (r = e.toString()) && "[object HTMLCanvasElement]" !== r) {
                        if (!(isNaN(i) || i <= 0)) {
                            switch (e) {
                                default:
                                    t.beginPath(), t.arc(n, a, i, 0, 2 * Math.PI), t.closePath(), t.fill();
                                    break;
                                case "triangle":
                                    t.beginPath(), u = (o = 3 * i / Math.sqrt(3)) * Math.sqrt(3) / 2, t.moveTo(n - o / 2, a + u / 3), t.lineTo(n + o / 2, a + u / 3), t.lineTo(n, a - 2 * u / 3), t.closePath(), t.fill();
                                    break;
                                case "rect":
                                    d = 1 / Math.SQRT2 * i, t.beginPath(), t.fillRect(n - d, a - d, 2 * d, 2 * d), t.strokeRect(n - d, a - d, 2 * d, 2 * d);
                                    break;
                                case "rectRounded":
                                    var h = i / Math.SQRT2,
                                        c = n - h,
                                        f = a - h,
                                        g = Math.SQRT2 * i;
                                    t.beginPath(), this.roundedRect(t, c, f, g, g, i / 2), t.closePath(), t.fill();
                                    break;
                                case "rectRot":
                                    d = 1 / Math.SQRT2 * i, t.beginPath(), t.moveTo(n - d, a), t.lineTo(n, a + d), t.lineTo(n + d, a), t.lineTo(n, a - d), t.closePath(), t.fill();
                                    break;
                                case "cross":
                                    t.beginPath(), t.moveTo(n, a + i), t.lineTo(n, a - i), t.moveTo(n - i, a), t.lineTo(n + i, a), t.closePath();
                                    break;
                                case "crossRot":
                                    t.beginPath(), s = Math.cos(Math.PI / 4) * i, l = Math.sin(Math.PI / 4) * i, t.moveTo(n - s, a - l), t.lineTo(n + s, a + l), t.moveTo(n - s, a + l), t.lineTo(n + s, a - l), t.closePath();
                                    break;
                                case "star":
                                    t.beginPath(), t.moveTo(n, a + i), t.lineTo(n, a - i), t.moveTo(n - i, a), t.lineTo(n + i, a), s = Math.cos(Math.PI / 4) * i, l = Math.sin(Math.PI / 4) * i, t.moveTo(n - s, a - l), t.lineTo(n + s, a + l), t.moveTo(n - s, a + l), t.lineTo(n + s, a - l), t.closePath();
                                    break;
                                case "line":
                                    t.beginPath(), t.moveTo(n - i, a), t.lineTo(n + i, a), t.closePath();
                                    break;
                                case "dash":
                                    t.beginPath(), t.moveTo(n, a), t.lineTo(n + i, a), t.closePath()
                            }
                            t.stroke()
                        }
                    } else t.drawImage(e, n - e.width / 2, a - e.height / 2, e.width, e.height)
                },
                clipArea: function (t, e) {
                    t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip()
                },
                unclipArea: function (t) {
                    t.restore()
                },
                lineTo: function (t, e, i, n) {
                    if (i.steppedLine) return "after" === i.steppedLine && !n || "after" !== i.steppedLine && n ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y), void t.lineTo(i.x, i.y);
                    i.tension ? t.bezierCurveTo(n ? e.controlPointPreviousX : e.controlPointNextX, n ? e.controlPointPreviousY : e.controlPointNextY, n ? i.controlPointNextX : i.controlPointPreviousX, n ? i.controlPointNextY : i.controlPointPreviousY, i.x, i.y) : t.lineTo(i.x, i.y)
                }
            };
            n.clear = i.clear, n.drawRoundedRectangle = function (t) {
                t.beginPath(), i.roundedRect.apply(i, arguments), t.closePath()
            }
        }, {
            42: 42
        }],
        42: [function (t, e, i) {
            "use strict";
            var n, a = {
                noop: function () {},
                uid: (n = 0, function () {
                    return n++
                }),
                isNullOrUndef: function (t) {
                    return null == t
                },
                isArray: Array.isArray ? Array.isArray : function (t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                isObject: function (t) {
                    return null !== t && "[object Object]" === Object.prototype.toString.call(t)
                },
                valueOrDefault: function (t, e) {
                    return void 0 === t ? e : t
                },
                valueAtIndexOrDefault: function (t, e, i) {
                    return a.valueOrDefault(a.isArray(t) ? t[e] : t, i)
                },
                callback: function (t, e, i) {
                    if (t && "function" == typeof t.call) return t.apply(i, e)
                },
                each: function (t, e, i, n) {
                    var r, o, s;
                    if (a.isArray(t))
                        if (o = t.length, n)
                            for (r = o - 1; r >= 0; r--) e.call(i, t[r], r);
                        else
                            for (r = 0; r < o; r++) e.call(i, t[r], r);
                    else if (a.isObject(t))
                        for (o = (s = Object.keys(t)).length, r = 0; r < o; r++) e.call(i, t[s[r]], s[r])
                },
                arrayEquals: function (t, e) {
                    var i, n, r, o;
                    if (!t || !e || t.length !== e.length) return !1;
                    for (i = 0, n = t.length; i < n; ++i)
                        if (r = t[i], o = e[i], r instanceof Array && o instanceof Array) {
                            if (!a.arrayEquals(r, o)) return !1
                        } else if (r !== o) return !1;
                    return !0
                },
                clone: function (t) {
                    if (a.isArray(t)) return t.map(a.clone);
                    if (a.isObject(t)) {
                        for (var e = {}, i = Object.keys(t), n = i.length, r = 0; r < n; ++r) e[i[r]] = a.clone(t[i[r]]);
                        return e
                    }
                    return t
                },
                _merger: function (t, e, i, n) {
                    var r = e[t],
                        o = i[t];
                    a.isObject(r) && a.isObject(o) ? a.merge(r, o, n) : e[t] = a.clone(o)
                },
                _mergerIf: function (t, e, i) {
                    var n = e[t],
                        r = i[t];
                    a.isObject(n) && a.isObject(r) ? a.mergeIf(n, r) : e.hasOwnProperty(t) || (e[t] = a.clone(r))
                },
                merge: function (t, e, i) {
                    var n, r, o, s, l, u = a.isArray(e) ? e : [e],
                        d = u.length;
                    if (!a.isObject(t)) return t;
                    for (n = (i = i || {}).merger || a._merger, r = 0; r < d; ++r)
                        if (e = u[r], a.isObject(e))
                            for (l = 0, s = (o = Object.keys(e)).length; l < s; ++l) n(o[l], t, e, i);
                    return t
                },
                mergeIf: function (t, e) {
                    return a.merge(t, e, {
                        merger: a._mergerIf
                    })
                },
                extend: function (t) {
                    for (var e = function (e, i) {
                            t[i] = e
                        }, i = 1, n = arguments.length; i < n; ++i) a.each(arguments[i], e);
                    return t
                },
                inherits: function (t) {
                    var e = this,
                        i = t && t.hasOwnProperty("constructor") ? t.constructor : function () {
                            return e.apply(this, arguments)
                        },
                        n = function () {
                            this.constructor = i
                        };
                    return n.prototype = e.prototype, i.prototype = new n, i.extend = a.inherits, t && a.extend(i.prototype, t), i.__super__ = e.prototype, i
                }
            };
            e.exports = a, a.callCallback = a.callback, a.indexOf = function (t, e, i) {
                return Array.prototype.indexOf.call(t, e, i)
            }, a.getValueOrDefault = a.valueOrDefault, a.getValueAtIndexOrDefault = a.valueAtIndexOrDefault
        }, {}],
        43: [function (t, e, i) {
            "use strict";
            var n = t(42),
                a = {
                    linear: function (t) {
                        return t
                    },
                    easeInQuad: function (t) {
                        return t * t
                    },
                    easeOutQuad: function (t) {
                        return -t * (t - 2)
                    },
                    easeInOutQuad: function (t) {
                        return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
                    },
                    easeInCubic: function (t) {
                        return t * t * t
                    },
                    easeOutCubic: function (t) {
                        return (t -= 1) * t * t + 1
                    },
                    easeInOutCubic: function (t) {
                        return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                    },
                    easeInQuart: function (t) {
                        return t * t * t * t
                    },
                    easeOutQuart: function (t) {
                        return -((t -= 1) * t * t * t - 1)
                    },
                    easeInOutQuart: function (t) {
                        return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
                    },
                    easeInQuint: function (t) {
                        return t * t * t * t * t
                    },
                    easeOutQuint: function (t) {
                        return (t -= 1) * t * t * t * t + 1
                    },
                    easeInOutQuint: function (t) {
                        return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                    },
                    easeInSine: function (t) {
                        return 1 - Math.cos(t * (Math.PI / 2))
                    },
                    easeOutSine: function (t) {
                        return Math.sin(t * (Math.PI / 2))
                    },
                    easeInOutSine: function (t) {
                        return -.5 * (Math.cos(Math.PI * t) - 1)
                    },
                    easeInExpo: function (t) {
                        return 0 === t ? 0 : Math.pow(2, 10 * (t - 1))
                    },
                    easeOutExpo: function (t) {
                        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
                    },
                    easeInOutExpo: function (t) {
                        return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t))
                    },
                    easeInCirc: function (t) {
                        return t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)
                    },
                    easeOutCirc: function (t) {
                        return Math.sqrt(1 - (t -= 1) * t)
                    },
                    easeInOutCirc: function (t) {
                        return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                    },
                    easeInElastic: function (t) {
                        var e = 1.70158,
                            i = 0,
                            n = 1;
                        return 0 === t ? 0 : 1 === t ? 1 : (i || (i = .3), n < 1 ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i))
                    },
                    easeOutElastic: function (t) {
                        var e = 1.70158,
                            i = 0,
                            n = 1;
                        return 0 === t ? 0 : 1 === t ? 1 : (i || (i = .3), n < 1 ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / i) + 1)
                    },
                    easeInOutElastic: function (t) {
                        var e = 1.70158,
                            i = 0,
                            n = 1;
                        return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (i || (i = .45), n < 1 ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), t < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i) * -.5 : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i) * .5 + 1)
                    },
                    easeInBack: function (t) {
                        return t * t * (2.70158 * t - 1.70158)
                    },
                    easeOutBack: function (t) {
                        return (t -= 1) * t * (2.70158 * t + 1.70158) + 1
                    },
                    easeInOutBack: function (t) {
                        var e = 1.70158;
                        return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
                    },
                    easeInBounce: function (t) {
                        return 1 - a.easeOutBounce(1 - t)
                    },
                    easeOutBounce: function (t) {
                        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                    },
                    easeInOutBounce: function (t) {
                        return t < .5 ? .5 * a.easeInBounce(2 * t) : .5 * a.easeOutBounce(2 * t - 1) + .5
                    }
                };
            e.exports = {
                effects: a
            }, n.easingEffects = a
        }, {
            42: 42
        }],
        44: [function (t, e, i) {
            "use strict";
            var n = t(42);
            e.exports = {
                toLineHeight: function (t, e) {
                    var i = ("" + t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
                    if (!i || "normal" === i[1]) return 1.2 * e;
                    switch (t = +i[2], i[3]) {
                        case "px":
                            return t;
                        case "%":
                            t /= 100
                    }
                    return e * t
                },
                toPadding: function (t) {
                    var e, i, a, r;
                    return n.isObject(t) ? (e = +t.top || 0, i = +t.right || 0, a = +t.bottom || 0, r = +t.left || 0) : e = i = a = r = +t || 0, {
                        top: e,
                        right: i,
                        bottom: a,
                        left: r,
                        height: e + a,
                        width: r + i
                    }
                },
                resolve: function (t, e, i) {
                    var a, r, o;
                    for (a = 0, r = t.length; a < r; ++a)
                        if (void 0 !== (o = t[a]) && (void 0 !== e && "function" == typeof o && (o = o(e)), void 0 !== i && n.isArray(o) && (o = o[i]), void 0 !== o)) return o
                }
            }
        }, {
            42: 42
        }],
        45: [function (t, e, i) {
            "use strict";
            e.exports = t(42), e.exports.easing = t(43), e.exports.canvas = t(41), e.exports.options = t(44)
        }, {
            41: 41,
            42: 42,
            43: 43,
            44: 44
        }],
        46: [function (t, e, i) {
            e.exports = {
                acquireContext: function (t) {
                    return t && t.canvas && (t = t.canvas), t && t.getContext("2d") || null
                }
            }
        }, {}],
        47: [function (t, e, i) {
            "use strict";
            var n = t(45),
                a = "$chartjs",
                r = "chartjs-",
                o = r + "render-monitor",
                s = r + "render-animation",
                l = ["animationstart", "webkitAnimationStart"],
                u = {
                    touchstart: "mousedown",
                    touchmove: "mousemove",
                    touchend: "mouseup",
                    pointerenter: "mouseenter",
                    pointerdown: "mousedown",
                    pointermove: "mousemove",
                    pointerup: "mouseup",
                    pointerleave: "mouseout",
                    pointerout: "mouseout"
                };

            function d(t, e) {
                var i = n.getStyle(t, e),
                    a = i && i.match(/^(\d+)(\.\d+)?px$/);
                return a ? Number(a[1]) : void 0
            }
            var h = !! function () {
                var t = !1;
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: function () {
                            t = !0
                        }
                    });
                    window.addEventListener("e", null, e)
                } catch (t) {}
                return t
            }() && {
                passive: !0
            };

            function c(t, e, i) {
                t.addEventListener(e, i, h)
            }

            function f(t, e, i) {
                t.removeEventListener(e, i, h)
            }

            function g(t, e, i, n, a) {
                return {
                    type: t,
                    chart: e,
                    native: a || null,
                    x: void 0 !== i ? i : null,
                    y: void 0 !== n ? n : null
                }
            }

            function m(t, e, i) {
                var u, d, h, f, m, p, v, y, b = t[a] || (t[a] = {}),
                    x = b.resizer = function (t) {
                        var e = document.createElement("div"),
                            i = r + "size-monitor",
                            n = "position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;";
                        e.style.cssText = n, e.className = i, e.innerHTML = '<div class="' + i + '-expand" style="' + n + '"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="' + i + '-shrink" style="' + n + '"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div>';
                        var a = e.childNodes[0],
                            o = e.childNodes[1];
                        e._reset = function () {
                            a.scrollLeft = 1e6, a.scrollTop = 1e6, o.scrollLeft = 1e6, o.scrollTop = 1e6
                        };
                        var s = function () {
                            e._reset(), t()
                        };
                        return c(a, "scroll", s.bind(a, "expand")), c(o, "scroll", s.bind(o, "shrink")), e
                    }((u = function () {
                        if (b.resizer) return e(g("resize", i))
                    }, h = !1, f = [], function () {
                        f = Array.prototype.slice.call(arguments), d = d || this, h || (h = !0, n.requestAnimFrame.call(window, function () {
                            h = !1, u.apply(d, f)
                        }))
                    }));
                p = function () {
                    if (b.resizer) {
                        var e = t.parentNode;
                        e && e !== x.parentNode && e.insertBefore(x, e.firstChild), x._reset()
                    }
                }, v = (m = t)[a] || (m[a] = {}), y = v.renderProxy = function (t) {
                    t.animationName === s && p()
                }, n.each(l, function (t) {
                    c(m, t, y)
                }), v.reflow = !!m.offsetParent, m.classList.add(o)
            }

            function p(t) {
                var e, i, r, s = t[a] || {},
                    u = s.resizer;
                delete s.resizer, i = (e = t)[a] || {}, (r = i.renderProxy) && (n.each(l, function (t) {
                    f(e, t, r)
                }), delete i.renderProxy), e.classList.remove(o), u && u.parentNode && u.parentNode.removeChild(u)
            }
            e.exports = {
                _enabled: "undefined" != typeof window && "undefined" != typeof document,
                initialize: function () {
                    var t, e, i, n = "from{opacity:0.99}to{opacity:1}";
                    e = "@-webkit-keyframes " + s + "{" + n + "}@keyframes " + s + "{" + n + "}." + o + "{-webkit-animation:" + s + " 0.001s;animation:" + s + " 0.001s;}", i = (t = this)._style || document.createElement("style"), t._style || (t._style = i, e = "/* Chart.js */\n" + e, i.setAttribute("type", "text/css"), document.getElementsByTagName("head")[0].appendChild(i)), i.appendChild(document.createTextNode(e))
                },
                acquireContext: function (t, e) {
                    "string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas);
                    var i = t && t.getContext && t.getContext("2d");
                    return i && i.canvas === t ? (function (t, e) {
                        var i = t.style,
                            n = t.getAttribute("height"),
                            r = t.getAttribute("width");
                        if (t[a] = {
                                initial: {
                                    height: n,
                                    width: r,
                                    style: {
                                        display: i.display,
                                        height: i.height,
                                        width: i.width
                                    }
                                }
                            }, i.display = i.display || "block", null === r || "" === r) {
                            var o = d(t, "width");
                            void 0 !== o && (t.width = o)
                        }
                        if (null === n || "" === n)
                            if ("" === t.style.height) t.height = t.width / (e.options.aspectRatio || 2);
                            else {
                                var s = d(t, "height");
                                void 0 !== o && (t.height = s)
                            }
                    }(t, e), i) : null
                },
                releaseContext: function (t) {
                    var e = t.canvas;
                    if (e[a]) {
                        var i = e[a].initial;
                        ["height", "width"].forEach(function (t) {
                            var a = i[t];
                            n.isNullOrUndef(a) ? e.removeAttribute(t) : e.setAttribute(t, a)
                        }), n.each(i.style || {}, function (t, i) {
                            e.style[i] = t
                        }), e.width = e.width, delete e[a]
                    }
                },
                addEventListener: function (t, e, i) {
                    var r = t.canvas;
                    if ("resize" !== e) {
                        var o = i[a] || (i[a] = {});
                        c(r, e, (o.proxies || (o.proxies = {}))[t.id + "_" + e] = function (e) {
                            var a, r, o, s;
                            i((r = t, o = u[(a = e).type] || a.type, s = n.getRelativePosition(a, r), g(o, r, s.x, s.y, a)))
                        })
                    } else m(r, i, t)
                },
                removeEventListener: function (t, e, i) {
                    var n = t.canvas;
                    if ("resize" !== e) {
                        var r = ((i[a] || {}).proxies || {})[t.id + "_" + e];
                        r && f(n, e, r)
                    } else p(n)
                }
            }, n.addEvent = c, n.removeEvent = f
        }, {
            45: 45
        }],
        48: [function (t, e, i) {
            "use strict";
            var n = t(45),
                a = t(46),
                r = t(47),
                o = r._enabled ? r : a;
            e.exports = n.extend({
                initialize: function () {},
                acquireContext: function () {},
                releaseContext: function () {},
                addEventListener: function () {},
                removeEventListener: function () {}
            }, o)
        }, {
            45: 45,
            46: 46,
            47: 47
        }],
        49: [function (t, e, i) {
            "use strict";
            e.exports = {}, e.exports.filler = t(50), e.exports.legend = t(51), e.exports.title = t(52)
        }, {
            50: 50,
            51: 51,
            52: 52
        }],
        50: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("global", {
                plugins: {
                    filler: {
                        propagate: !0
                    }
                }
            });
            var o = {
                dataset: function (t) {
                    var e = t.fill,
                        i = t.chart,
                        n = i.getDatasetMeta(e),
                        a = n && i.isDatasetVisible(e) && n.dataset._children || [],
                        r = a.length || 0;
                    return r ? function (t, e) {
                        return e < r && a[e]._view || null
                    } : null
                },
                boundary: function (t) {
                    var e = t.boundary,
                        i = e ? e.x : null,
                        n = e ? e.y : null;
                    return function (t) {
                        return {
                            x: null === i ? t.x : i,
                            y: null === n ? t.y : n
                        }
                    }
                }
            };

            function s(t, e, i) {
                var n, a = t._model || {},
                    r = a.fill;
                if (void 0 === r && (r = !!a.backgroundColor), !1 === r || null === r) return !1;
                if (!0 === r) return "origin";
                if (n = parseFloat(r, 10), isFinite(n) && Math.floor(n) === n) return "-" !== r[0] && "+" !== r[0] || (n = e + n), !(n === e || n < 0 || n >= i) && n;
                switch (r) {
                    case "bottom":
                        return "start";
                    case "top":
                        return "end";
                    case "zero":
                        return "origin";
                    case "origin":
                    case "start":
                    case "end":
                        return r;
                    default:
                        return !1
                }
            }

            function l(t) {
                var e, i = t.el._model || {},
                    n = t.el._scale || {},
                    a = t.fill,
                    r = null;
                if (isFinite(a)) return null;
                if ("start" === a ? r = void 0 === i.scaleBottom ? n.bottom : i.scaleBottom : "end" === a ? r = void 0 === i.scaleTop ? n.top : i.scaleTop : void 0 !== i.scaleZero ? r = i.scaleZero : n.getBasePosition ? r = n.getBasePosition() : n.getBasePixel && (r = n.getBasePixel()), null != r) {
                    if (void 0 !== r.x && void 0 !== r.y) return r;
                    if ("number" == typeof r && isFinite(r)) return {
                        x: (e = n.isHorizontal()) ? r : null,
                        y: e ? null : r
                    }
                }
                return null
            }

            function u(t, e, i) {
                var n, a = t[e].fill,
                    r = [e];
                if (!i) return a;
                for (; !1 !== a && -1 === r.indexOf(a);) {
                    if (!isFinite(a)) return a;
                    if (!(n = t[a])) return !1;
                    if (n.visible) return a;
                    r.push(a), a = n.fill
                }
                return !1
            }

            function d(t) {
                return t && !t.skip
            }

            function h(t, e, i, n, a) {
                var o;
                if (n && a) {
                    for (t.moveTo(e[0].x, e[0].y), o = 1; o < n; ++o) r.canvas.lineTo(t, e[o - 1], e[o]);
                    for (t.lineTo(i[a - 1].x, i[a - 1].y), o = a - 1; o > 0; --o) r.canvas.lineTo(t, i[o], i[o - 1], !0)
                }
            }
            e.exports = {
                id: "filler",
                afterDatasetsUpdate: function (t, e) {
                    var i, n, r, d, h, c, f, g = (t.data.datasets || []).length,
                        m = e.propagate,
                        p = [];
                    for (n = 0; n < g; ++n) d = null, (r = (i = t.getDatasetMeta(n)).dataset) && r._model && r instanceof a.Line && (d = {
                        visible: t.isDatasetVisible(n),
                        fill: s(r, n, g),
                        chart: t,
                        el: r
                    }), i.$filler = d, p.push(d);
                    for (n = 0; n < g; ++n)(d = p[n]) && (d.fill = u(p, n, m), d.boundary = l(d), d.mapper = (void 0, f = void 0, c = (h = d).fill, f = "dataset", !1 === c ? null : (isFinite(c) || (f = "boundary"), o[f](h))))
                },
                beforeDatasetDraw: function (t, e) {
                    var i = e.meta.$filler;
                    if (i) {
                        var a = t.ctx,
                            o = i.el,
                            s = o._view,
                            l = o._children || [],
                            u = i.mapper,
                            c = s.backgroundColor || n.global.defaultColor;
                        u && c && l.length && (r.canvas.clipArea(a, t.chartArea), function (t, e, i, n, a, r) {
                            var o, s, l, u, c, f, g, m = e.length,
                                p = n.spanGaps,
                                v = [],
                                y = [],
                                b = 0,
                                x = 0;
                            for (t.beginPath(), o = 0, s = m + !!r; o < s; ++o) c = i(u = e[l = o % m]._view, l, n), f = d(u), g = d(c), f && g ? (b = v.push(u), x = y.push(c)) : b && x && (p ? (f && v.push(u), g && y.push(c)) : (h(t, v, y, b, x), b = x = 0, v = [], y = []));
                            h(t, v, y, b, x), t.closePath(), t.fillStyle = a, t.fill()
                        }(a, l, u, s, c, o._loop), r.canvas.unclipArea(a))
                    }
                }
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        51: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = t(30),
                s = r.noop;

            function l(t, e) {
                return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth
            }
            n._set("global", {
                legend: {
                    display: !0,
                    position: "top",
                    fullWidth: !0,
                    reverse: !1,
                    weight: 1e3,
                    onClick: function (t, e) {
                        var i = e.datasetIndex,
                            n = this.chart,
                            a = n.getDatasetMeta(i);
                        a.hidden = null === a.hidden ? !n.data.datasets[i].hidden : null, n.update()
                    },
                    onHover: null,
                    labels: {
                        boxWidth: 40,
                        padding: 10,
                        generateLabels: function (t) {
                            var e = t.data;
                            return r.isArray(e.datasets) ? e.datasets.map(function (e, i) {
                                return {
                                    text: e.label,
                                    fillStyle: r.isArray(e.backgroundColor) ? e.backgroundColor[0] : e.backgroundColor,
                                    hidden: !t.isDatasetVisible(i),
                                    lineCap: e.borderCapStyle,
                                    lineDash: e.borderDash,
                                    lineDashOffset: e.borderDashOffset,
                                    lineJoin: e.borderJoinStyle,
                                    lineWidth: e.borderWidth,
                                    strokeStyle: e.borderColor,
                                    pointStyle: e.pointStyle,
                                    datasetIndex: i
                                }
                            }, this) : []
                        }
                    }
                },
                legendCallback: function (t) {
                    var e = [];
                    e.push('<ul class="' + t.id + '-legend">');
                    for (var i = 0; i < t.data.datasets.length; i++) e.push('<li><span style="background-color:' + t.data.datasets[i].backgroundColor + '"></span>'), t.data.datasets[i].label && e.push(t.data.datasets[i].label), e.push("</li>");
                    return e.push("</ul>"), e.join("")
                }
            });
            var u = a.extend({
                initialize: function (t) {
                    r.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1
                },
                beforeUpdate: s,
                update: function (t, e, i) {
                    var n = this;
                    return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = e, n.margins = i, n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeBuildLabels(), n.buildLabels(), n.afterBuildLabels(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize
                },
                afterUpdate: s,
                beforeSetDimensions: s,
                setDimensions: function () {
                    var t = this;
                    t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                        width: 0,
                        height: 0
                    }
                },
                afterSetDimensions: s,
                beforeBuildLabels: s,
                buildLabels: function () {
                    var t = this,
                        e = t.options.labels || {},
                        i = r.callback(e.generateLabels, [t.chart], t) || [];
                    e.filter && (i = i.filter(function (i) {
                        return e.filter(i, t.chart.data)
                    })), t.options.reverse && i.reverse(), t.legendItems = i
                },
                afterBuildLabels: s,
                beforeFit: s,
                fit: function () {
                    var t = this,
                        e = t.options,
                        i = e.labels,
                        a = e.display,
                        o = t.ctx,
                        s = n.global,
                        u = r.valueOrDefault,
                        d = u(i.fontSize, s.defaultFontSize),
                        h = u(i.fontStyle, s.defaultFontStyle),
                        c = u(i.fontFamily, s.defaultFontFamily),
                        f = r.fontString(d, h, c),
                        g = t.legendHitBoxes = [],
                        m = t.minSize,
                        p = t.isHorizontal();
                    if (p ? (m.width = t.maxWidth, m.height = a ? 10 : 0) : (m.width = a ? 10 : 0, m.height = t.maxHeight), a)
                        if (o.font = f, p) {
                            var v = t.lineWidths = [0],
                                y = t.legendItems.length ? d + i.padding : 0;
                            o.textAlign = "left", o.textBaseline = "top", r.each(t.legendItems, function (e, n) {
                                var a = l(i, d) + d / 2 + o.measureText(e.text).width;
                                v[v.length - 1] + a + i.padding >= t.width && (y += d + i.padding, v[v.length] = t.left), g[n] = {
                                    left: 0,
                                    top: 0,
                                    width: a,
                                    height: d
                                }, v[v.length - 1] += a + i.padding
                            }), m.height += y
                        } else {
                            var b = i.padding,
                                x = t.columnWidths = [],
                                _ = i.padding,
                                k = 0,
                                w = 0,
                                M = d + b;
                            r.each(t.legendItems, function (t, e) {
                                var n = l(i, d) + d / 2 + o.measureText(t.text).width;
                                w + M > m.height && (_ += k + i.padding, x.push(k), k = 0, w = 0), k = Math.max(k, n), w += M, g[e] = {
                                    left: 0,
                                    top: 0,
                                    width: n,
                                    height: d
                                }
                            }), _ += k, x.push(k), m.width += _
                        } t.width = m.width, t.height = m.height
                },
                afterFit: s,
                isHorizontal: function () {
                    return "top" === this.options.position || "bottom" === this.options.position
                },
                draw: function () {
                    var t = this,
                        e = t.options,
                        i = e.labels,
                        a = n.global,
                        o = a.elements.line,
                        s = t.width,
                        u = t.lineWidths;
                    if (e.display) {
                        var d, h = t.ctx,
                            c = r.valueOrDefault,
                            f = c(i.fontColor, a.defaultFontColor),
                            g = c(i.fontSize, a.defaultFontSize),
                            m = c(i.fontStyle, a.defaultFontStyle),
                            p = c(i.fontFamily, a.defaultFontFamily),
                            v = r.fontString(g, m, p);
                        h.textAlign = "left", h.textBaseline = "middle", h.lineWidth = .5, h.strokeStyle = f, h.fillStyle = f, h.font = v;
                        var y = l(i, g),
                            b = t.legendHitBoxes,
                            x = t.isHorizontal();
                        d = x ? {
                            x: t.left + (s - u[0]) / 2,
                            y: t.top + i.padding,
                            line: 0
                        } : {
                            x: t.left + i.padding,
                            y: t.top + i.padding,
                            line: 0
                        };
                        var _ = g + i.padding;
                        r.each(t.legendItems, function (n, l) {
                            var f, m, p, v, k, w = h.measureText(n.text).width,
                                M = y + g / 2 + w,
                                S = d.x,
                                D = d.y;
                            x ? S + M >= s && (D = d.y += _, d.line++, S = d.x = t.left + (s - u[d.line]) / 2) : D + _ > t.bottom && (S = d.x = S + t.columnWidths[d.line] + i.padding, D = d.y = t.top + i.padding, d.line++),
                                function (t, i, n) {
                                    if (!(isNaN(y) || y <= 0)) {
                                        h.save(), h.fillStyle = c(n.fillStyle, a.defaultColor), h.lineCap = c(n.lineCap, o.borderCapStyle), h.lineDashOffset = c(n.lineDashOffset, o.borderDashOffset), h.lineJoin = c(n.lineJoin, o.borderJoinStyle), h.lineWidth = c(n.lineWidth, o.borderWidth), h.strokeStyle = c(n.strokeStyle, a.defaultColor);
                                        var s = 0 === c(n.lineWidth, o.borderWidth);
                                        if (h.setLineDash && h.setLineDash(c(n.lineDash, o.borderDash)), e.labels && e.labels.usePointStyle) {
                                            var l = g * Math.SQRT2 / 2,
                                                u = l / Math.SQRT2,
                                                d = t + u,
                                                f = i + u;
                                            r.canvas.drawPoint(h, n.pointStyle, l, d, f)
                                        } else s || h.strokeRect(t, i, y, g), h.fillRect(t, i, y, g);
                                        h.restore()
                                    }
                                }(S, D, n), b[l].left = S, b[l].top = D, f = n, m = w, v = y + (p = g / 2) + S, k = D + p, h.fillText(f.text, v, k), f.hidden && (h.beginPath(), h.lineWidth = 2, h.moveTo(v, k), h.lineTo(v + m, k), h.stroke()), x ? d.x += M + i.padding : d.y += _
                        })
                    }
                },
                handleEvent: function (t) {
                    var e = this,
                        i = e.options,
                        n = "mouseup" === t.type ? "click" : t.type,
                        a = !1;
                    if ("mousemove" === n) {
                        if (!i.onHover) return
                    } else {
                        if ("click" !== n) return;
                        if (!i.onClick) return
                    }
                    var r = t.x,
                        o = t.y;
                    if (r >= e.left && r <= e.right && o >= e.top && o <= e.bottom)
                        for (var s = e.legendHitBoxes, l = 0; l < s.length; ++l) {
                            var u = s[l];
                            if (r >= u.left && r <= u.left + u.width && o >= u.top && o <= u.top + u.height) {
                                if ("click" === n) {
                                    i.onClick.call(e, t.native, e.legendItems[l]), a = !0;
                                    break
                                }
                                if ("mousemove" === n) {
                                    i.onHover.call(e, t.native, e.legendItems[l]), a = !0;
                                    break
                                }
                            }
                        }
                    return a
                }
            });

            function d(t, e) {
                var i = new u({
                    ctx: t.ctx,
                    options: e,
                    chart: t
                });
                o.configure(t, i, e), o.addBox(t, i), t.legend = i
            }
            e.exports = {
                id: "legend",
                _element: u,
                beforeInit: function (t) {
                    var e = t.options.legend;
                    e && d(t, e)
                },
                beforeUpdate: function (t) {
                    var e = t.options.legend,
                        i = t.legend;
                    e ? (r.mergeIf(e, n.global.legend), i ? (o.configure(t, i, e), i.options = e) : d(t, e)) : i && (o.removeBox(t, i), delete t.legend)
                },
                afterEvent: function (t, e) {
                    var i = t.legend;
                    i && i.handleEvent(e)
                }
            }
        }, {
            25: 25,
            26: 26,
            30: 30,
            45: 45
        }],
        52: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = t(30),
                s = r.noop;
            n._set("global", {
                title: {
                    display: !1,
                    fontStyle: "bold",
                    fullWidth: !0,
                    lineHeight: 1.2,
                    padding: 10,
                    position: "top",
                    text: "",
                    weight: 2e3
                }
            });
            var l = a.extend({
                initialize: function (t) {
                    r.extend(this, t), this.legendHitBoxes = []
                },
                beforeUpdate: s,
                update: function (t, e, i) {
                    var n = this;
                    return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = e, n.margins = i, n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeBuildLabels(), n.buildLabels(), n.afterBuildLabels(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize
                },
                afterUpdate: s,
                beforeSetDimensions: s,
                setDimensions: function () {
                    var t = this;
                    t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                        width: 0,
                        height: 0
                    }
                },
                afterSetDimensions: s,
                beforeBuildLabels: s,
                buildLabels: s,
                afterBuildLabels: s,
                beforeFit: s,
                fit: function () {
                    var t = r.valueOrDefault,
                        e = this.options,
                        i = e.display,
                        a = t(e.fontSize, n.global.defaultFontSize),
                        o = this.minSize,
                        s = r.isArray(e.text) ? e.text.length : 1,
                        l = r.options.toLineHeight(e.lineHeight, a),
                        u = i ? s * l + 2 * e.padding : 0;
                    this.isHorizontal() ? (o.width = this.maxWidth, o.height = u) : (o.width = u, o.height = this.maxHeight), this.width = o.width, this.height = o.height
                },
                afterFit: s,
                isHorizontal: function () {
                    var t = this.options.position;
                    return "top" === t || "bottom" === t
                },
                draw: function () {
                    var t = this.ctx,
                        e = r.valueOrDefault,
                        i = this.options,
                        a = n.global;
                    if (i.display) {
                        var o, s, l, u = e(i.fontSize, a.defaultFontSize),
                            d = e(i.fontStyle, a.defaultFontStyle),
                            h = e(i.fontFamily, a.defaultFontFamily),
                            c = r.fontString(u, d, h),
                            f = r.options.toLineHeight(i.lineHeight, u),
                            g = f / 2 + i.padding,
                            m = 0,
                            p = this.top,
                            v = this.left,
                            y = this.bottom,
                            b = this.right;
                        t.fillStyle = e(i.fontColor, a.defaultFontColor), t.font = c, this.isHorizontal() ? (s = v + (b - v) / 2, l = p + g, o = b - v) : (s = "left" === i.position ? v + g : b - g, l = p + (y - p) / 2, o = y - p, m = Math.PI * ("left" === i.position ? -.5 : .5)), t.save(), t.translate(s, l), t.rotate(m), t.textAlign = "center", t.textBaseline = "middle";
                        var x = i.text;
                        if (r.isArray(x))
                            for (var _ = 0, k = 0; k < x.length; ++k) t.fillText(x[k], 0, _, o), _ += f;
                        else t.fillText(x, 0, 0, o);
                        t.restore()
                    }
                }
            });

            function u(t, e) {
                var i = new l({
                    ctx: t.ctx,
                    options: e,
                    chart: t
                });
                o.configure(t, i, e), o.addBox(t, i), t.titleBlock = i
            }
            e.exports = {
                id: "title",
                _element: l,
                beforeInit: function (t) {
                    var e = t.options.title;
                    e && u(t, e)
                },
                beforeUpdate: function (t) {
                    var e = t.options.title,
                        i = t.titleBlock;
                    e ? (r.mergeIf(e, n.global.title), i ? (o.configure(t, i, e), i.options = e) : u(t, e)) : i && (o.removeBox(t, i), delete t.titleBlock)
                }
            }
        }, {
            25: 25,
            26: 26,
            30: 30,
            45: 45
        }],
        53: [function (t, e, i) {
            "use strict";
            e.exports = function (t) {
                var e = t.Scale.extend({
                    getLabels: function () {
                        var t = this.chart.data;
                        return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels
                    },
                    determineDataLimits: function () {
                        var t, e = this,
                            i = e.getLabels();
                        e.minIndex = 0, e.maxIndex = i.length - 1, void 0 !== e.options.ticks.min && (t = i.indexOf(e.options.ticks.min), e.minIndex = -1 !== t ? t : e.minIndex), void 0 !== e.options.ticks.max && (t = i.indexOf(e.options.ticks.max), e.maxIndex = -1 !== t ? t : e.maxIndex), e.min = i[e.minIndex], e.max = i[e.maxIndex]
                    },
                    buildTicks: function () {
                        var t = this.getLabels();
                        this.ticks = 0 === this.minIndex && this.maxIndex === t.length - 1 ? t : t.slice(this.minIndex, this.maxIndex + 1)
                    },
                    getLabelForIndex: function (t, e) {
                        var i = this.chart.data,
                            n = this.isHorizontal();
                        return i.yLabels && !n ? this.getRightValue(i.datasets[e].data[t]) : this.ticks[t - this.minIndex]
                    },
                    getPixelForValue: function (t, e) {
                        var i, n = this,
                            a = n.options.offset,
                            r = Math.max(n.maxIndex + 1 - n.minIndex - (a ? 0 : 1), 1);
                        if (null != t && (i = n.isHorizontal() ? t.x : t.y), void 0 !== i || void 0 !== t && isNaN(e)) {
                            t = i || t;
                            var o = n.getLabels().indexOf(t);
                            e = -1 !== o ? o : e
                        }
                        if (n.isHorizontal()) {
                            var s = n.width / r,
                                l = s * (e - n.minIndex);
                            return a && (l += s / 2), n.left + Math.round(l)
                        }
                        var u = n.height / r,
                            d = u * (e - n.minIndex);
                        return a && (d += u / 2), n.top + Math.round(d)
                    },
                    getPixelForTick: function (t) {
                        return this.getPixelForValue(this.ticks[t], t + this.minIndex, null)
                    },
                    getValueForPixel: function (t) {
                        var e = this.options.offset,
                            i = Math.max(this._ticks.length - (e ? 0 : 1), 1),
                            n = this.isHorizontal(),
                            a = (n ? this.width : this.height) / i;
                        return t -= n ? this.left : this.top, e && (t -= a / 2), (t <= 0 ? 0 : Math.round(t / a)) + this.minIndex
                    },
                    getBasePixel: function () {
                        return this.bottom
                    }
                });
                t.scaleService.registerScaleType("category", e, {
                    position: "bottom"
                })
            }
        }, {}],
        54: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45),
                r = t(34);
            e.exports = function (t) {
                var e = {
                        position: "left",
                        ticks: {
                            callback: r.formatters.linear
                        }
                    },
                    i = t.LinearScaleBase.extend({
                        determineDataLimits: function () {
                            var t = this,
                                e = t.options,
                                i = t.chart,
                                n = i.data.datasets,
                                r = t.isHorizontal();

                            function o(e) {
                                return r ? e.xAxisID === t.id : e.yAxisID === t.id
                            }
                            t.min = null, t.max = null;
                            var s = e.stacked;
                            if (void 0 === s && a.each(n, function (t, e) {
                                    if (!s) {
                                        var n = i.getDatasetMeta(e);
                                        i.isDatasetVisible(e) && o(n) && void 0 !== n.stack && (s = !0)
                                    }
                                }), e.stacked || s) {
                                var l = {};
                                a.each(n, function (n, r) {
                                    var s = i.getDatasetMeta(r),
                                        u = [s.type, void 0 === e.stacked && void 0 === s.stack ? r : "", s.stack].join(".");
                                    void 0 === l[u] && (l[u] = {
                                        positiveValues: [],
                                        negativeValues: []
                                    });
                                    var d = l[u].positiveValues,
                                        h = l[u].negativeValues;
                                    i.isDatasetVisible(r) && o(s) && a.each(n.data, function (i, n) {
                                        var a = +t.getRightValue(i);
                                        isNaN(a) || s.data[n].hidden || (d[n] = d[n] || 0, h[n] = h[n] || 0, e.relativePoints ? d[n] = 100 : a < 0 ? h[n] += a : d[n] += a)
                                    })
                                }), a.each(l, function (e) {
                                    var i = e.positiveValues.concat(e.negativeValues),
                                        n = a.min(i),
                                        r = a.max(i);
                                    t.min = null === t.min ? n : Math.min(t.min, n), t.max = null === t.max ? r : Math.max(t.max, r)
                                })
                            } else a.each(n, function (e, n) {
                                var r = i.getDatasetMeta(n);
                                i.isDatasetVisible(n) && o(r) && a.each(e.data, function (e, i) {
                                    var n = +t.getRightValue(e);
                                    isNaN(n) || r.data[i].hidden || (null === t.min ? t.min = n : n < t.min && (t.min = n), null === t.max ? t.max = n : n > t.max && (t.max = n))
                                })
                            });
                            t.min = isFinite(t.min) && !isNaN(t.min) ? t.min : 0, t.max = isFinite(t.max) && !isNaN(t.max) ? t.max : 1, this.handleTickRangeOptions()
                        },
                        getTickLimit: function () {
                            var t, e = this.options.ticks;
                            if (this.isHorizontal()) t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.width / 50));
                            else {
                                var i = a.valueOrDefault(e.fontSize, n.global.defaultFontSize);
                                t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.height / (2 * i)))
                            }
                            return t
                        },
                        handleDirectionalChanges: function () {
                            this.isHorizontal() || this.ticks.reverse()
                        },
                        getLabelForIndex: function (t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        getPixelForValue: function (t) {
                            var e = this.start,
                                i = +this.getRightValue(t),
                                n = this.end - e;
                            return this.isHorizontal() ? this.left + this.width / n * (i - e) : this.bottom - this.height / n * (i - e)
                        },
                        getValueForPixel: function (t) {
                            var e = this.isHorizontal(),
                                i = e ? this.width : this.height,
                                n = (e ? t - this.left : this.bottom - t) / i;
                            return this.start + (this.end - this.start) * n
                        },
                        getPixelForTick: function (t) {
                            return this.getPixelForValue(this.ticksAsNumbers[t])
                        }
                    });
                t.scaleService.registerScaleType("linear", i, e)
            }
        }, {
            25: 25,
            34: 34,
            45: 45
        }],
        55: [function (t, e, i) {
            "use strict";
            var n = t(45);
            e.exports = function (t) {
                var e = n.noop;
                t.LinearScaleBase = t.Scale.extend({
                    getRightValue: function (e) {
                        return "string" == typeof e ? +e : t.Scale.prototype.getRightValue.call(this, e)
                    },
                    handleTickRangeOptions: function () {
                        var t = this,
                            e = t.options.ticks;
                        if (e.beginAtZero) {
                            var i = n.sign(t.min),
                                a = n.sign(t.max);
                            i < 0 && a < 0 ? t.max = 0 : i > 0 && a > 0 && (t.min = 0)
                        }
                        var r = void 0 !== e.min || void 0 !== e.suggestedMin,
                            o = void 0 !== e.max || void 0 !== e.suggestedMax;
                        void 0 !== e.min ? t.min = e.min : void 0 !== e.suggestedMin && (null === t.min ? t.min = e.suggestedMin : t.min = Math.min(t.min, e.suggestedMin)), void 0 !== e.max ? t.max = e.max : void 0 !== e.suggestedMax && (null === t.max ? t.max = e.suggestedMax : t.max = Math.max(t.max, e.suggestedMax)), r !== o && t.min >= t.max && (r ? t.max = t.min + 1 : t.min = t.max - 1), t.min === t.max && (t.max++, e.beginAtZero || t.min--)
                    },
                    getTickLimit: e,
                    handleDirectionalChanges: e,
                    buildTicks: function () {
                        var t = this,
                            e = t.options.ticks,
                            i = t.getTickLimit(),
                            a = {
                                maxTicks: i = Math.max(2, i),
                                min: e.min,
                                max: e.max,
                                stepSize: n.valueOrDefault(e.fixedStepSize, e.stepSize)
                            },
                            r = t.ticks = function (t, e) {
                                var i, a = [];
                                if (t.stepSize && t.stepSize > 0) i = t.stepSize;
                                else {
                                    var r = n.niceNum(e.max - e.min, !1);
                                    i = n.niceNum(r / (t.maxTicks - 1), !0)
                                }
                                var o = Math.floor(e.min / i) * i,
                                    s = Math.ceil(e.max / i) * i;
                                t.min && t.max && t.stepSize && n.almostWhole((t.max - t.min) / t.stepSize, i / 1e3) && (o = t.min, s = t.max);
                                var l = (s - o) / i;
                                l = n.almostEquals(l, Math.round(l), i / 1e3) ? Math.round(l) : Math.ceil(l);
                                var u = 1;
                                i < 1 && (u = Math.pow(10, i.toString().length - 2), o = Math.round(o * u) / u, s = Math.round(s * u) / u), a.push(void 0 !== t.min ? t.min : o);
                                for (var d = 1; d < l; ++d) a.push(Math.round((o + d * i) * u) / u);
                                return a.push(void 0 !== t.max ? t.max : s), a
                            }(a, t);
                        t.handleDirectionalChanges(), t.max = n.max(r), t.min = n.min(r), e.reverse ? (r.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max)
                    },
                    convertTicksToLabels: function () {
                        this.ticksAsNumbers = this.ticks.slice(), this.zeroLineIndex = this.ticks.indexOf(0), t.Scale.prototype.convertTicksToLabels.call(this)
                    }
                })
            }
        }, {
            45: 45
        }],
        56: [function (t, e, i) {
            "use strict";
            var n = t(45),
                a = t(34);
            e.exports = function (t) {
                var e = {
                        position: "left",
                        ticks: {
                            callback: a.formatters.logarithmic
                        }
                    },
                    i = t.Scale.extend({
                        determineDataLimits: function () {
                            var t = this,
                                e = t.options,
                                i = t.chart,
                                a = i.data.datasets,
                                r = t.isHorizontal();

                            function o(e) {
                                return r ? e.xAxisID === t.id : e.yAxisID === t.id
                            }
                            t.min = null, t.max = null, t.minNotZero = null;
                            var s = e.stacked;
                            if (void 0 === s && n.each(a, function (t, e) {
                                    if (!s) {
                                        var n = i.getDatasetMeta(e);
                                        i.isDatasetVisible(e) && o(n) && void 0 !== n.stack && (s = !0)
                                    }
                                }), e.stacked || s) {
                                var l = {};
                                n.each(a, function (a, r) {
                                    var s = i.getDatasetMeta(r),
                                        u = [s.type, void 0 === e.stacked && void 0 === s.stack ? r : "", s.stack].join(".");
                                    i.isDatasetVisible(r) && o(s) && (void 0 === l[u] && (l[u] = []), n.each(a.data, function (e, i) {
                                        var n = l[u],
                                            a = +t.getRightValue(e);
                                        isNaN(a) || s.data[i].hidden || a < 0 || (n[i] = n[i] || 0, n[i] += a)
                                    }))
                                }), n.each(l, function (e) {
                                    if (e.length > 0) {
                                        var i = n.min(e),
                                            a = n.max(e);
                                        t.min = null === t.min ? i : Math.min(t.min, i), t.max = null === t.max ? a : Math.max(t.max, a)
                                    }
                                })
                            } else n.each(a, function (e, a) {
                                var r = i.getDatasetMeta(a);
                                i.isDatasetVisible(a) && o(r) && n.each(e.data, function (e, i) {
                                    var n = +t.getRightValue(e);
                                    isNaN(n) || r.data[i].hidden || n < 0 || (null === t.min ? t.min = n : n < t.min && (t.min = n), null === t.max ? t.max = n : n > t.max && (t.max = n), 0 !== n && (null === t.minNotZero || n < t.minNotZero) && (t.minNotZero = n))
                                })
                            });
                            this.handleTickRangeOptions()
                        },
                        handleTickRangeOptions: function () {
                            var t = this,
                                e = t.options.ticks,
                                i = n.valueOrDefault;
                            t.min = i(e.min, t.min), t.max = i(e.max, t.max), t.min === t.max && (0 !== t.min && null !== t.min ? (t.min = Math.pow(10, Math.floor(n.log10(t.min)) - 1), t.max = Math.pow(10, Math.floor(n.log10(t.max)) + 1)) : (t.min = 1, t.max = 10)), null === t.min && (t.min = Math.pow(10, Math.floor(n.log10(t.max)) - 1)), null === t.max && (t.max = 0 !== t.min ? Math.pow(10, Math.floor(n.log10(t.min)) + 1) : 10), null === t.minNotZero && (t.min > 0 ? t.minNotZero = t.min : t.max < 1 ? t.minNotZero = Math.pow(10, Math.floor(n.log10(t.max))) : t.minNotZero = 1)
                        },
                        buildTicks: function () {
                            var t = this,
                                e = t.options.ticks,
                                i = !t.isHorizontal(),
                                a = {
                                    min: e.min,
                                    max: e.max
                                },
                                r = t.ticks = function (t, e) {
                                    var i, a, r = [],
                                        o = n.valueOrDefault,
                                        s = o(t.min, Math.pow(10, Math.floor(n.log10(e.min)))),
                                        l = Math.floor(n.log10(e.max)),
                                        u = Math.ceil(e.max / Math.pow(10, l));
                                    0 === s ? (i = Math.floor(n.log10(e.minNotZero)), a = Math.floor(e.minNotZero / Math.pow(10, i)), r.push(s), s = a * Math.pow(10, i)) : (i = Math.floor(n.log10(s)), a = Math.floor(s / Math.pow(10, i)));
                                    var d = i < 0 ? Math.pow(10, Math.abs(i)) : 1;
                                    do {
                                        r.push(s), 10 == ++a && (a = 1, d = ++i >= 0 ? 1 : d), s = Math.round(a * Math.pow(10, i) * d) / d
                                    } while (i < l || i === l && a < u);
                                    var h = o(t.max, s);
                                    return r.push(h), r
                                }(a, t);
                            t.max = n.max(r), t.min = n.min(r), e.reverse ? (i = !i, t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max), i && r.reverse()
                        },
                        convertTicksToLabels: function () {
                            this.tickValues = this.ticks.slice(), t.Scale.prototype.convertTicksToLabels.call(this)
                        },
                        getLabelForIndex: function (t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        getPixelForTick: function (t) {
                            return this.getPixelForValue(this.tickValues[t])
                        },
                        _getFirstTickValue: function (t) {
                            var e = Math.floor(n.log10(t));
                            return Math.floor(t / Math.pow(10, e)) * Math.pow(10, e)
                        },
                        getPixelForValue: function (e) {
                            var i, a, r, o, s, l = this,
                                u = l.options.ticks.reverse,
                                d = n.log10,
                                h = l._getFirstTickValue(l.minNotZero),
                                c = 0;
                            return e = +l.getRightValue(e), u ? (r = l.end, o = l.start, s = -1) : (r = l.start, o = l.end, s = 1), l.isHorizontal() ? (i = l.width, a = u ? l.right : l.left) : (i = l.height, s *= -1, a = u ? l.top : l.bottom), e !== r && (0 === r && (i -= c = n.getValueOrDefault(l.options.ticks.fontSize, t.defaults.global.defaultFontSize), r = h), 0 !== e && (c += i / (d(o) - d(r)) * (d(e) - d(r))), a += s * c), a
                        },
                        getValueForPixel: function (e) {
                            var i, a, r, o, s = this,
                                l = s.options.ticks.reverse,
                                u = n.log10,
                                d = s._getFirstTickValue(s.minNotZero);
                            if (l ? (a = s.end, r = s.start) : (a = s.start, r = s.end), s.isHorizontal() ? (i = s.width, o = l ? s.right - e : e - s.left) : (i = s.height, o = l ? e - s.top : s.bottom - e), o !== a) {
                                if (0 === a) {
                                    var h = n.getValueOrDefault(s.options.ticks.fontSize, t.defaults.global.defaultFontSize);
                                    o -= h, i -= h, a = d
                                }
                                o *= u(r) - u(a), o /= i, o = Math.pow(10, u(a) + o)
                            }
                            return o
                        }
                    });
                t.scaleService.registerScaleType("logarithmic", i, e)
            }
        }, {
            34: 34,
            45: 45
        }],
        57: [function (t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45),
                r = t(34);
            e.exports = function (t) {
                var e = n.global,
                    i = {
                        display: !0,
                        animate: !0,
                        position: "chartArea",
                        angleLines: {
                            display: !0,
                            color: "rgba(0, 0, 0, 0.1)",
                            lineWidth: 1
                        },
                        gridLines: {
                            circular: !1
                        },
                        ticks: {
                            showLabelBackdrop: !0,
                            backdropColor: "rgba(255,255,255,0.75)",
                            backdropPaddingY: 2,
                            backdropPaddingX: 2,
                            callback: r.formatters.linear
                        },
                        pointLabels: {
                            display: !0,
                            fontSize: 10,
                            callback: function (t) {
                                return t
                            }
                        }
                    };

                function o(t) {
                    var e = t.options;
                    return e.angleLines.display || e.pointLabels.display ? t.chart.data.labels.length : 0
                }

                function s(t) {
                    var i = t.options.pointLabels,
                        n = a.valueOrDefault(i.fontSize, e.defaultFontSize),
                        r = a.valueOrDefault(i.fontStyle, e.defaultFontStyle),
                        o = a.valueOrDefault(i.fontFamily, e.defaultFontFamily);
                    return {
                        size: n,
                        style: r,
                        family: o,
                        font: a.fontString(n, r, o)
                    }
                }

                function l(t, e, i, n, a) {
                    return t === n || t === a ? {
                        start: e - i / 2,
                        end: e + i / 2
                    } : t < n || t > a ? {
                        start: e - i - 5,
                        end: e
                    } : {
                        start: e,
                        end: e + i + 5
                    }
                }

                function u(t, e, i, n) {
                    if (a.isArray(e))
                        for (var r = i.y, o = 1.5 * n, s = 0; s < e.length; ++s) t.fillText(e[s], i.x, r), r += o;
                    else t.fillText(e, i.x, i.y)
                }

                function d(t) {
                    return a.isNumber(t) ? t : 0
                }
                var h = t.LinearScaleBase.extend({
                    setDimensions: function () {
                        var t = this,
                            i = t.options,
                            n = i.ticks;
                        t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), t.yCenter = Math.round(t.height / 2);
                        var r = a.min([t.height, t.width]),
                            o = a.valueOrDefault(n.fontSize, e.defaultFontSize);
                        t.drawingArea = i.display ? r / 2 - (o / 2 + n.backdropPaddingY) : r / 2
                    },
                    determineDataLimits: function () {
                        var t = this,
                            e = t.chart,
                            i = Number.POSITIVE_INFINITY,
                            n = Number.NEGATIVE_INFINITY;
                        a.each(e.data.datasets, function (r, o) {
                            if (e.isDatasetVisible(o)) {
                                var s = e.getDatasetMeta(o);
                                a.each(r.data, function (e, a) {
                                    var r = +t.getRightValue(e);
                                    isNaN(r) || s.data[a].hidden || (i = Math.min(r, i), n = Math.max(r, n))
                                })
                            }
                        }), t.min = i === Number.POSITIVE_INFINITY ? 0 : i, t.max = n === Number.NEGATIVE_INFINITY ? 0 : n, t.handleTickRangeOptions()
                    },
                    getTickLimit: function () {
                        var t = this.options.ticks,
                            i = a.valueOrDefault(t.fontSize, e.defaultFontSize);
                        return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * i)))
                    },
                    convertTicksToLabels: function () {
                        t.LinearScaleBase.prototype.convertTicksToLabels.call(this), this.pointLabels = this.chart.data.labels.map(this.options.pointLabels.callback, this)
                    },
                    getLabelForIndex: function (t, e) {
                        return +this.getRightValue(this.chart.data.datasets[e].data[t])
                    },
                    fit: function () {
                        var t, e;
                        this.options.pointLabels.display ? function (t) {
                            var e, i, n, r = s(t),
                                u = Math.min(t.height / 2, t.width / 2),
                                d = {
                                    r: t.width,
                                    l: 0,
                                    t: t.height,
                                    b: 0
                                },
                                h = {};
                            t.ctx.font = r.font, t._pointLabelSizes = [];
                            var c, f, g, m = o(t);
                            for (e = 0; e < m; e++) {
                                n = t.getPointPosition(e, u), c = t.ctx, f = r.size, g = t.pointLabels[e] || "", i = a.isArray(g) ? {
                                    w: a.longestText(c, c.font, g),
                                    h: g.length * f + 1.5 * (g.length - 1) * f
                                } : {
                                    w: c.measureText(g).width,
                                    h: f
                                }, t._pointLabelSizes[e] = i;
                                var p = t.getIndexAngle(e),
                                    v = a.toDegrees(p) % 360,
                                    y = l(v, n.x, i.w, 0, 180),
                                    b = l(v, n.y, i.h, 90, 270);
                                y.start < d.l && (d.l = y.start, h.l = p), y.end > d.r && (d.r = y.end, h.r = p), b.start < d.t && (d.t = b.start, h.t = p), b.end > d.b && (d.b = b.end, h.b = p)
                            }
                            t.setReductions(u, d, h)
                        }(this) : (t = this, e = Math.min(t.height / 2, t.width / 2), t.drawingArea = Math.round(e), t.setCenterPoint(0, 0, 0, 0))
                    },
                    setReductions: function (t, e, i) {
                        var n = e.l / Math.sin(i.l),
                            a = Math.max(e.r - this.width, 0) / Math.sin(i.r),
                            r = -e.t / Math.cos(i.t),
                            o = -Math.max(e.b - this.height, 0) / Math.cos(i.b);
                        n = d(n), a = d(a), r = d(r), o = d(o), this.drawingArea = Math.min(Math.round(t - (n + a) / 2), Math.round(t - (r + o) / 2)), this.setCenterPoint(n, a, r, o)
                    },
                    setCenterPoint: function (t, e, i, n) {
                        var a = this,
                            r = a.width - e - a.drawingArea,
                            o = t + a.drawingArea,
                            s = i + a.drawingArea,
                            l = a.height - n - a.drawingArea;
                        a.xCenter = Math.round((o + r) / 2 + a.left), a.yCenter = Math.round((s + l) / 2 + a.top)
                    },
                    getIndexAngle: function (t) {
                        return t * (2 * Math.PI / o(this)) + (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360
                    },
                    getDistanceFromCenterForValue: function (t) {
                        if (null === t) return 0;
                        var e = this.drawingArea / (this.max - this.min);
                        return this.options.ticks.reverse ? (this.max - t) * e : (t - this.min) * e
                    },
                    getPointPosition: function (t, e) {
                        var i = this.getIndexAngle(t) - Math.PI / 2;
                        return {
                            x: Math.round(Math.cos(i) * e) + this.xCenter,
                            y: Math.round(Math.sin(i) * e) + this.yCenter
                        }
                    },
                    getPointPositionForValue: function (t, e) {
                        return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
                    },
                    getBasePosition: function () {
                        var t = this.min,
                            e = this.max;
                        return this.getPointPositionForValue(0, this.beginAtZero ? 0 : t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0)
                    },
                    draw: function () {
                        var t = this,
                            i = t.options,
                            n = i.gridLines,
                            r = i.ticks,
                            l = a.valueOrDefault;
                        if (i.display) {
                            var d = t.ctx,
                                h = this.getIndexAngle(0),
                                c = l(r.fontSize, e.defaultFontSize),
                                f = l(r.fontStyle, e.defaultFontStyle),
                                g = l(r.fontFamily, e.defaultFontFamily),
                                m = a.fontString(c, f, g);
                            a.each(t.ticks, function (i, s) {
                                if (s > 0 || r.reverse) {
                                    var u = t.getDistanceFromCenterForValue(t.ticksAsNumbers[s]);
                                    if (n.display && 0 !== s && function (t, e, i, n) {
                                            var r = t.ctx;
                                            if (r.strokeStyle = a.valueAtIndexOrDefault(e.color, n - 1), r.lineWidth = a.valueAtIndexOrDefault(e.lineWidth, n - 1), t.options.gridLines.circular) r.beginPath(), r.arc(t.xCenter, t.yCenter, i, 0, 2 * Math.PI), r.closePath(), r.stroke();
                                            else {
                                                var s = o(t);
                                                if (0 === s) return;
                                                r.beginPath();
                                                var l = t.getPointPosition(0, i);
                                                r.moveTo(l.x, l.y);
                                                for (var u = 1; u < s; u++) l = t.getPointPosition(u, i), r.lineTo(l.x, l.y);
                                                r.closePath(), r.stroke()
                                            }
                                        }(t, n, u, s), r.display) {
                                        var f = l(r.fontColor, e.defaultFontColor);
                                        if (d.font = m, d.save(), d.translate(t.xCenter, t.yCenter), d.rotate(h), r.showLabelBackdrop) {
                                            var g = d.measureText(i).width;
                                            d.fillStyle = r.backdropColor, d.fillRect(-g / 2 - r.backdropPaddingX, -u - c / 2 - r.backdropPaddingY, g + 2 * r.backdropPaddingX, c + 2 * r.backdropPaddingY)
                                        }
                                        d.textAlign = "center", d.textBaseline = "middle", d.fillStyle = f, d.fillText(i, 0, -u), d.restore()
                                    }
                                }
                            }), (i.angleLines.display || i.pointLabels.display) && function (t) {
                                var i = t.ctx,
                                    n = t.options,
                                    r = n.angleLines,
                                    l = n.pointLabels;
                                i.lineWidth = r.lineWidth, i.strokeStyle = r.color;
                                var d, h, c, f, g = t.getDistanceFromCenterForValue(n.ticks.reverse ? t.min : t.max),
                                    m = s(t);
                                i.textBaseline = "top";
                                for (var p = o(t) - 1; p >= 0; p--) {
                                    if (r.display) {
                                        var v = t.getPointPosition(p, g);
                                        i.beginPath(), i.moveTo(t.xCenter, t.yCenter), i.lineTo(v.x, v.y), i.stroke(), i.closePath()
                                    }
                                    if (l.display) {
                                        var y = t.getPointPosition(p, g + 5),
                                            b = a.valueAtIndexOrDefault(l.fontColor, p, e.defaultFontColor);
                                        i.font = m.font, i.fillStyle = b;
                                        var x = t.getIndexAngle(p),
                                            _ = a.toDegrees(x);
                                        i.textAlign = 0 === (f = _) || 180 === f ? "center" : f < 180 ? "left" : "right", d = _, h = t._pointLabelSizes[p], c = y, 90 === d || 270 === d ? c.y -= h.h / 2 : (d > 270 || d < 90) && (c.y -= h.h), u(i, t.pointLabels[p] || "", y, m.size)
                                    }
                                }
                            }(t)
                        }
                    }
                });
                t.scaleService.registerScaleType("radialLinear", h, i)
            }
        }, {
            25: 25,
            34: 34,
            45: 45
        }],
        58: [function (t, e, i) {
            "use strict";
            var n = t(6);
            n = "function" == typeof n ? n : window.moment;
            var a = t(25),
                r = t(45),
                o = Number.MIN_SAFE_INTEGER || -9007199254740991,
                s = Number.MAX_SAFE_INTEGER || 9007199254740991,
                l = {
                    millisecond: {
                        common: !0,
                        size: 1,
                        steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
                    },
                    second: {
                        common: !0,
                        size: 1e3,
                        steps: [1, 2, 5, 10, 30]
                    },
                    minute: {
                        common: !0,
                        size: 6e4,
                        steps: [1, 2, 5, 10, 30]
                    },
                    hour: {
                        common: !0,
                        size: 36e5,
                        steps: [1, 2, 3, 6, 12]
                    },
                    day: {
                        common: !0,
                        size: 864e5,
                        steps: [1, 2, 5]
                    },
                    week: {
                        common: !1,
                        size: 6048e5,
                        steps: [1, 2, 3, 4]
                    },
                    month: {
                        common: !0,
                        size: 2628e6,
                        steps: [1, 2, 3]
                    },
                    quarter: {
                        common: !1,
                        size: 7884e6,
                        steps: [1, 2, 3, 4]
                    },
                    year: {
                        common: !0,
                        size: 3154e7
                    }
                },
                u = Object.keys(l);

            function d(t, e) {
                return t - e
            }

            function h(t) {
                var e, i, n, a = {},
                    r = [];
                for (e = 0, i = t.length; e < i; ++e) a[n = t[e]] || (a[n] = !0, r.push(n));
                return r
            }

            function c(t, e, i, n) {
                var a = function (t, e, i) {
                        for (var n, a, r, o = 0, s = t.length - 1; o >= 0 && o <= s;) {
                            if (a = t[(n = o + s >> 1) - 1] || null, r = t[n], !a) return {
                                lo: null,
                                hi: r
                            };
                            if (r[e] < i) o = n + 1;
                            else {
                                if (!(a[e] > i)) return {
                                    lo: a,
                                    hi: r
                                };
                                s = n - 1
                            }
                        }
                        return {
                            lo: r,
                            hi: null
                        }
                    }(t, e, i),
                    r = a.lo ? a.hi ? a.lo : t[t.length - 2] : t[0],
                    o = a.lo ? a.hi ? a.hi : t[t.length - 1] : t[1],
                    s = o[e] - r[e],
                    l = s ? (i - r[e]) / s : 0,
                    u = (o[n] - r[n]) * l;
                return r[n] + u
            }

            function f(t, e) {
                var i = e.parser,
                    a = e.parser || e.format;
                return "function" == typeof i ? i(t) : "string" == typeof t && "string" == typeof a ? n(t, a) : (t instanceof n || (t = n(t)), t.isValid() ? t : "function" == typeof a ? a(t) : t)
            }

            function g(t, e) {
                if (r.isNullOrUndef(t)) return null;
                var i = e.options.time,
                    n = f(e.getRightValue(t), i);
                return n.isValid() ? (i.round && n.startOf(i.round), n.valueOf()) : null
            }

            function m(t) {
                for (var e = u.indexOf(t) + 1, i = u.length; e < i; ++e)
                    if (l[u[e]].common) return u[e]
            }

            function p(t, e, i, a) {
                var o, d = a.time,
                    h = d.unit || function (t, e, i, n) {
                        var a, r, o, d = u.length;
                        for (a = u.indexOf(t); a < d - 1; ++a)
                            if (o = (r = l[u[a]]).steps ? r.steps[r.steps.length - 1] : s, r.common && Math.ceil((i - e) / (o * r.size)) <= n) return u[a];
                        return u[d - 1]
                    }(d.minUnit, t, e, i),
                    c = m(h),
                    f = r.valueOrDefault(d.stepSize, d.unitStepSize),
                    g = "week" === h && d.isoWeekday,
                    p = a.ticks.major.enabled,
                    v = l[h],
                    y = n(t),
                    b = n(e),
                    x = [];
                for (f || (f = function (t, e, i, n) {
                        var a, r, o, s = e - t,
                            u = l[i],
                            d = u.size,
                            h = u.steps;
                        if (!h) return Math.ceil(s / (n * d));
                        for (a = 0, r = h.length; a < r && (o = h[a], !(Math.ceil(s / (d * o)) <= n)); ++a);
                        return o
                    }(t, e, h, i)), g && (y = y.isoWeekday(g), b = b.isoWeekday(g)), y = y.startOf(g ? "day" : h), (b = b.startOf(g ? "day" : h)) < e && b.add(1, h), o = n(y), p && c && !g && !d.round && (o.startOf(c), o.add(~~((y - o) / (v.size * f)) * f, h)); o < b; o.add(f, h)) x.push(+o);
                return x.push(+o), x
            }
            e.exports = function (t) {
                var e = t.Scale.extend({
                    initialize: function () {
                        if (!n) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
                        this.mergeTicksOptions(), t.Scale.prototype.initialize.call(this)
                    },
                    update: function () {
                        var e = this.options;
                        return e.time && e.time.format && console.warn("options.time.format is deprecated and replaced by options.time.parser."), t.Scale.prototype.update.apply(this, arguments)
                    },
                    getRightValue: function (e) {
                        return e && void 0 !== e.t && (e = e.t), t.Scale.prototype.getRightValue.call(this, e)
                    },
                    determineDataLimits: function () {
                        var t, e, i, a, l, u, c = this,
                            f = c.chart,
                            m = c.options.time,
                            p = m.unit || "day",
                            v = s,
                            y = o,
                            b = [],
                            x = [],
                            _ = [];
                        for (t = 0, i = f.data.labels.length; t < i; ++t) _.push(g(f.data.labels[t], c));
                        for (t = 0, i = (f.data.datasets || []).length; t < i; ++t)
                            if (f.isDatasetVisible(t))
                                if (l = f.data.datasets[t].data, r.isObject(l[0]))
                                    for (x[t] = [], e = 0, a = l.length; e < a; ++e) u = g(l[e], c), b.push(u), x[t][e] = u;
                                else b.push.apply(b, _), x[t] = _.slice(0);
                        else x[t] = [];
                        _.length && (_ = h(_).sort(d), v = Math.min(v, _[0]), y = Math.max(y, _[_.length - 1])), b.length && (b = h(b).sort(d), v = Math.min(v, b[0]), y = Math.max(y, b[b.length - 1])), v = g(m.min, c) || v, y = g(m.max, c) || y, v = v === s ? +n().startOf(p) : v, y = y === o ? +n().endOf(p) + 1 : y, c.min = Math.min(v, y), c.max = Math.max(v + 1, y), c._horizontal = c.isHorizontal(), c._table = [], c._timestamps = {
                            data: b,
                            datasets: x,
                            labels: _
                        }
                    },
                    buildTicks: function () {
                        var t, e, i, a, r, o, s, d, h, v, y, b, x = this,
                            _ = x.min,
                            k = x.max,
                            w = x.options,
                            M = w.time,
                            S = [],
                            D = [];
                        switch (w.ticks.source) {
                            case "data":
                                S = x._timestamps.data;
                                break;
                            case "labels":
                                S = x._timestamps.labels;
                                break;
                            case "auto":
                            default:
                                S = p(_, k, x.getLabelCapacity(_), w)
                        }
                        for ("ticks" === w.bounds && S.length && (_ = S[0], k = S[S.length - 1]), _ = g(M.min, x) || _, k = g(M.max, x) || k, t = 0, e = S.length; t < e; ++t)(i = S[t]) >= _ && i <= k && D.push(i);
                        return x.min = _, x.max = k, x._unit = M.unit || function (t, e, i, a) {
                                var r, o, s = n.duration(n(a).diff(n(i)));
                                for (r = u.length - 1; r >= u.indexOf(e); r--)
                                    if (o = u[r], l[o].common && s.as(o) >= t.length) return o;
                                return u[e ? u.indexOf(e) : 0]
                            }(D, M.minUnit, x.min, x.max), x._majorUnit = m(x._unit), x._table = function (t, e, i, n) {
                                if ("linear" === n || !t.length) return [{
                                    time: e,
                                    pos: 0
                                }, {
                                    time: i,
                                    pos: 1
                                }];
                                var a, r, o, s, l, u = [],
                                    d = [e];
                                for (a = 0, r = t.length; a < r; ++a)(s = t[a]) > e && s < i && d.push(s);
                                for (d.push(i), a = 0, r = d.length; a < r; ++a) l = d[a + 1], o = d[a - 1], s = d[a], void 0 !== o && void 0 !== l && Math.round((l + o) / 2) === s || u.push({
                                    time: s,
                                    pos: a / (r - 1)
                                });
                                return u
                            }(x._timestamps.data, _, k, w.distribution), x._offsets = (a = x._table, r = D, o = _, s = k, y = 0, b = 0, (d = w).offset && r.length && (d.time.min || (h = r.length > 1 ? r[1] : s, v = r[0], y = (c(a, "time", h, "pos") - c(a, "time", v, "pos")) / 2), d.time.max || (h = r[r.length - 1], v = r.length > 1 ? r[r.length - 2] : o, b = (c(a, "time", h, "pos") - c(a, "time", v, "pos")) / 2)), {
                                left: y,
                                right: b
                            }), x._labelFormat = function (t, e) {
                                var i, n, a, r = t.length;
                                for (i = 0; i < r; i++) {
                                    if (0 !== (n = f(t[i], e)).millisecond()) return "MMM D, YYYY h:mm:ss.SSS a";
                                    0 === n.second() && 0 === n.minute() && 0 === n.hour() || (a = !0)
                                }
                                return a ? "MMM D, YYYY h:mm:ss a" : "MMM D, YYYY"
                            }(x._timestamps.data, M),
                            function (t, e) {
                                var i, a, r, o, s = [];
                                for (i = 0, a = t.length; i < a; ++i) r = t[i], o = !!e && r === +n(r).startOf(e), s.push({
                                    value: r,
                                    major: o
                                });
                                return s
                            }(D, x._majorUnit)
                    },
                    getLabelForIndex: function (t, e) {
                        var i = this.chart.data,
                            n = this.options.time,
                            a = i.labels && t < i.labels.length ? i.labels[t] : "",
                            o = i.datasets[e].data[t];
                        return r.isObject(o) && (a = this.getRightValue(o)), n.tooltipFormat ? f(a, n).format(n.tooltipFormat) : "string" == typeof a ? a : f(a, n).format(this._labelFormat)
                    },
                    tickFormatFunction: function (t, e, i, n) {
                        var a = this.options,
                            o = t.valueOf(),
                            s = a.time.displayFormats,
                            l = s[this._unit],
                            u = this._majorUnit,
                            d = s[u],
                            h = t.clone().startOf(u).valueOf(),
                            c = a.ticks.major,
                            f = c.enabled && u && d && o === h,
                            g = t.format(n || (f ? d : l)),
                            m = f ? c : a.ticks.minor,
                            p = r.valueOrDefault(m.callback, m.userCallback);
                        return p ? p(g, e, i) : g
                    },
                    convertTicksToLabels: function (t) {
                        var e, i, a = [];
                        for (e = 0, i = t.length; e < i; ++e) a.push(this.tickFormatFunction(n(t[e].value), e, t));
                        return a
                    },
                    getPixelForOffset: function (t) {
                        var e = this,
                            i = e._horizontal ? e.width : e.height,
                            n = e._horizontal ? e.left : e.top,
                            a = c(e._table, "time", t, "pos");
                        return n + i * (e._offsets.left + a) / (e._offsets.left + 1 + e._offsets.right)
                    },
                    getPixelForValue: function (t, e, i) {
                        var n = null;
                        if (void 0 !== e && void 0 !== i && (n = this._timestamps.datasets[i][e]), null === n && (n = g(t, this)), null !== n) return this.getPixelForOffset(n)
                    },
                    getPixelForTick: function (t) {
                        var e = this.getTicks();
                        return t >= 0 && t < e.length ? this.getPixelForOffset(e[t].value) : null
                    },
                    getValueForPixel: function (t) {
                        var e = this,
                            i = e._horizontal ? e.width : e.height,
                            a = e._horizontal ? e.left : e.top,
                            r = (i ? (t - a) / i : 0) * (e._offsets.left + 1 + e._offsets.left) - e._offsets.right,
                            o = c(e._table, "pos", r, "time");
                        return n(o)
                    },
                    getLabelWidth: function (t) {
                        var e = this.options.ticks,
                            i = this.ctx.measureText(t).width,
                            n = r.toRadians(e.maxRotation),
                            o = Math.cos(n),
                            s = Math.sin(n);
                        return i * o + r.valueOrDefault(e.fontSize, a.global.defaultFontSize) * s
                    },
                    getLabelCapacity: function (t) {
                        var e = this.options.time.displayFormats.millisecond,
                            i = this.tickFormatFunction(n(t), 0, [], e),
                            a = this.getLabelWidth(i),
                            r = this.isHorizontal() ? this.width : this.height,
                            o = Math.floor(r / a);
                        return o > 0 ? o : 1
                    }
                });
                t.scaleService.registerScaleType("time", e, {
                    position: "bottom",
                    distribution: "linear",
                    bounds: "data",
                    time: {
                        parser: !1,
                        format: !1,
                        unit: !1,
                        round: !1,
                        displayFormat: !1,
                        isoWeekday: !1,
                        minUnit: "millisecond",
                        displayFormats: {
                            millisecond: "h:mm:ss.SSS a",
                            second: "h:mm:ss a",
                            minute: "h:mm a",
                            hour: "hA",
                            day: "MMM D",
                            week: "ll",
                            month: "MMM YYYY",
                            quarter: "[Q]Q - YYYY",
                            year: "YYYY"
                        }
                    },
                    ticks: {
                        autoSkip: !1,
                        source: "auto",
                        major: {
                            enabled: !1
                        }
                    }
                })
            }
        }, {
            25: 25,
            45: 45,
            6: 6
        }]
    }, {}, [7])(7)
});