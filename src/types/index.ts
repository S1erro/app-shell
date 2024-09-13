export const FormItemRules = [
    {
        required: true,
        message: "Обязательное поле"
    }
];

export const dividerProps: {
    orientation: "left" | "right" | "center";
    orientationMargin: string;
} = {
    orientation: "left",
    orientationMargin: "0"
}

export enum OperatingSystems {
    UBUNTU = 'Ubuntu',
    CENTOS = 'CentOS',
    DEBIAN = 'Debian',
    FEDORA = 'Fedora',
    OPENSUSE = 'OpenSUSE',
    FEDORA_COREOS = 'Fedora CoreOS'
}

export enum StandardConfig {
    CONFIG_2vCPU_2GB = '2 vCPU, 2 ГБ RAM',
    CONFIG_2vCPU_4GB = '2 vCPU, 4 ГБ RAM',
    CONFIG_4vCPU_8GB = '4 vCPU, 8 ГБ RAM',
    CONFIG_4vCPU_4GB = '4 vCPU, 4 ГБ RAM',
    CONFIG_8vCPU_16GB = '8 vCPU, 16 ГБ RAM',
    CONFIG_8vCPU_8GB = '8 vCPU, 8 ГБ RAM',
}

export enum HighCoreConfig {
    CONFIG_12vCPU_2GB = '12 vCPU, 2 ГБ RAM',
    CONFIG_12vCPU_4GB = '12 vCPU, 4 ГБ RAM',
    CONFIG_16vCPU_8GB = '16 vCPU, 8 ГБ RAM',
    CONFIG_16vCPU_4GB = '16 vCPU, 4 ГБ RAM',
    CONFIG_18vCPU_16GB = '18 vCPU, 16 ГБ RAM',
    CONFIG_18vCPU_8GB = '18 vCPU, 8 ГБ RAM',
}

export enum HighMemoryConfig {
    CONFIG_2vCPU_24GB = '2 vCPU, 24 ГБ RAM',
    CONFIG_2vCPU_48GB = '2 vCPU, 48 ГБ RAM',
    CONFIG_4vCPU_96GB = '4 vCPU, 96 ГБ RAM',
    CONFIG_4vCPU_48GB = '4 vCPU, 48 ГБ RAM',
    CONFIG_8vCPU_128GB = '8 vCPU, 128 ГБ RAM',
    CONFIG_8vCPU_96GB = '8 vCPU, 96 ГБ RAM',
}

export enum StorageCapacityRange {
    min = 240,
    max = 4096
}

export enum ServerOptions {
    'ru-central1-d',
    'ru-central2-d',
    'by-north1-d',
    'kz-west1-d'
}

export enum FetchStatus {
    'rejected',
    'idle',
    'pending',
    'fulfilled',
}

export interface VirtualMachine {
    drivesCapacity: { capacity: number; }[];
    machineName: string;
    operatingSystem: string;
    privateIP: string;
    publicIP: string;
    serverLocation: string;
    sshKey: string;
    startAfterCreate: boolean;
    machineConfiguration: string;
    id: number;
}

export interface VirtualMachinesState {
    virtualMachines: VirtualMachine[];
    status: FetchStatus
}

export interface ContactsState {
    contacts: Contact[];
    status: FetchStatus;
}

export interface Contact {
    name: string;
    email: string;
    phone?: string;
    category?: string;
    gender?: string;
    id: number;
}

export enum Category {
    Friend = "Друг",
    Enemy = "Враг",
    Acquaintance = "Знакомый",
    Unselected = ""
}

export enum Gender {
    male = "Мужчина",
    female = "Женщина",
    unselected = ""
}