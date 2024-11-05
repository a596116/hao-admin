const modules = {}
const files = import.meta.glob('./**/*.vue', { eager: true })

for (const path in files) {
  const name = path.split('/').pop().replace('.vue', '')
  // modules[name] = files[path]().then((module: any) => module.default || module)

  // files[path]().then((module: any) => {
  //   modules[name] = module.default || module
  // })
  // @ts-ignore
  modules[name] = files[path].default || files[path]
}

export default modules
