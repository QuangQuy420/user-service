import express, { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();

const server = http.createServer(app);

// Initialize Socket.IO server with CORS options
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (msg: string) => {
    console.log('Message received:', msg);

    // Broadcast the message to all connected clients
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
