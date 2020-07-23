#!/usr/bin/env node

/* eslint-disable no-unused-expressions */
const path = require("path");
const program = require("commander");
const pkg = require("../package.json");
const md2png = require("../lib/index");

program
  .version(pkg.version)
  .usage("<input>")
  .option("-o, --output <output>", "output filename")
  .option("-w, --width <width>", "output image width")
  .on("--help", () => {
    console.log();
    console.log("Example:");
    console.log("  $ mini-md2png example.md -o output.png -w 800");
  })
  .parse(process.argv).args.length || program.help();

const { args, output, width } = program;
const [input] = args;

const main = async () => {
  const start = new Date();
  const img = await md2png(input, { output, width });
  const end = new Date();
  console.log(
    `Image generated → ${path.relative(process.cwd(), img)} (${end - start}ms)`
  );
};

main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
