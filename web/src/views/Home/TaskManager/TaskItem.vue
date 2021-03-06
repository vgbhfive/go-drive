<template>
  <div class="upload-task-item" :class="`task-status-${task.status}`">
    <div
      v-if="progress && progress !== 1"
      class="upload-task-item__progress-bar"
      :style="{ width: `${progress * 100}%` }"
    ></div>
    <span class="upload-task-item__filename" :title="filename">
      <entry-icon class="upload-task-item__icon" :entry="entry" />
      <span class="upload-task__name">{{ filename }}</span>
    </span>
    <span
      class="upload-task-item__size"
      :title="$.formatBytes(task.task.size, 1)"
      >{{ task.task.size | formatBytes(1) }}</span
    >
    <span class="upload-task-item__location">
      <entry-link :path="dir" @click="$emit('navigate', $event)">
        {{ $.filename(dir) }}
      </entry-link>
    </span>
    <span class="upload-task-item__status">{{ statusText }}</span>
    <span class="upload-task-item__ops">
      <button
        class="upload-task-item__start plain-button"
        :title="$t('p.task.start')"
        v-if="showStart"
        @click="$emit('start')"
      >
        <i-icon svg="#icon-play" />
      </button>
      <button
        class="upload-task-item__pause plain-button"
        :title="$t('p.task.pause')"
        v-if="showPause"
        @click="$emit('pause')"
      >
        <i-icon svg="#icon-pause" />
      </button>
      <button
        class="upload-task-item__stop plain-button"
        :title="$t('p.task.stop')"
        v-if="showStop"
        @click="$emit('stop')"
      >
        <i-icon svg="#icon-stop" />
      </button>
      <button
        class="upload-task-item__remove plain-button"
        :title="$t('p.task.remove')"
        v-if="showRemove"
        @click="$emit('remove')"
      >
        <i-icon svg="#icon-close" />
      </button>
    </span>
  </div>
</template>
<script>
import { filename, dir, formatPercent } from '@/utils'
import {
  STATUS_CREATED,
  STATUS_PAUSED,
  STATUS_UPLOADING,
  STATUS_STOPPED,
  STATUS_ERROR,
  STATUS_COMPLETED,
  STATUS_MASK_CAN_START,
  STATUS_MASK_CAN_PAUSE,
  STATUS_MASK_CAN_STOP,
  STATUS_STARTING,
} from '@/api/upload-manager/task'

export default {
  name: 'UploadTaskItem',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    entry() {
      return {
        type: 'file',
        name: filename(this.task.task.path),
        path: this.task.task.path,
        meta: {},
      }
    },
    dir() {
      return dir(this.entry.path)
    },
    filename() {
      return this.entry.name
    },
    statusText() {
      switch (this.task.status) {
        case STATUS_CREATED:
          return this.$t('p.task.s_created')
        case STATUS_STARTING:
          return this.$t('p.task.s_starting')
        case STATUS_PAUSED:
          return this.$t('p.task.s_paused')
        case STATUS_UPLOADING:
          return formatPercent(this.progress)
        case STATUS_STOPPED:
          return this.$t('p.task.s_stopped')
        case STATUS_ERROR:
          return this.$t('p.task.s_error')
        case STATUS_COMPLETED:
          return this.$t('p.task.s_completed')
      }
      return ''
    },
    progress() {
      const p = this.task.progress
      if (!p) return null
      return p.loaded / p.total
    },
    showStart() {
      return this.task.isStatus(STATUS_MASK_CAN_START)
    },
    showPause() {
      return this.task.isStatus(STATUS_MASK_CAN_PAUSE)
    },
    showStop() {
      return this.task.isStatus(STATUS_MASK_CAN_STOP)
    },
    showRemove() {
      return !this.showStop
    },
  },
}
</script>
<style lang="scss">
.upload-task-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 14px;

  & > * {
    z-index: 1;
  }
}

.upload-task-item__progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s;
  background-color: #bcdffb;
  @include var(background-color, progress-bar-color);
}

.task-status-1 {
  .upload-task-item__progress-bar {
    background-color: #e2eeff;
  }
}

.entry-icon.upload-task-item__icon {
  width: 26px;
  height: 26px;
  margin-right: 0.5em;
  vertical-align: middle;
}

.upload-task-item__filename {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload-task__name {
  vertical-align: middle;
}

.upload-task-item__size {
  width: 60px;
  white-space: nowrap;
}

.upload-task-item__location {
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  a {
    text-decoration: none;
    @include var(color, link-color);
  }
}

.upload-task-item__status {
  width: 60px;
}

.upload-task-item__ops {
  width: 60px;
  white-space: nowrap;
  text-align: right;
  .plain-button {
    font-size: 18px;
  }
}
</style>
