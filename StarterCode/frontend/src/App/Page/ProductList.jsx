import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, IconButton, Grid, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/products/${id}`);
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container>
            <h1>Simple Card List</h1>
            <Grid container spacing={2} justifyContent="center">
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <div className='delete-icon'>
                                <IconButton sx={{ color: 'red' }} onClick={() => handleDelete(product.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>

                            <CardMedia
                                component="img"
                                height="200"
                                image={product.imageUrl}
                                alt={product.name}
                            />
                            
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                                <Typography variant="body1">${product.price}</Typography>
                                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
