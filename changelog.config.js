module.exports = {
  disableEmoji: false, // 是否禁用 emoji
  format: '{type}{scope}: {emoji}{subject}', // Commit 訊息的格式
  list: ['feat', 'fix', 'release'], // Commit 類型的清單
  maxMessageLength: 64, // Commit 訊息的最大長度
  minMessageLength: 3, // Commit 訊息的最小長度
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'], // 問題的清單
  scopes: [], // Commit 範圍的清單
  types: {
    // Commit 類型的清單
    feat: {
      description: '新增/修改功能 (Feature)',
      emoji: '💻',
      value: 'feat'
    },
    fix: {
      description: '修正 Bug (bug fix)',
      emoji: '🐛',
      value: 'fix'
    },
    release: {
      description: '新增正式釋出的 release commit 訊息',
      emoji: '🏹',
      value: 'release'
    }
  },
  messages: {
    // Commit 的提示訊息描述
    type: '請選擇您要 Commit 的類型(必選)：',
    customScope: '選擇此次 Commit 影響的範圍(可選，若無，請按 Enter 略過):',
    subject: '簡短描述 Commit 的修正範圍(必填)：\n',
    body: '更詳細的 Commit 說明(可選，若無，請按 Enter 略過):\n ',
    breaking: '列出所有重大更改(可選，若無，請按 Enter 略過):\n',
    footer: '此次 Commit 會關閉的 Issues, e.g #123(可選，若無，請按 Enter 略過):',
    confirmCommit: '請確認本次 Commit 描述。\n'
  }
}
