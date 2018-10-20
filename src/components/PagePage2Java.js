import * as Inferno from 'inferno'
import Page2Java from '../utils/Page2Java'

import Code from './Code'
import Clipboard from './Clipboard'

export default class PagePage2Java extends Inferno.Component {
  state = {
    rawXML: '',
    pageName: '',
    pageClass: '',
    step: 1
  }

  handleXMLInput = e => {
    this.setState({ rawXML: e.target.value })
  }

  handlePageNameInput = e => {
    this.setState({ pageName: e.target.value })
  }

  handlePageClassInput = e => {
    this.setState({ pageClass: e.target.value })
  }

  handleProcess = () => {
    this.setState({
      step: this.state.step + 1,
      output: Page2Java.process(this.state.rawXML, this.state.pageClass, this.state.pageName)
    }) 
  }

  handleReset = () => {
    this.setState({
      rawXML: '',
      pageName: '',
      pageClass: '',
      step: 1
    })
  }

  render() {
    return (
      <div>
        <h1>Utilitário Page to Java</h1>
        {this.state.step === 1 ? (<section>
          <h2>1. Qual é o XML da page?</h2>
          <textarea
            value={this.state.rawXML}
            onInput={this.handleXMLInput}
            placeholder="Cole aqui o XML!"
          />
          <h2>2. Qual será a classe dessa page?</h2>
          <input
            value={this.state.pageClass}
            onInput={this.handlePageClassInput}
            placeholder="ex.: Data-Potal, Code-Pega-List"
          />
          <h2>3. Qual será o nome da nova page?</h2>
          <input
            value={this.state.pageName}
            onInput={this.handlePageNameInput}
            placeholder="ex.: PageExemplo"
          />
          <footer class="app-footer">
            <button
              disabled={!this.state.pageName.length || !this.state.rawXML.length}
              onClick={this.handleProcess}>
              Processar
            </button>
          </footer>
        </section>) : null}

        {this.state.step === 2 ? (<section>
          <h2>4. Copie o resultado e cole em uma step Java de uma Activity!</h2>
          <Code lang="java" content={this.state.output} />
          <footer class="app-footer">
            <Clipboard content={this.state.output}>Copiar Java</Clipboard>
            <button onClick={this.handleReset}>Recomeçar</button>
          </footer>
        </section>) : null}
      </div>
    )
  }
}