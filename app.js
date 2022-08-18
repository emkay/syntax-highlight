import {LitElement, html} from 'lit'
import cssVars from './themes/default.js'
import cssStyles from './css/styles.js'
import parser from './parsers/css'

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

  firstUpdated() {
    // adoptStyles(this.shadowRoot, styles)
  }

  handleSlotChange(e) {
    console.log(`language:`, this.language)
    const childNodes = e.target.assignedNodes({flatten: true})

    if (childNodes && childNodes.length > 0) {
      const codeNode = childNodes[0]
      const code = codeNode.textContent

      parser(code, (inner) => {
        this.highlighted = this.highlighted ? this.highlighted : inner
        console.log(`highlighted:`, this.highlighted)
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
