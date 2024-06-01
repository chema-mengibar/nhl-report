async fetchData() {
  const url = this.domain + '';
  // console.log('[ToolService] fetchData: start');
  this.state = 'loading';

  return fetch(url, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      .then((res) => {
          return res.json()
      })
      .then((jsonResponse) => {
          if (jsonResponse) {
              console.log('[ToolService] fetchData:resp', jsonResponse)
              this.SVG = jsonResponse;

              setTimeout(() => {
                  this.state = 'loaded';
              }, 100)

              // return this.SVG;
          }
      }, (error) => {
          this.state = 'loaded';
          console.error('[ToolService] fetchData:', error)
      })
}

getData(fileId) {
  return null;
  //return this.lib[fileId];
}

  // this.fetchData().then(() => {
        //     // AppRouter.push({ path: '/', replace: true }).then(() => {
        //     //     window.location.href = '/'
        //     // })
        // });


        domain = '//XYZ.motuo.info'