import { createStore } from "redux";
import movieReducer from './reducers';

let store = createStore(movieReducer);

export default store;