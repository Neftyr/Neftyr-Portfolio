"use client"

import React from "react"
import SectionHeading from "./section-heading"
import SubmitButton from "./submit-button"
import toast from "react-hot-toast"
import contactStyle from "@/styles/contact.module.css"
import { motion } from "framer-motion"
import { useSectionInView } from "@/lib/hooks"
import { sendEmail } from "@/actions/sendEmail"

export default function Contact() {
    const { ref } = useSectionInView("Contact", 1)

    return (
        <motion.section
            className={contactStyle.section}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            ref={ref}
            id="contact"
        >
            <SectionHeading>Contact Me</SectionHeading>
            <p className={contactStyle.info}>
                Please contact me directly at{" "}
                <a className={contactStyle.mail} href="mailto:wargacki.patryq@gmail.com">
                    wargacki.patryq@gmail.com
                </a>{" "}
                or through this form.
            </p>

            <form
                className={contactStyle.form}
                action={async (formData) => {
                    const { data, error } = await sendEmail(formData)

                    if (error) {
                        toast.error(error, {
                            style: {
                                border: "1px solid #713200",
                                background: "rgba(37, 32, 35, 0.4)",
                                padding: "15px",
                                color: "rgba(203, 207, 204, 1)",
                            },
                            iconTheme: {
                                primary: "#713200",
                                secondary: "black",
                            },
                        })
                        /** @dev Using retrun to stop function after error */
                        return
                    }

                    toast.success("Email sent successfully!", {
                        style: {
                            border: "1px solid black",
                            background: "rgba(37, 32, 35, 0.4)",
                            padding: "15px",
                            color: "rgba(203, 207, 204, 1)",
                        },
                        iconTheme: {
                            primary: "rgba(49, 169, 73, 1)",
                            secondary: "black",
                        },
                    })
                }}
            >
                <input className={contactStyle.input} name="senderEmail" type="email" required maxLength={100} placeholder="Your email" />
                <textarea className={contactStyle.textarea} name="message" required maxLength={5000} placeholder="Your message" />

                <SubmitButton />
            </form>
        </motion.section>
    )
}
