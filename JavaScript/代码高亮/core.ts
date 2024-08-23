// 关键词配置接口
export interface IKeywordOption {
    keyword: string | RegExp; // 关键词，可以是字符串或正则表达式
    color?: string; // 关键词的前景色
    bgColor?: string; // 关键词的背景色
    style?: Record<string, any>; // 关键词的样式，使用键值对形式
    tagName?: string; // 高亮标签名，用于包裹关键词
    caseSensitive?: boolean; // 是否区分大小写，默认为 true
    renderHighlightKeyword?: (content: string) => any; // 自定义渲染高亮HTML的函数
}

// 关键词类型，可以是字符串或 IKeywordOption
export type IKeyword = string | IKeywordOption;

// 匹配索引接口
export interface IMatchIndex {
    index: number; // 关键词在文本中的索引位置
    subString: string; // 匹配到的子字符串
}

// 关键词解析索引接口
export interface IKeywordParseIndex {
    keyword: string | RegExp; // 关键词，可以是字符串或正则表达式
    indexList: IMatchIndex[]; // 匹配到的索引列表
    option?: IKeywordOption; // 关键词选项
}

// 关键词解析结果接口
export interface IKeywordParseResult {
    start: number; // 高亮文本的起始索引
    end: number; // 高亮文本的结束索引
    subString?: string; // 匹配到的子字符串
    option?: IKeywordOption; // 关键词选项
}

/** ***** 以上是类型定义，以下是代码实现 ********************************************************/

/**
 * 获取关键词索引列表
 * 输入文本、关键词或正则表达式、正则表达式标志，返回关键词在文本中所有匹配位置的列表。
 * @param content 输入的文本
 * @param keyword 关键词或正则表达式
 * @param flags 正则表达式标志，默认不区分大小写，全局匹配
 * @returns IMatchIndex[] 关键词索引列表
 */
const getKeywordIndexList = (
    content: string,
    keyword: string | RegExp,
    flags = 'ig',
): IMatchIndex[] => {
    const reg = new RegExp(keyword, flags); // 创建正则表达式对象
    const res = (content as any).matchAll(reg); // 匹配所有关键词
    const arr = [...res]; // 将结果转换为数组
    const allIndexArr: IMatchIndex[] = arr.map(e => ({
        index: e.index, // 匹配索引
        subString: e[0], // 匹配到的子字符串
    }));
    return allIndexArr; // 返回关键词索引列表
};

/**
 * 解析关键词为索引
 * 遍历每个关键词，调用 getKeywordIndexList 获取匹配位置列表，生成 IKeywordParseIndex 对象，并返回结果列表。
 * @param content 文本
 * @param keywords 关键词列表
 * @returns IKeywordParseIndex[] 关键词解析索引列表
 */
const parseHighlightIndex = (content: string, keywords: IKeyword[]): IKeywordParseIndex[] => {
    const result: IKeywordParseIndex[] = []; // 初始化结果数组
    keywords.forEach((keywordOption: IKeyword) => {
        let option: IKeywordOption = { keyword: '' }; // 初始化选项
        if (typeof keywordOption === 'string') {
            option = { keyword: keywordOption }; // 如果是字符串，转换为 IKeywordOption
        } else {
            option = keywordOption; // 否则直接使用
        }
        const { keyword, caseSensitive = true } = option; // 解构关键词和是否区分大小写
        const indexList = getKeywordIndexList(
            content,
            keyword,
            caseSensitive ? 'g' : 'gi', // 根据是否区分大小写设置正则标志
        );
        const res = {
            keyword, // 关键词
            indexList, // 索引列表
            option, // 选项
        };
        result.push(res); // 将结果添加到数组中
    });
    return result; // 返回解析结果
};

/**
 * 解析关键词为数据
 * 获取关键词索引列表，初始化分割列表，通过 findSplitIndex 函数判断并插入不重叠的高亮区间。
 * 最后处理没有匹配关键词的文本部分，生成最终的高亮结果列表。
 * @param content 文本
 * @param keywords 关键词列表
 * @returns IKeywordParseResult[] 关键词解析结果列表
 */
export const parseHighlightString = (content: string, keywords: IKeyword[]): IKeywordParseResult[] => {
    const result = parseHighlightIndex(content, keywords); // 获取关键词索引列表
    const splitList: IKeywordParseResult[] = []; // 初始化分割列表

    /**
     * 查找分割索引 避免高亮区间有重叠
     * 检查当前索引是否有交集，如果没有交集返回当前索引，如果有交集返回 -1。
     * @param index 当前索引
     * @param len 子字符串长度
     * @returns number 分割索引
     */
    const findSplitIndex = (index: number, len: number): number => {
        for (let i = 0; i < splitList.length; i++) {
            const cur = splitList[i];
            // 检查是否有交集
            if (
                (index > cur.start && index < cur.end) // 新区间的起始位置在当前区间内
                || (index + len > cur.start && index + len < cur.end) // 新区间的结束位置在当前区间内
                || (cur.start > index && cur.start < index + len) // 当前区间的起始位置在新区间内
                || (cur.end > index && cur.end < index + len) // 当前区间的结束位置在新区间内
                || (index === cur.start && index + len === cur.end) // 新区间与当前区间完全重合
            ) {
                return -1; // 有交集返回 -1
            }
            // 没有交集，且在当前的前面
            if (index + len <= cur.start) {
                return i; // 返回当前索引
            }
            // 没有交集，且在当前的后面，放在下个迭代处理
        }
        return splitList.length; // 返回分割列表长度
    };

    result.forEach(({ indexList, option }: IKeywordParseIndex) => {
        indexList.forEach(e => {
            const { index, subString } = e;
            const item = {
                start: index, // 起始索引
                end: index + subString.length, // 结束索引
                option, // 选项
            };
            const splitIndex = findSplitIndex(index, subString.length);
            if (splitIndex !== -1) {
                splitList.splice(splitIndex, 0, item); // 插入到分割列表中
            }
        });
    });

    // 补上没有匹配关键词的部分
    const list: IKeywordParseResult[] = [];
    splitList.forEach((cur, i) => {
        const { start, end } = cur;
        const next = splitList[i + 1];
        // 第一个前面补一个
        if (i === 0 && start > 0) {
            list.push({ start: 0, end: start, subString: content.slice(0, start) });
        }
        list.push({ ...cur, subString: content.slice(start, end) });
        // 当前和下一个中间补一个
        if (next?.start > end) {
            list.push({
                start: end,
                end: next.start,
                subString: content.slice(end, next.start),
            });
        }
        // 最后一个后面补一个
        if (i === splitList.length - 1 && end < content.length - 1) {
            list.push({
                start: end,
                end: content.length - 1,
                subString: content.slice(end, content.length),
            });
        }
    });
    return list;
};
