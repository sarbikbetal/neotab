import io from 'socket.io-client'
const socket = io('https://neotab.herokuapp.com/', { autoConnect: false })

socket.on('connect', () => {
  console.log('Socket service ready')
})

export async function getSocket() {
  if (socket.connected) return socket
  else {
    await socket.open()
    return socket
  }
}
