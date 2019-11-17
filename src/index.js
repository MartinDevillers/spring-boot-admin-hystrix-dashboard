/* global SBA */
import hystrixDashboard from './hystrix-dashboard'

SBA.use({
  install({viewRegistry}) {
    viewRegistry.addView({
      name: 'instances/hystrix',
      parent: 'instances',
      path: 'hystrix',
      component: hystrixDashboard,
      label: 'Hystrix',
      order: 1000,
      isEnabled: ({instance}) => instance.hasEndpoint('hystrix.stream')
    })
  }
})
