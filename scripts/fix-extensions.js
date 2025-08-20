/**
 * This is just a script to rename the output files to the correct module extensions
 * any enhancement are welcome
 */
const fs = require("fs");
const path = require("path");
console.log("🔧 Post-processing builds...");
if (fs.existsSync("dist/cjs/kunsul/index.js")) {
  if (!fs.existsSync("dist/cjs")) {
    fs.mkdirSync("dist/cjs", { recursive: true });
  }
  fs.renameSync("dist/cjs/kunsul/index.js", "dist/cjs/kunsul/index.cjs");
  console.log("✅ Renamed CommonJS output to .cjs");
}

if (fs.existsSync("dist/esm/kunsul/index.js")) {
  if (!fs.existsSync("dist/esm")) {
    fs.mkdirSync("dist/esm", { recursive: true });
  }
  fs.renameSync("dist/esm/kunsul/index.js", "dist/esm/kunsul/index.mjs");
  console.log("✅ Renamed ECMAScript module output to .mjs");
}


const copyFiles = [
  { from: "dist/esm/kunsul/index.mjs", to: "dist/kunsul.esm.mjs" },
  { from: "dist/cjs/kunsul/index.cjs", to: "dist/kunsul.cjs" },
  { from: "dist/umd/kunsul/index.js", to: "dist/kunsul.umd.js" },
  { from: "dist/esm/kunsul/index.d.ts", to: "dist/kunsul.d.ts" },
];

copyFiles.forEach(({ from, to }) => {
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    console.log(`✅ Copied ${from} -> ${to}`);
  }
});

const esmPackageJson = {
  type: "module",
};

if (!fs.existsSync("dist/esm")) {
  fs.mkdirSync("dist/esm", { recursive: true });
}

fs.writeFileSync(
  "dist/esm/package.json",
  JSON.stringify(esmPackageJson, null, 2)
);
console.log("✅ Created ESM package.json");
console.log("🎉 Build processing complete!");
