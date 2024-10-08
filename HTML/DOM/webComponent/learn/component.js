class baseComponent extends HTMLElement {
    constructor() {
        this.init();
    }

    init() {
        let shadow = this.attachShadow({ mode: "open" });
        this.state = {};
    }
}

class MyBtn extends baseComponent {
    constructor() {
        super();
        this.dataset();
        this.cssStyle();
        this.html();
    }

    dataset() {
        this.state = {
            type: "primary",
            round: false,
            size: "medium",
        };

        this.getType();
        this.getRound();
        this.getSize();
    }

    getType() {
        let allData = ["primary", "success", "warning", "danger", "info"];

        let current = this.getAttribute("type");

        if (allData.includes(current)) {
            this.state.type = current;
        }
    }

    getRound() {
        let allData = ["true", "false"];

        let current = this.getAttribute("round");

        if (allData.includes(current)) {
            this.state.round = current;
        }
    }

    getSize() {
        let allData = ["small", "medium", "mini"];

        let current = this.getAttribute("round");

        if (allData.includes(current)) {
            this.state.size = current;
        }
    }

    cssStyle() {

        let backgroundColor = this.state.type === 'primary' ? '#fff' : '#111';
        let round = this.state.round === 'true' ? '20px' : '0';
        let size = this.state.size === 'mini' ? '12px' : '24px';

        let style = `
        .myBtn{
                display: inline-block;
                background: ${backgroundColor};
                border: 1px solid red;
                color: black;
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
                border-radius: ${round};
                padding:${size}
        }
        `

        this.shadowRoot.attachShadow(style)

    }

    html() {
        let container = document.createElement('div')
        container.classList.add('myBtn')
        container.innerHTML = `
                <span>
                    <slot></slot>
                </span>
            `
        this.shadowRoot.attachShadow(container)
    }
}

customElements.define('hd-button ', MyBtn)