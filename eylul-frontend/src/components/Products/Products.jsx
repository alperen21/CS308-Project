import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';

const products = [
    { id: 1, name: 'Kenya Origin Coffee', description: 'chilli.', price:'$15', image: 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-kenya-aa-muranga-yoresel-kahve-139f.jpg' },
    { id: 2, name: 'Peru Origin Coffee', description: 'fruity. ', price:'$20', image: 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-peru-chanchamayo-yoresel-kahve-aa3a.jpg' },
    { id: 3, name: 'Ethiopia Origin Coffee', description: 'mild. ', price:'$17', image: 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-ethiopia-yirgacheffe-yoresel-ka-0c1d.jpg' },
    { id: 4, name: 'Uganda Origin Coffee', description: 'intense aroma. ', price:'$13', image: 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-uganda-bugisu-aa-yoresel-kahve-4563.jpg' },
    { id: 5, name: 'Rwanda Origin Coffee', description: 'fruity. ', price:'$20', image: 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-rwanda-ab-plus-intore-yoresel-k-5751.jpg' },
    { id: 6, name: 'Ravello Espresso', description: 'woody. ', price:'$18', image: 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-ravello-espresso-blend-kahve-27cd.jpg' },
    { id: 7, name: 'El Salvador Origin Coffee', description: 'rich. ', price:'$18', image: 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-el-salvador-sgh-finca-la-joya-y-59e0.jpg' },
    { id: 8, name: 'Guatemala Origin Coffee', description: 'strong. ', price:'$18', image: 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-guatemala-antigua-yoresel-kahve-6585.jpg' },
];

const Products = () => {
    const classes=useStyles();

    return(
    <main className={classes.content}>
        <div className={classes.toolbar}></div>
        <Grid container justify="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
    </main>
    );


}
export default Products;