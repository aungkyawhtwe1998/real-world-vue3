<template>
  <!-- 12 . call GStore to get every event data -->
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details | </router-link>
      <router-link :to="{ name: 'EventRegister' }">Register | </router-link>
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>
 
<script>
//1. move api call to router
export default {
  //11.
  inject: ["GStore"],
  // props: ["id"],
  // data() {
  //   return {
  //     // reactive obj
  //     event: null,
  //   };
  // },
  // created() {
  //   //2.move all to 'beforeEnter' option of the route.
  // },
};
</script>

<style></style>
