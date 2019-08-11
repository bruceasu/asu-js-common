export function stringToDom(arg) {
  var objE = document.createElement("div");
  objE.innerHTML = arg;
  return objE.childNodes;
};

export function domToString(node) {
  var tmpNode = document.createElement("div");
  if (node.length) {
    node.forEach(n => {
      tmpNode.appendChild(n.cloneNode(true));
    })
  } else {
    tmpNode.appendChild(node.cloneNode(true));
  }

  var str = tmpNode.innerHTML;
  tmpNode = node = null; // prevent memory leaks in IE
  return str;
}

export function filterTag(s, options) {
  const {html,script, style } = options;
  let defaultHtmlTag = false;
  if (!html && !script && !style)
    defaultHtmlTag = true;

  if (script)
    s = s.replace(/<\s*script[^>]*>(.|[\r\n])*?<\s*\/script[^>]*>/gi, '');
  if (style)
    s = s.replace(/<\s*style[^>]*>(.|[\r\n])*?<\s*\/style[^>]*>/gi, '');
  if (html || defaultHtmlTag) {
    s = s.replace(/<\/?[^>]+>/g, '');
    s = s.replace(/\&[a-z]+;/gi, '');
  }
  return s;
}


export function setStyles(el, hash){
  const HAS_CSSTEXT_FEATURE = typeof(el.style.cssText) !== 'undefined';
  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }
  let originStyleText;
  const originStyleObj = {};
  if (!!HAS_CSSTEXT_FEATURE) {
    originStyleText = el.style.cssText;
  } else {
    originStyleText = el.getAttribute('style');
  }
  originStyleText.split(';').forEach(item => {
    if (item.indexOf(':') !== -1) {
      const obj = item.split(':');
      originStyleObj[trim(obj[0])] = trim(obj[1]);
    }
  });

  const styleObj = {};
  Object.keys(hash).forEach(item => {
    this.setStyle(el, item, hash[item], styleObj);
  });
  const mergedStyleObj = Object.assign({}, originStyleObj, styleObj);
  const styleText = Object.keys(mergedStyleObj)
                          .map(item => item + ': ' + mergedStyleObj[item] + ';')
                          .join(' ');

  if (!!HAS_CSSTEXT_FEATURE) {
    el.style.cssText = styleText;
  } else {
    el.setAttribute('style', styleText);
  }
};

const reUnit = /width|height|top|left|right|bottom|margin|padding/i;
export function setStyle(node, att, val, style) {
  style = style || node.style;

  if (style) {
    if (val === null || val === '') { // normalize unsetting
      val = '';
    } else if (!isNaN(Number(val)) && reUnit.test(att)) { // number values may need a unit
      val += 'px';
    }

    if (att === '') {
      att = 'cssText';
      val = '';
    }

    style[att] = val;
  }
};

export function  getStyle(el, att, style) {
  style = style || el.style;

  let val = '';

  if (style) {
    val = style[att];

    if (val === '') {
      val = getComputedStyle(el, att);
    }
  }

  return val;
};

// NOTE: Known bug, will return 'auto' if style value is 'auto'
export function getComputedStyle(el, att) {
  const win = el.ownerDocument.defaultView;
  // null means not return presudo styles
  const computed = win.getComputedStyle(el, null);

  return att ? computed[att] : computed;
}

export function htmlStringToText(arg) {
  var objE = document.createElement("div");
  objE.innerHTML = arg;
  return objE.innerText ?  objE.innerText :  objE.textContent;
};


/**
 * check element has certain class.
 * @param elem element
 * @param className being to check
 * @return true or false.
 */
export const hasClass = (function(){
  var div = document.createElement("div") ;
  if( "classList" in div && typeof div.classList.contains === "function" ) {
    return function(elem, className){
      return elem.classList.contains(className) ;
    } ;
  } else {
    return function(elem, className){
      var classes = elem.className.split(/\s+/) ;
      for(var i= 0 ; i < classes.length ; i ++) {
        if( classes[i] === className ) {
          return true ;
        }
      }
      return false ;
    } ;
  }
})() ;


/**
 * 获取页面大小
 */
export function getPageValues(doc) {
  const	height = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
  const	width = Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth);
  return {height, width}
}

/**
 * 获取可视窗口高度和宽度
 */
export function getViewPortValues() {
  const height =  document.documentElement.clientHeight || document.body.clientHeight;
  const width =  document.documentElement.clientWidth || document.body.clientWidth;
  return {height, width};
}



export function alertJson(obj, preMsg) {
  alert(preMsg + " " +JSON.stringify(obj));
}

export function logJson(obj, preMsg) {
  console.log(preMsg, JSON.stringify(obj));
}

export function saveItemToSessionStore(key, item) {
  window.sessionStorage.removeItem(key);
  window.sessionStorage.setItem(key, JSON.stringify(item));
}

export function loadItemFromSessionStore(key) {
  let json = window.sessionStorage.getItem(key);
  if (json) {
    return JSON.parse(json);
  } else {
    return null;
  }
}

export function getLocalStore(key) {
  return window.localStorage.getItem(key)
}

export function setLocalStore(key, item) {
  window.localStorage.setItem(key, item)
}



export function openWin(url, iHeight, iWidth, customParams, win) {
  //获得窗口的垂直位置
  let iTop = (window.screen.availHeight - 30 - iHeight) / 2;
  //获得窗口的水平位置
  let iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
  let params = `height=${iHeight},width=${iWidth}`;
  if (customParams) {
    for(let key in customParams) {
      params += `,${key}=${customParams[key]}`;
    }
    // 填充默认值
    if (!customParams.hasOwnProperty('top')) {
      params += `,top=${iTop}`;
    }
    if (!customParams.hasOwnProperty('left')) {
      params += `,left=${iLeft}`;
    }
    if (!customParams.hasOwnProperty('toolbar')) {
      params += `,toolbar=no`;
    }
    if (!customParams.hasOwnProperty('menubar')) {
      params += `,menubar=no`;
    }
    if (!customParams.hasOwnProperty('resizable')) {
      params += `,resizable=yes`;
    }
    if (!customParams.hasOwnProperty('location')) {
      params += `,location=no`;
    }
  } else {
    params += `,top=${iTop},left=${iLeft},toolbar=no,menubar=no,resizeable=yes,location=no`;
  }

  return window.open(url, win, params);

}


export function closeWin(checkTop) {
  try {
    window.opener = window;
    var win = window.open(" ", "_self");
    win.close();
    if (checkTop) {
      //frame的时候
      window.top.close();
    }
  } catch (e) {

  }
}

/*
   import {parse, stringify} from "qs";

   export function getPageQuery() {
   return parse(window.location.href.split('?')[1]);
   }

   export function getQueryPath(path = '', query = {}) {
   const search = stringify(query);
   if (search.length) {
   return `${path}?${search}`;
   }
   return path;
   }
 */
