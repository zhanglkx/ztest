(function () {
    function t(b, q, t, w, u, z, x, A) {
        w = b.config; var v = new CKEDITOR.style(x), e = u.split(";"); u = []; for (var k = {}, n = 0; n < e.length; n++) { var p = e[n]; if (p) { var p = p.split("/"), y = {}, r = e[n] = p[0]; y[t] = u[n] = p[1] || r; k[r] = new CKEDITOR.style(x, y); k[r]._.definition.name = r } else e.splice(n--, 1) } b.ui.addRichCombo(q, {
            label: b.lang.lineheight.title, title: b.lang.lineheight.title, toolbar: "styles," + A, allowedContent: v, requiredContent: v, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(w.contentsCss), multiSelect: !1, attributes: { "aria-label": b.lang.lineheight.title } },
            init: function () { this.startGroup(b.lang.lineheight.title); for (var d = 0; d < e.length; d++) { var a = e[d]; this.add(a, k[a].buildPreview(), a) } }, onClick: function (d) {
                b.focus(); b.fire("saveSnapshot"); var a = k[this.getValue()]; void 0 != a && b.removeStyle(a); var c = k[d]; c != a && b.applyStyle(c); for (var a = b.getSelection(), c = a.getRanges(), e = 0; e < c.length; e++) {
                    var l = new CKEDITOR.dom.walker(c[e]); l.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is("p") }; for (var g; g = l.next();) {
                        g.setStyle("line-height", d); g = g.find("span");
                        for (var h = [], f = 0; f < g.count(); f++) { var m = g.getItem(f); m.setStyle("line-height", d); "" === m.getText().trim() && h.push(m) } if (1 <= h.length) for (f = 0; f < h.length; f++)h[f].remove()
                    }
                } (a = a.getStartElement()) && a.setAttribute("data-lineheight-plugin", "true"); for (c = a.getAscendant("p", !0); a && !c;)(a = a.getParent()) && "p" === a.getName() && (c = a); if (c) {
                    c.setStyle("line-height", d); g = c.find("span"); h = []; for (a = 0; a < g.count(); a++)m = g.getItem(a), m.setStyle("line-height", d), "" === m.getText().trim() && h.push(m); if (1 <= h.length) for (f =
                        0; f < h.length; f++)h[f].remove()
                } b.fire("saveSnapshot")
            }, onRender: function () { b.on("selectionChange", function (d) { var a = this.getValue(); d = d.data.path.elements; for (var c = 0, e; c < d.length; c++) { e = d[c]; for (var l in k) if (k[l].checkElementMatch(e, !0, b)) { l != a && ((a = document.getElementById("editContentTipsPlaceholder")) && a.setStyle("line-height", l), this.setValue(l)); return } } this.setValue("1.6", z) }, this) }, refresh: function () { b.activeFilter.check(v) || this.setState(CKEDITOR.TRISTATE_DISABLED) }
        })
    } CKEDITOR.plugins.add("lineheight",
        { requires: "richcombo", lang: "ar,de,en,es,fr,ko,pt,zh-cn", init: function (b) { var q = b.config; t(b, "lineheight", "size", b.lang.lineheight.title, q.line_height, b.lang.lineheight.title, q.lineHeight_style, 40) } })
})(); CKEDITOR.config.line_height = "1;1.15;1.3;1.5;1.6;2;3;"; CKEDITOR.config.lineHeight_style = { element: "span", styles: { "line-height": "#(size)" }, overrides: [{ element: "line-height", attributes: { size: null } }] };