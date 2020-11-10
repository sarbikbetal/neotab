<template>
  <div style="padding-top: 96px">
    <button @click="createRoom">Create room</button>
    <input type="text" v-model="roomId" />
    <button @click="joinRoom">Join</button>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io('https://neotab.herokuapp.com/')

export default {
  data: function () {
    return {
      roomId: undefined,
    }
  },
  methods: {
    createRoom() {
      socket.emit('host-room', (id) => {
        socket.close()
        this.$router.push({ path: '/rtc/join', query: { r: id } })
      })
    },
    joinRoom() {
      this.$router.push({ path: '/rtc/join', query: { r: this.roomId } })
    },
  },
}
</script>

<style>
</style>
