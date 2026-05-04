import { useMemo, useState } from 'react'
import { Check, Eye, EyeOff, GripVertical, Plus, Search, Tags } from 'lucide-react'

const seedCategories = [
  'Musical Toys',
  'Learning & Educational Toys',
  'Soft Toys',
  'Indoor & Outdoor Play',
  'Play Gyms & Playmats',
  'Sports & Games',
  'Role & Pretend Play Toys',
  'Blocks & Construction Sets',
  'Stacking Toys',
  'Kids Puzzles',
  'Baby Rattles',
  'Toys Cars Trains & Vehicles',
  'Dolls & Dollhouses',
  'Push & Pull Along Toys',
  'Art Crafts & Hobby Kits',
  'Action Figures & Collectibles',
  'Radio & Remote Control Toys',
  'Bath Toys',
  'Toys Guns & Weapons',
].map((name, index) => ({
  id: `cat-${index + 1}`,
  name,
  slug: name.toLowerCase().replaceAll('&', 'and').replaceAll(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  children: [],
  showInNavbar: index < 6,
  status: 'Active',
}))

const groupedCategories = [
  {
    id: 'ride-ons-scooters',
    name: 'RIDE-ONS & SCOOTERS',
    showInNavbar: true,
    status: 'Active',
    children: ['Battery Operated Ride-ons', 'Manual Push Ride-ons', 'Swing cars/twisters', 'Scooters', 'Rocking Ride Ons', 'Tricycles', 'Bicycles', 'Balance Bike'],
  },
  {
    id: 'board-games-parent',
    name: 'BOARD GAMES',
    showInNavbar: false,
    status: 'Active',
    children: ['IQ Games', 'Ludo, Snakes & Ladders', 'Words, Pictures & Scrabble Games', 'Playing Cards', 'Life & Travel Board Games', 'Animal, Birds & Marine Life Games', 'Business/Monopoly'],
  },
  {
    id: 'home-play-activities',
    name: 'HOME PLAY ACTIVITIES',
    showInNavbar: false,
    status: 'Active',
    children: ['Play Dough, Sand & Moulds', 'Coloring, Sequencing & Engraving Art', 'Activity Kit', 'Building Construction Sets', 'Multi Model Making Sets', 'Kitchen Sets', 'Play Foods', "Kids' Doctor Sets", 'Piano & Keyboards', 'Drum Sets & Percussion'],
  },
].map(category => ({
  ...category,
  slug: category.name.toLowerCase().replaceAll('&', 'and').replaceAll(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
}))

export function AdminCategories() {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([...seedCategories, ...groupedCategories])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return categories
    return categories.filter(category => (
      category.name.toLowerCase().includes(term) ||
      category.children.some(child => child.toLowerCase().includes(term))
    ))
  }, [categories, search])

  const navbarCount = categories.filter(category => category.showInNavbar).length

  const toggleNavbar = (id) => {
    setCategories(prev => prev.map(category => {
      if (category.id !== id) return category
      if (!category.showInNavbar && navbarCount >= 7) return category
      return { ...category, showInNavbar: !category.showInNavbar }
    }))
  }

  return (
    <div className="shell space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Control storefront collections, mega menu, and all-categories navigation.</p>
        </div>
        <button className="h-11 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] shadow-lg hover:bg-[#5a4892] transition-all w-full md:w-max flex items-center justify-center gap-2">
          <Plus size={16} /> New Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          ['Total Categories', categories.length],
          ['Navbar Slots Used', `${navbarCount}/7`],
          ['Subcategories', categories.reduce((sum, category) => sum + category.children.length, 0)],
        ].map(([label, value]) => (
          <div key={label} className="bg-white rounded-[24px] p-5 border border-black/[0.03] shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-3xl font-grandstander font-bold text-[#6651A4] mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-black/[0.03]">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories or subcategories..."
            className="w-full h-12 pl-12 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#F1641E]/30 font-medium text-[13px] transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-black/[0.03] overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filtered.map((category) => (
            <div key={category.id} className="p-4 md:p-6 hover:bg-[#FDF4E6]/40 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <button className="mt-1 text-gray-300 hover:text-[#6651A4]"><GripVertical size={18} /></button>
                  <div className="w-11 h-11 rounded-2xl bg-[#FAEAD3] text-[#F1641E] flex items-center justify-center shrink-0"><Tags size={18} /></div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[14px] md:text-[16px] font-bold text-gray-800">{category.name}</h3>
                      <span className="px-2 py-1 rounded-full bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-widest">{category.status}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-mono mt-1">/{category.slug}</p>
                    {category.children.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {category.children.map(child => (
                          <span key={child} className="px-3 py-1 bg-[#FDF4E6] border border-dashed border-black/5 rounded-full text-[10px] font-bold text-gray-500">{child}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-3">
                  <button
                    onClick={() => toggleNavbar(category.id)}
                    className={`h-10 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${category.showInNavbar ? 'bg-[#6651A4] text-white' : 'bg-[#FDF4E6] text-gray-400 hover:text-[#6651A4]'}`}
                  >
                    {category.showInNavbar ? <Eye size={14} /> : <EyeOff size={14} />}
                    Navbar
                  </button>
                  <span className="hidden md:flex w-10 h-10 rounded-xl bg-green-50 text-green-600 items-center justify-center"><Check size={16} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
