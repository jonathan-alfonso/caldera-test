<template>
	<div class="d-flex h-100">
		<devices-list
			v-model:checked-devices-ids="checkedDevicesIds"
			:selected-device-id="selectedDeviceId"
			@add-device="onAddDevice"
			@delete-devices="onDeleteDevices"
			@update:selected-device-id="onEditDevice"
		/>

		<device-editor
			v-if="isDeviceConfOpen"
			:device="selectedDevice"
			@cancel="onCancelDeviceConf"
			@confirm="onConfirmDeviceConf"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { useDevicesStore } from "@src/stores";

import DeviceEditor from "./devices-editor.vue";
import DevicesList from "./devices-list.vue";
import type { Device } from "@src/common/types";

// #region Composables
const devicesStore = useDevicesStore();
// #endregion

// #region Data
const isDeviceConfOpen = ref<boolean>(false);
const selectedDeviceId = ref<string>("");
const checkedDevicesIds = ref<any>([]);
// #endregion

// #region Computed
const selectedDevice = computed<Device>(() => (selectedDeviceId.value ? devicesStore.devicesByIds[selectedDeviceId.value] : null));
// #endregion

// #region Functions
function onAddDevice(): void {
	isDeviceConfOpen.value = true;
}

function onCancelDeviceConf(): void {
	isDeviceConfOpen.value = false;
	selectedDeviceId.value = "";
}

async function onConfirmDeviceConf(deviceConf: Device): Promise<void> {
	const isCreation = !deviceConf.id;

	if (isCreation) {
		try {
			devicesStore.addDevice(deviceConf);

			isDeviceConfOpen.value = false;
			selectedDeviceId.value = "";
		} catch (error) {
			console.error("An error occured while creating the device:", error);
		}

		return;
	}

	// devicesStore.modifyDevice(deviceConf);

	isDeviceConfOpen.value = false;
	selectedDeviceId.value = "";
}

async function onDeleteDevices(): Promise<void> {
	try {
		devicesStore.removeDevices(checkedDevicesIds.value);
	} catch (error) {
		console.error("An error occured while deleting the device(s).", error);
	} finally {
		checkedDevicesIds.value = [];
	}
}

function onEditDevice(id: string): void {
	isDeviceConfOpen.value = true;
	selectedDeviceId.value = id;
}
// #endregion

// #region Lifecycles
try {
	devicesStore.refreshDevices();
	console.log('djosghihg');
} catch (error) {
	console.error("An error occured while refreshing the devices.", error);
}
// #endregion
</script>
