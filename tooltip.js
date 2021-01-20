class Tooltip extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this._tooltipText = this.getAttribute('text');
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.append(tooltipIcon);
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.append(this._tooltipContainer);
    }

    _hideTooltip() {
        this._tooltipContainer.remove();
    }
}

customElements.define('osalam-tooltip', Tooltip);
