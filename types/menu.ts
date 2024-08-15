interface Menu {
  title?: string
  hiddenMenu?: boolean
  hiddenHistory?: boolean
  icon?: string
  defaultPath?: string
  route?: string
}

export interface IMenu extends Menu {
  children?: Menu[]
}
