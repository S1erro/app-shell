import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './Contacts/contactsSlice';
import virtualMachinesReducer from './VirtualMachines/virtualMachinesSlice';

const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        virtualMachines: virtualMachinesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
