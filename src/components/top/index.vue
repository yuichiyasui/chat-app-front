<template>
	<h1>Chat App</h1>
	<p>チャットアプリケーションです</p>
	<button @click="count++">count is: {{ count }}</button>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
	name: "Top",
	setup() {
		const count = ref(0);
		return { count };
	},
});
</script>

<style lang="scss" scoped></style>
