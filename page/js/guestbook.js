var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {
        reply() {
            return function(commentId, userName) {
                document.getElementById('comment_reply').value = commentId;
                document.getElementById('comment_reply_name').value = userName;
                location.href = "#send_comment"
            }
        }
    },
    created() {
        var bid = -2;
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid,
        }).then(function(resp) {
            blogComments.comments = resp.data.data;
            for (let i = 0; i < blogComments.comments.length; i++) {
                if ((blogComments.comments[i].parent > -1)) {
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                }
            }
        })
        axios({
            method: "get",
            url: "/queryCommentsCountByBlogId?bid=" + bid,
        }).then(function(resp) {
            blogComments.total = resp.data.data[0].count;
        })
    }
})

var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: '',
        rightCode: '',
    },
    computed: {
        sendComment: function() {
            return function() {
                var code = document.getElementById("comment_code").value;
                if (code !== sendComment.rightCode) {
                    alert("验证码错误！");
                    return;
                }
                var bid = -2;
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName,
                }).then(function(resp) {
                    alert(resp.data.msg);
                    location.reload();
                })
            }
        },
        changeCode() {
            return function() {
                axios({
                    method: "get",
                    url: "/queryRandomCode",
                }).then(function(resp) {
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                }).catch(function(resp) {
                    console.log("请求失败");
                })
            }
        }
    },
    created() {
        this.changeCode();
    }
})