class LittleChat extends HTMLElement {
  constructor() {
    super();
    this.socket = undefined;
    this.messages = [];
    this.color = Math.floor(Math.random() * (360 - 0 + 1) + 0);
  }
  
  renderMsg(msg) {
    const escapeHtml = (text) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
      };
    return `<div class="message" style="--hue: ${msg.user}; color: light-dark(oklch(0.72 0.15 var(--hue, 70)),oklch(0.72 0.15 var(--hue, 70)));">${escapeHtml(msg.content)}</div>`
  }

  render() {
    this.innerHTML = `
      <div class="messages" style="max-height: 400px; overflow-y: scroll; border: 1px solid; padding: 1rem;">
        ${this.messages.map(msg => this.renderMsg(msg)).join('')}
        <div class="message">Welcome to little chat! By using, you are acknowledging you have read and agree to our <mark><a href="/public/little-chat-privacy.txt" target="_blank">privacy policy</a></mark>. Have fun!</div>
      </div>
      <audio id="notification-sound" style="display: none; visibility: hidden;"  src="/assets/aim.ogg"></audio>
      <form>
        <input style="max-width: 100%;" type="text" placeholder="Add a message..." size="50">
        <button type="submit">Post</button>
      </form>
    `;
    this.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = this.querySelector('input');
      if (input.value.trim()) {
        this.addMessage(input.value.trim());
        input.value = '';
      }
    });
  }

  idk() {
    this.socket = new WebSocket(`wss://little-chat.degraw.workers.dev/parties/chat/${location.hostname}`);
    this.socket.addEventListener("message", (event) => {
      const json = JSON.parse(event.data);
      if (json.type === 'all') {
        this.messages = [...this.messages, ...json.messages]
        this.render();
      } else if (json.type === 'add') {
        this.messages = [...this.messages, json];
        this.querySelector('.messages').innerHTML += this.renderMsg(json);
      }
      this.querySelector('.messages').scrollTop = this.querySelector('.messages').scrollHeight;
      this.querySelector('#notification-sound').play();
    });
  }

  connectedCallback() {
    this.idk();
  }

  addMessage(message) {
    const msg = {"type":"add","id":crypto.randomUUID(),"content":message,"user":this.color,"role":"user"};
    this.socket.send(JSON.stringify(msg));
  }
}

customElements.define('little-chat', LittleChat);
