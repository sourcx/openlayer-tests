<script lang="ts">
import { defineComponent } from 'vue'
import type { Geometry } from '../components/TheMapEpsg28992.vue'
import TheMapEpsg28992 from '../components/TheMapEpsg28992.vue'
import nederland from '../assets/nederland-EPSG28992.json'
import rectangle from '../assets/rectangle-EPSG28992.json'
import rectangle1 from '../assets/rectangle-limburg-1-EPSG28992.json'
import rectangle2 from '../assets/rectangle-limburg-2-EPSG28992.json'

export default defineComponent({
  components: {
    TheMapEpsg28992
  },
  data() {
    return {
      nederland,
      geometries: [
        {
          Id: '1',
          GeoJson: rectangle,
        },
        {
          Id: '2',
          GeoJson: nederland,
        },
        {
          Id: '3',
          GeoJson: rectangle1,
        },
        {
          Id: '4',
          GeoJson: rectangle2,
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
    <TheMapEpsg28992 :geometries="geometries" />
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
