import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';

function Navbar({ cartItems }) {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">ShopEase</Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className={styles.menuButton}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}></span>
                </button>

                {/* Navigation links - now wrapped in a nav element */}
                <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
                    <Link
                        to="/"
                        className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/shop"
                        className={`${styles.link} ${location.pathname === '/shop' ? styles.active : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Shop
                    </Link>
                </div>

                <div className={styles.cartContainer}>
                    <Link to="/cart" className={styles.cartLink}>
                        <span className={styles.cartIcon}>🛒</span>
                        <span className={styles.cartCount}>{cartItems}</span>
                        {window.innerWidth > 768 && <span className={styles.cartText}>Items</span>}
                        {cartItems > 0 && <span className={styles.cartPulse}></span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;