<template>
  <div style="padding-top: 96px" id="videoGrid">
    <h1>Hello all</h1>
    <input type="text" v-model="username" />
    <button :disabled="!socketConnected" @click="joinRoom">Connect</button>
    <button @click="toggleCamera">Toggle camera</button>
    <button @click="toggleMic">Toggle mic</button>
  </div>
</template>

<script>
import io from 'socket.io-client'
import Peer from 'peerjs'

const socket = io('https://neotab.herokuapp.com/')
const peers = new Map()

let myPeer

export default {
  data: function () {
    return {
      username: undefined,
      socketConnected: false,
      peerId: undefined,
      videoEnabled: true,
      audioEnabled: true,
      myMediaStream: null,
    }
  },
  methods: {
    joinRoom() {
      let roomID = this.$route.query.r
      console.log('Joining room')
      if (this.username)
        socket.emit(
          'join-room',
          roomID,
          this.peerId,
          this.username,
          (reply) => {
            console.log(reply)
          },
        )
    },
    connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream)
      const video = document.createElement('video')

      call.on('stream', (userVideoStream) => {
        this.addVideoStream(video, userVideoStream)
      })
      call.on('close', () => {
        video.remove()
      })

      peers.set(userId, call)
    },
    addVideoStream(video, stream) {
      let videoGrid = document.getElementById('videoGrid')

      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      videoGrid.append(video)
    },
    toggleCamera() {
      let videoTracks = this.myMediaStream.getVideoTracks()
      if (this.videoEnabled) {
        videoTracks.forEach((track) => {
          track.enabled = false
        })
        this.videoEnabled = false
      } else {
        videoTracks[0].enabled = true
        this.videoEnabled = true
      }
    },
    toggleMic() {},
  },
  mounted: function () {
    this.$nextTick(function () {
      myPeer = new Peer(Date.now(), {
        host: 'neotab.herokuapp.com',
        path: '/peerjs',
        secure: true,
      })

      socket.on('connect', () => {
        console.log('Socket connected')
        this.socketConnected = true
      })

      socket.on('user-disconnected', (userId) => {
        console.log('user disconnected', userId)
        if (peers.has(userId)) {
          peers.get(userId).close()
          peers.delete(userId)
        }
      })

      myPeer.on('open', (id) => {
        console.log('Peer connected: ', id)
        this.peerId = id
      })

      const myVideo = document.createElement('video')
      myVideo.muted = true

      navigator.mediaDevices
        .getUserMedia({
          video: this.videoEnabled,
          audio: this.audioEnabled,
        })
        .then((stream) => {
          this.myMediaStream = stream
          this.addVideoStream(myVideo, stream)

          myPeer.on('call', (call) => {
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', (userVideoStream) => {
              this.addVideoStream(video, userVideoStream)
            })
          })

          socket.on('user-connected', (userId) => {
            this.connectToNewUser(userId, stream)
          })
        })
    })
  },
}
</script>

<style scoped>
button {
  margin: 4px 12px;
  border: 2px dotted teal;
  padding: 4px;
}
</style>
