import { v4 as uuid } from "uuid";

import type { Device, Ink } from "@src/common/types";

function checkDeviceValidity(deviceConf: Device): string | false {
	let message = "";

	if (!deviceConf.name) {
		message += "Device name is missing.";

		return message;
	}

	// TODO: Must be uncommented when the ink selector feature will be done.
	// if (!checkDeviceInksValidity(deviceConf.inks)) {
	// 	message += "Device inks are invalid. (Required inks: Cyan, Magenta, Yellow and Black).";

	// 	return message;
	// }

	return false;
}

function checkDeviceInksValidity(deviceInks: Ink[]) {
	if (deviceInks.length !== 9) {
		return false;
	}

	const REQUIRED_COLORS = ["Cyan", "Magenta", "Yellow", "Black"];

	return REQUIRED_COLORS.every((color) => deviceInks.some((ink) => ink.name === color));
}

function generateDeviceId() {
	return `dvc#${uuid()}`;
}

export { checkDeviceValidity, generateDeviceId };
