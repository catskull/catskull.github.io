class LittleChat extends HTMLElement {
  constructor() {
    super();
    this.socket = undefined;
    this.messages = [];
    // this.color = colors[Math.floor(Math.random() * colors.length)];
    this.color = Math.floor(Math.random() * (360 - 0 + 1) + 0);
  }
  
  renderMsg(msg) {
    return `<div class="message" style="--hue: ${msg.user}; color: light-dark(oklch(0.72 0.15 var(--hue, 70)),oklch(0.72 0.15 var(--hue, 70)));">${msg.content}</div>`
  }

  render() {
    this.innerHTML = `
      <div class="messages" style="max-height: 400px; overflow-y: scroll; border: 1px solid; padding: 1rem;">
        ${this.messages.map(msg => this.renderMsg(msg)).join('')}
      </div>
      
      <form>
        <input type="text" placeholder="Add a message..." size="50">
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
    this.socket = new WebSocket("wss://little-chat.degraw.workers.dev/parties/chat/catskull.net");
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
