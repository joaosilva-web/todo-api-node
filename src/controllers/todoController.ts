import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const createTask = async (req: Request, res: Response) => {
    let { title } = req.body;

    if(title){
        let newTask = await Todo.create({title});

        res.status(201);
        res.status(201).json({ newTask });
    } else {
        res.json({ error: 'Dados não enviados!'});
    }
}

export const listTasks = async (req: Request, res: Response) => {
    let tasks = await Todo.findAll();

    res.json({ tasks });
}

export const editTask = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { title, done } = req.body;

    let task = await Todo.findByPk(id);

    if(task) {
        if(req.body.title){
            task.title = req.body.title;
        }
        
        if(req.body.done){
            switch(req.body.done.toLowerCase()){
                case 'true':
                case '1':
                    task.done = true;
                    break;
                
                case 'false':
                case '0':
                    task.done = false;
                    break;
            }
        }

        await task.save();

        res.json({task});
    } else {
        res.json({ error: "task não encontrada!"});
    }

}

export const deleteTask = async (req: Request, res: Response) => {
    let { id } = req.params;

    await Todo.destroy({
        where: {
            id
        }
    })

    res.json({});
}