import { configureStore } from '@reduxjs/toolkit';
import taskListsReducer from './reducers/taskLists';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const store = configureStore({
  reducer: {
    taskLists: taskListsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
