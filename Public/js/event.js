"use strict";
(function() {
    window.addEventListener("load", init);

    function init() {
        let post = sessionStorage.getItem('post');
        console.log(post);
    }
})();