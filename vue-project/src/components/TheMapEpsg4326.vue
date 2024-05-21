<script lang="ts">
import { Map, View } from 'ol'
import GeoJSON from 'ol/format/GeoJSON'
import type BaseLayer from 'ol/layer/Base'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import type { FlatStyleLike } from 'ol/style/flat'
import { defineComponent } from 'vue'
import TileWMS from 'ol/source/TileWMS'
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import { OSM, WMTS } from 'ol/source'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { getTopLeft, getWidth } from 'ol/extent'
import { get } from 'ol/proj'

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
      layers: [await this.osmBackgroundLayer(), await this.geometryLayer()],
      // layers: [await this.pdokBackgroundLayer(), await this.geometryLayer()],
      target: this.id,
      view: new View({
        projection: 'EPSG:4326',
        center: [5.5, 52],
        zoom: 7.5,
      }),
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
    pdokBackgroundLayer: async function() {
      // const projection = get('EPSG:4326')
      const projection = get('EPSG:3857')
      const projectionExtent = projection.getExtent()
      const size = getWidth(projectionExtent) / 256
      const resolutions = new Array(20)
      const matrixIds = new Array(20)

      for (let z = 0; z < 20; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        // see https://openlayers.org/en/latest/examples/wmts.html
        resolutions[z] = size / Math.pow(2, z)
        matrixIds[z] = z
      }

      return new TileLayer({
        extent: projectionExtent,
        source: new WMTS({
          // url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts',
          url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
          layer: 'standaard',
          // matrixSet: 'EPSG:4326',
          matrixSet: 'EPSG:3857',
          format: 'image/jpeg',
          attributions: 'Map data: <a href="http://www.kadaster.nl">Kadaster</a>',
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
          }),
          style: 'default'
        })
      })
    },
    osmBackgroundLayer: async function() {
      return  new TileLayer({
        source: new OSM(),
      })
    },
    ahocevarBackgroundLayer: async function() {
      return new TileLayer({
        source: new TileWMS({
          url: 'https://ahocevar.com/geoserver/wms',
          params: {
            'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
            'TILED': true,
          },
        }),
      })
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
