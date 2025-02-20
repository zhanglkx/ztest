/**
 * 处理特殊的shark，目前仅有需要染色的shark要处理
 * Example: We've rated **out of 5** on Trustpilot
 * **中间的部分需要染色
 * 极其特殊的情况： **高亮** **高亮**
 * [{
 *  tag:'text',
 *  text: We've rated
 * },
 * {
 *  tag:'color',
 *  text: out of 5
 * },
 * {
 *  tag:'text',
 *  text:  on Trustpilot
 * }]
 *
 */
export const getSpecialSharkArray = (str: string) => {
    if (!str) return [{ tag: 'text', text: '' }];
  
    try {
      const regex = /\*\*(.*?)\*\*/g;
      const matches = [...(str.match(regex) || [])];
  
      if (matches.length === 0) {
        return [{ tag: 'text', text: str }];
      }
  
      const result = [];
  
      let pre = 0;
  
      matches.forEach(item => {
        const index = str.indexOf(item);
  
        result.push({
          tag: 'text',
          text: str.slice(pre, index),
        });
        result.push({
          tag: 'color',
          text: item.slice(2, item.length - 2),
        });
        pre = index + item.length;
      });
      if (pre !== str.length) result.push({ tag: 'text', text: str.slice(pre, str.length) });
      return result;
    } catch (error) {
      return [{ tag: 'text', text: str }];
    }
  };
  

  
  /**
 * V2 版本不会出现翻译造成的417问题，但外层使用flex时要注意文案超长span会换行
 * @param string
 * @param subStrings
 * @returns
 */
export const replaceSharkV2 = (string: string, subStrings: ReactNode | ReactNode[]): ReactNode => {
  if (!Array.isArray(subStrings)) {
    subStrings = [subStrings];
  }
  const reg = /%\d\$s/g;
  const strList = (string || '').split(reg);
  return reduceNodeV2(
    strList,
    (result, expr, index) => {
      if (typeof subStrings[index] === 'string') {
        return (
          <>
            {result}
            {expr}
            <span style={{ verticalAlign: 'middle' }}>{subStrings[index]}</span>
          </>
        );
      }

      return (
        <>
          {result}
          {expr}
          {subStrings[index]}
        </>
      );
    },
    '',
  );
};

export const replaceSharkStrOrder = (template: string, subStrings: string | string[]): string => {
  if (!Array.isArray(subStrings)) {
    subStrings = [subStrings];
  }

  return template.replace(/%(\d+)\$s/g, (match, index) => {
    const valueIndex = parseInt(index, 10) - 1;
    if (valueIndex >= 0 && valueIndex < subStrings.length) {
      return subStrings[valueIndex];
    }
    // 如果索引超出范围，保留原始匹配项
    return match;
  });
};

export const replaceSharkStr = (string: string, subStrings: string | string[]): string => {
  if (!Array.isArray(subStrings)) {
    subStrings = [subStrings];
  }
  const reg = /%\d\$s/g;
  const regOnline = /{\d\}/g;
  let strList = [];
  if (regOnline.test(string || '')) {
    // NOTE: 兼容 {0}
    strList = (string || '').split(regOnline);
  } else {
    strList = (string || '').split(reg);
  }
  return strList.reduce((result, expr, index) => `${result}${expr}${subStrings[index] || ''}`, '');
};
