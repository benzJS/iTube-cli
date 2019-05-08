<template>
	<a-row>
    <a-col :span="16" :offset="4">
      <a-row type="flex" justify="space-between">
        <router-link 
          v-for="item of data"
          :to="`/watch?v=${item.id}`"
          :key="item.id"
        >
          <a-card
            hoverable
            style="width: 240px; margin-bottom: 15px"
            :key="item.id"
          >
            <img
              :src="item.thumbnail.url"
              slot="cover"
            />
            <a-card-meta :description="item.duration | duration">
              <p slot="title" :title="item.title">{{ item.title }}</p>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import { duration } from '../utils/utils';
export default {
	name: 'suggestionVideos',
	props: ['data'],
	filters: {
		duration
	}
}
</script>