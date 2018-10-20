import * as Inferno from 'inferno'
import hljs from 'highlight.js'
import xml from 'highlight.js/lib/languages/xml'
import java from 'highlight.js/lib/languages/java'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/vs.css'

const LANGUAGE = { xml, java, json }
for (const language in LANGUAGE) {
  hljs.registerLanguage(language, LANGUAGE[language])
}

export default class Code extends Inferno.Component {
  highlightElement(element) {
    if (element === null) {return}
    hljs.highlightBlock(element)
  }

  render() {
    return (
      <pre
        className={this.props.lang}
        ref={this.highlightElement}>
        {this.props.content}
      </pre>
    )
  }
}