<template>
    <div class="mui-numbox" data-numbox-min='0' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="numbox" class="mui-input-numbox" type="number" :value="val" @change="countChange" ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
	data () {
		return {
			val: 1
		}
	},
	created () {
		if (this.max <= 0) {
			this.val = 0
		} 
	},
	methods: {
		countChange () {
			if (parseInt(this.$refs.numbox.value) > this.max) {
				return this.$emit('getcount', this.max)
				
			}
			
			this.$emit('getcount', parseInt(this.$refs.numbox.value))
		}
	},
	mounted () {
		mui('.mui-numbox').numbox()	
	},
	props: ['max'],
	watch: {
		'max': function (newVal, oldVal) {
			mui('.mui-numbox').numbox().setOption('max', newVal)
			if (newVal === 0) {
				this.val = newVal
			}
		}
	}
}
</script>
<style lang="less" scoped></style>