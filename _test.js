const { YouTube } = require("./app");

__Test__();

function __Test__() {
  YouTube("UCBUVGPsJzc1U8SECMgBaMFw", "YOUR_API_KEY").then(data => {
    console.log(data);
  });
}
