/**
 * @name base
 * @author Lester
 * @date 2022-01-12 11:22
 */
// import qs from 'qs';

/**
 * 获取屏幕宽度
 */
export const getClientWidth = (): number => {
  const docBody = document.body;
  const docEl: HTMLElement = document.documentElement;
  return docBody.clientWidth || docEl.clientWidth || window.innerWidth || 375;
};

/**
 * 当前屏幕相对标准屏幕比
 */
export const screenRate = getClientWidth() / 375;

/**
 * 轻提示
 */
export const Toast = {
  info (text: string, duration = 2, parentElement?: HTMLElement) {
    const target = parentElement || document.body;
    const toast = document.createElement('div');
    toast.innerText = text;
    toast.style.position = parentElement ? 'absolute' : 'fixed';
    toast.style.left = '50%';
    toast.style.top = '50%';
    toast.style.maxWidth = '150px';
    toast.style.lineHeight = '20px';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.padding = '8px 15px';
    toast.style.borderRadius = '5px';
    toast.style.fontSize = '12px';
    toast.style.color = '#ffffff';
    toast.style.zIndex = '99999';
    target.appendChild(toast);
    setTimeout(() => {
      target.removeChild(toast);
    }, duration * 1000);
  },
  success (text: string, duration = 2) {
    this.info(text, duration);
  },
  fail (text: string, duration = 2) {
    this.info(text, duration);
  }
};

/**
 * 复制
 * @param text
 * @param showTip
 */
export const copy = (text: string, showTip = true) => {
  const ele = document.createElement('input');
  ele.value = text;
  document.body.appendChild(ele);
  ele.select();
  document.execCommand('copy');
  document.body.removeChild(ele);
  if (showTip) {
    Toast.info('复制成功');
  }
};

/**
 * 设置title
 * @param tile
 */
export const setTitle = (tile: string) => {
  document.title = tile;
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'display: none; width: 0; height: 0;';
  iframe.src = '';

  const listener = () => {
    setTimeout(() => {
      iframe.removeEventListener('load', listener);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    }, 0);
  };
  iframe.addEventListener('load', listener);
  document.body.appendChild(iframe);
};

/**
 * 解析url参数
 * @param searchStr
 */
export const parseSearch = (searchStr = window.location.search) => {
  const qmIndex = searchStr.indexOf('?');
  const paramArr = (qmIndex > -1 ? searchStr.slice(qmIndex + 1) : searchStr).split('&');
  const params: { [key: string]: string } = {};
  paramArr.forEach((val: string) => {
    const valArr = val.split('=');
    params[valArr[0]] = valArr[1];
  });
  return params;
};

/**
 * 获取路由query参数
 * @param key
 */
export const getQueryParam = (key?: string) => {
  const { hash, search } = window.location;
  const hashIndex: number = hash.indexOf('?');
  let param: any = {};
  if (hashIndex > -1) {
    param = parseSearch(hash.slice(hashIndex));
  }
  if (search) {
    param = {
      ...param,
      ...parseSearch(search)
    };
  }

  if (key) {
    return param[key] || null;
  }
  return param;
};

/**
 * 是否是移动端
 */
export const isMobile = (): boolean => /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);

/**
 * 获取cookie
 * @param key
 */
export const getCookie = (key: string): string => {
  if (!document.cookie || !window.navigator.cookieEnabled) {
    return '';
  }
  const regExe = new RegExp(`${key}=([\\w]+)`);
  const res = document.cookie.match(regExe) || [];
  return res[1];
};

/**
 * 获取随机字符串
 */
export const getRandomStr = (): string => {
  return Math.random().toString(36).slice(2);
};

/**
 * 获取设备类型
 * @param userAgent
 */
export const getDeviceType = (userAgent: string): string => {
  const agentStr = userAgent || window.navigator.userAgent.toLowerCase();
  if (/windows/.test(agentStr)) {
    return 'windows';
  } else if (/iphone|ipod/.test(agentStr)) {
    return 'ios';
  } else if (/ipad/.test(agentStr)) {
    return 'ipad';
  } else if (/android/.test(agentStr)) {
    return 'android';
  } else if (/mac/.test(agentStr)) {
    return 'mac';
  } else {
    return 'others';
  }
};
