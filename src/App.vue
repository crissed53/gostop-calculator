<script setup>
import { useStorage } from "@vueuse/core";
import { ref } from "vue";

// import { useCounterStore } from "./stores/counter";

// const { userInfos, addUser, addVal } = useCounterStore();
const userInfos = useStorage("userInfos", [
  { userName: "조찬숙", count: 0 },
  { userName: "정연우", count: 0 },
]);
const addUser = (userName) => {
  userInfos.value.push({ userName: userName, count: 0 });
};
const deleteUser = (userName) => {
  let index;
  for (let i = 0; i < userInfos.value.length; i++) {
    if (userInfos.value[i].userName === userName) {
      index = i;
      break;
    }
  }
  userInfos.value.splice(index, 1);
  // let result = [];
  // for (const userInfo in userInfos.value) {
  //   if (userInfo.userName !== userName) {
  //     result.push(userInfo);
  //   }
  // }
  // userInfos.value = result;
};
const addVal = (userName, count) => {
  for (const userInfo of userInfos.value) {
    if (userInfo.userName === userName) {
      userInfo.count = userInfo.count + (userInfos.value.length - 1) * count;
    } else {
      userInfo.count = userInfo.count - count;
    }
  }
};
const inputValue = ref("");
const registerMember = () => {
  addUser(inputValue.value);
  inputValue.value = "";
};
</script>

<template>
  <div>
    <div v-for="userInfo in userInfos">
      <div class="flex">
        <div>{{ userInfo.userName }}</div>
        <div class="w-16 h-16 border rounded-md text-2xl text-center">
          {{ userInfo.count }}
        </div>
        <button
          class="w-16 h-16 border rounded-md"
          @click="addVal(userInfo.userName, 1)"
        >
          +
        </button>
        <button
          class="w-16 h-16 border rounded-md"
          @click="addVal(userInfo.userName, 5)"
        >
          5+
        </button>
        <button
          class="w-16 h-16 border rounded-md"
          @click="addVal(userInfo.userName, 10)"
        >
          10+
        </button>
        <button
          class="w-16 h-16 border rounded-md"
          @click="deleteUser(userInfo.userName)"
        >
          X
        </button>
      </div>
    </div>
    <div>
      <input
        class="h-8 w-64 border"
        type="text"
        placeholder="add member"
        v-model="inputValue"
      />
      <button
        class="h-16 border rounded-md"
        @click="registerMember"
      >
        AddMember
      </button>
    </div>
  </div>
</template>
