define(function (require) {
  var module = require('ui/modules').get('kibana/kibana-slider-plugin', ['kibana']);
  module.controller('KbnSliderVisController', function ($scope, Private) {
    var queryFilter = Private(require('ui/filter_bar/query_filter'));
    var buildRangeFilter = require('ui/filter_manager/lib/range');

    $scope.rangeFilter = null;
    $scope.price = 200;

    $scope.filter = function(field) {
      if($scope.rangeFilter == null) {
        $scope.rangeFilter = buildRangeFilter({name: 'price'}, {
          gte : $scope.price
        }, $scope.vis.indexPattern);

        queryFilter.addFilters([$scope.rangeFilter]);
      }
      else {
        $scope.editingFilter = {
          source: $scope.rangeFilter,
          type: 'range',
          model: {range: $scope.rangeFilter.range},
          alias: $scope.rangeFilter.meta.alias
        };
        $scope.editingFilter.model.range.price.gte = $scope.editingFilter.model.range.price.gte + 1;
        queryFilter.updateFilter($scope.editingFilter);
      }
    };

  });
});
