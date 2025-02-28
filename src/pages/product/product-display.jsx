// frontend/src/pages/ProductPage.jsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, 
  Share2, 
  Heart, 
  MessageCircle, 
  Phone, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Shield,
  AlertCircle
} from 'lucide-react';
import { fetchProductById } from '../../api/productapi';

// Lazy load components
const Navbar = lazy(() => import('../../components/home/navbar/navbar'));
const Footer = lazy(() => import('../../components/home/footer'));

// Skeleton loaders
const ImageSkeleton = () => (
  <div className="animate-pulse bg-gray-200 h-[450px] rounded-xl flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-400 rounded-full animate-spin" />
  </div>
);

const InfoSkeleton = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-sm p-5">
    <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-2" />
    <div className="h-6 bg-gray-200 rounded-lg w-2/3 mb-4" />
    <div className="flex gap-4 mb-5">
      <div className="h-4 bg-gray-200 rounded w-24" />
      <div className="h-4 bg-gray-200 rounded w-24" />
    </div>
    <div className="space-y-4 py-5 border-t border-b">
      <div className="flex gap-3">
        <div className="h-10 w-10 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-10 bg-gray-200 rounded-lg" />
        <div className="h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

const ProductPage = () => {
  const { productId } = useParams();
  const [foundProduct, setFoundProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await fetchProductById(productId);
        setFoundProduct(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (!foundProduct && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center gap-2 max-w-md text-sm">
          <AlertCircle className="h-4 w-4" />
          <p>Product not found. Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  // Use multiple images if available (ensure foundProduct.images is an array)
  const images = foundProduct 
    ? (Array.isArray(foundProduct.images) ? foundProduct.images : [foundProduct.images])
    : [];

  const handleImageLoad = (index) => {
    setImagesLoaded(prev => [...prev, index]);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatRentType = (type) => {
    switch(type?.toLowerCase()) {
      case 'daily':
        return '/ day';
      case 'weekly':
        return '/ week';
      case 'monthly':
        return '/ month';
      default:
        return `/ ${type}`;
    }
  };

  // Render dynamic product details based on available fields
  const renderProductDetails = () => {
    if (!foundProduct) return null;
    const details = [];
    if (foundProduct.brand) details.push({ label: 'Brand', value: foundProduct.brand });
    if (foundProduct.model) details.push({ label: 'Model', value: foundProduct.model });
    if (foundProduct.condition) details.push({ label: 'Condition', value: foundProduct.condition });
    if (foundProduct.propertyArea) details.push({ label: 'Property Area', value: foundProduct.propertyArea + ' sq ft' });
    if (foundProduct.listingType) details.push({ label: 'Listing Type', value: foundProduct.listingType });

    return (
      <div className="grid grid-cols-2 gap-3 text-xs">
        {details.map((detail, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-gray-600">{detail.label}</span>
            <span className="font-medium">{detail.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
        <Navbar />
      </Suspense>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Gallery */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
              {loading ? (
                <ImageSkeleton />
              ) : (
                <div className="relative h-full min-h-[450px]">
                  <span className="absolute top-3 left-3 z-10 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-md text-xs font-medium">
                    FEATURED
                  </span>
                  {!imagesLoaded.includes(currentImageIndex) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-400 rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={images[currentImageIndex]}
                    alt={foundProduct?.title}
                    className={`w-full h-full object-contain bg-gray-100 transition-opacity duration-300 ${imagesLoaded.includes(currentImageIndex) ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(currentImageIndex)}
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-0.5 rounded-full text-white text-xs">
                    {currentImageIndex + 1}/{images.length}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1 h-full">
            {loading ? (
              <InfoSkeleton />
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-5 h-full">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h1 className="text-2xl font-bold">
                      Rs {foundProduct.price.toLocaleString()}
                      {foundProduct.rentType && (
                        <span className="text-sm font-medium text-gray-500 ml-1">{formatRentType(foundProduct.rentType)}</span>
                      )}
                    </h1>
                    <h2 className="text-lg mt-1">{foundProduct.title}</h2>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button 
                      className={`p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${isLiked ? 'text-red-500' : ''}`}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-600 text-sm mb-5">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{foundProduct.city}, {foundProduct.state}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{(new Date(foundProduct.createdAt)).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="border-t border-b py-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                      <img
                        src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                        alt="Seller"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{foundProduct.contactName}</h3>
                      {foundProduct.email && (
                        <p className="text-xs text-gray-600 mt-0.5">{foundProduct.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
                      <Phone className="h-4 w-4" />
                      Show phone number
                    </button>
                    <button className="w-full border border-gray-200 hover:bg-gray-50 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
                      <MessageCircle className="h-4 w-4" />
                      Chat with seller
                    </button>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-1.5 text-green-700 mb-4">
                    <Shield className="h-3 w-3" />
                    <span className="text-xs font-medium">Verified Seller</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm mb-2">Product Details</h3>
                    {renderProductDetails()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="animate-pulse bg-white rounded-xl shadow-sm p-5">
                <div className="h-6 bg-gray-200 rounded w-24 mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-lg font-medium mb-3">Description</h3>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-gray-600 text-sm">
                    {foundProduct.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t text-xs text-gray-500">
                  AD ID: {foundProduct._id}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ProductPage;
