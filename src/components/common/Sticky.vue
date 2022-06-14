<template>
  <u-sticky v-if="navbarHeight" :customNavHeight="navbarHeight">
    <slot />
  </u-sticky>
</template>
