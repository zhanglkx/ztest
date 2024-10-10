let aa = `<section
  class="stylelib-wrapper"
  contenteditable="false"
  data-theme-color="<%=themeColor%>"
  data-is-vip="<%=isVip%>"
  data-change-color="<%=canChangeColor%>"
  data-key="image-tpl4"
>
  <section class="x-vipIcon"><section style="display:none;"></section></section>
  <a href="navLink:" style="display: block;" data-link-no-cancel="true" class="stylelib-image stylelib-image-children-3">
    <section style="padding: 16px;background-color: #fff;box-shadow: 0 8px 20px 0px rgba(0, 0, 0, 0.06), 0 1px 8px rgba(0, 0, 0, 0.04);border-radius: 8px;overflow: hidden;">
      <section style="display:flex;align-items:center;margin-bottom:12px">
        <section
          data-stylelib-backgroundimage="default"
          data-stylelib-background-default-size="cover"
          data-stylelib-background-default-radius="50%"
          style="width:32px;height:32px;margin-right:12px;border-radius:50%;background-image:url(&quot;https://gstatic.clewm.net/caoliao-resource/231204/a9d81c_17061b9c.jpg&quot;);background-size:cover;"
        >
          <section style="display:none;"></section>
        </section>
        <section style="flex: 1;color:#666;font-size:14px;line-height:22px;" contenteditable="<%=contentEditable%>" data-original-text="">
          <p>
            <span style="font-size: 14px;">
              栗依集团西厂介绍
            </span>
          </p>
        </section>
      </section>
      <section style="margin-bottom:12px;color:rgba(0,0,0,0.87);" contenteditable="<%=contentEditable%>">
        <p>
          <span style="font-size: 16px;">
            2020年10月12日，栗依集团西厂正式投入运营，该厂主要进行混凝土制品的生产和加工工作，年产量预计可达500万吨，同时为该地区解决5000+个岗位。
          </span>
        </p>
      </section>
      <section
        data-stylelib-backgroundimage="default"
        data-stylelib-background-default-size="cover"
        data-stylelib-background-autofit="63%"
        style="width: 100%;padding-bottom:63%;border-radius:4px;background-color: #f6f8f9;background-image:url(&quot;https://gstatic.clewm.net/caoliao-resource/231204/a9d81c_0393263a.jpg&quot;);background-repeat: no-repeat;background-position: center;background-size: cover;"
      >
        <section style="display:none;"></section>
      </section>
    </section>
  </a>
  <section class="x-vipIcon-new"><section style="display:none;">高级版起</section></section>
</section>
`

let bb = ' <section class="x-vipIcon-new"><section style="display:none;">高级版起</section></section>'

bb.replace(/<[^>]+>/gi, '').replace(/&nbsp;/g, '')
// console.log(aa);
console.log(bb);
