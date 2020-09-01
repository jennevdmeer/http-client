var ResponseType;

(function (ResponseType) {
  ResponseType["Undefined"] = "";
  ResponseType["Text"] = "text";
  ResponseType["Json"] = "json";
  ResponseType["ArrayBuffer"] = "arraybuffer";
  ResponseType["Blob"] = "blob";
  ResponseType["Document"] = "document";
})(ResponseType || (ResponseType = {}));

export default ResponseType;