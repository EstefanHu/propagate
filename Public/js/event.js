"use strict";
(function() {
    window.addEventListener("load", init);

    function init() {
        console.log("fuck");
        let post = sessionStorage.getItem('post');
        console.log(post);
    }
})();