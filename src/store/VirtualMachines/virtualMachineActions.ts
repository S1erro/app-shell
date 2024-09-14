import { useDispatch } from 'react-redux';
import {addVirtualMachine, removeVirtualMachine, editVirtualMachine} from './virtualMachinesSlice';
import {VirtualMachine} from "types";

export const useVirtualMachinesActions = () => {
    const dispatch = useDispatch();

    const handleAddVirtualMachine = (virtualMachine: VirtualMachine) => {
        dispatch(addVirtualMachine(virtualMachine));
    };

    const handleRemoveVirtualMachine = (id: number) => {
        dispatch(removeVirtualMachine(id));
    };

    const handleEditVirtualMachine = (id: number, updatedVirtualMachine: VirtualMachine) => {
        dispatch(editVirtualMachine({ id, updatedVirtualMachine }));
    };

    return {
        handleAddVirtualMachine,
        handleRemoveVirtualMachine,
        handleEditVirtualMachine,
    };
};
