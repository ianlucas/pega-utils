import * as Inferno from 'inferno'
import ClipboardJS from 'clipboard'

export default class Clipboard extends Inferno.Component {
  bindElement(element) {
    if (!element) {return}
    new ClipboardJS(element)
  }

  render() {
    return (
      <button ref={this.bindElement} data-clipboard-text={this.props.content}>
        {this.props.children}
      </button>
    )
  }
}