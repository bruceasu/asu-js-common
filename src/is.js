export function isFunction(val) {
  return Object.prototype.toString.call(val) === "[object Function]"
}

/*
   方法一使用typeof方法。
   console.log(typeof str);//string
   console.log(typeof num);//number
   console.log(typeof b);//boolean
   console.log(typeof n);//null是一个空的对象
   console.log(typeof u);//undefined
   // 下面的其实不是很准确。
   console.log(typeof arr);//object
   console.log(typeof obj);//object
   console.log(typeof fn);//function
 */
export function isNumber(val) {
  return (typeof val) === "number";
}

export function isString(val) {
  return (typeof val) === "string";
}
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function isEmpty(val) {
  return val === undefined || val === null || val === "";
}

export function isNotEmpty(value) {
  return !isEmpty(value);
}


export function isArray(val) {
  return Array.isArray(val);
}


export function isEmptyArray(val) {
  return val === undefined || val === null || val.length === 0;
}

export function isTheSameArray (arr1, arr2, key) {
  const isEmpty1 = isEmptyArray(arr1);
  const isEmpty2 = isEmptyArray(arr2);
  if (isEmpty1 && isEmpty2) {
    return true;
  }
  if (isEmpty1 || isEmpty2) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  const newArr1 = [...arr1];
  const newArr2 = [...arr2];
  if (key) {
    newArr1.sort((a, b) =>  a[key] - b[key]);
    newArr2.sort((a, b) =>  a[key] - b[key]);
    for(let i=0; i<newArr1.length; i++) {
      if (newArr1[i][key] !== newArr2[i][key]) {
        return false;
      }
    }
    return true;
  } else {
    newArr1.sort();
    newArr2.sort();
    for(let i=0; i<newArr1.length; i++) {
      if (newArr1[i] !== newArr2[i]) {
        return false;
      }
    }
  }
}

export function isArrayValueEquals(a, b) {
  if (isArray(a) && isArray(b)) {
    if (a.length != a.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      let va = a[i];
      let vb = b[i];
      // 又是递归处理
      if (isObject(va) && isObject(vb)) {
        if (!isObjectValueEqual(va, vb)) {
          return false;
        }
      } else if (isArray(va) && isArray(vb)) {
        if (!isArrayValueEquals(va, vb)) {
          return false;
        }
      } else {
        if (va !== vb) {
          return false;
        }
      }
    }
  } else {
    return false;
  }
}

export function isObject(val) {
  return val !== undefined && val != null && typeof val === 'object' && Array.isArray(val) === false;
};


export function isEmptyObj(obj) {
  if (!isObject(obj)) {
    return true;
  }
  for(let item in obj){
    return false;
  }
  return true;
}



export function isObjectValueEqual(a, b) {
  // Of course, we can do it use for in
  // Create arrays of property names
  if ((a === null || a === undefined) && (b === null || b === undefined) ) {
    return true;
  }

  if ((a === null || a === undefined) || (b === null || b === undefined) ) {
    return false;
  }

  if (!(isObject(a) && isObject(b))) {
    return a === b;
  }

  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    const va = a[propName];
    const vb = b[propName];
    if (isObject(va) && isObject(vb)) {
      if (!isObjectValueEqual(va, vb)) {
        return false;
      }
    } else if (isArray(va) && isArray(vb)) {
      // compare array
      if (!isArrayValueEquals(va, vb)) {
        return false;
      }
    } else {
      if (va !== vb) {
        return false;
      }
    }

  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}
