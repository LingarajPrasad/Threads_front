import { atom } from 'recoil'

export const conversationAtom=atom({
    key:'conversationAtom',
    default:[]
})


export const SelectedConversationAtom=atom({
    key:'SelectedConversationAtom',
    default:{
        _id:"",
        userid:'',
        userProfiePic:'',
        username:''
    }
})



