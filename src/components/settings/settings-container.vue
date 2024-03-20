<template>
	<div class="position-absolute top-0 left-0 d-flex vw-100 vh-100">
		<div class="settings-navbar-panel">
			<div class="text-white fw-bold">Settings</div>

			<div class="d-flex flex-column gap-2">
				<button
					class="button text-left"
					:class="currentCategory === 0 ? 'button-primary' : 'button-secondary'"
					@click="currentCategory = 0"
				>
					Global
				</button>
				<button
					class="button text-left"
					:class="currentCategory === 1 ? 'button-primary' : 'button-secondary'"
					@click="currentCategory = 1"
				>
					Devices
				</button>
				<button
					class="button text-left"
					:class="currentCategory === 2 ? 'button-primary' : 'button-secondary'"
					@click="currentCategory = 2"
				>
					Medias
				</button>
				<button
					class="button text-left"
					:class="currentCategory === 3 ? 'button-primary' : 'button-secondary'"
					@click="currentCategory = 3"
				>
					Shortcuts
				</button>
			</div>
		</div>

		<div class="flex-grow-1 w-100">
			<component :is="currentComponent" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed, type Component } from "vue";

import DevicesContainer from "./categories/devices-category/devices-container.vue";
import GlobalCategory from "./categories/global-category.vue";
import MediasCategory from "./categories/medias-category.vue";
import ShortcutsCategory from "./categories/shortcuts-category.vue";

// #region Data
const currentCategory = ref<string | number>(0);
const currentComponent = ref<Component>();
// #endregion

// #region Computed
const componentByCategory = computed<Record<string, Component>>(() => ({
	"0": GlobalCategory,
	"1": DevicesContainer,
	"2": MediasCategory,
	"3": ShortcutsCategory,
}));
// #endregion

// #region Watchers
watch(
	() => currentCategory.value,
	() => {
		currentComponent.value = componentByCategory.value[currentCategory.value];
	},
	{ immediate: true },
);
// #endregion
</script>
