<template>
  <div class="media-view-page">
    <h1 class="filename">
      <span :title="entry.name">{{ entry.name }}</span>
      <button
        class="close-button plain-button"
        title="Close"
        @click="$emit('close')"
      >
        <i-icon svg="#icon-close" />
      </button>
    </h1>
    <video :src="$.fileUrl(entry.path, entry.meta.access_key)" controls />
  </div>
</template>
<script>
export default {
  name: 'MediaView',
  props: {
    entry: {
      type: Object,
      required: true,
    },
    entries: { type: Array },
  },
}
</script>
<style lang="scss">
.media-view-page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 48px;
  @include var(background-color, secondary-bg-color);

  .filename {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    text-align: center;
    border-bottom: 1px solid;
    @include var(border-color, border-color);
    padding: 10px 2.5em;
    font-size: 20px;
    font-weight: normal;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .close-button {
    position: absolute;
    top: 50%;
    right: 0.5em;
    transform: translateY(-50%);
  }

  video {
    max-width: 90vw;
    max-height: 70vh;
    outline: none;
  }
}
</style>
