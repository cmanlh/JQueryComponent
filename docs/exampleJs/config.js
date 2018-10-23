$JqcLoader.importScript('js/run_prettify.js')
    .importScript('js/version.js').importScript('js/keycode.js')
    .importCss('css/component.css').importCss('css/prettify.css').importCss('css/highlight.css').executeNow();

$JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', 'jqc/')
    .registerComponents(['baseElement', 'blocker', 'cache', 'dateUtil', 'dialog', 'draggable', 'format', 'inputNumber', 'lang'])
    .registerComponents(['loader', 'location', 'pinyin', 'resizeable', 'selectbox', 'slide', 'uniqueKey', 'slide', 'uniqueKey'])
    .registerComponents(['valHooks', 'zindex'])
    .registerComponents(['toolkit'])
    .registerComponents(['menu'])
    .registerComponents(['contextmenu'])
    .registerComponents(['loading'])
    .registerComponents(['formToolBar'])
    .registerComponents(['apisBox'])
    .registerComponents(['notification'])
    .registerComponents(['menuTree'])
    .registerComponents(['confirm'])
    .registerComponents(['bpmn'])
    .registerComponents(['msg']));
