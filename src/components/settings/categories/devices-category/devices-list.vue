<template>
	<div class="settings-category-panel">
		<!-- Actions -->
		<div class="d-flex justify-content-end gap-1 mb-2">
			<img
				class="button-icon"
				:src="deviceDelete"
				@click="onDeleteDevices"
			/>
			<img
				class="button-icon"
				:src="deviceAdd"
				@click="onAddDevice"
			/>
		</div>

		<!-- List -->
		<div class="settings-list">
			<div
				v-for="device of devicesStore.devices"
				:key="device.id"
				class="list-item d-flex gap-3"
			>
				<input
					type="checkbox"
					:value="checkedDevicesIds.includes(device.id)"
					@change="onCheckDeviceItem(device.id)"
				/>

				<div
					class="item"
					:class="{ selected: selectedDeviceId === device.id }"
					@click="onSelectDeviceItem(device.id)"
					@mouseenter="onMouseoverDeviceItem(device.id)"
					@mouseleave="onMouseoverDeviceItem('')"
				>
					{{ device.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import clone from "lodash.clonedeep";
import { ref } from "vue";

import { useDevicesStore } from "@src/stores";

import deviceDelete from "@src/assets/icons/device-delete.svg";
import deviceAdd from "@src/assets/icons/device-add.svg";

interface Props {
	checkedDevicesIds: any;
	selectedDeviceId?: string;
}

const props = withDefaults(defineProps<Props>(), {
	selectedDeviceId: null,
});

type Emits = {
	"add-device";
	"delete-devices";
	"update:checked-devices-ids": [newCheckedDevicesIds: any];
	"update:selected-device-id": [newSelectedDeviceId: string];
};

const emit = defineEmits<Emits>();

// #region Composables
const devicesStore = useDevicesStore();
// #endregion

// #region Data
const highlightedDeviceId = ref<string>("");
// #endregion

// #region Functions
function onAddDevice(): void {
	emit("add-device");
}

function onCheckDeviceItem(id: unknown): any {
	const newCheckedDevicesIds = clone(props.checkedDevicesIds);

	if (newCheckedDevicesIds.includes(id)) {
		newCheckedDevicesIds.splice(newCheckedDevicesIds.indexOf(id), 1);
	} else {
		newCheckedDevicesIds.push(id);
	}

	emit("update:checked-devices-ids", newCheckedDevicesIds);
}

function onDeleteDevices(): void {
	emit("delete-devices");
}

function onMouseoverDeviceItem(id: string): void {
	highlightedDeviceId.value = id;
}

function onSelectDeviceItem(id: string): void {
	props.selectedDeviceId = id;
}
// #endregion
</script>
