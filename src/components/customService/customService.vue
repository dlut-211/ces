<template>
  <div class="customService" id="customService">
    <div class="topTitle" @mousedown="topTitleClick">
      <img src="../../assets/serviceIcon.png" alt="" @mousedown.stop @click.stop>
      <span>在线客服系统</span>
      <img src="../../assets/closeBtn.png" alt="" class="close" @mousedown.stop @click.stop="close">
    </div>
    <div class="left">
      <div class="conversations" v-for="(value,key) in messages" :class="{'active':value.active}" @click="changeConversation(key)">
        <div class="top">
          <div class="title">{{value.name}}</div>
          <div class="badge" v-if="value.badge!=0">
            <Badge dot></Badge>
          </div>
        </div>
        <div class="lastMessage">
          {{value.content[value.content.length-1].message}}
        </div>
      </div>
      <div v-if="messages.length==0" class="noMessages">
        暂无内容
      </div>
    </div>
    <div class="right">
      <div class="content" id="messageContent">
        <div v-for="(value,key) in messages">
          <div v-if="value.active==true" v-for="(value2,key2) in value.content" class="overflow">
            <div :class="{'service':value2.type=='user','user':value2.type=='service'}">
              <div class="date">{{value2.date}}</div>
              <div class="message">{{value2.message}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="inputDiv">
        <div class="textareaDiv">
          <textarea v-model="textarea" placeholder="请输入内容"></textarea>
        </div>
          <div class="sendDiv" @click="send">
            发&nbsp;&nbsp;&nbsp;&nbsp;送
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    activeMessage: function() {
      for (let i = 0; i < this.messsages.length; i++) {
        if (messages[i].active == true) {
          return i;
        }
      }
    }
  },
  data: function() {
    return {
      textarea: "", //编辑器
      // 存储会话信息
      messages: [
        {
          name: "用户1",
          id: "123456",
          badge: 0,
          active: true,
          content: [
            {
              type: "service",
              date: "12:35:10",
              message: "你好，在吗"
            },
            {
              type: "user",
              date: "12:35:10",
              message: "在的"
            }
          ]
        },
        {
          name: "用户2",
          id: "321321",
          badge: 1,
          active: false,
          content: [
            {
              type: "service",
              date: "12:35:10",
              message: "你好，我是客服"
            },
            {
              type: "user",
              date: "12:35:10",
              message:
                "你好，我是用户你好，我是用户你好，我是用户你好，我是用户你好，我是用户"
            }
          ]
        },
        {
          name: "用户3",
          id: "321321",
          badge: 2,
          active: false,
          content: [
            {
              type: "service",
              date: "12:35:10",
              message: "你好，我是客服"
            },
            {
              type: "user",
              date: "12:35:10",
              message: "你好，我是用户"
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 对话框顶部拖拽
    topTitleClick: function(e) {
      var contactService = document.getElementById("customService");
      var distanceX = e.clientX - contactService.offsetLeft;
      var distanceY = e.clientY - contactService.offsetTop;
      document.onmousemove = function(e2) {
        var left = e2.clientX - distanceX;
        var top = e2.clientY - distanceY;
        contactService.style.left = left + "px";
        contactService.style.top = top + "px";
      };
      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false;
    },
    // 点击对话框关闭
    close: function() {
      this.$store.commit("changeCustomService", false);
    },
    // 发送按钮
    send: function() {
      if (this.textarea != "") {
        var j;
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].active == true) {
            j = i;
          }
        }
        this.messages[j].content.push({
          type: "service",
          message: this.textarea,
          date: new Date().toLocaleDateString()
        });
        this.textarea = "";
        // 在下次 DOM 更新循环结束之后执行延迟回调
        this.$nextTick(() => {
          document.getElementById("messageContent").scrollTop =
          document.getElementById("messageContent").scrollHeight + 50;
        });
      }
    },
    // 点击左侧改变右侧会话窗口
    changeConversation: function(key) {
      for (let i = 0; i < this.messages.length; i++) {
        this.messages[i].active = false;
      }
      this.messages[key].active = true;
      this.messages[key].badge = 0;
      this.$nextTick(() => {
        document.getElementById("messageContent").scrollTop =
        document.getElementById("messageContent").scrollHeight + 50;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./customService.scss";
</style>