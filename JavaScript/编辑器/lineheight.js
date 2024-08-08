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
        var style = styles[this.getValue()];
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

            var spanElements = node.find('span');
            var emptySpans = [];

            for (var i = 0; i < spanElements.count(); i++) {
              var span = spanElements.getItem(i);
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

        // 处理单独选中的元素
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

          var spanElements = parentP.find('span');
          var emptySpans = [];

          for (var spanItem = 0; spanItem < spanElements.count(); spanItem++) {
            var span = spanElements.getItem(spanItem);
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

                  var placeholderElement = document.getElementById('editContentTipsPlaceholder');
                  if (placeholderElement) {
                    placeholderElement.setStyle('line-height', value);
                  }

                  this.setValue(value);
                }
                return;
              }
            }
          }
          this.setValue('1.6', defaultLabel);
        }, this);
      },
      refresh: function () {
        if (!editor.activeFilter.check(style))
          this.setState(CKEDITOR.TRISTATE_DISABLED);
      }
    });
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
