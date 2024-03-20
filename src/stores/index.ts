import { defineStore } from "pinia";

import { createDevice, deleteDevice, getAllDevices } from "@src/mocks";
import type { Device } from "@src/common/types";

interface DevicesStoreState {
	devicesByIds: Record<string, Device>;
}

export const useDevicesStore = defineStore("devices", {
	state: (): DevicesStoreState => ({
		devicesByIds: null,
	}),
	getters: {
		devices(): any {
			return this.devicesByIds ? Object.values(this.devicesByIds) : [];
		},
	},
	actions: {
		async refreshDevices(): Promise<void> {
			const devices = await getAllDevices();

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
		modifyDevice() {},
		removeDevices: async (ids: Array<unknown>): Promise<void> => {
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
