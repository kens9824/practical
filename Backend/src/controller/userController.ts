import { Request, Response } from 'express';
import { RequestFailed } from '../response/RequestFailedResponse';
import { User } from '../entity/user';
import { InternalServerError } from '../response/InternalServerErrorResponse';
import { getConnection, getRepository } from 'typeorm';


export const Register = async (req: Request, res: Response) => {
    try {
        const {
            name,email,age
        } = req.body;

        if (!name || !name.trim().length) {
            return RequestFailed(res, 400, "Please Enter name");
        }

        if (!email || !email.trim().length) {
            return RequestFailed(res, 400, "Please Enter email");
        }        

        if (!age) {
            return RequestFailed(res, 400, "Please Enter age");
        }


        const olduser = await User.findOne({
            where: { email: email }
        });

        if (olduser) {
            res.status(409).json({
                success: false,
                message: 'Your name is Already Registered with us',
                timestmap: new Date()
            });
        } else {
            const user = new User();
            user.name = name;
            user.email = email;
            user.age = age;
            await user.save();
            return res.status(200).json(user);
        }

    } catch (error) {
        return InternalServerError(res, error);
    }
}

export const editUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {
            name,
            email,
            age
        } = req.body;

  
        if (!name || !name.trim().length) {
            return RequestFailed(res, 400, "Please Enter name");
        }

        if (!email || !email.trim().length) {
            return RequestFailed(res, 400, "Please Enter email");
        }        

        if (!age) {
            return RequestFailed(res, 400, "Please Enter age");
        }
      
        const userExist = await User.findOne({
            where: { id: id }
        });

        if (!userExist) {
            res.status(404).json({
                success: false,
                message: 'Your userid is not Registered with us',
                timestmap: new Date()
            });
        } 
        // const user = new User();
        userExist.name = name;
        userExist.email = email;
        userExist.age = age;
        await userExist.save();
        return res.status(200).json(userExist);

    } catch (error) {
        return InternalServerError(res, error);
    }
}


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);

    } catch (error) {
        return InternalServerError(res, error);
    }

}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id= req.params.id;
        
        const user = await User.findOne({
            where: { id: id }
        });
        return res.status(200).json(user);

    } catch (error) {
        return InternalServerError(res, error);
    }

}

export const removeUser = async (req: Request, res: Response) => {
    try {
        const id= req.params.id;
        
        const repository = getRepository(User);
        const recordToDelete = await repository.findOne(id);
        if (recordToDelete) {
            await repository.remove(recordToDelete);
        }
        return res.status(200).json({message: "User record deleted"});

    } catch (error) {
        return InternalServerError(res, error);
    }

}