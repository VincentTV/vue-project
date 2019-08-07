<template>
  <div class="comment-container">
    <h3>发表评论</h3>
    <el-divider></el-divider>
    <el-input type="textarea" :rows="2" placeholder="请输入内容（限制120字）" maxlength="120" v-model="commentStr"></el-input>
    <el-button type="primary" size="medium" icon="el-icon-s-promotion" @click="postComment">发送</el-button>
    <ul class="comment-list">
      <li v-for="(item, i) in commentList" :key="i">
        <div class="comment-data">
          <span>#{{ i+1 }} 用户：{{ item.user_name }}</span>
          <span>发表时间：{{ item.add_time | dateFormat }}</span>
        </div>
        <p class="comment-content">
          {{ item.content == 'undefined' || item.content == '' ? '该用户没留内容' : item.content  }}
        </p>
      </li>
    </ul>
    <el-button plain size="medium" icon="el-icon-refresh" @click="loadMore">加载更多</el-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      commentStr: '',
      commentList: [],
      pageIndex: 1,
      aid: this.$route.params.id
    }
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http.get('api/getcomments/' + this.aid + '?pageindex=' + this.pageIndex).then(res => {
        if(res.body.status == 0) {
          this.commentList = this.commentList.concat(res.body.message);
        } else {
          Toast('加载评论列表失败！')
        }
      })
    },
    loadMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      this.$http.post('api/postcomment/'+this.aid, { content: this.commentStr.trim() }).then(res => {
        if(res.body.status == 0) {
          let newComment = {
            add_time: new Date(),
            user_name: '匿名用户',
            content: this.commentStr
          }
          this.commentList.unshift(newComment);
          this.commentStr = '';
          Toast(res.body.message);
        }else {
          Toast(res.body.message);
        }
      })
    }
  }
}
</script>

<style lang="scss">
.comment-container {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  h3 {
    margin: 0;
    color: #000;
  }
  .el-button {
    margin: 10px 0;
    width: 100%;
  }
  .comment-list {
    .comment-data {
      padding: 5px;
      background-color: #cfd8dc;
      color: #000;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
    }
    .comment-content {
      text-indent: 2em;
    }
  }
}
</style>
