<template>
  <div class="app-container">
      <AsideMenu @sidebar-toggle="handleSidebarToggle" />
      <MapMain :sidebarExpanded="isSidebarExpanded" />
  </div>
</template>

<script>
import AsideMenu from '@/components/aside/AsideMenu.vue';
import MapMain from '@/components/map/MapMain.vue';

export default {
  components: {
      AsideMenu,
      MapMain
  },
  data() {
      return {
          isSidebarExpanded: false
      };
  },
  methods: {
      handleSidebarToggle(isExpanded) {
          this.isSidebarExpanded = isExpanded;
      }
  }
};
</script>

<style>
.app-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>