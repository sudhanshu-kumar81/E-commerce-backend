import nodemailer from 'nodemailer'
const mailSender=async(email,title,body)=>{
     try{
        let transporter=nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            secure:true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
              },
        })
        const info = await transporter.sendMail({
            from: "E-commerce || -by Sudhanshu",
            to: `${email}`, 
            subject: `${title}`, 
            html:`${body}`, // html body
          });
          return info;
     }
     catch(e){
        console.log("error in sending email",e);
        
     }
}
export {mailSender}