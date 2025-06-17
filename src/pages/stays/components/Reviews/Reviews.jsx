import React, { useState, useEffect, useRef } from 'react';
import { Star, ThumbsUp, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Reviews.module.css';

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none"
        >
          <Star
            className={`w-6 h-6 ${
              star <= (hover || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewForm = ({ stayId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setError('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a review');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${STRAPI_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            rating,
            comment,
            reviewer_name: name,
            stay: stayId,
            date: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Clear form
      setRating(0);
      setComment('');
      setName('');
      
    
      onReviewAdded();
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Write a Review</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your experience..."
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#002D70] text-white py-2 px-4 rounded-lg hover:bg-[#003B95] transition-colors disabled:bg-blue-300"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

const ReviewList = ({ reviews }) => {
  const swiperRef = useRef(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.reviewsContainer}>
      <button 
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button 
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className={styles.reviewsSwiper}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className={styles.reviewCard}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#002D70] rounded-full flex items-center justify-center text-white font-semibold">
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{review.reviewer_name}</h4>
                  <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Quote className="text-[#002D70] w-8 h-8 mb-2 opacity-20" />
              
              <p className="text-gray-600 flex-grow">{review.comment}</p>
              
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mt-4 self-end">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">Helpful</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Reviews = ({ stayId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = async () => {
    try {
      console.log('Fetching reviews for stayId:', stayId); // Debug log

      // Check if stayId exists
      if (!stayId) {
        throw new Error('Stay ID is required');
      }

      const url = `${STRAPI_URL}/api/reviews?populate=*&filters[stay][id]=${stayId}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Reviews data:', data); // Debug log

      if (!data.data) {
        throw new Error('Invalid response format');
      }

      const formattedReviews = data.data.map(item => ({
        id: item.id,
        rating: item.attributes?.rating || 0,
        comment: item.attributes?.comment || '',
        reviewer_name: item.attributes?.reviewer_name || 'Anonymous',
        date: item.attributes?.date || new Date().toISOString(),
      }));

      setReviews(formattedReviews);
      setError('');
    } catch (err) {
      console.error('Error in fetchReviews:', err);
      setError(err.message || 'Failed to load reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Reviews component mounted with stayId:', stayId);
    fetchReviews();
  }, [stayId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#002D70]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">{error}</div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Guest Reviews</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#002D70] text-white px-4 py-2 rounded-lg hover:bg-[#003B95] transition-colors"
        >
          {showForm ? 'Hide Form' : 'Write a Review'}
        </button>
      </div>

      {reviews.length > 0 ? (
        <ReviewList reviews={reviews} />
      ) : (
        <p className="text-gray-500 text-center">No reviews yet. Be the first to review!</p>
      )}

      {showForm && (
        <div className="mt-8 max-w-2xl mx-auto">
          <ReviewForm stayId={stayId} onReviewAdded={() => {
            fetchReviews();
            setShowForm(false);
          }} />
        </div>
      )}
    </div>
  );
};

export default Reviews; 