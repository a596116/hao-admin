interface Menu {
  title?: string
  hiddenMenu?: boolean
  hiddenHistory?: boolean
  icon?: string
  defaultPath?: string
}

export interface IMenu extends Menu {
  children?: Menu[]
}
