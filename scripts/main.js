require.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'vendors/jquery-1.11.2.min',
        mustache : 'vendors/mustache.min',
        underscore : 'vendors/underscore.min'
    }
});

require(["jquery","slot-machine"],function($,App){
    $(document).ready(function() {
       new App($("#slot-machine"));
    });
});
