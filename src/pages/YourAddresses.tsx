import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Plus, Edit2, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

interface Address {
  id: string;
  addressLine1: string;
  addressLine2: string;
  landmark?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const YourAddresses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id" | "isDefault">>({
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login", { state: { returnTo: "/addresses" } });
      return;
    }

    // Load addresses from localStorage
    const storedAddresses = localStorage.getItem("parampare_addresses");
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, [navigate]);

  const saveAddresses = (newAddresses: Address[]) => {
    localStorage.setItem("parampare_addresses", JSON.stringify(newAddresses));
    setAddresses(newAddresses);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address Line 1 is required";
    if (!formData.addressLine2.trim()) newErrors.addressLine2 = "Address Line 2 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingAddress) {
      // Update existing address
      const updated = addresses.map((addr) =>
        addr.id === editingAddress.id
          ? { ...formData, id: addr.id, isDefault: addr.isDefault }
          : addr
      );
      saveAddresses(updated);
      toast({ title: "Address Updated", description: "Your address has been updated successfully." });
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: `addr_${Date.now()}`,
        isDefault: addresses.length === 0, // First address is default
      };
      saveAddresses([...addresses, newAddress]);
      toast({ title: "Address Added", description: "Your new address has been saved." });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      landmark: address.landmark || "",
      city: address.city,
      district: address.district,
      state: address.state,
      pincode: address.pincode,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const filtered = addresses.filter((addr) => addr.id !== id);
    // If deleted address was default, make first remaining address default
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    saveAddresses(filtered);
    toast({ title: "Address Deleted", description: "The address has been removed." });
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    saveAddresses(updated);
    toast({ title: "Default Address Updated", description: "Your default address has been changed." });
  };

  const resetForm = () => {
    setFormData({
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    });
    setEditingAddress(null);
    setErrors({});
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Your Addresses</span>
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-semibold text-foreground">
              Your Addresses
            </h1>
            <Button
              onClick={openAddDialog}
              className="gap-2 bg-gold hover:bg-gold/90 text-foreground"
            >
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          </div>

          {addresses.length === 0 ? (
            <div className="bg-card rounded-xl border border-border/50 shadow-soft p-12 text-center">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium text-foreground mb-2">No Addresses Saved</h2>
              <p className="text-muted-foreground mb-6">Add your first delivery address to get started.</p>
              <Button
                onClick={openAddDialog}
                className="gap-2 bg-gold hover:bg-gold/90 text-foreground"
              >
                <Plus className="h-4 w-4" />
                Add Address
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`bg-card rounded-xl border shadow-soft p-5 relative ${
                    address.isDefault ? "border-gold" : "border-border/50"
                  }`}
                >
                  {address.isDefault && (
                    <span className="absolute top-3 right-3 text-xs font-medium bg-gold/20 text-gold px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                  <div className="pr-16">
                    <p className="font-medium text-foreground">{address.addressLine1}</p>
                    <p className="text-muted-foreground text-sm">{address.addressLine2}</p>
                    {address.landmark && (
                      <p className="text-muted-foreground text-sm">Near: {address.landmark}</p>
                    )}
                    <p className="text-muted-foreground text-sm mt-1">
                      {address.city}, {address.district}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {address.state} - {address.pincode}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(address)}
                      className="gap-1"
                    >
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(address.id)}
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                        className="gap-1 text-gold"
                      >
                        <Check className="h-3 w-3" />
                        Set as Default
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium">Address Line 1 *</label>
              <Input
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                placeholder="House/Flat No., Building Name"
                className={errors.addressLine1 ? "border-destructive" : ""}
              />
              {errors.addressLine1 && <p className="text-destructive text-xs mt-1">{errors.addressLine1}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Address Line 2 *</label>
              <Input
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                placeholder="Street, Area"
                className={errors.addressLine2 ? "border-destructive" : ""}
              />
              {errors.addressLine2 && <p className="text-destructive text-xs mt-1">{errors.addressLine2}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Landmark (Optional)</label>
              <Input
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                placeholder="Near temple, school, etc."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">City *</label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">District *</label>
                <Input
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className={errors.district ? "border-destructive" : ""}
                />
                {errors.district && <p className="text-destructive text-xs mt-1">{errors.district}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">State *</label>
                <Input
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className={errors.state ? "border-destructive" : ""}
                />
                {errors.state && <p className="text-destructive text-xs mt-1">{errors.state}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Pincode *</label>
                <Input
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  maxLength={6}
                  className={errors.pincode ? "border-destructive" : ""}
                />
                {errors.pincode && <p className="text-destructive text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full bg-gold hover:bg-gold/90 text-foreground mt-4"
            >
              {editingAddress ? "Update Address" : "Save Address"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default YourAddresses;
