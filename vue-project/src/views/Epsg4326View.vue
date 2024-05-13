<script lang="ts">
import { defineComponent } from 'vue'
import type { Geometry } from '../components/TheMapEpsg4326.vue'
import TheMapEpsg4326 from '../components/TheMapEpsg4326.vue'
import nederland from '../assets/nederland-EPSG4326.json'
import rectangle from '../assets/rectangle-EPSG4326.json'

export default defineComponent({
  components: {
    TheMapEpsg4326
  },
  data() {
    return {
      nederland,
      rectangle,
      geometries: [
        {
          Id: '1',
          GeoJson: rectangle,
        },
        {
          Id: '2',
          GeoJson: nederland,
        },
      ] as Array<Geometry>
    }
  },
  mounted() {
    // console.log(this.geometries)
  }
})
</script>

<template>
  <main>
    <TheMapEpsg4326 :geometries="geometries" />
    Showing
    <a href="#">Netherlands</a> polygon and
    <a href="#">square</a> polygon.
  </main>
</template>

<style>
main {
  height: 400px;
}
</style>
