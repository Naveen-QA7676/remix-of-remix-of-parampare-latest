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
import { useAddresses, Address } from "@/hooks/useAddresses";
import { STATES_OF_INDIA } from "@/constants/states";

const YourAddresses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { addresses, loading, addAddress, updateAddress, deleteAddress, setDefault } = useAddresses();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Address, "id" | "_id" | "isDefault">>({
    fullName: "",
    mobile: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    alternatePhone: "",
    addressLine1: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login", { state: { returnTo: "/addresses" } });
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName?.trim()) newErrors.fullName = "Full name is required";
    if (!formData.mobile?.trim() || !/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = "Valid 10-digit mobile is required";
    if (!formData.house?.trim()) newErrors.house = "House/Flat is required";
    if (!formData.street?.trim()) newErrors.street = "Street/Area is required";
    
    if (!formData.city?.trim()) newErrors.city = "City is required";
    else if (!/^[A-Za-z\s]{2,}$/.test(formData.city)) newErrors.city = "Enter a valid city name";

    if (!formData.state?.trim() || formData.state === "") newErrors.state = "Please select a state";
    
    if (!formData.pincode?.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = "Please enter a valid 6-digit pincode";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = { ...formData, addressLine1: formData.house };

    if (editingId) {
      await updateAddress(editingId, payload);
      toast({ title: "Address Updated", description: "Your address has been updated successfully." });
    } else {
      await addAddress(payload);
      toast({ title: "Address Added", description: "Your new address has been saved." });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id || address._id || null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const legacyAddr = address as any;
    setFormData({
      fullName: address.fullName || "",
      mobile: address.mobile || "",
      house: address.house || legacyAddr.addressLine1 || "",
      street: address.street || legacyAddr.addressLine2 || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      landmark: address.landmark || "",
      alternatePhone: address.alternatePhone || "",
      addressLine1: address.addressLine1 || legacyAddr.house || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteAddress(id);
    toast({ title: "Address Deleted", description: "The address has been removed." });
  };

  const handleSetDefault = async (id: string) => {
    await setDefault(id);
    toast({ title: "Default Address Updated", description: "Your default address has been changed." });
  };

  const resetForm = () => {
    setFormData({
      fullName: "", mobile: "", house: "", street: "", city: "", state: "", pincode: "", landmark: "", alternatePhone: "", addressLine1: ""
    });
    setEditingId(null);
    setErrors({});
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading addresses...</div>;

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
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
            <Button onClick={openAddDialog} className="gap-2 bg-gold hover:bg-gold/90 text-foreground">
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          </div>

          {addresses.length === 0 ? (
            <div className="bg-card rounded-xl border border-border/50 shadow-soft p-12 text-center">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium text-foreground mb-2">No Addresses Saved</h2>
              <p className="text-muted-foreground mb-6">Add your first delivery address to get started.</p>
              <Button onClick={openAddDialog} className="gap-2 bg-gold hover:bg-gold/90 text-foreground">
                <Plus className="h-4 w-4" /> Add Address
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {addresses.map((address) => {
                const addrId = address.id || address._id || "";
                return (
                  <div key={addrId} className={`bg-card rounded-xl border shadow-soft p-5 relative ${address.isDefault ? "border-gold" : "border-border/50"}`}>
                    {address.isDefault && (
                      <span className="absolute top-3 right-3 text-xs font-medium bg-gold/20 text-gold px-2 py-1 rounded">Default</span>
                    )}
                    <div className="pr-16">
                      <p className="font-medium text-foreground">{address.fullName} <span className="font-normal text-muted-foreground ml-2">{address.mobile}</span></p>
                      <p className="text-muted-foreground text-sm mt-2">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {address.house || (address as any).addressLine1}, {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}{(address as any).addressLine2 || address.street}
                      </p>
                      {address.landmark && <p className="text-muted-foreground text-sm">Near: {address.landmark}</p>}
                      <p className="text-muted-foreground text-sm mt-1">{address.city}</p>
                      <p className="text-muted-foreground text-sm">{address.state} - {address.pincode}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(address)} className="gap-1">
                        <Edit2 className="h-3 w-3" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(addrId)} className="gap-1 text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" /> Delete
                      </Button>
                      {!address.isDefault && (
                        <Button variant="ghost" size="sm" onClick={() => handleSetDefault(addrId)} className="gap-1 text-gold">
                          <Check className="h-3 w-3" /> Set as Default
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingId ? "Edit Address" : "Add New Address"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium">Full Name *</label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Mobile Number *</label>
              <Input
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                placeholder="10-digit mobile number"
                className={errors.mobile ? "border-destructive" : ""}
              />
              {errors.mobile && <p className="text-destructive text-xs mt-1">{errors.mobile}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">House / Flat / Building *</label>
              <Input
                value={formData.house}
                onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                placeholder="House/Flat No., Building Name"
                className={errors.house ? "border-destructive" : ""}
              />
              {errors.house && <p className="text-destructive text-xs mt-1">{errors.house}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Street / Area *</label>
              <Input
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="Street, Area"
                className={errors.street ? "border-destructive" : ""}
              />
              {errors.street && <p className="text-destructive text-xs mt-1">{errors.street}</p>}
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
                  placeholder="e.g. Bengaluru"
                />
                {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">State *</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className={`w-full h-10 border rounded-md bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.state ? "border-destructive" : "border-input"}`}
                >
                  <option value="" disabled>Select State</option>
                  {STATES_OF_INDIA.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="text-destructive text-xs mt-1">{errors.state}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Pincode *</label>
                <Input
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                  maxLength={6}
                  className={errors.pincode ? "border-destructive" : ""}
                  placeholder="e.g. 560001"
                />
                {errors.pincode && <p className="text-destructive text-xs mt-1">{errors.pincode}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Alternate Phone</label>
                <Input
                  value={formData.alternatePhone}
                  onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                  placeholder="Optional"
                />
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full bg-gold hover:bg-gold/90 text-foreground mt-4"
            >
              {editingId ? "Update Address" : "Save Address"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default YourAddresses;
