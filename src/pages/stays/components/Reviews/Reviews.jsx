import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const API_URL =
  import.meta.env.MODE === "production"
    ? "https://admin.didihat.com/api/reviews"
    : "http://localhost:1350/api/reviews";

    // const API_URL = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;

export default function Reviews({ stayId }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // Custom navigation refs
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (stayId) {
      fetchReviews();
    }
  }, [stayId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `${API_URL}?filters[stay][id][$eq]=${stayId}&populate=*&sort[0]=createdAt:desc`
      );
      setReviews(res.data.data || []);
    } catch (error) {
      // Error fetching reviews
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !rating || !comment || rating < 1) {
      alert("Please fill in all fields and select a rating.");
      return;
    }

    if (!stayId) {
      alert("Stay ID not provided.");
      return;
    }

    try {
      await axios.post(API_URL, {
        data: {
          Name: name,
          Rating: rating,
          Comment: comment,
          stay: stayId 
        }
      });

      setName("");
      setRating(0);
      setHoverRating(0);
      setComment("");

      fetchReviews();
    } catch (error) {
      alert("Failed to submit review. Please try again.");
    }
  };

  const renderStars = (count = 0) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarSolid
        key={index}
        className={`h-5 w-5 ${
          index < (count || 0) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>

      {/*  Review Sction */}
      <div className="max-w-xl mx-auto mb-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 border"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Leave a Review</h3>
          <div className="flex gap-4 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  {star <= (hoverRating || rating) ? (
                    <StarSolid className="h-6 w-6 text-yellow-400" />
                  ) : (
                    <StarOutline className="h-6 w-6 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Write your review..."
            value={comment}
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews Carousel  */}
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="relative">
          {/*  Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-blue-100 transition border border-gray-200"
            aria-label="Previous"
            style={{ left: '-2rem' }}
          >
            <ChevronLeftIcon className="h-6 w-6 text-blue-600" />
          </button>
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-blue-100 transition border border-gray-200"
            aria-label="Next"
            style={{ right: '-2rem' }}
          >
            <ChevronRightIcon className="h-6 w-6 text-blue-600" />
          </button>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-8"
          >
            {reviews.map((review) => {
              const name = review.Name || "Anonymous";
              const rating = review.Rating || 0;
              const comment = review.Comment || "No comment provided.";
              const date = review.createdAt ? new Date(review.createdAt) : null;
              const formattedDate = date ? date.toLocaleDateString() : '';
              const stayName = review.stay?.name;
              return (
                <SwiperSlide key={review.id}>
                  <div className="bg-white rounded-xl shadow-md border p-5 flex flex-col h-full justify-between transition hover:shadow-lg">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800 text-base">{name}</span>
                        <div className="flex">{renderStars(rating)}</div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4 min-h-[48px]">{comment}</p>
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-xs text-gray-400">{formattedDate}</span>
                      {stayName && (
                        <span className="text-xs text-gray-400">Stay: {stayName}</span>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}