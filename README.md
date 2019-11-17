# Hystrix Dashboard for Spring Boot Admin 2.x

[![Build Status](https://travis-ci.com/MartinDevillers/spring-boot-admin-hystrix-dashboard.svg?branch=master)](https://travis-ci.com/MartinDevillers/spring-boot-admin-hystrix-dashboard)

This module adds [Hystrix Dashboard](https://github.com/Netflix-Skunkworks/hystrix-dashboard/) to 
[Spring Boot Admin 2.x](https://github.com/codecentric/spring-boot-admin). It is implemented as a 
[Custom View Module](https://codecentric.github.io/spring-boot-admin/current/#customizing-custom-views) using the 
[spring-boot-admin-sample-custom-ui](https://github.com/codecentric/spring-boot-admin/tree/master/spring-boot-admin-samples/spring-boot-admin-sample-custom-ui/) 
project as a template. 

---
### Using this module
To use this module, simply add the following Maven dependency to your Spring Boot Admin application, rebuild, deploy and enjoy!
```xml
<dependency>
    <groupId>nl.devillers</groupId>
    <artifactId>spring-boot-admin-hystrix-dashboard</artifactId>
    <version>1.0</version>
</dependency>
```

If the Hystrix option does not appear in the instances view, then first make sure that Spring Boot Admin has loaded this module correctly by checking the logs
during startup. The logs should show two entries like the following:
```
2019-11-15 13:31:30.627  INFO 17624 --- [           main] b.a.s.u.c.AdminServerUiAutoConfiguration : Loaded Spring Boot Admin UI Extension: UiExtension(resourcePath=hystrix-dashboard/css/custom.6134ab29.css, resourceLocation=classpath:/META-INF/spring-boot-admin-server-ui/extensions/hystrix-dashboard/css/custom.6134ab29.css)
2019-11-15 13:31:30.628  INFO 17624 --- [           main] b.a.s.u.c.AdminServerUiAutoConfiguration : Loaded Spring Boot Admin UI Extension: UiExtension(resourcePath=hystrix-dashboard/js/custom.6b4c7d50.js, resourceLocation=classpath:/META-INF/spring-boot-admin-server-ui/extensions/hystrix-dashboard/js/custom.6b4c7d50.js)
```

Second, check that the Hystrix Stream endpoint is properly exposed to Spring Boot Actuator by querying the discovery endpoint. This endpoint is 
accessible at the base-path of Spring Boot Actuator (default: `/actuator`). The output should list an entry for `hystrix.stream`:
```json
{
	"_links": {
		"self": {
			"href": "http://my.awesome.spring.boot.application.com/actuator",
			"templated": false
		},
		...
		"hystrix.stream": {
			"href": "http://my.awesome.spring.boot.application.com/actuator/hystrix.stream",
			"templated": false
		}
	}
}
```

---
### Building this module
The jar **can be build with Maven** with the maven-exec-plugin. To do this node.js and npm must be installed on your machine and be on your `$PATH`.
If you don't want to use the maven exec run the following commands:

### Running Spring Boot Admin Server for development
To develop the ui on an running server the best to do is

1. Running the ui build in watch mode so the resources get updated:
```shell
npm run watch
```
2. Run a Spring Boot Admin Server instances with the template-location and resource-location pointing to the build output and disable caching:
```
spring.boot.admin.ui.cache.no-cache: true
spring.boot.admin.ui.extension-resource-locations: file:@project.basedir@/../spring-boot-admin-hystrix-dashboard/target/dist/
spring.boot.admin.ui.cache-templates: false
```
Or just start the [spring-boot-admin-sample-servlet](../spring-boot-admin-sample-servlet) project using the `dev` profile.

### Build
```shell
npm install
npm run build
```

Repeated build with watching the files:
```shell
npm run watch
```
