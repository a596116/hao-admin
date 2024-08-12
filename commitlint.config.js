export default {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // @see: https://commitlint.js.org/#/reference-rules
  rules: {
    'subject-case': [0], // subject大小写不做校验

    // 类型枚举，git提交type必须是以下类型
    'type-enum': [
      // 当前验证的错误级别
      2,
      // 在什么情况下进行验证，always表示一直进行验证
      'always',
      [
        'feat', // 新增功能
        'fix', // 修复缺陷
        'docs', // 文档变更
        'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
        'refactor', // 代码重构（不包括 bug 修复、功能新增）
        'perf', // 性能优化
        'test', // 添加疏漏测试或已有测试改动
        'build', // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        'ci', // 修改 CI 配置、脚本
        'revert', // 回滚 commit
        'chore' // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
      ]
    ]
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
      //   generatingByAI: '正在通过 AI 生成你的提交简短描述...',
      //   generatedSelectByAI: '选择一个 AI 生成的简短描述:',
      confirmCommit: '請確認本次 Commit 描述。\n'
    },
    // prettier-ignore
    types: [
      { value: "feat",     name: "特性:     ✨  新增功能", emoji: ":sparkles:" },
      { value: "fix",      name: "修復:     🐛  修復功能", emoji: ":bug:" },
      { value: "docs",     name: "文檔:     📝  文檔變更", emoji: ":memo:" },
      { value: "style",    name: "格式:     💄  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: ":lipstick:" },
      { value: "refactor", name: "重构:     ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: ":recycle:" },
      { value: "perf",     name: "性能:     ⚡️  性能优化", emoji: ":zap:" },
      { value: "test",     name: "测试:     ✅  添加疏漏测试或已有测试改动", emoji: ":white_check_mark:"},
      { value: "build",    name: "构建:     📦️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）", emoji: ":package:"},
      { value: "ci",       name: "集成:     🎡  修改 CI 配置、脚本",  emoji: ":ferris_wheel:"},
      { value: "revert",   name: "回退:     ⏪️  回滚 commit",emoji: ":rewind:"},
      { value: "chore",    name: "其他:     🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: ":hammer:"},
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
    defaultSubject: ''
  }
}
