class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
    }

    connectedCallback() {
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip);
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip);
        this.append(tooltipIcon);
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = "This is tooltip text!";
        this.append(this._tooltipContainer);
    }

    _hideTooltip() {
        this._tooltipContainer.remove();
    }
}

customElements.define('osalam-tooltip', Tooltip);
