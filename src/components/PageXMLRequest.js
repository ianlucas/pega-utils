import * as Inferno from 'inferno'
import XMLRequest from '../utils/XMLRequest'
import copy from '../utils/copy'

import Code from './Code'
import Clipboard from './Clipboard'

export default class PageXMLRequest extends Inferno.Component {
  state = {
    rawXML: '',
    pages: {},
    pageNames: [],
    currentPage: 0,
    currentPageName: null,
    step: 1,
    output: ''
  }

  handleNextPage = () => {
    const next = this.state.currentPage + 1
    this.setState({
      currentPage: next,
      currentPageName: this.state.pageNames[next]
    })
  }

  handlePreviousPage = () => {
    const previous = this.state.currentPage - 1
    this.setState({
      currentPage: previous,
      currentPageName: this.state.pageNames[previous]
    })
  }

  handleInput = e => {
    this.setState({ rawXML: e.target.value })
  }

  handlePageInput = e => {
    this.setState({
      pages: copy(this.state.pages, {
        [this.state.currentPageName]: e.target.value
      })
    })
  }

  handleBackToStep(step) {
    this.setState({ step })
  }

  handleStep1 = () => {
    this.setState({
      step: this.state.step + 1
    })
    XMLRequest.setXML(this.state.rawXML)
    const pages = {}
    const pageNames = XMLRequest.getPages()
    for (const page of pageNames) {
      pages[page] = ''
    }
    this.setState({
      pages,
      pageNames,
      currentPage: 0,
      currentPageName: pageNames[0]
    })
  }

  handleStep2 = () => {
    this.setState({
      step: this.state.step + 1,
      output: XMLRequest.process(this.state.pages)
    })
  }

  handleReset = () => {
    this.setState({
      rawXML: '',
      step: 1
    })
  }

  validatePages() {
    for (const page in this.state.pages) {
      if (!this.state.pages[page].length) {
        return true
      }
    }
    return false
  }

  render() {
    return (
      <div>
        <h1>Utilitário XMLRequest</h1>

        {this.state.step === 1 ? (<div>
          <h2>1. Qual é o XML?</h2>
          <textarea
            className="app-monospace"
            value={this.state.rawXML}
            onInput={this.handleInput}
            placeholder="<Base>\n  Cole aqui seu XML.\n</Base>"
          />
          <ul>
            <li>** Só o clipboard do 6.3 funcionará aqui! **</li>
            <li>Consideraremos que os elementos filhos do elemento raiz são Pages do clipboard.</li>
          </ul>
          <footer class="app-footer">
            <button
              disabled={!this.state.rawXML.length}
              onClick={this.handleStep1}>
              Continuar
            </button>
          </footer>
        </div>) : null}

        {this.state.step === 2 ? (<div>
          <h2>2.{this.state.currentPage + 1}. Cole o clipboard da page {this.state.currentPageName}.</h2>
          <textarea
            className="app-monospace"
            value={this.state.pages[this.state.currentPageName]}
            onInput={this.handlePageInput}
            placeholder={`ColeAqui Sua page ${this.state.currentPageName}\nCopieDo Jeito que está no Clipboard`}
          />
          <ul>
            <li>Selecione todo o texto da page no clipboard e cole-a no campo acima.</li>
          </ul>
          <footer class="app-footer">
            <button
              disabled={!this.state.rawXML.length}
              onClick={this.handleBackToStep.bind(this, 1)}>
              Voltar
            </button>
            <button
              disabled={!(this.state.currentPage !== 0)}
              onClick={this.handlePreviousPage}>
              Anterior
            </button>
            <button
              disabled={!(this.state.currentPage < this.state.pageNames.length - 1)}
              onClick={this.handleNextPage}>
              Próxima
            </button>
            <button
              disabled={this.validatePages()}
              onClick={this.handleStep2}>
              Processar
            </button>
          </footer>
        </div>) : null}

        {this.state.step === 3 ? (<div>
          <h2>3. Copie o resultado!</h2>
          <Code lang="xml" content={this.state.output} />
          <footer class="app-footer">
            <Clipboard content={this.state.output}>
              Copiar XML
            </Clipboard>
            <button onClick={this.handleReset}>
              Recomeçar
            </button>
          </footer>
        </div>) : null}
      </div>
    )
  }
}