(function () {
    angular.module('luooApp')
        .factory('userRepository', userRepository);

    userRepository.$inject = ['$http', '$q', 'configFactory'];

    function userRepository($http, $q, configFactory) {
        var deferredUser = $q.defer();

        var repository = {
            user: {},
            initUser: initUser
        };

        return repository;

        function initUser() {
            var user = this.user;
            $http.get(configFactory.loginUrl).then(onSuccess).catch(onError);

            return deferredUser.promise;

            function onSuccess(response) {
                var responseData = response.data;
                user.userName = responseData.data.user_name;
                user.userId = responseData.data.uid;
                user.userAvatar = responseData.data.user_avatar;

                deferredUser.resolve(repository.user);
            }

            function onError(response) {
                console.log(response);
                deferredUser.reject('You should login in luoo first in your browser!');
            }
        }
    }
})();
