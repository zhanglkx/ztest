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

                var selection = editor.getSelection();
                var ranges = selection.getRanges();

                // 保存光标位置
                var bookmarks = selection.createBookmarks(true);

                var style = styles[this.getValue() || "1.6"];
                if (style != undefined) editor['removeStyle'](style);
                var newStyle = styles[value];
                if (newStyle != style) editor['applyStyle'](newStyle);

                // 恢复光标位置
                selection.selectBookmarks(bookmarks);

                for (var j = 0; j < ranges.length; j++) {
                    var range = ranges[j];
                    var walker = new CKEDITOR.dom.walker(range);
                    walker.evaluator = function (node) {
                        return node.type == CKEDITOR.NODE_ELEMENT && node.is('p');
                    };

                    var node;
                    while ((node = walker.next())) {
                        node.setStyle('line-height', value);

                        var spanEls = node.find('span');
                        var emptySpans = [];

                        for (var i = 0; i < spanEls.count(); i++) {
                            var span = spanEls.getItem(i);
                            span.setStyle('line-height', value);
                            if (span.getText().trim() === '') {
                                emptySpans.push(span);
                            }
                        }

                        if (emptySpans.length >= 1) {
                            for (var i = 0; i < emptySpans.length; i++) {
                                emptySpans[i].remove();
                            }
                        }
                    }
                }

                var selectedElement = selection.getStartElement();

                if (selectedElement) {
                    selectedElement.setAttribute('data-lineheight-plugin', 'true');
                }

                var parentP = selectedElement.getAscendant('p', true);

                while (selectedElement && !parentP) {
                    selectedElement = selectedElement.getParent();
                    if (selectedElement && selectedElement.getName() === 'p') {
                        parentP = selectedElement;
                    }
                }

                if (parentP) {
                    parentP.setStyle('line-height', value);
                    wrapPContentWithSpan(parentP);

                    var spanEls = parentP.find('span');
                    var emptySpans = [];

                    for (var spanItem = 0; spanItem < spanEls.count(); spanItem++) {
                        var span = spanEls.getItem(spanItem);
                        span.setStyle('line-height', value);
                        if (span.getText().trim() === '') {
                            emptySpans.push(span);
                        }
                    }

                    if (emptySpans.length >= 1) {
                        for (var i = 0; i < emptySpans.length; i++) {
                            emptySpans[i].remove();
                        }
                    }
                }

                placeholderLineHeight(value, false);

                editor.fire('saveSnapshot');
            },
            onRender: function () {
                editor.on('selectionChange', function (ev) {
                    var currentValue = this.getValue();
                    var elementPath = ev.data.path, elements = elementPath.elements;
                    for (var i = 0, element; i < elements.length; i++) {
                        element = elements[i];
                        for (var value in styles) {
                            if (styles[value].checkElementMatch(element, true, editor)) {
                                if (value != currentValue) {
                                    placeholderLineHeight(value, false);
                                    setLineHeightValue(this, value, defaultLabel);
                                }
                                return;
                            }
                        }
                    }
                    var computedLineHeight = getComputedStyle(elements[0].$, 'line-height');
                    var computedFontSize = getComputedStyle(elements[0].$, 'font-size');
                    var computedMargin = getComputedStyle(elements[0].$, 'margin');
                    if (computedLineHeight && computedFontSize) {
                        var lineHeightValue = parseFloat(computedLineHeight);
                        var fontSizeValue = parseFloat(computedFontSize);
                        if (!isNaN(lineHeightValue) && !isNaN(fontSizeValue) && fontSizeValue !== 0) {
                            var ratio = lineHeightValue / fontSizeValue;
                            var formattedValue = ratio % 1 === 0 ? ratio.toFixed(0) : ratio.toFixed(1);
                            if (['1', '1.15', '1.3', '1.5', '1.6', '2', '3'].indexOf(String(formattedValue)) === -1) {
                                formattedValue = '1.6';
                            }

                            setLineHeightValue(this, formattedValue, defaultLabel);
                            placeholderLineHeight(formattedValue, computedMargin);
                        } else {
                            setLineHeightValue(this, '1.6', defaultLabel);
                        }
                    } else {
                        setLineHeightValue(this, '1.6', defaultLabel);
                    }
                }, this);
            },
            refresh: function () {
                if (!editor.activeFilter.check(style))
                    this.setState(CKEDITOR.TRISTATE_DISABLED);
            }
        });
    }

    function setLineHeightValue(self, value, defaultLabel) {
        self.setValue(value, defaultLabel);
    }

    function getComputedStyle(element, styleName) {
        if (element.currentStyle) {
            return element.currentStyle[styleName];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(element, null).getPropertyValue(styleName);
        }
        return null;
    }

    function updateLineHeightSelection(evt, editor) {
        var selection = editor.getSelection();
        var selectedElement = selection.getStartElement();
        var lineHeightValue = '1.6';

        if (selectedElement) {
            var computedLineHeight = getComputedStyle(selectedElement.$, 'line-height');
            var computedFontSize = getComputedStyle(selectedElement.$, 'font-size');
            if (computedLineHeight && computedFontSize) {
                var lineHeightValueNum = parseFloat(computedLineHeight);
                var fontSizeValueNum = parseFloat(computedFontSize);
                if (!isNaN(lineHeightValueNum) && !isNaN(fontSizeValueNum) && fontSizeValueNum !== 0) {
                    var ratio = lineHeightValueNum / fontSizeValueNum;
                    lineHeightValue = ratio % 1 === 0 ? ratio.toFixed(0) : ratio.toFixed(1);
                }
            }
        }

        var validLineHeights = ['1', '1.15', '1.3', '1.5', '1.6', '2', '3'];

        var panel = evt.data._.panel;
        if (panel && panel._.currentBlock.element.$) {
            var panelFrame = panel._.currentBlock.element.$;
            var items = panelFrame.querySelectorAll('.cke_panel_list .cke_panel_listItem');

            items.forEach(function (item) {
                if (validLineHeights.indexOf(String(lineHeightValue)) === -1) {
                    item.classList.remove('hide-after');
                } else if (item.innerText === lineHeightValue) {
                    item.classList.add('hide-after');
                }
            });
        }
    }

    function wrapPContentWithSpan(pElement) {
        var childNodes = pElement.getChildren();

        var span = new CKEDITOR.dom.element('span');

        for (var i = 0; i < childNodes.count(); i++) {
            var child = childNodes.getItem(i);
            span.append(child);
        }
        pElement.setHtml('');
        pElement.append(span);
    }

    function placeholderLineHeight(value, computedMargin) {
        try {
            var placeholderElement = document.getElementById('editContentTipsPlaceholder');
            if (placeholderElement) {
                placeholderElement.style.lineHeight = value;
                if (computedMargin) {
                    placeholderElement.style.margin = computedMargin;
                }
                window.__currentLineHeight = value;
            }
        } catch (e) {
            console.error('获取placeholderElement', e);
        }
    }

    CKEDITOR.plugins.add('lineheight', {
        requires: 'richcombo',
        lang: 'ar,de,en,es,fr,ko,pt,zh-cn',
        init: function (editor) {
            var config = editor.config;
            addCombo(editor, 'lineheight', 'size', editor.lang.lineheight.title, config.line_height, editor.lang.lineheight.title, config.lineHeight_style, 40);

            editor.on('panelShow', function (evt) {
                if (evt.data && evt.data._.panel && evt.data._.panel.className === "cke_combopanel lineheight") {
                    setTimeout(function () {
                        updateLineHeightSelection(evt, editor);
                    }, 0);
                }
            });

            editor.on('panelHide', function (evt) {
                if (evt.data && evt.data._.panel && evt.data._.panel.className === "cke_combopanel lineheight") {

                }
            });

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
