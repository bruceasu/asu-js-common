import {format, parse} from './format-date';
import * as _EventUtil from './event-util';
import _arrayUtils from './array-utils';
export * from './string';
export * from './dom';
export * from './is';

export const formatDate = format;
export const parseDate = parse;
/**
 * 日期格式化
 * @param timestamp
 * @param pattern
 */
export function formatTimepstamp(timestamp, pattern) {
  if (!timestamp) {
    return '';
  }
  return format(new Date(timestamp), pattern);
}


export const arrayUtils = _arrayUtils;
export const EventUtil = _EventUtil;


/* 获取 i18n 名称, obj = { name, names : {lang1, lang2, lang3, ...}} */
export function getI18nName(obj, lang) {
  if (!isObject(obj)) {
    return "";
  }
  let name = obj.name;
  let names = obj.names;
  const lng = lang || "";
  if (names) {
    switch (lng.toLocaleLowerCase()) {
      case 'zh':
      case 'zh-cn':
      case 'zh_cn':
        if (!isEmpty(names['zh_CN'])) {
          name = names['zh_CN'];
        }
        break;
      case 'zh-tw':
      case 'zh_tw':
        if (!isEmpty(names['zh_TW'])) {
          name = names['zh_TW'];
        }
        break;
      case 'ja':
      case 'jp':
        if (!isEmpty(names['ja'])) {
          name = names['ja'];
        }
        break;
      case 'en':
      case 'en_us':
        if (!isEmpty(names['en'])) {
          name = names['en'];
        }
        break;
      default:
        if (!isEmpty(names[lng])) {
          name = names[lng];
        }
        break;
    }
  }
  return name;
}
