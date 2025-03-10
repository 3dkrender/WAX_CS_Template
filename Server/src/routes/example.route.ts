import { Router } from 'express';
import { validateRequest } from '../middleware/validator';
import { createUserSchema, updateUserSchema } from './example.schema';

const router = Router();

router.post('/users', 
    validateRequest(createUserSchema),
    (req, res) => {
        // Validation has already been performed
        // Implement controller logic here
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: req.body
        });
    }
);

router.put('/users/:id',
    validateRequest(updateUserSchema),
    (req, res) => {
        // Validation has already been performed
        // Implement controller logic here
        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: {
                id: req.params.id,
                ...req.body
            }
        });
    }
);

export default router; 