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
            teamKey: req.body.teamKey
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
    res.status(200).json({ message: "Coworker was deleted succesfuly" })
})

app.get('/teams', async (req, res) => {

    const data = await prisma.team.findMany()

    res.status(200).json(data)

})

app.post('/teams', async (req, res) => {
    await prisma.team.create({
        data: {
            name: req.body.name,
            color: req.body.color
        }
    })
    res.status(201).json(req.body)
})

app.delete('/teams/:id', async (req, res) => {
    await prisma.team.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Team was deleted succesfuly" })
    deleteMany(req.params.id)
})

async function deleteMany(teamKey) {
    await prisma.coworker.deleteMany({
        where: {
            teamKey: teamKey
        }
    })
}

app.patch('/teams/:id', async (req, res) => {
    await prisma.team.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            color: req.body.color
        }
    })
    res.status(201).json(req.body)
})

app.listen(3001)