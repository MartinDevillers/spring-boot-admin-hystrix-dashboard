<template>
  <div class="hystrix-dashboard">
    <iframe :src="url"/>
  </div>
</template>

<script>
  export default {
    props: {
      instance: {
        type: Object,
        required: true
      }
    },
    computed: {
      url() {
        var basePath = 'hystrix-static/monitor/monitor.html'
        var stream = `../../instances/${this.instance.id}/actuator/hystrix.stream`
        var title = this.instance.info && this.instance.info.app && this.instance.info.app.name ? this.instance.info.app.name : this.instance.id
        return `${basePath}?stream=${stream}&title=${title}`
      }
    }
  };
</script>

<style>
.hystrix-dashboard {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
}

.hystrix-dashboard iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>