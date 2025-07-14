class IFrame extends HTMLElement {
  async connectedCallback() {
    const res = await fetch(`https://proxy.catskull.net/${this.getAttribute('src')}`);
    const html = await res.text();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.innerHTML = html;
  }
}
 
window.customElements.define(
  'i-frame',
  IFrame
);
