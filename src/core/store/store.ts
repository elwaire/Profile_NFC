import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import AuthReducer from './reducers/auth';
import BlogsReducer from './reducers/blogs';



const persistConfig = {
    key: 'root',
    storage,
    timeout: 30000,
    // whitelist: [],
    blacklist: ['blogs'],
    stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
    blogs : BlogsReducer,
    auth: AuthReducer
});

type RootState = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        root: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(),

    devTools: import.meta.env.MODE !== 'production',
});

export const persistor = persistStore(store);
