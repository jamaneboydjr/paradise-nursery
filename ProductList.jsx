import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { addToCart } from "../redux/CartSlice";

const PLANTS = [
  // ===== Indoor (6) =====
  { id: "in1", category: "Indoor", name: "Snake Plant", price: 18.99, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=60" },
  { id: "in2", category: "Indoor", name: "Peace Lily", price: 22.5, image: "https://images.unsplash.com/photo-1616690710400-a16d3b7411a6?auto=format&fit=crop&w=900&q=60" },
  { id: "in3", category: "Indoor", name: "Pothos", price: 12.75, image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&q=60" },
  { id: "in4", category: "Indoor", name: "ZZ Plant", price: 19.95, image: "https://images.unsplash.com/photo-1593691509543-c55fb32ea57f?auto=format&fit=crop&w=900&q=60" },
  { id: "in5", category: "Indoor", name: "Philodendron", price: 16.4, image: "https://images.unsplash.com/photo-1615474634824-f45fb4a0d8b3?auto=format&fit=crop&w=900&q=60" },
  { id: "in6", category: "Indoor", name: "Spider Plant", price: 11.99, image: "https://images.unsplash.com/photo-1598887142486-5b3b7d7b7f0b?auto=format&fit=crop&w=900&q=60" },

  // ===== Succulents (6) =====
  { id: "su1", category: "Succulents", name: "Aloe Vera", price: 14.25, image: "https://images.unsplash.com/photo-1520301255226-bf5f1444518a?auto=format&fit=crop&w=900&q=60" },
  { id: "su2", category: "Succulents", name: "Jade Plant", price: 13.5, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=60" },
  { id: "su3", category: "Succulents", name: "Echeveria", price: 9.99, image: "https://images.unsplash.com/photo-1498842812179-c81beecf902c?auto=format&fit=crop&w=900&q=60" },
  { id: "su4", category: "Succulents", name: "Haworthia", price: 10.5, image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=900&q=60" },
  { id: "su5", category: "Succulents", name: "String of Pearls", price: 17.0, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=60" },
  { id: "su6", category: "Succulents", name: "Burro's Tail", price: 15.25, image: "https://images.unsplash.com/photo-1523413451133-7c3a4d7d2b6d?auto=format&fit=crop&w=900&q=60" },

  // ===== Tropical (6) =====
  { id: "tr1", category: "Tropical", name: "Monstera", price: 28.99, image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=900&q=60" },
  { id: "tr2", category: "Tropical", name: "Bird of Paradise", price: 34.5, image: "https://images.unsplash.com/photo-1558350315-8aa00e8e4590?auto=format&fit=crop&w=900&q=60" },
  { id: "tr3", category: "Tropical", name: "Fiddle Leaf Fig", price: 32.0, image: "https://images.unsplash.com/photo-1524593656068-fbac72624b9b?auto=format&fit=crop&w=900&q=60" },
  { id: "tr4", category: "Tropical", name: "Rubber Plant", price: 24.75, image: "https://images.unsplash.com/photo-1615485925594-2a3f8b80b9d0?auto=format&fit=crop&w=900&q=60" },
  { id: "tr5", category: "Tropical", name: "Calathea", price: 20.99, image: "https://images.unsplash.com/photo-1598887142486-5b3b7d7b7f0b?auto=format&fit=crop&w=900&q=60" },
  { id: "tr6", category: "Tropical", name: "Anthurium", price: 18.5, image: "https://images.unsplash.com/photo-1616690710400-a16d3b7411a6?auto=format&fit=crop&w=900&q=60" },
];

const CATEGORIES = ["Indoor", "Succulents", "Tropical"];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (id) => Boolean(cartItems[id]);

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Plants</h1>
        <p className="muted">
          Browse categories and add your favorites to the cart.
        </p>

        {CATEGORIES.map((cat) => {
          const list = PLANTS.filter((p) => p.category === cat);
          return (
            <section key={cat} style={{ marginTop: 22 }}>
              <h2 style={{ marginBottom: 10 }}>
                {cat} <span className="badge">{list.length} plants</span>
              </h2>

              <div className="grid">
                {list.map((p) => (
                  <div className="card" key={p.id}>
                    <img src={p.image} alt={p.name} />
                    <div className="card-body">
                      <h3 style={{ margin: "0 0 6px 0" }}>{p.name}</h3>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong>${p.price.toFixed(2)}</strong>
                        <button
                          className="small-btn"
                          disabled={isInCart(p.id)}
                          onClick={() => dispatch(addToCart(p))}
                          title={isInCart(p.id) ? "Already in cart" : "Add to cart"}
                          style={{
                            opacity: isInCart(p.id) ? 0.6 : 1,
                            cursor: isInCart(p.id) ? "not-allowed" : "pointer",
                          }}
                        >
                          {isInCart(p.id) ? "Added" : "Add to Cart"}
                        </button>
                      </div>
                      <p className="muted" style={{ marginTop: 10 }}>
                        A healthy, home-friendly plant that fits your space and routine.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
