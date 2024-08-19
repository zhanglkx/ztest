(function () {
    function addCombo(editor, comboName, styleType, lang, entries, defaultLabel, styleDefinition, order) {
        var config = editor.config, style = new CKEDITOR.style(styleDefinition);
        var names = entries.split(';'), values = [];
        var styles = {};
        for (var i = 0; i < names.length; i++) {
            var parts = names[i];
            if (parts) {
                parts = parts.split('/');
                var vars = {}, name = names[i] = parts[0];
                vars[styleType] = values[i] = parts[1] || name;
                styles[name] = new CKEDITOR.style(styleDefinition, vars);
                styles[name]._.definition.name = name;
            } else {
                names.splice(i--, 1);
            }
        }
        editor.ui.addRichCombo(comboName, {
            label: editor.lang.lineheight.title,
            title: editor.lang.lineheight.title,
            toolbar: 'styles,' + order,
            allowedContent: style,
            requiredContent: style,
            panel: {
                css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
                multiSelect: false,
                attributes: { 'aria-label': editor.lang.lineheight.title }
            },
            init: function () {
                this.startGroup(editor.lang.lineheight.title);
                for (var i = 0; i < names.length; i++) {
                    var name = names[i];
                    this.add(name, styles[name].buildPreview(), name);
                }
            },
            onClick: function (value) {
                editor.focus();
                editor.fire('saveSnapshot');
                var style = styles[this.getValue() || "1.6"];
                if (style != undefined) editor['removeStyle'](style);
                var newStyle = styles[value];
                if (newStyle != style) editor['applyStyle'](newStyle);

                var selection = editor.getSelection();
                var ranges = selection.getRanges();

                // 遍历所有选中范围，找到所有 p 标签并设置行高
                for (var j = 0; j < ranges.length; j++) {
                    var range = ranges[j];
                    var walker = new CKEDITOR.dom.walker(range);
                    walker.evaluator = function (node) {
                        return node.type == CKEDITOR.NODE_ELEMENT && node.is('p');
                    };

                    var node;
                    while ((node = walker.next())) {
                        node.setStyle('line-height', value);

                        var spanEls = node.find('span'); // 重命名为 spanEls
                        var emptySpans = [];
                        var hasText = false;

                        for (var i = 0; i < spanEls.count(); i++) {
                            var span = spanEls.getItem(i);
                            span.setStyle('line-height', value);
                            if (span.getText().trim() === '') {
                                emptySpans.push(span);
                            } else {
                                hasText = true;
                            }
                        }

                        if (emptySpans.length >= 1) {
                            for (var i = 0; i < emptySpans.length; i++) {
                                emptySpans[i].remove();
                            }
                        }

                        // 设置 p 标签的最小高度
                        if (hasText) {
                            node.setStyle('min-height', '22px');
                        } else {
                            node.setStyle('min-height', 'auto');
                        }
                    }
                }

                // 处理单独选中的元素
                var selectedElement = selection.getStartElement();

                if (selectedElement) {
                    selectedElement.setAttribute('data-lineheight-plugin', 'true');
                }

                // 查找父级的 p 标签
                var parentP = selectedElement.getAscendant('p', true);

                while (selectedElement && !parentP) {
                    selectedElement = selectedElement.getParent();
                    if (selectedElement && selectedElement.getName() === 'p') {
                        parentP = selectedElement;
                    }
                }

                if (parentP) {
                    // 应用行高样式到 p 标签,解决编辑器默认行高 1.6导致设置小于 1.6无变化
                    parentP.setStyle('line-height', value);

                    /** start 解决编辑器无任何元素下，行高变化一次就添加一个空白 span，导致后续行高变化为比他小的话，整行杭盖哦不会变化（因为整体行高为该行最高值） start */
                    // 获取 <p> 元素中的所有 <span> 元素
                    var spanEls = parentP.find('span'); // 重命名为 spanEls
                    var emptySpans = [];
                    var hasText = false;

                    // 遍历 <span> 元素，检查是否为空白
                    for (var spanItem = 0; spanItem < spanEls.count(); spanItem++) {
                        var span = spanEls.getItem(spanItem);
                        /** start  行高改为针对段落设置） start */
                        span.setStyle('line-height', value);
                        /** end  行高改为针对段落设置） end */
                        if (span.getText().trim() === '') {
                            emptySpans.push(span);
                        } else {
                            hasText = true;
                        }
                    }

                    // 如果有多个空白的 <span> 元素
                    if (emptySpans.length >= 1) {
                        // 删除除了最后一个空白的 <span> 元素之外的所有空白 <span> 元素
                        for (var i = 0; i < emptySpans.length; i++) {
                            emptySpans[i].remove();
                        }
                    }

                    // 设置 p 标签的最小高度
                    if (hasText) {
                        parentP.setStyle('min-height', '22px');
                    } else {
                        parentP.setStyle('min-height', 'auto');
                    }
                    /**  end 解决编辑器无任何元素下，行高变化一次就添加一个空白 span，导致后续行高变化为比他小的话，整行杭盖哦不会变化（因为整体行高为该行最高值） end */
                } else {
                    // 如果没有父级 p 标签，则应用样式到选中的文本
                    // editor[this.getValue() == value ? 'removeStyle' : 'applyStyle'](styleTemop);
                }

                /** start 获取 placeholder，无元素的时候，placeholder行高也要跟随调整 start */
                try {
                    var placeholderElement = document.getElementById('editContentTipsPlaceholder');
                    if (placeholderElement) {
                        placeholderElement.style.lineHeight = value;
                    }
                } catch (e) {
                    console.error('获取placeholderElem11111ent', e);
                }
                /** start 获取 placeholder，无元素的时候，placeholder行高也要跟随调整 start */

                editor.fire('saveSnapshot');
            },
            onRender: function () {
                editor.on('selectionChange', function (ev) {
                    var currentValue = this.getValue();
                    var elementPath = ev.data.path, elements = elementPath.elements;
                    for (var i = 0, element; i < elements.length; i++) {
                        element = elements[i];
                        if (element.$.id === 'ckEditor') {
                            this.setValue('1.6', defaultLabel);
                            return;
                        }
                        for (var value in styles) {
                            if (styles[value].checkElementMatch(element, true, editor)) {
                                if (value != currentValue) {
                                    this.setValue(value);
                                }
                                return;
                            }
                        }
                    }
                    // 获取计算样式的行高和字体大小
                    var computedLineHeight = getComputedStyle(element.$, 'line-height');
                    var computedFontSize = getComputedStyle(element.$, 'font-size');
                    if (computedLineHeight && computedFontSize) {
                        // 计算行高与字体大小的比值
                        var lineHeightValue = parseFloat(computedLineHeight);
                        var fontSizeValue = parseFloat(computedFontSize);
                        if (!isNaN(lineHeightValue) && !isNaN(fontSizeValue) && fontSizeValue !== 0) {
                            var ratio = lineHeightValue / fontSizeValue;
                            var formattedValue = ratio % 1 === 0 ? ratio.toFixed(0) : ratio.toFixed(1);
                            this.setValue(formattedValue, defaultLabel);
                        } else {
                            this.setValue('1.6', defaultLabel);
                        }
                    } else {
                        this.setValue('1.6', defaultLabel);
                    }
                }, this);
            },
            refresh: function () {
                if (!editor.activeFilter.check(style))
                    this.setState(CKEDITOR.TRISTATE_DISABLED);
            }
        });
    }

    // 获取计算样式
    function getComputedStyle(element, styleName) {
        if (element.currentStyle) {
            return element.currentStyle[styleName];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(element, null).getPropertyValue(styleName);
        }
        return null;
    }

    CKEDITOR.plugins.add('lineheight', {
        requires: 'richcombo',
        lang: 'ar,de,en,es,fr,ko,pt,zh-cn',
        init: function (editor) {
            var config = editor.config;
            addCombo(editor, 'lineheight', 'size', editor.lang.lineheight.title, config.line_height, editor.lang.lineheight.title, config.lineHeight_style, 40);
        }
    });
})();
CKEDITOR.config.line_height = '1;1.15;1.3;1.5;1.6;2;3;';
CKEDITOR.config.lineHeight_style = {
    element: 'span',
    styles: { 'line-height': '#(size)' },
    overrides: [{
        element: 'line-height', attributes: { 'size': null }
    }]
};
