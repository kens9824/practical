import express from 'express'

import {
    getAllUsers,
    editUser,
    Register,
    getUserById,
    removeUser
} from '../controller/userController'


let router = express.Router();

router.post('/', Register);
router.get('/', getAllUsers);
router.patch('/:id', editUser);
router.get('/:id', getUserById);
router.delete('/:id', removeUser);


export default router;
