export default {
  // 繼承的規則
  extends: ['@commitlint/config-conventional'],
  // @see: https://commitlint.js.org/#/reference-rules
  rules: {
    'subject-case': [0], // subject大小寫不做校驗

    // 類型枚舉，git提交type必須是以下類型
    'type-enum': [
      // 當前驗證的錯誤級別
      2,
      // 在什麼情況下進行驗證，always表示一直進行驗證
      'always',
      [
        'feat', // 新增功能
        'fix', // 修復缺陷
        'docs', // 文檔變更
        'style', // 代碼格式（不影響功能，例如空格、分號等格式修正）
        'refactor', // 代碼重構（不包括 bug 修復、功能新增）
        'perf', // 性能優化
        'test', // 添加疏漏測試或已有測試改動
        'build', // 構建流程、外部依賴變更（如升級 npm 包、修改 webpack 配置等）
        'ci', // 修改 CI 配置、腳本
        'revert', // 回滾 commit
        'chore', // 對構建過程或輔助工具和庫的更改（不影響源文件、測試用例）
        'types', // 類型定義文件更改
      ],
    ],
  },
  prompt: {
    messages: {
      type: '請選擇您要 Commit 的類型(必選)：',
      scope: '选择一个提交范围：',
      customScope: '選擇此次 Commit 影響的範圍(可選，若無，請按 Enter 略過)：',
      subject: '簡短描述 Commit 的修正範圍(必填)：\n',
      body: '更詳細的 Commit 說明(可選，若無，請按 Enter 略過)：\n ',
      breaking: '列出所有重大更改(可選，若無，請按 Enter 略過)：\n',
      footerPrefixesSelect: '選擇關聯issue前缀(可選，若無，請按 Enter 略過)：\n',
      customFooterPrefix: '輸入自定義issue前缀：',
      footer: '列舉關聯issue (可選，若無，請按 Enter 略過) 例如: #31, #I3244：\n',
      //   generatingByAI: '正在通過 AI 生成你的提交簡短描述...',
      //   generatedSelectByAI: '選擇一個 AI 生成的簡短描述:',
      confirmCommit: '請確認本次 Commit 描述。\n',
    },
    // prettier-ignore
    types: [
      { value: "feat",     name: "特性feat:     ✨  新增功能", emoji: "✨" },
      { value: "fix",      name: "修復fix:     🐛  修復功能", emoji: "🐛" },
      { value: "docs",     name: "文檔docs:     📝  文檔變更", emoji: "📝" },
      { value: "style",    name: "格式style:     💄  代碼格式（不影響功能，例如空格、分號等格式修正）", emoji: "💄" },
      { value: "refactor", name: "重構refactor:     ♻️  代碼重構（不包括 bug 修復、功能新增）", emoji: "♻️" },
      { value: "perf",     name: "性能perf:     ⚡️  性能優化", emoji: "⚡️" },
      { value: "test",     name: "測試test:     ✅  添加疏漏測試或已有測試改動", emoji: "✅"},
      { value: "build",    name: "構建build:     📦️  構建流程、外部依賴變更（如升級 npm 包、修改 vite 配置等）", emoji: "📦️"},
      { value: "ci",       name: "集成ci:     🎡  修改 CI 配置、脚本",  emoji: "🎡"},
      { value: "revert",   name: "回退revert:     ⏪️  回滚 commit",emoji: "⏪️"},
      { value: "chore",    name: "其他chore:     🔨  對構建過程或輔助工具和庫的更改（不影響源文件、測試用例）", emoji: "🔨"},
      { value: "types",    name: "類型types:     🏷️  類型定義文件更改", emoji: "🏷️"},
    ],
    useEmoji: true,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
}
