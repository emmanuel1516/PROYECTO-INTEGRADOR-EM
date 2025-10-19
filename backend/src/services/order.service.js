import { sendMail } from "../utils/mailer.js";
import ErrorService from "./error.service.js";

// eslint-disable-next-line func-style
function renderOrderHtml({ consumer, items, totalQuantity, totalAmount }) {
    const rows = items.map((it) => `<tr>
                                        <td style="display:flex;align-items:center;gap:8px">
                                            ${it.thumbnail ? `<img src="${it.thumbnail}" width="40" height="40" style="object-fit:cover;border-radius:4px" />` : ""}
                                            <span>${it.name}</span>
                                        </td>
                                        <td align="center">${it.quantity}</td>
                                        <td align="right">$ ${(it.price ?? 0).toFixed(2)}</td>
                                        <td align="right">$ ${Number(it.amount ?? (it.price ?? 0) * it.quantity).toFixed(2)}</td>
                                    </tr>`).join("");

    return (`<div style="font-family:Arial,Helvetica,sans-serif;">
                <h2 style="margin:0 0 8px;">Nueva compra</h2>
                <p style="margin:0 0 20px;color:#666">Generado el ${new Date().toLocaleString()}</p>

                <h3 style="margin:0 0 8px;">Datos del cliente</h3>
                <ul style="margin:0 0 16px;padding-left:16px">
                <li><b>Nombre:</b> ${consumer.name} ${consumer.surname}</li>
                <li><b>Email:</b> ${consumer.email}</li>
                <li><b>Teléfono:</b> ${consumer.phone || "-"}</li>
                </ul>

                <h3 style="margin:0 0 8px;">Carrito</h3>
                <table width="100%" cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#eee">
                <thead style="background:#f7f7f7">
                    <tr>
                    <th align="left">Producto</th>
                    <th align="center">Cant.</th>
                    <th align="right">Precio</th>
                    <th align="right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
                <tfoot>
                    <tr>
                    <td colspan="3" align="right"><b>Total items</b></td>
                    <td align="right"><b>${totalQuantity}</b></td>
                    </tr>
                    <tr>
                    <td colspan="3" align="right"><b>Total</b></td>
                    <td align="right"><b>$ ${Number(totalAmount).toFixed(2)}</b></td>
                    </tr>
                </tfoot>
                </table>
            </div>`);
}

export default class OrderService {
    async sendOrder({ consumer, items, totalQuantity, totalAmount }) {
        const from = `"${consumer.name} ${consumer.surname}" <${process.env.SMTP_RECIPIENT}>`;
        const to = process.env.SMTP_RECIPIENT;
        const subject = `Compra - ${consumer.name} ${consumer.surname}`;
        const html = renderOrderHtml({ consumer, items, totalQuantity, totalAmount });

        const result = await sendMail(from, to, subject, html);
        if (!result) throw new ErrorService("Error al enviar el correo de compra");
        return result;
    }
}