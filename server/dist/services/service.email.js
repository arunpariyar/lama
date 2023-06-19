"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailItem = exports.mailAll = void 0;
const nodemailer = require("nodemailer");
const dayjs = require("dayjs");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.LAMA_EMAIL,
        pass: process.env.LAMA_PW,
    },
});
const mailAll = (userData) => {
    console.log("Emailing ALL");
    const userContent = [];
    userData.categories.forEach((cat) => {
        let items = [];
        cat.items.forEach((item) => {
            items.push(`<li>${item.title}${item.start_date
                ? " " + dayjs(item.start_date).format("DD/MM/YYYY H:mm a")
                : ""}</li>`);
        });
        userContent.push(`<h3>Category: ${cat.name}</h3><ul>${items.join("")}</ul>`);
    });
    const htmlContent = `
<p>Hi ${userData.name}, this is all the content you have in LAMA:</p>
${userContent.join("")}
`;
    const mailOptions = {
        from: '"LAMA🦙 Notifications" <lama.cw.solo@gmail.com>',
        to: userData.email,
        subject: `Hey! Don't miss your reminders! 🦙🦙🦙`,
        html: htmlContent,
    };
    function send() {
        return __awaiter(this, void 0, void 0, function* () {
            yield transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
        });
    }
    send();
};
exports.mailAll = mailAll;
const mailItem = (itemData) => {
    console.log("Emailing item");
    const mailOptions = {
        from: '"LAMA🦙 Notifications" <lama.cw.solo@gmail.com>',
        to: itemData.email,
        subject: `🦙🦙🦙 !! ${itemData.title}`,
        html: `<p>Hi ${itemData.name}, you programmed a reminder for:</p><h3>${itemData.title}</h3><p>on ${dayjs(itemData.start_date).format("DD/MM/YYYY H:mm A")}</p>`,
    };
    function send() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log("Email sent: " + info.response);
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    send();
};
exports.mailItem = mailItem;
