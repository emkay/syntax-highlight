import { html } from 'lit'
import parser from 'css-tree/parser'
import walker from 'css-tree/walker'

export default (code, cb) => {
  const inner = ['\n']
  const tokenClass = `token`

  const openBracket = html`&#123;`
  const closeBracket = html`&#125;`

  const ast = parser(code)
  walker(ast, (node, item) => {
    // console.log(`node:`, node)
    // console.log(`item:`, item)
    // console.log(`list:`, list)
    if (node.type === 'TypeSelector') {
      inner.push(html`<span class="${tokenClass} selector">${node.name}</span> `)
    } else if (node.type === 'ClassSelector') {
      inner.push(html`<span class="${tokenClass} selector">.${node.name}</span> `)
    } else if (node.type === 'IdSelector') {
      inner.push(html`<span class="${tokenClass} selector">#${node.name}</span> `)
    } else if (node.type === 'Block') {
      inner.push(html`<span>${openBracket}\n</span>`)
    } else if (node.type === 'Dimension') {
      inner.push(html`<span>${node.value}${node.unit} </span>`)
    } else if (node.type === 'Declaration') {
      inner.push(html`<span class="${tokenClass} keyword">\t${node.property}: </span>`)
    } else if (node.type === 'Rule' && item && item.prev) {
      inner.push(html`${closeBracket}\n`)
    } else if (node.type === 'Identifier') {
      if (item && item.next === null) {
        inner.push(html`<span>${node.name};\n</span>`)
      } else {
        inner.push(html`<span>${node.name} </span>`)
      }
    } else if (node.type === 'Hash') {
      if (item && item.next === null) {
        inner.push(`#${node.value};\n`)
      } else {
        inner.push(`#${node.value}`)
      }
    }
  })

  inner.push('}\n')

  cb(inner)
}
