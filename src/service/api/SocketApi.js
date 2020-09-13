import io from 'socket.io-client';
class SocketApi {
  init(token) {
    this.socket = io('http://localhost:3000/', {
      query: {
        token,
      },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      // console.log('Connected');
    });
  }

  handleMessages(handler) {
    this.socket.on('message', (message) => {
      console.log('Message', message);
      handler(message);
    });
  }
}

export default new SocketApi();
