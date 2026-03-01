const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join lottery room for real-time updates
    socket.join('lottery-updates');

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    // Handle ticket check requests
    socket.on('checkTicket', (data) => {
      // Broadcast to all clients that someone is checking a ticket
      socket.broadcast.emit('ticketCheckActivity', {
        message: 'Someone is checking a ticket',
        timestamp: new Date()
      });
    });

    // Handle admin activities
    socket.on('adminActivity', (data) => {
      // Broadcast admin activities to all clients
      socket.broadcast.emit('adminUpdate', data);
    });
  });

  return io;
};

module.exports = socketHandler;
