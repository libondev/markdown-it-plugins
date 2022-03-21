import MarkdownIt from 'markdown-it'
import {
  codeLineNumbers,
  collectBlockCode,
} from '../index'
import { container } from '../plugins/container'

import content from './content'

import '../styles/collect-block-code.scss'
import '../styles/container.scss'

const wrapper = document.getElementById('app')

const md = new MarkdownIt({
  html: true,
  linkify: true,
})
  // .use(collectBlockCode, { copy: true, blockName: true })
  // .use(codeLineNumbers)
  .use(container)

wrapper!.innerHTML = md.render(content)
