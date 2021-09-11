import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Alert from './components/alert/Alert'
import Footer from './components/global/Footer'
import Header from './components/global/Header'
import PageRender from './PageRender'
const App = () => {
  return (
    <div className="container">
       <Router>
          <Alert/>
          <Header />
          <Switch>
              <Route exact path="/" component={PageRender} />
              <Route exact path="/:page" component={PageRender} />
              <Route exact path="/:page/:slug" component={PageRender} />
          </Switch>
          <Footer />
       </Router>
    </div>
  )
}

export default App
