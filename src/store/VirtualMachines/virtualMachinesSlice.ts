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
        addContact: (state, action: PayloadAction<VirtualMachine>) => {
            state.virtualMachines.push(action.payload);
        },
        removeContact: (state, action: PayloadAction<number>) => {
            state.virtualMachines = state.virtualMachines.filter(contact => contact.id !== action.payload);
        },
        editContact: (state, action: PayloadAction<{ id: number, updatedVirtualMachine: VirtualMachine }>) => {
            const index = state.virtualMachines.findIndex(contact => contact.id === action.payload.id);
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

export default virtualMachinesSlice.reducer;
