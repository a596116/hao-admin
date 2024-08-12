interface Menu {
  title?: string
  hiddenMenu?: boolean
  hiddenHistory?: boolean
  icon?: string
  isClick?: boolean
  route?: string
  defaultPath?: string
}

export interface IMenu extends Menu {
  children?: Menu[]
}
