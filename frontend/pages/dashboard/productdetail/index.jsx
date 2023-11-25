import { useRouter } from 'next/router';

const ProductDetail = ({ product }) => {
  const router = useRouter();
  const { productId } = router.query;

  // Kiểm tra nếu không có thông tin sản phẩm
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Các thông tin khác về sản phẩm */}
    </div>
  );
};

export default ProductDetail;
