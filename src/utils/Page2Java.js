import escape from 'js-string-escape'

class Page2Java {
  process(rawXML, pageClass, pageName) {
    const java =
`
// Cria a page ${pageName}
ClipboardPage page = tools.createPage("${pageClass}", "${pageName}");
try {
  // Carrega o XML.
  page.adoptXMLForm("${escape(rawXML.replace(/\n/g, ''))}");
}
catch (InvalidStreamError e) {
  // Não faz nada se der ruim na leitura do XML.
}
`
    return java
  }
}

export default new Page2Java()