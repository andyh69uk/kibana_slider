define(function (require) {
  var module = require('ui/modules').get('kibana/kibana-slider-plugin', ['kibana']);
  module.controller('KbnSliderVisController', function ($scope, Private) {
    var queryFilter = Private(require('ui/filter_bar/query_filter'));
    var buildRangeFilter = require('ui/filter_manager/lib/range');

    $scope.type = 'range';
    $scope.selectedField = 'price';
    $scope.oldValue = null;

    $scope.filter = function(value) {
      var oldFilter = $scope.findFilter($scope.oldValue);
      if(oldFilter == null) {
        var rangeFilter = buildRangeFilter({name: $scope.selectedField},
                                            value,
                                            $scope.vis.indexPattern);
        queryFilter.addFilters(rangeFilter);
      }
      else {
        $scope.editingFilter = {
          source: oldFilter, // old
          type: $scope.type,
          model: oldFilter, // new
          alias: oldFilter.meta.alias
        };
        $scope.editingFilter.model.range.price.gte = $scope.editingFilter.model.range.price.gte + 1;
        queryFilter.updateFilter($scope.editingFilter);
      }
      $scope.oldValue = value;
    };

    $scope.findFilter = function(oldValue) {
      var foundFilter = null;

      if(oldValue != null) {
        var oldFilter = buildRangeFilter({name: $scope.selectedField},
                                          oldValue,
                                          $scope.vis.indexPattern);

        var filters = queryFilter.getFilters();
        for (var i = 0; i < filters.length; i++) {
          if (_.isEqual(filters[i][$scope.type], oldFilter[$scope.type])) {
            foundFilter = filters[i];
            break;
          }
        }
      }

      return foundFilter;
    };

  });
});
