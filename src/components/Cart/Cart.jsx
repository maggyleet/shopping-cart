import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

function Cart({ cartItems, updateCart, removeFromCart, setCartItems }) {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        setPaymentSuccess(true);
        setCartItems([]); // Clear cart in both components
        setIsProcessing(false);
    };

    if (paymentSuccess) {
        return (
            <div className={styles.paymentSuccess}>
                <div className={styles.successIcon}>✓</div>
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase!</p>
                <p>Your order confirmation #{(Math.random() * 1000000).toFixed(0)}</p>
                <Link to="/shop" className={styles.continueShopping}>
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.cart}>
            <h2>Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty. <Link to="/shop">Continue shopping</Link></p>
            ) : (
                <>
                    <div className={styles.items}>
                        {cartItems.map((item) => (
                            <div key={item.id} className={styles.cartItem}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={item.image || item.thumbnail || '/fallback-image.jpg'}
                                        alt={item.title}
                                        onError={(e) => {
                                            e.target.src = '/fallback-image.jpg';
                                            e.target.style.objectFit = 'contain';
                                        }}
                                        loading="lazy"
                                    />
                                    <div className={styles.quantityControls}>
                                        <button
                                            onClick={() => updateCart(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateCart(item.id, item.quantity + 1)}
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.itemDetails}>
                                    <h3>{item.title}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label={`Remove ${item.title}`}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                        <button
                            className={styles.checkoutButton}
                            onClick={handleCheckout}
                            disabled={isProcessing || cartItems.length === 0}
                        >
                            {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;