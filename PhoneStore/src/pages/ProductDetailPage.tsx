import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronLeft, ShoppingCart, Check, Star } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Badge, Button } from '@/components/ui';
import { useProducts, useCart } from '@/hooks';
import { formatPrice } from '@/lib/utils';
import { productsApi } from '@/services/api';
import { Product } from '@/types';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedProduct } = useProducts();
  const { addToCart, openCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      productsApi.getProductById(Number(id))
        .then(setProduct)
        .catch(() => {
          toast.error('Sản phẩm không tồn tại');
          navigate('/products');
        })
        .finally(() => setLoading(false));
    }
    return () => setSelectedProduct(null);
  }, [id, setSelectedProduct, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 800);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.oldPrice!) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 max-w-6xl py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Trang chủ</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Sản phẩm</Link>
          <span>/</span>
          <Link to={`/products?brand=${product.brand}`} className="hover:text-primary">{product.brand}</Link>
          <span>/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <div className="bg-gray-50 rounded-xl p-8 relative aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {hasDiscount && (
                <Badge variant="danger" className="absolute top-4 left-4 text-lg px-3 py-1">
                  -{discountPercent}%
                </Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="text-sm text-gray-500 mb-2 block">{product.brand}</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.oldPrice!)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600">Còn hàng ({product.stock} sản phẩm)</span>
                </>
              ) : (
                <span className="text-red-500">Hết hàng</span>
              )}
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full mb-4 relative overflow-hidden"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Thêm vào giỏ hàng
              {showAnimation && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce-in">
                  +1
                </span>
              )}
            </Button>

            {/* Specs */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Thông số kỹ thuật</h2>
              <div className="bg-gray-50 rounded-xl divide-y divide-gray-200">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex py-3 px-4">
                    <span className="w-32 text-gray-500 capitalize">{key === 'os' ? 'Hệ điều hành' : key}</span>
                    <span className="flex-1 font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
