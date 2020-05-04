<template>
  <div class="col-12">
    <div class="card shadow">
      <h5 class="card-header" @click="trailerShow = !trailerShow" type="button">
        <i class="fas fa-play-circle mr-2"></i>Watch trailer
      </h5>
      <transition name="slide">
        <div class="card-body" style="padding: 5px !important" v-show="trailerShow">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" :src="videoSource" allowfullscreen></iframe>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoSource: String
  },
  data() {
    return {
      trailerShow: false
    };
  }
};
</script>

<style scoped>
.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-move {
  transition: transform 1s;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>