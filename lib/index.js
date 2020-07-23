/* eslint-disable no-new-func, no-template-curly-in-string */
const fs = require("fs");
const path = require("path");
const marked = require("marked");
const puppeteer = require("puppeteer");
const matter = require("gray-matter");
const replaceExt = require("replace-ext");

// 变量注入模板字符串方法
const compile = source => {
  return context => {
    const props = Object.keys(context).join(", ");
    return new Function(`{ ${props} }`, `return \`${source}\``)(context);
  };
};

const defaults = {
  markdown: "${content}",
  html:
    '<link rel="stylesheet" href="https://unpkg.com/github-markdown-css"><div class="markdown-body" style="padding: 2.5em">${content.trim()}</div>'
};

const loadTemplates = () => {
  return {
    markdown: compile(defaults.markdown),
    html: compile(defaults.html)
  };
};

const generatePNG = async (input, output, width) => {
  const document = fs.readFileSync(input, "utf8"); // Markdown to utf8
  const { content } = matter(document);
  const templates = loadTemplates(); // 生成模板高阶函数
  const markdown = templates.markdown({ content }); // 内容注入模板
  const result = marked(markdown); // Markdown to html
  const html = templates.html({ content: result });
  // Html to png
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width, height: 80 });
  await page.setContent(html);
  await page.screenshot({ path: output, fullPage: true }); // Fullpage 完整页面
  await browser.close();
  return output;
};

module.exports = async (input, { output, width }) => {
  if (typeof input !== "string") {
    throw new TypeError(`Expected a string, got ${typeof input}: ${input}`);
  }

  input = path.resolve(input); // 生成绝对路径
  output = path.resolve(output || replaceExt(input, ".png"));
  width = Number(width) || 800;

  // Ensure file exists
  if (!fs.existsSync(input)) {
    throw new Error("The specified input path does not exist");
  }

  if (!fs.statSync(input).isFile()) {
    throw new Error("The specified input path is a directory");
  }

  // Generate image
  return generatePNG(input, output, width);
};
