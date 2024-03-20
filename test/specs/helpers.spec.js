import { describe, test, expect } from "vitest";

import { checkDeviceValidity } from "@src/helpers";

describe("Given the helper is open", () => {
	describe("Given the validity of a device must be check", () => {
		describe("When the device is valid", () => {
			const deviceConf = {
				name: "Test",
				inks: [
					{ name: "Cyan", color: "rgb(0, 255, 255)", shortName: "C" },
					{ name: "Magenta", color: "rgb(255, 0, 255)", shortName: "M" },
					{ name: "-", color: "", shortName: "-" },
					{ name: "Black", color: "rgb(0, 0, 0)", shortName: "K" },
					{ name: "-", color: "", shortName: "-" },
					{ name: "-", color: "", shortName: "-" },
					{ name: "-", color: "", shortName: "-" },
					{ name: "-", color: "", shortName: "-" },
					{ name: "-", color: "", shortName: "-" },
				],
			};

			test("Then the device must be valid", () => {
				const isInvalid = checkDeviceValidity(deviceConf);

				expect(isInvalid).toBe(false);
			});
		});
	});
});
