import express from 'express'

import { PrismaClient } from '@prisma/client'

import cors from 'cors'

const app = express()

app.use(cors(''))

const prisma = new PrismaClient()

app.use(express.json())

app.post('/coworkers', async (req, res) => {
    await prisma.coworker.create({
        data: {
            name: req.body.name,
            position: req.body.position,
            image: req.body.image,
            team: req.body.team
        }
    })
    res.status(201).json(req.body)
})

app.get('/coworkers', async (req, res) => {

    const data = await prisma.coworker.findMany()

    res.status(200).json(data)

})

app.patch('/coworkers/:id', async (req, res) => {
    await prisma.coworker.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            position: req.body.position,
            image: req.body.image,
            team: req.body.team
        }
    })
    res.status(201).json(req.body)
})

app.delete('/coworkers/:id', async (req, res) => {
    await prisma.coworker.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Usuário foi deletado com sucesso." })
})

app.listen(3001)