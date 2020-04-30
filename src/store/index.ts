import { createStore, StoreProvider, createTypedHooks } from 'easy-peasy';
import { InstagramModel, instagramModel } from './instagram';

export interface StoreModel {
  instagram: InstagramModel;
}

const storeModel: StoreModel = {
  instagram: instagramModel,
};

export const store = createStore(storeModel);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export { StoreProvider };
