# Without using redux toolkit
## 1. Install dependencies 
```
npm install react react-dom react-scripts redux react-redux
```
## 2. Create store

```
import { createStore } from "redux";

const initialState = {value: 0}

const reducer = (state: initialState, action) => {
    if (action.type === "add") {
        return {...state, value: state.value++}
    }
    return state;
}

export default createStore(reducer);
```

## 3. Initialize and wrap Provider

```
import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

## 4. Get values from store using useSelector

```
import { useSelector } from "react-redux";

function App() {
  const valueFromStore = useSelector((state)=>state.value)
}

```

## 5. Modify values in store using useDispatch
```
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch({type:"add"})
  }

  return <button onClick={addHandler}>Add</button>;
}

```

# Using redux toolkit
## 1. Install dependencies
```
npm install react react-dom react-scripts redux react-redux @reduxjs/toolkit
```
>`@reduxjs/toolkit` has been added

## 2. Create slices on separate files
- First example slice
  ```
  import { createSlice } from "@reduxjs/toolkit";

  const initialState = { value: 0 }

  const amountSlice = createSlice({
    name: "amount",
    initialState,
    reducers: {
      add(state) {
        state.value++
      },
      deduct(state) {
        state.value--
      },
    }
  })

  export const amountActions = amountSlice.actions
  export default amountSlice.reducer
  ```
- Second example slice
  ```
  import { createSlice } from "@reduxjs/toolkit";

  const initialState = { letter: 'a' }

  const letterSlice = createSlice({
    name: "letter",
    initialState,
    reducers: {
      change(state, action) {
        state.letter = action.payload
      },
    }
  })

  export const letterActions = letterSlice.actions
  export default letterSlice.reducer
  ```

## 3. Create store, import all slices
```
import {configureStore} from @reduxjs/toolkit;
import amountReducer from './amount';
import letterReducer from './letter';

export default configureStore({ 
  reducer: {
     amount: amountReducer, 
     letter: letterReducer,
  }
});
```

## 4. Initialize and wrap Provider
>Same method without using redux toolkit
```
import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

## 5. Get values from store using useSelector
```
import { useSelector } from "react-redux";

function App() {
  const valueFromStore = useSelector((state)=>state.amount.value);
  const letterFromStore = useSelector((state)=>state.letter.letter);
}

```
## 6. Modify values in store using useDispatch AND importing slice actions
```
import { useDispatch } from 'react-redux';
import { amountActions } from "../../store/amount";
import { letterActions } from "../../store/letter";


function App() {
  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch(amountActions())
  }

  const changeLetter = () => {
    dispatch(letterActions('b'))
  }

  return (
  <div>
    <button onClick={addHandler}>Add</button>
    <button onClick={changeLetter}>Change to b</button>
  </div>;
  );
}
```



