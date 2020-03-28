document.querySelector('body').style.height = (window.innerHeight - 20) + "px";
var app = new Vue({
  el: '#app',
  data: {
    list: [],
    pageNum: 0,
    pageSize: 10,
    dialog: false,
    total: 100,
    loading: false
  },
  methods: {
    getIssues() {
      let that = this
      let url = `https://api.github.com/repos/pabitel/blog_tweet/issues?page=${that.pageNum}&per_page=10`
      let urlTotal = `https://api.github.com/repos/pabitel/blog_tweet`

      axios.get(urlTotal)
        .then(function (res) {
          that.total = res.data.open_issues_count
        })
        .catch(function (error) {
          console.log(error);
        });
      that.loading = true
      axios.get(url)
        .then(function (response) {
          that.loading = false
          response.data.forEach(element => {
            element.created_at = moment(element.created_at, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD HH:mm')
          })
          that.list = response.data
        })
        .catch(function (error) {
          that.loading = false
          console.log(error);
        });

    },
    handlePageCurrentChange(num) {
      let that = this
      that.pageNum = num
      that.getIssues()
    },
    handlerTest(){

    },
    handleClose(){
      
    }

  },
  created() {
    this.getIssues()
  },
  mounted() {
    var {
      Query,
      User
    } = AV;
    AV.init({
      appId: 'zsJtUBf48iP5TGs5G0KzPI6N-gzGzoHsz',
      appKey: 'Duh2N6aJa3s6KQSLSjTVYJIS'
    });
    var TestObject = AV.Object.extend('tweet');
    var testObject = new TestObject();
    var appVersion = window.navigator.appVersion;
    testObject.set('ip', returnCitySN["cip"]);
    testObject.set('address', returnCitySN["cname"]);
    testObject.set('appVersion', appVersion);
    testObject.save().then(function (testObject) {})
    var query = new AV.Query('city');
    query.find().then(function (results) {
      var data = results;
      for (var i = 0; i < data.length; i++) {
        if (returnCitySN["cname"].indexOf(data[i].attributes.cityName) != -1) {
        }
      }
    }, function (error) {
      // error is an instance of AVError.
    });

  }
})
