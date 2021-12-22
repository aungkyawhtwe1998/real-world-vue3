<template>
  <div class="events">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; Previous Page
      </router-link>
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService";
import NProgress from "nprogress";
export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return { events: null, totalEvents: 0 };
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start();
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          //continue routing,when view component is loaded, set these value
          comp.events = response.data;
          comp.totalEvents = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({ name: "NetworkError" }); //if the network failed
      })
      .finally(() => {
        NProgress.done();
      });
  },
  beforeRouteUpdate(routeTo) {
    NProgress.start();
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        //since the component is already created, use this keyword
        this.events = response.data;
        this.totalEvents = response.headers["x-total-count"];
      })
      .catch(() => {
        return { name: "NetworkError" };
      })
      .finally(() => {
        NProgress.done();
      });
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
    },
  },
};
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 400px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
