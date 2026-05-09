import { ContactComponent } from "@/components/contact/Contact"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Contact",
}

export default function ContactPage() {
	return <ContactComponent />
}
