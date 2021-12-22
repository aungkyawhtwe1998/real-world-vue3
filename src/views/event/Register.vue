<template>
  <p>Register for the event here</p>
  <button @click="register">Register</button>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"], //available Gstore object
  methods: {
    register() {
      //call to api
      //if registered then redirect to event details

      this.GStore.flashMessage =
        "You are successfully registered for " + this.event.title;

      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);

      this.$router.push({
        name: "EventDetails",
        params: { id: this.event.id },
      });
    },
  },
};
</script>

