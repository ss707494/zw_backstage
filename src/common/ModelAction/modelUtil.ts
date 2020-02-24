
export function modelFactory <T, B extends ModelActionObj<T>>(state: T, actions: B): ModelData<T, B> {
  return {
    state,
    actions,
  }
}

type MergeModel = {
  <A, B extends ModelActionObj<A>, C, D extends ModelActionObj<A & C>>(model: {
    state: A
    actions: B
  }, state: C, actions: D): {
    state: A & C
    actions: {
      [key in (keyof B | keyof D)]: ModelActionFun
    }
  }
}

export const mergeModel:MergeModel = (model, state, actions) => {
  return {
    state: {
      ...model.state,
      ...state,
    },
    actions: {
      ...model.actions,
      ...actions,
    }
  }
}

