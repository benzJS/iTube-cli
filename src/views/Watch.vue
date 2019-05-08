<template>
	<VTube ref="youtube" :height="height" :width="width" @ready="onPlayerReady" />
</template>

<script>
import VTube from '../components/VTube';

export default {
	name: 'Watch',
	computed: {
		player() {
			return this.$refs.youtube.player
		}
	},
	data() {
		return {
			height: '540',
			width: '960'
		}
	},
	components: {
		VTube
	},
	methods: {
    onPlayerReady() {
      this.player.cueVideoById(this.$route.query.v);
      this.$refs.youtube.$watch('$route', newRoute => {
        this.player.cueVideoById(newRoute.query.v);
      })
    }
	}
}
</script>