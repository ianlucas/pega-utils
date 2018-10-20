class XMLRequest {
  constructor() {
    this.xml = null
  }

  parse(rawXML) {
    const parser = new DOMParser()
    return parser.parseFromString(rawXML, 'application/xml').firstChild
  }

  setXML(rawXML) {
    this.xml = this.parse(rawXML)
  }

  getPages() {
    return Array.from(this.xml.children).map(element => {
      return element.tagName
    })
  }

  process(rawPages) {
    for (const page in rawPages) {
      const pageElement = (this.xml.getElementsByTagName(page) || [])[0]
      if (!pageElement) {continue}
      const hash = {}
      for (let line of rawPages[page].split('\n')) {
        line = line.trim()
        if (!line.length) {continue}
        const stop = Math.max(line.indexOf(' '), 0)
        const prop = line.substring(0, stop === 0 ? line.length : stop)
        const value = stop === 0 ? '' : line.substr(line.indexOf(' ') + 1)
        hash[prop] = value
      }
      for (const propElement of Array.from(pageElement.children)) {
        const value = hash[propElement.tagName]
        propElement.innerHTML = value ? value : ''
      }
    }
    return this.xml.outerHTML.replace(/<([^/]+)\/>/g, '<$1></$1>')
  }
}

export default new XMLRequest()