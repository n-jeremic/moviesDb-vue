<template>
  <div>
    <div class="results-container card shadow">
      <div class="card-header">
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{disabled: currentPage === 1}">
              <a class="page-link" href="#" @click.prevent="currentPage -= 1">Previous</a>
            </li>
            <li
              class="page-item"
              :class="{active: currentPage === page}"
              v-for="page in numberOfPages"
              :key="page"
            >
              <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
            </li>
            <li class="page-item" :class="{disabled: currentPage === numberOfPages}">
              <a class="page-link" href="#" @click.prevent="currentPage += 1">Next</a>
            </li>
          </ul>
        </nav>
      </div>
      <transition-group name="slide" mode="out-in">
        <app-list-item
          v-for="(item) in showingItems"
          :key="item.id"
          :listItem="item"
          :activeItem="selectedItem"
          @itemSelected="$emit('itemSelected', $event)"
        ></app-list-item>
      </transition-group>
    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";

export default {
  props: {
    showsList: Array,
    selectedItem: Object
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 4
    };
  },
  watch: {
    showsList() {
      this.currentPage = 1;
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.showsList.length / this.itemsPerPage);
    },
    showingItems() {
      const items = [];
      const starting_position = (this.currentPage - 1) * this.itemsPerPage;
      const ending_position = starting_position + this.itemsPerPage;
      for (let i = starting_position; i < ending_position; i++) {
        if (this.showsList[i]) {
          items.push(this.showsList[i]);
        }
      }

      return items;
    }
  },
  components: {
    appListItem: ListItem
  }
};
</script>

<style scoped>
.card-header {
  padding-bottom: 0px;
}

.page-item.active .page-link {
  background-color: #66adff;
  border-color: #66adff;
}

.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute;
}

.slide-move {
  transition: transform 1s;
}

@keyframes slide-in {
  from {
    transform: translateX(20px);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(20px);
  }
}
</style>