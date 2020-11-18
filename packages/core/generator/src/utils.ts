export function findDefinitions(apiType: any, types: any[]) {
  if (apiType.type === 'Ref' && apiType.name !== 'Value') {
    const res = types.find(subType => subType.name === apiType.ref_name);
    return res ? [res] : [];
  }

  let res: any[] = [];

  if (apiType.struct_fields) {
    res = [...res, ...apiType.struct_fields.map((subType) => this.findDefinitions(subType, types)).flat(Infinity)];
  }

  if (apiType.enum_types) {
    res = [...res, ...apiType.enum_types.map((subType) => this.findDefinitions(subType, types)).flat(Infinity)];
  }

  if (apiType.params) {
    res = [...res, ...apiType.params.map((subType) => this.findDefinitions(subType, types)).flat(Infinity)]
  }

  if (apiType.generic_args) {
    // console.log(apiType.generic_args)
    res = [...res, ...apiType.generic_args.map((subType) => this.findDefinitions(subType, types)).flat(Infinity)]
  }

  if (apiType.optional_inner) {
    res = [...res, ...this.findDefinitions(apiType.optional_inner, types).flat(Infinity)];
  }

  if (apiType.result) {
    res = [...res, ...this.findDefinitions(apiType.result, types).flat(Infinity)];
  }

  if (apiType.array_item) {
    res = [...res, ...this.findDefinitions(apiType.array_item, types).flat(Infinity)];
  }

  if (apiType.params) {
    res = [...res, ...this.findDefinitions(apiType.params, types).flat(Infinity)];
  }

  if (apiType.type === "Generic" && apiType.generic_args[0].ref_name === "Request") {
    res = [...res, { name: 'ResponseHandler', module: 'custom' }];
  }

  return res;
}