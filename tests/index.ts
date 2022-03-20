import {
  collectBlockCode
} from '../dist/index'

import '../src/styles/collect-block-code.scss'

import MarkdownIt from "markdown-it";

const wrapper = document.getElementById('app')

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
})
  .use(collectBlockCode, { copy: true, blockName: true })

const h1 = '# Hello'

const code = `
?> ???
!> !!!

\`\`\`html : 123
<div></div>
\`\`\`
`

wrapper!.innerHTML = markdown.render(code)
