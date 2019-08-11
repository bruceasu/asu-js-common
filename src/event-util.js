import _customEvent from "./custom-event";
export const $customEvent = _customEvent;

function addEvent(el, type, fn) {
  if( el.length) {
    Array.prototype.forEach.call(el, e=> addHandler(e, type, fn));
  } else {
    addHandler(el, type, fn);
  }
}

function handle(e) {
  //获取event对象
  //标准DOM方法事件处理函数第一个参数是event对象
  //IE可以使用全局变量window.event
  var evt = window.event ? window.event : e;

  //获取触发事件的原始事件源
  //标准DOM方法是用target获取当前事件源
  //IE使用evt.srcElement获取事件源
  var target = evt.target || evt.srcElement;

  //获取当前正在处理的事件源
  //标准DOM方法是用currentTarget获取当前事件源
  //IE中的this指向当前处理的事件源
  var currentTarget = e ? e.currentTarget : this;

  //在IE 9下  window.event 与 e 不同 evt没有currentTarget属性,e才有currentTarg
  //alert("src id===" + target.id + "\n\ncurent target id==" + currentTarget.id);
  // console.log(">>>>>>>> target", target);
  // console.log(">>>>>>>> selector", selector);
  if (target.id === selector || target.className.indexOf(selector) !== -1 || target.tagName.toLocaleLowerCase()  === selector.toLocaleLowerCase()) {
    fn.call(target);
  }
}


/**
   @para parent 包裹容器的id, className, selector
   @para eventType 事件类型，例如：click
   @para selector 容器内元素的选择器，支持id, className 和 tagName
   @para fn 元素上要执行的函数
 */
export function delegate(parent, eventType, selector, fn) {
  //参数处理
  let dom;
  if (parent === null || parent === undefined) {
    dom = document;
  } else if (typeof parent === 'string') {
    dom = document.getElementById(parent);
    if (!dom) dom = document.getElementsByClassName(parent);

    if (!dom) dom = document.querySelector(parent);

    if(!dom) dom = document;
  } else {
    // 认为一DOM  对象
    dom = parent;
  }

  if (typeof selector !== 'string') {
    alert('selector is not string');
    return;
  }

  if (typeof fn !== 'function') {
    alert('fn is not function');
    return;
  }
  addEvent(dom, eventType, handle);
}



export function addHandler(element, type, handler){
  if(element.addEventListener){
    element.addEventListener(type, handler, false);
  }else if(element.attachEvent){
    element.attachEvent("on" + type, handler);
  }else{
    element["on" + type] = handler;
  }
}

export function removeHandler(element, type, handler){
  if(element.removeEventListener){
    element.removeEventListener(type, handler, false);
  }
  else if(element.detachEvent)
  {
    element.detachEvent("on" + type, handler);
  }else{
    element["on" + type] = null;
  }
}

export function getEvent(event) {
  return event?event: window.event;
}

export function getTarget(event) {
  return event.target|| event.srcElement;
}

export function preventDefault(event){
  if(event.preventDefault){
    event.preventDefault();
  }else{
    event.returnValue = false;
  }
}

export function stopPropagation(event){
  if(event.stopPropagation){
    event.stopPropagation();
  }else{
    event.cancelBubble = true;
  }
}

export function getCharCode(event){
  if(typeof event.charCode == "number"){
    return event.charCode;
  }else{
    return event.keyCode;
  }
}
