<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textColor;
}

html, body {
  overflow: hidden;
  background: $backgroundGlobal;
  transition: background 2s ease;
}
</style>