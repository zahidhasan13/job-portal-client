import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompany, setAllCompanies } from '@/redux/slices/companySlice';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Swal from 'sweetalert2';

const RecruiterCompanies = () => {
  const { companies } = useSelector((state) => state.company);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  // Fetch companies on component mount
  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const res = await axios.get('http://localhost:8400/api/company', { withCredentials: true });
        if (res.status === 200) {
          dispatch(setAllCompanies(res.data));
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    getAllCompanies();
  }, [dispatch]);

  // Filter companies based on search query
  const filteredCompanies = companies?.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete Company
  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this company!',
      icon: 'warning',
      iconColor: '#E91923',
      showCancelButton: true,
      confirmButtonColor: '#E91923',
      cancelButtonColor: '#000',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
  
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:8400/api/company/delete/${id}`, { withCredentials: true });
        if (res.status === 200) {
          toast.success(res.data.message);
          dispatch(deleteCompany(id));
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Managed Companies</h1>
        <Link to="/recruiter/companies/create-company">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </Link>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <Input
          placeholder="Search companies by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Companies Table */}
      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Logo</TableHead>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="w-1/4">Industry</TableHead>
              <TableHead className="w-1/4">Website</TableHead>
              <TableHead className="w-1/4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies?.length > 0 && (
              filteredCompanies.map((company) => (
                <TableRow key={company._id} className="border-b">
                  <TableCell className="text-left">
                    <img src={company.logo} alt={company.name} className='h-10 w-10'/>
                  </TableCell>
                  <TableCell className="text-left">{company.name}</TableCell>
                  <TableCell className="text-left">{company.industry}</TableCell>
                  <TableCell className="text-left">
                    <a href={company.website} target='_blank' className='text-blue-500 hover:underline'>{company.website}</a>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Link to={`/recruiter/companies/company-details/${company._id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() => deleteHandler(company._id)}
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) }
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {companies?.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <h3 className="mt-4 text-lg font-medium">No companies added yet</h3>
          <p className="mt-2 text-gray-500">
            Click the "Add Company" button to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecruiterCompanies;