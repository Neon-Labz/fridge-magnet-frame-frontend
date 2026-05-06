import { NextRequest, NextResponse } from 'next/server';

// In-memory storage starts empty; customers are added through the form.
let mockCustomers: Array<{
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  initials: string;
}> = [];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const offset = (page - 1) * limit;
  const paginatedCustomers = mockCustomers.slice(offset, offset + limit);

  return NextResponse.json({
    data: paginatedCustomers,
    total: mockCustomers.length,
    totalPages: Math.ceil(mockCustomers.length / limit),
    page,
    limit,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }

    const newCustomer = {
      id: Math.max(...mockCustomers.map(c => c.id), 0) + 1,
      name,
      email,
      phone: phone || '',
      address: address || '',
      status: 'active',
      initials: name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2),
    };

    mockCustomers.unshift(newCustomer);

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create customer' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, email, phone, address } = body;

    const customerId = Number(id);
    if (!customerId) {
      return NextResponse.json(
        { message: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const customerIndex = mockCustomers.findIndex((customer) => customer.id === customerId);
    if (customerIndex === -1) {
      return NextResponse.json(
        { message: 'Customer not found' },
        { status: 404 }
      );
    }

    const updatedCustomer = {
      ...mockCustomers[customerIndex],
      name: name?.trim() || mockCustomers[customerIndex].name,
      email: email?.trim() || mockCustomers[customerIndex].email,
      phone: phone ?? mockCustomers[customerIndex].phone,
      address: address ?? mockCustomers[customerIndex].address,
      initials: (name?.trim() || mockCustomers[customerIndex].name)
        .split(' ')
        .map((word: string) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
    };

    mockCustomers[customerIndex] = updatedCustomer;

    return NextResponse.json(updatedCustomer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update customer' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = parseInt(searchParams.get('id') || '0');

    if (!id) {
      return NextResponse.json(
        { message: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const index = mockCustomers.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json(
        { message: 'Customer not found' },
        { status: 404 }
      );
    }

    const deletedCustomer = mockCustomers.splice(index, 1)[0];
    return NextResponse.json({ message: 'Customer deleted', data: deletedCustomer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete customer' },
      { status: 500 }
    );
  }
}
