<template>
  <div id="player"></div>
</template>

<script>
import YoutubePlayer from 'youtube-player';
export default {
  name: 'VTube',
  props: ['height', 'width'],
  mounted() {
    this.player = YoutubePlayer('player', {
      height: this.height,
      width: this.width
    });
    this.player.on('ready', this.onPlayerReady);
  },
  methods: {
    onPlayerReady(ev) {
      this.$emit('ready', ev);
    },
    onPlayerStateChange(ev) {
      this.$emit('state-change', ev);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
