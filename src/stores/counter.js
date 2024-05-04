import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // const userInfos = useStorage("userInfos", [
  //   {userName: "조찬숙", count: 0},
  //   {userName: "정연우", count: 0},
  // ]);
  const rawUserInfos = [
    {userName: "조찬숙", count: 0},
    {userName: "정연우", count: 0},

  ]
  const userInfos = useLocalStorage("userInfos",])

  const addUser = (userName) => {
    userInfos.value.push({userName: userName, count: 0});
  }
  const addVal = (userName, count) => {
    for (const userInfo of userInfos.value) {
      if (userInfo.userName === userName) {
        userInfo.count = userInfo.count + (userInfos.value.length - 1) * count;
      } else {
        userInfo.count = userInfo.count - count;
      }
    }
  }

  return { userInfos, addUser, addVal }
})
