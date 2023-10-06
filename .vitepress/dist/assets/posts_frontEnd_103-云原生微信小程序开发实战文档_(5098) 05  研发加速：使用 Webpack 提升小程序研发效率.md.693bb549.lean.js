import{_ as l,j as o,o as e,g as c,k as n,Q as p,s,h as t}from"./chunks/framework.b3d8e22e.js";const T=JSON.parse('{"title":"管理第三方 npm 模块 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5098) 05  研发加速：使用 Webpack 提升小程序研发效率.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5098) 05  研发加速：使用 Webpack 提升小程序研发效率.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5098) 05  研发加速：使用 Webpack 提升小程序研发效率.md"},i=p("",9),E=s("p",null,"而且，小程序预构建 npm 模块的过程并不是简单地将原始模块从拷贝 node_modules 目录到miniprogram_npm 目录，而是会将原始模块的所有散列文件打包成一个单 js 文件，然后再将这个 js 文件作为模块入口暴露出去，整个预编译的流程如下：",-1),y=s("ol",null,[s("li",null,[s("p",null,"读取小程序项目的 package.json 文件（位于 miniprogram/package.json）中有哪些依赖（dependencies）。")]),s("li",null,[s("p",null,"在 node_modules 目录内依次寻找这些依赖的原始 npm 模块，读取模块的 package.json文件，搜寻 main 字段指定的入口 js 文件。")]),s("li",null,[s("p",null,"分析模块的入口 js 文件引用了哪些子文件。")]),s("li",null,[s("p",null,"将所有文件打包为一个单 js 文件（如下图）。")])],-1),d=p("",8),g=s("p",null,"其中 cloudfunctions 是云函数的根目录（相关的知识会在模块四讲解，在这里我就不多费口舌了）。miniprogram 中的文件是小程序本体的源码，包括小程序的业务代码和 npm 模块。",-1),_=s("p",null,[t("使用 Webpack 打造的构建体系通常会"),s("strong",null,"另外建立一个与 cloudfunctions 和 miniprogram 平行的目录用于管理源码，然后将 miniprogram 目录作为构建产出目录，如下：")],-1),u=s("p",null,"同时禁用微信 IDE 编译相关的功能，把这些工作全部交给 Webpack：",-1),h=p("",26),m=p("",16);function S(b,k,A,f,C,D){const a=o("Image");return e(),c("div",null,[i,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6D/91/Ciqc1F-uPmSAHDYTAABv_sOtC6E405.png"}),E,y,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/91/Ciqc1F-uPmyARZYuAAB84i1b-ro900.png"}),d,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9C/CgqCHl-uPn-AKQnbAAA5YigCdH0607.png"}),g,_,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6D/91/Ciqc1F-uPoaAWgOGAAAulRAEVKU221.png"}),u,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6D/91/Ciqc1F-uPoyADaa-AAA91X7XW4I841.png"}),h,n(a,{alt:"小程序 05--金句.png",src:"https://s0.lgstatic.com/i/image/M00/6E/4E/Ciqc1F-yL7KAJgnbAAE8MX8pSck595.png"}),m])}const q=l(r,[["render",S]]);export{T as __pageData,q as default};
