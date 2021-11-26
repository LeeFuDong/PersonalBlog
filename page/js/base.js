//随机标签
var randomTags = new Vue({
    el: '#random_tags',
    data: {
        tags: [],
    },
    computed: {
        randomColor() {
            return function() {
                var r = 50 + Math.floor(Math.random() * 200);
                var g = 50 + Math.floor(Math.random() * 200);
                var b = 50 + Math.floor(Math.random() * 200);
                return `rgb(${r},${g},${b})`;
            }
        },
        randomSize() {
            return function() {
                return `${15+ Math.floor(Math.random()*30)}px`;
            }
        },
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function(resp) {
            var result = []
            for (let i = 0; i < resp.data.data.length; i++) {
                result.push({ text: resp.data.data[i].tag, link: "/?tag=" + resp.data.data[i].tag });
            }
            randomTags.tags = result;
        })
    }
})

//最近热门
var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: [
            // { name: "asd", url: "http://www.baidu.com" },
            // { name: "qwe", url: "http://www.baidu.com" },
            // { name: "zxc", url: "http://www.baidu.com" }
        ]
    },
    created() {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function(resp) {
            var list = []
            for (let i = 0; i < resp.data.data.length; i++) {
                var temp = {}
                temp.name = resp.data.data[i].title;
                temp.url = "blog_detail.html?bid=" + resp.data.data[i].id;
                list.push(temp);
            }
            newHot.titleList = list;
        })
    }
});

var newComments = new Vue({
    el: '#new_comments',
    data: {
        commentList: [
            { name: '这里是用户名', date: '2021-02-12', comment: '这里是评论' },
        ]
    },
    created() {
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(function(resp) {
            var list = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                var temp = {}
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                list.push(temp);
            }
            newComments.commentList = list;
        })
    }
})