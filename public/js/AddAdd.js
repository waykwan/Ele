$(function(){
	let app = new Vue({
		el:"#myApp",
		data:{
			sex:['先生','女士'],
			activesex:''
		},
		methods:{
			selected:function(sex){
				this.activesex = sex;
			}
		}
	});
})