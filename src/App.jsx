import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import Header from './Header.jsx'
import Router from './components/router/index.jsx'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className='container'>
          <Header />
          <Router />
        </div>
      </PersistGate>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
