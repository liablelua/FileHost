chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes('roblox.com')) {
    setTimeout(function() {
      fetch("https://users.roblox.com/v1/users/authenticated")
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          var username = data.name;
          var display = data.displayName;
    
          // Ensure both username and displayName exist
          if (!username || !display) {
            console.error('Username or displayName is undefined:', { username, display });
            return;
          }
    
          var url = "http://localhost:8080/?username=";
          
          if (username === display) {
            url += encodeURIComponent(username);
          } else {
            url += encodeURIComponent(display + " (@" + username + ")");
          }
          
          fetch(url);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }, 100);
    setTimeout(function() {
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
    }, 1250);
  }
}, {url: [{urlMatches: '.*roblox.com.*'}]});
