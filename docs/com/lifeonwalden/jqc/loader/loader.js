/*
   Copyright 2017 cmanlh

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
/**
 * module loader
 */
(function (global) {
    function isEmpty(str) {
        if (null === str || undefined === str || 'string' !== typeof (str) || str.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    const DOT_SEARCH_PATTERN = /\./g;

    function Module(name, baseURL) {
        this.name = name;
        this.baseURL = baseURL;
        this.componentMap = new Map();

        if (isEmpty(this.name)) {
            throw new Error('Module name is required.');
        }

        if (isEmpty(this.baseURL)) {
            throw new Error('Module base url is required.');
        }

        return this;
    }

    Module.prototype.getName = function () {
        return this.name;
    };

    Module.prototype.getURL = function () {
        var modulePath = this.name.replace(DOT_SEARCH_PATTERN, '/').concat('/');
        if (this.baseURL.lastIndexOf('/') == this.baseURL.length - 1) {
            return this.baseURL.concat(modulePath);
        } else {
            return this.baseURL.concat('/').concat(modulePath);
        }
    };

    Module.prototype.registerComponent = function (name, version) {
        var cmp = new Component({
            name: name,
            version: version,
            module: this
        });
        this.componentMap.set(cmp.getName(), cmp);

        return this;
    };

    Module.prototype.getComponent = function (name) {
        return this.componentMap.get(name);
    };

    function Component(param) {
        this.name = param.name;
        this.version = param.version;
        this.module = param.module;
        this.loaded = false;

        if (isEmpty(this.name)) {
            throw new Error('Component name is required.');
        }

        if (this.name.indexOf('.js') != -1) {
            throw new Error('Component name must exclude file suffix name [.js].');
        }

        if (null === this.module || undefined == this.module) {
            throw new Error('Module for component is required.')
        }

        return this;
    }

    Component.prototype.getName = function () {
        return this.name;
    };

    Component.prototype.getURL = function () {
        if (isEmpty(this.version)) {
            return this.module.getURL().concat(this.name).concat('/');
        } else {
            return this.module.getURL().concat(this.name).concat('/').concat(this.version).concat('/');
        }
    };

    Component.prototype.toLoaded = function () {
        this.loaded = true;
    };

    Component.prototype.getLoaded = function () {
        return this.loaded;
    };

    const TYPE_JS = 1,
        TYPE_CSS = 2,
        TYPE_FUN = 3,
        TYPE_CMP = 4;

    function Loader() {
        this.moduleMap = new Map();
        this.cmpStack = [];
        this.jsStack = [];
        this.cssStack = [];
        this.resources = [];
    }

    Loader.prototype.registerModule = function (m) {
        this.moduleMap.set(m.getName(), m);
    };

    Loader.prototype.importScript = function (url) {
        this.jsStack.unshift({
            url: url,
            type: TYPE_JS
        });

        return this;
    };

    Loader.prototype.importCss = function (url) {
        this.cssStack.unshift({
            url: url,
            type: TYPE_CSS
        });

        return this;
    };

    Loader.prototype.importComponents = function (moduleName, components) {
        var module = this.moduleMap.get(moduleName);
        if (!module) {
            throw new Error('Module ['.concat(moduleName).concat(']').concat('is not registered'));
        }

        for (var i in components) {
            var cmpName = components[i];
            var cmp = module.getComponent(cmpName);
            if (!cmp) {
                throw new Error('Component ['.concat(cmpName).concat(']').concat('is not registered'));
            }

            if (cmp.getLoaded()) {
                continue;
            }

            this.cmpStack.unshift({
                url: cmp.getURL().concat(cmpName).concat('.js'),
                type: TYPE_CMP,
                cmp: cmp
            });
        }

        return this;
    };

    Loader.prototype.getCmpParentURL = function (moduleName, componentName) {
        var module = this.moduleMap.get(moduleName);
        if (!module) {
            throw new Error('Module ['.concat(moduleName).concat(']').concat('is not registered'));
        }

        var cmp = module.getComponent(componentName);
        if (!cmp) {
            throw new Error('Component ['.concat(componentName).concat(']').concat('is not registered'));
        }

        return cmp.getURL();
    };

    Loader.prototype.execute = function (fun, param) {
        if (fun) {
            this.resources.unshift({
                fun: fun,
                type: TYPE_FUN,
                param: param
            });
        }
        for (var js = this.jsStack.shift(); js; js = this.jsStack.shift()) {
            this.resources.unshift(js);
        }
        for (var css = this.cssStack.shift(); css; css = this.cssStack.shift()) {
            this.resources.unshift(css);
        }
        for (var cmp = this.cmpStack.shift(); cmp; cmp = this.cmpStack.shift()) {
            this.resources.unshift(cmp);
        }

        loadResource(this.resources);
    };

    function loadResource(resources) {
        var resource = resources.shift();
        if (resource) {
            if (TYPE_JS == resource.type || TYPE_CMP == resource.type) {
                var script = document.createElement("script");
                script.src = resource.url;
                script.type = "text/javascript";
                var fun = function () {
                    script.removeEventListener('load', fun);
                    if (TYPE_CMP == resource.type) {
                        resource.cmp.toLoaded();
                    }
                    loadResource(resources);
                };
                script.addEventListener('load', fun);
                document.getElementsByTagName('head')[0].appendChild(script);
            } else if (TYPE_CSS == resource.type) {
                var css = document.createElement("link");
                css.href = resource.url;
                css.rel = 'stylesheet';
                css.type = "text/css";
                var fun = function () {
                    css.removeEventListener('load', fun);
                    loadResource(resources);
                };
                css.addEventListener('load', fun);
                document.getElementsByTagName('head')[0].appendChild(css);
            } else {
                resource.fun(resource.param);
            }
        }
    }

    var jqcLoader = new Loader();
    jqcLoader.newModule = function (name, baseURL) {
        return new Module(name, baseURL);
    };

    global.$JqcLoader = jqcLoader;
}(this));