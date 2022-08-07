import {defineStore} from 'pinia'

export const SidebarStore = defineStore('SidebarStore',{
    state:()=>{
        return {
            switchMode:false,
            dataList:[]
        }
    }
})