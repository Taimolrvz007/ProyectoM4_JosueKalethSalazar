// api/send-email.ts
// @ts-nocheck
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Configuramos el "cartero" (AWS) con tus llaves secretas
const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export default async function handler(req: any, res: any) {
    // Solo permitimos que el frontend nos pida enviar correos (método POST)
    if (req.method !== 'POST') return res.status(405).send('Método no permitido');

    const { tasks, userEmail } = req.body; // Recibimos las tareas y el email del usuario

    // Diseñamos el correo
    const params = {
        Source: process.env.SES_SENDER_EMAIL, // Tu correo verificado en AWS
        Destination: { ToAddresses: [userEmail] },
        Message: {
            Subject: { Data: "Resumen de Tareas - MateCode" },
            Body: {
                Text: { Data: `Tus tareas actuales son: ${tasks.map((t: any) => t.title).join(", ")}` },
            },
        },
    };

    try {
        const command = new SendEmailCommand(params);
        await sesClient.send(command);
        return res.status(200).json({ message: "Email enviado con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al enviar el email" });
    }
}