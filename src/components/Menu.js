import * as Inferno from 'inferno'
import { NavLink } from 'inferno-router'
import './Menu.css'

export default class Menu extends Inferno.Component {
  state = {
    items: [
      {
        label: 'Início',
        uri: '/',
      },
      {
        label: 'Page2Java',
        uri: '/page-to-java'
      },
      {
        label: 'XMLRequest',
        uri: '/xml-request'
      }
    ]
  }

  render() {
    return (
      <nav class="menu">
        <ul class="menu-list">
          {this.state.items.map(item =>
            (<li activeClassName="active" class="menu-item" key={item.uri}>
              <NavLink className="menu-link" to={item.uri} exact>{item.label}</NavLink>
            </li>)
          )}
        </ul>
      </nav>
    )
  }
}