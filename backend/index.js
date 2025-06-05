import express from 'express'
const app = express();
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config();
app.use(cors());
app.use(express.json())
console.log()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vinayak20injamure@gmail.com', // Replace with your email
        pass: process.env.APP_PASS     // Replace with your app password
    }
});
app.get('/',(req,res)=>{
    res.send("hello from server")    
})

app.post('/',async(req,res)=>{
       
    const collectiondata = req.body.data.analysis.data_collection_results;    
    console.log('collection ' , collectiondata)    
    const email=collectiondata.email.value;
    const name=collectiondata.name.value;
    const company_name=collectiondata.company_name.value;
    const mailOptions = {
            from: 'vinayak20injamure@gmail.com',
            to: email,
            subject: 'Thank you for your submission',
            html: `
                <h1>Hello ${name}!</h1>
                <p>Thank you for submitting your information from ${company_name}.</p>
                <p>We have received your details and will get back to you soon.</p>
            `
        };
        try{
            await transporter.sendMail(mailOptions);

        }catch(e){
            console.error("email not found");
        }
    
    res.send("hello");
})

app.listen(3000,()=>{
    console.log("server started");
})

