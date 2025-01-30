import { Component, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map!: Map;
  private markerLayer!: VectorLayer<VectorSource>;

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([16.3738, 48.2082]), // Vienna Coordinates
        zoom: 12,
        projection: 'EPSG:3857'
      })
    });

    // Initialize marker layer
    this.markerLayer = new VectorLayer({
      source: new VectorSource()
    });
    this.map.addLayer(this.markerLayer);
  }

  // Search for Address & Place Magic Marker
  searchLocation(address: string): void {
    if (!address) return;

    const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Vienna')}`;

    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lon = parseFloat(data[0].lon);
          const lat = parseFloat(data[0].lat);
          this.addMagicMarker(lon, lat);
        } else {
          alert("Address not found in Vienna!");
        }
      })
      .catch(error => console.error("Error fetching location data:", error));
  }

  // Add  Glowing Marker to Map
  private addMagicMarker(lon: number, lat: number): void {
    const markerFeature = new Feature({
      geometry: new Point(fromLonLat([lon, lat]))
    });

    // Create a Glowing Pulse Effect
    markerFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({
            color: 'rgba(6, 66, 177, 0.99)',
            width: 4
          }),
          fill: new Fill({
            color: 'rgba(0, 65, 244, 0.5)'
          })
        })
      })
    );

    // Clear previous markers and add the new one
    this.markerLayer.getSource()?.clear();
    this.markerLayer.getSource()?.addFeature(markerFeature);

    // Move map to new location
    this.map.getView().animate({ center: fromLonLat([lon, lat]), zoom: 14, duration: 1000 });

    // Add a Pulsing Effect
    let pulseScale = 1;
    setInterval(() => {
      pulseScale = pulseScale === 1 ? 1.5 : 1;
      markerFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 10 * pulseScale,
            stroke: new Stroke({
              color: 'rgba(0, 128, 255, 0.8)',
              width: 4
            }),
            fill: new Fill({
              color: 'rgba(18, 159, 184, 0.5)'
            })
          })
        })
      );
    }, 500);
  }
}
