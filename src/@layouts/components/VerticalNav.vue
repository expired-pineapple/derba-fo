<script setup>
import logo from '../../assets/images/logo.png'

import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useDisplay } from 'vuetify'
import { useStore } from 'vuex'


const props = defineProps({
  tag: {
    type: [
      String,
      null,
    ],
    required: false,
    default: 'aside',
  },
  isOverlayNavActive: {
    type: Boolean,
    required: true,
  },
  toggleIsOverlayNavActive: {
    type: Function,
    required: true,
  },
})


const store = useStore()
const userData = store.getters.user

const { mdAndDown } = useDisplay()
const refNav = ref()
const route = useRoute()

watch(() => route.path, () => {
  props.toggleIsOverlayNavActive(false)
})

const isVerticalNavScrolled = ref(false)
const updateIsVerticalNavScrolled = val => isVerticalNavScrolled.value = val

const handleNavScroll = evt => {
  isVerticalNavScrolled.value = evt.target.scrollTop > 0
}
</script>

<template>
  <Component
    :is="props.tag"
    ref="refNav"
    class="layout-vertical-nav"
    :class="[
      {
        'visible': isOverlayNavActive,
        'scrolled': isVerticalNavScrolled,
        'overlay-nav': mdAndDown,
      },
    ]"
  >
    <!-- 👉 Header -->
    <div class="nav-header mb-4">
      <slot name="nav-header">
        <RouterLink
          to="/"
          class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
          style="margin: 1rem 0 0 1rem;"
        >
          <div class="d-flex" />
          <div>
            <div
              v-if="logo"
              class="logo-wrapper d-flex align-center justify-center mb-4 mt-2"
            >
              <VImg
                :src="logo"
                style="width: 6rem; height: 6rem; margin-bottom: 0.5rem;"
              />
            </div>
            <div
              v-else
              class="logo"
            >
              <VAvatar size="6rem">
                <VIcon
                  size="5rem"
                  color="grey lighten-1"
                  icon="mdi-account-circle-outline"
                />
              </VAvatar>
            </div>
            <span
              v-if="userData"
              class="text-h6 font-weight-semibold text-primary"
            >
              {{ userData.first_name }}
            </span>
          </div>
        </RouterLink>
      </slot>
    </div>
    <slot name="before-nav-items mt-8">
      <div class="vertical-nav-items-shadow" />
    </slot>
    <slot
      name="nav-items"
      :update-is-vertical-nav-scrolled="updateIsVerticalNavScrolled"
    >
      <PerfectScrollbar
        tag="ul"
        class="nav-items"
        :options="{ wheelPropagation: false }"
        @ps-scroll-y="handleNavScroll"
      >
        <slot />
      </PerfectScrollbar>
    </slot>

    <slot name="after-nav-items" />
  </Component>
</template>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/mixins";

// 👉 Vertical Nav
.layout-vertical-nav {
  position: fixed;
  z-index: variables.$layout-vertical-nav-z-index;
  display: flex;
  flex-direction: column;
  block-size: 100%;
  inline-size: variables.$layout-vertical-nav-width;
  inset-block-start: 0;
  inset-inline-start: 0;
  transition: transform 0.25s ease-in-out, inline-size 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  will-change: transform, inline-size;

  .nav-header {
    display: flex;
    align-items: center;

    .header-action {
      cursor: pointer;
    }
  }

  .app-title-wrapper {
    margin-inline-end: auto;
  }

  .nav-items {
    block-size: 100%;

    // ℹ️ We no loner needs this overflow styles as perfect scrollbar applies it
    // overflow-x: hidden;

    // // ℹ️ We used `overflow-y` instead of `overflow` to mitigate overflow x. Revert back if any issue found.
    // overflow-y: auto;
  }

  .nav-item-title {
    overflow: hidden;
    margin-inline-end: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 👉 Collapsed
  .layout-vertical-nav-collapsed & {
    &:not(.hovered) {
      inline-size: variables.$layout-vertical-nav-collapsed-width;
    }
  }

  // 👉 Overlay nav
  &.overlay-nav {
    &:not(.visible) {
      transform: translateX(-#{variables.$layout-vertical-nav-width});

      @include mixins.rtl {
        transform: translateX(variables.$layout-vertical-nav-width);
      }
    }
  }
}
</style>
