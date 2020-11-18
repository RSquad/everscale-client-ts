"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFreetonBuilder = void 0;
const builders_1 = require("./builders");
const utils_1 = require("./utils");
const fs_1 = __importDefault(require("fs"));
const rimraf_1 = __importDefault(require("rimraf"));
class ApiFreetonBuilder {
    constructor(config) {
        this.config = config;
        this.types = [];
        this.functions = [];
        this.modules = [];
    }
    setApiDescription(api) {
        for (const module of api.modules) {
            this.modules = [
                ...this.modules,
                {
                    name: module.name,
                    summary: module.summary,
                    description: module.description,
                },
            ];
            for (const apiType of module.types) {
                this.types = [...this.types, Object.assign(Object.assign({}, apiType), { module: module.name })];
            }
            for (const apiFunction of module.functions) {
                this.functions = [...this.functions, Object.assign(Object.assign({}, apiFunction), { module: module.name })];
            }
        }
    }
    prepareDepedencies() {
        for (const apiType of this.types) {
            apiType.definitions = utils_1.findDefinitions(apiType, this.types).reduce((acc, memo) => (Object.assign(Object.assign({}, acc), { [memo.name]: memo })), {});
        }
        for (const apiFunction of this.functions) {
            apiFunction.definitions = utils_1.findDefinitions(apiFunction, this.types).reduce((acc, memo) => (Object.assign(Object.assign({}, acc), { [memo.name]: memo })), {});
        }
        for (const module of this.modules) {
            const filteredTypes = this.types
                .filter((apiType) => apiType.module === module.name)
                .map((apiType) => apiType.definitions);
            const filteredFunctions = this.functions
                .filter((apiType) => apiType.module === module.name)
                .map((apiType) => apiType.definitions);
            module.typeDepedencies = filteredTypes.reduce((acc, memo) => {
                return Object.assign(Object.assign({}, acc), Object.entries(memo)
                    .filter(([key, value]) => value.module !== module.name)
                    .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {}));
            }, {});
            module.functionDepedencies = filteredFunctions.reduce((acc, memo) => {
                return Object.assign(Object.assign({}, acc), memo);
            }, {});
        }
    }
    prepareBuild() {
        for (const apiType of this.types) {
            const { source, description } = builders_1.buildApiType(apiType);
            apiType.source = source;
            apiType.formattedDescription = description;
        }
        for (const apiType of this.functions) {
            const { source, description } = builders_1.methodTemplate(apiType);
            apiType.source = source;
            apiType.formattedDescription = description;
        }
        for (const module of this.modules) {
            module.source = builders_1.entityTemplate(module);
        }
    }
    build() {
        const dir = "../src/modules";
        rimraf_1.default.sync(`${dir}`);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        for (const module of this.modules) {
            const moduleDir = dir + "/" + module.name;
            if (!fs_1.default.existsSync(moduleDir)) {
                fs_1.default.mkdirSync(moduleDir);
            }
            const typesSource = this.types
                .filter((apiType) => apiType.module === module.name)
                .map((apiType) => `${apiType.formattedDescription && apiType.formattedDescription.trim()
                ? `/**\n${apiType.formattedDescription}\n*/`
                : ""} ${apiType.source}`)
                .join("\n");
            const typeDepedency = Object.values(module.typeDepedencies).reduce((acc, memo) => {
                if (!acc[memo.module]) {
                    acc[memo.module] = new Set();
                }
                acc[memo.module].add(memo.name);
                return acc;
            }, {});
            const typeDepencySource = Object.entries(typeDepedency).reduce((acc, [key, value]) => {
                return `${acc}import { ${Array.from(value).join(", ")} } from '../${key}/types';\n`;
            }, "");
            const functionsDepedency = Object.values(module.functionDepedencies).reduce((acc, memo) => {
                if (!acc[memo.module]) {
                    acc[memo.module] = new Set();
                }
                acc[memo.module].add(memo.name);
                return acc;
            }, {});
            const functionsDepedencySource = Object.entries(functionsDepedency).reduce((acc, [key, value]) => {
                if (key === 'custom') {
                    const imports = acc.split('\n');
                    imports[0] = `import { TonClient, ${Array.from(value).join(", ")} } from "../..";`;
                    return imports.join('\n');
                }
                return `${acc}import { \n${Array.from(value).join(",\n")}\n } from './types';\n`;
            }, 'import { TonClient } from "../..";\n');
            const functionsSource = this.functions
                .filter((apiType) => apiType.module === module.name)
                .map((apiType) => `${apiType.formattedDescription} ${apiType.source}`)
                .join("\n");
            const moduleSource = module.source(functionsSource);
            fs_1.default.writeFileSync(`${moduleDir}/types.ts`, `${typeDepencySource}${typesSource}`);
            fs_1.default.writeFileSync(`${moduleDir}/index.ts`, `${functionsDepedencySource}${moduleSource}`);
        }
    }
}
exports.ApiFreetonBuilder = ApiFreetonBuilder;
//# sourceMappingURL=api-freeton-builder.js.map