function login_plugin(type, isactives, callback, withtip, ignoreCheckLogin, hasDemo) {
        var str = window.location.href.split("/").pop().split(/[?#@!$%^&*]/).shift();
        if (str == '') {
            str = "home";
        }
        var refer_from = str.replace(/[^a-z]/ig, "");
        callbackfun = callback; //回调
        change_type = isactives;

        var _domain = getDomain();
        document.domain = _domain.MAIN_DOMAIN;
        //判断是否为活码过来的情况
        if (change_type != false && typeof(change_type) != "undefined") {
            isactive = 1;
        }

        if (isactives == 10) {// 主动登录
            isactive = 10;
        } else if (isactives == 11) {// 主动注册
            isactive = 11;
        } else if (isactives == 13) {// 右上角 我的二维码
            isactive = 13;
        } else if (isactives == 14) {// 右上角 管理后台
            isactive = 14;
        } else if (isactives == 17) {// 前台二维码下载，出保存模版
            isactive = 17;
        } else if (isactives == 18) {// 快速美化器，点击下载按钮，出保存模版
            isactive = 18;
        } else if (isactives == 19) {// 升级成活码，text, 点击之后，跳转到码的编辑页面
            isactive = 19;
        } else if (isactives == 21) {// 升级成活码，url, 点击之后，跳转到码的编辑页面
            isactive = 21;
        } else if (isactives == 20) {//产品 轨道交通页面 版本于价格的立即使用，跳case案例页
            isactive = 20;
        } else if (isactives == 23) {// 右上角登陆，登陆注册分开
          isactive = 23;
        } else if (isactives == 31) {// 从美化工具保存模版
          isactive = 31;
        } else if (isactives == 32) {// 从美化工具 我的模版 tab登入
          isactive = 32;
        } else if (isactives == 33) {// 前台图片 - 从素材库选择 / 在线作图
          isactive = 33;
        }

        //判断是否有提示文案
        if (typeof withtip == "undefined") {
            withtip = 'normal';
        }
        // withtip = 0;
        //isactives=12建筑营销页.先注册，其他先登陆
        var ori_type = '';
        if (isactives === 12) {
            type = "join";
            ori_type = 'solution';
            isactive = 12;
        }

        function checkLogin() {
          var has_been_login = _getCookie('login_uid');
          if (ignoreCheckLogin) return;
          // 登录过的用户 默认出登录页面，其余的出注册页面，优先级弱于右上角两个框
          if (has_been_login) {
            type = "login";
          } else {
            type = "join";
          }
        }
        checkLogin();
        //type = "join"; //登录/注册合并
        $('body').addClass('modal-active').css('overflow', 'hidden'); //背景高斯模糊
        var checkLogin = seajs.data.checkLogin;
        var loging = 0;
        var login = ['<div class="login_plugins_bg new_login_plugins_bg'+(hasDemo ? ' has_demo' : '')+'" id="login"><div class="login_bg_new" style="background:none;">'];
        var _domain = getDomain();

        var iframeSrc = '//' + _domain.USER_DOMAIN + '/' + type + '?iframe=true&isactives=' + isactive + '&refer_from=' + refer_from + '&withtip=' + withtip +'&is_new=1&has_demo=' + (hasDemo ? 1 : 0);

        if (ori_type) {
            iframeSrc += '&ori_type=12';
        }

        login.push('<iframe src="'+iframeSrc+'" scrolling="no" frameborder="0" id="iframe">');
        login.push('</iframe>');
        login.push('<div id="close_login">×</div>');
        login.push('</div></div>');

        var link = '<link href="//' + _domain.STATIC_SERVICE + '/css/signin_plugin-new.css?v=20220331" rel="stylesheet" media="all" />';
        if (type === 'login') {
          StatisticsData(105, 147);
        } else {
          StatisticsData(105, 146);
        }
        StatisticsData(105, 110);


        $('head').append(link); //加载
        $('body').append(login.join('')); //输出 登陆框

        window.setTimeout(function() {
          /**
           * @type {HTMLIFrameElement | null}
           */
          var userIframe = document.querySelector('iframe#iframe');

          if (userIframe) {
            userIframe.addEventListener('load', function() {
                try {
                  console.log('获取iframe href: ', userIframe.contentWindow.location.href);
                } catch (err) {
                  if (err instanceof DOMException && err.name === 'SecurityError') {
                    window.location.href = '//' + _domain.USER_DOMAIN + '/' + type + '?referer=' + encodeURIComponent(window.location.href) + '&cross_origin=1';
                  }
                }
            });
          }
        }, 0);

        //关闭弹框
        $('#close_login').click(function() {
            //当关闭窗口时，调用回调函数
            typeof callbackfun==="function"&&callbackfun(-1);
            var which_page = $(this).parent().find('iframe').attr('which_page');

            if (!which_page) {
                which_page = 1;
            } else {
                which_page = parseInt(which_page, 10);
            }

            switch (which_page) {
                case 1:
                    StatisticsData(105, 124); // 登录页面 关闭按钮
                    IframeCloseFrom(isactive, 'LOGIN');
                    break;
                case 2:
                    StatisticsData(105, 125); // 登录页面 -- 设置密码 关闭按钮
                    IframeCloseFrom(isactive, 'SET_PASSWORD');
                    break;
                case 3:
                    StatisticsData(105, 126); // 登录页面 -- loading 关闭按钮
                    IframeCloseFrom(isactive, 'LOGINLODING');
                    break;
                case 4:
                    StatisticsData(105, 127); // 注册页面 -- 关闭按钮
                    IframeCloseFrom(isactive, 'REGISTER');
                    break;
                case 5:
                    StatisticsData(105, 128); // 注册页面 -- 授权页面 关闭按钮
                    IframeCloseFrom(isactive, 'REGISTER_AUTH');
                    break;
                case 6:
                    StatisticsData(105, 129); // 注册页面 -- loading 关闭按钮
                    IframeCloseFrom(isactive, 'REGISTERLODING');
                    break;
                default:
                    StatisticsData(105, 130); // 登录页面 -- 没定为到页面 关闭按钮
                    IframeCloseFrom(isactive, 'LOGIN');
                    break;
            }

            // 关闭弹窗点击（统计数据）
            StatisticsData(2, 6);

            $('#login').remove();
            isactive = 2; //关闭弹框恢复默认的参数
            $('body').removeClass('modal-active').css('overflow', 'auto'); //背景高斯模糊
        });
    }