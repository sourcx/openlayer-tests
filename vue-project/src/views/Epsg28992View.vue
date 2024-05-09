<script lang="ts">
import { defineComponent } from 'vue'
import type { Geometry } from '../components/TheMapEpsg28992.vue'
import TheMapEpsg28992 from '../components/TheMapEpsg28992.vue'

export default defineComponent({
  components: {
    TheMapEpsg28992
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
                      [109000, 468500],
                      [109000, 438000],
                      [170000, 438000],
                      [170000, 468500],
                      [109000, 468500]
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
    <TheMapEpsg28992 :geometries="geometries" />
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
