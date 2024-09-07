const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
var cors = require('cors');
app.use(cors());

app.use(express.json());

const prisma = new PrismaClient();


app.post("/register", async (req, res) => {
    const userdata = req.body;
    const existdata = await prisma.job.findFirst({
        where: {
            email: userdata.email
        }
    });

    if (existdata === null) {
      
        const hashedpass = await bcrypt.hash(userdata.password, 10);
       

        const register = await prisma.job.create({
            data: {
                name: userdata.name,
                email: userdata.email,
                phone: userdata.phone,
                password: hashedpass 
            }
        });

        res.json({ message: "registered successfully", data: register });
    } else {
        res.json({
            message: "Email already exists"
        });
    }
});

app.post("/login", async (req, res) => {
    const userdata = req.body;
    const existeduser = await prisma.job.findFirst({
        where: {
            email: userdata.email
        }
    });

    if (existeduser === null) {
        res.json({ message: "User ID not found" });
    } else {
        console.log("Entered password:", userdata.password);
        console.log("Stored hashed password:", existeduser.password); 

   
        const PasswordValid = await bcrypt.compare(userdata.password, existeduser.password);

        if (PasswordValid) {
            const accesstoken = jwt.sign({ user_id: existeduser.id }, 'your_secret_key', {
                expiresIn: "1h"
            });
            const refreshtoken = jwt.sign({ user_id: existeduser.id }, 'your_refresh_secret_key', {
                expiresIn: "7d"
            });

            await prisma.token.create({
                data: {
                    user_id: existeduser.id,
                    refreshtoken: refreshtoken
                }
            });

            res.json({
                message: "Login successful",
                accesstoken,
                refreshtoken
            });
        } else {
            res.json({ message: "Invalid password" });
        }
    }
});

app.post('/jobslist', async (req, res) => {
    const { title, company, location, experience, skills, url } = req.body;
    try {
      const job = await prisma.joblist.create({
        data: {
          title,
          company,
          location,
          experience,
          skills,
          url,
        },
      });
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the job.',error });
    }
  });
  
  // GET endpoint to retrieve all Jobs
  app.get('/jobslist', async (req, res) => {
    try {
      const jobs = await prisma.joblist.findMany();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving jobs.' });
    }
  });
  


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
