import TypeModel from "./goose";

let sample = new TypeModel("Sample")
sample.subDoc("finish", [
  {key: "name", value: "String"},
  {key: "shelf", value: "String"},
  {key: "spot", value: "String"},
  {key: "inventory", value: "Number"},

 ])
sample.init([
  {key: "name", value: "String" },
  {key: "die", value: "String"},
  {key: "type", value : "String"},
  {key: "finish", value: "finishInterface[]"}

])
