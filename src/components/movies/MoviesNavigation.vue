<template>
  <div>
    <div class="list-group shadow-sm">
      <a
        href="#"
        class="list-group-item list-group-item-action"
        :class="{active: activeTab === 'now_playing'}"
        @click.prevent="activeTab = 'now_playing'"
      >Now playing</a>
      <a
        href="#"
        class="list-group-item list-group-item-action"
        :class="{active: activeTab === 'popular'}"
        @click.prevent="activeTab = 'popular'"
      >Popular</a>
      <a
        href="#"
        class="list-group-item list-group-item-action"
        :class="{active: activeTab === 'upcoming'}"
        @click.prevent="activeTab = 'upcoming'"
      >Upcoming</a>
      <a
        href="#"
        class="list-group-item list-group-item-action"
        :class="{active: activeTab === 'top_rated'}"
        @click.prevent="activeTab = 'top_rated'"
      >Top rated</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "now_playing"
    };
  },
  watch: {
    activeTab(newValue) {
      this.$emit("tabChanged", newValue);
    }
  }
};
</script>

<style scoped>
.list-group-item.active {
  background-color: #66b0ff;
  border-color: #66b0ff;
}

.list-group-item {
  padding: 8px 20px;
}
</style>