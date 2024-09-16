import {FetchStatus, VirtualMachinesState} from "types";

export const initialVirtualMachinesState: VirtualMachinesState = {
    virtualMachines: [],
    status: FetchStatus.pending,
};