import { createSlice } from '@reduxjs/toolkit'

export const seatSlice = createSlice({
  name: 'seats',
  initialState: {
    seats:[]
  },
  reducers: {
    selectseat: (state,action) => {
        const seat = action.payload;
        const exists = state.seats.find(s => s.seatNumber === seat.seatNumber);
        if (exists) {
          // Deselect seat
          state.seats = state.seats.filter(s => s.seatNumber !== seat.seatNumber);
        } else {
          // Select seat
          state.seats.push(seat);
        }
    },
    deselectSeat:(state,action)=>{
        state.seats=state.seats.filter(
            seat=>seat.seatNumber !== action.payload.seatNumber
        )
    },
    clearSeats: (state) => {
      state.seats =[];
    },
  },
})

export const { selectseat,deselectSeat, clearSeats } = seatSlice.actions;

export default seatSlice.reducer