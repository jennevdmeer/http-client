export var ReadyState;

(function (ReadyState) {
  ReadyState[ReadyState["Unsent"] = 0] = "Unsent";
  ReadyState[ReadyState["Openend"] = 1] = "Openend";
  ReadyState[ReadyState["HeadersReceived"] = 2] = "HeadersReceived";
  ReadyState[ReadyState["Loading"] = 3] = "Loading";
  ReadyState[ReadyState["Done"] = 4] = "Done";
})(ReadyState || (ReadyState = {}));

export default ReadyState;