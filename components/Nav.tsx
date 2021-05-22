import NavAuth from './NavAuth'
import UiLink from './UiLink'

export default function Nav() {
    return <>
        <nav>
            <UiLink href={'/'}>
                <a className="link">Home</a>
            </UiLink>
            <UiLink href={'/tasks'}>
                <a className="link">Tasks</a>
            </UiLink>
            <UiLink href={'/tasks/new'}>
                <a className="link">New Task</a>
            </UiLink>
        </nav>
        <NavAuth />
        <style jsx>{`
          nav {
            font-size: .9rem;
          }

          .link {
            display: inline-block;
            color: var(--gray-11);
          }

          .link.selected {
            color: var(--red);
          }

          .link:not(:last-child) {
            margin-right: 1rem;
          }
        `}</style>
    </>
}
