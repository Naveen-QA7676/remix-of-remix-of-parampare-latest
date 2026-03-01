import apiClient from "./apiClient";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parent?: string;
  level: number;
  children?: Category[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string | Category;
  subcategory?: string | Category;
  fabric?: string;
  color?: string;
  occasion?: string;
  weave?: string;
  border?: string;
  pallu?: string;
  blouse?: string;
  careInstructions: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  badges: string[];
  deliveryTimeDays: string;
  // Mapped fields for frontend consistency
  image?: string;
  reviews?: number;
  badge?: string;
}

export interface GetProductsParams {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
  search?: string;
  fabric?: string;
  occasion?: string;
  color?: string;
  weave?: string;
  border?: string;
  pallu?: string;
}

export interface GetProductsResponse {
  success: boolean;
  products: Product[];
  count: number;
  totalPages: number;
  currentPage: number;
}

export const fetchProducts = async (params: GetProductsParams = {}): Promise<GetProductsResponse> => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value.toString());
    }
  });

  const response = await apiClient.get(`/products?${query.toString()}`);
  const data = response.data;
  
  // Map backend _id to id for frontend compatibility
  if (Array.isArray(data.products)) {
    data.products = data.products.map((p: any) => ({
      ...p,
      id: p._id || p.id || Math.random().toString(36).substr(2, 9)
    }));
  }
  
  return data;
};

export const fetchProductById = async (id: string): Promise<{ success: boolean; data: Product }> => {
  const response = await apiClient.get(`/products/${id}`);
  const data = response.data;
  
  if (data.data) {
    data.data.id = data.data._id || data.data.id;
  }
  
  return data;
};

export const fetchCategories = async (): Promise<{ success: boolean; data: Category[] }> => {
  const response = await apiClient.get("/categories");
  return response.data;
};

export const fetchCategoryTree = async (): Promise<{ success: boolean; data: Category[] }> => {
  const response = await apiClient.get("/categories/tree");
  return response.data;
};
