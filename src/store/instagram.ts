import { Action, action, Thunk, thunk } from 'easy-peasy'
// import { http } from 'server'

interface AccountModel {
  username: string
  avatar: string
}

export interface InstagramModel {
  account: AccountModel | null
  accountLoading: boolean
  accountRemoving: boolean

  addAccount: Thunk<InstagramModel, { username: string }>
  fetchAccount: Thunk<InstagramModel>
  removeAccount: Thunk<InstagramModel>

  addedAccount: Action<InstagramModel, AccountModel>
  removedAccount: Action<InstagramModel>
  setAccountLoading: Action<InstagramModel, boolean>
  setAccountRemoving: Action<InstagramModel, boolean>
}

export const instagramModel: InstagramModel = {
  account: null,
  accountLoading: false,
  accountRemoving: false,

  addAccount: thunk((actions, { username }) => {
    // return http.post('/instagram', { username })
    return new Promise((resolve, reject) => {
      actions.setAccountLoading(true)
      setTimeout(() => {
        const account = {
          username,
          avatar: '',
        }
        localStorage.setItem('mock:account', JSON.stringify(account))
        actions.addedAccount(account)
        actions.setAccountLoading(false)
        resolve(account)
      }, 1500)
    })
  }),

  fetchAccount: thunk(actions => {
    return new Promise((resolve, reject) => {
      actions.setAccountLoading(true)
      setTimeout(() => {
        const account = localStorage.getItem('mock:account')
        if (account) {
          actions.addedAccount(JSON.parse(account))
          resolve(account)
        } else {
          reject()
        }
        actions.setAccountLoading(false)
      }, 0)
    })
  }),

  removeAccount: thunk(actions => {
    return new Promise((resolve, reject) => {
      actions.setAccountRemoving(true)
      setTimeout(() => {
        localStorage.removeItem('mock:account')
        actions.removedAccount()
        resolve()
        actions.setAccountRemoving(false)
      }, 1500)
    })
  }),

  addedAccount: action((state, data) => {
    state.account = data
  }),

  removedAccount: action(state => {
    state.account = null
  }),

  setAccountLoading: action((state, loading) => {
    state.accountLoading = loading
  }),

  setAccountRemoving: action((state, removing) => {
    state.accountRemoving = removing
  }),
}
