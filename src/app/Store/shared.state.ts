export interface SharedState {
  showLoading: boolean;
  errorMessage:string;
  showloginError:boolean;
}

export const initialState: SharedState = {
  showLoading: false,
  errorMessage:"",
  showloginError:false,
};
