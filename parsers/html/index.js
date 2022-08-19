import { html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { Parser } from 'htmlparser2'

export default (code, cb) => {
  const inner = []

  const lt = '&lt;'
  const gt = '&gt;'

  const parser = new Parser({
    onopentag (name, attribs) {
      const attrs = []
      for (const name in attribs) {
        attrs.push(html` <span class="token attr-name">${name}</span>=\"<span class="token attr-value">${attribs[name]}</span>\"`)
      }

      // we have to use `unsafeHTML` for the &lt; / &gt; so they get decoded properly,
      // but confine unsafeness to only those html entities.
      inner.push(html`${unsafeHTML(lt)}<span class="token tag">${name}</span>${attrs}${unsafeHTML(gt)}`)
    },
    ontext (text) {
      inner.push(html`${text}`)
    },
    onclosetag (name) {
      inner.push(html`${unsafeHTML(lt)}/<span class="token tag">${name}</span>${unsafeHTML(gt)}`)
    },
    onend () {
      cb(inner)
    }
  })

  parser.write(code)
  parser.end()
}
