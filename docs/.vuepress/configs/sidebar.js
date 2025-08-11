export default {
  // '/api/': getAPISidebar(),
  '/guide/': getGuideSidebar(),
}

function getGuideSidebar() {
  return [
    {
      isGroup: true,
      text: '指南',
      children: [
        { text: '介绍', link: '/guide/index.md' },
        { text: 'JsonForm', link: '/guide/jsonForm.md' },
        { text: 'QueryTable', link: '/guide/queryTable.md' },
      ],
    },
  ]
}

// function getAPISidebar() {
//   return [{ text: 'API参考', link: '/api/index.md' }]
// }
