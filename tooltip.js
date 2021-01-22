class Tooltip extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.querySelector("#tooltipTemplate");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this._tooltipText = this.getAttribute('text');
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.append(tooltipIcon);
        this.style.position = 'relative';
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        // Set Content
        this._tooltipContainer.textContent = this._tooltipText;
        // Set style
        this._tooltipContainer.style.background = 'grey';
        this._tooltipContainer.style.color = 'white';
        this._tooltipContainer.style.position = 'absolute';
        this._tooltipContainer.style.zIndex = '10';
        this.shadowRoot.append(this._tooltipContainer);
    }

    _hideTooltip() {
        this._tooltipContainer.remove();
    }
}

customElements.define('osalam-tooltip', Tooltip);
