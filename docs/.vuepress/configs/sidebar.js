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
        { text: '介绍', link: '/api/index.md' },
        { text: 'JsonForm', link: '/api/jsonForm.md' },
        { text: 'QueryTable', link: '/api/queryTable.md' },
      ],
    },
  ]
}

// function getAPISidebar() {
//   return [{ text: 'API参考', link: '/api/index.md' }]
// }
