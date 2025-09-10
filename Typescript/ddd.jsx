import {
    Block,
    View,
    Label,
    Input,
    Text,
    Radio,
    Button,
    Icon,
    Navigator,
} from "@tarojs/components";
import {
    hideShareMenu,
    getCurrentInstance,
    showToast,
    getApp,
    navigateBack,
    showModal,
    hideLoading,
    showLoading,
    redirectTo,
    switchTab,
    navigateTo,
} from "@tarojs/taro"; /* eslint-disable */
import React from "react";
import request from "@/common/utils/request";
import "./index.scss";
import config from "@/common/utils/config/config.js";
import EventEmitter from "@/common/utils/EventEmitter.js";
import watcher from "@/common/utils/oldWatcher.js";
import login from "@/common/utils/login.js";
import user from "@/common/utils/user";
import util from "@/common/utils/util.js";
import { Base64 } from "@/common/utils/base64.js";

class P extends React.Component {
    constructor(props) {
        super(props);
        this.currentInstance = getCurrentInstance();
        const currentPages = getCurrentPages();
        console.log("currentPages new", currentPages);
        try {
          // 尝试设置 currentPage 和 params
          this.currentPage = (currentPages && currentPages[currentPages.length - 1]) || {};
          this.params = JSON.parse(JSON.stringify(this.currentPage.$taroParams || {}));
      } catch (error) {
          // 如果发生错误，则捕获并打印错误信息
          this.sendWatcher("c_wallet_wechatrealname_constructor_catch",error);
      }
        this.state = {
            complianceText: "",
            agreementList: [
                // {
                // protocolTitle: 'sdfds',
                // protocolId: ''
                // }
            ],
            agreementChecked: false, //协议是否点击

            focusKey: 0, //input foucs data
            inputKeys: {},
            focusList: {
                //input focusArr
                2: false,
            },
            cinputData: {
                //Multiple input box set val
                2: "",
            },
            weakAuthData: null, //弱实名用户数据
            formApp: false, //是否是APP过来实名的
            token: "", //CBU服务端传值token
            extData: null, //跳转用户实名授权小程序所需参数
            canSubmit: false, //是否可提交实名
            modelSubmit: false, //获取服务签名成功
            realNamed: false, //微信验证实名失败
            realSuccess: false,
            realNames: false, //是否是弱实名提交
            showModal: false, //是否展示自定义的modal提示框
            appReturnData:
                "finance/trans?type=realname&status=1&certWay=wechat", //返回APP带上的参数
            logined: false,
            needGetAuthCode: false,
            showToAppBtn: true, //展示返回APP按钮
            showModifyRemind: false, // 是否展示实名提示
            referFrom: 0, // 0小程序，1APP，2H5
        };
        this.isJumpAuth = false;
        this.needAuth = true;
        this.isSubmitting = false;
    }
    pageName = "setrealname";
    submitTags = {
        //form check tag
        name: false,
        idCard: false,
    };
    optionsData = {
        token: "",
        pageSource: "",
        scene: "",
        miniAppBack: false,
        onceLogin: false,
        isNavBack: false,
    };

    componentWillMount() {
        hideShareMenu();
        let queryObj = this.params;
        console.log("queryObj new", queryObj);
        this.initData(queryObj);
    }

    initData = (queryObj) => {
        const that = this;
        //that.env = process.env.BUILD_ENV;
        //that.domain = that.env === 'beta' ? 'http://bindcardcert.beta.qunar.com' : 'https://pay.qunar.com';
        console.log("queryObj new initData", queryObj);
        const pageSource = queryObj.pageSource;
        const token = queryObj.token;
        const isNavBack = queryObj.isNavBack || false;
        const navBackPath = queryObj.navBackPath;
        const fromAppId = queryObj.fromAppId; // 三方过来的appid
        const navBackOnly = queryObj.navBackOnly || false; // 只执行redirectTo, 不执行goback
        const scene = queryObj.scene || "";
        const isFromWallet = queryObj.isFromWallet || false;
        const clientType = Number(queryObj.clientType) || 0;

        that.sendWatcher("c_payWallet_pageLoad", {
            ...queryObj,
        });
        if (!pageSource && !token) {
            that.showModal("系统异常，请重试- E001", () => {
                that.goBack();
            });
            that.sendWatcher("c_payWallet_pageParamsErr");
        }

        if (clientType == 1) {
            //APP跳转过来实名的
            that.setState({
                formApp: true,
                referFrom: clientType,
            });
        } else {
            that.setState({
                referFrom: clientType,
            });
        }

        that.optionsData.token = token;
        that.optionsData.pageSource = pageSource;
        that.optionsData.scene = scene;
        that.optionsData.isNavBack = isNavBack;
        that.optionsData.isFromWallet = isFromWallet;
        that.optionsData.fromAppId = fromAppId;

        if (navBackPath) {
            that.optionsData.navBackPath = decodeURIComponent(navBackPath);
            that.optionsData.navBackOnly = navBackOnly;
        }

        setTimeout(function () {
            watcher.pv({
                page: that.pageName,
                from: pageSource,
                scene: scene,
            });
        }, 1000);
        that.sendWatcher("realNameAuthFirstPageLoad");
        that.signGet();
    };

    gotoLogin = () => {
        login(this.loginCallback.bind(this), {
            source: "pay-auth",
        });
        this.sendWatcher("loginBeforeAuth");
    };

    loginCallback = () => {
        const me = this;
        me.setState({
            logined: true,
        });
        me.signGet();
        me.sendWatcher("loginAuthCallBack");
        // const me = this;
        // EventEmitter.addListener('getRealNameAuthData', data => {
        //     me.initData(data);
        // });
    };

    async componentDidShow(options) {
        const that = this;
        // onshow时，有可能值会改变，重新赋值
        const params = this.currentInstance.router.params;
        try {
          this.params = JSON.parse(JSON.stringify(params || {}))||{};
        } catch (error) {
          this.sendWatcher("c_wallet_wechatrealname_componentDidShow_catch",error);
        }
        const userLoginStatus = await user.checkLogin();
        const isLogin = userLoginStatus.data && userLoginStatus.data.isLogin;
        if (!userLoginStatus.ret) {
            showToast({
                icon: "none",
                title: userLoginStatus.errMsg || "查询登录失败",
                duration: 1500,
            });
            return;
        }

        if (!isLogin) {
            that.gotoLogin();
            that.optionsData.onceLogin = true;
            return;
        } else {
            const { logined } = that.state;
            if (!logined) {
                that.setState({
                    logined: true,
                });
            }
        }

        const { globalData = {} } = getApp();
        const scene =
            (globalData.appShowOptions && globalData.appShowOptions.scene) ||
            "";
        const referrerInfo =
            (globalData.appShowOptions &&
                globalData.appShowOptions.referrerInfo) ||
            {};

        if (scene === 1038) {
            if (that.optionsData.miniAppBack) {
                const { extraData } = referrerInfo;
                that.sendWatcher("navigateToMiniProgramBack");
                that.optionsData.miniAppBack = false;
                that.setState({
                    canSubmit: true,
                });

                if (extraData && extraData.auth_code) {
                    that.sendWatcher("navigateToMiniProgramSccuess");
                    that.authToken = extraData.auth_code;
                    setTimeout(function () {
                        that.hideLoading();
                        that.formSubmiting();
                    }, 60);
                } else {
                    that.hideLoading();
                }
            }
        }
    }

    goBack = () => {
        navigateBack({
            delta: 1,
        });
        this.sendWatcher("auth_complete");
    };

    callPayCallback = () => {
        EventEmitter.dispatch("onAuthComplete");
    };

    componentWillUnmount() {
        if (this.optionsData.pageSource === "q_wechatmini_payment") {
            this.callPayCallback();
        }
        this.sendWatcher("c_wallet_wechatrealname_back");
    }

    sendWatcher = (actionType, queryStr = "") => {
        try {
            const query = {};
            query["action-type"] = actionType;
            query.from = this.optionsData.pageSource;
            query.scene = this.optionsData.scene;
            query.page = this.pageName || "setrealname";
            query.messageStr = queryStr && JSON.stringify(queryStr);
            query._exclude = false;
            console.log(query);
            watcher.click(query);
        } catch (error) {
            const query = {};
            query["action-type"] = "sendWatcher-catch";
            query.from = this.optionsData.pageSource;
            query.scene = this.optionsData.scene;
            query.page = this.pageName || "setrealname";
            query._exclude = false;
            console.log("sendWatcher-catch", query);
            watcher.click(query);
        }
    };

    getAppId = () => {
        this.sendWatcher("getAppId");
        let accountInfo = {};
        if (process.env.ANU_ENV === "wx") {
            accountInfo = wx.getAccountInfoSync();
        }
        const miniProgram = accountInfo.miniProgram || {};
        return miniProgram.appId || "";
    };

    sendRequest = (serverCode, data) => {
        const that = this;
        const requestUrl = `/mobile/member/cqmiddleplatform/dispatcher.htm`;
        const optionsData = that.optionsData;
        const openid = that.getMktOpenid();
        const appId = that.getAppId();
        const { token, pageSource, scene, onceLogin } = optionsData;

        let globalPload = {};
        globalPload.payload = {
            ver: "8.23",
            cver: "8.13",
            plat: 5,
            mchid: "CTRP",
            openId: openid,
            appId: appId,
            scene: scene,
        };

        if (token) {
            globalPload.payload.token = token;
        } else {
            globalPload.payload.pageSource = decodeURIComponent(pageSource);
        }

        globalPload.head = {
            cid: "",
            ctok: "",
            cver: "1.0",
            lang: "01",
            sid: "8888",
            syscode: "09",
            auth: null,
        };
        globalPload.requestHead = JSON.stringify({
            serviceCode: serverCode,
            loginType: "QUNAR",
        });

        const payloadData = Object.assign(globalPload.payload, data);
        globalPload.payload = JSON.stringify(payloadData);
        const initUserData = util.getGlobalInfo();
        return new Promise((resolve, reject) => {
            if (openid == "") {
                that.sendWatcher("nothas_openid");
                return reject();
            }
            request(
                {
                    service: requestUrl,
                    method: "POST",
                    returnAll: true,
                    data: globalPload,
                    param: {
                        subEnv: "fat20",
                    },
                    success: function (res = {}) {
                        const { ResponseStatus, payload } = res.data;
                        const { Ack, Errors } = ResponseStatus;
                        let resData = {};
                        if (Ack == "Success" && payload) {
                            resData = JSON.parse(payload);
                            resolve(resData);
                        } else {
                            let errMsgs = {};
                            if (Array.isArray(Errors)) {
                                errMsgs = Errors[0];
                            } else {
                                if (
                                    Object.prototype.toString
                                        .call(Errors)
                                        .toLowerCase() == "[object object]" &&
                                    !Errors.length
                                ) {
                                    errMsgs = Errors;
                                } else {
                                    errMsgs.Message = Errors;
                                }
                            }

                            const messageStr = errMsgs.Message || "";
                            if (
                                messageStr.includes("auth for authentication")
                            ) {
                                if (!onceLogin) {
                                    that.gotoLogin();
                                }
                                that.sendWatcher(
                                    "no_auth_for_authentication",
                                    messageStr + "onceLogin: " + onceLogin,
                                );
                                return;
                            }

                            if (messageStr.includes("Unable to deserialize")) {
                                that.sendWatcher(
                                    "unable_to_deserialize",
                                    messageStr,
                                );
                            } else {
                                that.sendWatcher(
                                    "request_ackfail_errmsg",
                                    messageStr,
                                );
                            }
                            reject(res);
                        }
                    },
                    fail: function (err) {
                        reject(err);
                    },
                },
                initUserData,
            );
        });
    };

    showToast = (title, callBack) => {
        showToast({
            title: title,
            icon: "none",
            duration: 1000,
            success: function () {
                setTimeout(function () {
                    if (callBack && typeof callBack == "function") {
                        return callBack();
                    }
                }, 100);
            },
        });
    };

    showModal = (text, callBack) => {
        showModal({
            title: "提示",
            content: text,
            showCancel: false,
            success(res) {
                if (callBack && typeof callBack == "function") {
                    return callBack();
                }
            },
        });
    };

    hideLoading = () => {
        hideLoading();
    };

    checkIDCard = (id) => {
        if (
            !id ||
            typeof id != "string" ||
            (id.length != 15 && id.length != 18) ||
            (!id.match(/^[0-9]{15}$/) && !id.match(/^[0-9]{17}[0-9xX]$/)) ||
            "111111111111111" == id
        ) {
            return false;
        }

        const area = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外",
        };

        const areaName = area[id.substr(0, 2)];

        if (!areaName) {
            return false;
        }

        let year;
        let month;
        let day;
        if (id.length == 15) {
            year = parseInt(id.substr(6, 2));
            month = parseInt(id.substr(8, 2));
            day = parseInt(id.substr(10, 2));
        } else {
            year = parseInt(id.substr(6, 4));
            month = parseInt(id.substr(10, 2));
            day = parseInt(id.substr(12, 2));
        }

        if (month > 12) {
            return false;
        }
        if (day > 31) {
            return false;
        }
        // February can't be greater than 29 (leap year calculation comes later)
        if (month == 2 && day > 29) {
            return false;
        }
        // check for months with only 30 days
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            if (day > 30) {
                return false;
            }
        }
        // if 2-digit year, use 50 as a pivot date
        if (year < 100) {
            year += 1900;
        }
        if (year > 9999) {
            return false;
        }
        // check for leap year if the month and day is Feb 29
        if (month == 2 && day == 29) {
            const div4 = year % 4;
            const div100 = year % 100;
            const div400 = year % 400;
            // if not divisible by 4, then not a leap year so Feb 29 is invalid
            if (div4 != 0) {
                return false;
            }
            // at this point, year is divisible by 4. So if year is divisible by
            // 100 and not 400, then it's not a leap year so Feb 29 is invalid
            if (div100 == 0 && div400 != 0) {
                return false;
            }
        }

        // date is valid
        const birthDay = new Date(year, month - 1, day);

        if (
            birthDay - new Date() >= 0 ||
            birthDay - new Date(1850, 1, 1) <= 0
        ) {
            return false;
        }

        const lastNum = id.length == "15" ? id.substr(14, 1) : id.substr(16, 1);
        let sex =
            lastNum == "1" ||
            lastNum == "3" ||
            lastNum == "5" ||
            lastNum == "7" ||
            lastNum == "9"
                ? "1"
                : "0";
        sex == "1" ? "男" : "女";
        if (id.length == "15") {
            return true;
        }

        const getLastValidationLetter = function (str) {
            const strArray = new Array(17);
            // 存储身份证的前17为数字
            const Wi = new Array(
                7,
                9,
                10,
                5,
                8,
                4,
                2,
                1,
                6,
                3,
                7,
                9,
                10,
                5,
                8,
                4,
                2,
                1,
            );
            // 表示第i位置上的加权因子
            const Y = new Array(
                "1",
                "0",
                "X",
                "9",
                "8",
                "7",
                "6",
                "5",
                "4",
                "3",
                "2",
            );
            // 校验码值
            let S = 0;
            // 十七位数字本体码加权求和
            let jym = 0;
            // 校验码
            for (let i = 16; i >= 0; i -= 1) {
                strArray[i] = Number(str.charAt(i));
            }

            for (let j = 16; j >= 0; j -= 1) {
                S += strArray[j] * Wi[j];
            }

            jym = S % 11;
            return Y[jym];
        };

        if (id.substr(17, 1) != getLastValidationLetter(id.substr(0, 17))) {
            return false;
        }

        return true;
    };

    WalletGetAuthCodeModel = (data, opts) => {
        const that = this;
        that.sendRequest("32007201", data)
            .then((res) => {
                return opts.onSuccess(res);
            })
            .catch((err) => {
                return opts.onError(err);
            });
    };

    WalletSetRealNameModel = (data, opts) => {
        const that = this;
        that.sendRequest("32007202", data)
            .then((res) => {
                return opts.onSuccess(res);
            })
            .catch((err) => {
                return opts.onError(err);
            });
    };

    WalletCheckAgeModel = (data, opts) => {
        const that = this;
        that.sendRequest("32005530", data)
            .then((res) => {
                return opts.onSuccess(res);
            })
            .catch((err) => {
                return opts.onError(err);
            });
    };

    checkAge = (idNo) => {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.WalletCheckAgeModel(
                {
                    idNo: idNo,
                    scene: 1,
                },
                {
                    onSuccess: (data) => {
                        if (data.rc === 0) {
                            resolve(data.age);
                        } else {
                            reject({
                                rc: data.rc,
                                rmsg: data.rmsg,
                            });
                        }
                    },
                    onError: function (e) {
                        reject({
                            rc: 10001,
                            rmsg: "服务异常，请重试！-E08",
                        });
                    },
                },
            );
        });
    };

    //all input focus action
    //CN 输入框获取焦点动作
    focusAction = (e) => {
        const that = this;
        const eKeys = Number(e.currentTarget.dataset.key);
        that.dKeys = that.state.focusKey;

        if ((that.dKeys & eKeys) != eKeys) {
            that.setState({
                focusKey: eKeys + that.dKeys,
            });
        }
    };
    //all input blur action
    //CN 输入框失去焦点动作
    blurAction = (e) => {
        const that = this;
        const val = e.detail.value;
        const vLen = val.length;
        const eKeys = Number(e.currentTarget.dataset.key);
        that.dKeys = that.state.focusKey;
        if (vLen > 0) {
            if (eKeys == 1 && !that.submitTags.name) {
                //名字校验
                that.showToast(
                    "请输入中文姓名，不能包含数字、字母、特殊字符，· 除外",
                );
            }
            if (eKeys == 2 && !that.submitTags.idCard) {
                //名字校验
                that.showToast("请输入正确的证件号码");
            }

            if ((that.dKeys & eKeys) != eKeys) {
                that.dKeys = that.dKeys + eKeys;
            }
        } else {
            if (eKeys == 1) {
                //名字校验
                that.showToast("请输入您的真实姓名");
            }
            if (eKeys == 2) {
                //名字校验
                that.showToast("请输入证件号码");
            }
            if ((that.dKeys & eKeys) == eKeys) {
                that.dKeys = that.dKeys - eKeys;
            }
        }

        that.setState({
            focusKey: that.dKeys,
        });
    };
    //set card police input with val focus status
    //CN 多功能输入框点击获取焦点动作
    activeInput = (e) => {
        const that = this;
        const key = e.currentTarget.dataset.key;
        const { focusList } = that.state;
        const activeFocus = Object.assign(focusList, {});

        for (let key in activeFocus) {
            activeFocus[key] = false;
        }

        that.setState(
            {
                focusList: activeFocus,
            },
            function () {
                activeFocus[key] = true;
                that.setState({
                    focusList: activeFocus,
                });
            },
        );
    };
    //EN setting idcard format and val
    //CN 设置身份证号6位与8位分割
    idCardEvent = (val) => {
        return val.replace(/(^\d{6}|\d{8}\B)/g, "$1 ");
    };
    //EN all input dom input event action
    //CN 监听所有输入框输入动作
    bindKeyInput = (e) => {
        const that = this;
        let submitBit = false;
        const val = e.detail.value;
        const key = e.currentTarget.dataset.key;

        const {
            inputKeys,
            cinputData,
            agreementChecked,
            agreementList = [],
        } = that.state;
        const cVal = Object.assign(inputKeys, {});
        const cinputVal = Object.assign(cinputData, {});
        cVal[key] = val;

        if (key == "1") {
            //名字校验
            const varTrim = val.replace(/(^\s*)|(\s*$)/g, "");
            if (varTrim.length > 1) {
                that.submitTags.name = true;
            } else {
                that.submitTags.name = false;
            }
        } else if (key == "2") {
            //身份证校验
            const checkedId = that.checkIDCard(val);
            if (checkedId) {
                that.submitTags.idCard = true;
            } else {
                that.submitTags.idCard = false;
            }
            cinputVal[key] = that.idCardEvent(val);
        }

        //对必填字段做特校验
        const { name, idCard } = that.submitTags;
        if (
            name &&
            idCard &&
            (agreementList.length > 0 ? agreementChecked : true)
        ) {
            submitBit = true;
        }
        that.setState({
            inputKeys: cVal,
            cinputData: cinputVal,
            canSubmit: submitBit,
        });
    };
    //EN hide customize modal component
    //CN 隐藏自定义的CONFIRM 弹出框
    hideModal = () => {
        this.sendWatcher(
            "c_wallet_wechatrealname_abnormal_cancel",
            "用户点击了alert-取消按钮",
        );
        this.setState({
            showModal: false,
        });
    };
    //EN The verification of the name and ID card service failed, the user revises the operation again
    //CN 姓名与身份证服务校验失败，用户修改再次校操作
    againSubmit = () => {
        const that = this;
        const { realNames } = that.state;

        console.log("点我提交了。。。。。。。。。。。。againSubmit");
        that.sendWatcher("c_payWallet_againSubmitByUser", {
            func: "againSubmit",
            desc: "姓名与身份证服务校验失败，用户修改再次校操作",
            status: "当前实名状态：" + realNames,
        });
        if (!realNames) {
            that.setState({
                showModal: false,
            });
            that.signGet((data = {}) => {
                const { code, authStatus } = data;
                if (code == 0 && authStatus != 1) {
                    that.formSubmiting();
                }
            });
        } else {
            that.sendWatcher(
                "c_wallet_wechatrealname_abnormal_confirm",
                "用户点击了alert-确认按钮",
            );
            that.formSubmiting();
        }
    };

    // 跳转实名授权
    submitRealname = () => {
        const that = this;
        console.log("点我提交了。。。。。。。。。。。。submitRealname");
        if (!this.state.canSubmit || this.isJumpAuth || this.isSubmitting) {
            that.sendWatcher("c_payWallet_submitRealname 重复授权节流", {
                type: "c_payWallet_this.isJumpAuth",
                val: "submitRealname 节流",
            });
            return;
        }
        this.isJumpAuth = true;
        setTimeout(() => {
            this.isJumpAuth = false;
        }, 6000);

        that.sendWatcher("c_payWallet_submitRealname", {
            val: "用户点击跳转授权",
            extData: this.state.extData,
        });
        wx.navigateToMiniProgram({
            appId: "wx88736d7d39e2eda6", // 要打开的小程序 appId
            path: "/pages/oauth/authindex", // 打开的页面路径，如果为空则打开首页。
            extraData: this.state.extData, // 需要传递给目标小程序的数据
            envVersion: "release",
            success: () => {
                this.miniSuccess();
            },
            fail: (res) => {
                this.miniFail(res);
            },
        });
    };

    //EN Failed to obtain token service by default, user clicks OK button to obtain token service again
    //CN 默认获取token服务失败，用户点击确定按钮再次获取token服务
    doSignGet = () => {
        console.log("7201失败了，再次点击了。。。。。。。。。。。。");
        const that = this;
        that.sendWatcher("c_payWallet_tokenGetByUser", {
            func: "doSignGet",
            desc: "默认获取token服务失败，用户点击确定按钮再次获取token服务",
        });
        that.signGet((data = {}) => {
            const { code, needAuth, authStatus } = data;
            that.needAuth = needAuth;
            if (code == 0) {
                const setStateData = {
                    needGetAuthCode: false,
                };

                if (needAuth) {
                    setStateData.needGetAuthCode = true;
                    setStateData.showModal = true;
                    that.sendWatcher("c_payWallet_needGetAuthCode");
                } else {
                    if (authStatus != 1) {
                        that.formSubmiting();
                    }
                }

                that.setState(setStateData);
            }
        });
    };

    isAndroid = () => {
        try {
            const systemInfo = getApp().globalData.systemInfo;
            const isAndroid = systemInfo.system
                .toLowerCase()
                .includes("android");
            return isAndroid;
        } catch (e) {
            return false;
        }
    };
    //EN Get service toke and WeChat authorization signature
    //CN 获取服务toke与微信授权签名
    signGet = (callBack) => {
        let queryObj = this.params;

        const that = this;
        that.sendWatcher("c_payWallet_tokenGet");
        const signRequestData = {
            thirdCode: "auth_wechatapplet",
        };

        showLoading({
            mask: true,
            title: "加载中.",
        });
        this.isSubmitting = true;

        that.WalletGetAuthCodeModel(signRequestData, {
            onSuccess: function (data = {}) {
                that.hideLoading();
                that.isSubmitting = false;
                that.sendWatcher(
                    "c_payWallet_tokenGetOk",
                    JSON.stringify(data),
                );
                const returnUrlLink = data.returnUrl;
                const finishUrlLink = data.finishUrl;
                if (data.rc == 0) {
                    const {
                        needAuth,
                        info,
                        token,
                        authInfo,
                        pageSource,
                        showToAppBtn,
                        authComplianceInfo = {},
                        showModifyRemind = false,
                    } = data;
                    that.needAuth = needAuth;
                    that.optionsData.token = token; //更新token
                    if (pageSource) {
                        that.optionsData.pageSource = pageSource;
                    }
                    that.sendWatcher("c_payWallet_tokenGetInfo", info);
                    const {
                        authStatus,
                        weakAuth,
                        idNo,
                        idNoCrypt,
                        userName,
                        userNameMask,
                    } = authInfo;

                    if (authStatus == 1) {
                        const returnUrlStr = that.getReturnUrl(
                            returnUrlLink,
                            true,
                        );
                        const finishUrlStr = that.getReturnUrl(
                            finishUrlLink,
                            true,
                        );
                        if (weakAuth) {
                            const setDatas = {
                                inputKeys: {
                                    1: userNameMask,
                                    2: idNoCrypt,
                                },
                                focusKey: 3,
                                cinputData: {
                                    2: idNo,
                                },
                                weakAuthData: {
                                    idNo,
                                    idNoCrypt,
                                    userName,
                                    userNameMask,
                                },
                                modelSubmit: false,
                                realNamed: true,
                                canSubmit: true,
                                realNames: true,
                                appReturnData: finishUrlStr,
                                showToAppBtn: showToAppBtn,
                                showModifyRemind,
                            };

                            if (needAuth) {
                                let infoJson = null;
                                try {
                                    infoJson = JSON.parse(info);
                                } catch (e) {}

                                setDatas.extData = infoJson;
                                setDatas.modelSubmit = true;
                                setDatas.needGetAuthCode = true;
                            }
                            that.setState(setDatas);
                        } else {
                            that.setState({
                                weakAuthData: {
                                    idNo,
                                    idNoCrypt,
                                    userName,
                                    userNameMask,
                                },
                                appReturnData: returnUrlStr,
                                realSuccess: true,
                                showToAppBtn: showToAppBtn,
                                showModifyRemind,
                            });
                        }
                    } else {
                        const finishUrlStr = that.getReturnUrl(
                            finishUrlLink,
                            false,
                        );
                        if (needAuth) {
                            let infoJson = null;
                            try {
                                infoJson = JSON.parse(info);
                            } catch (e) {}

                            that.setState({
                                appReturnData: finishUrlStr,
                                extData: infoJson,
                                modelSubmit: true,
                                needGetAuthCode: true,
                                showToAppBtn: showToAppBtn,
                                complianceText:
                                    authComplianceInfo.complianceText,
                                agreementList:
                                    authComplianceInfo.protocolList || [],
                                showModifyRemind,
                            });
                        } else {
                            that.setState({
                                appReturnData: finishUrlStr,
                                realNamed: true,
                                showToAppBtn: showToAppBtn,
                                complianceText:
                                    authComplianceInfo.complianceText,
                                agreementList:
                                    authComplianceInfo.protocolList || [],
                                showModifyRemind,
                            });
                        }
                    }

                    if (callBack) {
                        callBack({ code: 0, authStatus, needAuth });
                    }
                } else {
                    const finishUrlStr = that.getReturnUrl(
                        finishUrlLink,
                        false,
                    );
                    that.setState({
                        appReturnData: finishUrlStr,
                        showModifyRemind: false,
                    });

                    if (callBack) {
                        if (data.rc == 5002) {
                            const msg =
                                data.rmsg || "系统异常，请稍后重试！-E07";
                            that.showToast(msg);
                        } else {
                            that.showToast("服务异常，请重试！-E03");
                        }
                    }
                }
            },
            onError: function () {
                that.hideLoading();
                that.isSubmitting = false;
                that.sendWatcher("c_payWallet_tokenGetFail");
                if (callBack) {
                    that.showToast("服务异常，请重试！-E04");
                }
            },
        });
    };
    getReturnUrl = (returnUrl, realNamed) => {
        const that = this;
        if (
            (returnUrl === "" && that.isAndroid()) ||
            this.optionsData.isFromWallet
        ) {
            if (realNamed) {
                return "finance/trans?type=realname&status=0&certWay=wechat";
            } else {
                return "finance/trans?type=realname&status=1&certWay=wechat";
            }
        } else {
            const returnUrlArrs = returnUrl.split("|");
            const returnUrlPath = returnUrlArrs[1] || "";
            let deReturnUrl = decodeURIComponent(returnUrlPath);
            const hasParams = deReturnUrl.includes("?");
            if (deReturnUrl == returnUrlPath) {
                if (hasParams) {
                    if (realNamed) {
                        deReturnUrl =
                            returnUrlPath +
                            "&type=realname&status=0&certWay=wechat";
                    } else {
                        deReturnUrl =
                            returnUrlPath +
                            "&type=realname&status=1&certWay=wechat";
                    }
                } else {
                    if (realNamed) {
                        deReturnUrl =
                            returnUrlPath +
                            "?type=realname&status=0&certWay=wechat";
                    } else {
                        deReturnUrl =
                            returnUrlPath +
                            "?type=realname&status=1&certWay=wechat";
                    }
                }
            } else {
                if (hasParams) {
                    if (realNamed) {
                        deReturnUrl =
                            deReturnUrl +
                            "&type=realname&status=0&certWay=wechat";
                    } else {
                        deReturnUrl =
                            deReturnUrl +
                            "&type=realname&status=1&certWay=wechat";
                    }
                } else {
                    if (realNamed) {
                        deReturnUrl =
                            deReturnUrl +
                            "?type=realname&status=0&certWay=wechat";
                    } else {
                        deReturnUrl =
                            deReturnUrl +
                            "?type=realname&status=1&certWay=wechat";
                    }
                }
            }

            if (that.optionsData.pageSource == "q_wechatmini_payment") {
                return "hy?url=" + encodeURIComponent(deReturnUrl);
            } else {
                const strRegex = "^((https|http|ftp|file)?://)";
                const urlReg = new RegExp(strRegex);

                if (urlReg.test(deReturnUrl)) {
                    return "hy?url=" + encodeURIComponent(deReturnUrl);
                }

                return deReturnUrl;
            }
        }
    };
    //EN Submit user real name information to server for verification
    //CN 提交用户实名信息到服务端验证
    formSubmiting = () => {
        const that = this;
        if (this.isSubmitting) {
            that.sendWatcher("isSubmitting 防重");
            return;
        }
        this.isSubmitting = true;
        setTimeout(() => {
            this.isSubmitting = false;
        }, 6000);
        that.sendWatcher("c_wallet_wechatrealname_submit", "提交验证实名信息");
        const { canSubmit, inputKeys, realNames, weakAuthData } = that.state;
        if (canSubmit) {
            showLoading({
                mask: true,
                title: "实名认证中",
            });
            const idNoEn = Base64.encode(inputKeys["2"]);
            const userInfo = {
                name: inputKeys["1"] && inputKeys["1"].trim(),
                idNo: idNoEn,
                idType: 1,
            };

            if (realNames) {
                userInfo.name = weakAuthData.userName;
            }

            const realNameUpdate = {
                userInfo: userInfo,
                authCode: that.needAuth ? that.authToken : "",
            };

            that.WalletSetRealNameModel(realNameUpdate, {
                onSuccess: function (data = {}) {
                    that.hideLoading();
                    that.isSubmitting = false;
                    that.sendWatcher("c_payWallet_realname_submitok");
                    if (data.rc == 0) {
                        that.setState({
                            realSuccess: true,
                        });
                        if (
                            that.optionsData.pageSource ==
                            "q_wechatmini_payment"
                        ) {
                            that.sendWatcher("ctripwechatmini_paymentBack");
                            that.setState({
                                canSubmit: false,
                            });
                            //that.callPayCallback();
                            that.showToast("实名认证成功", () => {
                                that.goBack();
                            });
                        } else if (that.optionsData.isNavBack) {
                            const return_Url = data.returnUrl;
                            const navBackPath = that.optionsData.navBackPath;
                            const navBackOnly = that.optionsData.navBackOnly;
                            that.sendWatcher(
                                "ctripwechatmini_payment_isNavBack",
                            );
                            if (!navBackPath && !return_Url) {
                                that.showToast("实名完成", () => {
                                    that.goBack();
                                    that.sendWatcher(
                                        "ctripwechatmini_paymentNavBack_goBack",
                                    );
                                });
                            } else {
                                const return_UrlArr = return_Url.split("|");
                                const backPath = navBackPath
                                    ? navBackPath
                                    : return_UrlArr[1];
                                that.showToast("实名认证完成", () => {
                                    redirectTo({
                                        url: backPath,
                                    });
                                    if (!navBackOnly) {
                                        that.goBack();
                                    }
                                    that.sendWatcher(
                                        "ctripwechatmini_paymentNavBack_redirectTo",
                                    );
                                });
                            }
                        } else {
                            const idNo = inputKeys["2"] || "";
                            const idNoFirst = idNo.substr(0, 1);
                            const idNoLen = idNo.length;
                            const idNoEnd = idNo.substr(idNoLen - 1, 1);
                            const userName = inputKeys["1"] || "";
                            const userNameLen = userName.length;
                            const userNameEnd = userName.substr(
                                userNameLen - 1,
                                1,
                            );
                            const userNameMask = userNameEnd.padStart(
                                userNameLen,
                                "*",
                            );
                            const idNoMask =
                                idNoFirst.padEnd(idNoLen - 1, "*") + idNoEnd;
                            const { returnUrl } = data;

                            that.sendWatcher(
                                "c_payWallet_app_returnUrl",
                                returnUrl,
                            );

                            let returnUrlStr = that.getReturnUrl(
                                returnUrl,
                                true,
                            );

                            that.setState({
                                realSuccess: true,
                                appReturnData: returnUrlStr,
                                weakAuthData: {
                                    idNo: idNoMask,
                                    userNameMask: userNameMask,
                                },
                            });
                        }
                    } else if (data.rc == 6007) {
                        wx.showModal({
                            content:
                                "您当前未满18周岁，无法为您提供实名认证服务",
                            confirmText: "知道了",
                            showCancel: false,
                            success: function (res) {},
                        });
                        return;
                    } else {
                        that.setState({
                            modelSubmit: false,
                            showModal: false,
                            realNamed: true,
                        });
                        const msg = data.rmsg || "系统异常，请稍后重试！-E05";
                        that.showModal(msg);
                        if (data.rc == 1003) {
                            that.sendWatcher(
                                "c_wallet_wechatrealname_reenter",
                                msg,
                            );
                        } else {
                            that.sendWatcher(
                                "c_wallet_wechatrealname_notmatch",
                                msg,
                            );
                        }
                        that.signGet();
                    }
                },
                onError: function (data = {}) {
                    that.hideLoading();
                    that.isSubmitting = false;
                    that.sendWatcher("c_payWallet_realname_submitfail");
                    that.setState({
                        modelSubmit: false,
                        realNamed: true,
                    });
                    const msg = data.rmsg || "系统异常，请稍后重试！-E06";
                    that.showModal(msg);
                },
            });
        }
    };
    //EN Get market OPENID
    //CN 获取市场OPENID
    getMktOpenid = () => {
        const { cookies } = util.getGlobalInfo();
        const cuserOpenId = cookies.openId || "";
        return cuserOpenId;
    };
    //EN Return APP failure callback
    //CN 返回APP失败回调
    launchAppError = (e = {}) => {
        const detail = e.detail || {};
        const errMsg = detail.errMsg;
        this.sendWatcher("c_payWallet_toHomeAppErr", errMsg);
    };
    launchAppSuccess = () => {
        const returnUrlLink = this.state.appReturnData;
        this.sendWatcher(
            "c_wallet_wechatrealname_returnapp",
            "returnUrl: " + returnUrlLink,
        );
        setTimeout(() => {
            switchTab({
                url: "/pages/platform/indexWx/index",
            });
        }, 500);
    };
    toHomeApp = (e) => {
        const key = e.currentTarget.dataset.key;
        this.sendWatcher("c_payWallet_toHomeApp", key);
    };
    toThirdMini = () => {
        const env = process.env.BUILD_ENV == "beta" ? "develop" : "release";
        wx.navigateToMiniProgram({
            appId: this.optionsData.fromAppId,
            path: this.optionsData.navBackPath,
            envVersion: env,
        });
    };
    //EN Jump to WeChat authorization applet success callback
    //CN 跳转微信授权小程序成功回调
    miniSuccess = (res) => {
        this.optionsData.miniAppBack = true;
        const setStateData = {
            canSubmit: false,
        };

        if (!this.state.modelSubmit) {
            setStateData.showModal = false;
        }

        this.setState(setStateData);

        this.sendWatcher("c_payWallet_authCode");
    };
    miniFail = (res) => {
        let errMsg = res && res.detail && res.detail.errMsg;
        this.sendWatcher("navigateToMiniProgramfail", errMsg);
        if (!this.state.modelSubmit) {
            this.setState({
                showModal: false,
            });
        }
    };
    miniComplete = () => {};
    tapAgreementRadio = () => {
        let that = this;
        if (!this.submitTags.name) {
            that.showToast("请输入您的真实姓名");
            that.setState({
                agreementChecked: false,
            });
            return;
        }

        if (!this.submitTags.idCard) {
            that.showToast("请输入证件号码");
            that.setState({
                agreementChecked: false,
            });
            return;
        }

        let idNo = this.state.inputKeys["2"].replace(/(^\s*)|(\s*$)/g, "");

        const idNoEn = Base64.encode(idNo);
        showLoading({
            mask: true,
            title: "加载中.",
        });
        that.checkAge(idNoEn).then(
            function (result) {
                hideLoading();
                if (result < 18) {
                    wx.showModal({
                        content: "您当前未满18周岁，无法为您提供实名认证服务",
                        confirmText: "知道了",
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                that.setState({
                                    agreementChecked: false,
                                });
                            }
                        },
                    });
                } else {
                    that.setState({
                        canSubmit: true,
                        agreementChecked: true,
                    });
                }
            },
            function (e) {
                hideLoading();
                that.showModal(e.rmsg);
                that.setState({
                    agreementChecked: false,
                });
            },
        );

        // const agreementChecked = !this.state.agreementChecked
        // const submitBit = agreementChecked && this.submitTags.idCard && this.submitTags.name
        // this.setState({
        //     agreementChecked,
        //     canSubmit: submitBit
        // })
    };
    tapAgreement = (id) => {
        console.log("id", id);
        navigateTo({
            url: `/pages/cwallet/protocol/index?payagreeId=${id}`,
        });
    };
    idQaHandler = () => {
        wx.showModal({
            title: "",
            content:
                "暂仅支持身份证验证，更多认证方式，请前往去哪儿APP-我的-钱包-实名认证，进行操作",
            confirmText: "知道了",
            showCancel: false,
            success: function () {},
        });
    };
    modifyRealNameTipsHandler = () => {
        wx.showModal({
            title: "",
            content: "请前往去哪儿APP-我的-钱包处修改实名",
            confirmText: "知道了",
            showCancel: false,
            success: function () {},
        });
    };
    onDisableClick = () => {
        this.sendWatcher("提交按钮置灰，仍然点击提交");
    };

    render() {
        return (
            <Block>
                {!this.state.realSuccess && this.state.logined ? (
                    <Block>
                        <View className="wrapbox">
                            <View className="box-header">
                                <View className="boxheader-h1">
                                    请填写与您身份证一致的信息
                                </View>
                                <View className="boxheader-h2">
                                    去哪儿智能加密技术，实时保障您的信息安全
                                </View>
                            </View>
                            <View className="box-form">
                                <Label for="realname_1" className="inputitem">
                                    <Input
                                        id="realname_1"
                                        value={this.state.inputKeys[1]}
                                        data-key="1"
                                        className={
                                            (this.state.focusKey & 1) === 1
                                                ? `police-input input-focused`
                                                : `police-input`
                                        }
                                        disabled={
                                            this.state.weakAuthData
                                                ? true
                                                : false
                                        }
                                        type="text"
                                        maxlength="20"
                                        onInput={this.bindKeyInput.bind(this)}
                                        onFocus={this.focusAction.bind(this)}
                                        onBlur={this.blurAction.bind(this)}
                                        cursor-spacing="30"
                                    />
                                    <View className="inputname-box">
                                        真实姓名
                                    </View>
                                </Label>
                                <View className="labelitem">
                                    <View className="inputname-title">
                                        证件类型
                                    </View>
                                    <View className="inputname-value id_wrapper">
                                        <Text>身份证</Text>
                                        {this.state.showModifyRemind &&
                                        this.state.referFrom === 0 ? (
                                            <View
                                                className="id_qa"
                                                onClick={() =>
                                                    this.idQaHandler()
                                                }
                                            ></View>
                                        ) : null}
                                    </View>
                                </View>
                                <Label for="realname_2" className="inputitem">
                                    <Input
                                        id="realname_2"
                                        value={this.state.inputKeys[2]}
                                        data-key="2"
                                        className={
                                            (this.state.focusKey & 2) === 2
                                                ? `police-input input-focused`
                                                : `police-input`
                                        }
                                        type="idcard"
                                        disabled={
                                            this.state.weakAuthData
                                                ? true
                                                : false
                                        }
                                        maxlength="18"
                                        onInput={this.bindKeyInput.bind(this)}
                                        onFocus={this.focusAction.bind(this)}
                                        onBlur={this.blurAction.bind(this)}
                                        value={this.state.inputKeys[2]}
                                        cursor-spacing="30"
                                    />
                                    <View className="inputname-box">
                                        证件号
                                    </View>
                                </Label>
                                {this.state.agreementList.length > 0 ? (
                                    <View className="agreement-wrap">
                                        <Radio
                                            className="agreement-radio"
                                            checked={
                                                this.state.agreementChecked
                                            }
                                            onClick={this.tapAgreementRadio}
                                        />

{"请仔细阅读并充分理解"}
                                        {this.state.agreementList.map(
                                            (item) => (
                                                <Text
                                                    className="agreement"
                                                    onClick={() =>
                                                        this.tapAgreement(
                                                            item.protocolId,
                                                        )
                                                    }
                                                    key={item.protocolId}
                                                >
                                                    {item.protocolTitle}
                                                </Text>
                                            ),
                                        )}
                                        <View style={{ marginLeft: "30px" }}>
                                            {this.state.complianceText}
                                        </View>
                                    </View>
                                ) : null}
                                <View className="boxform-btnbox">
                                    {this.state.canSubmit ? (
                                        <Block>
                                            {/* 没提交过 */}
                                            {this.state.modelSubmit ? (
                                                <Block>
                                                    <Button
                                                        class="boxform-btn boxform-enbtn"
                                                        onClick={this.submitRealname.bind(
                                                            this,
                                                        )}
                                                    >
                                                        同意协议并提交
                                                    </Button>
                                                </Block>
                                            ) : null}

                                            {/* 实名认证失败，重新提交 */}
                                            {!this.state.modelSubmit &&
                                            this.state.realNamed ? (
                                                <Block>
                                                    <Button
                                                        className="boxform-btn boxform-enbtn"
                                                        onClick={this.againSubmit.bind(
                                                            this,
                                                        )}
                                                    >
                                                        同意协议并提交
                                                    </Button>
                                                </Block>
                                            ) : null}

                                            {/* 实名失败 */}
                                            {!this.state.modelSubmit &&
                                            !this.state.realNamed ? (
                                                <Block>
                                                    <Button
                                                        className="boxform-btn boxform-enbtn"
                                                        onClick={this.doSignGet.bind(
                                                            this,
                                                        )}
                                                    >
                                                        同意协议并提交
                                                    </Button>
                                                </Block>
                                            ) : null}
                                        </Block>
                                    ) : null}
                                    {!this.state.canSubmit ? (
                                        <Block>
                                            <Button
                                                className="boxform-btn"
                                                onClick={this.onDisableClick.bind(
                                                    this,
                                                )}
                                            >
                                                同意协议并提交
                                            </Button>
                                        </Block>
                                    ) : null}
                                </View>
                            </View>
                            {this.state.formApp && this.state.showToAppBtn ? (
                                <Block>
                                    <View className="box-returnbtns">
                                        <Button
                                            data-key="cwallet"
                                            className="box-returnbtn"
                                            onClick={this.toHomeApp.bind(this)}
                                            open-type="launchApp"
                                            app-parameter={
                                                this.state.appReturnData
                                            }
                                            onLaunchApp={this.launchAppSuccess.bind(
                                                this,
                                            )}
                                            onError={this.launchAppError.bind(
                                                this,
                                            )}
                                        >
                                            返回去哪儿App
                                        </Button>
                                    </View>
                                </Block>
                            ) : null}

                            {this.state.referFrom == 3 ? (
                                <Button
                                    data-key="cwallet"
                                    className="box-returnbtn"
                                    onClick={this.toThirdMini.bind(this)}
                                >
                                    返回
                                </Button>
                            ) : null}
                        </View>
                    </Block>
                ) : null}

                {this.state.realSuccess ? (
                    <Block>
                        {this.state.formApp || this.state.referFrom == 3 ? (
                            <Block>
                                <Icon className="wc_icon1"></Icon>
                                <Text class="wc_txt1">实名认证成功</Text>
                                <View class="re_infobox">
                                    <View>
                                        <Text>您的帐号已实名：</Text>
                                        {this.state.weakAuthData
                                            ? this.state.weakAuthData
                                                  .userNameMask
                                            : ""}
                                    </View>
                                    <View>
                                        <Text>身份证：</Text>
                                        {this.state.weakAuthData
                                            ? this.state.weakAuthData.idNo
                                            : ""}
                                    </View>
                                </View>
                                {this.state.referFrom == 3 ? (
                                    <Block>
                                        <Button
                                            data-key="realSuccess"
                                            className="wc_btn1"
                                            onClick={this.toThirdMini.bind(
                                                this,
                                            )}
                                        >
                                            返回
                                        </Button>
                                    </Block>
                                ) : this.state.showToAppBtn ? (
                                    <Block>
                                        <Button
                                            data-key="realSuccess"
                                            className="wc_btn1"
                                            onClick={this.toHomeApp.bind(this)}
                                            open-type="launchApp"
                                            app-parameter={
                                                this.state.appReturnData
                                            }
                                            onLaunchApp={this.launchAppSuccess.bind(
                                                this,
                                            )}
                                            onError={this.launchAppError.bind(
                                                this,
                                            )}
                                        >
                                            返回去哪儿App
                                        </Button>
                                    </Block>
                                ) : null}
                            </Block>
                        ) : null}

                        {!this.state.formApp && this.state.referFrom != 3 ? (
                            <Block>
                                <View className="re_tit1">
                                    <View className="re_img1"></View>
                                    <Text>账户已实名认证</Text>
                                </View>
                                <View className="re_list1">
                                    <View>
                                        <Text>姓名</Text>
                                        {this.state.weakAuthData
                                            ? this.state.weakAuthData
                                                  .userNameMask
                                            : ""}
                                    </View>
                                    <View>
                                        <Text>身份证</Text>
                                        {this.state.weakAuthData
                                            ? this.state.weakAuthData.idNo
                                            : ""}
                                    </View>
                                </View>
                                <View className="re_list2">
                                    <View>
                                        <Icon className="re_icon1"></Icon>
                                        <Text>资金、账户安全再升级</Text>
                                        可防止个人信息冒用，有效保障资金及账户安全
                                    </View>
                                    <View>
                                        <Icon className="re_icon2"></Icon>
                                        <Text>可尊享特权服务</Text>
                                        <Text className="re_txt01">
                                            拿去花、闪住、信用抢票
                                        </Text>
                                        等特权服务，仅实名用户可享
                                    </View>
                                </View>
                                {this.state.showModifyRemind &&
                                this.state.referFrom === 0 ? (
                                    <View className="modify_realname_tips">
                                        <Text
                                            onClick={() =>
                                                this.modifyRealNameTipsHandler()
                                            }
                                        >
                                            如何修改实名
                                        </Text>
                                    </View>
                                ) : null}
                            </Block>
                        ) : null}
                    </Block>
                ) : null}

                {!this.state.modelSubmit && this.state.showModal ? (
                    <Block>
                        <View className="pay-modal-mask"></View>
                        <View className="pay-modal">
                            <View className="pay-modal-content">
                                <View className="pay-modal-body p-modal-body-wx">
                                    请确认是否要进行实名认证？
                                </View>
                                <View className="pay-modal-btnwrap">
                                    <View className="pay-modal-btnbox">
                                        <Button
                                            className="pay-modal-button"
                                            onClick={this.hideModal.bind(this)}
                                        >
                                            取消
                                        </Button>
                                    </View>
                                    <View className="pay-modal-btnbox">
                                        {this.state.needGetAuthCode ? (
                                            <Block>
                                                <Navigator
                                                    hover-class="none"
                                                    target="miniProgram"
                                                    open-type="navigate"
                                                    app-id="wx88736d7d39e2eda6"
                                                    path="pages/oauth/authindex"
                                                    extra-data={
                                                        this.state.extData
                                                    }
                                                    version="release"
                                                    onSuccess={this.miniSuccess.bind(
                                                        this,
                                                    )}
                                                    onFail={this.miniFail.bind(
                                                        this,
                                                    )}
                                                    onComplete={this.miniComplete.bind(
                                                        this,
                                                    )}
                                                >
                                                    <Button className="pay-modal-button">
                                                        确定
                                                    </Button>
                                                </Navigator>
                                            </Block>
                                        ) : (
                                            <Block>
                                                <Button
                                                    onClick={this.againSubmit.bind(
                                                        this,
                                                    )}
                                                    className="pay-modal-button"
                                                >
                                                    确定
                                                </Button>
                                            </Block>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Block>
                ) : null}
            </Block>
        );
    }
}

export default P;
