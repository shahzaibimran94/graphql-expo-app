export interface Account {
    _id: string;
    name: string;
    email: string;
    devices: Device[];
}

export interface Device {
    _id: string;
    name: string;
    type: string;
    accountId: string;
}