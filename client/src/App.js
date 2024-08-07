import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './Pages/Home/Home'
import Header from './Components/Header/Header'
import Details from './Pages/Details/Details'
import Login from './Pages/Login/Login'
import Account from './Pages/Account/Account'
import Register from './Pages/Login/Register'
import Create from './Components/Create/Create'
import Footer from './Components/Footer/Footer'
import MyPosts from './Components/Blog/MyPosts'
import Edit from './Components/Edit/Edit'

export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/Blog' Component={Home} />
          <Route exact path='/details/:postId' Component={Details} />
          <Route exact path='/edit/:postId' Component={Edit} />
          <Route exact path='/myposts' Component={MyPosts} />
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
