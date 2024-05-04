import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core"
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // const userInfos = useStorage("userInfos", [
  //   {userName: "조찬숙", count: 0},
  //   {userName: "정연우", count: 0},
  // ]);
  const userInfos = useStorage("userInfos", [
    {userName: "조찬숙", count: 0},
    {userName: "정연우", count: 0},

  ])

  const addUser = (userName) => {
    userInfos.value.push({userName: userName, count: 0});
  }
  const addVal = (userName) => {
    for (const userInfo of userInfos.value) {
      if (userInfo.userName === userName) {
        userInfo.count = userInfo.count + 1;
      } else {
        userInfo.count = userInfo.count - 1;
      }
    }
  }

  return { userInfos, addUser, addVal }
})
