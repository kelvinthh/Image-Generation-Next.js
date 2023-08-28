import Link from "next/link";
import { redirect } from 'next/navigation';

export default function NotFound() {
  redirect(`${process.env.WEBSITE_URL}/NotFound`)
}