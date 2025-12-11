import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 JSON 文件内容（使用绝对路径）
const filePath = path.join(__dirname, "../JSON/接口数据.json");
const file = fs.readFileSync(filePath, "utf-8");
const data = JSON.parse(file);

const payload = data.payload;
const oneKeyBankList = payload.oneKeyBankList;

// const tenm = oneKeyBankList.some((item) => {
//   if (!item.brandList.agreementList) {
//     return item;
//   }
//   return true;
// });

const tenm = oneKeyBankList.find((item) => !item.brandList.agreementList);

console.log(tenm); // true
