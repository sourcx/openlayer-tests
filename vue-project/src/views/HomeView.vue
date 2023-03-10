<script lang="ts">
import { defineComponent } from 'vue';
import TheMap from '../components/TheMap.vue'
import type { Geometry } from '../components/TheMap.vue'

export default defineComponent({
  components: {
    TheMap,
  },
  data() {
    return {
      geometries: [
        {
          Id: '1',
          GeoJson: JSON.stringify({
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                    [
                      [
                        109000,
                        468500.00000000745
                      ],
                      [
                        109000,
                        438000
                      ],
                      [
                        170000,
                        438000
                      ],
                      [
                        170000,
                        468500.00000000745
                      ],
                      [
                        109000,
                        468500.00000000745
                      ]
                    ]
                  ]
                },
                "properties": {}
              }
            ]
          }),
        },
      ] as Array<Geometry>,
    }
  },
})
</script>

<template>
  <main>
    <TheMap :geometries="geometries" />
  </main>
</template>

<style>
main {
  height: 400px;
}
</style>
