<template>
	<div>
		<mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in bannerLists" :key="item.img">
                <a :href="item.url">
                    <img :src="item.img" :class="{'full': isfull}">
                </a>
            </mt-swipe-item>
        </mt-swipe>
	</div>
</template>
<script>
export default {
	props: ['bannerLists','isfull']
}
</script>
<style lang="less" scoped>
.mint-swipe {
    height: 200px;
    text-align: center;
    .mint-swipe-item {
        img {
            height: 100%;
            // object-fit: cover;
        }
    }
}
.full {
	width: 100%;
}
</style>