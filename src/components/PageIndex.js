import * as Inferno from 'inferno'
import './PageIndex.css'

export default class Header extends Inferno.Component {
  render() {
    return (
      <div className="page-index">
        <h1>Utilitários para o PEGA do Ian</h1>
        <p>Oi, utilize o menu à esquerda para escolher um utilitário!</p>
        <section>
          <h2 className="page-index-subtitle">Page2Java</h2>
          <p>Converte o XML de uma Page para um script Java que pode recriá-la quando executado dentro de uma Activity.</p>
        </section>
        <section>
          <h2 className="page-index-subtitle">XMLRequest</h2>
          <p>A partir do XML fornecido, monta os dados de acordo com as informações das Pages fornecidas.</p>
        </section>
        <footer className="page-index-copy">
          &copy; 2018, Ian.
        </footer>
      </div>
    )
  }
}