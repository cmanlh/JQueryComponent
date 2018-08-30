/**
 * on
 * once
 * off
 * emit
 */
;(function () {
  // 绑定事件池
  var on_cache = {};
  // 一次性绑定事件池
  var once_cache = {};
  // 触发参数池
  var emit_cache = {};

  /**
   * @param {String} eventInfo 事件名称及命名空间 
   * @param {Function} fn 触发时的回调函数
   * 绑定事件
   */
  function _on(eventName, fn) {
    var _eventInfo = checkEventName(eventName);
    if (typeof fn !== 'function') {
      throw new Error(`jqcEvent: 方法on回调函数必须为function`);
    }
    if (!on_cache[_eventInfo[1]]) {
      on_cache[_eventInfo[1]] = {};
    }
    if (!on_cache[_eventInfo[1]][_eventInfo[0]]) {
      on_cache[_eventInfo[1]][_eventInfo[0]] = [];
    }
    on_cache[_eventInfo[1]][_eventInfo[0]].push(fn);
    run(_eventInfo);
  }
  /**
   * @param {String} eventInfo 事件名称及命名空间 
   * @param {Function} fn 触发时的回调函数
   * 一次性绑定事件
   */
  function _once(eventName, fn) {
    var _eventInfo = checkEventName(eventName);
    if (typeof fn !== 'function') {
      throw new Error(`jqcEvent: 方法once回调函数必须为function`);
    }
    if (!once_cache[_eventInfo[1]]) {
      once_cache[_eventInfo[1]] = {};
    }
    if (!once_cache[_eventInfo[1]][_eventInfo[0]]) {
      once_cache[_eventInfo[1]][_eventInfo[0]] = [];
    }
    once_cache[_eventInfo[1]][_eventInfo[0]].push(fn);
    run(_eventInfo);
  }
  /**
   * @param {String} eventName 事件名称 
   * @param {Function} fn 删除后的回调函数 
   */
  function _off(eventName, fn) {
    var _eventInfo = checkEventName(eventName);
    try {
      delete on_cache[_eventInfo[1]][_eventInfo[0]];
    } catch (err) {}
    try {
      delete once_cache[_eventInfo[1]][_eventInfo[0]];      
    } catch (error) {}
    fn && fn();
  }
  /**
   * @param {String} eventName
   * 触发事件 
   */
  function _emit(eventName) {
    var _eventInfo = checkEventName(eventName);
    var _arguments = Array.prototype.slice.call(arguments, 1);
    if (!emit_cache[_eventInfo[1]]) {
      emit_cache[_eventInfo[1]] = {};
    }
    if (!emit_cache[_eventInfo[1]][_eventInfo[0]]) {
      emit_cache[_eventInfo[1]][_eventInfo[0]] = [];
    }
    emit_cache[_eventInfo[1]][_eventInfo[0]].push(_arguments);
    run(_eventInfo);
  }
  function checkEventName(eventName) {
    if (typeof eventName !== 'string' || eventName === '') {
      throw new Error(`jqcEvent: 事件名称须为字符串且不能为''`);
    }
    var _eventInfo = eventName.split('.');
    if (_eventInfo.length > 2) {
      throw new Error(`jqcEvent: 参数eventName格式错误，参照“eventName”或者“eventName.nameSpace”。`);
    }
    if (_eventInfo.length === 1) {
      _eventInfo.push('default');
    }
    return _eventInfo;
  }
  function run(eventInfo) {
    if (!emit_cache[eventInfo[1]]) {
      return;
    }
    if (!emit_cache[eventInfo[1]][eventInfo[0]]) {
      return;
    }
    var _arguments = [].concat(emit_cache[eventInfo[1]][eventInfo[0]]);
    var canDel = false;
    if (on_cache[eventInfo[1]] && on_cache[eventInfo[1]][eventInfo[0]]) {
      canDel = true;
      _arguments.forEach(function(data) {
        on_cache[eventInfo[1]][eventInfo[0]].forEach(function (fn) {
          fn.apply(null, data);
        })
      });
    }
    if (once_cache[eventInfo[1]] && once_cache[eventInfo[1]][eventInfo[0]]) {
      canDel = true;
      var _tempOnce = [].concat(once_cache[eventInfo[1]][eventInfo[0]]);
      delete once_cache[eventInfo[1]][eventInfo[0]];
      _arguments.forEach(function(data) {
        _tempOnce.forEach(function (fn) {
          fn.apply(null, data);
        })
      });
    }
    if (canDel) {
      delete emit_cache[eventInfo[1]][eventInfo[0]];
    }
  }
  var Event = {
    on: _on,
    once: _once,
    emit: _emit,
    off: _off
  };
  window.jqcEvent = Event;
  typeof jQuery == 'function' && (jQuery.jqcEvent = Event)
})();