import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { userInfo: {}, token: '' }
  },
  persist: {
    enabled: true,
    storage: sessionStorage,
  }
})
