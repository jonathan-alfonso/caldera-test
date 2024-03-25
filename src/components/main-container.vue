<template>
	<div class="w-100 h-100 position-relative">
		<div class="p-3 d-flex flex-column justify-content-between gap-3 text-white">
			<h1>Welcome in the Technical Assessment 2024 of Caldera!</h1>
			Press the "Alt + Shift" shortcut to open the settings.
		</div>

		<settings-container v-if="isSettingsOpen" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import SettingsContainer from "@src/components/settings/settings-container.vue";

// #region Data
const isSettingsOpen = ref<boolean>(false);
// #endregion

// #region Methods
const openSettings = (event: KeyboardEvent) => {
	if (event.altKey && event.shiftKey) {
		if (isSettingsOpen.value === true) {
			isSettingsOpen.value = false;
		} else {
			isSettingsOpen.value = true;
		}
		
	}
}
// #endregion

// #region Lifecycle
onMounted(() => {
	window.addEventListener("keydown", openSettings);
});


// #endregion
</script>
