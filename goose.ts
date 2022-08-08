import mongoose, { Document, Model, model, Types } from "mongoose";
const Schema = mongoose.Schema;
import fs from "fs";

mongoose.connect(
  "mongodb+srv://isaaclong26:elco9377@cluster0.amypn.mongodb.net/sampledb?retryWrites=true&w=majority",
  {
    tlsAllowInvalidHostnames: true,
  }
);

export interface field {
  key: string;
  value: string;
}

interface SubDoc {
  name: string;
  int: string;
  fields?: field[];
  type: string;
}

function capitalize(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

function unCapalize(word: string) {
  if (!word) return word;
  return word[0].toLowerCase() + word.substr(1).toLowerCase();
}
function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export default class TypeModel {
  name: string;
  ts: string;
  subDocBool: boolean = false;
  subDocs: SubDoc[] = [];
  constructor(name: string) {
    this.name = name;
  }

  public async subDoc(name: string, fields: field[]) {
    this.subDocBool = true;
    let x = `
    export interface ${name}Interface {
      ${
        fields.length > 0
          ? `${fields[0].key} : ${camelize(fields[0].value)},`
          : ""
      }
      ${
        fields.length > 1
          ? `${fields[1].key} : ${camelize(fields[1].value)},`
          : ""
      }
      ${
        fields.length > 2
          ? `${fields[2].key} : ${camelize(fields[2].value)},`
          : ""
      }
      ${
        fields.length > 3
          ? `${fields[3].key} : ${camelize(fields[3].value)},`
          : ""
      }
      ${
        fields.length > 4
          ? `${fields[4].key} : ${camelize(fields[4].value)},`
          : ""
      }
      ${
        fields.length > 5
          ? `${fields[5].key} : ${camelize(fields[5].value)},`
          : ""
      }
      ${
        fields.length > 6
          ? `${fields[6].key} : ${camelize(fields[6].value)},`
          : ""
      }
      ${
        fields.length > 7
          ? `${fields[7].key} : ${camelize(fields[7].value)},`
          : ""
      }
      ${
        fields.length > 8
          ? `${fields[8].key} : ${camelize(fields[8].value)},`
          : ""
      }
      ${
        fields.length > 9
          ? `${fields[9].key} : ${camelize(fields[9].value)},`
          : ""
      }
      ${
        fields.length > 10
          ? `${fields[10].key} : ${camelize(fields[10].value)},`
          : ""
      }
      ${
        fields.length > 11
          ? `${fields[11].key} : ${camelize(fields[11].value)},`
          : ""
      }
    }
    `;
    let type = `  ${name} : [new Schema<${name}Interface>({
        ${fields.map((field) => {
          return ` ${field.key} : ${field.value} `;
        })}
      })]`;

    let ots = { name: name, int: x, fields: fields, type };

    this.subDocs = [...this.subDocs, ots];
  }

  public checkSub(text: string) {
    let subs = this.subDocs.map((subDoc) => {
      return subDoc.name;
    });

    return subs.includes(text);
  }

  public async init(data: any) {
    let ots = data;

    this.ts = `

   ${/* Dependency Imports */ " "}
    import mongoose,{ Document,  Model, model, Types } from "mongoose"
    const Schema = mongoose.Schema;

    ${/* SubDoc Interfaces*/ " "}

    ${
      this.subDocBool
        ? this.subDocs.map((subDoc) => {
            return subDoc.int;
          })
        : " "
    } 

    ${/* Main Interface*/ " "}

    export interface ${this.name}Interface {
      ${ots.length > 0 ? `${ots[0].key} : ${camelize(ots[0].value)},` : ""}
      ${ots.length > 1 ? `${ots[1].key} : ${camelize(ots[1].value)},` : ""}
      ${ots.length > 2 ? `${ots[2].key} : ${camelize(ots[2].value)},` : ""}
      ${ots.length > 3 ? `${ots[3].key} : ${camelize(ots[3].value)},` : ""}
      ${ots.length > 4 ? `${ots[4].key} : ${camelize(ots[4].value)},` : ""}
      ${ots.length > 5 ? `${ots[5].key} : ${camelize(ots[5].value)},` : ""}
      ${ots.length > 6 ? `${ots[6].key} : ${camelize(ots[6].value)},` : ""}
      ${ots.length > 7 ? `${ots[7].key} : ${camelize(ots[7].value)},` : ""}
      ${ots.length > 8 ? `${ots[8].key} : ${camelize(ots[8].value)},` : ""}
      ${ots.length > 9 ? `${ots[9].key} : ${camelize(ots[9].value)},` : ""}
      ${ots.length > 10 ? `${ots[10].key} : ${camelize(ots[10].value)},` : ""}
      ${ots.length > 11 ? `${ots[11].key} : ${camelize(ots[11].value)},` : ""}
  

    }

    ${/* Props Type*/ " "}
    ${
      this.subDocBool
        ? `type ${this.name}DocumentProps = {
      ${this.subDocs.map((subDoc) => {
        return `${subDoc.name}: Types.DocumentArray<${subDoc.name}Interface>`;
      })}
    }
   

    ${/* Model Type*/ " "}

    type ${this.name}ModelType = Model<${this.name}Interface, {}, ${
            this.name
          }DocumentProps>;

   
    ${/* Create Model*/ " "}

    const ${capitalize(this.name)} = mongoose.model <${this.name}Interface, ${
            this.name
          }ModelType>('${this.name}', new Schema<${this.name}Interface, ${
            this.name
          }ModelType>({
      ${this.subDocs.map((subDoc) => {
        return subDoc.type;
      })},
   
      ${
        ots.length > 0
          ? this.checkSub(ots[0].key)
            ? ""
            : `${ots[0].key} : ${ots[0].value},`
          : ""
      }
      ${
        ots.length > 1
          ? this.checkSub(ots[1].key)
            ? ""
            : `${ots[1].key} : ${ots[1].value},`
          : ""
      }
      ${
        ots.length > 2
          ? this.checkSub(ots[2].key)
            ? ""
            : `${ots[2].key} : ${ots[2].value},`
          : ""
      }
      ${
        ots.length > 3
          ? this.checkSub(ots[3].key)
            ? ""
            : `${ots[3].key} : ${ots[3].value},`
          : ""
      }
      ${
        ots.length > 4
          ? this.checkSub(ots[4].key)
            ? ""
            : `${ots[4].key} : ${ots[4].value},`
          : ""
      }
      ${
        ots.length > 5
          ? this.checkSub(ots[5].key)
            ? ""
            : `${ots[5].key} : ${ots[5].value},`
          : ""
      }
      ${
        ots.length > 6
          ? this.checkSub(ots[6].key)
            ? ""
            : `${ots[6].key} : ${ots[6].value},`
          : ""
      }
      ${
        ots.length > 7
          ? this.checkSub(ots[7].key)
            ? ""
            : `${ots[7].key} : ${ots[7].value},`
          : ""
      }
      ${
        ots.length > 8
          ? this.checkSub(ots[8].key)
            ? ""
            : `${ots[8].key} : ${ots[8].value},`
          : ""
      }
      ${
        ots.length > 9
          ? this.checkSub(ots[9].key)
            ? ""
            : `${ots[9].key} : ${ots[9].value},`
          : ""
      }
      ${
        ots.length > 10
          ? this.checkSub(ots[10].key)
            ? ""
            : `${ots[10].key} : ${ots[10].value},`
          : ""
      }
      ${
        ots.length > 11
          ? this.checkSub(ots[11].key)
            ? ""
            : `${ots[11].key} : ${ots[11].value},`
          : ""
      }

    }))

     `
        : `
      const ${this.name}Schema = new Schema<${this.name}Interface>({
        ${
          ots.length > 0
            ? this.checkSub(ots[0].key)
              ? ""
              : `${ots[0].key} : ${ots[0].value},`
            : ""
        }
        ${
          ots.length > 1
            ? this.checkSub(ots[1].key)
              ? ""
              : `${ots[1].key} : ${ots[1].value},`
            : ""
        }
        ${
          ots.length > 2
            ? this.checkSub(ots[2].key)
              ? ""
              : `${ots[2].key} : ${ots[2].value},`
            : ""
        }
        ${
          ots.length > 3
            ? this.checkSub(ots[3].key)
              ? ""
              : `${ots[3].key} : ${ots[3].value},`
            : ""
        }
        ${
          ots.length > 4
            ? this.checkSub(ots[4].key)
              ? ""
              : `${ots[4].key} : ${ots[4].value},`
            : ""
        }
        ${
          ots.length > 5
            ? this.checkSub(ots[5].key)
              ? ""
              : `${ots[5].key} : ${ots[5].value},`
            : ""
        }
        ${
          ots.length > 6
            ? this.checkSub(ots[6].key)
              ? ""
              : `${ots[6].key} : ${ots[6].value},`
            : ""
        }
        ${
          ots.length > 7
            ? this.checkSub(ots[7].key)
              ? ""
              : `${ots[7].key} : ${ots[7].value},`
            : ""
        }
        ${
          ots.length > 8
            ? this.checkSub(ots[8].key)
              ? ""
              : `${ots[8].key} : ${ots[8].value},`
            : ""
        }
        ${
          ots.length > 9
            ? this.checkSub(ots[9].key)
              ? ""
              : `${ots[9].key} : ${ots[9].value},`
            : ""
        }
        ${
          ots.length > 10
            ? this.checkSub(ots[10].key)
              ? ""
              : `${ots[10].key} : ${ots[10].value},`
            : ""
        }
        ${
          ots.length > 11
            ? this.checkSub(ots[11].key)
              ? ""
              : `${ots[11].key} : ${ots[11].value},`
            : ""
        }
      })
      const ${capitalize(this.name)} = mongoose.model<${
            this.name
          }Interface>('${capitalize(this.name)}', ${this.name}Schema)
     `
    }
  
  
    export default ${capitalize(this.name)} 
    
    `;
    fs.writeFileSync(`./models/${this.name}.ts`, this.ts);
  }
}

