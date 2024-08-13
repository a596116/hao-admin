import dayjs from 'dayjs'
import { readdir, stat } from 'node:fs'
import { sum, formatBytes } from '@pureadmin/utils'
import { name, version, dependencies, devDependencies } from '../../package.json'

/** 平台的名称、版本、运行所需的`node`和`pnpm`版本、依赖、最后构建时间的类型提示 */
const __APP_INFO__ = {
  pkg: { name, version, dependencies, devDependencies },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
}

const fileListTotal: number[] = []
/** 獲取指定文件夾中所有文件的總大小 */
const getPackageSize = (options: any) => {
  const { folder = 'dist', callback, format = true } = options
  readdir(folder, (err, files: string[]) => {
    if (err) throw err
    let count = 0
    const checkEnd = () => {
      ++count == files.length &&
        callback(format ? formatBytes(sum(fileListTotal)) : sum(fileListTotal))
    }
    files.forEach((item: string) => {
      stat(`${folder}/${item}`, async (err, stats) => {
        if (err) throw err
        if (stats.isFile()) {
          fileListTotal.push(stats.size)
          checkEnd()
        } else if (stats.isDirectory()) {
          getPackageSize({
            folder: `${folder}/${item}/`,
            callback: checkEnd,
          })
        }
      })
    })
    files.length === 0 && callback(0)
  })
}

export { __APP_INFO__, getPackageSize }
