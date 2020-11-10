<template>
  <div style="padding-top: 96px" class="container">
    <div class="row text-center">
      <h1 class="text-xl" ref="pageDesc">
        {{ connectedToRoom ? 'Connected to room' : "You're in the lobby" }}
      </h1>
      <div v-if="!connectedToRoom">
        <input class="text-blue-800" type="text" placeholder=" handle" v-model="username" />
        <button :disabled="!socketConnected" @click="joinRoom">Connect</button>
      </div>
    </div>
    <div class="row text-center">
      <button @click="toggleCamera">Toggle camera</button>
      <button @click="toggleMic">Toggle mic</button>
    </div>
    <div id="videoGrid">
      <video ref="myVideo"></video>
    </div>
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
      connectedToRoom: false,
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
            this.connectedToRoom = true
            this.$snack.success({
              text: 'Connected to room',
              button: 'OK',
            })
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
    toggleMic() {
      let audioTracks = this.myMediaStream.getAudioTracks()
      if (this.videoEnabled) {
        audioTracks.forEach((track) => {
          track.enabled = false
        })
        this.audioEnabled = false
      } else {
        audioTracks[0].enabled = true
        this.audioEnabled = true
      }
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      myPeer = new Peer(Date.now(), {
        host: 'neotab.herokuapp.com',
        path: '/peerjs',
        secure: true,
      })

      socket.on('connect', () => {
        console.log('Socket connected: ', socket.id)
        this.$snack.success({
          text: `Socket connected`,
          button: 'OK',
        })
        this.socketConnected = true
      })

      socket.on('disconnect', () => {
        console.log('Socket disconnected')
        this.$snack.show({
          text: `Socket connected`,
          button: 'OK',
        })
        this.socketConnected = true
      })

      socket.on('user-disconnected', (userId, handle) => {
        console.log('user disconnected', handle)
        this.$snack.error({
          text: `${handle} left the meeting`,
          button: 'OK',
        })
        if (peers.has(userId)) {
          peers.get(userId).close()
          peers.delete(userId)
        }
      })

      myPeer.on('open', (id) => {
        console.log('Peer connected: ', id)
        this.$snack.success({
          text: `WebRTC connected`,
          button: 'OK',
        })
        this.peerId = id
      })

      const myVideo = this.$refs.myVideo
      myVideo.muted = true

      navigator.mediaDevices
        .getUserMedia({
          video: this.videoEnabled,
          audio: this.audioEnabled,
        })
        .then((stream) => {
          myVideo.srcObject = stream
          myVideo.addEventListener('loadedmetadata', () => {
            myVideo.play()
          })

          myPeer.on('call', (call) => {
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', (userVideoStream) => {
              this.addVideoStream(video, userVideoStream)
            })
          })

          socket.on('user-connected', (userId, handle) => {
            this.$snack.success({
              text: `${handle} joined the room`,
              button: 'OK',
            })
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

#videoGrid {
  @apply pt-4;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
video {
  margin: 12px;
}
</style>
