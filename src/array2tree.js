import {isEmptyArray, isEmpty} from "./is";
function cleanupTree(treeEle, idKey, pidKey) {
  let arr = [];
  for (let k in treeEle) {
    if (isEmpty(k) || k == -1) { // 开始节点
      treeEle[k].children.forEach((item) => {
        arr.push(item);
      });
    } else {
      // pid != -1, 但对应的节点已经被删除了，他的子节点也认为被删除了
    }
  }
  arr.sort((a,b)=>{
    return (a[idKey]+"").localeCompare(b[idKey]+"");
  });

  return arr;
}

// 把数组转成数元素
export function toTree(arr, idKey, pidKey) {
  if (isEmptyArray(arr)) {
    return [];
  }

  arr.sort((a, b) => (a,b,idKey, pidKey) => {
    let key1 = "", key2 = "";
    if (isEmpty(a[pidKey])) {
      key1 = "-1 " +a[idKey];
    } else {
      key1 = a[pidKey] +  " " + a[idKey];
    }
    if (isEmpty(a[pidKey])) {
      key2 = "-1 " + b[idKey];
    } else {
      key2 = b[pidKey] +  " " + b[idKey];
    }
    //console.log("key1", key1)
    // console.log("key2", key2)
    return key1.localeCompare(key2);
  });

  var midObj = {};
  // 从后向前遍历
  for(var i = arr.length - 1; i >= 0; i--) {
    var nowPid = arr[i][pidKey];
    var nowId = arr[i][idKey];
    let node = {...arr[i]};
    // 建立当前节点的父节点的children 数组
    if(midObj[nowPid]) {
      midObj[nowPid].children.push(node);
    } else {
      midObj[nowPid] = {children:[]};
      midObj[nowPid].children.push(node)
    }
    // 将children 放入合适的位置
    if(midObj[nowId]) {
      node["children"] = midObj[nowId].children.sort((a,b)=>{
        return (a[idKey]+"").localeCompare(b[idKey] + "");
      });
            delete midObj[nowId];
        }
    }

    return cleanupTree(midObj, idKey, pidKey)
}
