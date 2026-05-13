import { useState, useEffect } from 'react'
import { Star, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { getProductReviews, submitReview } from '../../services/reviewApi'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'

export function ReviewSection({ productId, productName }) {
  const { user } = useAuth()
  const { success, error: showError } = useToast()
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    loadReviews()
  }, [productId])

  const loadReviews = async () => {
    try {
      setIsLoading(true)
      const data = await getProductReviews(productId)
      setReviews(data)
    } catch (err) {
      console.error('Failed to load reviews:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      showError('Please login to submit a review')
      return
    }
    if (!comment.trim()) {
      showError('Comment cannot be empty')
      return
    }

    try {
      setIsSubmitting(true)
      await submitReview({
        product: productId,
        rating,
        comment
      })
      success('Review submitted for approval!')
      setComment('')
      setRating(5)
      // We don't refresh reviews here because the new one is 'pending'
    } catch (err) {
      showError(err.message || 'Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0

  return (
    <div className="space-y-10">
      {/* Summary Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center bg-[#F9EAD3]/50 p-8 rounded-[24px] border border-dashed border-black/10">
        <div className="text-center md:text-left">
          <h3 className="text-5xl font-black text-[#333] mb-2">{averageRating}</h3>
          <div className="flex gap-1 justify-center md:justify-start mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star 
                key={s} 
                size={20} 
                className={s <= Math.round(averageRating) ? 'fill-[#E84949] text-[#E84949]' : 'text-gray-300'} 
              />
            ))}
          </div>
          <p className="text-[13px] font-bold text-[#666] uppercase tracking-widest">Based on {reviews.length} reviews</p>
        </div>

        <div className="flex-grow w-full space-y-2">
          {[5, 4, 3, 2, 1].map((s) => {
            const count = reviews.filter(r => Math.round(r.rating) === s).length
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
            return (
              <div key={s} className="flex items-center gap-4">
                <span className="text-[12px] font-bold text-[#333] w-4">{s}</span>
                <div className="flex-grow h-2 bg-black/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#E84949] rounded-full" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-[12px] text-gray-400 w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Review List */}
        <div className="lg:col-span-7 space-y-8">
          <h4 className="text-[20px] font-black text-[#333] uppercase tracking-tight flex items-center gap-3">
            Customer Reviews
            <span className="h-6 px-2 bg-black/5 rounded-md text-[11px] flex items-center">{reviews.length}</span>
          </h4>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse space-y-3">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-black/5" />
                    <div className="space-y-2 flex-grow">
                      <div className="h-4 bg-black/5 rounded w-1/4" />
                      <div className="h-3 bg-black/5 rounded w-1/6" />
                    </div>
                  </div>
                  <div className="h-16 bg-black/5 rounded w-full" />
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center bg-black/5 rounded-[24px] border border-dashed border-black/10">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-[#666] font-medium">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review._id} className="pb-8 border-b border-dashed border-gray-300 last:border-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-full bg-[#E84949]/10 flex items-center justify-center font-black text-[#E84949] uppercase">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-bold text-[#333] text-[15px]">{review.userName}</h5>
                        <div className="flex items-center gap-2">
                           <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} size={12} className={s <= review.rating ? 'fill-[#E84949] text-[#E84949]' : 'text-gray-300'} />
                            ))}
                          </div>
                          <span className="text-[11px] text-gray-400 font-medium">• {new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {review.role === 'Verified Buyer' && (
                      <span className="flex items-center gap-1 text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-full">
                        <CheckCircle size={10} /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[#444] leading-relaxed italic text-[15px]">"{review.comment}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Review Form */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-black/[0.03] sticky top-24">
            <h4 className="text-[20px] font-black text-[#333] uppercase tracking-tight mb-6">Write a Review</h4>
            
            {user ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[12px] font-black text-[#666] uppercase tracking-widest">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(s)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          size={32} 
                          className={(hoverRating || rating) >= s ? 'fill-[#E84949] text-[#E84949]' : 'text-gray-200'} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[12px] font-black text-[#666] uppercase tracking-widest">Review Message</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you think..."
                    rows={4}
                    className="w-full bg-[#FDF4E6] border-none rounded-2xl p-4 text-[14px] focus:ring-2 focus:ring-[#E84949] transition-all resize-none font-roboto"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-[#333] text-white rounded-2xl font-black text-[12px] tracking-[0.2em] uppercase hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} /> Submit Review
                    </>
                  )}
                </button>
                <p className="text-[10px] text-gray-400 text-center font-medium">Your review will be public after admin approval.</p>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#666] mb-6 font-medium">Please log in to share your experience with {productName}</p>
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="h-12 px-8 bg-[#E84949] text-white rounded-xl font-black text-[11px] tracking-widest uppercase shadow-md hover:scale-105 transition-all"
                >
                  Log In Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
