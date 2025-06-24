class LittleChat extends HTMLElement {
  constructor() {
    super();
    this.socket = undefined;
    this.messages = [];
    const colors = [
      ['#e66767', '#9a1a1a'],
      ['#f08a54', '#a33d08'],
      ['#e49f50', '#975304'],
      ['#d9ad4f', '#8d6002'],
      ['#93be55', '#467209'],
      ['#5bbe80', '#0f7233'],
      ['#55b4ab', '#09675f'],
      ['#52b2c9','#05657c'],
      ['#6691f1','#1945a4'],
      ['#d267e0','#861a93'],
      ['#ea607e','#e11d48']
    ];
    // this.color = colors[Math.floor(Math.random() * colors.length)];
    this.color = Math.floor(Math.random() * (360 - 0 + 1) + 0);
  }

  render() {
    this.innerHTML = `
      <div class="messages" style="max-height: 400px; overflow-y: scroll; border: 1px solid; padding: 1rem;">
        ${this.messages.map(msg => `<div class="message" style="--hue: ${msg.user}; color: light-dark(oklch(0.72 0.15 var(--hue, 70)),oklch(0.72 0.15 var(--hue, 70)));">${msg.content}</div>`).join('')}
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
      console.log(json);
      if (json.type === 'all') {
        this.messages = [...this.messages, ...json.messages]
      } else if (json.type === 'add') {
        this.messages = [...this.messages, json];
      }
      this.render();
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
