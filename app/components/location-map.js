import Ember from 'ember';
import mapData from '../data/gb-all';

export default Ember.Component.extend({
  chartOptions: {
    title: {
      text: 'Locations'
    },
    mapNavigation: {
      enabled: true
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.name}</b><br>number of employee: {point.employeeCount}'
    },
  },

  chartData: Ember.computed('locations', function() {
    return [
      {
        // Use the gb-all map with no data as a basemap
        mapData: mapData,
        name: 'Basemap',
        borderColor: '#A0A0A0',
        nullColor: 'rgba(200, 200, 200, 0.3)',
        showInLegend: false
      },
      {
        type: 'mappoint',
        name: 'Cities',
        data: this.get('locations')
      }
    ];
  })
});
