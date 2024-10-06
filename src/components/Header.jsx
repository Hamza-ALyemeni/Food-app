export default function Header() {
    return (
    <div id="main-header">
        <div id="title">
            <img src="logo.jpg" alt="" />
            <h1>REACTFOOD</h1>
        </div>
        <div className="cart-item-actions">
            <button>Cart(0)</button>
        </div>
    </div>
    )
}