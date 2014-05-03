angular.module('layout', [])
.factory('layout', function() {
    var headerTitle = '';
    
    return {
        getHeaderTitle: function() {
            return headerTitle;
        },
        setHeaderTitle: function(value) {
            headerTitle = value;
        }
    };
});
