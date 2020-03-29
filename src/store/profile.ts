import { Action, action, Thunk, thunk } from 'easy-peasy'
import { http } from 'server'

export interface ProfileModel {
  profile: { id: string } | null

  fetchProfile: Thunk<ProfileModel, any>
  setProfile: Action<ProfileModel, any>
}

export const profileModel: ProfileModel = {
  profile: null,

  fetchProfile: thunk(async (actions, payload) => {
    const res = await http.get('/profile')
    actions.setProfile(res)
  }),
  setProfile: action((state, payload) => {
    state.profile = payload
  }),
}
