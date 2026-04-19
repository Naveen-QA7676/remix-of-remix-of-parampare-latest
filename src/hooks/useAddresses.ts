import { useState, useCallback, useEffect } from 'react';
import apiClient from '@/lib/apiClient';

export interface Address {
  addressLine1: string;
  id?: string;
  _id?: string;
  fullName: string;
  mobile: string;
  house: string;
  street: string;
  city: string;
  district?: string;
  state: string;
  pincode: string;
  landmark?: string;
  alternatePhone?: string;
  isDefault?: boolean;
}

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/user/addresses');
      // The API might return the array directly or wrapped in data.data
      const data = res.data?.data || res.data;
      if (Array.isArray(data)) {
        setAddresses(data);
        return;
      }
      throw new Error("Invalid API response format");
    } catch (err: any) {
      console.warn("Failed fetching API addresses, falling back to local", err.message);
      // Seamlessly Fallback to local storage if API is mock/unreachable
      const local = JSON.parse(localStorage.getItem('shared_user_addresses') || '[]');
      setAddresses(local);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAddress = async (address: Omit<Address, 'id' | '_id'>) => {
    // If this is the very first address, default it
    const isFirst = addresses.length === 0;
    const finalAddr = { ...address, isDefault: isFirst || address.isDefault };

    try {
      await apiClient.post('/user/address', finalAddr);
      await fetchAddresses();
    } catch (err) {
      console.warn("API failed, using local storage", err);
      const local = JSON.parse(localStorage.getItem('shared_user_addresses') || '[]');
      const newAddr = { ...finalAddr, id: `local_${Date.now()}` };
      const updated = [...local, newAddr];
      if (newAddr.isDefault) {
        updated.forEach(a => { if (a.id !== newAddr.id) a.isDefault = false; });
      }
      localStorage.setItem('shared_user_addresses', JSON.stringify(updated));
      setAddresses(updated);
    }
  };

  const updateAddress = async (id: string, address: Partial<Address>) => {
    try {
      await apiClient.put(`/user/address/${id}`, address);
      await fetchAddresses();
    } catch (err) {
      console.warn("API update failed, using local storage", err);
      const local = JSON.parse(localStorage.getItem('shared_user_addresses') || '[]');
      const updated = local.map((a: Address) => (a.id === id || a._id === id) ? { ...a, ...address } : a);
      if (address.isDefault) {
        updated.forEach((a: Address) => { if (a.id !== id && a._id !== id) a.isDefault = false; });
      }
      localStorage.setItem('shared_user_addresses', JSON.stringify(updated));
      setAddresses(updated);
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await apiClient.delete(`/user/address/${id}`);
      await fetchAddresses();
    } catch (err) {
      console.warn("API delete failed, using local storage", err);
      const local = JSON.parse(localStorage.getItem('shared_user_addresses') || '[]');
      const updated = local.filter((a: Address) => a.id !== id && a._id !== id);
      localStorage.setItem('shared_user_addresses', JSON.stringify(updated));
      setAddresses(updated);
    }
  };

  const setDefault = async (id: string) => {
    await updateAddress(id, { isDefault: true });
  };

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return { addresses, loading, fetchAddresses, addAddress, updateAddress, deleteAddress, setDefault };
};
