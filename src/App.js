import * as Inferno from 'inferno'
import { HashRouter, Route } from 'inferno-router'
import './App.css'

import PageIndex from './components/PageIndex'
import PagePage2Java from './components/PagePage2Java'
import PageXMLRequest from './components/PageXMLRequest'
import Menu from './components/Menu'

class App extends Inferno.Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <div className="app-menu">
            <Menu />
          </div>
          <div className="app-page">
            <Route path="/" component={PageIndex} exact />
            <Route path="/page-to-java" component={PagePage2Java} />
            <Route path="/xml-request" component={PageXMLRequest} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App;
