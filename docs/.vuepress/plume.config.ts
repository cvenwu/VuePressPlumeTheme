/*
 * @Author: cvenwu yirufeng@foxmail.com
 * @Date: 2024-10-11 11:04:01
 * @LastEditors: cvenwu yirufeng@foxmail.com
 * @LastEditTime: 2024-10-15 15:12:56
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
  logo: 'https://cdn.jsdelivr.net/gh/cvenwu/UpicImageHosting@dev/uPic/2024-10-14/111359-94a89f6e70a07-removebg-preview.png',
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
        avatar: 'https://gcore.jsdelivr.net/gh/sivanWu0222/ImageHosting@master/uPic/IMG_1966.JPG',
        // avatar: 'https://theme-plume.vuejs.press/plume.png',
        name: 'yirufeng',
        description: 'No Pains, No Gains',
        circle: true,
        location: 'Shenzhen, China',
        organization: 'Tencent',
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
