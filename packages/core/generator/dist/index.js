"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_json_1 = __importDefault(require("./api.json"));
const api_freeton_builder_1 = require("./api-freeton-builder");
const apiDescription = api_json_1.default;
const config = {};
const apiBuilder = new api_freeton_builder_1.ApiFreetonBuilder(config);
apiBuilder.setApiDescription(apiDescription);
apiBuilder.prepareDepedencies();
apiBuilder.prepareBuild();
apiBuilder.build();
//# sourceMappingURL=index.js.map