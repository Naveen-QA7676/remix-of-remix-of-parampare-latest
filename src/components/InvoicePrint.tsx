import React from 'react';

// Using the same interface as OrderDetail for smooth prop passing
interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  address: any;
  status: string;
  paymentMethod: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  trackingNumber?: string;
}

const InvoicePrint: React.FC<{ order: Order }> = ({ order }) => {
  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  
  const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div className="p-8 bg-white text-black font-sans w-full max-w-4xl mx-auto" style={{ margin: 0, padding: "2cm", backgroundColor: "white" }}>
      {/* Header Section */}
      <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-black mb-1">ಪರಂಪರೆ</h1>
          <h2 className="text-xl tracking-widest text-black/80 font-medium">PARAMPARE</h2>
          <p className="text-sm mt-2 text-gray-600">Authentic Ilkal Sarees</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-2 text-gray-800">Tax Invoice</h2>
          <p className="text-sm"><strong>Invoice Date:</strong> {invoiceDate}</p>
          <p className="text-sm"><strong>Order ID:</strong> {order.id}</p>
          <p className="text-sm"><strong>Order Date:</strong> {orderDate}</p>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
        <div className="p-4 border border-gray-200 rounded">
          <h3 className="font-bold uppercase mb-2 border-b border-gray-200 pb-2 text-gray-800">Sold By</h3>
          <p className="font-semibold text-base mt-2">Parampare Private Limited</p>
          <p className="mt-1">Weavers Colony, Main Road</p>
          <p>Ilkal, Bagalkot District</p>
          <p>Karnataka, India - 587125</p>
          <p className="mt-2"><strong>Email:</strong> parampare@paramparee.com</p>
          <p><strong>Phone:</strong> +91 7676295599</p>
        </div>
        <div className="p-4 border border-gray-200 rounded">
          <h3 className="font-bold uppercase mb-2 border-b border-gray-200 pb-2 text-gray-800">Billing & Shipping Address</h3>
          <p className="font-semibold text-base mt-2">{order.address.fullName}</p>
          <p className="mt-1">{order.address.house}, {order.address.street}</p>
          <p>{order.address.landmark && `${order.address.landmark}, `}{order.address.city}</p>
          <p>{order.address.state} - {order.address.pincode}</p>
          <p className="mt-2"><strong>Mobile:</strong> +91 {order.address.mobile}</p>
          {order.address.alternatePhone && <p><strong>Alt Mobile:</strong> +91 {order.address.alternatePhone}</p>}
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-sm border-collapse mb-8">
        <thead>
          <tr className="bg-gray-100 text-left align-middle border border-gray-300">
            <th className="p-3 border-r border-gray-300 w-12 text-center">No.</th>
            <th className="p-3 border-r border-gray-300">Product Description</th>
            <th className="p-3 border-r border-gray-300 w-24 text-center">Quantity</th>
            <th className="p-3 border-r border-gray-300 w-32 text-right">Unit Price</th>
            <th className="p-3 w-32 text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index} className="border-b border-l border-r border-gray-300">
              <td className="p-3 border-r border-gray-300 text-center">{index + 1}</td>
              <td className="p-3 border-r border-gray-300">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">HSN: 5208 (Sarees)</p>
              </td>
              <td className="p-3 border-r border-gray-300 text-center">{item.quantity}</td>
              <td className="p-3 border-r border-gray-300 text-right">₹{item.price.toLocaleString()}</td>
              <td className="p-3 text-right font-medium">₹{(item.price * item.quantity).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Section */}
      <div className="flex justify-end mb-12">
        <div className="w-1/2 p-4 border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span>₹{order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="text-gray-600">Shipping Fees:</span>
            <span>{order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`}</span>
          </div>
          <div className="flex justify-between mt-2 pt-2 text-lg font-bold">
            <span>Grand Total:</span>
            <span>₹{order.total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">Amount is inclusive of all taxes.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-200">
        <h4 className="font-bold text-gray-800">Support Vocal for Local. Thank you for choosing Parampare.</h4>
        <p className="text-xs text-gray-500 mt-2">
          This is a computer generated invoice and does not require a physical signature.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          For any queries, contact us at parampare@paramparee.com or call +91 7676295599
        </p>
      </div>
    </div>
  );
};

export default InvoicePrint;
