import { checkDeviceValidity, generateDeviceId } from "@src/helpers";
import type { Device } from "@src/common/types";

// #region DO NOT EDIT.
let DEVICES_API: Device[] = [
	{
		id: generateDeviceId(),
		name: "Device 1 - CMYK",
		// TODO: Must be uncommented when the ink selector feature will be done.
		// inks: [
		// 	{ name: "Cyan", color: "rgb(0, 255, 255)", shortName: "C" },
		// 	{ name: "Magenta", color: "rgb(255, 0, 255)", shortName: "M" },
		// 	{ name: "Yellow", color: "rgb(255, 255, 0)", shortName: "Y" },
		// 	{ name: "Black", color: "rgb(0, 0, 0)", shortName: "K" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// ],
	},
	{
		id: generateDeviceId(),
		name: "Device 2 - CMYKW",
		// TODO: Must be uncommented when the ink selector feature will be done.
		// inks: [
		// 	{ name: "Cyan", color: "rgb(0, 255, 255)", shortName: "C" },
		// 	{ name: "Magenta", color: "rgb(255, 0, 255)", shortName: "M" },
		// 	{ name: "Yellow", color: "rgb(255, 255, 0)", shortName: "Y" },
		// 	{ name: "Black", color: "rgb(0, 0, 0)", shortName: "K" },
		// 	{ name: "White", color: "rgb(255, 255, 255)", shortName: "W" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// ],
	},
	{
		id: generateDeviceId(),
		name: "Device 3 - cmyK",
		// TODO: Must be uncommented when the ink selector feature will be done.
		// inks: [
		// 	{ name: "LightCyan", color: "rgb(127, 255, 255)", shortName: "c" },
		// 	{ name: "LightMagenta", color: "rgb(255, 127, 255)", shortName: "m" },
		// 	{ name: "LightYellow", color: "rgb(255, 255, 127)", shortName: "y" },
		// 	{ name: "Black", color: "rgb(0, 0, 0)", shortName: "K" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// ],
	},
	{
		id: generateDeviceId(),
		name: "Device 4 - CMYKW",
		// TODO: Must be uncommented when the ink selector feature will be done.
		// inks: [
		// 	{ name: "Cyan", color: "rgb(0, 255, 255)", shortName: "C" },
		// 	{ name: "Magenta", color: "rgb(255, 0, 255)", shortName: "M" },
		// 	{ name: "Yellow", color: "rgb(255, 255, 0)", shortName: "Y" },
		// 	{ name: "Black", color: "rgb(0, 0, 0)", shortName: "K" },
		// 	{ name: "White", color: "rgb(255, 255, 255)", shortName: "W" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// 	{ name: "-", color: "", shortName: "-" },
		// ],
	},
];
// #endregion

async function getAllDevices(): Promise<Device[]> {
	console.log("getAllDevices", DEVICES_API);

	return Promise.resolve(DEVICES_API);
}

async function createDevice(deviceConf: Device): Promise<Device["id"]> {
	const isInvalid = checkDeviceValidity(deviceConf);

	if (typeof isInvalid === "string") {
		let message = "REQ_INVALID: ";

		message += isInvalid;

		return Promise.reject(message);
	}

	const id = generateDeviceId();

	DEVICES_API.push({
		id,
		name: deviceConf.name,
		// TODO: Must be uncommented when the ink selector feature will be done.
		// inks: deviceConf.inks,
	});

	return Promise.resolve(id);
}

async function editDevice(deviceConf: Device): Promise<string> {
	let message = "REQ_INVALID: ";

	if (!DEVICES_API.find((deviceApi) => deviceApi.id === deviceConf.id)) {
		message += "The device that you are trying to edit doesn't not exist.";

		return Promise.reject(message);
	}

	const isInvalid = checkDeviceValidity(deviceConf);

	if (typeof isInvalid === "string") {
		message += isInvalid;

		return Promise.reject(message);
	}

	DEVICES_API.reduce((acc: Device[], device: Device) => {
		if (device.id === deviceConf.id) {
			device = deviceConf;
		}

		return acc;
	}, []);

	return Promise.resolve("Device has been successfully edited.");
}

async function deleteDevice(id: Device["id"]): Promise<string> {
	const isDeviceExist = DEVICES_API.find((device) => device.id === id);

	if (!isDeviceExist) {
		return Promise.reject("Deleted device doesn't exist.");
	}

	DEVICES_API.splice(DEVICES_API.indexOf(DEVICES_API.find((device) => device.id === id)), 1);

	return Promise.resolve("Device has been successfully deleted.");
}

export { DEVICES_API, createDevice, deleteDevice, editDevice, getAllDevices };
