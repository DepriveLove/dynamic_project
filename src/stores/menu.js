import { defineStore } from 'pinia'
export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menuList: [],
      firstMenu: '',
    }
  },
  persist: {
    enabled: true,
    storage: sessionStorage,
  }
})
