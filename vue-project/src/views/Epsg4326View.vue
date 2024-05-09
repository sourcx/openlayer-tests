<script lang="ts">
import { defineComponent } from 'vue'
import type { Geometry } from '../components/TheMapEpsg4326.vue'
import TheMapEpsg4326 from '../components/TheMapEpsg4326.vue'

export default defineComponent({
  components: {
    TheMapEpsg4326
  },
  data() {
    return {
      geometries: [
        {
          Id: '1',
          GeoJson: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [4.7143017, 52.2026888],
                      [4.7184106, 51.9285684],
                      [5.6052934, 51.9302675],
                      [5.6066347, 52.2044014],
                      [4.7143017, 52.2026888],
                    ]
                  ]
                },
                properties: {}
              }
            ]
          }
        }
      ] as Array<Geometry>
    }
  }
})
</script>

<template>
  <main>
    <TheMapEpsg4326 :geometries="geometries" />
    Polygon:
    {{ geometries[0].GeoJson['features'][0]['geometry']['coordinates'][0][0] }}
    {{ geometries[0].GeoJson['features'][0]['geometry']['coordinates'][0][1] }}
    {{ geometries[0].GeoJson['features'][0]['geometry']['coordinates'][0][2] }}
    {{ geometries[0].GeoJson['features'][0]['geometry']['coordinates'][0][3] }}
  </main>
</template>

<style>
main {
  height: 400px;
}
</style>
