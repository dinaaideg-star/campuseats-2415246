import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return <p className="muted">You haven't placed any orders yet. <Link to="/">Browse vendors</Link></p>
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <h3>Order #{orders.length - orders.indexOf(order)}</h3>
            <p className="cart-name">Pickup {order.pickupTime} · Mahallah {order.mahallah}</p>
            <p className="muted">{order.lines.map((l) => `${l.qty}× ${l.item.name}`).join(', ')}</p>
            <p className="price">Total: RM {order.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage