import { defineStore } from "pinia";

import { createDevice, deleteDevice, editDevice, getAllDevices } from "@src/mocks";
import type { Device } from "@src/common/types";

interface DevicesStoreState {
	// Added null since devicesByIds is initialized as null in the state
	devicesByIds: Record<string, Device> | null;
}

export const useDevicesStore = defineStore("devices", {
	state: (): DevicesStoreState => ({
		devicesByIds: null,
	}),
	getters: {
		// Added strict type to devices as it helps with autocompletion and error checking
		devices(): Device[] {
			return this.devicesByIds ? Object.values(this.devicesByIds) : [];
		},
	},
	actions: {
		async refreshDevices(): Promise<void> {
			const devices = await getAllDevices();
			console.log("devices", devices);

			this.devicesByIds = devices.reduce((acc: Record<string, Device>, device: Device) => {
				acc[device.id] = device;

				return acc;
			}, {});
		},
		async addDevice(deviceConf: Device): Promise<void> {
			const id = await createDevice(deviceConf);

			this.devicesByIds = {
				...this.devicesByIds,
				[id]: deviceConf,
			};
		},
		async modifyDevice(device: Device): Promise<void> {
			const id = await editDevice(device);
		},
		async removeDevices(ids: Array<string>): Promise<void> {
			const results = await Promise.allSettled(ids.map((id) => deleteDevice(id)));

			if (results.some((result) => result.status === "rejected")) {
				throw new Error("Failed to deleted devices.");
			}

			ids.forEach((id) => {
				delete this.devicesByIds[id];
			});
		},
	},
});
