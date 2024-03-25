import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, test } from "vitest";

import { useDevicesStore } from "@src/stores";

import { DEVICES_API } from "@src/mocks";

describe("Given the store is open", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	describe("When the device list is refresh", () => {
		test("Then a list of devices must be filled in the store", async () => {
			const devicesStores = useDevicesStore();
			await devicesStores.refreshDevices();

			expect(devicesStores.devicesByIds).toHaveLength(DEVICES_API.length);
		});
	});

	describe("When a device is add", () => {
		test("Then a new device must be filled in the store", async () => {
			const devicesStores = useDevicesStore();

			const deviceConf = {
				name: "Test",
				// TODO: Must be uncommented when the ink selector feature will be done.
				inks: [
					{ name: "Cyan", color: "rgb(0, 255, 255)", shortName: "C" },
					{ name: "Magenta", color: "rgb(255, 0, 255)", shortName: "M" },
					{ name: "Yellow", color: "rgb(255, 255, 0)", shortName: "Y" },
					{ name: "Black", color: "rgb(0, 0, 0)", shortName: "K" },
					{ name: "-", color: "", shortName: "-" },
					{ name: "-", color: "", shortName: "-" },
					{ name: "-", color: "", shortName: "-" },
					{ name: "-", color: "", shortName: "-" },
				],
			};

			await devicesStores.addDevice(deviceConf);
		});
	});

	describe("When a device is deleted", () => {
		test("Then the selected device must be removed of the store", async () => {
			const devicesStores = useDevicesStore();

			await devicesStores.refreshDevices();
			await devicesStores.removeDevices([DEVICES_API[0].id]);

			expect(devicesStores.devicesByIds).not.toEqual(expect.objectContaining(DEVICES_API[0]));
		});
	});
});
