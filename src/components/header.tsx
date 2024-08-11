import { LocalSwitcher } from './local-switcher'
import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header>
      <div className="logo-and-name"></div>
      <nav></nav>
      <ModeToggle />
      <LocalSwitcher />
    </header>
  )
}
