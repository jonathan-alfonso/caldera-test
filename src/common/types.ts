interface Ink {
	name: string;
	color: string;
	shortName: string;
}

interface Device {
	id: string;
	name: string;
	inks?: Ink[];
}

export type { Device, Ink };
