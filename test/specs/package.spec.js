import { describe, test, expect } from "vitest";

import packageInfos from "../../package.json";

describe("Given the package.json is open", () => {
	describe("When the name is get", () => {
		test("Then we should have a name", () => {
			const name = packageInfos.name.trim();
			expect(name.length).not.toBe(0);
		});
	});
});
