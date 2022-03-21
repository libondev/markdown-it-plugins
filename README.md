# markdown-it-plugins [![NPM version](https://img.shields.io/npm/v/markdown-it-plugins?color=a1b858&label=)](https://www.npmjs.com/package/markdown-it-plugins)



## Install

```shell
npm i markdown-it-plugins -D
```

## Usage
```js
import MarkdownIt from 'markdown-it'
import { collectBlockCode } from 'markdown-it-plugin'

const markdown = new Markdown({
  // ...
})
  .use(collectBlockCode)
```

## Plugins

### collectBlockCode
To add foldable functionality to a code block, you can also give it a code block name.

```js
import { collectBlockCode } from 'markdown-it-plugins'
// Built-in preset styles
import 'markdown-it-plugins/collect-block-code.css'

markdown.use(collectBlockCode, options)
```

#### Options
```ts
interface CollectCodeBlock {
  /**
   * Show the code block language.
   * @type {boolean}
   * @default true
   */
  lang?: boolean

  /**
   * Shows the copy code block content button.
   * @type {boolean}
   * @default false
   */
  copy?: boolean

  /**
   * Copy the content button text.
   * @type {string}
   * @default: 'Copy'
   */
  copyText?: string

  /**
   * The delimiter for the code block name.
   * @type {string}
   * @default ':'
   */
  separator?: string

  /**
   * Display code block names.
   * @type {boolean}
   * @default false
   */
  blockName?: boolean

  /**
   * Always expand the code block.
   * @type {boolean}
   * @default true
   */
  alwaysOpen?: boolean
}
```

#### Example
```text

```js : block name
console.log(1)
\```
↑ Characters need to be deleted '/' escaped

```
