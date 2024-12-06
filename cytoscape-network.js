import {LitElement, html, css} from 'lit';
import cytoscape from 'cytoscape';

export class CytoscapeNetwork extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    #cytoscape-container {
      width: 100%;
      height: 100%;
    }
  `;

  static get properties() {
    return {
      elements: { type: Array },
      styles: { type: Object },
      layout: { type: Object },  
    };
  }

  firstUpdated() {
    const container = this.shadowRoot.getElementById('cytoscape-container');
    this.cy = cytoscape({
      container,
      elements: this.elements,
      styles: this.styles,
      layout: this.layout,
    });
  }

  constructor() {
    super();
    this.elements = [];
    this.styles = {};
    this.layout = { name: 'grid' }; // Default layout
  }

  updated(changedProperties) {
    if (changedProperties.has('elements')) {
      this.cy.json({ elements: this.elements });
    }

    if (changedProperties.has('styles')) {
      this.cy.style(this.styles);
    }

    if (changedProperties.has('layout')) {
      this.cy.layout(this.layout).run();
    }
  }

  render() {
    return html`<div id="cytoscape-container"></div>`;
  }

  disconnectedCallback() {
    if (this.cy) {
      this.cy.destroy();
    }
    super.disconnectedCallback();
  }
}

window.customElements.define('cytoscape-network', CytoscapeNetwork);
