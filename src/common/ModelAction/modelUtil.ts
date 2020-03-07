type ModelFactory = <T, E extends HelpObj<ModelAction<any, T & FetchObj>>>(state: T, actions: E) => ModelData<T & FetchObj, E>

export const baseActionOption: BaseModelActionOption = {
  data: null,
  mutate: () => {},
  notice: () => {},
  query: () => {},
  setData: () => {},
  store: {}
}
export const modelFactory: ModelFactory = (state, actions) => {
  return {
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
}, state: C, actions: D): {
  state: A & C
  actions: {
    [key in keyof B]: ModelAction<any, A>
  } & {
    [key in keyof D]: ModelAction<any, A & C>
  }
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

  return {
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
}, modelT: {
  state: C
  actions: D
}): {
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
  return {
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
