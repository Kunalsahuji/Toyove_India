import { motion } from 'framer-motion'
import { ProductCard } from '../ui/ProductCard'

const toy1 = 'https://toykio.myshopify.com/cdn/shop/files/product-08_bd7b541b-d749-4444-bdaa-d040b7d4ff0f.jpg?v=1716179376&width=533'
const toy1_hover = 'https://toykio.myshopify.com/cdn/shop/files/product-08-02_1ed2d2ac-88dd-401e-a474-8579b20407ff.jpg?v=1716179376&width=533'

const toy2 = 'https://toykio.myshopify.com/cdn/shop/files/product-07.jpg?v=1710995380&width=533'
const toy2_hover = 'https://toykio.myshopify.com/cdn/shop/files/product-07-02.jpg?v=1710995381&width=533'

const products = [
  { id: 1, name: 'TinyTinker Toys', price: 120, oldPrice: 286, badge: -52, img: toy1, hoverImg: toy1_hover },
  { id: 2, name: 'JoyfulJamboree Juniors', price: 89, oldPrice: 129, badge: -41, img: toy2, hoverImg: toy2_hover },
  { id: 3, name: 'Planet Toy Explorer', price: 126, oldPrice: 168, badge: -35, img: toy1, hoverImg: toy1_hover },
  { id: 4, name: 'WildHarvests Maker Toy', price: 150, oldPrice: 200, badge: -25, img: toy2, hoverImg: toy2_hover },
  { id: 5, name: 'Rainbow Stacker Set', price: 85, oldPrice: 110, badge: -22, img: toy1, hoverImg: toy1_hover },
  { id: 6, name: 'Creative Rainbow Stacker Toy', price: 45, oldPrice: 65, badge: -30, img: toy2, hoverImg: toy2_hover },
  { id: 7, name: 'Baby Activity Gym Play Mat', price: 130, oldPrice: 175, badge: -25, img: toy1, hoverImg: toy1_hover },
  { id: 8, name: 'Plush Rabbit Sleeping Soft Toy', price: 35, oldPrice: 50, badge: -30, img: toy2, hoverImg: toy2_hover },
]

export function TrendingProducts() {
  return (
    <section className="py-10 md:py-14 bg-brand-cream font-roboto">
      <div className="shell">
        <div className="text-center mb-10">
          <p className="text-brand-orange font-bold text-[11px] tracking-[0.25em] mb-2 font-roboto uppercase">Shop Collection</p>
          <h2 className="font-grandstander text-[28px] md:text-[40px] font-bold text-brand-ink tracking-tight">Trending Products</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 gap-y-10 md:gap-y-12">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
