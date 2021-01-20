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
        this.append(this._tooltipContainer);
    }

    _hideTooltip() {
        this._tooltipContainer.remove();
    }
}

customElements.define('osalam-tooltip', Tooltip);
