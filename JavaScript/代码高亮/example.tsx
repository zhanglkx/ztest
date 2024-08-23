// react组件
import React, { useMemo } from 'react';
import { IKeywordOption, IKeywordParseResult, parseHighlightString } from './code';

const HighlightKeyword = ({
    content,
    keywords,
}: {
    content: string;
    keywords: IKeywordOption[];
}): any => {
    return useMemo(() => {
        if (keywords.length === 0) {
            return <>{content}</>;
        }
        const splitList = parseHighlightString(content, keywords);

        if (splitList.length === 0) {
            return <>{content}</>;
        }
        return splitList.map((item: IKeywordParseResult, i: number) => {
            const { subString, option = {} } = item;
            const {
                color,
                bgColor,
                style = {},
                tagName = 'mark',
                renderHighlightKeyword,
            } = option as IKeywordOption;
            if (typeof renderHighlightKeyword === 'function') {
                return renderHighlightKeyword(subString as string);
            }
            if (!item.option) {
                return <>{subString}</>;
            }
            const TagName: any = tagName;
            return (
                <TagName
                    key={`${subString}_${i}`}
                    style={{
                        ...style,
                        backgroundColor: bgColor || style.backgroundColor,
                        color: color || style.color,
                    }}
                >
                    {subString}
                </TagName>
            );
        });
    }, [content, keywords]);
};

export default HighlightKeyword;


<HighlightKeyword content="文字文字文字文字文字文字文字文字文字文字文字文字文字" keywords={[{ keyword: '文字', color: 'red' }]} />
