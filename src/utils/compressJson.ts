var codec = require("json-url")("lzw");

export function compressJson(data: any): Promise<string> {
  // var result = "";
  const json = JSON.stringify(data);
  return codec.compress(json);
}

export function decompress(data: string): Promise<any> {
  return codec.decompress(data).then((j: any) => JSON.parse(j));
}

export default { compressJson, decompress };
