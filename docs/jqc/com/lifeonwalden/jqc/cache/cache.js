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
 * client site cache component
 *
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['dateUtil']).execute(function () {
        const ExistCache = new Map();
        const DEFAULT_OPTIONS = {
            name: null, // cache name, has to be unique in the same domain
            init: {
                immediate: false, // setup the cache immediatelly
                data: null, // object array to initial cache
                url: null, // if not provide object array as above, fetch data through url
                param: null, // parameter for querying data
                parseFun: null, // parse function to fetch data from request result,
                replaceWithNew: false // clear the previous localstorage cache, replace it with new one
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
            key: null, // 'string' or function,
            notNeedFullRemoteData: true, // if need full remote data, the cache should be initialled with remote data
            patch: {
                enable: false,
                url: null, // patch new data into cache through url
                parseFun: null, // parse function to fetch data from request result
                param: null // param to fetch data
            }
        };

        const DB_NAME = 'jqcCacheDatabase';
        const DB_DATA_EXPIRY_TIMESTAMP = '__expiryTimestamp__';
        const CACHE_NOT_INITIALLED = 0;
        const CACHE_INITIALLED = 1;
        const CACHE_VIRTUL_INITIALLED = 2;

        $.jqcCache = function (options) {
            this.options = $.extend(true, {}, DEFAULT_OPTIONS, options);
            this.data = [];
            this.cacheStatus = CACHE_NOT_INITIALLED;

            if ($.trim(this.options.name).length == 0) {
                throw new Error("cache name cann't be null");
            }
            if (ExistCache.has(this.options.name)) {
                return ExistCache.get(this.options.name);
            } else {
                ExistCache.set(this.options.name, 0);
            }

            if (this.options.init.immediate) {
                init(this, null, null, this.options.init.replaceWithNew);
            }
        };

        $.jqcCache.prototype.build = function (options, callback) {
            var _options = $.extend(true, {}, CACHE_BUILD_DEFAULT_OPTIONS, options, {
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
            if (this.isInitialled()) {
                keySetting(this.data, cache, _options.key);

                return cache;
            } else {
                if (callback) {
                    init(this, function (data) {
                        keySetting(data, cache, _options.key);
                        if (callback) {
                            callback();
                        }
                    }, _options.notNeedFullRemoteData, this.options.init.replaceWithNew);
                } else {
                    init(this, null, _options.notNeedFullRemoteData, this.options.init.replaceWithNew);
                    return cache;
                }
            }
        };

        $.jqcCache.prototype.isInitialled = function () {
            return this.cacheStatus === CACHE_INITIALLED;
        };

        $.jqcCache.prototype.queryAll = function (callback) {
            if (this.isInitialled()) {
                if (callback) {
                    callback(this.data);
                }
                return this.data;
            } else {
                if (null == callback || undefined == callback) {
                    throw new Error('has to provide call back function');
                }

                init(this, callback, false, this.options.init.replaceWithNew);
            }
        };

        $.jqcCache.prototype.refreshDB = function (callback) {
            init(this, callback, false, true);
        };

        function init(context, callback, notNeedFullRemoteData, replaceWithNew) {
            var data = context.options.init.data;
            if ($.isArray(data)) {
                context.data = data;
                context.cacheStatus = CACHE_INITIALLED;
                if (callback) {
                    callback(context.data);
                }
                return;
            }

            if (context.options.localstorage.enable && !replaceWithNew) {
                var req = indexedDB.open(DB_NAME);
                req.onsuccess = function (event) {
                    var db = event.target.result;
                    if (db.objectStoreNames.contains(context.options.name)) {
                        var dataReq = db.transaction(context.options.name, 'readonly').objectStore(context.options.name).getAll();
                        dataReq.onsuccess = function (event) {
                            var data = event.target.result;
                            if (data.length > 0) {
                                context.data = data;
                                context.cacheStatus = CACHE_INITIALLED;

                                if (callback) {
                                    callback(context.data);
                                }

                                refreshLocalstorage(context);
                            } else {
                                initCacheWithRemoteData(context, callback, notNeedFullRemoteData);
                            }
                        };
                    } else {
                        initCacheWithRemoteData(context, callback, notNeedFullRemoteData);
                    }
                };
            } else {
                initCacheWithRemoteData(context, callback, notNeedFullRemoteData);
            }
        }

        function CacheMap(options) {
            this.map = new Map();
            this.options = options;
        }

        CacheMap.prototype.get = function (key, callback) {
            if ($.trim(key).length == 0) {
                if (callback) {
                    callback(null);
                    return;
                }

                return null;
            }

            var _this = this;
            if (_this.map.has(key)) {
                if (callback) {
                    callback(_this.map.get(key));
                    return;
                }
                return _this.map.get(key);
            } else {
                var context = _this.options.context;
                if (callback) {
                    getFromDB(context.name, key, function (result) {
                        if (result) {
                            context.data.push(result);
                            _this.map.set(key, result);
                            callback(result);
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
                                        context.data.push(data);
                                        _this.map.set(key, data);

                                        if (context.options.localstorage.enable && context.cacheStatus === CACHE_INITIALLED) {
                                            setTimeout(function () {
                                                updateStore(context.options.name, context.options.localstorage.primaryKey, data);
                                            }, context.options.localstorage.delay);
                                        }
                                    }
                                });
                                callback(data);
                            } else {
                                callback(null);
                            }
                        }
                    });
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
                                context.data.push(data);
                                _this.map.set(key, data);

                                if (context.options.localstorage.enable && context.cacheStatus === CACHE_INITIALLED) {
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
            }
        };

        CacheMap.prototype.set = function (key, val) {
            this.map.set(key, val);
        };

        /**
         * after initialled, update the expiried item
         */
        function refreshLocalstorage(context) {
            if (!context.options.localstorage.expiryTime || !context.options.localstorage.refreshUrl) {
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
                    param[context.options.localstorage.primaryKey] = item[context.options.localstorage.primaryKey];
                    $.ajax({
                        url: context.options.localstorage.refreshUrl,
                        method: 'GET',
                        data: param,
                        async: false,
                        success: function (resp) {
                            if (context.options.localstorage.parseFun) {
                                var newItem = context.options.localstorage.parseFun(resp);
                                if (newItem) {
                                    need2BeRefreshed.push(newItem);
                                }
                            } else {
                                if (resp) {
                                    need2BeRefreshed.push(resp);
                                }
                            }
                        }
                    });
                }
            }
            updateStore(context.options.name, context.options.localstorage.primaryKey, need2BeRefreshed);
        }

        function initCacheWithRemoteData(context, callback, notNeedFullRemoteData) {
            if (notNeedFullRemoteData) {
                context.cacheStatus = CACHE_VIRTUL_INITIALLED;
                context.data = [];
                if (callback) {
                    callback(context.data);
                }
                return;
            }
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

                        context.cacheStatus = CACHE_INITIALLED;
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

        function updateStore(name, primaryKey, records, expiryTime) {
            var req = indexedDB.open(DB_NAME);
            req.onsuccess = function (event) {
                var db = event.target.result;
                if (db.objectStoreNames.contains(name)) {
                    pushDataToDB(db, name, records, expiryTime);
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
                            pushDataToDB(db, name, records, expiryTime);
                        };
                    };
                }
            };
        }

        function getFromDB(name, key, callback) {
            var req = indexedDB.open(DB_NAME);
            req.onsuccess = function (event) {
                var db = event.target.result;
                if (db.objectStoreNames.contains(name)) {
                    db.transaction(name).objectStore(name).get(key).onsuccess = function (readEvent) {
                        callback(readEvent.target.result);
                    };
                } else {
                    callback(null);
                }
            }

            req.onerror = function (event) {
                callback(null);
            }
        }

        function pushDataToDB(db, name, records, expiryTime) {
            var newExpiryTimestamp = 0;
            if (typeof (expiryTime) == 'string') {
                newExpiryTimestamp = $.jqcDateUtil.plus(new Date(), expiryTime, true);
            }

            var transaction = db.transaction(name, 'readwrite');
            if ($.isArray(records)) {
                var objectStore = transaction.objectStore(name);
                if (newExpiryTimestamp > 0) {
                    for (var i in records) {
                        var record = records[i];
                        record[DB_DATA_EXPIRY_TIMESTAMP] = newExpiryTimestamp;
                        objectStore.put(record);
                    }
                } else {
                    for (var i in records) {
                        objectStore.put(records[i]);
                    }
                }
            } else {
                if (newExpiryTimestamp > 0) {
                    records[DB_DATA_EXPIRY_TIMESTAMP] = newExpiryTimestamp;
                }
                if (records) {
                    transaction.objectStore(name).put(records);
                }
            }
        }
    });
}(jQuery));