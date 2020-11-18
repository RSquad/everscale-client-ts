import api from "./api.json";
import { ApiFreetonBuilder } from "./api-freeton-builder";

const apiDescription = api;

const config = {};

const apiBuilder = new ApiFreetonBuilder(config);

apiBuilder.setApiDescription(apiDescription);
apiBuilder.prepareDepedencies();
apiBuilder.prepareBuild();
apiBuilder.build();
