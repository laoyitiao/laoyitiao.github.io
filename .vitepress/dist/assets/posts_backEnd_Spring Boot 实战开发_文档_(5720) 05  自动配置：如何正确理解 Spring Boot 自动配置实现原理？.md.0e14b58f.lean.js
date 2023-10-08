import{_ as p,j as e,o as t,g as r,k as o,h as n,Q as l,s}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"05自动配置：如何正确理解SpringBoot自动配置实现原理？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Boot 实战开发_文档/(5720) 05  自动配置：如何正确理解 Spring Boot 自动配置实现原理？.md","filePath":"posts/backEnd/Spring Boot 实战开发_文档/(5720) 05  自动配置：如何正确理解 Spring Boot 自动配置实现原理？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Spring Boot 实战开发_文档/(5720) 05  自动配置：如何正确理解 Spring Boot 自动配置实现原理？.md"},E=l("",34),i=s("p",null,"AutoConfigurationImportSelector 类层结构图",-1),y=s("p",null,"显然，AutoConfigurationImportSelector 所依赖的最关键组件就是 SpringFactoriesLoader，下面我们对其进行具体展开。",-1),g=s("h3",{id:"spi-机制和-springfactoriesloader",tabindex:"-1"},[n("SPI 机制和 SpringFactoriesLoader "),s("a",{class:"header-anchor",href:"#spi-机制和-springfactoriesloader","aria-label":'Permalink to "SPI 机制和 SpringFactoriesLoader"'},"​")],-1),u=s("p",null,"要想理解 SpringFactoriesLoader 类，我们首先需要了解 JDK 中 SPI（Service Provider Interface，服务提供者接口）机制。",-1),d=s("h4",{id:"jdk-中的-spi-机制",tabindex:"-1"},[n("JDK 中的 SPI 机制 "),s("a",{class:"header-anchor",href:"#jdk-中的-spi-机制","aria-label":'Permalink to "JDK 中的 SPI 机制"'},"​")],-1),C=s("p",null,"JDK 提供了用于服务查找的一个工具类 java.util.ServiceLoader 来实现 SPI 机制。当服务提供者提供了服务接口的一种实现之后，我们可以在 jar 包的 META-INF/services/ 目录下创建一个以服务接口命名的文件，该文件里配置着一组 Key-Value，用于指定服务接口与实现该服务接口具体实现类的映射关系。而当外部程序装配这个 jar 包时，就能通过该 jar 包 META-INF/services/ 目录中的配置文件找到具体的实现类名，并装载实例化，从而完成模块的注入。SPI 提供了一种约定，基于该约定就能很好地找到服务接口的实现类，而不需要在代码里硬编码指定。JDK 中 SPI 机制开发流程如下图所示：",-1),F=l("",35);function A(f,m,D,S,h,B){const a=e("Image");return t(),r("div",null,[E,o(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/73/9F/Ciqc1F_GIU2AGFv2AACsHHV_6h0534.png"}),n(),i,y,g,u,d,C,o(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image/M00/73/AA/CgqCHl_GIVmABagiAAEbqB5E-U0604.png"}),n(),F])}const k=p(c,[["render",A]]);export{v as __pageData,k as default};
