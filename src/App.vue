<template>
  <div id="app">
    <TheHeader/>
    <a-row type="flex" justify="center" style="margin-bottom: 15px">
      <router-view ref="youtube"></router-view>
    </a-row>
    <SuggestionVideos :data="suggestionVideos" />
  </div>
</template>

<script>
import axios from 'axios';

import TheHeader from './components/TheHeader';
import SuggestionVideos from './components/SuggestionVideos';

import 'ant-design-vue/dist/antd.css'
export default {
  name: 'App',
  components: {
    TheHeader,
    SuggestionVideos
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  },
  data() {
    return {
      suggestionVideos: [],
      header: {
        typeOfInput: 'search',
        input: ''
      },
      height: '540',
      width: '960'
    }
  },
  provide() {
    return {
      header: this.header,
      fetchData: this.fetchData
    }
  },
  mounted() {
    this.initial();
  },
  methods: {
    async initial() {
      const { data: { items } } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg&chart=mostPopular&regionCode=us&part=contentDetails,snippet&fields=items(id,snippet(title,thumbnails),contentDetails(duration))&maxResults=10`);
      const data = items.map(item => {
        const thumbnails = Object.values(item.snippet.thumbnails);
        return {
          id: item.id,
          title: item.snippet.title,
          thumbnail: thumbnails[thumbnails.length - 1],
          duration: item.contentDetails.duration
        }
      });
      this.suggestionVideos = data;
    },
    async fetchData() {
      if(this.header.typeOfInput === 'search') {
        // fetch videos data
        const { data: { items } } = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg&relatedToVideoId=hA6hldpSTF8&type=video&q=${this.header.input}&part=id,snippet&fields=items(id(videoId),snippet(title,thumbnails))&maxResults=10`);

        // minimize data
        const data = items.map(item => {
          const thumbnails = Object.values(item.snippet.thumbnails);
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: thumbnails[thumbnails.length - 1]
          }
        });

        // set State
        this.suggestionVideos = data;
      } else {
        // find id
        const id = this.header.input.split(/[= ? &]/g).find((str, index, thisArr) => {
          const listWord = thisArr.findIndex(item => item === 'list');
          if(index === listWord + 1) return str;
        });

        // fetch videos data
        let { data: { items } } = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}&key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg&maxResults=10&part=snippet,contentDetails&fields=items(id,snippet(thumbnails),contentDetails(videoId))`);
        this.player.cueVideoById(items[0].contentDetails.videoId);

        // minimize and filter data
        const data = items.map(item => {
          if(!item.snippet) return null;
          const thumbnails = Object.values(item.snippet.thumbnails);
          return {
            id: item.contentDetails.videoId,
            thumbnail: thumbnails[thumbnails.length - 1],
          }
        }).filter(item => item);

        // handle data
        this.hanldePlaylistData(data);
      }
    },
    async hanldePlaylistData(data) {
      const videoIds = data.map(item => item.id).join(',');
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoIds}&key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg&part=snippet,contentDetails&fields=items(snippet(title),contentDetails(duration))`);
      const videoResources = res.data.items;
      this.suggestionVideos = data.map((item, index) => {
        item.title = videoResources[index].snippet.title;
        item.duration = videoResources[index].contentDetails.duration;
        return item;
      });
    },
    onPlayerStateChange() {

    }
  },
  watch: {
    'header.typeOfInput'(to, from) {
      console.log(to, from);
    }
  }
}
</script>

<style>
</style>
