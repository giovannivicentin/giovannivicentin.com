import LocalSwitcher from './local-switcher'

export function Header() {
  return (
    <header>
      <div className="logo-and-name"></div>
      <nav></nav>
      <LocalSwitcher />
    </header>
  )
}
