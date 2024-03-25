<template>
	<div class="settings-category-panel">
		<h1>Device configuration</h1>

		<div class="d-flex flex-column gap-3">
			<!-- Ink selector -->
			<div class="d-flex flex-column gap-1">
				<label>Ink selector</label>
				<div class="d-flex gap-2">
					<div v-for="(ink, index) in deviceEditorInks" :key="index" @click="selectInkIndex(index)"
						@mouseover="onMouseOver(index)" @mouseleave="onMouseLeave(index)">
						<div>{{ index + 1 }}</div>

						<div 
							:style="{
								'background': ink.color ? ink.color : null,
								'backgroundImage': ink.color ? null : isMouseOver[index] ? inkAddURL : inkEmptyURL,
								'border-radius': ink.color ? '50%' : null
							}" 
							style="width: 10px; height: 10px; cursor: pointer;" 
							:options="SELECTABLE_INKS"
						></div>
						<div>{{ ink.shortName }}</div>


						<!-- Menu -->
						<b-dropdown v-model="selectedInkIndex" :key="index" v-if="selectedInkIndex === index && selectedInkIndex !== null">
							<div v-for="(selectableInk, inkIndex) in SELECTABLE_INKS" :key="inkIndex" class="list-item">
								<b-dropdown-item @click="selectInk(selectableInk)" style="cursor: pointer;">{{ selectableInk.name }}</b-dropdown-item>
							</div>
						</b-dropdown>
					</div>
				</div>
			</div>
			<!-- Name configuration -->
			<div class="d-flex flex-column gap-2">
				<label id="device-name"> Name </label>
				<input for="device-name" type="text" v-model="deviceEditorName" />
			</div>

			<div class="d-flex justify-content-end gap-2">
				<button class="button button-outline-primary" @click="onCancelDeviceConf">
					Cancel
				</button>
				<button class="button button-primary" @click="onConfirmDeviceConf">
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
const deviceEditorInks = ref<Array<Ink>>(Array(INK_SLOT).fill(DEFAULT_EMPTY_INK));
const selectedInkIndex = ref<number | null>(null);

/**
 * Variable to check if the mouse is over
 * The array contains every slots so it is checked individually
 */
const isMouseOver = ref<Array<boolean>>(Array(INK_SLOT).fill(false));
/**
 * Variables containing icons URLs
 */
const inkEmptyURL = "url(/src/assets/icons/ink-empty.svg)";
const inkAddURL = "url(/src/assets/icons/ink-add.svg)"
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

/**
 * The function will pass the variable for the given slot on true when mouse is over it.
 * @param index index of the slot in the array
 */
function onMouseOver(index: number): void {
	isMouseOver.value[index] = true;
}

/**
 * The function will pass the variable for the given slot on false when mouse is leaving it.
 * @param index index of the slot in the array
 */
function onMouseLeave(index: number): void {
	isMouseOver.value[index] = false;
}

function selectInkIndex(index: number) {
	selectedInkIndex.value = index;
}

function selectInk(ink: Ink): void {
	if (selectedInkIndex.value !== null) {
		deviceEditorInks.value[selectedInkIndex.value] = ink;
		console.log('selectedInkIndex before reset', selectedInkIndex.value);
		selectedInkIndex.value = null;
		console.log('selectedInkIndex after reset', selectedInkIndex.value);
	}
	selectedInkIndex.value = null;
}

function toggleDropdown(index: number) {
	selectedInkIndex.value = selectedInkIndex.value === index ? null : index;
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
