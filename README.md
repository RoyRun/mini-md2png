### mini-md2png

> A markdown to png image converter 

## Installation

```shell
$ npm install mini-md2png

# or yarn
$ yarn add mini-md2png
```
---
## API
`m2png(filePath,options)`

### filePath
| | filePath |
| --- | --- |
|type | `string` |
| description |  图片路径 |
### options
| | filename | width |
| --- | --- | --- |
| type | `string`  | `number`
| description| 输出图片名称 | 图片宽度

---
## Usage


```javascript
const m2png = require('mini-md2png')

await m2png('./bar.md')

await m2png('./bar.md', options)

```



## CLI Usage

```shell
$ npm install mini-md2png -g

# or yarn 
$ yarn global add mini-md2png
```

```shell
$ mini-md2png --help
Usage: mini-md2png <input>

Options:
  -V, --version          output the version number
  -o, --output <output>  output filename
  -w, --width <width>    output image width
  -h, --help             display help for command

Example:
  $ m2i example.md -o output.png -w 800
```

or use npx

```shell
$ npx m2i example.md -o output.png -w 800
```
