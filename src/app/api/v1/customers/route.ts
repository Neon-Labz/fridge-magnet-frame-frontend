import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Handle GET request for customers
    return NextResponse.json({
      status: 'success',
      message: 'GET /api/v1/customers',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Handle POST request to create a customer
    const body = await request.json();
    
    return NextResponse.json(
      {
        status: 'success',
        message: 'Customer created successfully',
        data: body,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 400 }
    );
  }
}
