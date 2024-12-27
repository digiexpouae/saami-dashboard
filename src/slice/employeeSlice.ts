import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormData {
  inputone: string
  inputtwo: string
  inputthree: string
  inputfour: string
}

interface CounterState {
  forms: FormData[]
}

const initialState: CounterState = {
  forms: [],
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormData>) {
      state.forms.push(action.payload)
    },
  },
})

export const { addForm } = counterSlice.actions
export default counterSlice.reducer
