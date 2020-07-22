<template>
  <div class="home-container ly-row-flex">
    <Post-Menu></Post-Menu>
    <router-view></router-view>
    <Post-Widgets></Post-Widgets>
    <Prograssbar></Prograssbar>
  </div>
</template>

<script>
import Menu from '../components/Menu'
import Widgets from '../components/Widgets'
import Prograssbar from '../components/Prograssbar'

export default {
  name: 'home',
  components: {
    'Post-Menu': Menu,
    'Post-Widgets': Widgets,
    Prograssbar
  }
}
</script>

<style>
@import '../assets/css/index';
@import '../assets/css/marked';

.home-container {
  position: relative;
  width: 1120px;
  padding: 8px 0 100px;
  margin: 0 auto;
}
</style>
