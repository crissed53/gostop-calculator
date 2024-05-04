<script setup>
import { useCounterStore } from "./stores/counter";

const { userInfos, addUser, addVal } = useCounterStore();
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
          @click="addVal(userInfo.userName)"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
