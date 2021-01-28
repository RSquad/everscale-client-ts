"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityTemplate = exports.methodTemplate = exports.buildApiSubtype = exports.buildApiType = void 0;
function buildApiType(apiType) {
    switch (apiType.type) {
        case "Struct":
            return buildApiTypeStruct(apiType);
        case "EnumOfTypes":
            return buildApiTypeEnumOfTypes(apiType);
        case "EnumOfConsts":
            return buildApiTypeEnumOfConsts(apiType);
        case "None":
            return { description: "", source: `export type ${apiType.name} = void;\n` };
        default:
            throw Error(`type not found: ${apiType.type}`);
    }
}
exports.buildApiType = buildApiType;
function buildApiSubtype(apiType, definitions) {
    switch (apiType.type) {
        case "Struct":
            return {
                description: apiType.summary ? apiType.summary.trim() : "",
                body: apiType.struct_fields
                    .map((subType) => buildApiSubtype(Object.assign(Object.assign({}, subType), { name: subType.name || "value" }), definitions))
                    .map((subTypeContent) => `${subTypeContent.name}: ${subTypeContent.body};\n`)
                    .join(" "),
                name: apiType.name,
            };
        case "Number":
            return {
                description: apiType.summary ? ` * ${apiType.name} - ${apiType.summary.trim()} \n` : "",
                body: "number",
                name: apiType.name ? `"${apiType.name}"` : "",
            };
        case "String":
            return {
                description: apiType.summary ? ` * ${apiType.name} - ${apiType.summary.trim()} \n` : "",
                body: "string",
                name: apiType.name,
            };
        case "Ref":
            if (apiType.ref_name === "Value" || apiType.ref_name === "API") {
                return {
                    description: "",
                    body: "any",
                    name: apiType.name,
                };
            }
            const ref = definitions[apiType.ref_name];
            return {
                description: "",
                body: ref.name,
                name: apiType.name,
            };
        case "Optional":
            const optionalInner = buildApiSubtype(apiType.optional_inner, definitions);
            return {
                description: apiType.summary ? `* ${apiType.name} - ${apiType.summary.trim()} \n` : "",
                body: optionalInner.body,
                name: /\s/.test(apiType.name) ? `"${apiType.name}"?` : `${apiType.name}?`,
            };
        case "BigInt":
            return {
                description: apiType.summary ? `* ${apiType.name} - ${apiType.summary.trim()} \n` : "",
                body: "number",
                name: apiType.name,
            };
        case "Boolean":
            return {
                description: apiType.summary ? ` * ${apiType.name} - ${apiType.summary.trim()} \n` : "",
                body: "boolean",
                name: apiType.name,
            };
        case "Array":
            const arrayInner = buildApiSubtype(apiType.array_item, definitions);
            return {
                description: apiType.summary ? ` * ${apiType.name} - ${apiType.summary.trim()} \n` : "",
                body: `${arrayInner.body}[]`,
                name: `${apiType.name}`,
            };
        default:
            throw Error(`SUBTtype not found: ${apiType.type}`);
    }
}
exports.buildApiSubtype = buildApiSubtype;
function buildApiTypeStruct(apiType) {
    let body = "";
    let description = "";
    if (apiType.description) {
        description += apiType.description
            .split("\n")
            .filter((str) => str)
            .map((str) => `* ${str.trim()}`)
            .join("\n * \n");
    }
    const subTypes = apiType.struct_fields.map((subType) => buildApiSubtype(subType, apiType.definitions));
    if (subTypes.length === 1 && !subTypes[0].name) {
        return {
            description,
            source: `export type ${apiType.name} = ${subTypes[0].body};\n`,
        };
    }
    body += subTypes
        .map((subType) => {
        let subtypeDescription = "";
        if (subType.description) {
            subtypeDescription += "/**\n";
            subtypeDescription += `${subType.description.trim()}\n`;
            subtypeDescription += " */\n";
        }
        return `${subtypeDescription}${subType.name}: ${subType.body};`;
    })
        .join("\n");
    body = `
  export type ${apiType.name} = {
    ${body}
  };
  `;
    return {
        source: body,
        description,
    };
}
function buildApiTypeEnumOfTypes(apiType) {
    let body = "";
    let description = "";
    const subEnumTypes = apiType.enum_types.map((subType) => buildApiSubtype(subType, apiType.definitions));
    if (apiType.description) {
        description += apiType.description
            .split("\n")
            .map((str) => ` * ${str.trim()}`)
            .join("\n * \n");
    }
    body += subEnumTypes
        .map((subType) => {
        if (subType.description) {
            description += ` * * ${subType.name} - ${subType.description.trim()}\n * \n`;
        }
        return `{
      type: '${subType.name}';
      ${subType.body}
    }`;
    })
        .join(" | ");
    body = `
  export type ${apiType.name} = ${body};
  `;
    return {
        source: body,
        description,
    };
}
function buildApiTypeEnumOfConsts(apiType) {
    let body = "";
    let description = "";
    body += apiType.enum_consts.map((subType) => `'${subType.name}'`).join(" | ");
    const variablesDescription = apiType.enum_consts
        .filter((subType) => subType.description)
        .map((subType) => ` * ${subType.name} - ${subType.description}`)
        .join("\n * \n");
    description += variablesDescription;
    body = `
  export type ${apiType.name} = ${body};
  `;
    return {
        source: body,
        description,
    };
}
function methodTemplate(data) {
    let description = "";
    if (data.summary) {
        description += "/**\n";
        description += ` * ${data.summary.trim()}\n`;
        if (data.description) {
            description += ` *\n`;
            description += ` * @remarks \n`;
            description += ` * ${data.description
                .split("\n")
                .map((str) => str.trim())
                .join("\n * ")}\n`;
        }
        const _params = filterParams(data.params);
        if (_params.length) {
            const paramsDescription = _params.map((param) => {
                if (param.type === "Ref") {
                    const dep = data.definitions[param.ref_name];
                    return `@param {${param.ref_name}} param - ${dep.summary || "parameters"}`;
                }
                if (param.type === "Generic" && param.generic_args[0].ref_name === "Request") {
                    return `@param {${param.generic_args[0].ref_name}} responseHandler - Request callback`;
                }
            });
            if (paramsDescription.length) {
                description += ` *\n`;
                description += ` * ${paramsDescription
                    .filter(Boolean)
                    .map((str) => str.trim())
                    .join("\n * ")}\n`;
            }
            const returnDep = data.definitions[data.result.generic_args[0].ref_name];
            if (returnDep) {
                description += ` * @returns ${returnDep.summary || returnDep.name} \n`;
            }
        }
        description += " */";
    }
    return {
        description,
        source: `
    ${data.name}(${paramsTemplate(data.params)}): Promise<${data.result.generic_args[0].ref_name}> {
      return this.tonClient.request("${data.module}.${data.name}"${paramsCallTemplate(data.params)});
    }
    `,
    };
}
exports.methodTemplate = methodTemplate;
function paramsTemplate(params) {
    const _params = filterParams(params);
    let res = "";
    if (_params.length) {
        res = _params
            .map((param) => {
            if (param.type === "Ref") {
                return `${param.name}: ${param.ref_name}`;
            }
            if (param.type === "Generic" && param.generic_args[0].ref_name === "Request") {
                return `responseHandler?: ResponseHandler`;
            }
        })
            .join(", ");
    }
    return res;
}
function filterParams(params) {
    return params.filter((param) => {
        return param.name !== "context" && param.name !== "_context";
    });
}
function paramsCallTemplate(params) {
    const _params = filterParams(params);
    let res = "";
    if (_params.length) {
        res = `, ${_params
            .map((param) => {
            if (param.type === "Ref") {
                return `${param.name}`;
            }
            if (param.type === "Generic" && param.generic_args[0].ref_name === "Request") {
                return `responseHandler`;
            }
        })
            .join(", ")}`;
    }
    return res;
}
function entityTemplate(data) {
    let description = "";
    if (data.summary) {
        description += "/**\n";
        description += ` * ${data.summary.trim()}\n`;
        if (data.description) {
            description += ` *\n`;
            description += ` * @remarks \n`;
            description += ` * ${data.description
                .split("\n")
                .map((str) => str.trim())
                .join("\n * ")}\n`;
        }
        description += " */";
    }
    return function buildModuleClass(content) {
        return `
    ${description}
    export class ${capitalizeFirstLetter(data.name)}Module {
      tonClient: TonClient;
      constructor(tonClient: TonClient) {
        this.tonClient = tonClient;
      }
      
      ${content}
    }
    `;
    };
}
exports.entityTemplate = entityTemplate;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//# sourceMappingURL=builders.js.map