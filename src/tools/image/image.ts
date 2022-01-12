/**
 * @name image
 * @author Lester
 * @date 2022-01-12 16:31
 */
import { ClipboardItem, write } from 'clipboard-polyfill';
import { Toast } from '../base/base';

/**
 * 图片懒加载
 */
export const lazyLoadImg = (): void => {
  const observer = new IntersectionObserver((changes) => {
    changes.forEach((element) => {
      // @ts-ignore
      if (element.isIntersecting && element.target.dataset.src) {
        // @ts-ignore
        element.target.src = element.target.dataset.src;
      }
    });
  });

  const imgEleList = Array.from(document.getElementsByTagName('img'));
  imgEleList
    .filter((item) => !item.getAttribute('src'))
    .forEach((item) => {
      observer.observe(item);
    });
};

/**
 * 判断浏览器是否支持IntersectionObserver
 */
export const supportLazy = 'IntersectionObserver' in window;

/**
 * base64转Blob
 * @param b64Url
 * @param contentType
 * @param sliceSize
 */
export const b64toBlob = (b64Url: string, contentType = 'image/png', sliceSize = 512) => {
  const byteCharacters: string = window.atob(b64Url.split(',')[1]);
  const byteArrays: any[] = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
};

/**
 * 复制base64格式的图片
 * @param b64Url
 * @param tips
 */
export const copyBase64Img = (b64Url: string, tips?: boolean) => {
  const copyItem = new ClipboardItem({
    'image/png': b64toBlob(b64Url)
  });
  write([copyItem]);
  /* const ele = document.getElementById('copyImg');
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNode(ele);
  selection.addRange(range);
  document.execCommand('copy');
  selection.removeAllRanges(); */
  if (tips) {
    Toast.success('复制成功');
  }
};
