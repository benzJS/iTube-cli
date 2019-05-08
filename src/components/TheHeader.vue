<template>
	<a-row type="flex" justify="center" style="margin: 10px 0">
    <div style="margin-bottom: 16px">
      <a-input v-model="header.input" @keypress.enter="fetchData">
        <a-select slot="addonBefore" v-model="header.typeOfInput" style="width: 90px">
          <a-select-option value="search">Search</a-select-option>
          <a-select-option value="playlist">Playlist</a-select-option>
          <a-select-option value="user_uploads">User's uploads</a-select-option>
        </a-select>
      </a-input>
    </div>
  </a-row>
</template>

<script>
	export default {
		name: 'Header',
		inject: ['header', 'fetchData']
	}
</script>