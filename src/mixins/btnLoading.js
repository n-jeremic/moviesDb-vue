export default {
  methods: {
    displayLoader(btn) {
      btn.disabled = true;
      btn.innerHTML =
        '<span class="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span>Loading...';
    },
    hideLoader(btn, btnContent) {
      btn.disabled = false;
      btn.innerHTML = btnContent;
    }
  }
};
