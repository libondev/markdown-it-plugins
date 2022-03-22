# markdown-it-plugins [![NPM version](https://img.shields.io/npm/v/markdown-it-plugins?color=a1b858&label=)](https://www.npmjs.com/package/markdown-it-plugins)

A collection of plug-ins that extend the Markdown-it parser.

## Install

```shell
npm i markdown-it-plugins -D
```

## Usage
```js
import MarkdownIt from 'markdown-it'
import { noticeboard } from 'markdown-it-plugin'

const markdown = new Markdown({
  // ...
})
  .use(noticeboard)
```

## Plugins

### container
Use Vue.js style content blocks to present your message.

```js
import { container } from 'markdown-it-plugins'
// preset styles
import 'markdown-it-plugins/container.css'

markdown.use(container)
```

#### Example
Optional values: [ **details** | **tip** | **danger** | **warning** ]
![container](snapshot/container.png)


TIP:
```
::: <type> [title]
  content message
:::
```

```
::: details title message
message
:::

::: tip spoiler
message
:::

::: danger spoiler
message
:::

::: warning spoiler
message
:::
```

### noticeboard
A lightweight prompt box containing only tip and Danger types.

```js
import { noticeboard } from 'markdown-it-plugins'
import 'markdown-it-plugins/noticeboard.css'

markdown.use(noticeboard)
```

#### Example
![noticeboard](snapshot/noticeboard.png)

```
?> This is tip.
!> This is danger.
```


### collectBlockCode
To add foldable functionality to a code block, you can also give it a code block name.

```js
import { collectBlockCode } from 'markdown-it-plugins'
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
![collect-block-code](snapshot/collect-block-code.png)

````
```js : block name
const a = 1
const b = 2
const c = 3

console.log(a, b, c)
```
````
