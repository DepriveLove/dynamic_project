import { defineStore } from 'pinia'
export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menuList: [],
      firstMenu: '',
    }
  },
})
