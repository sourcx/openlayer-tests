<script lang="ts">
import { Map, View } from 'ol'
import { getTopLeft } from 'ol/extent'
import GeoJSON from 'ol/format/GeoJSON'
import type BaseLayer from 'ol/layer/Base'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { Projection } from 'ol/proj'
import { WMTS } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import type { FlatStyleLike } from 'ol/style/flat'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { defineComponent } from 'vue'

const GEOMETRIES_LAYER = 'GeometriesLayer'

export type Geometry = {
  Id: string
  GeoJson: any
}

export default defineComponent({
  props: {
    geometries: {
      type: Array<Geometry>,
      default: []
    }
  },
  beforeMount() {
    this.id = Math.random().toString(36)
    console.log('VMap: created a map with id ' + this.id)
  },
  async mounted() {
    this.map = new Map({
        controls: [],
        layers: [await this.wmtsBackgroundLayer(), await this.geometryLayer()],
        target: this.id,
        view: new View({
          minZoom: 0,
          maxZoom: 15,
          projection: this.projection(),
          center: [150000, 450000],
          zoom: 3
        })
      })
  },
  data() {
    return {
      id: '',
      map: null as unknown as Map,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(52, 73, 94, 1)', // vue gray
          // color: 'rgba(0, 189, 126, 1)', // vue green
          lineDash: [4],
          width: 2
        }),
        fill: new Fill({
          // color: 'rgba(52, 73, 94, 0.3)', // vue gray
          color: 'rgba(0, 189, 126, 0.1)' // vue green
        }),
        image: new CircleStyle({
          radius: 2,
          fill: new Fill({ color: 'rgba(52, 73, 94, 1)' })
        })
      }) as FlatStyleLike
    }
  },
  watch: {
    geometries() {
      this.setGeometryLayer()
    }
  },
  methods: {
    projection: function () {
      return new Projection({
        code: 'EPSG:28992',
        extent: this.projectionExtent(),
        units: 'm'
      })
    },
    projectionExtent: function () {
      return [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999]
    },
    geometryLayer: async function () {
      const features = this.geometries.map((x) => new GeoJSON().readFeatures(x.GeoJson)[0])
      console.log('Add ' + features.length + ' geometries to the GeometriesLayer on the map.')
      console.log(features[0])

      const vectorSource = new VectorSource({
        wrapX: false,
        features: features
      })

      return new VectorLayer({
        source: vectorSource,
        style: this.style,
        visible: true,
        properties: {
          Name: GEOMETRIES_LAYER
        }
      })
    },
    setGeometryLayer: async function () {
      console.log('VMap: geometries changed. Remove the GeometriesLayer from the map.')
      const layer = this.map
        .getLayers()
        .getArray()
        .filter((layer) => layer instanceof VectorLayer)
        .find((layer) => layer.getProperties().Name === GEOMETRIES_LAYER) as BaseLayer
      this.map.removeLayer(layer)
      this.map.addLayer(await this.geometryLayer())
    },
    wmtsBackgroundLayer: async function () {
      var matrixIds = new Array(15)

      for (var z = 0; z < 15; ++z) {
        matrixIds[z] = 'EPSG:28992:' + z
      }

      return new TileLayer({
        opacity: 0.7,
        source: new WMTS({
          attributions: 'Kaartgegevens: &copy; <a href="https://www.kadaster.nl">Kadaster</a>',
          url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
          layer: 'standaard',
          matrixSet: 'EPSG:28992',
          format: 'image/jpg',
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(this.projectionExtent()),
            resolutions: [
              3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21
            ],
            matrixIds: matrixIds
          }),
          style: 'default',
          wrapX: false
        })
      })
    }
  }
})
</script>

<template>
  <div class="map" :id="id" />
</template>

<style>
.map {
  height: 50vh;
  background-color: #eee;
  border: 1px solid black;
}
</style>
