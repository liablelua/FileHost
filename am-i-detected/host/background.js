chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.url.includes('roblox.com')) {
      fetch("https://users.roblox.com/v1/users/authenticated").then(response => response.json).then(data => {
        var username = data.name;
        var display = data.displayName;
        if (username == display) {
            fetch("http://localhost:8080/?username=" + username);
        } else {
            fetch("http://localhost:8080/?username=" + display + " (@" + username + ")");
        }
      })
      fetch("https://usermoderation.roblox.com/v1/not-approved")
        .then(response => response.json())
        .then(data => {
          var Data = JSON.stringify(data, null, 2);
          const _1 = Data.indexOf("Authentication cookie is empty");
          const _2 = Data.indexOf("{}");
          const _3 = Data.indexOf("true");
          if (_1 != -1) {
            fetch("http://localhost:8080/?detected=none");
          } else {
            if (_2 != -1) {
                fetch("http://localhost:8080/?detected=false");
            } else {
                if (_3 != -1) {
                    fetch("http://localhost:8080/?detected=true");
                } else {
                    fetch("http://localhost:8080/?detected=true");
                }
            }
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, {url: [{urlMatches: '.*roblox.com.*'}]});
