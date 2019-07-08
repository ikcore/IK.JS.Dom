(function (window, undefined) {

    var domReadyStack = [];

    function handleDOMReady(fn) {
        return document.readyState === 'complete' ? fn.call(document) : domReadyStack.push(fn);
    }

    document.addEventListener('DOMContentLoaded', function onDOMReady() {
        document.removeEventListener('DOMContentLoaded', onDOMReady);
        while (domReadyStack.length) {
            domReadyStack.shift().call(document);
        }
    });

    function Dom(selector) {

        if (!(this instanceof Dom)) {
            return new Dom(selector);
        }
        if (typeof selector === 'function') {
            return handleDOMReady(selector);
        }
        this.length = 0;
        this.nodes = [];

        if (selector instanceof HTMLElement || selector instanceof NodeList) {
            this.nodes = selector.length > 1 ? [].slice.call(selector) : [selector];
        } else if (typeof selector === 'string') {
            if (selector[0] === '<' && selector[selector.length - 1] === ">") {
                this.nodes = [createNode(selector)];
            } else {
                this.nodes = [].slice.call(document.querySelectorAll(selector));
            }
        }
        if (this.nodes.length) {
            this.length = this.nodes.length;
            for (var i = 0; i < this.nodes.length; i++) {
                this[i] = this.nodes[i];
            }
        }
    }

    function createNode(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.firstChild;
    }

    Dom.fn = Dom.prototype;

    Dom.fn.each = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback.call(this[i], this, i);
        }
        return this;
    };

    Dom.fn.addClass = function (classes) {
        return this.each(function () {
            this.className += ' ' + classes;
        });
    };

    Dom.fn.removeClass = function (className) {
        return this.each(function () {
            this.className = this.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        });
    };

    /*
    Dom.fn.hasClass = function (className) {
        return this.each(function () {
            var current = " " + this.className + " ";
            if (current.includes(" " + className + " ")) {
                return this;
            }
            return false;
        });
    };
    */

    Dom.fn.text = function (str) {
        if (str) {
            return this.each(function () {
                this.innerText = str;
            });
        }
        return this.length && this[0].innerText;
    };

    Dom.fn.submit = function () {
        if (this.length) {
            this[0].submit();
        }
    };

    Dom.fn.html = function (str) {
        if (str) {
            return this.each(function () {
                this.innerHTML = str;
            });
        }
        return this.length && this[0].innerHTML;
    };

    Dom.fn.value = function (str) {
        if (str) {
            return this.each(function () {
                this.value = str;
            });
        }
        return this.length && this[0].value;
    };

    Dom.fn.hide = function () {
        return this.each(function () {
            this.style.display = "none";
        });
    };

    Dom.fn.focus = function () {
        return this.each(function () {
            this.focus();
        });
    };

    Dom.fn.show = function () {
        return this.each(function () {
            this.style.display = "block";
        });
    };

    Dom.fn.on = function (name, handler) {
        return this.each(function () {
            this.addEventListener(name, handler, false);
        });
    };

    Dom.fn.log = function (txt) {
        console.log(txt);
    };

    window.Dom = Dom;

})(window);