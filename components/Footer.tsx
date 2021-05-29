function Footer() {
    return (
        <footer className="footer">
            <div className="copyright">Laveha &copy; {new Date().getFullYear()}</div>
            <style jsx>{`
                .copyright {
                    font-size: 11px;
                    color: #737373;
                    cursor: default;
                }
                .footer {
                    padding: 10px 20px;
                    grid-area: footer;
                    width: 100%;
                    border-top: 1px solid var(--gray-4);
                }
            `}</style>
        </footer>
    )
}

export default Footer
