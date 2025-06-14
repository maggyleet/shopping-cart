import { useState } from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ product, addToCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className={styles.productCard}>
            <div className={styles.imageContainer}>
                <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImage}
                    loading="lazy"
                />
            </div>

            <div className={styles.cardContent}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>

                <div className={styles.quantityControls}>
                    <button
                        onClick={handleDecrement}
                        className={styles.quantityBtn}
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => {
                            const value = Math.max(1, Number(e.target.value));
                            setQuantity(isNaN(value) ? 1 : value);
                        }}
                        className={styles.quantityInput}
                        aria-label="Product quantity"
                    />
                    <button
                        onClick={handleIncrement}
                        className={styles.quantityBtn}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>

                <button
                    className={styles.addToCartBtn}
                    onClick={() => addToCart(quantity)}
                    aria-label={`Add ${quantity} ${product.title} to cart`}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;