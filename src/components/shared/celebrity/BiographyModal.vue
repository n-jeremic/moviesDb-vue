<template>
  <div
    class="modal fade"
    id="biographyModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="exampleModalLabel">{{ personName }} biography</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">{{ biography }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    biography: String,
    personName: String
  }
};
</script>