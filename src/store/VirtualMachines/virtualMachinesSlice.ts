import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialVirtualMachinesState} from "./initialState";
import {VirtualMachine, FetchStatus} from "types";
import {fetchVirtualMachines} from "../api";

export const fetchedVirtualMachines = createAsyncThunk(
    'machines/fetchById',
    async () => {
        return await fetchVirtualMachines()
    },
)

const virtualMachinesSlice = createSlice({
    name: "VirtualMachines",
    initialState: initialVirtualMachinesState,
    reducers: {
        addVirtualMachine: (state, action: PayloadAction<VirtualMachine>) => {
            state.virtualMachines.push(action.payload);
        },
        removeVirtualMachine: (state, action: PayloadAction<number>) => {
            state.virtualMachines = state.virtualMachines.filter(virtualMachine => virtualMachine.id !== action.payload);
        },
        editVirtualMachine: (state, action: PayloadAction<{ id: number, updatedVirtualMachine: VirtualMachine }>) => {
            const index = state.virtualMachines.findIndex(virtualMachine => virtualMachine.id === action.payload.id);
            if (index !== -1) {
                state.virtualMachines[index] = action.payload.updatedVirtualMachine;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedVirtualMachines.pending, (state) => {
                state.status = FetchStatus.pending;
            })
            .addCase(fetchedVirtualMachines.fulfilled, (state, action) => {
                state.virtualMachines = action.payload;
                state.status = FetchStatus.fulfilled;
            })
            .addCase(fetchedVirtualMachines.rejected, (state) => {
                state.status = FetchStatus.rejected;
            });
    }
})

export const {addVirtualMachine, removeVirtualMachine, editVirtualMachine} = virtualMachinesSlice.actions;

export default virtualMachinesSlice.reducer;
