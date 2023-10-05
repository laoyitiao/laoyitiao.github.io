import { defineConfig } from 'vitepress'

import dataLoader from '../posts/posts.data.js'

import markdownItTitle from 'markdown-it-title'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
markdownItTitle.defaults = {
  level: 0,
  excerpt: 0
}
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Docs",
  description: "A VitePress Site",
  ignoreDeadLinks: true,
  lang: 'zh-CN',
  markdown: {
    attrs: {
      disable: true
    },
    defaultHighlightLang: 'html',
    config: (md) => {
      md.use(markdownItTitle);
    }
  },
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    ssr: { noExternal: ['element-plus'] }
  },
  themeConfig: {
    logo: '/logo/sloth64.png',
    outline: 'deep',
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '阅读推荐', link: '/posts/recommend' }
    ],
    sidebar: {
      ...dataLoader.load().sirderBar
    },
    search: {
      // provider: 'local',
      // options: {
      //   miniSearch: {
      //     options: {
      //       fields: ['title'],
      //     },
      //     searchOptions: {
      //       boost: { title: 2 },
      //       fuzzy: 0.2
      //     }
      //   }
      // }
      provider: 'algolia',
      options: {
        appId: 'FXWJW2H1XK',
        apiKey: '7ed21ca5ac0fcda5a3dad33d19c7bec3',
        indexName: 'docs_index',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      }
    }
  },
})