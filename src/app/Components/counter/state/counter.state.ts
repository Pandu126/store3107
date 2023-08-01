export interface CounterState {
  counter: number;
  dummyText: string;
}

export const initialState: CounterState = {
  counter: 4,
  dummyText: 'dummy text',
};
