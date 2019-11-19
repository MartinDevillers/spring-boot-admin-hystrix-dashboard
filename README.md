# Hystrix Dashboard for Spring Boot Admin 2.x

[![Maven Central](https://img.shields.io/maven-central/v/nl.devillers/spring-boot-admin-hystrix-dashboard.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22nl.devillers%22%20AND%20a:%22spring-boot-admin-hystrix-dashboard%22)
[![Build Status](https://travis-ci.com/MartinDevillers/spring-boot-admin-hystrix-dashboard.svg?branch=master)](https://travis-ci.com/MartinDevillers/spring-boot-admin-hystrix-dashboard)

This module adds [Hystrix Dashboard](https://github.com/Netflix-Skunkworks/hystrix-dashboard/) to 
[Spring Boot Admin 2.x](https://github.com/codecentric/spring-boot-admin). It is implemented as a 
[Custom View Module](https://codecentric.github.io/spring-boot-admin/current/#customizing-custom-views) using the 
[spring-boot-admin-sample-custom-ui](https://github.com/codecentric/spring-boot-admin/tree/master/spring-boot-admin-samples/spring-boot-admin-sample-custom-ui/) 
project as a template. 

![Screenshot dashboard](./images/sba-hystrix.png)

> Disclaimer: I quickly hacked this together in my spare time to get my client's Hystrix Dashboard back up-and-running after upgrading a dozen applications from Spring Boot 1 to 2. As of 19 november 2018, Hystrix has entered 
[maintenance mode](https://github.com/Netflix/Hystrix/pull/1904). If you're doing a greenfield project I suggest you look into a more modern fault tolerance library like [resilience4j](https://github.com/resilience4j/resilience4j) 
and using [Grafana](https://resilience4j.readme.io/docs/grafana-1) to generate a dashboard. For those without this luxury, I hope this module will suffice. 

---
### Using this module

#### Prerequisites
Before using this module, ensure that both the server and all clients use the correct dependencies:
* Server: [Spring Boot Admin 2.x](https://github.com/codecentric/spring-boot-admin) (tested with 2.1.5)
* Client: [Spring Boot Actuator 2.x](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html) (tested with 2.0.0, 2.1.10 and 2.2.0)
* Client: [Spring Cloud Starter Netflix Hystrix 2.x](https://cloud.spring.io/spring-cloud-netflix/reference/html/#how-to-include-hystrix) (tested with 2.0.4 from Finchley.SR4, 2.1.3 from Greenwich.SR3 and 2.2.0 from Hoxton.RC2)

#### Installation
To use this module, simply add the following Maven dependency to your Spring Boot Admin application's `pom.xml`, rebuild, deploy and enjoy!
```xml
<dependency>
    <groupId>nl.devillers</groupId>
    <artifactId>spring-boot-admin-hystrix-dashboard</artifactId>
    <version>1.0.1</version>
</dependency>
```

#### Troubleshooting
If the Hystrix option does not appear in the instances view, then first make sure that Spring Boot Admin has loaded this module correctly by checking the logs
during startup. The logs should show two entries like the following:
```
2019-11-15 13:31:30.627  INFO 17624 --- [           main] b.a.s.u.c.AdminServerUiAutoConfiguration : Loaded Spring Boot Admin UI Extension: UiExtension(resourcePath=hystrix-dashboard/css/custom.6134ab29.css, resourceLocation=classpath:/META-INF/spring-boot-admin-server-ui/extensions/hystrix-dashboard/css/custom.6134ab29.css)
2019-11-15 13:31:30.628  INFO 17624 --- [           main] b.a.s.u.c.AdminServerUiAutoConfiguration : Loaded Spring Boot Admin UI Extension: UiExtension(resourcePath=hystrix-dashboard/js/custom.6b4c7d50.js, resourceLocation=classpath:/META-INF/spring-boot-admin-server-ui/extensions/hystrix-dashboard/js/custom.6b4c7d50.js)
```

Second, check that the Hystrix Stream endpoint in the Spring Boot application is properly exposed to Spring Boot Actuator by querying the discovery endpoint. This endpoint is 
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
If this is not the case, make sure that:
* The `management.endpoints.web.exposure.include` property includes the `hystrix.stream` endpoint (or `*` for all endpoints)
* The application is annotated with the `org.springframework.cloud.netflix.hystrix.EnableHystrix` annotation from the `spring-cloud-starter-netflix-hystrix` package

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
