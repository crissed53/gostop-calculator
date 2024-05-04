<script setup>
import { useStorage } from "@vueuse/core";
import { ref } from "vue";

// import { useCounterStore } from "./stores/counter";

// const { userInfos, addUser, addVal } = useCounterStore();
const userInfos = useStorage("userInfos", [
  { userName: "조찬숙", count: 0, multiplier: 1, selected: true },
  { userName: "정연우", count: 0, multiplier: 1, selected: true },
]);
const addUser = (userName) => {
  userInfos.value.push({
    userName: userName,
    count: 0,
    multiplier: 1,
    selected: true,
  });
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
const addVal = (selectedUserInfo, count) => {
  if (!selectedUserInfo.selected) {
    return;
  }
  let totalMultiplier = 0;
  userInfos.value.forEach((userInfo) => {
    if (userInfo.selected) {
      totalMultiplier = totalMultiplier + userInfo.multiplier;
    }
  });
  console.log(totalMultiplier);
  for (const userInfo of userInfos.value) {
    if (!userInfo.selected) continue;
    if (userInfo.userName === selectedUserInfo.userName) {
      userInfo.count =
        userInfo.count + (totalMultiplier - userInfo.multiplier) * count;
    } else {
      userInfo.count = userInfo.count - count * userInfo.multiplier;
    }
  }
};
const inputValue = ref("");
const registerMember = () => {
  addUser(inputValue.value);
  inputValue.value = "";
};
console.log(userInfos.value);
</script>

<template>
  <div>
    <div v-for="userInfo in userInfos">
      <div class="flex">
        <input
          type="checkbox"
          class="h-16 w-16"
          v-model="userInfo.selected"
        />
        <button class="h-16 border border-md text-xl cursor-default p-4">
          {{ userInfo.userName }}
        </button>
        <button class="w-16 h-16 border rounded-md text-xl cursor-default p-4">
          {{ userInfo.count }}
        </button>
        <div class="h-16 border rounded-md text-xl cursor-default p-4 flex">
          x<input
            class="w-3"
            type="text"
            v-model.number="userInfo.multiplier"
          />
        </div>
        <button
          class="w-16 h-16 border rounded-md"
          @click="addVal(userInfo, 1)"
        >
          +
        </button>
        <button
          class="w-16 h-16 border rounded-md"
          @click="addVal(userInfo, 5)"
        >
          5+
        </button>
        <button
          class="w-16 h-16 border rounded-md"
          @click="addVal(userInfo, 10)"
        >
          10+
        </button>
        <button
          class="w-16 h-16 border rounded-md"
          @click="addVal(userInfo, -1)"
        >
          -
        </button>
        <button
          class="w-16 h-16 border rounded-md"
          @click="addVal(userInfo, -5)"
        >
          5-
        </button>
        <button
          class="w-16 h-16 border rounded-md"
          @click="addVal(userInfo, -10)"
        >
          10-
        </button>
        <button
          class="w-16 h-16 border rounded-md bg-red-500 text-white"
          @click="deleteUser(userInfo.userName)"
        >
          X
        </button>
      </div>
    </div>
    <div>
      <input
        class="h-16 w-64 border px-4 text-xl"
        type="text"
        v-model="inputValue"
      />
      <button
        class="h-16 border rounded-md p-4 text-xl bg-green-300 text-gray-500"
        @click="registerMember"
      >
        AddMember
      </button>
    </div>
  </div>
</template>
