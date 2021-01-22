class Tooltip extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background : grey;
                    color:  white;
                    position : absolute;
                    zIndex : 10;
                }
            </style>
            <slot>Some default</slot>
            <span> (?)</span>
        `;
    }

    connectedCallback() {
        this._tooltipText = this.getAttribute('text');
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.append(tooltipIcon);
        this.style.position = 'relative';
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue && name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.append(this._tooltipContainer);
    }

    _hideTooltip() {
        this._tooltipContainer.remove();
    }
}

customElements.define('osalam-tooltip', Tooltip);
