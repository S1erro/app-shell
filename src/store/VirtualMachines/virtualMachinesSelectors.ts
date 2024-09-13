import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";
import {VirtualMachinesState, FetchStatus} from "types";

const getAsyncStatusData = (data: VirtualMachinesState) => ({
    hasError: data?.status === FetchStatus.rejected,
    isIdle: data?.status === FetchStatus.idle,
    isLoading: data?.status === FetchStatus.pending,
    isLoaded: data?.status === FetchStatus.fulfilled,
})

const getAsyncActionData = (stateParam: VirtualMachinesState) => ({
    virtualMachines: stateParam?.virtualMachines,
    status: getAsyncStatusData(stateParam)
})

export const selectVirtualMachinesStore = (state: RootState) => state.virtualMachines

export const selectVirtualMachines = createSelector(selectVirtualMachinesStore, (state) => getAsyncActionData(state))