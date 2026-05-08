import { useEffect, useState } from 'react'
import { ProductCard } from '../ui/ProductCard'
import { getTrendingProducts } from '../../services/catalogApi'

export function TrendingProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        const response = await getTrendingProducts()
        if (isMounted) {
          setProducts(response)
        }
      } catch {
        if (isMounted) {
          setProducts([])
        }
      }
    }

    loadProducts()
    return () => {
      isMounted = false
    }
  }, [])

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
