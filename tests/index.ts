import MarkdownIt from 'markdown-it'

import {
  collectBlockCode,
} from '../dist/index'

import '../styles/collect-block-code.scss'

const wrapper = document.getElementById('app')

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
})
  .use(collectBlockCode, { copy: true, blockName: true })

const code = `
?> ???
!> !!!

\`\`\`html : 123
<div></div>
\`\`\`
`

wrapper!.innerHTML = markdown.render(code)
