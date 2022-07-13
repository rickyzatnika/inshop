
import { createRouter } from 'next-connect';
import db from '../../utils/db';
import Product from '../../models/product';
import data from '../../utils/data';
import User from '../../models/user';
const router = createRouter();

router.get(async(req, res) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.disconnect();
    res.send({message: 'seeded succesfully'});
});

export default router.handler();