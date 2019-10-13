"use strict";
(function() {
    window.addEventListener("load", init);

    function init() {
        var xmlhttp = new XMLHttpRequest();
        var url = "test.json";

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var posts = JSON.parse(this.responseText).posts;
                let feed = document.getElementById("feed");
                for (let i = 0; i < posts.length; i++) {
                    let article = document.createElement("article");
                    if (posts[i].severity == "critical") {
                        let critical = document.createElement("h1");
                        critical.textContent = "WARNING";
                        article.appendChild(critical);
                    }
                    let title = document.createElement("h1");
                    title.textContent = posts[i].title;
                    article.appendChild(title);
                    let imgHolder = document.createElement("div");
                    let img = document.createElement("img");
                    img.src = posts[i].images[0];
                    imgHolder.appendChild(img);
                    imgHolder.classList.add("event-image");
                    article.appendChild(imgHolder);
                    let date = document.createElement("p");
                    // check date
                    date.textContent = posts[i].datetime;
                    article.appendChild(date);
                    let distance = document.createElement("h3");
                    distance.textContent = posts[i].distance;
                    article.appendChild(distance);
                    article.onclick = function() {
                        sessionStorage.setItem('post', 'test');
                        window.location = "event.html";
                    }
                    feed.appendChild(article);
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
})();