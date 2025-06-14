import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.home}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Welcome to Our <span>Store</span></h1>
                    <p className={styles.subtitle}>Discover amazing products at unbeatable prices</p>
                    <div className={styles.ctaContainer}>
                        <a href="/shop" className={styles.ctaPrimary}>Shop Now</a>
                    </div>
                </div>
            </section>

            <section id="features" className={styles.infoSection}>
                <div className={styles.infoBox}>
                    <div className={styles.icon}>🔥</div>
                    <h3>Top Deals</h3>
                    <p>Grab the best offers before they're gone. Updated daily!</p>
                </div>
                <div className={styles.infoBox}>
                    <div className={styles.icon}>🚚</div>
                    <h3>Free Delivery</h3>
                    <p>On all orders over ₹499. Fast & reliable shipping.</p>
                </div>
                <div className={styles.infoBox}>
                    <div className={styles.icon}>🔒</div>
                    <h3>Secure Checkout</h3>
                    <p>100% safe payments with industry-grade encryption.</p>
                </div>
            </section>
        </div>
    );
}

export default Home;