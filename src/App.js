import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './Pages/Home/Home.js'
import Header from './Components/Header/Header.js'
import { Details } from './Pages/Details/Details.js'
import Login from './Pages/Login/Login.js'
import Account from './Pages/Account/Account.js'
import Register from './Pages/Login/Register.js'
import Create from './Components/Create/Create.js'
import Footer from './Components/Footer/Footer.js'

export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/details/:id' Component={Details} />
          <Route exact path='/login' Component={Login} />
          <Route exact path='/account' Component={Account} />
          <Route exact path='/register' Component={Register} />
          <Route exact path='/create' Component={Create} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
