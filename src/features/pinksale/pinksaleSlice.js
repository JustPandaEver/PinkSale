import { loadWeb3 } from '../../connectivity/connectivity';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const connectWallet = createAsyncThunk(
    'pinksale/connectWallet',
    async () => {
        let acc = await loadWeb3();

        // const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(
        //     (data) => data.json()
        // )
        return acc
    })

const initialState = {
    walletaddress: '',
    userLockedData: [],
    allLockedData: [],
    locksForTokens: []

}

export const pinksaleSlice = createSlice({
    name: 'pinksaleSlice',
    initialState,
    reducers: {
        userLockedData: (state, action) => {
            // let acc = await loadWeb3();
            // console.log('state userdata', action.payload)
            state.userLockedData = action.payload

        },
        allLockedData: (state, action) => {
            // let acc = await loadWeb3();
            // console.log('state userdata', action.payload)
            state.allLockedData = action.payload

        },
        locksForToken: (state, action) => {
            // let acc = await loadWeb3();
            console.log('stateuserdata', action.payload)
            state.locksForTokens = action.payload

        },
    },
    extraReducers: {
        [connectWallet.pending]: (state) => {
            // state.loading = true
        },
        [connectWallet.fulfilled]: (state, { payload }) => {

            state.walletaddress = payload

        },
        [connectWallet.rejected]: (state) => {
            // state.loading = false
        },
    }


})

// Action creators are generated for each case reducer function
export const { userLockedData, allLockedData, locksForToken } = pinksaleSlice.actions

export default pinksaleSlice.reducer