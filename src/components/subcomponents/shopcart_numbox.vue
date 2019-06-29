<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;" :data-numbox-max="max">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="numbox" class="mui-input-numbox" type="number" :value="num" @change="countChange" ref="numbox" readonly />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
	data () {
		return {
		}
	},
	created () {
	},
	methods: {
		countChange () {
			this.$store.commit('updateGoodsInfo', {
				id: this.id,
				count: this.$refs.numbox.value
			})
		}
	},
	mounted () {
		mui('.mui-numbox').numbox()	
	},
	props: ['num', 'id', 'max']
}
</script>
<style lang="less" scoped></style>