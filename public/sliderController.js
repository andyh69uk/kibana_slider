define(function (require) {
  var module = require('ui/modules').get('kibana/kibana-slider-plugin', ['kibana']);
  module.controller('KbnSliderVisController', function ($scope, Private) {
    var queryFilter = Private(require('ui/filter_bar/query_filter'));
    var buildRangeFilter = require('ui/filter_manager/lib/range');

    $scope.type = 'range';
    $scope.oldField = null;

    $scope.filter = function(field) {
      var oldFilter = $scope.findFilter($scope.oldField);
      if(oldFilter == null) {
        var rangeFilter = buildRangeFilter({name: field.id}, {
          gte : field.value
        }, $scope.vis.indexPattern);

        queryFilter.addFilters(rangeFilter);
      }
      else {
        $scope.editingFilter = {
          source: oldFilter, // old
          type: 'range',
          model: oldFilter, // new
          alias: oldFilter.meta.alias
        };
        $scope.editingFilter.model.range.price.gte = $scope.editingFilter.model.range.price.gte + 1;
        queryFilter.updateFilter($scope.editingFilter);
      }
      $scope.oldField = field;
    };

    $scope.findFilter = function(oldField) {
      var foundFilter = null;

      if(oldField != null) {
        var oldFilter = buildRangeFilter({name: oldField.id}, {
          gte: oldField.value
        }, $scope.vis.indexPattern);

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
