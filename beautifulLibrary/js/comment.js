var userId = $.cookie('userId');

var vm = new Vue({
  el: '#app',
  data: {
    content:'',
    images:[
      'img/star-l@2x.png',
      'img/star-l@2x.png',
      'img/star-l@2x.png'
    ],
    assessList: [
    {
        "CategoryID": "1",
        "CategoryName": "门店环境",
        "children":[
           {
               "ItemName": "门店环境如何",
               "sortIndex": null,
               "maxMark": 10,
               "mark": 4
           },
           {
               "ItemName": "门店环境如何",
               "sortIndex": null,
               "maxMark": 10,
               "mark": 5
           }
        ]
    },
    {
        "CategoryID": "1",
        "CategoryName": "门店环境",
        "children":[
           {
               "ItemName": "门店环境如何",
               "sortIndex": null,
               "maxMark": 10,
               "mark": 5
           },
           {
               "ItemName": "门店环境如何",
               "sortIndex": null,
               "maxMark": 10,
               "mark": 5
           }
        ]
    }
  ]
  },
  created:function(){
    // this.getAssessCategoryList();
  },
  methods:{
    getAssessCategoryList:function(){
      var _this = this;
      $.ajax({
        type:'get',
        url:'http://www.missnefer.com/AppAssess/GetAssessCategoryList',
        data:{
          userId: userId
        },
        success: function(res){
          _this.assessList = res;
        }
      });
    },
    setMark: function(index, i, mark){
      this.assessList[index].children[i].mark = mark;
    },
    delImg:function(index){
      this.images.splice(index, 1);
    },
    addImg: function(){
      if (this.images.length == 9) {
        alert('最多上传9张图片');
        return false;
      }
      this.images.push('img/star-l@2x.png');
    }
  }
});
