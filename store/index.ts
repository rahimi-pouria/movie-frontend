import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

type AnyObj = Record<string, any>

type AutoModule = {
    state?: AnyObj
    actions?: Record<string, (state: AnyObj, ...args: any[]) => void>
    getters?: Record<string, (state: AnyObj) => any>
}

let dynamicState: AnyObj = {}
let dynamicReducers: AnyObj = {}
let dynamicSelectors: AnyObj = {}

const autoSlice = createSlice({
    name: 'auto',
    initialState: dynamicState,
    reducers: {}
})

let store = configureStore({
    reducer: {
        auto: autoSlice.reducer
    }
})

export function addModule(options: AutoModule) {
    if (options.state) {
        // @ts-ignore
        Object.assign(dynamicState, options.state)
        store.dispatch({
            type: 'auto/init',
            payload: options.state
        })
    }

    if (options.actions) {
        for (const key in options.actions) {
            dynamicReducers[key] = (state: AnyObj, action: PayloadAction<any[]>) => {
                options.actions![key](state, ...(action.payload || []))
            }
        }
    }

    if (options.getters) {
        for (const key in options.getters) {
            dynamicSelectors[key] = (rootState: any) =>
                options.getters![key](rootState.auto)
        }
    }

    const newSlice = createSlice({
        name: 'auto',
        initialState: dynamicState,
        reducers: dynamicReducers
    })

    store.replaceReducer({
        // @ts-ignore
        auto: newSlice.reducer
    })

    return {
        state: () => store.getState().auto,
        // @ts-ignore
        actions: Object.fromEntries(
            Object.keys(dynamicReducers).map(k => [
                k,
                (...args: any[]) =>
                    store.dispatch({
                        type: `auto/${k}`,
                        payload: args
                    })
            ])
        ),
        getters: dynamicSelectors
    }
}

export { store }
