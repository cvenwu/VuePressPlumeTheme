/*
 * @Author: cvenwu yirufeng@foxmail.com
 * @Date: 2024-10-11 11:04:01
 * @LastEditors: cvenwu yirufeng@foxmail.com
 * @LastEditTime: 2024-10-12 11:17:00
 * @Description: 
 * 
 * Copyright (c) 2024 by yirufeng@foxmail.com, All Rights Reserved. 
 */
import { defineThemeConfig } from 'vuepress-theme-plume'
import { enNavbar, zhNavbar } from './navbar'
import { enNotes, zhNotes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'https://theme-plume.vuejs.press/plume.png',
  // your git repo url
  docsRepo: '',
  docsDir: 'docs',

  appearance: true,

  social: [
    { icon: 'github', link: 'https://github.com/cvenwu' },
  ],

  locales: {
    '/': {
      profile: {
        avatar: '../../b641d2de2d085.png',
        // avatar: 'https://theme-plume.vuejs.press/plume.png',
        name: 'yirufeng website3333',
        description: 'yirufeng website3333',
        // circle: true,
        // location: '',
        // organization: '',
      },

      navbar: zhNavbar,
      notes: zhNotes,
    },
    '/en/': {
      profile: {
        avatar: 'https://theme-plume.vuejs.press/plume.png',
        name: 'yirufeng website',
        description: 'yirufeng website',
        // circle: true,
        // location: '',
        // organization: '',
      },

      navbar: enNavbar,
      notes: enNotes,
    },
  },
})
