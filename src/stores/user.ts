import { defineStore } from "pinia";

interface User{
    member_id:number,
    name: string,
    email: string,
    avatar?: string ,
    role?: number,
    createdAt?:string,
    updatedAt?:string
}

export const useUserStore = defineStore('user',{
    state: () => ({
       user: null as User | null
  }),
  getters:{
    userName:(state)=>{
        return state.user?.name
    },
    userAvatar:(state)=>{
        return state.user?.avatar
    },
    userEmail:(state)=>{
        return state.user?.email
    },
    userId:(state)=>{
        return state.user?.member_id
    },
    
  },
  actions: {
    setUser(data:User){
        this.user = data
    },
    clearUser(){
        this.user = null
    }
  }
})