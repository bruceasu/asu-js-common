import {toTree} from './array2tree.js';

// extend function
if (!Function.prototype.getName) {
  Function.prototype.getName = function() {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
  }
}

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (!Array.contains) {
  Array.prototype.contains = function (val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === val) {
        return true;
      }
    }
    return false;
  };
}


//数组操作工具函数：arrayUtils都是产生新的array，而不是操作源array
export default {
  /**
   * 在指定索引位置增加新元素，未指定index时添加到最后面
   * @param array (array)
   * @param newItem   (object)
   * @param index (int)
   * @returns {*} 返回新数组
   */
  addItem: (array, newItem, index) => {
    if (typeof index !== 'undefined') {
      return [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index + 1)
      ]
    } else {
      return [
        ...array,
        newItem
      ];
    }
  },
  /**
   * 删除指定id的元素
   * @param array
   * @param id
   * @returns {[*,*]} 返回新数组, 如果需要删除的数据不存在，则返回原来的数组
   */
  delItem: (array, id) => {
    const findIndex = array.findIndex(item => item.id == id);
    if (findIndex === -1) {
      return array
    }
    return [
      ...array.slice(0, findIndex),
      ...array.slice(findIndex + 1)
    ];
  },
  /**
   * 删除指定的对象
   * @param array
   * @param obj
   * @returns  {[*,*]} 返回新数组, 如果需要删除的数据不存在，则返回原来的数组
   */
  removeItem: (array, obj) => {
    const findIndex = array.findIndex(item => item === obj);
    if (findIndex === -1) {
      return array
    }
    return [
      ...array.slice(0, findIndex),
      ...array.slice(findIndex + 1)
    ];
  },
  /**
   * 替换数组中指定的元素
   * @param array
   * @param id
   * @param newItem (object)
   * @returns {[*,*,*]} 返回新数组
   */
  modifyItem: (array, id, newItem) => {
    const findIndex = array.findIndex(item => item.id == id);
    if (findIndex === -1) {
      // as new
      return [
        ...array,
        newItem
      ];
    } else {
      return [
        ...array.slice(0, findIndex),
        newItem,
        ...array.slice(findIndex + 1)
      ];
    }

  },
  swap: (arr, index, targetIndex) => {
    if (arrayUtils.isEmptyArray(arr)) {
      return;
    }
    if (index < 0 || index >= arr.length || targetIndex < 0 || targetIndex >= arr.length) {
      return;
    }

    let datum = arr[index];
    arr[index] = arr[targetIndex];
    arr[targetIndex] = datum;
  },

  findIndex: (array, elem) => {
    return array.findIndex(item => item == elem);
  },
  findIndexById: (array, id) => {
    return array.findIndex(item => item.id == id);
  },
  toTree,
};
