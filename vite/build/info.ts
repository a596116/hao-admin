import type { Plugin } from 'vite'
import dayjs, { type Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import gradientString from 'gradient-string'
import boxen, { type Options as BoxenOptions } from 'boxen'
import { getPackageSize } from './utils'
dayjs.extend(duration)

const welcomeMessage = gradientString('cyan', 'magenta').multiline(
  `您好! 歡迎使用 hao-admin 後台管理系統\n以下是網站使用文檔\nhttps://docs.hao-admin.com`,
)

const boxenOptions: BoxenOptions = {
  padding: 0.5,
  borderColor: 'cyan',
  borderStyle: 'round',
}

export function viteBuildInfo(): Plugin {
  let config: { command: string }
  let startTime: Dayjs
  let endTime: Dayjs
  let outDir: string
  return {
    name: 'vite:buildInfo',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      outDir = resolvedConfig.build?.outDir ?? 'dist'
    },
    buildStart() {
      console.log(boxen(welcomeMessage, boxenOptions))
      if (config.command === 'build') {
        startTime = dayjs(new Date())
      }
    },
    closeBundle() {
      if (config.command === 'build') {
        endTime = dayjs(new Date())
        getPackageSize({
          folder: outDir,
          callback: (size: string) => {
            console.log(
              boxen(
                gradientString('cyan', 'magenta').multiline(
                  `🎉 打包完成（總用時${dayjs
                    .duration(endTime.diff(startTime))
                    .format('mm分ss秒')}，打包後的大小為${size}）`,
                ),
                boxenOptions,
              ),
            )
          },
        })
      }
    },
  }
}
