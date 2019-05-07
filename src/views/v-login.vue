<template>
    <div>
        <bg></bg>
        <nav-bar shrinked="" :menu="getMenu()"></nav-bar>
        <div class="container" style="margin-top: 70px; text-align: left ">
                <login></login>
        </div>
    </div>
</template>

<script>
    import navBar from '../components/navbar'
    import bg from '../components/background'
    import mixinMenu from '../components/mixinMenu'
    import login from '../components/userLogin'

    export default {
        name: "v-index",
        components: {
            'nav-bar': navBar,
            'bg': bg,
            login,
        },
        mixins: [mixinMenu],
        data: function () {
            return {
                allowedStages: [1],
            }
        },
    }
</script>

<style scoped>

</style>
