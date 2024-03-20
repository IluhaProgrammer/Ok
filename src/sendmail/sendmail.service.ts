import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendEmailDto } from './dto/sendmail.dto';
import { MailerService } from '@nestjs-modules/mailer'; 

@Injectable()
export class SendmailService {

    constructor(readonly mail : MailerService){}  

    async sendEmail(dto : SendEmailDto) {
        const {payment, address, phone, cartProducts, fullName, email, deliver, totalPrice} = dto  
    
        this.mail.sendMail({
            from: `oli23rewards@gmail.com`,
            to: "oli23rewards@gmail.com",
            subject: 'Хочу заказть у вас товар',
            text: '',
            html: 
            `  <div>
                <h2>Клиент ${fullName} сделал заказ</h2>
                    <h3>Контактная информация:</h3>
                    <div>
                        <div style="margin-bottom: 5px">✅email: ${email}</div>
                        <div style="margin-bottom: 5px">⭐ФИО: ${fullName}</div>
                        <div style="margin-bottom: 5px">🏚️Адрес: ${address}</div>
                        <div style="margin-bottom: 5px">📞Телефон: ${phone}</div>
                        <div style="margin-bottom: 5px">🔢Количество товаров: ${cartProducts.length}</div>
                        <div>💲Сумма заказа: ${totalPrice}</div>
                    </div>
                    <h3>Информация и товаре:</h3>

                        ${cartProducts.map(item => {
                            return (
                                `<div>
                                <h3 style="margin-bottom: 5px">Товар ${item.id + 1}</h3>
                                    <div style="margin-bottom: 5px">Название товара: ${item.name}</div>
                                    <div style="margin-bottom: 5px">Количество: ${item.quantity}</div>
                                    <div style="margin-bottom: 5px">Цвет: ${item.color}</div>
                                    <div style="margin-bottom: 5px">Текст: ${item.text}</div>
                                    <div style="margin-bottom: 5px">Шрифт: ${item.script}</div>
                                    <div>Цена: ${item.price * item.quantity}</div>
                                </div>
                                `
                            )
                        })}
                    <h3>Способ доставки и оплата:</h3>
                        <div style="margin-bottom: 5px">⛟Доставка: ${deliver}</div>
                        <div>💳Оплата: ${payment}</div> 
                    
            </div>
            `
        })

        return {message : 'Сообщение успешно создано'}
        
    }


}
