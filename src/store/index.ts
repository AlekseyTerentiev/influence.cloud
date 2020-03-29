import { createStore, StoreProvider, createTypedHooks } from 'easy-peasy'
import { ProfileModel, profileModel } from './profile'

export interface StoreModel {
  profile: ProfileModel
}

const storeModel: StoreModel = {
  profile: profileModel,
}

export const store = createStore(storeModel)

const typedHooks = createTypedHooks<StoreModel>()

export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState

export { StoreProvider }
