import '../styles/serviceBillGenerator.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Trash2, Edit2, Plus, FileText, Eye } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceBillGenerator = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [editingService, setEditingService] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [showBill, setShowBill] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to fetch services!');
      }
    };
    fetchServices();
  }, []);

  // Add service
  const handleAddService = async () => {
    if (newService.name && newService.price) {
      try {
        const response = await axios.post('http://localhost:5000/api/services', {
          name: newService.name,
          price: parseFloat(newService.price),
        });
        setServices([...services, response.data]);
        setNewService({ name: '', price: '' });
        toast.success('Service added successfully!');
      } catch (error) {
        console.error('Error adding service:', error);
        toast.error('Failed to add service!');
      }
    } else {
      toast.warn('Please enter valid service details!');
    }
  };

  // Delete service
  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServices(services.filter((service) => service.id !== id));
      setSelectedServices(selectedServices.filter((service) => service.id !== id));
      toast.success('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service!');
    }
  };

  // Edit service
  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({ name: service.name, price: service.price.toString() });
  };

  const handleUpdateService = async () => {
    if (editingService && newService.name && newService.price) {
      try {
        await axios.put(`http://localhost:5000/api/services/${editingService.id}`, {
          name: newService.name,
          price: parseFloat(newService.price),
        });
        setServices(
          services.map((service) =>
            service.id === editingService.id
              ? { ...service, name: newService.name, price: parseFloat(newService.price) }
              : service
          )
        );
        setEditingService(null);
        setNewService({ name: '', price: '' });
        toast.success('Service updated successfully!');
      } catch (error) {
        console.error('Error updating service:', error);
        toast.error('Failed to update service!');
      }
    } else {
      toast.warn('Please enter valid service details!');
    }
  };

  // Service selection
  const handleServiceSelection = (service) => {
    if (selectedServices.find((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => total + Number(service.price || 0), 0);
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    const formattedTime = `${today.getHours()}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`;

    doc.setFontSize(20);
    doc.setTextColor(0, 0, 128);
    doc.text('AutoDoc Service Bill', 14, y);

    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Date: ${formattedDate}`, 14, y);
    y += 10;
    doc.text(`Time: ${formattedTime}`, 14, y);
    y += 10;
    doc.text(`Customer Name: ${customerName}`, 14, y);
    y += 10;
    doc.text(`Vehicle Number: ${vehicleNumber}`, 14, y);

    y += 10;
    doc.setLineWidth(0.5);
    doc.line(14, y, 196, y);

    y += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Service Details', 14, y);

    y += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Service Name', 14, y);
    doc.text('Price', 164, y, { align: 'right' });

    y += 5;
    doc.setLineWidth(0.3);
    doc.line(14, y, 196, y);

    y += 5;
    selectedServices.forEach((service) => {
      const price = parseFloat(service.price) || 0;
      doc.text(service.name, 14, y);
      doc.text(`Rs-${price.toFixed(2)}`, 164, y, { align: 'right' });
      y += 8;
      doc.line(14, y, 196, y);
      y += 5;
    });

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 128, 0);
    doc.text(`Total: RS ${calculateTotal().toFixed(2)}`, 14, y);

    doc.save('service_bill.pdf');
    toast.success('Bill PDF generated!');
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      
   



    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Add/Edit Service</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"


          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          className="flex-1 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          className="w-32 p-2 border rounded"
        />
        <button
          onClick={editingService ? handleUpdateService : handleAddService}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          {editingService ? (
            <>
              <Edit2 size={16} />
              Update
            </>
          ) : (
            <>
              <Plus size={16} />
              Add
            </>
          )}
        </button>
      </div>
    </div>









    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow">

{/*Search bar for filtering services */}
<div className="search">
      <input
        type="text"
        placeholder="Search Services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full"
      />
    </div>


        <h2 className="text-2xl font-bold mb-4">Available Services</h2>
        <div className="space-y-4">
          {filteredServices.map(service => (
            <div key={service.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedServices.some(s => s.id === service.id)}
                  onChange={() => handleServiceSelection(service)}
                  className="w-5 h-5"
                />
                <span>{service.name}</span>
                <span className="font-semibold">Rs-{service.price}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditService(service)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Bill</h2>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <div className="flex gap-4">
          <button
            onClick={generatePDF}
            disabled={selectedServices.length === 0}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
          >
            <FileText size={16} />
            Generate PDF Bill
          </button>
          <button
            onClick={() => setShowBill(!showBill)}
            className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Eye size={16} />
            {showBill ? 'Hide Bill' : 'Show Bill'}
          </button>
        </div>

        {showBill && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-xl font-semibold mb-2">Bill Details</h3>
            {selectedServices.map(service => (
              <div key={service.id} className="flex justify-between">
                <span>{service.name}</span>
                <span>{service.price}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-2">
              <span>Total:</span>
              <span>RS: {calculateTotal()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default ServiceBillGenerator;
