class Component extends HTMLElement {
    constructor() {
        super();
        this.init();
    }
    init() {
        // 顶层影子DOM
        let shadow = this.attachShadow({
            mode: 'open'
        });
        this.state = {};
    }
}
// <hd-button></hd-button>
class HdButton extends Component {
    constructor() {
        super();
        this.data()
        this._style()
        this._html()
    }
    // 初始化数据
    data() {
        this.state = {
            type: 'default', // primary / success / warning / danger / info
            round: false, // 是否圆角按钮 true / false
            size: 'default'
        }
        this.getAttrType() // 获取type
        this.getAttrRound() // 获取Round
        this.getAttrSize() // 获取size
    }
    // 样式引入
    _style() {
        // 在shadowRoot创建css 
        let buttonCss = document.createElement('style')
        const typeBg = {
            default: '#fff',
            primary: '#409eff',
            success: '#67c23a',
            warning: '#e6a23c',
            danger: '#f56c6c',
            info: '#909399'
        }
        const typeBorderColor = this.state.type === 'default' ? '#dcdfe6' : `${typeBg[this.state.type]}`
        const typeColor = this.state.type === 'default' ? '#606266' : '#fff'
        buttonCss.textContent = `
           .hd__button {
                display: inline-block;
                background: ${typeBg[this.state.type]};
                border: 1px solid ${typeBorderColor};
                color: ${typeColor};
                line-height: 1;
                white-space: nowrap;
                -webkit-appearance: none;
                text-align: center;
                box-sizing: border-box;
                outline: none;
                margin: 0;
                padding: 12px 20px;
                font-size: 14px;
                border-radius: 4px;
                cursor: pointer;
           }
           .hd__button.is-round {
                border-radius: 20px;
                padding: 12px 23px;
           }
           .hd__button-medium {
                font-size: 14px;
                padding: 10px 20px;
                border-radius: 4px;
            }
            .hd__button-medium.is-round {
                padding: 10px 20px;
            }
            .hd__button-small {
                font-size: 12px;
                padding: 9px 15px;
                border-radius: 3px;
            }
            .hd__button-small.is-round {
                padding: 9px 15px;
            }
            .hd__button-mini {
                font-size: 12px;
                padding: 7px 15px;
                border-radius: 3px;
            }
            .hd__button-mini.is-round {
                padding: 7px 15px;
            }
          `
        this.shadowRoot.appendChild(buttonCss)
    }
    // html
    _html() {
        let container = document.createElement('div')
        container.classList.add('hd__button')
        if (this.state.round) {
            container.classList.add('is-round')
        }
        if (this.state.size && this.state.size !== 'default') {
            container.classList.add(`hd__button-${this.state.size}`)
        }
        container.innerHTML = `
                <span>
                    <slot></slot>
                </span>
            `
        this.shadowRoot.appendChild(container);
    }
    // 获取属性值type
    getAttrType() {
        try {
            let typeAll = ['default', 'primary', 'success', 'warning', 'danger', 'info']
            let type = this.getAttribute('type')
            if (type && typeAll.includes(type)) {
                this.state.type = type
            } else {
                this.state.type = 'default';
            }
        } catch (e) {
            this.state.type = 'default';
        }
    }
    // 获取属性值 round
    getAttrRound() {
        let round = this.getAttribute('round')
        let roundAll = ['false', 'true']
        try {
            if (round && roundAll.includes(round)) {
                this.state.round = round === 'true' ? true : false
            } else {
                this.state.round = false
            }
        } catch (e) {
            this.state.round = false
        }
    }
    // 获取属性值 size
    getAttrSize() {
        let size = this.getAttribute('size')
        let sizeAll = ['medium', 'small', 'mini', 'default']
        try {
            if (size && sizeAll.includes(size)) {
                this.state.size = size
            } else {
                this.state.size = 'default'
            }
        } catch (e) {
            this.state.size = 'default'
        }
    }
}
customElements.define('hd-button', HdButton);
