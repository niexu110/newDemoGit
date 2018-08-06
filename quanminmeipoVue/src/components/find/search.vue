<template>
     <div v-wechat-title='$route.meta.title'>
         <loading :load='load'></loading>
          <div class='searchTop'>
               <div class='searchTxt'>
                    <span class='lt' @click='goBack()'></span>
                    <input type="text" placeholder="请输入用户昵称或UID" @focus="focus()" class='lt' maxlength="7" v-model='searchVal' onkeyup="this.value=this.value.replace(/\s+/g,'')">
                    <div class='rt' @click='search()'>搜索</div>
               </div>
          </div>
          <div class='searchBox' v-if='searchOk'>
               <div class='searchContent' v-if='length'>
                    <p class='item' v-for="k in searchList" @click='searchUser(k)'>{{k}}</p>
                     <div class='clearItem' @click='clearK()'>清除搜索历史</div>
               </div>
               <div class='searchNull' v-else>暂无搜索记录...</div>
          </div>
          <div class='searchBox' v-else>
               <div class='searchNull' v-if='len==0'>没有此用户</div>
               <div class='searchContent' v-else>
                    <div class='searchItem' v-for="item in userData" @click='skip(item)'>
                         <img :src="item.image" class='lt'>
                         <p class='lt'>{{item.nickname}}</p>
                    </div>
               </div>
          </div>
          <div id="popup"></div>
     </div>
</template>
<script>
import loading from "../common/loading";
import { showEl, setLoc, getLoc, clearKey } from "../../assets/js/fn.js";
export default {
    name: "search",
    data() {
        return {
            searchVal: "",
            isSearch: true,
            userData: [],
            searchList: [],
            load:false,
            searchOk: false,
            localStorageList:new Set(),
            len: 0,
            length: true
        };
    },
    methods: {
        async search() {
            if (this.searchVal =="") {
                showEl("请输入用户昵称或UID", 2000);
            } else {
                if (this.isSearch) {
                    this.isSearch = false;
                    let data = {
                        keyword: this.searchVal,
                        page: 1,
                        limit:10
                    };
                    let res = await this.$htp.post(data,this.$api.search);
                    if (res.code == 200) {
                        this.localStorageList.add(this.searchVal);
                        this.len = res.data.length;
                        if (res.data.length != 0) {
                            this.userData = res.data;
                        }
                        setLoc("search", this.localStorageList);
                    }
                } else {
                    showEl("不要重复提交相同内容", 2000);
                }
            }
        },
        skip(item) {
            this.$router.push({
                path: "card",
                query: { uid: item.uid, nickName: item.nickname }
            });
        },
        focus() {
            this.isSearch = true;
            this.searchOk = false;
        },
        searchUser(item){
             this.searchVal=item;
             this.search();
             this.searchOk = false;
        },
        clearK(){
             clearKey("search");
             this.searchList=[];
             this.searchOk = true;
             this.length = false
        },
        goBack(){
             this.$router.push('find')
        }
    },
    components:{loading},
    created() {
        this.searchList = getLoc("search");
        if(this.searchList==null){
            this.length = false;this.searchOk = true;
        }else{
            this.length = true;this.searchOk = true
            for(let k of this.searchList){
               this.localStorageList.add(k);
            }
        }
    }
};
</script>
<style lang="less" scoped>
.searchTop {
    position: fixed;
    top: 0;
    left: 0.3rem;
    width: 6.9rem;
    height: 1rem;
    background: #fff;
    .searchTxt {
        height: 0.66rem;
        margin-top: 0.17rem;
        span {
            height: 0.66rem;
            width: 0.5rem;
            background: url("../../assets/image/icon/left.png") no-repeat left;
            background-size: 0.17rem;
        }
        input {
            height: 0.66rem;
            background: #f0f0f0;
            width: 5.5rem;
            border-radius: 0.5rem;
            padding-left: 0.3rem;
            color: #333333;
            line-height: 0.66rem;
            font-size: 0.28rem;
        }
        div {
            font-size: 0.28rem;
            color: #333333;
            line-height: 0.66rem;
        }
    }
}
.searchBox {
    width: 7.2rem;
    height: auto;
    margin-left: 0.3rem;
    padding-top: 1rem;
    .searchNull {
        text-align: center;
        font-size: 0.3rem;
        color: #666;
        line-height: 1.5rem;
    }
    .item {
        height: 0.88rem;
        padding: 0 0.3rem;
        border-bottom: solid 1px #e6e6e6;
        line-height: 0.88rem;
        font-size: 0.26rem;
        color: #333333;
    }
    .clearItem{
         text-align: center;color:#666;
         line-height:.8rem;font-size:.3rem 
    }
    .searchItem {
        height: 1.6rem;
        border-bottom: solid 1px #e6e6e6;
        img {
            width: 1rem;
            border-radius: 50%;
            margin-top: 0.3rem;
        }
        p {
            margin-left: 0.3rem;
            height: 1.6rem;
            line-height: 1.6rem;
            color: #333;
            font-size: 0.28rem;
            font-weight: bold;
        }
    }
}
</style>


