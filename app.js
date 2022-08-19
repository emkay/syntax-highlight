import {LitElement, html} from 'lit'
import cssVars from './themes/default.js'
import cssStyles from './css/styles.js'

export class SyntaxHighlight extends LitElement {
  static properties = {
    language: {},
    highlighted: {}
  }

  static styles = [
    cssVars,
    cssStyles
  ]

  constructor() {
    super()
    this.language = null
    this.highlighted = null
  }

  handleSlotChange(e) {
    const childNodes = e.target.assignedNodes({flatten: true})

    if (childNodes && childNodes.length > 0) {
      const codeNode = childNodes[0]
      const code = codeNode.textContent

      import(`./parsers/${this.language}/index.js`).then(parser => {
        const parse = parser.default
        parse(code, (inner) => {
          this.highlighted = this.highlighted ? this.highlighted : inner
        })
      })
    }
  }

  render() {
    const codeNode = this.highlighted ? this.highlighted : html`<slot @slotchange=${this.handleSlotChange}></slot>`
    return html`
      <div>
        <pre>
          <code>
          ${codeNode}
          </code>
        </pre>
      </div>
    `
  }
}

customElements.define('syntax-highlight', SyntaxHighlight)
