
type ModelFactory<N = ''> = <T, E extends ModelActionObjHelp<any, T & FetchObj>>(name: string, state: T, actions: E) => ModelData<T & FetchObj, E>

export const baseActionOption: BaseModelActionOption = {
  data: null,
  mutate: () => {},
  notice: () => {},
  query: () => {},
  setData: () => {},
  store: {}
}

const modelNameList:string[] = []
export const modelFactory: ModelFactory = (name, state, actions) => {
  if (modelNameList.includes(name)) {
    throw Error(`model Name duplicate: ${name}`)
  }
  modelNameList.push(name)
  return {
    name,
    state: {
      ...state,
      fetchLoad: {},
      fetchError: {},
    },
    actions,
  }
}

export function mergeModel<A, B extends HelpObj<ModelAction<any, A>>, C, D extends HelpObj<ModelAction<any, A & C>>>(model: {
  state: A
  actions: B
  name: string
}, name: string, state: C, actions: D): {
  state: A & C
  actions: {
    [key in keyof B]: ModelAction<any, A>
  } & {
    [key in keyof D]: ModelAction<any, A & C>
  }
  name: string
} {
  Object.keys(model.state).forEach(value => {
    // @ts-ignore
    if (state?.[value] && !['fetchError', 'fetchLoad'].includes(value)) {
      throw new Error(`mergeModel: state duplicate:: key ${value}`)
    }
  })
  Object.keys(model.actions).forEach(value => {
    // @ts-ignore
    if (actions?.[value]) {
      throw new Error(`mergeModel: action duplicate:: key ${value}`)
    }
  })
  const mergeName = `${name}_with_${model.name}`
  if (modelNameList.includes(mergeName)) {
    throw Error(`model Name duplicate: ${mergeName}`)
  }

  return {
    name: mergeName,
    state: {
      ...model.state,
      ...state,
    },
    actions: {
      ...model.actions,
      ...actions,
    },
  }
}

export function mergeTwoModel<A, B extends HelpObj<ModelAction<any, A>>, C, D extends HelpObj<ModelAction<any, C>>>(model: {
  state: A
  actions: B
  name: string
}, modelT: {
  state: C
  actions: D
  name: string
}): {
  name: string
  state: A & C
  actions: {
    [key in keyof B]: ModelAction
  } & {
    [key in keyof D]: ModelAction
  }
} {
  Object.keys(model.state).forEach(value => {
    // @ts-ignore
    if (modelT.state?.[value] && !['fetchError', 'fetchLoad'].includes(value)) {
      throw new Error(`mergeTwoModel: state duplicate:: key ${value}`)
    }
  })
  Object.keys(model.actions).forEach(value => {
    // @ts-ignore
    if (modelT?.actions?.[value]) {
      throw new Error(`mergeTwoModel: action duplicate:: key ${value}`)
    }
  })
  const mergeName = `${model.name}_and_${modelT.name}`
  if (modelNameList.includes(mergeName)) {
    throw Error(`model Name duplicate: ${mergeName}`)
  }

  return {
    name: mergeName,
    state: {
      ...model.state,
      ...modelT.state,
    },
    actions: {
      ...model.actions,
      ...modelT.actions,
    },
  }
}

// const model = modelFactory({}, {
//   ss: {
//     eee: (value: string, option) => {
//     }
//   }
// })
//
// useStoreModel(ModuleEnum.Test, model).actions.ss.eee('')

// export function mergeIntoModel(originModel, name, innerModel) {
//
// }

// const _model = mergeTwoModel(modelFactory({
//   t1: ''
// }, {
// }), modelFactory({
//   t3: ''
// }, {
// }))
//
// mergeModel(_model, {
//   t2: ''
// }, {
// })
