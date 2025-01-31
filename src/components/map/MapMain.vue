<template>
    <div>
        <div id="map" :style="mapStyles"></div>
    </div>
</template>

<style>
.hide-control {
    display: none !important;
}
</style>

<script>
import L from 'leaflet';
import 'leaflet-routing-machine';

export default {
    name: 'MapComponent',
    props: {
        sidebarExpanded: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        mapStyles() {
            const sidebarWidth = this.sidebarExpanded ? '140px' : '35px';
            return {
                height: '100vh',
                width: `calc(100% - ${sidebarWidth})`,
                marginLeft: sidebarWidth,
                transition: 'all 0.3s ease-in-out'
            };
        }
    },
    data() {
        return {
            map: null,
            carRoutes: {},
            bins: [
                { lat: 47.040764, lng: 28.883693 },
                { lat: 47.045000, lng: 28.890000 },
                { lat: 47.038500, lng: 28.880000 },
                { lat: 47.048538, lng: 28.883003 },
                { lat: 47.069806, lng: 28.892896 },
                { lat: 47.053687, lng: 28.887224 },
                { lat: 47.054972, lng: 28.895151 },
                { lat: 47.050988, lng: 28.898816 }
            ],
            cars: [
                { id: 1, lat: 47.043736, lng: 28.880367 },
                { id: 2, lat: 47.048000, lng: 28.895000 }
            ],
            binMarkers: [],
            reservedBins: [],
            binIcon: L.icon({
                iconUrl: '/bin.png',
                iconSize: [16, 16],
                iconAnchor: [8, 16]
            }),
            carIcon: L.icon({
                iconUrl: '/car.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            })
        };
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.map = L.map('map').setView([47.049080, 28.890251], 14);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            this.bins.forEach((bin, index) => {
                let marker = L.marker([bin.lat, bin.lng], { icon: this.binIcon })
                    .addTo(this.map)
                    .bindPopup(`Bin at ${bin.lat}, ${bin.lng}`);
                this.binMarkers.push({ marker, index });
            });

            this.carMarkers = this.cars.map(car => {
                let carMarker = L.marker([car.lat, car.lng], { icon: this.carIcon }).addTo(this.map);
                this.carRoutes[car.id] = null;
                this.moveCarToBin(carMarker, car.id);
                return { marker: carMarker, id: car.id };
            });
        },

        moveCarToBin(carMarker, carId) {
            let carPos = carMarker.getLatLng();
            let nearestBin = this.findNearestBin(carPos);

            if (!nearestBin) return;

            this.reservedBins.push(nearestBin);

            if (this.carRoutes[carId]) {
                this.map.removeControl(this.carRoutes[carId]);
            }

            let routingControl = L.Routing.control({
                waypoints: [L.latLng(carPos.lat, carPos.lng), L.latLng(nearestBin.lat, nearestBin.lng)],
                createMarker: () => null,
                routeWhileDragging: false,
                fitSelectedRoutes: false,
                containerClassName: 'hide-control',
                addWaypoints: false,
                draggableWaypoints: false,
            }).addTo(this.map);

            this.carRoutes[carId] = routingControl;

            routingControl.on('routesfound', e => {
                let route = e.routes[0].coordinates;
                this.animateCar(carMarker, route, () => {
                    this.removeBin(nearestBin);
                    if (this.bins.length > 0) {
                        this.moveCarToBin(carMarker, carId);
                    }
                });
            });
        },

        findNearestBin(carPos) {
            let nearest = null;
            let minDist = Infinity;

            this.bins.forEach(bin => {
                if (this.reservedBins.includes(bin)) return;
                let dist = this.map.distance(carPos, L.latLng(bin.lat, bin.lng));
                if (dist < minDist) {
                    minDist = dist;
                    nearest = bin;
                }
            });

            return nearest;
        },

        removeBin(bin) {
            this.bins = this.bins.filter(b => b !== bin);
            this.reservedBins = this.reservedBins.filter(b => b !== bin);

            let binMarker = this.binMarkers.find(bm => bm.marker.getLatLng().lat === bin.lat && bm.marker.getLatLng().lng === bin.lng);
            if (binMarker) {
                this.map.removeLayer(binMarker.marker);
                this.binMarkers = this.binMarkers.filter(bm => bm !== binMarker);
            }
        },

        animateCar(carMarker, route, callback) {
            let i = 0;
            let speed = 200;
            let stepSize = 2;

            let move = () => {
                if (i < route.length) {
                    carMarker.setLatLng(route[i]);
                    i += stepSize;
                    setTimeout(move, speed);
                } else if (callback) {
                    callback();
                }
            };
            move();
        }
    }
};
</script>