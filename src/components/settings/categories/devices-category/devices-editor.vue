<template>
	<div class="settings-category-panel">
		<h1>Device configuration</h1>

		<div class="d-flex flex-column gap-3">
			<!-- Name configuration -->
			<div class="d-flex flex-column gap-2">
				<label id="device-name"> Name </label>
				<input
					for="device-name"
					type="text"
					v-model="deviceEditorName"
				/>
			</div>

			<div class="d-flex justify-content-end gap-2">
				<button
					class="button button-outline-primary"
					@click="onCancelDeviceConf"
				>
					Cancel
				</button>
				<button
					class="button button-primary"
					@click="onConfirmDeviceConf"
				>
					Confirm
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import type { Device, Ink } from "@src/common/types";

interface Props {
	device: Device | null;
}

const props = defineProps<Props>();

type Emits = {
	cancel;
	confirm: [savedDevice: Device];
};

const emit = defineEmits<Emits>();

// #region DO NOT EDIT
// By default, ink slot value must be 9.
const INK_SLOT = 9;

// Inks available for your device ink set.
const SELECTABLE_INKS: Readonly<Ink[]> = [
	{ name: "Cyan", color: "rgb(0, 255, 255)", shortName: "C" },
	{ name: "Magenta", color: "rgb(255, 0, 255)", shortName: "M" },
	{ name: "Yellow", color: "rgb(255, 255, 0)", shortName: "Y" },
	{ name: "Black", color: "rgb(0, 0, 0)", shortName: "K" },
	{ name: "White", color: "rgb(255, 255, 255)", shortName: "W" },
	{ name: "Light Cyan", color: "rgb(127, 255, 255)", shortName: "c" },
	{ name: "Light Magenta", color: "rgb(255, 127, 255)", shortName: "m" },
	{ name: "Light Yellow", color: "rgb(255, 255, 127)", shortName: "y" },
];
// #endregion

// #region Data
const DEFAULT_EMPTY_INK = Object.freeze({
	name: "-",
	color: "",
	shortName: "-",
});
const DEFAULT_DEVICE_VALUES = Object.freeze({
	id: "",
	name: "",
	inks: Array(INK_SLOT).fill(DEFAULT_EMPTY_INK),
});

const deviceEditorId = ref<string>("");
const deviceEditorName = ref<string>("");
// #endregion

// #region Functions
function setDeviceEditorToDefaultValues() {
	deviceEditorId.value = DEFAULT_DEVICE_VALUES.id;
	deviceEditorName.value = DEFAULT_DEVICE_VALUES.name;
}

function onCancelDeviceConf(): void {
	setDeviceEditorToDefaultValues();

	emit("cancel");
}

function onConfirmDeviceConf(): void {
	emit("confirm", {
		id: deviceEditorId.value,
		name: deviceEditorName.value,
	});
}
// #endregion

// #region Watchers
watch(
	() => props.device,
	() => {
		if (props.device) {
			deviceEditorId.value = props.device.id;
			deviceEditorName.value = props.device.name;
		} else {
			setDeviceEditorToDefaultValues();
		}
	},
	{ deep: true, immediate: true },
);
// #endregion
</script>
