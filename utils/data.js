import bcrypt from 'bcryptjs';

const data = {


    users: [{
            name: 'Ricky',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Doyok',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,

        },
    ],
    products: [
        {
            name: 'Topi',
            slug: 'topi',
            category: 'Accessories',
            image: '/images/topi clothing.png',
            price: 30.000,
            rating: 4.5,
            numReviews: 10,
            countInStock: 6,
            description: 'A plain shirt',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: '/images/image2.png',
            price: 60.000,
            rating: 4.7,
            numReviews: 10,
            countInStock: 16,
            description: 'A popular shirt',
        },
        {
            name: 'Sweater',
            slug: 'sweater',
            category: 'Jackets',
            image: '/images/sweater.png',
            price: 130.000,
            rating: 4.8,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular Hoodie',
        },
        {
            name: 'Shirt',
            slug: 'shirt',
            category: 'Shirts',
            image: '/images/image2.png',
            price: 30.000,
            rating: 4.5,
            numReviews: 10,
            countInStock: 8,
            description: 'A plain shirt',
        },
        {
            name: 'Woman Shirt',
            slug: 'wowan-shirt',
            category: 'Shirts',
            image: '/images/image1.png',
            price: 50.000,
            rating: 4.5,
            numReviews: 10,
            countInStock: 9,
            description: 'A Woman popular shirt',
        },
        {
            name: 'Shirt',
            slug: 'shirt',
            category: 'Shirts',
            image: '/images/image4.png',
            price: 30.000,
            rating: 4.5,
            numReviews: 10,
            countInStock: 2,
            description: 'A plain shirt',
        },
    ],
};


export default data;