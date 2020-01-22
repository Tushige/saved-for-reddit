<template>
  <div class="posts-list-item">
    <div class="post-info">
      <span class="author">
        {{ post.author }}
      </span>
      <span class="date"> {{ postDate }}d </span>
    </div>
    <span class="title">{{ post.title }}</span>
    <div class="post-attributes">
      <span class="score"><i class="far fa-smile"></i>{{ post.score }}</span>
      <span class="comments"><i class="far fa-comment"></i>{{ post.num_comments }}</span>
    </div>
  </div>
</template>

<script>
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    postDate() {
      const now = new Date();
      const now_utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
      const post_date = new Date(0);
      post_date.setUTCSeconds(this.post.created);
      const post_date_utc = Date.UTC(post_date.getFullYear(), post_date.getMonth(), post_date.getDate());
      return Math.floor((now_utc - post_date_utc) / _MS_PER_DAY);
    }
  }
};
</script>

<style scoped>
.posts-list-item {
  box-sizing: border-box;
  width: 99%;
  height: 100px;
  margin-bottom: 25px;
  padding: 7px;
  border-radius: 6px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 10px 50px 10px;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 10px;
  justify-items: start;
  box-shadow: -1px 1px 9px -5px grey;
}
.author {
  color: gray;
}
.title {
  overflow: hidden;
  text-align: left;
}
.post-attributes,
.post-info {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.score {
  /*position: absolute;
  bottom: 7px;
  left: 7px;*/
}
.score svg,
.comments svg {
  margin-right: 5px;
}
</style>
