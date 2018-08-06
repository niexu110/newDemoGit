<template>
    <div>
        <!-- 双列表弹框 -->
		<div class="d_twoPopBox" v-if='popshow'>
			<div class="d_twoPop">
				<div class="d_fetedaytop">
					<p class="d_fetedayclear" @click="close()">取消</p>
					<p class="d_fetedaysure" @click="sure()">确认</p>
				</div>
				<ul class="d_minBox">
                    <li v-for='(key,index) in list' @click="leftlist(index)" :class="{'active':ind === index}">{{key}}</li>
                </ul>
				<ul class="d_maxBox">
                    <li v-for='(key,index) in list2' @click="rightlist(index)" :class="{'active':ind2 === index}">{{key}}</li>
                </ul>
			</div>
		</div>
        <!-- 单一弹框 -->
		<div class="d_popbottomBox" v-if='danshow'>
			<div class="d_popbottom">
				<div class="d_fetedaytop">
					<p class="d_fetedayclear" @click="onecolse">取消</p>
					<p class="d_fetedaysure" @click="onesure">确认</p>
				</div>
				<ul>
                    <li v-for='(key,index) in onelist' @click="conteronelist(index)" :class="{'active':oneind === index}">{{key}}</li>
                </ul>
			</div> 
		</div>
    </div>
</template>
<script>
import {showEl,getLoc} from '../../assets/js/fn.js'
let arr;
let age=[];
for(let i=18;i<75;i++){
    age.push(i)
}
export default {
    name:'changeterm',
    data(){
        return{
            popshow:false,
            danshow:false,
            list:[],
            list2:[],
            onelist:[],
            oneind:'',
            ind:'',
            ind2:'',
            key:'',//传过来的text值
            value1:'',
            value1code:'',
            value2:'',
            value2code:'',
            cityCode:'',
            onevalue:''
        }
    },
    props:[],
    methods:{
        // 双列表
        selectDset(data){
            this.popshow=true;
            this.list2=[];
            this.ind = '';
            this.key=data.text;
            this.list=arr[this.key]; 
        },
        leftlist(index){
            if(this.key=="province"){
                this.list2=arr.city[index];
                this.cityCode=arr.cityCode[index];
                this.value1code=arr.provinceCode[index];
            }else{
                this.list2=this.list.slice(index+1);
                this.list2.push(Number(this.list[this.list.length - 1])+1);
            }
            this.ind = index;
            this.ind2 = '';
            this.value2='';
            this.value1=this.list[index];
        },
        rightlist(index){
            if(this.key=="province"){
                this.value2code=this.cityCode[index];
            }
            this.ind2 = index;
            this.value2=this.list2[index];
        },
        sure(){
            if(this.value2==""){
                this.popshow=true;
            }else{
                let data={};
                this.popshow=false;
                
                if(this.key=="province"){
                    data={
                        [this.key]:this.value1+'-'+this.value2,
                        cityCode:this.value1code,
                        provinceCode:this.value2code
                    }
                }else{
                    data={
                        [this.key]:this.value1+'-'+this.value2
                    }
                }
                this.$emit('childVal',data)
            }
        },
        close(){
             this.popshow=false;
        },
        // 单列表
        selectdan(data){
            this.danshow=true;
            this.key=data.text;
            this.oneind='';
            this.onevalue='';
            this.onelist=arr[data.text];
        },
        conteronelist(index){
            this.oneind=index;
            this.onevalue=this.onelist[index]
        },
        onecolse(){
            this.danshow=false;
        },
        onesure(){
            if(this.onevalue==''){
                this.danshow=ture;
            }else{
                this.danshow=false;
                let data={
                    [this.key]:this.onevalue
                };
                this.$emit('childVal',data);
            }
        },
        addone(){},
        addtwo(){},
    },
	created(){
        
        arr=getLoc('allList');
        arr.age=age;
        arr.height.pop();      
	},
}
</script>

<style lang='less' scoped>

/*筛选弹框*/
.d_fetedayBox,.d_popbottomBox,.d_locationpopBox,.d_twoPopBox,.d_heiha{position: fixed;top:0;left: 0; width: 100%;height: 100%;background: rgba(0,0,0,0.7);z-index: 200000;}
.d_heiha p{margin-top: 4rem;color: #FFFFFF;text-align: center;font-size: .32rem;}
.d_feteday,.d_popbottom,.d_addressBox,.d_twoPop{position: fixed;bottom: 0;left: 0;max-height: 5.0rem;width: 100%;background: #FFFFFF;}
.d_fetedaytop{height: 1rem;margin: 0 0.3rem;}
.d_fetedaytop p{font-size: 0.32rem;line-height: 1rem;}
.d_fetedayclear{float: left;}
.d_fetedaysure{float: right;color: #FF704F;}
.d_fetedayBox ul{float: left; height: 3.8rem;width: 2.5rem; overflow: auto;}
.d_fetedayBox ul li{text-align: center;height: 0.8rem;line-height: 0.8rem;font-size: 0.28rem;color: #666666;}
.d_popbottomBox ul{max-height: 4rem;overflow: auto;}
.d_addressBox ul,.d_twoPop ul{width: 50%;height: 4rem;float: left;overflow: auto;}
.d_popbottomBox ul li,.d_addressBox ul li,.d_twoPop ul li{font-size: 0.3rem;height: 0.8rem;text-align: center;line-height: 0.8rem;background: #FFFFFF;color: #666666;}
.d_twoPop .active,.d_popbottomBox .active{
    background: rgb(255, 112, 75);
}
</style>
