var codec = require("json-url")("lzw");

export function compressJson(data: any): Promise<string> {
  // var result = "";
  const json = JSON.stringify(data);
  return codec.compress(json);
}

export function decompress(data: string): Promise<any> {
  return codec.decompress(data).then((j: any) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    function reviver(key: string, value: any) {
      if (typeof value === "string" && dateFormat.test(value)) {
        return new Date(value);
      }
      return value;
    }
    return JSON.parse(j, reviver);
  });
}

export default { compressJson, decompress };
