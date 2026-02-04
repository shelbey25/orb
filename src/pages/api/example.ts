import type { NextApiRequest, NextApiResponse } from 'next';

interface DataResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

/**
 * Basic REST API Endpoint Example
 * Handles GET, POST, PUT, DELETE requests
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>
) {
  // Handle GET requests
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      // Get single item by ID
      return res.status(200).json({
        success: true,
        message: 'Item retrieved successfully',
        data: {
          id,
          name: 'Example Item',
          description: 'This is an example item',
          createdAt: new Date().toISOString(),
        },
      });
    }

    // Get all items
    return res.status(200).json({
      success: true,
      message: 'Items retrieved successfully',
      data: [
        {
          id: 1,
          name: 'Item 1',
          description: 'First example item',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Item 2',
          description: 'Second example item',
          createdAt: new Date().toISOString(),
        },
      ],
    });
  }

  // Handle POST requests
  if (req.method === 'POST') {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: 'Name and description are required',
      });
    }

    // Create new item
    return res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        name,
        description,
        createdAt: new Date().toISOString(),
      },
    });
  }

  // Handle PUT requests
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { name, description } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: 'ID is required for updates',
      });
    }

    // Update item
    return res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: {
        id,
        name: name || 'Updated Item',
        description: description || 'Updated description',
        updatedAt: new Date().toISOString(),
      },
    });
  }

  // Handle DELETE requests
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: 'ID is required for deletion',
      });
    }

    // Delete item
    return res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      data: {
        id,
        deletedAt: new Date().toISOString(),
      },
    });
  }

  // Handle unsupported methods
  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
    error: `${req.method} method is not supported`,
  });
}
