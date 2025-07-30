const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authenticateToken = require('../middleware/auth');

// ✅ GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    
    let query = { isActive: true };
    
    // Add category filter
    if (category) {
      query.category = category;
    }
    
    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const products = await Product.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments(query);
    
    res.status(200).json({
      success: true,
      products,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalProducts: total,
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('⚠️ Get products error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error retrieving products' 
    });
  }
});

// ✅ GET PRODUCT BY ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product || !product.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('⚠️ Get product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error retrieving product' 
    });
  }
});

// ✅ CREATE PRODUCT (Admin only - you can add admin middleware later)
router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    
    const product = new Product(productData);
    await product.save();
    
    console.log('✅ Product created:', product._id);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('⚠️ Create product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating product' 
    });
  }
});

// ✅ SEED SAMPLE PRODUCTS (for testing)
router.post('/seed', async (req, res) => {
  try {
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      return res.status(400).json({
        success: false,
        message: 'Products already seeded'
      });
    }
    
    const sampleProducts = [
      {
        name: 'Brass Cable Gland M20',
        description: 'High-quality brass cable gland suitable for industrial applications. Provides excellent protection against dust and moisture.',
        price: 25.99,
        category: 'Brass Cable Glands',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        stockQuantity: 100,
        specifications: {
          material: 'Brass',
          dimensions: 'M20 x 1.5',
          weight: '45g',
          finish: 'Nickel Plated'
        }
      },
      {
        name: 'Brass Cable Gland M16',
        description: 'Compact brass cable gland perfect for smaller cable installations. Features durable construction and easy installation.',
        price: 18.50,
        category: 'Brass Cable Glands',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        stockQuantity: 150,
        specifications: {
          material: 'Brass',
          dimensions: 'M16 x 1.5',
          weight: '32g',
          finish: 'Natural Brass'
        }
      },
      {
        name: 'Electrical Terminal Block',
        description: 'Reliable electrical terminal block for secure wire connections. Suitable for various electrical applications.',
        price: 12.75,
        category: 'Electrical Components',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
        stockQuantity: 200,
        specifications: {
          material: 'Brass/Copper',
          dimensions: '10x8x15mm',
          weight: '15g',
          finish: 'Tin Plated'
        }
      },
      {
        name: 'Brass Hex Head Screw M8',
        description: 'Premium brass hex head screws with superior corrosion resistance. Ideal for marine and outdoor applications.',
        price: 3.25,
        category: 'Brass Screws & Fittings',
        image: 'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=400&h=300&fit=crop',
        stockQuantity: 500,
        specifications: {
          material: 'Brass',
          dimensions: 'M8 x 25mm',
          weight: '8g',
          finish: 'Natural Brass'
        }
      },
      {
        name: 'Custom Brass Fitting',
        description: 'Precision-manufactured custom brass fitting designed to meet specific industrial requirements.',
        price: 45.00,
        category: 'Custom Parts',
        image: 'https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=400&h=300&fit=crop',
        stockQuantity: 50,
        specifications: {
          material: 'Brass',
          dimensions: 'Custom',
          weight: 'Varies',
          finish: 'Polished'
        }
      },
      {
        name: 'Brass Cable Gland M25',
        description: 'Heavy-duty brass cable gland for large cable installations. Exceptional durability and weather resistance.',
        price: 35.99,
        category: 'Brass Cable Glands',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        stockQuantity: 75,
        specifications: {
          material: 'Brass',
          dimensions: 'M25 x 1.5',
          weight: '68g',
          finish: 'Nickel Plated'
        }
      }
    ];
    
    const products = await Product.insertMany(sampleProducts);
    
    console.log('✅ Sample products seeded:', products.length);
    
    res.status(201).json({
      success: true,
      message: `${products.length} sample products created successfully`,
      products
    });
  } catch (error) {
    console.error('⚠️ Seed products error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error seeding products' 
    });
  }
});

module.exports = router;
