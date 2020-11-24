import React, {useState, useEffect} from 'react'
import {ThemeProvider} from '@material-ui/core/styles'
import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { blueGrey, deepOrange } from '@material-ui/core/colors'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

import firebase from './firebaseService'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[500]
    },
    secondary: {
      main: deepOrange[500]
    }
  }
})

const App = () => {

  const [auth, setAuth] = useState(null)

  useEffect(() => {
    firebase.authChange().then(val => {
      setAuth(val)
    })
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path='/' render={() => <Home userName={auth ? auth.displayName : 'guest'}/>} /> */}
          <Route exact path='/' component={Home} />
          <Route exact path='/login' render={() => {
            return !firebase.getCurrentUserName() ? <Login/> : <Redirect to='/'/>
          }} />
          <Route exact path='/register' render={() => {
            return !firebase.getCurrentUserName() ? <Register/> : <Redirect to='/'/>
          }}  />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
