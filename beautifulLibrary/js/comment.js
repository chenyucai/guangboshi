var userId = $.cookie('userId');

var category = localStorage.getItem('commentType');
var recordId = localStorage.getItem("commentGoodId");
var title = localStorage.getItem("commentGoodName");
var ctgName = localStorage.getItem("commentCategory");

var cType = localStorage.getItem('cType');

var vm = new Vue({
  el: '#app',
  data: {
    cType: cType,
    category: category,
    recordId: recordId,
    ctgName:ctgName,
    title: title,
    content:'',
    images:[],
    assessList: []
  },
  created:function(){
    this.getAssessCategoryList();
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
          res.forEach(function(item){
            item.items.forEach(function(v){
              v.mark = 5;
            })
          });
          _this.assessList = res;
        }
      });
    },
    setMark: function(index, i, mark){
      this.assessList[index].items[i].mark = mark;
    },
    delImg:function(index){
      this.images.splice(index, 1);
    },
    addImg: function(e){
      var _this = this;
      if (this.images.length == 9) {
        alert('最多上传9张图片');
        return false;
      }
      // this.images.push('img/star-l@2x.png');
      console.log(e.target.files.length);
      for (var i = 0; i < e.target.files.length; i++) {
        var file = e.target.files[i]; //获取上传文件列表中第i个文件
    		if (!/image\/\w+/.test(file.type)) {
    			//图片文件的type值为image/png或image/jpg
    			alert("文件必须为图片！");
    			return false;
    		}
    		var reader = new FileReader(); //实例一个文件对象
    		reader.readAsDataURL(file); //把上传的文件转换成url
    		//当文件读取成功便可以调取上传的接口
    		reader.onload = function(e) {
    			// console.log(e.target.result); //文件路径
    			// _this.images.push(e.target.result);
          var str = e.target.result.split(',')[1];
          $.ajax({
            url:'http://www.missnefer.com/AppAssess/UploadPicture',
            type:'POST',
            // contentType:'application/json;charset=utf-8',
            // data: JSON.stringify(data),
            // traditional:true,
            data:{
              userId: userId,
              recordId: recordId,
              ImageStr:str
            },
            success: function(res){
              _this.images.push(res);
            }
          });
    		};
      }
    },
    submit: function(){
      if (this.content == '') {
        return ;
      }
      var data = {
        userId: userId,
        category: parseInt(this.category),
        recordId: this.recordId,
        title: this.title,
        content: this.content,
        pics:this.images
      };
      var list = [];
      this.assessList.forEach(function(item){
        item.items.forEach(function(v){
          var obj = {
            ItemId: v.ItemId,
            CategoryId: v.CategoryId,
            mark: v.mark
          };
          list.push(obj);
        });
      });
      if (this.cType == '1') {
        data.marks = list;
      }

      $.ajax({
        url:'http://www.missnefer.com/AppAssess/SaveAssessItemList',
        type:'POST',
        contentType:'application/json;charset=utf-8',
        data: JSON.stringify(data),
        // traditional:true,
        // data:data,
        success: function(res){
          if (res == "") {
            alert('发表成功！');
            window.history.go(-1);
          } else {
            alert(res);
          }
        }
      });
    }
  }
});
