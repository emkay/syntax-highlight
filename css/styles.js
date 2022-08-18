import {css} from 'lit'

export default css`
code,
pre {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: var(--font);
  font-size: 1em;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  line-height: 1.5;
  tab-size: 4;
  hyphens: none;
}

code::selection,
pre::selection {
  background: var(--selection-bg-color);
  color: var(--selection-color);
}

pre {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
  border-radius: var(--border-radius);
}

.token.comment {
  color: var(--comment-color);
}

.token.punctuation {
  color: var(--punctuation-color);
}

.token.entity {
  color: var(--entity-color);
}

.token.attr-name {
  color: var(--attr-name-color);
}

.token.class-name {
  color: var(--class-name-color);
}

.token.boolean {
  color: var(--boolean-color);
}

.token.constant {
  color: var(--constant-color);
}

.token.number {
  color: var(--number-color);
}

.token.atrule {
  color: var(--atrule-color);
}

.token.attr-value {
  color: var(--attr-value-color);
}

.token.keyword {
  color: var(--keyword-color);
}

.token.tag {
  color: var(--tag-color);
}

.token.important {
  color: var(--important-color);
}

.token.selector {
  color: var(--selector-color);
}

.token.string {
  color: var(--string-color);
}

.token.builtin {
  color: var(--builtin-color);
}

.token.variable {
  color: var(--variable-color);
}

.token.function {
  color: var(--function-color);
}
`
