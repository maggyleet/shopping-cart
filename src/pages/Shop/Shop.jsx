import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Shop.module.css';

function Shop({ cartItems, setCartItems }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        setIsLoading(true);
        fetch('https://dummyjson.com/products?limit=100')
            .then(res => res.json())
            .then(data => {
                const processedProducts = data.products.map(product => ({
                    ...product,
                    category: mapCategory(product.category)
                }));
                setProducts(processedProducts);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            });
    }, []);

    const mapCategory = (category) => {
        const categoryMap = {
            'smartphones': 'electronics',
            'laptops': 'electronics',
            'fragrances': "women's clothing",
            'furniture': 'furniture',
            'womens-dresses': "women's clothing",
            'womens-shoes': "women's clothing",
            'beauty': "women's clothing",
            'womens-bags': "women's clothing",
            'womens-jewellery': "women's clothing",
            'mens-shirts': "men's clothing",
            'mens-shoes': "men's clothing",
            'mens-watches': "men's clothing",
            'womens-watches': "women's clothing",
            'groceries': 'groceries'
        };
        return categoryMap[category] || category;
    };

    const addToCart = (product, quantity) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(product => product.category === filter);

    return (
        <div className={styles.shop}>
            <div className={styles.shopHeader}>
                {/* <div className={styles.cartLink}>
                    <Link to="/cart">
                        <span className={styles.cartIcon}>🛒</span>
                        <span className={styles.cartCount}>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        <span className={styles.cartText}>Items</span>
                        {cartItems.length > 0 && <span className={styles.cartPulse}></span>}
                    </Link>
                </div> */}

                <h1 className={styles.shopTitle}>Our Products</h1>

                <div className={styles.filterControls}>
                    <button
                        className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'electronics' ? styles.active : ''}`}
                        onClick={() => setFilter('electronics')}
                    >
                        Electronics
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'furniture' ? styles.active : ''}`}
                        onClick={() => setFilter('furniture')}
                    >
                        Furniture
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === "men's clothing" ? styles.active : ''}`}
                        onClick={() => setFilter("men's clothing")}
                    >
                        Men's Fashion
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === "women's clothing" ? styles.active : ''}`}
                        onClick={() => setFilter("women's clothing")}
                    >
                        Women's Fashion
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'groceries' ? styles.active : ''}`}
                        onClick={() => setFilter('groceries')}
                    >
                        Groceries
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className={styles.loadingState}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Loading products...</p>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className={styles.noProducts}>
                    <p>No products found in this category.</p>
                </div>
            ) : (
                <div className={styles.productsGrid}>
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={{
                                ...product,
                                image: product.images?.[0] || product.thumbnail || '/fallback-image.jpg'
                            }}
                            addToCart={(quantity) => addToCart(product, quantity)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Shop;