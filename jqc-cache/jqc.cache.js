/**
 * client site cache component
 * 
 * Dependent on
 *  + jqc.dateUtil.js
 */
(function ($) {
    const ExistCache = new Map();
    const DEFAULT_OPTIONS = {
        name: null, // cache name, has to be unique in the same domain
        init: {
            immediate: false, // setup the cache immediatelly
            data: null, // object array to initial cache
            url: null, // if not provide object array as above, fetch data through url
            param: null, // parameter for querying data
            parseFun: null // parse function to fetch data from request result
        },
        localstorage: {
            delay: 1000, // data be pushed to local database in delay time
            expiryTime: false, // data is or not expiry in data, if it will be expiry, how long will be valid
            refreshUrl: null, // when a data is expiry, refresh data through refreshUrl
            parseFun: null, // parse function to fetch data from request result
            primaryKey: null, // primary key for data
            enable: false // enable local storage
        }
    };

    const CACHE_BUILD_DEFAULT_OPTIONS = {
        key: null, // 'string' or function
        patch: {
            enable: false,
            url: null, // patch new data into cache through url
            parseFun: null, // parse function to fetch data from request result
            param: null // param to fetch data
        }
    };

    const DB_NAME = 'jqcCacheDatabase';
    const DB_DATA_EXPIRY_TIMESTAMP = '__expiryTimestamp__';

    $.jqcCache = function (options) {
        this.options = $.extend(true, DEFAULT_OPTIONS, options);
        this.data = [];
        this.initialled = false;

        if ($.trim(this.options.name).length == 0) {
            throw new Error("cache name cann't be null");
        }
        if (ExistCache.has(this.options.name)) {
            return ExistCache.get(this.options.name);
        } else {
            ExistCache.set(this.options.name, 0);
        }

        if (this.options.init.immediate) {
            init(this);
        }
    };

    $.jqcCache.prototype.build = function (options, callback) {
        var _options = $.extend(true, CACHE_BUILD_DEFAULT_OPTIONS, options, {
            context: this
        });

        var keySetting = null;
        if (typeof (_options.key) == 'string') {
            keySetting = function (data, cache, key) {
                for (var i in data) {
                    var item = data[i];
                    cache.set(item[key], item);
                }
            };
        } else {
            keySetting = function (data, cache, key) {
                for (var i in data) {
                    var item = data[i];
                    cache.set(key(item), item);
                }
            };
        }
        var cache = new CacheMap(_options);
        if (this.isInitialled) {
            keySetting(this.data, cache, _options.key);

            return cache;
        } else {
            init(this, function (data) {
                keySetting(data, cache, _options.key);
                callback();
            });
        }
    };

    $.jqcCache.prototype.isInitialled = function () {
        return this.initialled;
    };

    $.jqcCache.prototype.queryAll = function (callback) {
        if (this.isInitialled()) {
            if (callback) {
                callback(this.data);
            }
            return this.data;
        } else {
            init(this, callback);
        }
    };

    function init(context, callback) {
        var data = context.options.init.data;
        if ($.isArray(data)) {
            context.data = data;
            context.initialled = true;
            if (callback) {
                callback(context.data);
            }
            return;
        }

        if (context.options.localstorage.enable) {
            var req = indexedDB.open(DB_NAME);
            req.onsuccess = function (event) {
                var db = event.target.result;
                if (db.objectStoreNames.contains(context.options.name)) {
                    var dataReq = db.transaction(context.options.name, 'readonly').objectStore(context.options.name).getAll();
                    dataReq.onsuccess = function (event) {
                        var data = event.target.result;
                        if (data.length > 0) {
                            context.data = data;
                            context.initialled = true;

                            if (callback) {
                                callback(context.data);
                            }

                            refreshLocalstorage(context);
                        } else {
                            initCacheWithRemoteData(context, callback);
                        }
                    };
                } else {
                    initCacheWithRemoteData(context, callback);
                }
            };
        } else {
            initCacheWithRemoteData(context, callback);
        }
    }

    function CacheMap(options) {
        this.map = new Map();
        this.options = options;
    }

    CacheMap.prototype.get = function (key) {
        if ($.trim(key).length == 0) {
            return null;
        }

        var _this = this;
        if (_this.map.has(key)) {
            return _this.map.get(key);
        } else {
            if (_this.options.patch.enable) {
                var data = null;
                $.ajax({
                    url: _this.options.patch.url,
                    method: 'GET',
                    data: _this.options.patch.param(key),
                    async: false,
                    success: function (resp) {
                        if (_this.options.patch.parseFun) {
                            data = _this.options.patch.parseFun(resp);
                        } else {
                            data = resp;
                        }
                        var context = _this.options.context;
                        context.data.push(data);
                        _this.map.set(key, data);

                        if (context.options.localstorage.enable) {
                            setTimeout(function () {
                                updateStore(context.options.name, context.options.localstorage.primaryKey, data);
                            }, context.options.localstorage.delay);
                        }
                    }
                });
                return data;
            } else {
                return null;
            }
        }
    };

    CacheMap.prototype.set = function (key, val) {
        this.map.set(key, val);
    };

    /**
     * after initialled, update the expiried item
     */
    function refreshLocalstorage(context) {
        if (!context.localstorage.expiryTime || !context.localstorage.refreshUrl) {
            return;
        }
        var data = context.data;
        var need2BeRefreshed = [];
        for (var i in data) {
            var item = data[i];
            var expiryTime = item[DB_DATA_EXPIRY_TIMESTAMP];
            if (expiryTime && expiryTime > Date.now()) {
                continue;
            } else {
                var param = {};
                param[context.localstorage.primaryKey] = item[context.localstorage.primaryKey];
                $.ajax({
                    url: context.localstorage.refreshUrl,
                    method: 'GET',
                    data: param,
                    async: false,
                    success: function (resp) {
                        if (context.localstorage.parseFun) {
                            need2BeRefreshed.push(context.localstorage.parseFun(resp));
                        } else {
                            need2BeRefreshed.push(resp);
                        }
                    }
                });
            }
        }
        updateStore(context.options.name, context.localstorage.primaryKey, need2BeRefreshed);
    }

    function initCacheWithRemoteData(context, callback) {
        if ($.trim(context.options.init.url).length > 0) {
            var ajaxOptions = {
                url: context.options.init.url,
                method: 'GET',
                async: false,
                success: function (resp) {
                    if (context.options.init.parseFun) {
                        context.data = context.options.init.parseFun(resp);
                    } else {
                        context.data = resp;
                    }

                    context.initialled = true;
                    if (callback) {
                        callback(context.data);
                    }

                    if (context.options.localstorage.enable) {
                        setTimeout(function () {
                            updateStore(context.options.name, context.options.localstorage.primaryKey, context.data);
                        }, context.options.localstorage.delay);
                    }
                }
            };
            if (context.options.init.param) {
                ajaxOptions = $.extend(true, ajaxOptions, {
                    data: context.init.param
                });
            }
            $.ajax(ajaxOptions);
        } else {
            return;
        }
    }

    function updateStore(name, primaryKey, data, expiryTime) {
        var req = indexedDB.open(DB_NAME);
        req.onsuccess = function (event) {
            var db = event.target.result;
            if (db.objectStoreNames.contains(name)) {
                pushDataToDB(db, name, data, expiryTime);
            } else {
                var version = db.version;
                db.close();
                req = indexedDB.open(DB_NAME, parseInt(version) + 1);
                req.onupgradeneeded = function (event) {
                    db = event.target.result;
                    var objectStore = db.createObjectStore(name, {
                        keyPath: primaryKey
                    });
                    objectStore.transaction.oncomplete = function (event) {
                        pushDataToDB(db, name, data, expiryTime);
                    };
                };
            }
        };
    }

    function pushDataToDB(db, name, data, expiryTime) {
        var newExpiryTimestamp = 0;
        if (typeof (expiryTime) == 'string') {
            newExpiryTimestamp = $.jqcDateUtil.plus(new Date(), expiryTime, true);
        }

        var transaction = db.transaction(name, 'readwrite');
        if ($.isArray(data)) {
            var objectStore = transaction.objectStore(name);
            if (newExpiryTimestamp > 0) {
                for (var i in data) {
                    var _data = data[i];
                    _data[DB_DATA_EXPIRY_TIMESTAMP] = newExpiryTimestamp;
                    objectStore.add(_data);
                }
            } else {
                for (var i in data) {
                    objectStore.add(data[i]);
                }
            }
        } else {
            if (newExpiryTimestamp > 0) {
                data[DB_DATA_EXPIRY_TIMESTAMP] = newExpiryTimestamp;
            }
            transaction.objectStore(name).add(data);
        }
    }
}(jQuery));